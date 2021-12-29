import { OAuthFlowManager } from '../OAPI/OAuthFlow'
import TargetType from '../OAPI/TargetType'
import Layer, { LayerManager } from './Layer'

export default class LayerSecurityScheme extends Layer {
    readonly oAuthFlowManager = new OAuthFlowManager()
    readonly scopeManager = new LayerManager(TargetType.scope)

    get unPattern() {
        return this.un
    }

    set unPattern(text: string) {
        this.un = text
    }
}
