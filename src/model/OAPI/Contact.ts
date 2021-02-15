import Item from '../Base/Item'

export default class Contact extends Item {
    name = ''
    url = ''
    email = ''

    toOAPI() {
        if (this.email.length) {
            return super.toOAPI()
        }

        return {
            name: this.name,
            url: this.url,
        }
    }
}
