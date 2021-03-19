import { SideBarEnum } from '@/model/Data/SideBar'
import sss from '@/sss'
import { ref } from 'vue'

export default function PageSetup(name: SideBarEnum) {
    sss.show(name)
    const sidebar = ref(sss.sbManager.get(name))
    const key = ref('')

    function changeKey() {
        key.value = new Date().toISOString()
    }

    return {
        changeKey,
        key,
        sidebar,
    }
}
