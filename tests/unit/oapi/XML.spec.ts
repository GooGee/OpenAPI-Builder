import XML from '@/model/OAPI/XML'

describe('XML', function () {
    it('toOAPI', function () {
        const item = new XML()
        item.name = 'a'
        item.namespace = 'b'
        item.prefix = 'c'

        const json = item.toOAPI()
        expect(json.name).toBe(item.name)
        expect(json.namespace).toBe(item.namespace)
        expect(json.prefix).toBe(item.prefix)
    })
})
