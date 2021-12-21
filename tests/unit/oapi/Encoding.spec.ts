import emitter from '@/emitter'
import Encoding from '@/model/OAPI/Encoding'
import Start from '@/model/Service/Start'

describe('Encoding', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const header = ss.headerManager.make('X-Rate-Limit')
    ss.headerManager.add(header)

    it('toOAPI', function () {
        const item = new Encoding('image')
        item.contentType = 'image/*'
        const reference = item.headerManager.make(header.ui)
        item.headerManager.add(reference)

        const json = item.toOAPI(ss.finder)
        expect(json.contentType).toBe(item.contentType)
        if (json.headers) {
            expect(json.headers).toHaveProperty(header.un, reference.toOAPI(ss.finder))
        }
    })
})
