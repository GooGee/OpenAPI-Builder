import emitter from '@/emitter'
import Path from '@/model/OAPI/Path'
import Start from '@/model/Service/Start'

describe('Path', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const parameter = ss.parameterManager.make('id')
    ss.parameterManager.add(parameter)

    it('toOAPI', function () {
        const item = new Path('/user/{id}')
        const reference = item.parameterManager.make(parameter.ui)
        item.parameterManager.add(reference)
        const operation = item.operationManager.make('get')
        item.operationManager.add(operation)

        const json = item.toOAPI(ss.finder)
        expect(json).toHaveProperty(operation.un, operation.toOAPI(ss.finder))
        if (json.parameters) {
            expect(json.parameters[0]).toEqual(reference.toOAPI(ss.finder))
        }
    })
})
