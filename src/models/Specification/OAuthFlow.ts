import KeyValue from "../Base/KeyValue"
import Item from "../Base/Item"
import { NameValueManager } from "./NameValue"

export default class OAuthFlow extends Item {
    authorizationUrl: string = ''
    tokenUrl: string = ''
    refreshUrl: string = ''
    readonly manager = new NameValueManager()

    toAPI() {
        return {
            authorizationUrl: this.authorizationUrl,
            tokenUrl: this.tokenUrl,
            refreshUrl: this.refreshUrl,
            scopes: this.manager.toAPI()
        }
    }
}

export class OAuthFlows extends Item {
    readonly implicit = new OAuthFlow
    readonly password = new OAuthFlow
    readonly clientCredentials = new OAuthFlow
    readonly authorizationCode = new OAuthFlow

    toAPI() {
        const map: KeyValue = {}
        if (this.implicit.authorizationUrl) {
            map['implicit'] = this.implicit.toAPI()
        }
        if (this.password.authorizationUrl) {
            map['password'] = this.password.toAPI()
        }
        if (this.clientCredentials.authorizationUrl) {
            map['clientCredentials'] = this.clientCredentials.toAPI()
        }
        if (this.authorizationCode.authorizationUrl) {
            map['authorizationCode'] = this.authorizationCode.toAPI()
        }
        return map
    }
}
