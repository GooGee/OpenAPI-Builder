import emitter from '@/emitter'
import DataType from '@/model/OAPI/DataType'
import SchemaField from '@/model/OAPI/SchemaField'
import Start from '@/model/Service/Start'

describe('SchemaField', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const encoding = ss.encodingManager.make('image')
    ss.encodingManager.add(encoding)
    const enumer = ss.enumerManager.make('status')
    ss.enumerManager.add(enumer)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)

    it('toOAPI', function () {
        const item = new SchemaField('email')
        let json = item.toOAPI(ss.finder) as any
        expect(json.type).toBe(item.type)

        item.type = DataType.object
        item.reference.ui = encoding.ui
        json = item.toOAPI(ss.finder)
        expect(json).toEqual({})

        item.type = DataType.enumer
        item.reference.ui = enumer.ui
        json = item.toOAPI(ss.finder)
        expect(json).toEqual(enumer.toOAPI())

        item.type = DataType.reference
        item.reference.ui = schema.ui
        json = item.toOAPI(ss.finder)
        expect(json).toEqual(item.reference.toOAPI(ss.finder))
    })
})
