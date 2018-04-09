const isProduction = process.env.NODE_ENV === 'production'

let AssetsIP

if (isProduction) {
  AssetsIP = ''
} else {
  AssetsIP = 'http://114.55.219.41:8092' // dev service
  // AssetsIP = 'http://192.168.2.190:8092' // local service
}

export { AssetsIP }
