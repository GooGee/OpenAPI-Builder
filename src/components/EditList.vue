<template>
    <div>
        <div v-if="editing">
            <b-button @click="editing = false" variant="outline-primary"> OK </b-button>

            <div v-for="item in manager.list" :key="item.name" class="mtb11">
                <b-button-group>
                    <DeleteButton :manager="manager" :item="item"></DeleteButton>
                    <ChangeButton :item="item" name="name"></ChangeButton>
                </b-button-group>
            </div>

            <AddButton :manager="manager" name="name"></AddButton>
        </div>

        <div v-else @click="editing = true">
            <span>....</span>
            <div v-for="item in manager.list" :key="item.name">{{ item.name }}</div>
        </div>
    </div>
</template>

<script>
import AddButton from './button/AddButton.vue'
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'

export default {
    name: 'EditList',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editing: false,
        }
    },
}
</script>
