'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'release'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.11.conf')

const remote = require('scp2');

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  release complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
        remote.scp('dist/static/', {
            host: '14.118.130.21',
            port:1720,
            username: 'root',
            password: 'R21000332+rwuchuwei!',
            path: '/home/web_test/vue-pda/static/'
        }, function (err) {
            if(err){
                console.error(err);
                process.exit(1);
            }
            remote.scp('dist/index.html',{
                host: '14.118.130.21',
                username: 'root',
                port:1720,
                password: 'R21000332+rwuchuwei!',
                path: '/home/web_test/vue-pda'
            },function(err){
                if(err){
                    console.error(err);
                    process.exit(1);
                }
                console.log(`remote upload finish...`);
            })
        });
    })
})
