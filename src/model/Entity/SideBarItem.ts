import { excludeOAPI } from '../Decorator'
import UniqueItem from './UniqueItem'

export default class SideBarItem extends UniqueItem {
    @excludeOAPI
    color = ''
    description = ''
}
