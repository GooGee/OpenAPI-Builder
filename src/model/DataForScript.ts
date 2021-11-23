import { LoDashStatic } from 'lodash'
import ColorEnum from './Entity/ColorEnum'
import Project from './Entity/Project'
import Schema from './OAPI/Schema'
import Factory from './Service/Factory'
import Vendor from './Vendor'

export default interface DataForScript {
    ColorEnum: ColorEnum
    factory: Factory
    lodash: LoDashStatic
    project: Project
    schema?: Schema
    vendor: Vendor
}
