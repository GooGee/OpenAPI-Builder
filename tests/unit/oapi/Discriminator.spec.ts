import emitter from '@/emitter'
import Discriminator from '@/model/OAPI/Discriminator'
import Start from '@/model/Service/Start'

describe('Discriminator', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const schema = ss.schemaManager.make('cat')
    ss.schemaManager.add(schema)

    it('toOAPI', function () {
        const item = new Discriminator()
        item.propertyName = 'pet'
        const cat = item.referenceManager.make('cat')
        cat.reference.ui = schema.ui
        item.referenceManager.add(cat)

        const json = item.toOAPI(ss.finder)
        expect(json.propertyName).toBe('pet')
        expect(json.mapping).toHaveProperty('cat', cat.reference.getText(ss.finder))
    })
})
