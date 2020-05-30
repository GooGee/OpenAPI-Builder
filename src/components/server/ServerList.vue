<template>
    <div>
        <div>
            <h1 class="inline mr11">Server</h1>
            <AddButton :manager="manager" name="url"></AddButton>
        </div>

        <Server v-for="server in manager.list" :server="server" :manager="manager" :key="server.url"></Server>
    </div>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import builder from '../../states/builder.js'
import Server from './Server.vue'

export default {
    name: 'ServerList',
    components: {
        AddButton,
        Server,
    },
    data() {
        return {
            manager: builder.document.serverManager,
        }
    },
}
</script>
