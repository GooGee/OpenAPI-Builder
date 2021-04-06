<template>
    <nav id="bar" class="navbar navbar-expand fixed-top navbar-dark bg-primary">
        <ul v-if="ready" class="navbar-nav mr-auto">
            <li v-for="item in routes" :key="item.path" class="nav-item">
                <router-link :to="item.path" active-class="active" class="nav-link">
                    {{ item.name }}
                </router-link>
            </li>
        </ul>

        <ul v-if="sss.inBrowser" class="navbar-nav ml-auto mr11">
            <li class="nav-item">
                <a
                    href="https://github.com/GooGee/OpenAPI-Builder"
                    rel="noopener"
                    target="_blank"
                    class="nav-link"
                >
                    GitHub
                </a>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routes } from '@/router.ts'
import sss from '@/sss.ts'
import { EventEnum } from '@/model/Event/StateEvent'

export default defineComponent({
    data() {
        return {
            sss,
            routes,
            ready: sss.ready,
        }
    },
    created() {
        if (this.ready) {
            return
        }
        sss.event.state.ee.on(EventEnum.AfterProjectLoad, data => (this.ready = true))
    },
})
</script>

<style>
#bar.navbar {
    padding: 0;
}

#bar a.nav-link.active,
#bar a.nav-link:hover {
    color: white;
    background-color: #08f;
}

#bar a.nav-link.active {
    font-weight: bolder;
    padding-left: 1rem;
    padding-right: 1rem;
}

#bar a.nav-link {
    color: rgba(255, 255, 255, 0.8);
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>
