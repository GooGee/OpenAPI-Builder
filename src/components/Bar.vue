<template>
    <b-navbar id="bar" toggleable="lg" type="dark" variant="primary">
        <div class="container">
            <b-navbar-brand></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/" exact active-class="active"> Home </b-nav-item>

                    <template v-if="builder.document">
                        <b-nav-item to="/info" active-class="active"> Info </b-nav-item>
                        <b-nav-item to="/preset" active-class="active"> Preset </b-nav-item>
                        <b-nav-item to="/example" active-class="active"> Example </b-nav-item>
                        <b-nav-item to="/header" active-class="active"> Header </b-nav-item>
                        <b-nav-item to="/parameter" active-class="active"> Parameter </b-nav-item>
                        <b-nav-item to="/request" active-class="active"> Request </b-nav-item>
                        <b-nav-item to="/response" active-class="active"> Response </b-nav-item>
                        <b-nav-item to="/schema" active-class="active"> Schema </b-nav-item>
                        <b-nav-item to="/security" active-class="active"> Security </b-nav-item>
                        <b-nav-item to="/requirement" active-class="active"> Requirement </b-nav-item>
                        <b-nav-item to="/server" active-class="active"> Server </b-nav-item>
                        <b-nav-item to="/tag" active-class="active"> Tag </b-nav-item>
                        <b-nav-item to="/path" active-class="active"> Path </b-nav-item>
                    </template>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="https://github.com/GooGee/OpenAPI-Builder" target="_blank"> GitHub </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
import builder from '../states/builder.js'

export default {
    name: 'Bar',
    data() {
        return {
            builder,
        }
    },
    created() {
        fetch('preset.json')
            .then(response => response.json())
            .then(json => {
                builder.preset = json
            })
            .catch(error => {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            })
    },
}
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
