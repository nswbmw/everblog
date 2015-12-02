'use strict';

const assert = require('assert')
const utils = require('../lib/utils')

describe('formatNotes', function () {
  it('$blog', function () {
    const _config = [{"guid":"6385f171-5fe6-4355-b6ff-f65757c2ceff","title":"_config.yml","content":"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">\n<en-note>\n<div style=\"font-family:monospace; font-size:13px; font-weight:normal\">title: everblog</div>\n<div style=\"font-family:monospace; font-size:13px; font-weight:normal\">url: http://everblog.io</div>\n<div style=\"font-family:monospace; font-size:13px; font-weight:normal\">author:</div>\n<div style=\"font-family:monospace; font-size:13px; font-weight:normal\">  name: nswbmw</div>\n<div style=\"font-family:monospace; font-size:13px; font-weight:normal\">  description: No fun, no Node.</div>\n<div style=\"font-family:monospace; font-size:13px; font-weight:normal\">  avatar: https://avatars.githubusercontent.com/u/4279697?v=3&amp;s=100</div>\n<div style=\"font-family:monospace; font-size:13px; font-weight:normal\">social:</div>\n<div style=\"font-family:monospace; font-size:13px; font-weight:normal\">  GitHub: https://github.com/nswbmw</div>\n<div style=\"font-family:monospace; font-size:13px; font-weight:normal\">  Twitter: https://twitter.com/nswbmw</div>\n<div style=\"font-family:monospace; font-size:13px; font-weight:normal\">  Facebook: https://www.facebook.com/nswbmw1992</div>\n</en-note>\n","contentHash":{"0":76,"1":82,"2":13,"3":213,"4":0,"5":11,"6":133,"7":160,"8":100,"9":155,"10":38,"11":170,"12":223,"13":150,"14":147,"15":21},"contentLength":1234,"created":1448849126000,"updated":1448983325000,"deleted":null,"active":true,"updateSequenceNum":7669,"notebookGuid":"c055af6e-6a47-4c95-a27d-8a775202ffd2","tagGuids":null,"resources":null,"attributes":{"subjectDate":null,"latitude":null,"longitude":null,"altitude":null,"author":"gxqzk@126.com","source":"desktop.mac","sourceURL":null,"sourceApplication":null,"shareDate":null,"reminderOrder":null,"reminderDoneTime":null,"reminderTime":null,"placeName":null,"contentClass":null,"applicationData":null,"lastEditedBy":null,"classifications":null,"creatorId":null,"lastEditorId":null},"tagNames":null,"tags":[]}]
    const $blog = { title: 'everblog',
      url: 'http://everblog.io',
      author:
       { name: 'nswbmw',
         description: 'No fun, no Node.',
         avatar: 'https://avatars.githubusercontent.com/u/4279697?v=3&s=100' },
      social:
       { GitHub: 'https://github.com/nswbmw',
         Twitter: 'https://twitter.com/nswbmw',
         Facebook: 'https://www.facebook.com/nswbmw1992' } }

    assert.deepEqual(utils.formatNotes(_config).$blog, $blog)
  })
})
