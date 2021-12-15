import Manager from '@/model/Entity/Manager'

describe('Manager', function () {
    it('add', function () {
        const manager = new Manager<String>()
        manager.add('')
        expect(manager.list.length).toBe(1)
    })

    it('clear', function () {
        const manager = new Manager<String>()
        manager.add('')
        expect(manager.list.length).toBe(1)
        manager.clear()
        expect(manager.list.length).toBe(0)
    })

    it('remove', function () {
        const manager = new Manager<String>()
        const item = ''
        manager.add(item)
        manager.remove(item)
        expect(manager.list.length).toBe(0)
    })

    it('moveDown', function () {
        const manager = new Manager<String>()
        const item = '1'
        manager.add(item)
        manager.add('2')
        manager.moveDown(item)
        expect(manager.list.indexOf(item)).toBe(1)
        manager.moveDown(item)
        expect(manager.list.indexOf(item)).toBe(1)
    })

    it('Manager moveUp', function () {
        const manager = new Manager<String>()
        const item = '1'
        manager.add('2')
        manager.add(item)
        manager.moveUp(item)
        expect(manager.list.indexOf(item)).toBe(0)
        manager.moveUp(item)
        expect(manager.list.indexOf(item)).toBe(0)
    })
})
