<template>
    <div class="row">
        <SideBar :manager="manager" title="Parameter" class="col-3"></SideBar>

        <div v-if="ready && sidebar.item" class="col-9">
            <Header :item="sidebar.item" :manager="manager">
                <tr>
                    <td class="text-right">name</td>
                    <td>
                        <ChangeButton :item="sidebar.item" name="name2"></ChangeButton>
                    </td>
                </tr>
                <tr>
                    <td class="text-right">in</td>
                    <td>
                        <b-form-select v-model="sidebar.item.location" :options="locationList"></b-form-select>
                    </td>
                </tr>
            </Header>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import Header from './specification/Header.vue'
import SideBar from './SideBar.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Parameter',
    components: {
        ChangeButton,
        Header,
        SideBar,
    },
    data() {
        return {
            sidebar,
            ready: false,
            manager: builder.document.component.parameterManager,
            locationList: ['cookie', 'path', 'query'],
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>
