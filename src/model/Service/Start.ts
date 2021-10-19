import CEFW from '../Bridge/CEFW'
import { ActionEnum } from '../Bridge/FromJava/ActionEnum'
import HandlerManager from '../Bridge/FromJava/HandlerManager'
import { StatusEnum } from '../Bridge/FromJava/StatusEnum'
import Worker from '../Bridge/FromJava/Worker'
import JavaWorker from '../Bridge/ToJava/JavaWorker'
import { EmitterType, EventEnum } from '../Entity/Event'
import Project from '../Entity/Project'
import Vendor from '../Vendor'
import File from './File'
import Load from './Load'
import Save from './Save'

export default class Start {
    static run(preset: Project, emitter: EmitterType, window: CEFW) {
        const manager = new HandlerManager()
        const worker = new JavaWorker(window, manager)
        const file = new File(worker)
        const vendor = new Vendor(preset, worker)

        window.worker = new Worker(manager)
        manager.add(ActionEnum.error, '*', (response) => {
            alert(response.message)
        })

        manager.add(ActionEnum.load, 'project', (response) => {
            Load.run(response, vendor)
            vendor.sbManager.bind(vendor.project)
            emitter.emit(EventEnum.ready)
        })

        manager.add(ActionEnum.save, 'project', (response) => {
            if (response.status === StatusEnum.OK) {
                Save.run(file, vendor.project)
            }
        })

        return vendor
    }
}
