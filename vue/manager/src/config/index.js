import devConfig from './dev.env'
import proConfig from './pro.env'
let envConfig = {}
if (process.env.NODE_ENV === 'production') {
  envConfig = proConfig
} else if (process.env.NODE_ENV === 'development') {
  envConfig = devConfig
}

export default envConfig
