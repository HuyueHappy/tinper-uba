/**
 * Module : uba page
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-10-13 20:11:22
 * Update : 2016-10-13 20:11:27
 */

'use strict';

const path = require('path');
const fse = require('fs-extra');
const help = require('../lib/help');
const pathExists = require('path-exists');
const fileLists = ['index.css', 'index.html', 'index.js', 'index.less'];
var copyUrl = '',
    rootUrl = path.resolve('.', './src/containers/temp');
module.exports = (commands) => {
    var name = null;
    if (commands[1]) {
        name = commands[1];
    } else {
        help.error('命令不正确!\n语法:uba page name');
        process.exit(1);
    }
    if (!pathExists.sync(rootUrl)) {
        help.error("没有找到page模板");
        process.exit(1);
    }

    copyUrl = path.resolve('.', `./src/containers/${name}`);
    if (pathExists.sync(copyUrl)) {
        help.error(`当前页面文件夹 ${name}  已经存在了，当前操作终止.`);
        process.exit(1);
    }
    fse.copySync(rootUrl, copyUrl);
    fileLists.forEach(function(ele, index, arr) {
        fse.readFile(`${copyUrl}/${ele}`, 'utf8', function(err, data) {
            let text = data;
            text = text.replace(/%name%/g, name);
            fse.writeFile(`${copyUrl}/${ele}`, text, (err) => {
                if (err) throw err;
                help.info(`src/containers/${name}/${ele} 已被创建并重写.`);
            });
        });
    });


}
