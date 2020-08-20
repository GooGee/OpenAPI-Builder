import { EventEmitter } from 'events'
import StrictEventEmitter from 'strict-event-emitter-types'
import UniqueItem from './Base/UniqueItem'
import ItemList from './Base/ItemList'
import Item from './Base/Item'

export enum EventEnum {
    AfterItemAdd = 'AfterItemAdd',
    BeforeNameChange = 'BeforeNameChange',
    AfterNameChange = 'AfterNameChange',
    AfterFieldNameChange = 'AfterFieldNameChange',
    AfterScriptNameChange = 'AfterScriptNameChange',
    AfterTemplateNameChange = 'AfterTemplateNameChange',
}

export interface Event {
    [EventEnum.AfterItemAdd]: (sender: ItemList<Item>, item: Item) => void
    [EventEnum.BeforeNameChange]: (sender: UniqueItem, old: string, name: string) => void
    [EventEnum.AfterNameChange]: (sender: UniqueItem, old: string, name: string) => void
}


const ee: StrictEventEmitter<EventEmitter, Event> = new EventEmitter
ee.setMaxListeners(112233)

export default ee