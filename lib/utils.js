'use strict';

const _ = require('lodash')
const yaml = require('js-yaml')
const entities = require('entities')
const enml2text = require('enml2text')
const debug = require('debug')('everblog-utils')

exports.formatNotes = function formatNotes(notes, webApiUrlPrefix) {
  const result = {
    $webApiUrlPrefix: webApiUrlPrefix,
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
