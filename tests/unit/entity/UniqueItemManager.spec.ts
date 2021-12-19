import emitter from '@/emitter'
import UniqueItem from '@/model/Entity/UniqueItem'
import UniqueItemManager from '@/model/Entity/UniqueItemManager'
import Start from '@/model/Service/Start'

describe('UniqueItemManager', function () {
    const data = {
        un: 'a',
    }

    it('changeUN', function () {
        const manager = new UniqueItemManager(UniqueItem)
        const item = manager.make(data.un)
        manager.add(item)
        expect(item.un).toBe(data.un)
        manager.changeUN(item, 'b')
        expect(item.un).toBe('b')
        manager.add(manager.make('c'))
        expect(() => manager.changeUN(item, 'c')).toThrowError()
    })

    it('filter', function () {
        const manager = new UniqueItemManager(UniqueItem)
        const item = manager.make(data.un)
        manager.add(item)
        const list = manager.filter(item.un)
        expect(list.length).toBe(1)
        expect(list[0]).toEqual(item)
    })

    it('findByUN', function () {
        const manager = new UniqueItemManager(UniqueItem)
        const item = manager.make(data.un)
        manager.add(item)
        expect(manager.findByUN(item.un)).toEqual(item)
    })

    it('hasSame', function () {
        const manager = new UniqueItemManager(UniqueItem)
        const item = manager.make(data.un)
        manager.add(item)
        expect(manager.hasSame(item.ui, item.un)).toBe(true)
    })

    it('hasUN', function () {
        const manager = new UniqueItemManager(UniqueItem)
        const item = manager.make(data.un)
        manager.add(item)
        expect(manager.hasUN(item.un)).toBe(true)
    })

    it('throw', function () {
        const manager = new UniqueItemManager(UniqueItem)
        const item = manager.make(data.un)
        manager.add(item)
        expect(() => manager.add(item)).toThrowError()
    })

    it('toJSON', function () {
        const manager = new UniqueItemManager(UniqueItem)
        const item = manager.make(data.un)
        manager.add(item)

        const json = manager.toJSON()
        expect(json.nextUI).toBe(2)
        expect(json.list.length).toBe(1)
        expect(json.list[0]).toEqual(item)
    })

    it('toOAPI', function () {
        const manager = new UniqueItemManager(UniqueItem)
        const item = manager.make(data.un)
        manager.add(item)

        const ss = Start.run({} as any, emitter, window as any)

        const json = manager.toOAPI(ss.finder)
        expect(json).toHaveProperty(item.un, item.toOAPI(ss.finder))
    })

    it('unxx', function () {
        const manager = new UniqueItemManager(UniqueItem)
        const item = manager.make(data.un)
        manager.add(item)

        const list = manager.unxx
        expect(list.length).toBe(1)
        expect(list[0]).toEqual(item.un)
    })
})
