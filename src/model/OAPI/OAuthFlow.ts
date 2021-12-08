import ObjectMap from '../Entity/ObjectMap'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import ReferenceFinder from '../Service/ReferenceFinder'
import { ReferenceManager, TargetType } from './Reference'
import Scope from './Scope'

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
    readonly referenceManager = new ReferenceManager(TargetType.scope)

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

    toOAPI(finder: ReferenceFinder) {
        const targetxx = this.referenceManager.getTargetxx(finder) as Scope[]
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
            const item = this.list[0].referenceManager.make(ui)
            this.list.forEach((flow) => flow.referenceManager.add(item))
        }
    }
}
