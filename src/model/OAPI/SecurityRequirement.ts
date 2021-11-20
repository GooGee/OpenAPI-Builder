import ReferenceFinder from '../Service/ReferenceFinder'
import { ReferenceManager, TargetType } from './Reference'
import SecurityScheme from './SecurityScheme'

interface OAPISecurityRequirement {
    [key: string]: string[]
}

export class SecurityRequirementManager extends ReferenceManager {
    constructor() {
        super(TargetType.security)
    }

    toOAPIofTarget(target: SecurityScheme): OAPISecurityRequirement {
        const set: Set<string> = new Set()
        target.oAuthFlowManager.list.forEach((flow) => {
            flow.scopeManager.list.forEach((scope) => set.add(scope.un))
        })
        return {
            [target.un]: Array.from(set.values()),
        }
    }

    toOAPI(finder: ReferenceFinder) {
        const set = new Set(this.list.map((item) => item.ui))
        const resultxx: OAPISecurityRequirement[] = []
        const targetxx = finder.findManager(TargetType.security)
            .list as SecurityScheme[]
        targetxx.forEach((item) => {
            if (set.has(item.ui)) {
                resultxx.push(this.toOAPIofTarget(item))
            }
        })
        return resultxx
    }
}
