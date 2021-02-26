<template>
    <div v-if="listDialogue.visible">
        <Dialogue :dData="listDialogue" @hide="hide">
            <template v-slot:body>
                <input
                    v-model="listDialogue.keyword"
                    ref="listInput"
                    placeholder="search"
                    type="text"
                    class="form-control mb11"
                />
                <ul class="list-group">
                    <li
                        v-if="listDialogue.showBlank"
                        @click="select(null)"
                        class="list-group-item pointer"
                    >
                        ----
                    </li>
                    <li
                        v-for="item in listDialogue.list"
                        :key="item.ui"
                        @click="select(item)"
                        class="list-group-item pointer"
                    >
                        {{ item.ui }}
                    </li>
                </ul>
            </template>
        </Dialogue>
    </div>
</template>

<script lang="ts">
import Dialogue from './Dialogue.vue'
import UniqueItem from '@/model/Base/UniqueItem'
import { defineComponent, inject, PropType, ref, Ref, watchEffect } from 'vue'
import ListDialogue from '@/model/Dialogue/ListDialogue'

export default defineComponent({
    components: {
        Dialogue,
    },
    setup() {
        const listDialogue = inject('listDialogue') as Ref<ListDialogue>
        const hide = () => {
            listDialogue.value.visible = false
        }
        const select = (item: UniqueItem) => {
            listDialogue.value.visible = false
            listDialogue.value.select(item)
        }

        const listInput = ref(null)
        watchEffect(
            () => {
                if (listDialogue.value.visible) {
                    const input = listInput.value as any
                    input.focus()
                }
            },
            {
                flush: 'post',
            },
        )
        return { hide, listDialogue, listInput, select }
    },
})
</script>
