import emitter from '@/emitter'
import OAuthFlow from '@/model/OAPI/OAuthFlow'
import Start from '@/model/Service/Start'

describe('OAuthFlow', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const scope = ss.scopeManager.make('read:user')
    ss.scopeManager.add(scope)

    it('toOAPI', function () {
        const item = new OAuthFlow('implicit')
        item.refreshUrl = 'a'
        const reference = item.scopeManager.make(scope.ui)
        item.scopeManager.add(reference)

        const json = item.toOAPI(ss.finder)
        expect(json.refreshUrl).toBe(item.refreshUrl)
        expect(json.scopes).toHaveProperty(scope.un, scope.description)
    })
})
