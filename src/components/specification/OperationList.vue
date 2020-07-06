<template>
    <div>
        <div class="mtb11">
            <b-form-radio-group v-model="type" buttons button-variant="outline-secondary">
                <b-form-radio v-for="item in typeList" :value="item">
                    <span :class="manager.find(item) ? 'text-primary' : ''"> {{ item }} </span>
                </b-form-radio>
            </b-form-radio-group>
        </div>

        <Operation v-if="operation" :item="operation">
            <b-button-group>
                <DeleteButton :manager="manager" :item="operation"></DeleteButton>
                <b-button variant="outline-secondary"> {{ operation.name }} </b-button>
            </b-button-group>
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
            typeList: ['get', 'delete', 'head', 'options', 'patch', 'post', 'put', 'trace'],
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
