<template>
    <div class="mtb11">
        <ButtonGroup
            v-model:option="option"
            :list="optionxx"
            :manager="manager"
        ></ButtonGroup>
    </div>

    <OAuthFlow v-if="flow" :item="flow">
        <div class="btn-group">
            <DeleteButton :item="flow" :manager="manager"></DeleteButton>
            <span class="btn btn-outline-secondary"> {{ flow.un }} </span>
        </div>
    </OAuthFlow>

    <template v-else>
        <h2 class="inline mr11">{{ option }}</h2>
        <AddButton :manager="manager" :value="option" :noinput="true"></AddButton>
    </template>
</template>

<script lang="ts">
import { OAuthFlowManager } from '@/model/OAPI/OAuthFlow'
import { computed, defineComponent, PropType, ref } from 'vue'
import AddButton from '../button/AddButton.vue'
import ButtonGroup from '../button/ButtonGroup.vue'
import DeleteButton from '../button/DeleteButton.vue'
import OAuthFlow from './OAuthFlow.vue'

export default defineComponent({
    components: {
        AddButton,
        ButtonGroup,
        DeleteButton,
        OAuthFlow,
    },
    props: {
        manager: {
            type: Object as PropType<OAuthFlowManager>,
            required: true,
        },
    },
    setup(props) {
        const optionxx = [
            'authorizationCode',
            'clientCredentials',
            'implicit',
            'password',
        ]
        const option = ref(optionxx[2])
        const flow = computed(function () {
            return props.manager.findByUN(option.value) ?? null
        })

        return {
            flow,
            option,
            optionxx,
        }
    },
})
</script>
