const middleware = {}

middleware['index'] = require('..\\client\\middleware\\index.ts')
middleware['index'] = middleware['index'].default || middleware['index']

export default middleware
