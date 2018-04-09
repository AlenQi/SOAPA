const isProduction = process.env.NODE_ENV === 'production'

const AssetsIP = isProduction ? '' : 'http://114.55.219.41:8092'
// const AssetsIP = isProduction ? '' : 'http://192.168.2.190:8092'

export { AssetsIP }
