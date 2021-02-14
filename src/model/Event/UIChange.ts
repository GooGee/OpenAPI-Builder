import { EventEmitter } from 'events'
import StrictEventEmitter from 'strict-event-emitter-types'
import UniqueItem from '../Base/UniqueItem'

enum EventEnum {
    BeforeUIChange = 'BeforeUIChange',
    AfterUIChange = 'AfterUIChange',
}

interface CallBack<T extends UniqueItem> {
    (sender: T, ui: string, old: string): void
}

interface Event<T extends UniqueItem> {
    [EventEnum.BeforeUIChange]: CallBack<T>
    [EventEnum.AfterUIChange]: CallBack<T>
}

export default class UIChange<T extends UniqueItem> {
    readonly ee: StrictEventEmitter<
        EventEmitter,
        Event<T>
    > = new EventEmitter() as StrictEventEmitter<EventEmitter, Event<T>>

    emitAfterUIChange(sender: T, ui: string, old: string) {
        this.ee.emit(EventEnum.AfterUIChange, sender, ui, old)
    }

    emitBeforeUIChange(sender: T, ui: string, old: string) {
        this.ee.emit(EventEnum.BeforeUIChange, sender, ui, old)
    }

    onAfterUIChange(callback: CallBack<T>) {
        this.ee.on(EventEnum.AfterUIChange, callback)
    }

    onBeforeUIChange(callback: CallBack<T>) {
        this.ee.on(EventEnum.BeforeUIChange, callback)
    }
}
