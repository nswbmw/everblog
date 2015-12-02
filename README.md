## EverBlog

EverBlog = write blogs in your evernote.

### How to use

```
$ npm i everblog -g
$ everblog config token xxx
$ everblog config noteStoreUrl xxx
$ everblog config notebook myblog
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

- [everblog-adaptor-spa](https://github.com/everblogjs/everblog-adaptor-spa)

### Themes

- [everblog-theme-spa](https://github.com/everblogjs/everblog-theme-spa)
- [everblog-theme-koa](https://github.com/everblogjs/everblog-theme-koa)

### Roadmap

- jekyll adaptor
- hexo adaptor
- Angular adaptor
- React adaptor
- ...

### Test

```
npm test
```

### License

MIT
