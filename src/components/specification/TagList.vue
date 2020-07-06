<template>
    <ItemManager :manager="manager" :list="list" title="Tag"></ItemManager>
</template>

<script>
import builder from '../../states/builder.js'
import ItemManager from '../ItemManager.vue'

export default {
    name: 'TagList',
    components: { ItemManager },
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
