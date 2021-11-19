import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import Reference, { TargetType } from './Reference'

export default class SecurityRequirement extends UniqueItem {
    readonly reference = new Reference(0, TargetType.security)

    toOAPIofTarget<T extends UniqueItem>(target?: T) {
        if (target === undefined) {
            return {}
        }
        return {
            [target.un]: [],
        }
    }
}

export class SecurityRequirementManager extends UniqueItemManager<SecurityRequirement> {
    constructor() {
        super(SecurityRequirement)
    }
}
