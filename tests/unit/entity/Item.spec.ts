import Item from '@/model/Entity/Item'

describe('Item', function () {
    it('load', function () {
        const data = {
            name: 'name',
        }

        const item = new Item()
        item.load(data as any)
        expect(item).not.toHaveProperty('name')
    })

    it('toJSON', function () {
        const item = new Item()
        expect(item.toJSON()).toEqual({})
    })

    it('toOAPI', function () {
        const item = new Item()
        expect(item.toOAPI()).toEqual({})
    })
})
