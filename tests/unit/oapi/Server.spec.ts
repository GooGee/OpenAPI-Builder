import emitter from '@/emitter'
import Server from '@/model/OAPI/Server'
import Start from '@/model/Service/Start'

describe('Server', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const variable = ss.serverVariableManager.make('v1')
    ss.serverVariableManager.add(variable)

    it('toOAPI', function () {
        const item = new Server('localhost')
        const reference = item.variableManager.make(variable.ui)
        item.variableManager.add(reference)

        const json = item.toOAPI(ss.finder)
        expect(json.url).toBe(item.un)
        if (json.variables) {
            expect(json.variables).toHaveProperty(variable.un, variable.toOAPI())
        }
    })
})
