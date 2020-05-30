<template>
    <div>
        <table class="table">
            <tbody>
                <tr>
                    <td class="text-right" width="111px">url</td>
                    <td>
                        <b-button-group>
                            <DeleteButton :manager="manager" :item="server"></DeleteButton>
                            <ChangeButton :item="server" name="url"></ChangeButton>
                        </b-button-group>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">description</td>
                    <td>
                        <b-form-input v-model="server.description"></b-form-input>
                    </td>
                </tr>
            </tbody>
        </table>

        <ServerVariable :manager="server.variableManager"></ServerVariable>
    </div>
</template>

<script>
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import ServerVariable from './ServerVariable.vue'

export default {
    name: 'Server',
    components: {
        ChangeButton,
        DeleteButton,
        ServerVariable,
    },
    props: {
        server: {
            type: Object,
            required: true,
        },
        manager: {
            type: Object,
            required: true,
        },
    },
}
</script>
