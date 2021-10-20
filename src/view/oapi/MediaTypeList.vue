<template>
    <select
        v-model="option"
        @change="add($event.target.value)"
        class="form-control wa mtb11"
    >
        <option value="" disabled>----</option>
        <option v-for="item in optionxx" :value="item.un" :key="item.id">
            {{ item.un }}
        </option>
    </select>

    <div class="btn-group mtb11">
        <span
            v-for="item in manager.list"
            :key="item.id"
            @click="current = item"
            class="btn"
            :class="
                Object.is(item, current)
                    ? 'btn-outline-primary'
                    : 'btn-outline-secondary'
            "
        >
            {{ item.un }}
        </span>
    </div>

    <MediaType v-if="current" :item="current">
        <div class="btn-group">
            <DeleteButton
                :manager="manager"
                :item="current"
                @remove="remove"
            ></DeleteButton>
            <span class="btn btn-outline-secondary"> {{ current.un }} </span>
        </div>
    </MediaType>
</template>

<script lang="ts">
import Toast from '@/model/Service/Toast'
import { MediaTypeManager } from '@/model/OAPI/MediaType'
import ss from '@/ss'
import { defineComponent, PropType, ref, watch } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'
import MediaType from './MediaType.vue'

export default defineComponent({
    components: {
        DeleteButton,
        MediaType,
    },
    props: {
        manager: {
            type: Object as PropType<MediaTypeManager>,
            required: true,
        },
    },
    setup(props, context) {
        const current = ref(null)
        const option = ref('')
        const optionxx = ref<any>([])
        const pp = ss.project.getPreset('MediaType')
        if (pp) {
            optionxx.value = pp.propertyManager.list
        }
        function add(un: string) {
            try {
                const item = props.manager.make(un)
                props.manager.add(item)
                option.value = ''
            } catch (error) {
                Toast.error(error.message)
            }
        }
        function remove() {
            current.value = null
        }
        watch(
            () => props.manager,
            () => {
                current.value = null
            },
        )
        return {
            add,
            current,
            option,
            optionxx,
            remove,
        }
    },
})
</script>
