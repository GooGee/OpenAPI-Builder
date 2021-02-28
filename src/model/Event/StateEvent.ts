import { EventEmitter } from 'events'
import StrictEventEmitter from 'strict-event-emitter-types'

interface CallBack {
    (data: Record<string, any>): void
}

export enum EventEnum {
    AfterCodeRun = 'AfterCodeRun',
    AfterProjectLoad = 'AfterProjectLoad',
}

interface Event {
    [EventEnum.AfterCodeRun]: CallBack
    [EventEnum.AfterProjectLoad]: CallBack
}

export default class StateEvent {
    readonly ee = new EventEmitter() as StrictEventEmitter<EventEmitter, Event>
}
