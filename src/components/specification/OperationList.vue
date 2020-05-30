<template>
    <div>
        <div>
            <b-form-radio-group
                v-model="type"
                :options="typeList"
                buttons
                button-variant="outline-primary"
            ></b-form-radio-group>
        </div>

        <Operation v-if="operation" :item="operation">
            <DeleteButton :manager="manager" :item="operation"></DeleteButton>
        </Operation>

        <template v-else>
            <br />
            <b-button @click="add" variant="outline-primary"> + </b-button>
        </template>
    </div>
</template>

<script>
import DeleteButton from '../button/DeleteButton.vue'
import Operation from './Operation.vue'

export default {
    name: 'OperationList',
    components: {
        DeleteButton,
        Operation,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            type: 'get',
            typeList: ['get', 'delete', 'options', 'patch', 'post', 'put'],
        }
    },
    computed: {
        operation() {
            return this.manager.find(this.type)
        },
    },
    methods: {
        add() {
            try {
                const item = this.manager.make(this.type)
                this.manager.add(item)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>
