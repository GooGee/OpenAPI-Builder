import License from '@/model/OAPI/License'

describe('License', function () {
    it('toOAPI', function () {
        const item = new License()
        item.name = 'a'
        item.url = 'b'

        const json = item.toOAPI()
        expect(json.name).toBe(item.name)
        expect(json.url).toBe(item.url)
    })
})
