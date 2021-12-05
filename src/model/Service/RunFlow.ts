import LayerMediaType from '../Entity/LayerMediaType'
import LayerOperation from '../Entity/LayerOperation'
import LayerPath from '../Entity/LayerPath'
import LayerResponse from '../Entity/LayerResponse'
import LayerSchema from '../Entity/LayerSchema'
import Script from '../Entity/Script'
import { MediaTypeManager } from '../OAPI/MediaType'
import Operation from '../OAPI/Operation'
import Path from '../OAPI/Path'
import SchemaComplex from '../OAPI/SchemaComplex'
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

    const mtSchema = makeSchema(schema, lo.requestBody.schema, lp, lo, vendor)
    if (mtSchema) {
        makeMediaType(lo.requestBody.mtManager.list, found.mediaTypeManager, mtSchema)
    }
}

function makeResponse(
    lp: LayerPath,
    lo: LayerOperation,
    lr: LayerResponse,
    operation: Operation,
    schema: SchemaComplex,
    vendor: Vendor,
) {
    if (lr.useExisted) {
        const found = vendor.project.finder.find(lr.reference)
        if (found) {
            const status = makeStatus(lr, operation)
            status.reference.ui = found.ui
        }
        return
    }

    const un = getUN(lr.unPattern, schema, lp, lo)
    let found = vendor.responseManager.findByUN(un)
    if (found === undefined) {
        found = vendor.responseManager.make(un)
        vendor.responseManager.add(found)
    }

    const mtSchema = makeSchema(schema, lr.schema, lp, lo, vendor)
    if (mtSchema) {
        makeMediaType(lr.mtManager.list, found.mediaTypeManager, mtSchema)
    }

    const status = makeStatus(lr, operation)
    status.reference.ui = found.ui
}

function makeStatus(lr: LayerResponse, operation: Operation) {
    let status = operation.statusManager.findByUN(lr.un)
    if (status === undefined) {
        status = operation.statusManager.make(lr.un)
        operation.statusManager.add(status)
    }
    return status
}

function makeSchema(
    schema: SchemaComplex,
    layer: LayerSchema,
    lp: LayerPath,
    lo: LayerOperation,
    vendor: Vendor,
) {
    if (layer.script.ui === 0) {
        return null
    }
    const found = vendor.project.finder.find<Script>(layer.script)
    if (found === undefined) {
        return null
    }
    const un = getUN(layer.unPattern, schema, lp, lo)
    return Text.run(found.code, vendor, schema, un) as SchemaComplex
}

function makeMediaType(
    list: LayerMediaType[],
    manager: MediaTypeManager,
    schema: SchemaComplex,
) {
    list.forEach((layer) => {
        let found = manager.findByUN(layer.un)
        if (found === undefined) {
            found = manager.make(layer.un)
            manager.add(found)
        }

        found.schema.ui = schema.ui
    })
}
