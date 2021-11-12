import KeyValue from '../Entity/KeyValue'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import SchemaField from './SchemaField'

export enum Location {
    cookie = 'cookie',
    header = 'header',
    path = 'path',
    query = 'query',
}

export default class Parameter extends SideBarItem {
    allowEmptyValue = false

    deprecated = false
    description = ''
    example = ''
    location: Location
    name = ''
    required = true
    readonly schema = new SchemaField(this.un)

    constructor(name: string, location: Location = Location.cookie) {
        super(name)
        this.name = name
        this.location = location
    }

    toOAPI(finder: ReferenceFinder) {
        const result: KeyValue = {
            required: this.required,
            description: this.description,
            schema: this.schema.toOAPI(finder),
        }

        if (this.location === Location.header) {
            return result
        }

        result.name = this.name
        result.in = this.location
        return result
    }
}

export class ParameterManager extends UniqueItemManager<Parameter> {
    readonly location: Location

    constructor(location: Location) {
        super(Parameter)
        this.location = location
    }

    make(name: string, location: Location = this.location) {
        const item = new Parameter(name, location)
        return item
    }
}
