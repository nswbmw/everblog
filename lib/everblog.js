'use strict';

const Promise = require('bluebird')
const Evernote = require('evernote').Evernote
const debug = require('debug')('everblog')

module.exports = class EverblogCore {

  constructor(options) {
    options.sandbox = options.sandbox || !!options.noteStoreUrl.match(/sandbox/)

    this._options = options
    this._client = new Evernote.Client(options)
    this._noteStore = this._client.getNoteStore(options.noteStoreUrl)
    this._listNotebooks = Promise.promisify(this._noteStore.listNotebooks, { context: this._noteStore })
    this._findNotes = Promise.promisify(this._noteStore.findNotes, { context: this._noteStore })
    this._getNoteContent = Promise.promisify(this._noteStore.getNoteContent, { context: this._noteStore })
    this._getNoteTagNames = Promise.promisify(this._noteStore.getNoteTagNames, { context: this._noteStore })
  }

  * getNotebook() {
    const notebooks = yield this._listNotebooks()
    for (let notebook of notebooks) {
      if (notebook.name === this._options.notebook) {
        debug('getNotebook -> %s', notebook.name)
        return notebook
      }
    }
    throw new Error('Cannot find notebook "' + this._options.notebook + '"')
  }

  * findNotes(_notebookGuid, _filter, _offset, _maxNotes, _notes) {
    _notebookGuid = _notebookGuid || (yield this.getNotebook()).guid
    _filter       = _filter || new Evernote.NoteFilter({ notebookGuid: _notebookGuid })
    _offset       = _offset || 0
    _maxNotes     = _maxNotes || 50
    _notes        = _notes || []

    let notes = (yield this._findNotes(_filter, _offset, _maxNotes)).notes
    notes = yield notes.map(function* (note) {
      let content = yield this._getNoteContent(note.guid)
      note.content = content
      if (note.tagGuids) {
        note.tags = yield this._getNoteTagNames(note.guid)
      } else {
        note.tags = []
      }
      return note
    }, this)

    _notes = _notes.concat(notes)
    _offset = _offset + _maxNotes

    return notes.length === _maxNotes
      ? (yield this.findNotes(_notebookGuid, _filter, _offset, _maxNotes, _notes))
      : (debug('findNotes -> %s', _notes.length), _notes)
  }
}
