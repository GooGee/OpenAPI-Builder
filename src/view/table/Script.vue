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
                <td class="text-right">global</td>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            id="global"
                            v-model="sidebar.item.global"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label for="global" class="custom-control-label"></label>
                    </span>
                </td>
            </tr>
            <tr v-if="sidebar.item.global">
                <td class="text-right"></td>
                <td>
                    <RunButton :script="sidebar.item"></RunButton>
                </td>
            </tr>
            <tr>
                <td class="text-right"></td>
                <td>
                    <EditButton
                        v-model:code="sidebar.item.code"
                        :file="file"
                    ></EditButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">code</td>
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
import RunButton from '../button/RunButton.vue'
import ColorPanel from '../part/ColorPanel.vue'

export default defineComponent({
    components: {
        ColorPanel,
        EditButton,
        RunButton,
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
