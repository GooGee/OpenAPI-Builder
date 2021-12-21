import Enumer from '@/model/OAPI/Enumer'

describe('Enumer', function () {
    it('toOAPI', function () {
        const item = new Enumer('status')
        item.default = 'v1'
        const v1 = item.valueManager.make(item.default)
        item.valueManager.add(v1)

        const json = item.toOAPI()
        expect(json.enum).toContain(item.default)
    })
})
