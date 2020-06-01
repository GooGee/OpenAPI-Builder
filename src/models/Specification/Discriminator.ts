import NameItem from "../Base/NameItem"
import { NameValueManager } from "./NameValue"

export default class Discriminator extends NameItem {
    readonly manager = new NameValueManager()

    toAPI() {
        return {
            propertyName: this.name,
            mapping: this.manager.toAPI()
        }
    }
}
