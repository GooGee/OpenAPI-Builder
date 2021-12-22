import emitter from '@/emitter'
import DataType from '@/model/OAPI/DataType'
import MediaType, { MediaTypeEnum } from '@/model/OAPI/MediaType'
import Start from '@/model/Service/Start'

describe('MediaType', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)
    const encoding = ss.encodingManager.make('image')
    ss.encodingManager.add(encoding)
    const field = ss.factory.makeSchemaField('avator', schema)
    field.type = DataType.object
    field.reference.ui = encoding.ui
    const example = ss.exampleManager.make('Response')
    ss.exampleManager.add(example)

    it('toOAPI', function () {
        const item = new MediaType(MediaTypeEnum.json)
        item.schema.ui = schema.ui
        const reference = item.exampleManager.make(example.ui)
        item.exampleManager.add(reference)

        const json = item.toOAPI(ss.finder)
        expect(json.encoding).toHaveProperty(field.un)
        expect(json.examples).toHaveProperty(example.un)
        expect(json.schema).toEqual(item.schema.toOAPI(ss.finder))
    })
})
