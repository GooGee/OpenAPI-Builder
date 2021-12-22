import emitter from '@/emitter'
import { ReferenceManager } from '@/model/OAPI/Reference'
import TargetType from '@/model/OAPI/TargetType'
import Start from '@/model/Service/Start'

describe('ReferenceManager', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)

    it('add', function () {
        const manager = new ReferenceManager(TargetType.schemas)
        const item = manager.make(schema.ui)
        manager.add(item)

        expect(item.ui).toBe(schema.ui)
        expect(() => manager.add(item)).toThrowError()
    })

    it('getTargetxx', function () {
        const manager = new ReferenceManager(TargetType.schemas)
        const item = manager.make(schema.ui)
        manager.add(item)

        const list = manager.getTargetxx(ss.finder)
        expect(list[0]).toEqual(schema)
    })

    it('getUNxx', function () {
        const manager = new ReferenceManager(TargetType.schemas)
        const item = manager.make(schema.ui)
        manager.add(item)

        const list = manager.getUNxx(ss.finder)
        expect(list).toContain(schema.un)
    })

    it('toOAPI', function () {
        const manager = new ReferenceManager(TargetType.schemas)
        const item = manager.make(schema.ui)
        manager.add(item)

        const json = manager.toOAPI(ss.finder)
        expect(json).toHaveProperty(schema.un)
    })

    it('toOAPIArray', function () {
        const manager = new ReferenceManager(TargetType.schemas)
        const item = manager.make(schema.ui)
        manager.add(item)

        const json = manager.toOAPIArray(ss.finder)
        expect(json[0]).toHaveProperty('$ref', item.getText(ss.finder))
    })
})
