import { Emitter } from 'mitt'

export enum EventEnum {
    'sidebar-list-change',
}

type Event = Record<EventEnum, any>

export type EmitterType = Emitter<Event>

export default Event
