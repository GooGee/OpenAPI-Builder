import emitter from '@/emitter'
import Operation from '@/model/OAPI/Operation'
import Path from '@/model/OAPI/Path'
import Start from '@/model/Service/Start'

describe('Operation', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const path = new Path('/user/{id}')
    const parameter = ss.parameterManager.make('id')
    ss.parameterManager.add(parameter)
    const rb = ss.requestBodyManager.make('user')
    ss.requestBodyManager.add(rb)
    const security = ss.securitySchemeManager.make('user')
    ss.securitySchemeManager.add(security)
    const tag = ss.tagManager.make('user')
    ss.tagManager.add(tag)

    it('toOAPI', function () {
        const item = new Operation('get', path)
        const pr = item.parameterManager.make(parameter.ui)
        item.parameterManager.add(pr)
        item.requestBody.ui = rb.ui
        const sr = item.securityManager.make(security.ui)
        item.securityManager.add(sr)
        const status = item.statusManager.make('200')
        item.statusManager.add(status)
        const tr = item.tagManager.make(tag.ui)
        item.tagManager.add(tr)

        const json = item.toOAPI(ss.finder)
        if (json.parameters) {
            expect(json.parameters[0]).toEqual(pr.toOAPI(ss.finder))
        }
        expect(json.requestBody).toEqual(item.requestBody.toOAPI(ss.finder))
        expect(json.security[0]).toEqual(
            item.securityManager.toOAPIofTarget(ss.finder, security),
        )
        expect(json.responses).toHaveProperty(status.un, status.toOAPI(ss.finder))
        expect(json.tags[0]).toEqual(tag.un)
    })
})
