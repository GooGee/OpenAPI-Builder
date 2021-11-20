<template>
    <nav
        v-if="store.ready"
        class="navbar navbar-expand fixed-top navbar-dark bg-primary"
    >
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/" active-class="active" class="nav-link">
                    home
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/info" active-class="active" class="nav-link">
                    info
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/example" active-class="active" class="nav-link">
                    example
                </router-link>
            </li>
            <li class="nav-item dropdown">
                <span class="nav-link dropdown-toggle pointer">parameter</span>
                <ul class="dropdown-menu">
                    <li>
                        <router-link
                            to="/header"
                            active-class="active"
                            class="dropdown-item"
                        >
                            header
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            to="/parameter"
                            active-class="active"
                            class="dropdown-item"
                        >
                            parameter
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item">
                <router-link to="/path" active-class="active" class="nav-link">
                    path
                </router-link>
            </li>
            <li class="nav-item dropdown">
                <span class="nav-link dropdown-toggle pointer">request</span>
                <ul class="dropdown-menu">
                    <li>
                        <router-link
                            to="/request"
                            active-class="active"
                            class="dropdown-item"
                        >
                            request body
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            to="/response"
                            active-class="active"
                            class="dropdown-item"
                        >
                            response
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item">
                <router-link to="/schema" active-class="active" class="nav-link">
                    schema
                </router-link>
            </li>
            <li class="nav-item dropdown">
                <span class="nav-link dropdown-toggle pointer">security</span>
                <ul class="dropdown-menu">
                    <li>
                        <router-link
                            to="/security-requirement"
                            active-class="active"
                            class="dropdown-item"
                        >
                            requirement
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            to="/security-scheme"
                            active-class="active"
                            class="dropdown-item"
                        >
                            scheme
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            to="/security-scope"
                            active-class="active"
                            class="dropdown-item"
                        >
                            scope
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <span class="nav-link dropdown-toggle pointer">server</span>
                <ul class="dropdown-menu">
                    <li>
                        <router-link
                            to="/server"
                            active-class="active"
                            class="dropdown-item"
                        >
                            server
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            to="/server-variable"
                            active-class="active"
                            class="dropdown-item"
                        >
                            variable
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item">
                <router-link to="/tag" active-class="active" class="nav-link">
                    tag
                </router-link>
            </li>
            <li class="nav-item dropdown">
                <span class="nav-link dropdown-toggle pointer">preset</span>
                <ul class="dropdown-menu">
                    <li>
                        <router-link
                            to="/preset"
                            active-class="active"
                            class="dropdown-item"
                        >
                            property
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            to="/script"
                            active-class="active"
                            class="dropdown-item"
                        >
                            script
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link
                            to="/template"
                            active-class="active"
                            class="dropdown-item"
                        >
                            template
                        </router-link>
                    </li> -->
                </ul>
            </li>
        </ul>

        <ul v-if="inBrowser" class="navbar-nav ml-auto mr11">
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
import store from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        inBrowser: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, context) {
        return { store }
    },
})
</script>

<style scoped>
.nav-item.dropdown:hover .dropdown-menu,
.dropdown-menu:hover {
    display: block;
    top: 88%;
}

.navbar-dark .navbar-nav .nav-link.active {
    font-weight: bold;
}
.navbar-dark .navbar-nav .nav-link:hover {
    color: white;
}
.navbar-dark .navbar-nav .dropdown-item:not(.active):hover {
    background-color: #e9ecef;
}
</style>