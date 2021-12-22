import emitter from '@/emitter'
import NameReference from '@/model/OAPI/NameReference'
import TargetType from '@/model/OAPI/TargetType'
import Start from '@/model/Service/Start'

describe('NameReference', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)

    it('toOAPI', function () {
        const item = new NameReference('cat', TargetType.schemas)
        item.reference.ui = schema.ui

        const json = item.toOAPI(ss.finder)
        expect(json).toHaveProperty('$ref', item.reference.getText(ss.finder))
    })
})
