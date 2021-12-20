import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import { ReferenceManager } from './Reference'
import SecurityScheme from './SecurityScheme'
import TargetType from './TargetType'

export type OAPISecurityRequirement = ObjectMap<string[]>

export class SecurityRequirementManager extends ReferenceManager {
    constructor() {
        super(TargetType.security)
    }

    toOAPIofTarget(
        finder: ReferenceFinderInterface,
        target: SecurityScheme,
    ): OAPISecurityRequirement {
        const set: Set<string> = new Set()
        target.oAuthFlowManager.list.forEach((flow) => {
            flow.scopeManager
                .getTargetxx(finder)
                .forEach((scope) => set.add(scope.un))
        })
        return {
            [target.un]: Array.from(set.values()),
        }
    }

    toOAPIArray(finder: ReferenceFinderInterface) {
        const set = new Set(this.list.map((item) => item.ui))
        const resultxx: OAPISecurityRequirement[] = []
        const targetxx = finder.findManager(TargetType.security).list
        targetxx.forEach((item) => {
            if (set.has(item.ui)) {
                resultxx.push(this.toOAPIofTarget(finder, item as SecurityScheme))
            }
        })
        return resultxx as any[]
    }
}
