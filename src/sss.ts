import 'reflect-metadata'
import preset from './assets/preset.json'
import Start from './model/Service/Start'

const sss = Start.run(preset as any, window as any)

export default sss
