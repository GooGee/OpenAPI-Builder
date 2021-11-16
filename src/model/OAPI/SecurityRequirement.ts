import UniqueItem from '../Entity/UniqueItem'
import Reference, { ReferenceManager, TargetType } from './Reference'

export default class SecurityRequirement extends Reference {
    toOAPIofTarget<T extends UniqueItem>(target?: T) {
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
