import Parameter, { Location } from '@/model/OAPI/Parameter'

describe('Parameter', function () {
    it('toOAPI', function () {
        const item = new Parameter('id')

        const json = item.toOAPI({} as any)
        expect(json.schema).toHaveProperty('type', item.schema.type)
        expect(json.name).toBe(item.name)
        expect(json.in).toBe(item.location)
    })
})

describe('header', function () {
    it('toOAPI', function () {
        const item = new Parameter('id', Location.header)

        const json = item.toOAPI({} as any)
        expect(json.schema).toHaveProperty('type', item.schema.type)
        expect(json).not.toHaveProperty('name')
        expect(json).not.toHaveProperty('in')
    })
})
