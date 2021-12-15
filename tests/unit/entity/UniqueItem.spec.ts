import UniqueItem from '@/model/Entity/UniqueItem'

describe('UniqueItem', function () {
    const data = {
        un: 'a',
    }

    it('load', function () {
        const item = new UniqueItem('')
        item.load(data as any)
        expect(item.un).toBe(data.un)
    })

    it('toJSON', function () {
        const item = new UniqueItem(data.un)
        expect(item.toJSON()).toHaveProperty('un', data.un)
    })
})
