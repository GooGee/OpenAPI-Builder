<template>
    <div class="mtb11">
        <ButtonGroup @select="select" :name="type" :list="typexx" :manager="manager"></ButtonGroup>
    </div>

    <OAuthFlow
        v-if="current"
        @deleted="update(null)"
        :item="current"
        :manager="manager"
    ></OAuthFlow>

    <template v-else>
        <h2 class="inline mr11">{{ type }}</h2>
        <AddButton @added="update" :manager="manager" :value="type" :noinput="true"></AddButton>
    </template>
</template>

<script lang="ts">
import Noty from 'noty'
import { defineComponent, ref } from 'vue'
import AddButton from '../button/AddButton.vue'
import ButtonGroup from '../button/ButtonGroup.vue'
import OAuthFlow from './OAuthFlow.vue'
import sss from '@/sss.ts'
import Property from '@/model/Data/Property'
import UniqueItem from '@/model/Base/UniqueItem'
import UniqueItemManager from '@/model/Base/UniqueItemManager'

export default defineComponent({
    components: {
        AddButton,
        ButtonGroup,
        OAuthFlow,
    },
    props: {
        manager: {
            type: UniqueItemManager,
            required: true,
        },
    },
    setup(props) {
        const typexx = ['authorizationCode', 'clientCredentials', 'implicit', 'password']
        const type = ref('implicit')
        const current = ref<UniqueItem | null>(props.manager.find(type.value) ?? null)
        function select(one: string) {
            type.value = one
            current.value = props.manager.find(type.value) ?? null
        }
        function update(item: UniqueItem) {
            current.value = item
        }

        return {
            current,
            select,
            type,
            typexx,
            update,
        }
    },
})
</script>
