import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import SideBarItem from '../Entity/SideBarItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { OAPIReference } from './ReferenceInterface'
import SchemaField, { OAPISchemaField } from './SchemaField'

export enum Location {
    cookie = 'cookie',
    header = 'header',
    path = 'path',
    query = 'query',
}

interface OAPIParameter {
    allowEmptyValue: boolean
    deprecated: boolean
    description: string
    example?: string
    in?: string
    name?: string
    required: boolean
    schema: OAPISchemaField | OAPIReference
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

    toOAPI(finder: ReferenceFinderInterface) {
        const result: OAPIParameter = {
            allowEmptyValue: this.allowEmptyValue,
            deprecated: this.deprecated,
            description: this.description,
            required: this.required,
            schema: this.schema.toOAPI(finder),
        }
        if (this.example) {
            result.example = this.example
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
