const path = require('path');
const glob = require('glob');
const merge = require('deepmerge');

const pagePath = path.resolve(__dirname, '../src/pages');

exports.setPages = configs => {
    let entryFiles = glob.sync(pagePath + '/*/*.js');
    let map = {};

    /*eslint-disable*/
    entryFiles.forEach(filePath => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        let tmp = filePath.substring(0, filePath.lastIndexOf('\/'));

        let conf = {
            // page 的入口
            entry: filePath,
            // 模板来源
            template: tmp + '.html',
            // 在 dist/home.html 的输出
            filename: filename + '.html',
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['chunk-vendors', 'chunk-common', filename],
            inject: true,
        };

        if (configs) {
            conf = merge(conf, configs);
        }

        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: false, // 删除 html 中的注释代码
                    collapseWhitespace: false, // 删除 html 中的空白符
                },
                chunksSortMode: 'manual'// 按 manual 的顺序引入
            });
        }

        map[filename] = conf;
    })

    return map
}
