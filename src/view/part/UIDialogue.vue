<template>
    <div v-if="uiDialogue.visible">
        <Dialogue :dData="uiDialogue" @hide="hide(false)">
            <template v-slot:body>
                <input v-model="uiDialogue.text" type="text" class="form-control" />
                <span @click="hide(true)" class="btn btn-outline-primary mt11">OK</span>
            </template>
        </Dialogue>
    </div>
</template>

<script lang="ts">
import Dialogue from './Dialogue.vue'
import Noty from 'noty'
import sss from '@/sss.ts'
import { defineComponent, inject, PropType, Ref } from 'vue'
import UIDialogue from '@/model/Dialogue/UIDialogue'

export default defineComponent({
    components: {
        Dialogue,
    },
    setup() {
        const uiDialogue = inject('uiDialogue') as Ref<UIDialogue>
        const hide = (ok: boolean) => {
            if (ok === false) {
                uiDialogue.value.visible = false
                return
            }
            if (uiDialogue.value.callback === null) {
                uiDialogue.value.visible = false
                return
            }
            try {
                if (uiDialogue.value.text === '') {
                    throw new Error('ui is required!')
                }
                uiDialogue.value.callback(uiDialogue.value.text)
                uiDialogue.value.visible = false
            } catch (error) {
                new Noty({
                    text: error.message,
                    theme: 'bootstrap-v4',
                    type: 'error',
                }).show()
            }
        }
        return { hide, uiDialogue }
    },
})
</script>
