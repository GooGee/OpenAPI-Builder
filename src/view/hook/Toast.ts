import Handler from '@/model/Bridge/FromJava/Handler'
import { StatusEnum } from '@/model/Bridge/FromJava/StatusEnum'
import Noty from 'noty'

const show: Handler = response => {
    if (response.status === StatusEnum.OK) {
        new Noty({
            text: response.message,
            theme: 'bootstrap-v4',
            timeout: 3333,
            type: 'info',
        }).show()
        return
    }
    new Noty({
        text: response.message,
        theme: 'bootstrap-v4',
        type: 'error',
    }).show()
}

export default show
