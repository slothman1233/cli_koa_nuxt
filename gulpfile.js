//watch,
const { src, dest, series, task } = require('gulp')
const del = require('del')
const ts = require('gulp-typescript')
const nodemon = require('gulp-nodemon')
const replace = require('gulp-replace')
const tsProject = ts.createProject('tsconfig.json')
const ENV = process.env.NODE_ENV



function clean(cb) {
    return del(['dist'], cb)
}

// 输出 js 到 dist目录
function toJs() {
    return src(['server/**/*.ts', 'server/**/*.js', '!server/wwwroot/**/*','nuxt.config.ts'])
        .pipe(tsProject())
        .pipe(replace(`"../nuxt.config"`,`"./nuxt.config"`))
        .pipe(dest('dist'))
}


function tostaticfile() {

    return src(['package.json'])
        .pipe(replace('NODE_ENV=ga', `NODE_ENV=${ENV}`))
        .pipe(dest('dist'))
}

// function tostaticwwwroot(){
//     return src(['server/wwwroot/**/*'])
//         .pipe(dest('dist/wwwroot'))
// }


function tostaticviews(){
    return src(['server/views/**/*'])
        .pipe(dest('dist/views'))
}


// nodemon 监控 ts 文件
function runNodemon(done) {
    let stream = nodemon({
        inspect: true,
        script: 'server/bin/www.ts',
        watch: 'src',
        ext: 'ts',
        env: { NODE_ENV: ENV },
        // done: done
        // tasks: ['build'],
    })

    stream.on('restart', function () {
        console.log('nodemon启动成功!')
    }).on('crash', (e) => {
        console.log(e)
        console.error('启动失败，10秒后重启\n')
        stream.emit('restart', 10)  // restart the server in 10 seconds
    })
}

const build = series(clean, toJs, tostaticfile, tostaticviews)
task('build', build)
task('default', runNodemon)
exports.build = build
exports.default = runNodemon