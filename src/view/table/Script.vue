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
                    <span class="custom-control custom-switch">
                        <input
                            id="global"
                            v-model="sidebar.item.global"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label for="global" class="custom-control-label">global</label>
                    </span>
                </td>
            </tr>
            <tr v-if="sidebar.item.global">
                <td>
                    <RunButton :script="sidebar.item"></RunButton>
                </td>
            </tr>
            <tr>
                <td>
                    <EditButton :file="file" :item="item"></EditButton>
                </td>
            </tr>
            <tr>
                <td>
                    <textarea
                        v-model="sidebar.item.code"
                        class="form-control"
                        rows="33"
                        spellcheck="false"
                    ></textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import Script from '@/model/Entity/Script'
import SideBar from '@/model/Entity/SideBar'
import File from '@/model/Service/File'
import { defineComponent, PropType, ref, watch } from 'vue'
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
            type: Object as PropType<SideBar<Script>>,
            required: true,
        },
    },
    setup(props, context) {
        const file = ref('')
        const item = ref<Script | null>(null)
        watch(
            () => props.sidebar.item,
            () => {
                file.value = File.getScriptPath(props.sidebar.item!.un + '.js')
                item.value = props.sidebar.item
            },
            { immediate: true },
        )
        return { file, item }
    },
})
</script>
