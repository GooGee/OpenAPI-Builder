import { LoDashStatic } from 'lodash'
import ColorEnum from './Entity/ColorEnum'
import Project from './Entity/Project'
import Schema from './OAPI/Schema'
import Generator from './Service/Generator'

export default interface DataForScript {
    ColorEnum: ColorEnum
    generator: Generator
    lodash: LoDashStatic
    project: Project
    schema?: Schema
}
