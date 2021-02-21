import Bridge from '../FromJava/Bridge'
import JavaBridge from './JavaBridge'

export default interface CEFW extends Window {
    bridge: Bridge
    JavaBridge: JavaBridge
}
