/**
 * @file 入口模块
 * @author sparklewhy@gmail.com
 */

var pkgManage = require('fisx-package');

exports.name = 'search <components>';
exports.desc = 'search components package';
exports.options = {
    '-h, --help': 'print this help message',
    '-c, --cache': 'search components using the last cache',
    '--sort': 'the sort field: `stars`, `forks`, or `updated` (GitHub)',
    '--order': 'the order field: `asc`， `desc`, default: `desc` （GitHub）',
    '--in': 'qualifies which fields are searched: `name`, `description`, `readme`, '
        + 'or any combination of these：`name,description`, default: `name` (GitHub)',
    '--owner': 'limits searches to a specific user or repository, you can also '
        + 'search `ecomfe/xx` to specify the owner (GitHub)',
    '--stars': 'searches repositories based on the number of stars, e.g, `10..20`, `>=500` (GitHub)',
    '--language': 'searches repositories based on the language they\'re written in, default: `javascript` (GitHub)'
};

exports.run = function (argv, cli, env) {
    if (argv.h || argv.help) {
        return cli.help(exports.name, exports.options);
    }

    argv._.shift();
    var query = argv._.join(' ');
    var options = {
        root: env.cwd,
        useCache: argv.cache || argv.c
    };
    ['sort', 'order', 'in', 'owner', 'stars', 'language'].forEach(function (key) {
        options[key] = argv[key];
    });
    return pkgManage.initProjectRoot(env.configNameSearch[0], options, fis)
        .then(pkgManage.loadUserConfig.bind(this, env.configNameSearch[0], options, fis))
        .then(function () {
            return pkgManage.search(query, options);
        });
};
