import Reference, { TargetType } from '../OAPI/Reference'
import ReferenceFinder from '../Service/ReferenceFinder'
import Script from './Script'
import SideBarItem from './SideBarItem'

export default class Layer extends SideBarItem {
    namePattern = '${schema.un}${layer.un}'
    readonly script = new Reference(0, TargetType.script)

    getScript(finder: ReferenceFinder) {
        return finder.find(this.script.ui, TargetType.script) as Script
    }
}
