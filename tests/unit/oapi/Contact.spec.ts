import Contact from '@/model/OAPI/Contact'

describe('Contact', function () {
    it('toOAPI', function () {
        const item = new Contact()
        item.name = 'a'
        item.url = 'b'

        const json = item.toOAPI()
        expect(json.name).toBe(item.name)
        expect(json.url).toBe(item.url)
    })
})
