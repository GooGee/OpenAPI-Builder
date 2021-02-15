import Item from '../Base/Item'
import Contact from './Contact'
import License from './License'

export default class Info extends Item {
    contact = new Contact()
    description = ''
    license = new License()
    termsOfService = ''
    title = 'OpenAPI'
    version = '0.1.0'
}
