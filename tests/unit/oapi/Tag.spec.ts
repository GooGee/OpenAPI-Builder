import Tag from '@/model/OAPI/Tag'

describe('Tag', function () {
    it('toOAPI', function () {
        const item = new Tag('user')
        item.description = 'a'

        const json = item.toOAPI()
        expect(json.name).toBe(item.un)
        expect(json.description).toBe(item.description)
    })
})
