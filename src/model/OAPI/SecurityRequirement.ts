import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinder from '../Service/ReferenceFinder'
import { ReferenceManager, TargetType } from './Reference'
import SecurityScheme from './SecurityScheme'

interface OAPISecurityRequirement extends ObjectMap<string[]> {}

export class SecurityRequirementManager extends ReferenceManager {
    constructor() {
        super(TargetType.security)
    }

    toOAPIofTarget(
        finder: ReferenceFinder,
        target: SecurityScheme,
    ): OAPISecurityRequirement {
        const set: Set<string> = new Set()
        target.oAuthFlowManager.list.forEach((flow) => {
            flow.referenceManager
                .getTargetxx(finder)
                .forEach((scope) => set.add(scope.un))
        })
        return {
            [target.un]: Array.from(set.values()),
        }
    }

    toOAPIArray(finder: ReferenceFinder) {
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
