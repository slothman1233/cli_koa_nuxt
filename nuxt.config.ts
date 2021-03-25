

const config = {
    dev: true,
    srcDir: 'client/',

    dir: {
        pages: 'views' // Nuxt will look for the views/ instead of the pages/ folder
    },

    pageTransition: 'page', //动画

    generate: {
        dir: 'wwwroot', // gh_pages/ instead of dist/
        subFolders: false // HTML files are generated according to the route path
    },
    env: {
        PATH_TYPE: process.env.PATH_TYPE
    },

    telemetry: false,

    server: {
        port: 2000, // default: 2000
        host: '0.0.0.0', // default: localhost,
        timing: { // server.timing可以是提供选项的对象。目前，支持total(直接跟踪服务器端渲染所花费的全部时间)
            total: true
        }
    },

    // globalName:"test",
    head: {
        title: 'test',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js TypeScript project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    loading: { color: '#3B8070' },
    css: ['~/static/style/main.css', "element-ui/lib/theme-chalk/index.css"],

    render: {
        compressor: false, // 不使用压缩
        http2: { push: false }
    },

    build: {
        cache: false,
        vendor: ['element-ui'],
        extractCSS: { allChunks: true },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
            // splitChunks: {
            //   cacheGroups: {
            //     common: {
            //       chunks: 'initial',
            //       name: 'testCommon', // 打包后的文件名
            //       minSize: 0,
            //       minChunks: 1 // 重复2次才能打包到此模块
            //     },
            //     vendor: {
            //       priority: 1, // 优先级配置，优先匹配优先级更高的规则，不设置的规则优先级默认为0
            //       test: /node_modules/, // 匹配对应文件
            //       chunks: 'initial',
            //       name: 'testVendor',
            //       minSize: 0,
            //       minChunks: 1
            //     }
            //   }
            // }
        },
        extend(config: any, { isDev, isClient }: any) {
            if (!isDev) {
                config.plugins[0].options.filename = 'style/[name].css?v=[contenthash:7]'
                config.plugins[0].options.chunkFilename = 'style/[name].css?v=[contenthash:7]'
            }
            if (isDev && isClient) {
                config.module.rules.push({
                    test: /\.ts$/,
                    exclude: [/node_modules/, /vendor/, /\.nuxt/],
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true
                    }
                })
            }

            config.node = {
                fs: 'empty'
            }
        },
        typescript: {
            typeCheck: true,
            ignoreNotFoundWarnings: true
        }

    },

    buildModules: ['@nuxt/typescript-build'],

    // modules: [
    //     '@nuxtjs/axios'
    // ],
    plugins: [
        { src: '~/plugins/truncate', ssr: true },
        { src: '~/plugins/elementui', ssr: true },

    ],

    loaders: {
        ts: {
            silent: true
        },
        tsx: {
            silent: true
        }
    },

    // - __dangerouslyDisableSanitizers 设置<script>中的内容不被转义。
    // - https://github.com/declandewet/vue-meta#__dangerouslydisablesanitizers-string
    __dangerouslyDisableSanitizers: ['script'],


    // - 自定义 postcss 配置
    // - https://nuxtjs.org/api/configuration-build#postcss
    // postcss: [
    //   require('autoprefixer')({
    //     browsers: ['> 1%', 'last 3 versions', 'not ie <= 8']
    //   })
    // ],

    // - 这里可以设置你的CDN地址，生成的静态资源将会基于此CDN地址加上URL前缀
    // publicPath: 'https://cdn.modb.pro/_nuxt/',

    // - Nuxt.js 允许你在生成的 vendor.js 文件中添加一些模块，以减少应用 bundle 的体积
    // - 这里说的是一些你所依赖的第三方模块 (比如 axios)，或者使用频率较高的一些自定义模块
    // - https://nuxtjs.org/api/configuration-build#vendor
    // vendor: [

    // ]
}

if (process.env.NODE_ENV === 'ga') {
    (<any>config.build).filenames = {
        manifest: 'js/manifest.js?v=[hash:7]',
        vendor: 'js/vendor.js?v=[hash:7]',
        app: 'js/main.js?v=[chunkhash:7]',
        // - `chunk` 这里这样使用编译会报错，最后面会讲解相关解决方案
        chunk: 'js/[name].js?v=[chunkhash:7]'
    }
}

export default config
