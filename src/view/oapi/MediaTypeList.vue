<template>
    <select v-model="selected" @change="add($event.target.value)" class="form-control wa mtb11">
        <option value="" disabled>----</option>
        <option v-for="item in typexx" :value="item.ui" :key="item.ui">
            {{ item.ui }}
        </option>
    </select>

    <div class="btn-group mtb11">
        <span
            v-for="item in manager.list"
            :key="item.ui"
            @click="current = item"
            class="btn"
            :class="Object.is(item, current) ? 'btn-outline-primary' : 'btn-outline-secondary'"
        >
            {{ item.ui }}
        </span>
    </div>

    <MediaType v-if="current" :item="current" :manager="manager"></MediaType>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MediaType from './MediaType.vue'
import sss from '@/sss.ts'
import Property from '@/model/Data/Property'

export default defineComponent({
    components: {
        MediaType,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            current: null,
            selected: '',
            typexx: [] as Property[],
        }
    },
    created() {
        if (sss.project) {
            const ppp = sss.project.getPreset('MediaType')
            if (ppp) {
                this.typexx = ppp.propertyManager.list
            }
        }
    },
    methods: {
        add(ui: string) {
            try {
                const item = this.manager.make(ui)
                this.manager.add(item)
                this.selected = ''
            } catch (error) {
                alert(error)
            }
        },
    },
})
</script>
