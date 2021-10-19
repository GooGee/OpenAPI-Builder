import Response from '../Bridge/FromJava/Response'
import { StatusEnum } from '../Bridge/FromJava/StatusEnum'
import Project from '../Entity/Project'
import UniqueItem from '../Entity/UniqueItem'
import UniqueItemManager from '../Entity/UniqueItemManager'
import Vendor from '../Vendor'
import Save from './Save'

const MinVersion = 1

export default class Load {
    static run(response: Response, vendor: Vendor) {
        if (response.status === StatusEnum.OK) {
            if (response.data) {
                try {
                    const project = JSON.parse(response.data)
                    vendor.project = Load.load(project, vendor.preset)
                    Save.last = response.data
                    return
                } catch (error) {
                    alert(error)
                }
            }
        }
        this.make(vendor)
    }

    private static make(state: Vendor) {
        state.project = new Project()
        state.project.load(state.preset)
    }

    private static load(source: Project, preset: Project) {
        if (!this.isProject(source)) {
            throw new Error('Unknown data!')
        }

        const version: number = source.version
        const message = `Cannot load version ${version} project!`
        if (version < MinVersion) {
            throw new Error(message)
        }

        const project = new Project()
        if (version > project.version) {
            throw new Error(message)
        }

        const data = this.loadPreset(source, preset)
        project.load(data)

        return project
    }

    private static loadPreset(source: Project, preset: Project) {
        const project = new Project()
        source.version = project.version
        project.load(source)
        this.addIfNotExist(project.presetManager, preset.presetManager)
        this.addIfNotExist(project.scriptManager, preset.scriptManager)
        return project
    }

    private static addIfNotExist(
        manager: UniqueItemManager<UniqueItem>,
        preset: UniqueItemManager<UniqueItem>,
    ) {
        preset.list.forEach(data => {
            if (manager.find(data.un) === undefined) {
                manager.add(data)
            }
        })
    }

    private static isProject(source: Project) {
        const keys = Object.keys(source)
        const mustContain = ['version', 'oapi', 'presetManager', 'scriptManager']
        return mustContain.every(key => keys.includes(key))
    }
}
