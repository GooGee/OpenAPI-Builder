import ss from '@/ss'
import { Edge, Node, Shape } from '@antv/x6'
import LayerPath from '../Entity/LayerPath'
import Schema from '../OAPI/Schema'
import Text from '../Service/Text'

enum RowEnum {
    path,
    operation,
    response,
    schema,
}

const RowHeight = 111
const ColumnWidth = 222
const ItemHeight = 33
const ItemMargin = 11

export default function make(layer: LayerPath, schema: Schema) {
    const edges: Edge[] = []
    const nodes: Node[] = []

    const path = makeNode(
        Text.getUN(layer.unPattern, schema, layer, layer.operation),
        RowEnum.path,
        0,
    )
    nodes.push(path)

    const operation = makeNode(layer.operation.un, RowEnum.operation * RowHeight, 0)
    nodes.push(operation)
    edges.push(makeEdge(path, operation, 'operation'))

    makeRequestBody(layer, schema, edges, nodes, operation)
    makeResponse(layer, schema, edges, nodes, operation)

    return {
        edges,
        nodes,
    }
}

function calculateGroupHeight(length: number) {
    return length * (ItemHeight + ItemMargin) + ItemMargin
}

function calculateWidth(label: string, width: number) {
    let max = 0
    label.split('\n').forEach((item) => {
        if (max < item.length) {
            max = item.length
        }
    })
    const size = max * 9
    if (width < size) {
        return size
    }
    return width
}

function makeEdge(source: Node, target: Node, label = '') {
    return new Shape.Edge({
        label,
        source,
        target,
    })
}

function makeNode(
    label: string,
    y: number,
    x: number,
    width: number = 111,
    height: number = ItemHeight,
) {
    return new Shape.Rect({
        x,
        y,
        label,
        height,
        width: calculateWidth(label, width),
    })
}

function makeRequestBody(
    layer: LayerPath,
    schema: Schema,
    edges: Edge[],
    nodes: Node[],
    operation: Node,
) {
    let label = 'none'
    if (layer.operation.withRequestBody) {
        label = Text.getUN(
            layer.operation.requestBody.unPattern,
            schema,
            layer,
            layer.operation,
        )
    }
    const rb = makeNode(label, RowEnum.response * RowHeight, 0)
    nodes.push(rb)
    edges.push(makeEdge(operation, rb, 'RequestBody'))

    if (layer.operation.withRequestBody) {
        const node = makeNode(
            Text.getUN(
                layer.operation.requestBody.schema.unPattern,
                schema,
                layer,
                layer.operation,
            ),
            RowEnum.schema * RowHeight,
            0,
        )
        nodes.push(node)
        edges.push(makeEdge(rb, node, 'schema'))
    }
}

function makeResponse(
    layer: LayerPath,
    schema: Schema,
    edges: Edge[],
    nodes: Node[],
    operation: Node,
) {
    let statusWidth = 0
    let schemaWidth = 0
    const groupHeight = calculateGroupHeight(layer.operation.statusManager.list.length)
    const group = makeNode(
        '',
        RowEnum.response * RowHeight,
        ColumnWidth,
        111,
        groupHeight,
    )
    nodes.push(group)
    edges.push(makeEdge(operation, group, 'response'))

    layer.operation.statusManager.list.forEach((status, index) => {
        let label = status.un + ' '
        if (status.useExisted) {
            label += ss.finder.find(status.reference)?.un ?? '?'
        } else {
            label += Text.getUN(status.unPattern, schema, layer, layer.operation)
        }
        statusWidth = calculateWidth(label, statusWidth)
        const y = RowEnum.response * RowHeight + calculateGroupHeight(index)
        const response = makeNode(label, y, ColumnWidth + ItemMargin)
        nodes.push(response)
        group.addChild(response)

        if (status.useExisted) {
            // no schema
        } else {
            const label = Text.getUN(
                status.schema.unPattern,
                schema,
                layer,
                layer.operation,
            )
            schemaWidth = calculateWidth(label, schemaWidth)
            const node = makeNode(label, y, ColumnWidth + ColumnWidth)
            nodes.push(node)
            group.addChild(node)
            edges.push(makeEdge(response, node))
        }
    })

    if (schemaWidth === 0) {
        group.setSize(statusWidth + ItemMargin + ItemMargin, groupHeight)
        return
    }

    group.setSize(ColumnWidth + schemaWidth + ItemMargin, groupHeight)
}
