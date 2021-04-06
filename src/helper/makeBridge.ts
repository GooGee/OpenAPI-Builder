import Response from '@/model/Bridge/FromJava/Response'
import CEFW from '@/model/Bridge/ToJava/CEFW'

export default function makeBridge(cefw: CEFW) {
    cefw.JavaBridge = {
        call(text) {
            const json = JSON.parse(text) as Response
            console.log(json.data)
            json.data = ''
            json.status = 400
            json.message = 'Not available in browser'
            cefw.bridge.call(json)
        },
    }
}
