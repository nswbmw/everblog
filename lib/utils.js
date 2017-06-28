'use strict';

const _ = require('lodash')
const yaml = require('js-yaml')
const open = require('open')
const entities = require('entities')
const enml2text = require('enml2text')
const debug = require('debug')('everblog-utils')
const co = require('co')
const fs = require('fs')
const path = require('path')
const home = require('home')()
const chalk = require('chalk')
const configPath = path.join(home, '.everblogrc')
const Everblog = require('../lib/everblog')

const log = str => {
  console.log()
  console.log('  ' + chalk.green(str).split('\n').join('\n  '))
  console.log()
};
const error = str => {
  console.log()
  console.log('  ' + chalk.red(str).split('\n').join('\n  '))
  console.log()
};
exports.log = log;
exports.error = error;
exports.formatNotes = formatNotes;
function formatNotes(notes, webApiUrlPrefix, noteStore) {
  const result = {
    $webApiUrlPrefix: webApiUrlPrefix,
    noteStore: noteStore,
    $blog: {},
    posts: []
  }
  for (let note of notes) {
    if (note.title.trim() === '_config.yml') {
      let _config = note.content;
      debug('_config -> %s', JSON.stringify(_config))

      _config = entities.decodeHTML(enml2text(note.content))
      debug('_config text -> %s', JSON.stringify(_config))

      result.$blog = yaml.safeLoad(_config)
      debug('$blog -> %j', result.$blog)
    } else {
      result.posts.push(note)
    }
  }
  return result
}

exports.buildBlog = buildBlog;
function buildBlog() {
  // Put the processor into subfolder.
  // It's easier for mocha testing.
  const dir = process.cwd() + '/adaptor'
  const configStr = fs.readFileSync(configPath)
  const config = yaml.safeLoad(configStr)

  if (!config.token || !config.noteStoreUrl || !config.notebook) {
    error('Configuration is not complete!')
    log(configStr)
    return Promise.reject()
  }

  let buildProcessor
  try {
    buildProcessor = require(dir)
  } catch (e) {
    error(e.stack || e)
    return Promise.reject()
  }

  let result = false;
  return co(function* () {
    const everblog = new Everblog(config)
    const notes = yield everblog.findNotes()
    const webApiUrlPrefix = yield everblog.getWebApiUrlPrefix()
    const data = formatNotes(notes, webApiUrlPrefix, everblog._noteStore)
    
    return yield buildProcessor(data)
  }).catch(e => {
    error(e.stack || e)
    return Promise.reject()
  })
}

exports.startBlog = function startBlog() {
  buildBlog().then(distPath => {
    distPath = distPath || path.join(process.cwd(), 'index.html')
    if (!fs.existsSync(distPath)) {
      return Promise.reject(distPath + ' not exist!')
    }
    open(distPath)
  }).catch(e => {
    if (e) error(e.stack || e)
  })
}
