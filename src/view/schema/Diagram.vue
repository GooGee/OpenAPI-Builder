<template>
    <div id="diagram"></div>
</template>

<script lang="ts">
import LayerPath from '@/model/Entity/LayerPath'
import Schema from '@/model/OAPI/Schema'
import MakeDiagram from '@/model/Service/MakeDiagram'
import ss from '@/ss'
import { Graph } from '@antv/x6'
import { defineComponent, onMounted, PropType, watch } from 'vue'

export default defineComponent({
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
                const data = MakeDiagram(props.path, props.schema, ss.finder)
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
