import emitter from '@/emitter'
import RequestBody from '@/model/OAPI/RequestBody'
import Start from '@/model/Service/Start'

describe('RequestBody', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)

    it('toOAPI', function () {
        const item = new RequestBody('user')
        const mt = item.mediaTypeManager.make('json')
        item.mediaTypeManager.add(mt)
        mt.schema.ui = schema.ui

        const json = item.toOAPI(ss.finder)
        expect(json.content).toHaveProperty(mt.un, mt.toOAPI(ss.finder))
    })
})
