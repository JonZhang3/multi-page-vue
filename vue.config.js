const path = require('path');
const utils = require('./build/utils');

function resolve(name) {
    return path.resolve(__dirname,name)
}

module.exports = {
    pages: utils.setPages(),
    devServer: {
        port: 8082
    }
};
