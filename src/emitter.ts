import mitt from 'mitt'
import Event from './model/Entity/Event'

const emitter = mitt<Event>()

export default emitter
