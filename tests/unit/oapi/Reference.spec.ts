import emitter from '@/emitter'
import Reference from '@/model/OAPI/Reference'
import TargetType from '@/model/OAPI/TargetType'
import Start from '@/model/Service/Start'

describe('Reference', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)

    it('getTarget', function () {
        const item = new Reference(schema.ui, TargetType.schemas)
        expect(item.getTarget(ss.finder)).toEqual(schema)
    })

    it('getText', function () {
        const item = new Reference(schema.ui, TargetType.schemas)
        expect(item.getText(ss.finder)).toBe('#/components/schemas/cat')
        item.ui = 0
        expect(item.getText(ss.finder)).toBe('?')
    })

    it('toOAPI', function () {
        const item = new Reference(schema.ui, TargetType.schemas)
        const json = item.toOAPI(ss.finder)
        expect(json).toHaveProperty('$ref', item.getText(ss.finder))
    })
})
