<template>
    <table class="table">
        <caption class="caption-top">
            <input
                v-model="sidebar.item.description"
                placeholder="description"
                type="text"
                class="form-control mb11"
            />
            <ColorPanel v-model:color="sidebar.item.color"></ColorPanel>
        </caption>
        <tbody>
            <tr>
                <td>
                    <EditButton
                        v-model:code="sidebar.item.code"
                        :file="file"
                    ></EditButton>
                </td>
            </tr>
            <tr>
                <td>
                    <textarea
                        v-model="sidebar.item.code"
                        class="form-control"
                        rows="33"
                        spellcheck="false"
                        readonly
                    ></textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import SideBar from '@/model/Entity/SideBar'
import File from '@/model/Service/File'
import { defineComponent, PropType } from 'vue'
import EditButton from '../button/EditButton.vue'
import ColorPanel from '../part/ColorPanel.vue'

export default defineComponent({
    components: {
        ColorPanel,
        EditButton,
    },
    props: {
        sidebar: {
            type: Object as PropType<SideBar>,
            required: true,
        },
    },
    setup(props, context) {
        const file = File.getScriptPath(props.sidebar.item!.un + '.js')
        return { file }
    },
})
</script>
