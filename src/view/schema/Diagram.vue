<template>
    <div id="diagram"></div>
</template>

<script lang="ts">
import { Graph } from '@antv/x6'
import Bar from '@/view/part/Bar.vue'
import { defineComponent, onMounted, PropType, watch } from 'vue'
import LayerPath from '@/model/Entity/LayerPath'
import Schema from '@/model/OAPI/Schema'
import make from '@/model/Diagram/PathDiagram'

export default defineComponent({
    components: {
        Bar,
    },
    props: {
        path: {
            type: Object as PropType<LayerPath>,
            required: true,
        },
        schema: {
            type: Object as PropType<Schema>,
            required: true,
        },
    },
    setup(props, context) {
        onMounted(function () {
            const graph = new Graph({
                container: document.getElementById('diagram')!,
                grid: true,
                panning: true,
                width: 800,
                height: 800,
            })

            function draw() {
                const data = make(props.path, props.schema)
                console.log(
                    props.path.un,
                    props.schema.un,
                    data.edges.length,
                    data.nodes.length,
                )
                graph.clearCells()
                graph.addNodes(data.nodes)
                graph.addEdges(data.edges)
                graph.centerContent()
            }

            watch(() => props.path, draw)
            watch(() => props.schema, draw)
            draw()
        })

        return {}
    },
})
</script>
