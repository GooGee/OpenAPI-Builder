import { LoDashStatic } from 'lodash'
import Project from './Data/Project'
import Schema from './OAPI/Schema'
import Generator from './Service/Generator'

export default interface DataForScript {
    generator: Generator
    lodash: LoDashStatic
    project: Project
    schema: Schema
}