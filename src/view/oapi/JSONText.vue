<template>
    <span @click="edit" class="btn btn-outline-primary">Edit JSON</span>
    <textarea
        v-if="showText"
        v-model="item.text"
        class="form-control mt11"
        spellcheck="false"
        rows="11"
        readonly
    ></textarea>
</template>

<script lang="ts">
import JSONText from '@/model/Entity/JSONText'
import Toast from '@/model/Service/Toast'
import store from '@/store'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<JSONText>,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        showText: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    setup(props, context) {
        function edit() {
            store.inputModal.text = props.item.text
            store.inputModal.show(props.title, () => {
                try {
                    props.item.text = store.inputModal.text
                    return false
                } catch (error) {
                    Toast.error(error.message)
                    return true
                }
            })
        }

        return { edit }
    },
})
</script>
