import Route from '@/model/Bridge/ToJava/Route'
import sss from '@/sss'
import Toast from './toast'
import wait from './wait'

interface CallBack {
    (route: Route, toast: typeof Toast): void
}

export default function callJava(callback: CallBack) {
    const data = wait(() => {
        callback(sss.route, Toast)
        data.stopWaiting()
    })
    return data
}
