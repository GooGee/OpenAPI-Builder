import Item from '@/model/Entity/Item'
import ItemManager from '@/model/Entity/ItemManager'

describe('ItemManager', function () {
    it('load', function () {
        const old = new ItemManager<Item>(Item)
        const item = old.make()
        old.add(item)

        const manager = new ItemManager<Item>(Item)
        manager.load(old)
        expect(manager.list.length).toBe(1)
    })

    it('loadList', function () {
        const old = new ItemManager<Item>(Item)
        const item = old.make()
        old.add(item)

        const manager = new ItemManager<Item>(Item)
        manager.loadList(old.list)
        expect(manager.list.length).toBe(1)
    })

    it('make', function () {
        const manager = new ItemManager<Item>(Item)
        const item = manager.make()
        expect(item instanceof Item).toBe(true)
    })

    it('toJSON', function () {
        const manager = new ItemManager<Item>(Item)
        const item = manager.make()
        manager.add(item)

        const json = manager.toJSON()
        expect(json.list.length).toBe(1)
    })

    it('toOAPIArray', function () {
        const manager = new ItemManager<Item>(Item)
        const item = manager.make()
        manager.add(item)

        const json = manager.toOAPIArray()
        expect(json.length).toBe(1)
    })
})
