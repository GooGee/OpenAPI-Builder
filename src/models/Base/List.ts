
export default class List<T> {
    readonly list: Array<T> = []

    add(item: T) {
        this.list.push(item)
    }

    remove(item: T) {
        const index = this.list.indexOf(item)
        this.list.splice(index, 1)
    }

    clear() {
        this.list.splice(0, this.list.length)
    }

    moveUp(item: T) {
        const index = this.list.indexOf(item)
        if (index === 0) {
            return
        }

        this.swap(index, index - 1)
    }

    moveDown(item: T) {
        const index = this.list.indexOf(item)
        if (index === this.list.length - 1) {
            return
        }

        this.swap(index, index + 1)
    }

    swap(left: number, right: number) {
        const keep = this.list[left]
        this.list[left] = this.list[right]
        this.list[right] = keep

        this.list.splice(0, 0)
    }

    toJSON(key: string) {
        const result = {
            list: this.list
        }
        return result
    }

}