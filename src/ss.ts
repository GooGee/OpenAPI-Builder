import data from './asset/data.json'
import Vendor from './model/Vendor'

const ss = new Vendor(data as any)

const w = window as any
w.ss = ss

export default ss
