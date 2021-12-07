import { OAuthFlowManager } from '../OAPI/OAuthFlow'
import { TargetType } from '../OAPI/Reference'
import Layer, { LayerManager } from './Layer'

export default class LayerSecurityScheme extends Layer {
    readonly oAuthFlowManager = new OAuthFlowManager()
    readonly scopeManager = new LayerManager(TargetType.scope)
}
