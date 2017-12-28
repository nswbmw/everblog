const yaml = require('js-yaml')
const enml = require('enml-js')
const Evernote = require('evernote')
const entities = require('entities')
const debug = require('debug')('everblog')

module.exports = class Everblog {
  constructor (options = {}) {
    options.sandbox = options.sandbox || !!options.noteStoreUrl.match(/sandbox/)

    this._options = options
    this._client = new Evernote.Client(options)
    this._noteStore = this._client.getNoteStore(options.noteStoreUrl)
    this._userStore = this._client.getUserStore()
  }

  async getWebApiUrlPrefix () {
    if (this._webApiUrlPrefix) {
      return this._webApiUrlPrefix
    }
    let username = (await this._userStore.getUser()).username
    let webApiUrlPrefix = (await this._userStore.getPublicUserInfo(username)).webApiUrlPrefix
    this._webApiUrlPrefix = webApiUrlPrefix
    debug('webApiUrlPrefix -> %s', webApiUrlPrefix)
    return webApiUrlPrefix
  }

  async getNotebook () {
    if (this._notebook) {
      return this._notebook
    }
    const notebooks = await this._noteStore.listNotebooks()
    for (let notebook of notebooks) {
      if (notebook.name === this._options.notebook) {
        this._notebook = notebook
        debug('getNotebook -> %s', notebook.name)
        return notebook
      }
    }
    throw new Error(`Cannot find notebook: "${this._options.notebook}"`)
  }

  async findNotes (_filter, _offset, _maxNotes, _spec, _notes) {
    const notebook = await this.getNotebook()
    const webApiUrlPrefix = await this.getWebApiUrlPrefix()
    _filter = _filter || new Evernote.NoteStore.NoteFilter({ notebookGuid: notebook.guid })
    _offset = _offset || 0
    _maxNotes = _maxNotes || 100
    _spec = _spec || new Evernote.NoteStore.NotesMetadataResultSpec({
      includeTitle: true,
      includeCreated: true,
      includeUpdated: true,
      includeDeleted: true,
      includeNotebookGuid: true,
      includeTagGuids: true,
      includeAttributes: true
    })
    _notes = _notes || []

    let notes = (await this._noteStore.findNotesMetadata(_filter, _offset, _maxNotes, _spec)).notes
    // Get properties:
    //   1. webApiUrlPrefix
    //   2. content
    //   3. tags
    notes = await Promise.all(notes.map(async (note) => {
      note = (await this._noteStore.getNote(note.guid, true, false, false, false))
      note.webApiUrlPrefix = webApiUrlPrefix
      // not share _config.yml
      if (note.title.trim() !== '_config.yml') {
        note.noteKey = await this.getNoteKey(note.guid)
      }
      if (note.tagGuids) {
        note.tags = await this._noteStore.getNoteTagNames(note.guid)
      } else {
        note.tags = []
      }
      return note
    }))
    debug(`find ${notes.length} notes -> ${JSON.stringify(notes)}`)

    _notes = _notes.concat(notes)
    _offset = _offset + _maxNotes

    return notes.length === _maxNotes
      ? this.findNotes(_filter, _offset, _maxNotes, _spec, _notes)
      : formatNotes(_notes)
  }

  async getNoteKey (noteGuid) {
    return (await this._noteStore.shareNote(noteGuid)).slice(0, 16)
  }
}

function formatNotes (notes) {
  const result = {
    $blog: {},
    notes: []
  }
  for (let note of notes) {
    if (note.title.trim() === '_config.yml') {
      let _config = note.content
      debug('_config.yml(enml)-> %s', JSON.stringify(_config))

      _config = entities
        .decodeHTML(enml.PlainTextOfENML(note.content))
        .replace(/\s/g, (match) => {
          if (match === '\n') {
            return '\n'
          }
          return ' '
        })
      debug('_config.yml(text) -> %j', _config)

      result.$blog = yaml.safeLoad(_config)
      debug('_config.yml(json) -> %j', result.$blog)
    } else {
      result.notes.push(note)
    }
  }
  return result
}
