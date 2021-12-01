<template>
    <table class="table">
        <caption class="caption-top">
            MediaType
        </caption>
        <thead>
            <tr>
                <td class="text-right">un</td>
                <td>unPattern</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td class="text-right">
                    <div class="btn-group">
                        <DeleteButton :item="item" :manager="manager"></DeleteButton>
                        <span class="btn btn-outline-secondary"> {{ item.un }} </span>
                    </div>
                </td>
                <td>
                    <input type="text" class="form-control" v-model="item.unPattern" />
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td class="text-right">
                    <select
                        v-model="selected"
                        @change="make($event.target.value)"
                        class="form-control"
                    >
                        <option value="" disabled>----</option>
                        <option
                            v-for="option in optionxx"
                            :key="option"
                            :value="option"
                        >
                            {{ option }}
                        </option>
                    </select>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import { LayerMediaTypeManager } from '@/model/Entity/LayerMediaType'
import LayerOperation from '@/model/Entity/LayerOperation'
import LayerPath from '@/model/Entity/LayerPath'
import Toast from '@/model/Service/Toast'
import ss from '@/ss'
import { computed, defineComponent, PropType, ref } from 'vue'
import DeleteButton from '../button/DeleteButton.vue'

export default defineComponent({
    components: {
        DeleteButton,
    },
    props: {
        manager: {
            type: Object as PropType<LayerMediaTypeManager>,
            required: true,
        },
        operation: {
            type: Object as PropType<LayerOperation>,
            required: true,
        },
        path: {
            type: Object as PropType<LayerPath>,
            required: true,
        },
    },
    setup(props, context) {
        let optionxx = ['*']
        const pp = ss.project.getPreset('MediaType')
        if (pp) {
            optionxx = pp.propertyManager.toUNArray()
        }

        const option = ref(optionxx[0])
        const mt = computed(function () {
            return props.manager.findByUN(option.value) ?? null
        })

        function make(text: string) {
            // alert(text)
            try {
                const mt = props.manager.make(text)
                props.manager.add(mt)
            } catch (error) {
                Toast.error(error.message)
            }
        }

        let selected = ''
        return {
            make,
            mt,
            option,
            optionxx,
            selected,
        }
    },
})
</script>
