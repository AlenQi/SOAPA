<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://file.iviewui.com/logo.svg">
    </a>
</p>

# SOAPA Admin
[![vue](https://img.shields.io/badge/vue-2.5.13-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-2.8.0-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)


## 当前版本：v1.0.0

## Install

```bush
// install dependencies
npm install
```
## Run

### Config

config --> url.conf.js

``` javascript
const AssetsIP = isProduction ? '' : 'http://xx.xx.xx.xx:8080'
//配置地址
```
### Development

```bush
npm run dev
```

### Production(Build)

```bush
npm run build
```

## 文件结构
```shell
.
├── build  项目构建配置
├── config 公共配置
└── src
    ├── images  图片文件
    ├── libs  工具方法
    ├── locale  多语言文件
    ├── router  路由配置
    ├── store  状态管理
    ├── styles  样式文件
    ├── template  模板文件
    ├── vendors  公共库文件
    └── views  具体视图及组件
```

## Links

- [iView](https://github.com/iview/iview)
- [Vue](https://github.com/vuejs/vue)
- [Webpack](https://github.com/webpack/webpack)

## License
[MIT](http://opensource.org/licenses/MIT)
