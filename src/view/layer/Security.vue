<template>
    <table class="table">
        <caption class="caption-top">
            <h2 class="inline mr11">Security Scheme</h2>
            <slot></slot>
        </caption>
        <thead v-if="withSecurity">
            <tr>
                <td class="text-right w222">unPattern</td>
                <td>
                    <input v-model="item.unPattern" type="text" class="form-control" />
                </td>
            </tr>
            <tr>
                <th colspan="2">
                    <ButtonGroup
                        v-model:option="option"
                        :list="optionxx"
                        :manager="item.oAuthFlowManager"
                    ></ButtonGroup>
                </th>
            </tr>
            <tr>
                <th colspan="2">
                    <h2 class="inline text-secondary mr11">{{ option }}</h2>
                    <AddButton
                        v-if="flow === null"
                        :manager="item.oAuthFlowManager"
                        :value="option"
                        :noinput="true"
                    ></AddButton>
                    <DeleteButton
                        v-else
                        :item="flow"
                        :manager="item.oAuthFlowManager"
                    ></DeleteButton>
                </th>
            </tr>
        </thead>
        <tbody v-if="flow">
            <tr v-if="flow.hasAuthorization">
                <td class="text-right">authorizationUrl</td>
                <td>
                    <input
                        v-model="flow.authorizationUrl"
                        type="text"
                        class="form-control"
                    />
                </td>
            </tr>
            <tr>
                <td class="text-right">refreshUrl</td>
                <td>
                    <input v-model="flow.refreshUrl" type="text" class="form-control" />
                </td>
            </tr>
            <tr v-if="flow.hasToken">
                <td class="text-right">tokenUrl</td>
                <td>
                    <input v-model="flow.tokenUrl" type="text" class="form-control" />
                </td>
            </tr>
        </tbody>
    </table>

    <h2 class="text-secondary">Security Scope</h2>
    <EditList :manager="item.scopeManager" value="read:${schema.un}"></EditList>
</template>

<script lang="ts">
import LayerSecurityScheme from '@/model/Entity/LayerSecurityScheme'
import { computed, defineComponent, PropType, ref } from 'vue'
import AddButton from '../button/AddButton.vue'
import ButtonGroup from '../button/ButtonGroup.vue'
import DeleteButton from '../button/DeleteButton.vue'
import EditList from '../part/EditList.vue'

export default defineComponent({
    components: {
        AddButton,
        ButtonGroup,
        DeleteButton,
        EditList,
    },
    props: {
        item: {
            type: Object as PropType<LayerSecurityScheme>,
            required: true,
        },
        withSecurity: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, context) {
        const optionxx = [
            'authorizationCode',
            'clientCredentials',
            'implicit',
            'password',
        ]
        const option = ref(optionxx[2])
        const flow = computed(function () {
            return props.item.oAuthFlowManager.findByUN(option.value) ?? null
        })

        return {
            flow,
            option,
            optionxx,
        }
    },
})
</script>
