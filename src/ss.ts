import data from './asset/data.json'
import emitter from './emitter'
import Start from './model/Service/Start'
import { setLoading } from './store'

const ss = Start.run(data as any, emitter, window as any)

fetch('data.json')
    .then((response) => response.json())
    .then((json) => {
        ss.setData(json as any)
        setLoading()
    })
    .catch((reason) => alert(reason))

export default ss
