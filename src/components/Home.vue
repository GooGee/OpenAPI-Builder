<template>
    <div class="col-6 offset-3">
        <div class="text-center" style="margin-top: 22%;">
            <div>
                <img src="logo.svg" alt="logo" style="width: 222px;" />
            </div>
            <h1>{{ title }}</h1>
            <p>3.0.0</p>
            <div>
                <b-button-group>
                    <b-button @click="create" variant="outline-primary"> New </b-button>
                    <b-button variant="outline-primary">
                        <label class="button-label">
                            Upload
                            <input @change="upload($event)" type="file" :accept="builder.extention" style="display: none;" />
                        </label>
                    </b-button>
                </b-button-group>
            </div>
        </div>
    </div>
</template>

<script>
import builder from '../states/builder.js'

export default {
    name: 'Home',
    data() {
        return {
            title: process.env.VUE_APP_TITLE,
            version: process.env.VUE_APP_VERSION,
            builder,
        }
    },
    methods: {
        create() {
            try {
                const name = prompt('Please input the project name', 'Project')
                if (name) {
                    builder.make(name)
                    this.$router.push('/info')
                }
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        upload(event) {
            const reader = new FileReader()
            reader.onload = event => {
                try {
                    const data = JSON.parse(event.target.result)
                    builder.load(data)
                    this.$router.push('/info')
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            }
            reader.onerror = error => {
                alert(error)
            }
            reader.readAsText(event.target.files[0])
        },
    },
}
</script>
