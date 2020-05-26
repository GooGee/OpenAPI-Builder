<template>
    <div id="app">
        <Bar></Bar>
        <div class="container-fluid">
            <div class="row">
                <router-view class="col-9"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Bar from './components/Bar.vue'

export default {
    name: 'App',
    components: {
        Bar,
    },
}
</script>

<style>
.button-label {
    padding: 0;
    margin: 0;
}
</style>
