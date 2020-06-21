<template>
    <div>
        <template v-if="editing">
            <select v-model="schema.type" class="form-control">
                <option v-for="type in typeList" :value="type.name" :key="type.name"> {{ type.name }} </option>
            </select>

            <template v-if="schema.isPrimitive">
                <select v-if="schema.type !== 'boolean'" v-model="schema.format" class="form-control">
                    <option value=""> ---- </option>
                    <option v-for="format in formatList" :value="format.name" :key="format.name">
                        {{ format.name }}
                    </option>
                </select>
            </template>
            <template v-else>
                <div v-if="schema.type === 'array'">
                    <select v-model="schema.itemType" class="form-control">
                        <option v-for="type in itemTypeList" :value="type" :key="type"> {{ type }} </option>
                    </select>
                    <Reference v-if="schema.isItemReference" :reference="schema.reference"></Reference>
                </div>

                <Reference v-if="schema.type === 'reference'" :reference="schema.reference"></Reference>

                <template v-if="schema.type === 'composition' || schema.type === 'object'">
                    <SchemaList :manager="schema.schemaManager" :editing="editing" :type="schema.type"></SchemaList>
                </template>
            </template>
        </template>

        <template v-else>
            <span v-if="schema.isPrimitive">{{ schema.type + ' ' + schema.format }}</span>
            <template v-else>
                <div v-if="schema.type === 'array'">
                    [ {{ schema.isItemReference ? schema.reference.text : schema.itemType }} ]
                </div>

                <div v-if="schema.type === 'reference'">{{ schema.reference.text }}</div>

                <template v-if="schema.type === 'composition' || schema.type === 'object'">
                    <div class="mb11">{{ schema.type }}</div>
                    <SchemaList :manager="schema.schemaManager" :editing="editing" :type="schema.type"></SchemaList>
                </template>
            </template>
        </template>
    </div>
</template>

<script>
import Reference from './Reference.vue'
import SchemaList from './SchemaList.vue'
import builder from '../../states/builder.js'

export default {
    name: 'SchemaType',
    components: {
        Reference,
        SchemaList,
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
        editing: {
            type: Boolean,
            required: true,
        },
        inComposition: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    created() {
        this.allTypeList = builder.presetManager.find('DataType').propertyManager.list
        this.formatList = builder.presetManager.find('DataFormat').propertyManager.list
    },
    computed: {
        typeList() {
            if (this.inComposition) {
                return [{ name: 'object' }, { name: 'reference' }]
            }
            return this.allTypeList
        },
    },
    data() {
        return {
            allTypeList: [],
            itemTypeList: ['boolean', 'integer', 'number', 'reference', 'string'],
            formatList: [],
        }
    },
}
</script>
