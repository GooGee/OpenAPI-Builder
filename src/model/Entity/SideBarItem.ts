import { excludeOAPI } from '../Decorator'
import ColorEnum from './ColorEnum'
import UniqueItem from './UniqueItem'

export default class SideBarItem extends UniqueItem {
    @excludeOAPI
    color: ColorEnum = ColorEnum.none
    description = ''
}
