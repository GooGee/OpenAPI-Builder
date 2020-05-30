<template>
    <div id="app">
        <Bar></Bar>
        <div class="container-fluid">
            <router-view></router-view>
        </div>
        <ComponentDialogue></ComponentDialogue>
        <ListDialogue></ListDialogue>
    </div>
</template>

<script>
import Bar from './components/Bar.vue'
import ComponentDialogue from './components/ComponentDialogue.vue'
import ListDialogue from './components/ListDialogue.vue'

export default {
    name: 'App',
    components: {
        Bar,
        ComponentDialogue,
        ListDialogue,
    },
}
</script>

<style>
.inline {
    display: inline-block;
}

.wa {
    width: auto;
}

.mr11 {
    margin-right: 11px;
}

.mb11 {
    margin-bottom: 11px;
}

.mtb11 {
    margin-top: 11px;
    margin-bottom: 11px;
}

.button-label {
    padding: 0;
    margin: 0;
}
</style>
