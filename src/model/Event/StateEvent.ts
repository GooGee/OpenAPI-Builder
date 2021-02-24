import { EventEmitter } from 'events'
import StrictEventEmitter from 'strict-event-emitter-types'

interface CallBack {
    (data: Record<string, any>): void
}

export enum EventEnum {
    AfterProjectLoad = 'AfterProjectLoad',
}

interface Event {
    [EventEnum.AfterProjectLoad]: CallBack
}

export default class StateEvent {
    readonly ee = new EventEmitter() as StrictEventEmitter<EventEmitter, Event>
}
