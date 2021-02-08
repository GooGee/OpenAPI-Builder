<template>
    <nav id="bar" class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div v-if="sss.ready" class="container">
            <ul class="navbar-nav mr-auto">
                <li v-for="item in routes" :key="item.path" class="nav-item">
                    <router-link :to="item.path" active-class="active" class="nav-link">
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routes } from '@/router.ts'
import sss from '@/sss.ts'

export default defineComponent({
    data() {
        return {
            routes,
            sss,
        }
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
