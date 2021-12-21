import Info from '@/model/OAPI/Info'

describe('Info', function () {
    it('toOAPI', function () {
        const item = new Info()
        item.description = 'a'

        const json = item.toOAPI()
        expect(json.contact).toEqual(item.contact.toOAPI())
        expect(json.description).toBe(item.description)
        expect(json.license).toEqual(item.license.toOAPI())
        expect(json.title).toBe(item.title)
    })
})
