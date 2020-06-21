import Parameter from "./Parameter"

export default class Header extends Parameter {
    toOAPI() {
        return {
            required: this.required,
            description: this.description,
            schema: this.schema.toOAPI()
        }
    }
}
