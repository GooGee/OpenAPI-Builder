import ObjectMap from '../Entity/ObjectMap'
import ReferenceFinderInterface from '../Entity/ReferenceFinderInterface'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { ReferenceManager } from './Reference'
import Scope from './Scope'
import TargetType from './TargetType'

enum OAuthFlowEnum {
    authorizationCode = 'authorizationCode',
    clientCredentials = 'clientCredentials',
    implicit = 'implicit',
    password = 'password',
}

export interface OAPIOAuthFlow {
    authorizationUrl?: string
    refreshUrl: string
    scopes: ObjectMap
    tokenUrl?: string
}

export default class OAuthFlow extends UniqueItem {
    authorizationUrl = ''
    refreshUrl = ''
    tokenUrl = ''
    readonly scopeManager = new ReferenceManager(TargetType.scope)

    get hasAuthorization() {
        return (
            this.un === OAuthFlowEnum.implicit ||
            this.un === OAuthFlowEnum.authorizationCode
        )
    }

    get hasToken() {
        if (this.un === OAuthFlowEnum.implicit) {
            return false
        }
        return true
    }

    toOAPI(finder: ReferenceFinderInterface) {
        const targetxx = this.scopeManager.getTargetxx(finder) as Scope[]
        const scope: ObjectMap = {}
        targetxx.forEach((item) => (scope[item.un] = item.description))
        const result: OAPIOAuthFlow = {
            refreshUrl: this.refreshUrl,
            scopes: scope,
        }

        if (this.hasAuthorization) {
            result.authorizationUrl = this.authorizationUrl
        }
        if (this.hasToken) {
            result.tokenUrl = this.tokenUrl
        }
        return result
    }
}

export class OAuthFlowManager extends UniqueItemManager<OAuthFlow> {
    constructor() {
        super(OAuthFlow)
    }

    addToAll(ui: number) {
        if (this.list.length) {
            const item = this.list[0].scopeManager.make(ui)
            this.list.forEach((flow) => flow.scopeManager.add(item))
        }
    }
}
