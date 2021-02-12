import { EventEmitter } from 'events'
import StrictEventEmitter from 'strict-event-emitter-types'

enum EventEnum {
    BeforeFieldDelete = 'BeforeFieldDelete',
    AfterFieldDelete = 'AfterFieldDelete',
}

interface CallBack<T1, T2> {
    (sender: T1, item: T2): void
}

interface Event<T1, T2> {
    [EventEnum.BeforeFieldDelete]: CallBack<T1, T2>
    [EventEnum.AfterFieldDelete]: CallBack<T1, T2>
}

export default class ItemDeleteListener<T1, T2> {
    readonly ee: StrictEventEmitter<
        EventEmitter,
        Event<T1, T2>
    > = new EventEmitter() as StrictEventEmitter<EventEmitter, Event<T1, T2>>

    emitAfterFieldDelete(sender: T1, item: T2) {
        this.ee.emit(EventEnum.AfterFieldDelete, sender, item)
    }

    emitBeforeFieldDelete(sender: T1, item: T2) {
        this.ee.emit(EventEnum.BeforeFieldDelete, sender, item)
    }

    onAfterFieldDelete(callback: CallBack<T1, T2>) {
        this.ee.on(EventEnum.AfterFieldDelete, callback)
    }

    onBeforeFieldDelete(callback: CallBack<T1, T2>) {
        this.ee.on(EventEnum.BeforeFieldDelete, callback)
    }
}
