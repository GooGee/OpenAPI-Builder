<template>
    <div v-if="visible">
        <Dialogue :dData="sss.listDialogue">
            <template v-slot:body>
                <ul class="list-group">
                    <li
                        v-if="sss.listDialogue.showBlank"
                        @click="select(null)"
                        class="list-group-item pointer"
                    >
                        ----
                    </li>
                    <li
                        v-for="item in sss.listDialogue.list"
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
import sss from '@/sss.ts'
import { EventEnum } from '@/model/Event/DialogueEvent'
import UniqueItem from '@/model/Base/UniqueItem'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    components: {
        Dialogue,
    },
    data() {
        return {
            sss,
            visible: false,
        }
    },
    created() {
        sss.event.dialogue.ee.on(EventEnum.VisibilityChange, data => (this.visible = data.visible))
    },
    methods: {
        select(item: UniqueItem) {
            this.visible = false
            sss.listDialogue.hide()
            sss.listDialogue.select(item)
        },
    },
})
</script>
