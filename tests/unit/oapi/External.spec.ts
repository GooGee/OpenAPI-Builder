import External from '@/model/OAPI/External'

describe('External', function () {
    it('toOAPI', function () {
        const item = new External()
        item.description = 'a'
        item.url = 'b'

        const json = item.toOAPI()
        expect(json.description).toBe(item.description)
        expect(json.url).toBe(item.url)
    })
})
