<h1 align="center">
EverBlog
</h1>

<h4 align="center">Write blogs in your evernote.</h4>

<p align="center">
  <a href="https://npmjs.org/package/everblog"><img src="https://img.shields.io/npm/v/everblog.svg?style=flat-square" alt="NPM version"></a>
  <a href="https://travis-ci.org/everblogjs/everblog"><img src="https://img.shields.io/travis/everblogjs/everblog.svg?style=flat-square" alt="Build status"></a>
  <a href="https://david-dm.org/everblogjs/everblog"><img src="http://img.shields.io/david/everblogjs/everblog.svg?style=flat-square" alt="Dependency Status"></a>
  <a href="LICENSE"><img src="http://img.shields.io/npm/l/everblog.svg?style=flat-square" alt="License"></a>
  <a href="https://npmjs.org/package/everblog"><img src="http://img.shields.io/npm/dm/everblog.svg?style=flat-square" alt="Downloads"></a>
</p>

### How to use

```sh
1. Install everblog:

$ npm i everblog -g
$ vim ~/.everblogrc

  token: xxx,
  noteStoreUrl: xxx,
  notebook: myblog

2. Clone theme, like `everblog-theme-spa`:

$ git clone https://github.com/everblogjs/everblog-theme-spa myblog
$ cd myblog && npm i

3. Open evernote:

- create a new notebook named `myblog`
- create a new note named `_config.yml`, add some configs, like: `title`, `description`
- create some notes

4. Start everblog:

$ DEBUG=* everblog start
```

**Tips**: 

`token` and `noteStoreUrl` get from:

- https://www.evernote.com/api/DeveloperToken.action

### Adaptors

- [everblog-adaptor-spa](https://github.com/everblogjs/everblog-adaptor-spa)
- [everblog-adaptor-hexo](https://github.com/everblogjs/everblog-adaptor-hexo)

### Themes

- [everblog-theme-spa](https://github.com/everblogjs/everblog-theme-spa)
- all hexo themes

### Roadmap

- Ghost adaptor
- Jekyll adaptor
- ...

### Test

```sh
$ npm test
```

### License

MIT
