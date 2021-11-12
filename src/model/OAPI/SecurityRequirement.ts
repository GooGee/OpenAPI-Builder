import ReferenceFinder from '../Service/ReferenceFinder'
import Reference, { ReferenceManager, TargetType } from './Reference'

export default class SecurityRequirement extends Reference {
    toOAPI(finder: ReferenceFinder) {
        const target = finder.find(this.ui, this.type)
        if (target === undefined) {
            return {}
        }
        return {
            [target.un]: [],
        }
    }
}

export class SecurityRequirementManager extends ReferenceManager<SecurityRequirement> {
    constructor() {
        super(TargetType.security, SecurityRequirement)
    }
}
