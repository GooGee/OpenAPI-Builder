<template>
    <div @click="hide" class="modal" tabindex="-1" style="display: block">
        <div v-on:click.stop class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <slot name="title">{{ dData.title }}</slot>
                    </h5>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div v-show="dData.hasFooter" class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</template>

<script lang="ts">
import Dialogue from '@/model/Dialogue/Dialogue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        dData: {
            type: Object as PropType<Dialogue>,
            required: true,
        },
    },
    methods: {
        hide() {
            if (this.dData.canClose) {
                this.$emit('hide')
            }
        },
    },
})
</script>
