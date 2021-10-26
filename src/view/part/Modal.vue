<template>
    <VueFinalModal v-model="value" :content-class="css">
        <div class="modal-content" style="margin-top: 66px">
            <slot></slot>
        </div>
    </VueFinalModal>
</template>

<script>
import { computed } from '@vue/reactivity'
import { VueFinalModal } from 'vue-final-modal'

export default {
    components: {
        VueFinalModal,
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        size: {
            type: String,
            required: false,
            default: '',
        },
    },
    setup(props, context) {
        const value = computed({
            get() {
                return props.visible
            },
            set(v) {
                context.emit('update:visible', v)
            },
        })
        const css = 'modal-dialog modal-dialog-scrollable ' + props.size
        return {
            css,
            value,
        }
    },
}
</script>
