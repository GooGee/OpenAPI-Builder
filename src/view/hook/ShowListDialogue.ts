import UniqueItem from '@/model/Base/UniqueItem'
import ListDialogue from '@/model/Dialogue/ListDialogue'
import { inject, Ref } from 'vue'

export default function ShowListDialogue(list: UniqueItem[], title: string, cb: Function) {
    const listDialogue = inject('listDialogue') as Ref<ListDialogue>

    function show() {
        listDialogue.value.showList(list, title, cb)
        listDialogue.value.visible = true
    }

    return {
        show,
    }
}
