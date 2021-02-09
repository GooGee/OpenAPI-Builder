import { EventEmitter } from 'events'
import StrictEventEmitter from 'strict-event-emitter-types'
import UniqueItem from '../Base/UniqueItem'

enum EventEnum {
    BeforeUIChange = 'BeforeUIChange',
    AfterUIChange = 'AfterUIChange',
}

interface CallBack<T> {
    (sender: T, name: string, old: string): void
}

interface Event<T> {
    [EventEnum.BeforeUIChange]: CallBack<T>
    [EventEnum.AfterUIChange]: CallBack<T>
}

class UIChangeListener<T> {
    readonly ee: StrictEventEmitter<
        EventEmitter,
        Event<T>
    > = new EventEmitter() as StrictEventEmitter<EventEmitter, Event<T>>

    emitAfterUIChange(sender: T, name: string, old: string) {
        this.ee.emit(EventEnum.AfterUIChange, sender, name, old)
    }

    emitBeforeUIChange(sender: T, name: string, old: string) {
        this.ee.emit(EventEnum.BeforeUIChange, sender, name, old)
    }

    onAfterUIChange(callback: CallBack<T>) {
        this.ee.on(EventEnum.AfterUIChange, callback)
    }

    onBeforeUIChange(callback: CallBack<T>) {
        this.ee.on(EventEnum.BeforeUIChange, callback)
    }
}

const listener = new UIChangeListener<UniqueItem>()
listener.ee.setMaxListeners(111222333)

export default listener
