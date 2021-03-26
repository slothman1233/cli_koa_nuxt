//watch,
const { src, dest, series, task } = require('gulp')
const del = require('del')
const ts = require('gulp-typescript')
const nodemon = require('gulp-nodemon')
const replace = require('gulp-replace')
const tsProject = ts.createProject('tsconfig.json')
const ENV = process.env.NODE_ENV || 'ga'
console.log(ENV)


function clean(cb) {
    return del(['dist'], cb)
}

// 输出 js 到 dist目录
function toJs() {
    return src(['src/**/*.ts', 'src/**/*.js', '!src/wwwroot/**/*', 'nuxt.config.ts'])
        .pipe(tsProject())
        .pipe(replace(`"../nuxt.config"`, `"./nuxt.config"`))
        .pipe(replace(`buildDir: 'dist/wwwroot',`, `buildDir: 'wwwroot/',`))
        .pipe(dest('dist'))
}

function topm2config() {
    return src(['pm2.conf.json'])
        .pipe(replace('src/bin/www.ts', `bin/www.js`))
        .pipe(replace('"NODE_ENV": "ga"', `"NODE_ENV": "${ENV}"`))
        .pipe(dest('dist'))
}

function towwwroot() {
    return src(['client/static/assets/**/*'])
        .pipe(dest('dist/wwwroot/assets'))
}
function towwwicon() {
    return src(['client/static/favicon.ico'])
        .pipe(dest('dist/wwwroot'))
}

//assets

function tostaticfile() {
    return src(['package.json'])
        .pipe(replace('NODE_ENV=ga', `NODE_ENV=${ENV}`))
        .pipe(dest('dist'))
}

// function tostaticwwwroot(){
//     return src(['src/wwwroot/**/*'])
//         .pipe(dest('dist/wwwroot'))
// }


function tostaticviews() {
    return src(['src/views/**/*'])
        .pipe(dest('dist/views'))
}


// nodemon 监控 ts 文件
function runNodemon(done) {
    let stream = nodemon({
        inspect: true,
        script: 'src/bin/www.ts',
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
const static = series(towwwroot, towwwicon, topm2config)
task('build', build)
task("static",static)
task('default', runNodemon)
exports.build = build
exports.default = runNodemon