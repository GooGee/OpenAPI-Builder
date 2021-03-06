import KeyValue from '../Base/KeyValue'
import { ValueItemManager } from '../Base/ValueItem'
import UniqueItemManager from '../Base/UniqueItemManager'
import UniqueItem from '../Base/UniqueItem'

class ScopeManager extends ValueItemManager {}

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
    readonly scopeManager = new ScopeManager()

    toOAPI() {
        const result: KeyValue = {
            refreshUrl: this.refreshUrl,
            scopes: this.scopeManager.toOAPI(),
        }

        if (this.ui === OAuthFlowEnum.authorizationCode) {
            result.authorizationUrl = this.authorizationUrl
            result.tokenUrl = this.tokenUrl
            return result
        }

        if (this.ui === OAuthFlowEnum.clientCredentials) {
            result.tokenUrl = this.tokenUrl
            return result
        }

        if (this.ui === OAuthFlowEnum.implicit) {
            result.authorizationUrl = this.authorizationUrl
            return result
        }

        if (this.ui === OAuthFlowEnum.password) {
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
