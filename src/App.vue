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
.inline {
    display: inline-block;
}

.mr11px {
    margin-right: 11px;
}

.mtb11px {
    margin-top: 11px;
    margin-bottom: 11px;
}

.button-label {
    padding: 0;
    margin: 0;
}
</style>
