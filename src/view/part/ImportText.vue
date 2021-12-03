<template>
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right w111">text</td>
                <td>
                    <textarea
                        v-model="text"
                        class="form-control"
                        spellcheck="false"
                        rows="5"
                    ></textarea>
                </td>
            </tr>
            <slot></slot>
            <tr>
                <td></td>
                <td>
                    <span @click="parse" class="btn btn-outline-primary"> Next </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>


<script lang="ts">
import Toast from '@/model/Service/Toast'
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup(props, context) {
        const text = ref('[]')
        function parse() {
            try {
                const result = JSON.parse(text.value)
                context.emit('parse', result)
            } catch (error) {
                Toast.error(error)
            }
        }
        return { parse, text }
    },
})
</script>
