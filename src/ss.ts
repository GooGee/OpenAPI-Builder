import data from './asset/data.json'
import emitter from './emitter'
import Start from './model/Service/Start'

const ss = Start.run(data as any, emitter, window as any)

export default ss
