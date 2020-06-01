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
        return {
            implicit: this.implicit.toAPI(),
            password: this.password.toAPI(),
            clientCredentials: this.clientCredentials.toAPI(),
            authorizationCode: this.authorizationCode.toAPI(),
        }
    }
}
