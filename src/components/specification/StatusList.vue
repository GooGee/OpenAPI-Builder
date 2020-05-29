<template>
    <div>
        <div>
            <h2 class="inline mr11px">Responses</h2>
            <AddButton :manager="manager" name="name"></AddButton>
        </div>

        <div v-for="item in manager.list" :key="item.name" class="mtb11px">
            <b-button-group>
                <DeleteButton :manager="manager" :item="item"></DeleteButton>
                <ChangeButton :item="item" name="name"></ChangeButton>
                <Reference :reference="item.response" type="responses" title="responses"></Reference>
            </b-button-group>
        </div>
    </div>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import Reference from './Reference.vue'

export default {
    name: 'StatusList',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        Reference,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
}
</script>
