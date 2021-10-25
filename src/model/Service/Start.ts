import CEFW from '../Bridge/CEFW'
import { ActionEnum } from '../Bridge/FromJava/ActionEnum'
import HandlerManager from '../Bridge/FromJava/HandlerManager'
import { StatusEnum } from '../Bridge/FromJava/StatusEnum'
import Worker from '../Bridge/FromJava/Worker'
import JavaWorker from '../Bridge/ToJava/JavaWorker'
import { EmitterType } from '../Entity/Event'
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
        const vendor = new Vendor(preset, worker, emitter)

        window.worker = new Worker(manager)
        manager.add(ActionEnum.error, '*', (response) => {
            alert(response.message)
        })

        manager.add(ActionEnum.load, 'project', (response) => {
            let invalid = true
            if (response.status === StatusEnum.OK) {
                if (response.data) {
                    try {
                        const data = JSON.parse(response.data)
                        vendor.project = Load.run(data, vendor.preset)
                        Save.last = response.data
                        invalid = false
                    } catch (error) {
                        alert(error)
                    }
                }
            }
            if (invalid) {
                vendor.create()
            }
            file.saveDTS()
        })

        manager.add(ActionEnum.save, 'project', (response) => {
            if (response.status === StatusEnum.OK) {
                Save.run(file, vendor.project)
            }
        })

        return vendor
    }
}
