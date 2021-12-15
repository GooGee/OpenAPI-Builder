import UIItem from '@/model/Entity/UIItem'
import UIItemManager from '@/model/Entity/UIItemManager'

describe('UIItemManager', function () {
    it('add', function () {
        const manager = new UIItemManager(UIItem)
        const item = manager.make()
        manager.add(item)
        expect(item.ui).toBe(1)
    })

    it('find', function () {
        const manager = new UIItemManager(UIItem)
        const item = manager.make()
        manager.add(item)
        expect(manager.find(item.ui)).toEqual(item)
    })

    it('findAll', function () {
        const manager = new UIItemManager(UIItem)
        const item = manager.make()
        manager.add(item)
        const item2 = manager.make()
        manager.add(item2)
        const list = manager.findAll([item.ui, item2.ui])
        expect(list.length).toBe(2)
        expect(manager.list[0]).toEqual(item)
    })

    it('has', function () {
        const manager = new UIItemManager(UIItem)
        const item = manager.make()
        manager.add(item)
        expect(manager.has(item.ui)).toBe(true)
    })

    it('load', function () {
        const old = new UIItemManager(UIItem)
        const item = old.make()
        old.add(item)

        const manager = new UIItemManager(UIItem)
        manager.load(old)
        expect(manager.list.length).toBe(1)
        expect(manager.list[0]).toEqual(item)
    })

    it('throw', function () {
        const manager = new UIItemManager(UIItem)
        const item = manager.make()
        manager.add(item)
        expect(() => manager.add(item)).toThrowError()
    })

    it('toJSON', function () {
        const manager = new UIItemManager(UIItem)
        const item = manager.make()
        manager.add(item)

        const json = manager.toJSON()
        expect(json.list.length).toBe(1)
        expect(json.list[0]).toEqual(item)
    })

    it('toUIArray', function () {
        const manager = new UIItemManager(UIItem)
        const item = manager.make()
        manager.add(item)

        const list = manager.toUIArray()
        expect(list.length).toBe(1)
        expect(list).toContain(item.ui)
    })

    it('toUIMap', function () {
        const manager = new UIItemManager(UIItem)
        const item = manager.make()
        manager.add(item)

        const map = manager.toUIMap()
        expect(map.has(item.ui)).toBe(true)
        expect(map.get(item.ui)).toEqual(item)
    })
})
