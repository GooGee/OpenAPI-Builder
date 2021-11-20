import StringObject from '../Entity/StringObject'
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

interface OAPIOAuthFlow {
    authorizationUrl?: string
    refreshUrl: string
    scopes: StringObject
    tokenUrl?: string
}

export default class OAuthFlow extends UniqueItem {
    authorizationUrl = ''
    refreshUrl = ''
    tokenUrl = ''
    readonly referenceManager = new ReferenceManager(TargetType.scope)

    toOAPI(finder: ReferenceFinder) {
        const targetxx = this.referenceManager.getTargetxx(finder) as Scope[]
        const scope: StringObject = {}
        targetxx.forEach((item) => (scope[item.un] = item.description))
        const result: OAPIOAuthFlow = {
            refreshUrl: this.refreshUrl,
            scopes: scope,
        }

        if (this.un === OAuthFlowEnum.authorizationCode) {
            result.authorizationUrl = this.authorizationUrl
            result.tokenUrl = this.tokenUrl
            return result
        }

        if (this.un === OAuthFlowEnum.clientCredentials) {
            result.tokenUrl = this.tokenUrl
            return result
        }

        if (this.un === OAuthFlowEnum.implicit) {
            result.authorizationUrl = this.authorizationUrl
            return result
        }

        if (this.un === OAuthFlowEnum.password) {
            result.tokenUrl = this.tokenUrl
            return result
        }

        return result
    }
}

export class OAuthFlowManager extends UniqueItemManager<OAuthFlow> {
    constructor() {
        super(OAuthFlow)
    }
}
