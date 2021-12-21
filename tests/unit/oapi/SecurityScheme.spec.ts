import emitter from '@/emitter'
import SecurityScheme, { SecurityType } from '@/model/OAPI/SecurityScheme'
import Start from '@/model/Service/Start'

describe('SecurityScheme', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const scope = ss.scopeManager.make('read:user')
    ss.scopeManager.add(scope)

    it('toOAPI', function () {
        const item = new SecurityScheme('user')
        item.type = SecurityType.oauth2
        const flow = item.oAuthFlowManager.make('implicit')
        item.oAuthFlowManager.add(flow)
        const sr = flow.scopeManager.make(scope.ui)
        flow.scopeManager.add(sr)

        const json = item.toOAPI(ss.finder)
        expect(json.type).toBe(item.type)
        if (json.flows) {
            expect(json.flows).toHaveProperty(flow.un, flow.toOAPI(ss.finder))
        }
    })
})
