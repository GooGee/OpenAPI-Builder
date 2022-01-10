import emitter from '@/emitter'
import Start from '@/model/Service/Start'

describe('Document', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const path = ss.pathManager.make('/user')
    ss.pathManager.add(path)
    const securityScheme = ss.securitySchemeManager.make('user securityScheme')
    ss.securitySchemeManager.add(securityScheme)
    const securityRequirement = ss.securityRequirementManager.make(securityScheme.ui)
    ss.securityRequirementManager.add(securityRequirement)
    const server = ss.serverManager.make('localhost')
    ss.serverManager.add(server)
    const tag = ss.tagManager.make('user tag')
    ss.tagManager.add(tag)

    it('toOAPI', function () {
        const json = ss.project.oapi.toOAPI(ss.finder)
        expect(json.info).toHaveProperty('version')
        expect(json.components).toHaveProperty('requestBodies')
        expect(json.paths).toHaveProperty('/user')
        expect(json.security[0]).toHaveProperty('user securityScheme')
        expect(json.servers[0]).toHaveProperty('url', 'localhost')
        expect(json.tags[0]).toHaveProperty('name', 'user tag')
    })
})
