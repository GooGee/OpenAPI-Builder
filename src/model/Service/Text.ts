import UniqueItem from '../Base/UniqueItem'

export function filter(keyword: string, list: Array<UniqueItem>) {
    const re = new RegExp(keyword, 'i')
    return list.filter(item => item.ui.search(re) > -1)
}

export function run(code: string, data: object) {
    if (code) {
        const fff = new Function('return ' + code)()
        fff(data)
    }
}

export function runText(text: string, data: Record<string, string>): string {
    const names = Object.keys(data)
    const values = Object.values(data)
    return new Function(...names, `return \`${text}\`;`)(...values)
}
