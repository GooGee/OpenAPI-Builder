import { EventEmitter } from 'events'
import StrictEventEmitter from 'strict-event-emitter-types'
import Dialogue from '../Dialogue/Dialogue'

interface CallBack {
    (data: Dialogue): void
}

export enum EventEnum {
    VisibilityChange = 'VisibilityChange',
}

interface Event {
    [EventEnum.VisibilityChange]: CallBack
}

export default class DialogueEvent {
    readonly ee = new EventEmitter() as StrictEventEmitter<EventEmitter, Event>
}
