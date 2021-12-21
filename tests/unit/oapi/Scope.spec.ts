import emitter from '@/emitter'
import Scope from '@/model/OAPI/Scope'
import Start from '@/model/Service/Start'

describe('Scope', function () {
    const ss = Start.run({} as any, emitter, window as any)

    it('toOAPI', function () {
        const item = new Scope('read:user')
        item.description = 'a'

        const json = item.toOAPI(ss.finder)
        expect(json.description).toEqual(item.description)
    })
})
