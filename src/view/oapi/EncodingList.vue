<template>
    <table class="table">
        <caption class="caption-top">
            <h2>Encoding</h2>
        </caption>
        <thead>
            <tr>
                <td class="w111">un</td>
                <td>contentType</td>
                <td>style</td>
                <td>explode</td>
                <td>allowReserved</td>
                <td>headers</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.ui">
                <td>
                    <div class="btn-group">
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <span class="btn btn-outline-secondary"> {{ item.un }} </span>
                    </div>
                </td>
                <td>
                    <select v-model="item.contentType" class="form-control">
                        <option disabled value="">----</option>
                        <option
                            v-for="type in contentTypexx"
                            :value="type.ui"
                            :key="type.ui"
                        >
                            {{ type.un }}
                        </option>
                    </select>
                </td>
                <td>
                    <input v-model="item.style" type="text" class="form-control" />
                </td>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            :id="item.ui + 'explode'"
                            v-model="item.explode"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label
                            :for="item.ui + 'explode'"
                            class="custom-control-label"
                        ></label>
                    </span>
                </td>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            :id="item.ui + 'allowReserved'"
                            v-model="item.allowReserved"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label
                            :for="item.ui + 'allowReserved'"
                            class="custom-control-label"
                        ></label>
                    </span>
                </td>
                <td>
                    <ReferenceList :manager="item.headerManager"></ReferenceList>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <AddButton :manager="manager"></AddButton>
                </td>
                <td colspan="5"></td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import { EncodingManager } from '@/model/OAPI/Encoding'
import ss from '@/ss'
import { defineComponent, PropType } from 'vue'
import AddButton from '../button/AddButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import ReferenceList from './ReferenceList.vue'

export default defineComponent({
    components: {
        AddButton,
        DeleteButton,
        ReferenceList,
    },
    props: {
        manager: {
            type: Object as PropType<EncodingManager>,
            required: true,
        },
    },
    setup(props, context) {
        const contentTypexx = ss.project.getPreset('ContentType')?.propertyManager.list
        if (contentTypexx === undefined) {
            throw new Error('Preset ContentType not found')
        }
        return {
            contentTypexx,
        }
    },
})
</script>
