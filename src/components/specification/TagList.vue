<template>
    <div>
        <h2 class="inline mr11">tags</h2>
        <SelectButton :manager="manager" :list="list" name="name" text="name"></SelectButton>

        <EditList :manager="manager" :withadd="false" :withedit="false"></EditList>
    </div>
</template>

<script>
import builder from '../../states/builder.js'
import EditList from '../EditList.vue'
import SelectButton from '../button/SelectButton.vue'

export default {
    name: 'TagList',
    components: {
        EditList,
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
            list: builder.document.tagManager.list,
        }
    },
}
</script>
