import emitter from '@/emitter'
import { SecurityRequirementManager } from '@/model/OAPI/SecurityRequirement'
import Start from '@/model/Service/Start'

describe('SecurityRequirementManager', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const security = ss.securitySchemeManager.make('cat')
    ss.securitySchemeManager.add(security)

    it('toOAPIArray', function () {
        const manager = new SecurityRequirementManager()
        const item = manager.make(security.ui)
        manager.add(item)

        const json = manager.toOAPIArray(ss.finder)
        expect(json[0]).toEqual(manager.toOAPIofTarget(ss.finder, security))
    })
})
