import UIItem, { UIItemManager } from './UIItem'

export enum TargetType {
    Tag = 'Tag',
}

export default class Target extends UIItem {
    constructor(ui: number, readonly type: TargetType) {
        super()
        this.ui = ui
    }
}

export class TargetManager extends UIItemManager<Target> {
    constructor(readonly targetType: TargetType) {
        super(Target)
    }

    add(item: Target) {
        this.throwIfFind(item.ui)
        this.list.push(item)
    }

    findAll<T extends UIItem>(targetxx: T[]): T[] {
        const uixx = this.list.map((item) => item.ui)
        const list: T[] = []
        targetxx.forEach((item) => {
            if (uixx.includes(item.ui)) {
                list.push(item)
            }
        })
        return list
    }

    make(ui: number) {
        const item = new Target(ui, this.targetType)
        return item
    }
}
