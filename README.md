## EverBlog

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

EverBlog = write blogs in your evernote.

### How to use

```
$ npm i everblog -g
$ everblog config
$ git clone https://github.com/everblogjs/everblog-theme-spa
$ cd everblog-theme-spa && npm i

Open evernote:

1. create a new notebook named `myblog`
2. create a new note named `_config.yml`
3. write some notes with tags

Then:

$ DEBUG=* everblog start

Finally push your github-pages.
```

**Tips**: 

`token` and `noteStoreUrl` get from:

- https://www.evernote.com/api/DeveloperToken.action
- https://app.yinxiang.com/api/DeveloperToken.action

### Adaptors

- [everblog-adaptor-hexo](https://github.com/everblogjs/everblog-adaptor-hexo)
- [everblog-adaptor-spa](https://github.com/everblogjs/everblog-adaptor-spa)

### Themes

- all hexo themes
- [everblog-theme-spa](https://github.com/everblogjs/everblog-theme-spa)
- [everblog-theme-koa](https://github.com/everblogjs/everblog-theme-koa)

### Roadmap

- Ghost adaptor
- Jekyll adaptor
- Angular adaptor
- React adaptor
- ...

### Test

```
npm test
```

### Error Handling

see [https://dev.evernote.com/doc/articles/error_handling.php](https://dev.evernote.com/doc/articles/error_handling.php).

### License

MIT

[npm-image]: https://img.shields.io/npm/v/everblog.svg?style=flat-square
[npm-url]: https://npmjs.org/package/everblog
[travis-image]: https://img.shields.io/travis/everblogjs/everblog.svg?style=flat-square
[travis-url]: https://travis-ci.org/everblogjs/everblog
[david-image]: http://img.shields.io/david/everblogjs/everblog.svg?style=flat-square
[david-url]: https://david-dm.org/everblogjs/everblog
[license-image]: http://img.shields.io/npm/l/everblog.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/everblog.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/everblog
