import ServerVariable from '@/model/OAPI/ServerVariable'

describe('ServerVariable', function () {
    it('toOAPI', function () {
        const item = new ServerVariable('version')
        item.default = 'v1'
        const v1 = item.valueManager.make(item.default)
        item.valueManager.add(v1)

        const json = item.toOAPI()
        expect(json.default).toBe(item.default)
        expect(json.enum).toContain(item.default)
    })
})
