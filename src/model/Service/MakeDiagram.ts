import { Graph, Node, Shape } from '@antv/x6'
import Layer from '../Entity/Layer'
import LayerOperation from '../Entity/LayerOperation'
import LayerPath from '../Entity/LayerPath'
import Schema from '../OAPI/Schema'
import ReferenceFinder from './ReferenceFinder'
import Text from './Text'

enum RowEnum {
    path,
    operation,
    response,
    schema,
    security,
    scope,
}

const RowHeight = 111
const ColumnWidth = 222
const ItemHeight = 33
const ItemMargin = 11

export default function MakeDiagram(
    graph: Graph,
    layer: LayerPath,
    schema: Schema,
    finder: ReferenceFinder,
) {
    const path = makeNode(
        Text.getUN(layer.unPattern, schema, layer, layer.operation),
        0,
        0,
    )
    graph.addNode(path)

    const parameter = makeGroup(
        layer.parameterManager.list,
        schema,
        layer,
        layer.operation,
        0,
        ColumnWidth,
        graph,
    )
    if (parameter) {
        graph.addEdge(makeEdge(path, parameter, 'parameter'))
    }

    const operation = makeNode(layer.operation.un, RowEnum.operation * RowHeight, 0)
    graph.addNode(operation)
    graph.addEdge(makeEdge(path, operation, 'operation'))

    const oparameter = makeGroup(
        layer.operation.parameterManager.list,
        schema,
        layer,
        layer.operation,
        RowEnum.operation * RowHeight,
        ColumnWidth,
        graph,
    )
    if (oparameter) {
        graph.addEdge(makeEdge(operation, oparameter, 'parameter'))
    }

    const tag = makeGroup(
        layer.operation.tagManager.list,
        schema,
        layer,
        layer.operation,
        RowEnum.operation * RowHeight,
        ColumnWidth * 2,
        graph,
    )
    if (tag) {
        if (oparameter) {
            graph.addEdge(makeEdge(oparameter, tag, 'tag'))
        } else {
            graph.addEdge(makeEdge(operation, tag, 'tag'))
        }
    }

    makeRequestBody(layer, schema, graph, operation)
    makeResponse(layer, schema, graph, operation, finder)
    const security = makeSecurity(layer, schema, graph)
    // graph.addEdge(
    //     makeEdge(operation, security, 'security', {
    //         name: 'oneSide',
    //         args: { side: 'left' },
    //     }),
    // )
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

function makeEdge(
    source: Node,
    target: Node,
    label = '',
    router: object | undefined = undefined,
) {
    return new Shape.Edge({
        label,
        source,
        target,
        router,
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
        attrs: {
            body: {
                stroke: '#888',
                strokeWidth: 1,
            },
        },
    })
}

function makeGroup(
    list: Layer[],
    schema: Schema,
    path: LayerPath,
    operation: LayerOperation,
    y: number,
    x: number,
    graph: Graph,
) {
    if (list.length === 0) {
        return null
    }

    let width = 111
    const nodexx = list.map((item, index) => {
        const label = Text.getUN(item.unPattern, schema, path, operation)
        width = calculateWidth(label, width)
        return makeNode(
            label,
            y + ItemMargin + index * (ItemHeight + ItemMargin),
            x + ItemMargin,
        )
    })

    const group = makeNode(
        '',
        y,
        x,
        width + ItemMargin * 2,
        calculateGroupHeight(list.length),
    )
    graph.addNode(group)

    nodexx.forEach((item) => {
        group.addChild(item)
        graph.addNode(item)
    })
    return group
}

function makeRequestBody(
    layer: LayerPath,
    schema: Schema,
    graph: Graph,
    operation: Node,
) {
    let label = '-- none --'
    if (layer.operation.withRequestBody) {
        label = Text.getUN(
            layer.operation.requestBody.unPattern,
            schema,
            layer,
            layer.operation,
        )
    }
    const rb = makeNode(label, RowEnum.response * RowHeight, 0)
    graph.addNode(rb)
    graph.addEdge(makeEdge(operation, rb, 'RequestBody'))

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
        graph.addNode(node)
        graph.addEdge(makeEdge(rb, node, 'schema'))
    }
}

function makeResponse(
    layer: LayerPath,
    schema: Schema,
    graph: Graph,
    operation: Node,
    finder: ReferenceFinder,
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
    graph.addNode(group)
    graph.addEdge(makeEdge(operation, group, 'response'))

    layer.operation.statusManager.list.forEach((status, index) => {
        let label = status.un + ' '
        if (status.useExisted) {
            label += finder.find(status.reference)?.un ?? '?'
        } else {
            label += Text.getUN(status.unPattern, schema, layer, layer.operation)
        }
        statusWidth = calculateWidth(label, statusWidth)
        const y = RowEnum.response * RowHeight + calculateGroupHeight(index)
        const response = makeNode(label, y, ColumnWidth + ItemMargin)
        graph.addNode(response)
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
            graph.addNode(node)
            group.addChild(node)
            graph.addEdge(makeEdge(response, node))
        }
    })

    if (schemaWidth === 0) {
        group.setSize(statusWidth + ItemMargin * 2, groupHeight)
        return
    }

    group.setSize(ColumnWidth + schemaWidth + ItemMargin, groupHeight)
}

function makeSecurity(layer: LayerPath, schema: Schema, graph: Graph) {
    let label = 'security\n'
    if (layer.operation.withSecurity) {
        label += Text.getUN(
            layer.operation.security.unPattern,
            schema,
            layer,
            layer.operation,
        )
    } else {
        label += '-- none --'
    }
    const security = makeNode(label, RowEnum.security * RowHeight, 0)
    graph.addNode(security)

    const scope = makeGroup(
        layer.operation.security.scopeManager.list,
        schema,
        layer,
        layer.operation,
        RowEnum.scope * RowHeight,
        0,
        graph,
    )
    if (scope) {
        graph.addEdge(makeEdge(security, scope, 'scope'))
    }

    return security
}
