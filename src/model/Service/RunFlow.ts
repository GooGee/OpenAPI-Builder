import LayerMediaType from '../Entity/LayerMediaType'
import LayerOperation from '../Entity/LayerOperation'
import LayerPath from '../Entity/LayerPath'
import LayerResponse from '../Entity/LayerResponse'
import UniqueItem from '../Entity/UniqueItem'
import { MediaTypeManager } from '../OAPI/MediaType'
import Operation from '../OAPI/Operation'
import Path from '../OAPI/Path'
import SchemaComplex, { SchemaManager } from '../OAPI/SchemaComplex'
import Vendor from '../Vendor'
import Text from './Text'

export default function RunFlow(schema: SchemaComplex, vendor: Vendor) {
    const pathxx = schema.flowManager.getTargetxx(vendor.project.finder) as LayerPath[]
    pathxx.forEach((lp) => makePath(lp, schema, vendor))
}

function getUN(
    pattern: string,
    schema: SchemaComplex,
    path: LayerPath,
    operation: LayerOperation,
) {
    if (pattern === '') {
        return ''
    }
    return Text.runText(pattern, { operation, path, schema })
}

function makePath(lp: LayerPath, schema: SchemaComplex, vendor: Vendor) {
    const un = getUN(lp.unPattern, schema, lp, {} as any)
    let found = vendor.pathManager.findByUN(un)
    if (found === undefined) {
        found = vendor.pathManager.make(un)
        vendor.pathManager.add(found)
    }

    lp.operationManager.list.forEach((lo) =>
        makeOperation(lp, lo, found!, schema, vendor),
    )
}

function makeOperation(
    lp: LayerPath,
    lo: LayerOperation,
    path: Path,
    schema: SchemaComplex,
    vendor: Vendor,
) {
    let found = path.operationManager.findByUN(lo.un)
    if (found === undefined) {
        found = path.operationManager.make(lo.un)
        path.operationManager.add(found)
    }

    const un = getUN(lo.requestBody.unPattern, schema, lp, lo)
    if (un) {
        makeRequestBody(un, lp, lo, found, schema, vendor)
    }

    lo.statusManager.list.forEach((lr) =>
        makeResponse(lp, lo, lr, found!, schema, vendor),
    )
}

function makeRequestBody(
    un: string,
    lp: LayerPath,
    lo: LayerOperation,
    operation: Operation,
    schema: SchemaComplex,
    vendor: Vendor,
) {
    let found = vendor.requestBodyManager.findByUN(un)
    if (found === undefined) {
        found = vendor.requestBodyManager.make(un)
        vendor.requestBodyManager.add(found)
    }
    operation.requestBody.ui = found.ui

    makeMediaType(
        lo.requestBody.mtManager.list,
        found.mediaTypeManager,
        schema,
        lp,
        lo,
        vendor.schemaManager,
    )
}

function makeResponse(
    lp: LayerPath,
    lo: LayerOperation,
    lr: LayerResponse,
    operation: Operation,
    schema: SchemaComplex,
    vendor: Vendor,
) {
    const un = getUN(lr.unPattern, schema, lp, lo)
    let found = vendor.responseManager.findByUN(un)
    if (found === undefined) {
        found = vendor.responseManager.make(un)
        vendor.responseManager.add(found)
    }

    makeMediaType(
        lr.mtManager.list,
        found.mediaTypeManager,
        schema,
        lp,
        lo,
        vendor.schemaManager,
    )

    let status = operation.statusManager.findByUN(lr.un)
    if (status === undefined) {
        status = operation.statusManager.make(lr.un)
        operation.statusManager.add(status)
    }
    status.reference.ui = found.ui
}

function makeSchema(un: string, schemaManager: SchemaManager) {
    let found = schemaManager.findByUN(un)
    if (found === undefined) {
        found = schemaManager.make(un)
        schemaManager.add(found)
    }
    return found
}

function makeMediaType(
    list: LayerMediaType[],
    manager: MediaTypeManager,
    schema: SchemaComplex,
    path: LayerPath,
    operation: LayerOperation,
    schemaManager: SchemaManager,
) {
    list.forEach((layer) => {
        let found = manager.findByUN(layer.un)
        if (found === undefined) {
            found = manager.make(layer.un)
            manager.add(found)
        }

        const un = getUN(layer.unPattern, schema, path, operation)
        if (un === '') {
            return
        }
        const sc = makeSchema(un, schemaManager)
        found.schema.ui = sc.ui
    })
}
