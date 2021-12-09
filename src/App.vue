<template>
    <Bar :inBrowser="inBrowser"></Bar>
    <div class="container-fluid" style="margin-top: 55px">
        <router-view></router-view>
    </div>
    <div class="mtb11"></div>
    <InputModal></InputModal>
    <ListModal></ListModal>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import emitter from './emitter'
import { EventEnum } from './model/Entity/Event'
import { setReady } from './store'
import Bar from './view/part/Bar.vue'
import InputModal from './view/part/InputModal.vue'
import ListModal from './view/part/ListModal.vue'

export default defineComponent({
    components: {
        Bar,
        InputModal,
        ListModal,
    },
    setup(props, context) {
        const sp = new URLSearchParams(window.location.search)
        const inBrowser = sp.get('ide') === null
        provide('inBrowser', inBrowser)

        emitter.on(EventEnum.ready, setReady)

        return {
            inBrowser,
        }
    },
})
</script>
