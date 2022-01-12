import emitter from '@/emitter'
import { SchemaFieldManager } from '@/model/OAPI/SchemaField'
import Start from '@/model/Service/Start'

describe('SchemaFieldManager', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)

    it('changeUN', function () {
        const manager = new SchemaFieldManager()
        const aa = manager.make('name')
        aa.schemaUI = schema.ui
        manager.add(aa)

        const bb = manager.make(aa.un)
        manager.add(bb)
        expect(manager.list.length).toBe(2)

        const cc = manager.make(aa.un)
        expect(() => manager.add(cc)).toThrowError()

        manager.changeUN(aa, 'ss')
        expect(aa.un).toBe('ss')
    })

    it('findAllField', function () {
        const manager = new SchemaFieldManager()
        const aa = manager.make('name')
        aa.schemaUI = schema.ui
        manager.add(aa)

        const bb = manager.make(aa.un)
        manager.add(bb)

        const list = manager.findAllField(schema.ui)
        expect(list.length).toBe(1)
    })

    it('findField', function () {
        const manager = new SchemaFieldManager()
        const aa = manager.make('name')
        aa.schemaUI = schema.ui
        manager.add(aa)

        const item = manager.findField(aa.ui, aa.un)
        expect(item).toEqual(aa)
    })

    it('throwIfNotUnique', function () {
        const manager = new SchemaFieldManager()
        const item = manager.make('name')
        manager.add(item)

        expect(() => manager.add(item)).toThrowError()
    })
})
