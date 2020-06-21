<template>
    <div>
        <div>
            <h2 class="inline mr11">Response</h2>
            <SelectButton :list="codeList" :manager="manager" name="name" text="name"></SelectButton>
        </div>

        <div v-for="item in manager.list" :key="item.name" class="mtb11">
            <b-button-group>
                <DeleteButton :manager="manager" :item="item"></DeleteButton>
                <ChangeButton :item="item" name="name"></ChangeButton>
                <Reference :reference="item.response" type="responses"></Reference>
            </b-button-group>
        </div>
    </div>
</template>

<script>
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import Reference from './Reference.vue'
import SelectButton from '../button/SelectButton.vue'
import builder from '../../states/builder.js'

export default {
    name: 'StatusList',
    components: {
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
    created() {
        this.codeList = builder.presetManager.find('HttpStatus').propertyManager.list
    },
    data() {
        return {
            codeList: [],
        }
    },
}
</script>
