import Builder from '../models/Builder'
import Loader from '../models/Loader/Loader'

const builder = new Builder()
export default builder

export function load(source) {
    const loader = new Loader(builder)
    loader.load(source)
}
