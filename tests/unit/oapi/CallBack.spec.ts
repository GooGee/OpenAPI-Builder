import emitter from '@/emitter'
import CallBack from '@/model/OAPI/CallBack'
import Start from '@/model/Service/Start'

describe('CallBack', function () {
    const ss = Start.run({} as any, emitter, window as any)
    const path = ss.pathManager.make('/user')
    ss.pathManager.add(path)

    it('toOAPI', function () {
        const item = new CallBack('user')
        item.path.ui = path.ui

        const json = item.toOAPI(ss.finder)
        expect(json).toEqual(item.path.toOAPI(ss.finder))
    })
})
