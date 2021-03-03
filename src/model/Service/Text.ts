import lodash from 'lodash'
import UniqueItem from '../Base/UniqueItem'
import Project from '../Data/Project'
import Generator from './Generator'

export function filter(keyword: string, list: Array<UniqueItem>) {
    const re = new RegExp(keyword, 'i')
    return list.filter(item => item.ui.search(re) > -1)
}

export function run(code: string, project: Project, schema: UniqueItem) {
    const generator = new Generator(project)
    const data = {
        generator,
        lodash,
        project,
        schema,
    }
    const fff = new Function('return ' + code)()
    return fff(data)
}

export function runText(text: string, data: object): string {
    return new Function(`return \`${text}\`;`)(data)
}
