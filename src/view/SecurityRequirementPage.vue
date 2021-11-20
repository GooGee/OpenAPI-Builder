<template>
    <div class="row">
        <div class="col-3"></div>

        <div class="col-9">
            <table class="table">
                <caption class="caption-top">
                    <h2>Security Requirement</h2>
                </caption>
                <tbody>
                    <tr>
                        <td>
                            <ReferenceList :manager="manager"></ReferenceList>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import ss from '@/ss'
import { defineComponent, ref } from 'vue'
import ReferenceList from './oapi/ReferenceList.vue'

export default defineComponent({
    components: {
        ReferenceList,
    },
    setup(props, context) {
        const manager = ref(ss.project.oapi.securityManager)
        return {
            manager,
        }
    },
})
</script>
