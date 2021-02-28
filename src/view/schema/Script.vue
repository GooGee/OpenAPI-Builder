<template>
    <table class="table">
        <tbody>
            <tr v-for="item in list" :key="item.ui">
                <td>
                    <RunButton :code="item.code"></RunButton>
                    <span class="ml11">{{ item.ui }}</span>
                </td>
                <td>{{ item.description }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sss from '@/sss.ts'
import RunButton from '../button/RunButton.vue'

export default defineComponent({
    components: {
        RunButton,
    },
    data() {
        return {
            list: sss.getProject().scriptManager.list.filter(item => {
                if (item.global) {
                    return false
                }
                if (item.single) {
                    return false
                }
                return true
            }),
        }
    },
})
</script>
