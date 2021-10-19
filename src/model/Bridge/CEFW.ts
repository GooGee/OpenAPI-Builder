import Worker from './FromJava/Worker'
import JavaEntry from './ToJava/JavaEntry'

export default interface CEFW extends Window {
    worker: Worker
    JavaEntry: JavaEntry
}
