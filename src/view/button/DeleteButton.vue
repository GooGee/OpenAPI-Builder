<template>
    <span @click="remove" class="btn btn-outline-danger"> - </span>
</template>

<script lang="ts">
import Noty from 'noty'
import UniqueItem from '@/model/Base/UniqueItem'
import UniqueItemManager from '@/model/Base/UniqueItemManager'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        manager: {
            type: Object as PropType<UniqueItemManager<UniqueItem>>,
            required: true,
        },
        item: {
            type: Object as PropType<UniqueItem>,
            required: true,
        },
    },
    methods: {
        remove() {
            const nnn = new Noty({
                animation: {
                    open: null,
                    close: null,
                },
                buttons: [
                    Noty.button('Yes', 'btn btn-outline-danger mr11', () => {
                        nnn.close()
                        this.manager.remove(this.item)
                        this.$emit('deleted', this.item)
                    }),
                    Noty.button('No', 'btn btn-outline-primary', () => {
                        nnn.close()
                    }),
                ],
                closeWith: ['button'],
                layout: 'topCenter',
                modal: true,
                text: '<h4 class="mtb11">Are you sure?</h4>',
            })
            nnn.show()
        },
    },
})
</script>
