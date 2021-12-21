import Example from '@/model/OAPI/Example'

describe('Example', function () {
    it('toOAPI', function () {
        const item = new Example('Response')
        item.description = 'a'

        const json = item.toOAPI({} as any)
        expect(json.description).toBe(item.description)
        expect(json.value).toEqual(item.value.toOAPI())
    })
})
