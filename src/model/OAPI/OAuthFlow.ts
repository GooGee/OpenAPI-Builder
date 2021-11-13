import KeyValue from '../Entity/KeyValue'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import { ValueItemManager } from '../Entity/ValueItem'
import ReferenceFinder from '../Service/ReferenceFinder'

enum OAuthFlowEnum {
    authorizationCode = 'authorizationCode',
    clientCredentials = 'clientCredentials',
    implicit = 'implicit',
    password = 'password',
}

export default class OAuthFlow extends UniqueItem {
    authorizationUrl = ''
    refreshUrl = ''
    tokenUrl = ''
    readonly scopeManager = new ValueItemManager()

    toOAPI(finder: ReferenceFinder) {
        const result: KeyValue = {
            refreshUrl: this.refreshUrl,
            scopes: this.scopeManager.toOAPI(finder),
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
