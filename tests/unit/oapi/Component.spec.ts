import emitter from '@/emitter'
import Start from '@/model/Service/Start'

describe('Component', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const cb = ss.callbackManager.make('user callback')
    ss.callbackManager.add(cb)
    const example = ss.exampleManager.make('user example')
    ss.exampleManager.add(example)
    const header = ss.headerManager.make('user header')
    ss.headerManager.add(header)
    const parameter = ss.parameterManager.make('user parameter')
    ss.parameterManager.add(parameter)
    const rb = ss.requestBodyManager.make('user requestBody')
    ss.requestBodyManager.add(rb)
    const response = ss.responseManager.make('user response')
    ss.responseManager.add(response)
    const schema = ss.schemaManager.make('user schema')
    ss.schemaManager.add(schema)
    const securityScheme = ss.securitySchemeManager.make('user securityScheme')
    ss.securitySchemeManager.add(securityScheme)

    it('toOAPI', function () {
        const json = ss.project.oapi.component.toOAPI(ss.finder)
        expect(json.callbacks).toHaveProperty('user callback')
        expect(json.examples).toHaveProperty('user example')
        expect(json.headers).toHaveProperty('user header')
        expect(json.parameters).toHaveProperty('user parameter')
        expect(json.requestBodies).toHaveProperty('user requestBody')
        expect(json.responses).toHaveProperty('user response')
        expect(json.schemas).toHaveProperty('user schema')
        expect(json.securitySchemes).toHaveProperty('user securityScheme')
    })
})
