<template>
    <b-form-select @change="add" :options="list" class="wa"></b-form-select>
</template>

<script>
export default {
    name: 'SelectButton',
    props: {
        list: {
            type: Array,
            required: true,
        },
        manager: {
            type: Object,
            required: true,
        },
    },
    methods: {
        add(name) {
            try {
                const item = this.manager.make(name)
                this.manager.add(item)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>
