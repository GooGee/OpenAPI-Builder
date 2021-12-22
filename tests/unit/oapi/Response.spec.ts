import emitter from '@/emitter'
import Response from '@/model/OAPI/Response'
import Start from '@/model/Service/Start'

describe('Response', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)
    const header = ss.headerManager.make('X-Rate-Limit')
    ss.headerManager.add(header)

    it('toOAPI', function () {
        const item = new Response('user')
        const mt = item.mediaTypeManager.make('json')
        item.mediaTypeManager.add(mt)
        mt.schema.ui = schema.ui
        const reference = item.headerManager.make(header.ui)
        item.headerManager.add(reference)

        const json = item.toOAPI(ss.finder)
        expect(json.content).toHaveProperty(mt.un, mt.toOAPI(ss.finder))
        if (json.headers) {
            expect(json.headers).toHaveProperty(header.un, reference.toOAPI(ss.finder))
        }
    })
})
