<template>
    <div class="mtb11">
        <ButtonGroup
            v-model:option="option"
            :list="optionxx"
            :manager="manager"
        ></ButtonGroup>
    </div>

    <MediaType v-if="mt" :item="mt">
        <div class="btn-group">
            <DeleteButton :item="mt" :manager="manager"></DeleteButton>
            <span class="btn btn-outline-secondary"> {{ mt.un }} </span>
        </div>
    </MediaType>

    <template v-else>
        <h2 class="inline mr11">{{ option }}</h2>
        <AddButton :manager="manager" :value="option" :noinput="true"></AddButton>
    </template>
</template>

<script lang="ts">
import { MediaTypeManager } from '@/model/OAPI/MediaType'
import ss from '@/ss'
import { computed, defineComponent, PropType, ref } from 'vue'
import AddButton from '../button/AddButton.vue'
import ButtonGroup from '../button/ButtonGroup.vue'
import DeleteButton from '../button/DeleteButton.vue'
import MediaType from './MediaType.vue'

export default defineComponent({
    components: {
        AddButton,
        ButtonGroup,
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
        let optionxx = ['*']
        const pp = ss.project.getPreset('MediaType')
        if (pp) {
            optionxx = pp.propertyManager.list.map((item) => item.un)
        }

        const option = ref(optionxx[0])
        const mt = computed(function () {
            return props.manager.findByUN(option.value) ?? null
        })

        return {
            mt,
            option,
            optionxx,
        }
    },
})
</script>
