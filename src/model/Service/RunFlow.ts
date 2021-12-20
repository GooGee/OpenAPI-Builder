import Layer from '../Entity/Layer'
import LayerMediaType from '../Entity/LayerMediaType'
import LayerOperation from '../Entity/LayerOperation'
import LayerPath from '../Entity/LayerPath'
import LayerResponse from '../Entity/LayerResponse'
import LayerSchema from '../Entity/LayerSchema'
import Script from '../Entity/Script'
import UniqueItemInterface from '../Entity/UniqueItemInterface'
import { MediaTypeManager } from '../OAPI/MediaType'
import Operation from '../OAPI/Operation'
import Path from '../OAPI/Path'
import { ReferenceManager } from '../OAPI/Reference'
import Schema from '../OAPI/Schema'
import SecurityScheme, { SecurityType } from '../OAPI/SecurityScheme'
import Vendor from '../Vendor'
import Text from './Text'

export default function RunFlow(schema: Schema, vendor: Vendor) {
    const pathxx = schema.flowManager.getTargetxx(vendor.finder) as LayerPath[]
    pathxx.forEach((lp) => makePath(lp, schema, vendor))
}

function getUN(
    pattern: string,
    schema: Schema,
    path: LayerPath,
    operation: LayerOperation,
) {
    if (pattern === '') {
        return ''
    }
    return Text.runText(pattern, { operation, path, schema })
}

function makeLayer<T extends UniqueItemInterface = UniqueItemInterface>(
    layer: Layer,
    schema: Schema,
    path: LayerPath,
    operation: LayerOperation,
    vendor: Vendor,
) {
    const un = getUN(layer.un, schema, path, operation)
    const im = vendor.finder.findManager(layer.type)
    let found = im.findByUN(un)
    if (found === undefined) {
        found = im.make(un)
        im.add(found)
    }
    return found as T
}

function makeReference(ui: number, manager: ReferenceManager) {
    if (manager.has(ui)) {
        return
    }
    manager.add(manager.make(ui))
}

function makePath(lp: LayerPath, schema: Schema, vendor: Vendor) {
    const un = getUN(lp.unPattern, schema, lp, {} as any)
    let found = vendor.pathManager.findByUN(un)
    if (found === undefined) {
        found = vendor.pathManager.make(un)
        vendor.pathManager.add(found)
    }
    const path = found!

    // lp.operationManager.list.forEach((lo) =>
    //     makeOperation(lp, lo, path, schema, vendor),
    // )
    makeOperation(lp, lp.operation, path, schema, vendor)

    lp.parameterManager.list.forEach((layer) => {
        const item = makeLayer(layer, schema, lp, {} as any, vendor)
        makeReference(item.ui, path.parameterManager)
    })
}

function makeOperation(
    lp: LayerPath,
    lo: LayerOperation,
    path: Path,
    schema: Schema,
    vendor: Vendor,
) {
    let found = path.operationManager.findByUN(lo.un)
    if (found === undefined) {
        found = path.operationManager.make(lo.un)
        path.operationManager.add(found)
    }
    const operation = found!

    lo.parameterManager.list.forEach((layer) => {
        const item = makeLayer(layer, schema, lp, lo, vendor)
        makeReference(item.ui, operation.parameterManager)
    })

    const un = getUN(lo.requestBody.unPattern, schema, lp, lo)
    if (un) {
        makeRequestBody(un, lp, lo, operation, schema, vendor)
    }

    lo.statusManager.list.forEach((lr) =>
        makeResponse(lp, lo, lr, operation, schema, vendor),
    )

    const scopexx = lo.security.scopeManager.list.map((layer) =>
        makeLayer(layer, schema, lp, lo, vendor),
    )

    if (lo.security.un) {
        makeSecurity(lp, lo, operation, scopexx, schema, vendor)
    }

    lo.tagManager.list.forEach((layer) => {
        const item = makeLayer(layer, schema, lp, lo, vendor)
        makeReference(item.ui, operation.tagManager)
    })
}

function makeSecurity(
    lp: LayerPath,
    lo: LayerOperation,
    operation: Operation,
    scopexx: UniqueItemInterface[],
    schema: Schema,
    vendor: Vendor,
) {
    const security = makeLayer<SecurityScheme>(lo.security, schema, lp, lo, vendor)
    makeReference(security.ui, operation.securityManager)
    if (scopexx.length) {
        security.type = SecurityType.oauth2
    }
    lo.security.oAuthFlowManager.list.forEach((flow) => {
        let found = security.oAuthFlowManager.findByUN(flow.un)
        if (found === undefined) {
            found = security.oAuthFlowManager.make(flow.un)
            security.oAuthFlowManager.add(found)
        }
        found.authorizationUrl = flow.authorizationUrl
        found.refreshUrl = flow.refreshUrl
        found.tokenUrl = flow.tokenUrl
        scopexx.forEach((item) => makeReference(item.ui, found!.scopeManager))
    })
}

function makeRequestBody(
    un: string,
    lp: LayerPath,
    lo: LayerOperation,
    operation: Operation,
    schema: Schema,
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
    schema: Schema,
    vendor: Vendor,
) {
    if (lr.useExisted) {
        const found = vendor.finder.find(lr.reference)
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
    schema: Schema,
    layer: LayerSchema,
    lp: LayerPath,
    lo: LayerOperation,
    vendor: Vendor,
) {
    if (layer.script.ui === 0) {
        return null
    }
    const found = vendor.finder.find<Script>(layer.script)
    if (found === undefined) {
        return null
    }
    const un = getUN(layer.unPattern, schema, lp, lo)
    return Text.run(found.code, vendor, schema, un) as Schema
}

function makeMediaType(
    list: LayerMediaType[],
    manager: MediaTypeManager,
    schema: Schema,
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
