<template>
    <div class="text-center" style="margin-top: 11%">
        <img
            v-if="store.ready"
            alt="logo"
            src="../asset/image/logo.svg"
            style="width: 222px"
        />
        <img v-else alt="loading" src="../asset/image/loading.svg" class="mb11" />
        <h1>{{ title }}</h1>
        <p>{{ version }}</p>
        <p v-if="inBrowser">
            <span
                v-if="!store.loading"
                @click="create"
                class="btn btn-outline-primary mr11"
            >
                New
            </span>
            <span v-if="store.ready" @click="toJSON" class="btn btn-outline-success">
                toJSON
            </span>
        </p>
    </div>
</template>

<script lang="ts">
import ss from '@/ss'
import store from '@/store'
import { defineComponent, inject } from 'vue'

export default defineComponent({
    setup(props, context) {
        const inBrowser = inject('inBrowser', true)
        function create() {
            ss.create()
        }
        function toJSON() {
            store.inputModal.text = JSON.stringify(ss.project.toOAPI())
            store.inputModal.show('OpenAPI JSON', () => {})
        }
        return {
            create,
            inBrowser,
            toJSON,
            store,
            title: process.env.VUE_APP_TITLE,
            version: process.env.VUE_APP_VERSION,
        }
    },
})
</script>
