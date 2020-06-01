import KeyValue from "../Base/KeyValue"
import UniqueItem from "../Base/UniqueItem"
import UniqueList from "../Base/UniqueList"
import { OAuthFlows } from "./OAuthFlow"

export default class SecurityScheme extends UniqueItem {
    type: string = ''
    description: string = ''
    name2: string = ''
    location: string = ''
    scheme: string = ''
    bearerFormat: string = ''
    openIdConnectUrl: string = ''
    readonly flows = new OAuthFlows

    toAPI() {
        return {
            type: this.type,
            description: this.description,
            name: this.name2,
            in: this.location,
            scheme: this.scheme,
            bearerFormat: this.bearerFormat,
            openIdConnectUrl: this.openIdConnectUrl,
            flows: this.flows.toAPI(),
        }
    }
}

export class SecuritySchemeManager extends UniqueList<SecurityScheme> {

    constructor() {
        super(SecurityScheme)
    }

    toAPI() {
        const map: KeyValue = {}
        this.list.forEach(item => {
            map[item.name] = item.toAPI()
        })
        return map
    }
}
