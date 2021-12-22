import emitter from '@/emitter'
import { NameReferenceManager } from '@/model/OAPI/NameReference'
import TargetType from '@/model/OAPI/TargetType'
import Start from '@/model/Service/Start'

describe('NameReferenceManager', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)

    it('add', function () {
        const manager = new NameReferenceManager(TargetType.schemas)
        const item = manager.make('200')
        item.ui = 2
        manager.add(item)

        expect(item.ui).toBe(1)
        expect(() => manager.add(item)).toThrowError()
    })

    it('toOAPI', function () {
        const manager = new NameReferenceManager(TargetType.schemas)
        const item = manager.make('200')
        manager.add(item)
        item.ui = schema.ui

        const json = manager.toOAPI(ss.finder)
        expect(json).toHaveProperty(item.un, item.reference.toOAPI(ss.finder))
    })
})
