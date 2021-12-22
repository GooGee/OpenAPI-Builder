import emitter from '@/emitter'
import Schema, { CompositionType } from '@/model/OAPI/Schema'
import Start from '@/model/Service/Start'

describe('Schema', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)
    const field = ss.factory.makeSchemaField('name', schema)

    it('toOAPI', function () {
        const item = new Schema('pet')

        item.isTemplate = true
        const template = {
            type: 'object',
        }
        item.text.value = template
        let json = item.toOAPI(ss.finder)
        expect(json).toEqual(template)

        item.isTemplate = false
        const ft = ss.factory.makeSchemaField('type', item)
        json = item.toOAPI(ss.finder)
        expect(json).toHaveProperty(
            'properties',
            ss.fieldManager.arrayToOAPI([ft], ss.finder),
        )

        const reference = item.referenceManager.make(schema.ui)
        item.referenceManager.add(reference)
        json = item.toOAPI(ss.finder)
        expect(json).toHaveProperty(CompositionType.allOf)

        const exclude = item.excludedManager.make(field.ui)
        item.excludedManager.add(exclude)
        json = item.toOAPI(ss.finder)
        expect(json).toHaveProperty('properties.' + ft.un)
        expect(json).not.toHaveProperty('properties.' + field.un)
    })
})
