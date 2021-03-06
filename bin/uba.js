#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const argv = require('minimist')(process.argv.slice(2));

const commands = argv._;
const currentPath = path.resolve('.');
const help = require('../lib/help');

if (commands.length === 0) {
    if (argv.version || argv.v) {
        console.log(chalk.green(require('../package.json').version));
    } else {
        help.help();
    }
    process.exit(0);
}

switch (commands[0]) {
    case 'init':
        const init = require('../lib/init');
        init(commands);
        break;
    case 'list':
        const list = require('../lib/list');
        list();
        break;
    case 'server':
        var port = 3000;
        if (argv.p !== undefined && !isNaN(argv.p) && argv.p !== true) {
            port = argv.p;
        }
        const server = require('../lib/server');
        server(port);
        break;
    case 'build':
        const build = require('../lib/build');
        build();
        break;
    case 'publish':
        const publish = require('../lib/publish');
        publish();
        break;
    case 'page':
        const page = require('../lib/page');
        page(commands);
        break;
    default:
        help.error('命令不正确!\n语法:uba --help');
        break;
}
