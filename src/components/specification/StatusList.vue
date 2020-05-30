<template>
    <div>
        <div>
            <h2 class="inline mr11">Responses</h2>
            <AddButton :manager="manager" name="status code" class="mr11"></AddButton>
            <SelectButton :list="codeList" :manager="manager"></SelectButton>
        </div>

        <div v-for="item in manager.list" :key="item.name" class="mtb11">
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
import SelectButton from '../button/SelectButton.vue'

export default {
    name: 'StatusList',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        Reference,
        SelectButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            codeList: [200, 401, 403, 404, 422],
        }
    },
}
</script>
