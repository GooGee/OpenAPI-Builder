import builder from './builder.js'
import ComponentDialogue from '../models/Dialogue/ComponentDialogue'
import JSONDialogue from '../models/Dialogue/JSONDialogue'
import ListDialogue from '../models/Dialogue/ListDialogue'

export default {
    component: new ComponentDialogue(builder),
    json: new JSONDialogue(),
    list: new ListDialogue(),
}
