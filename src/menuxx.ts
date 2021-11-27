import Menu from './model/Entity/Menu'
import MenuGroup from './model/Entity/MenuGroup'

const menuxx = [
    new MenuGroup('', [
        //
        new Menu('home', '/', '', () => import('@/view/Home.vue')),
    ]),
    new MenuGroup('', [
        new Menu('info', '/info', '', () => import('@/view/InfoPage.vue'), [
            new Menu('', '', '/info/info'),
            new Menu('', 'contact', '', () => import('@/view/info/Contact.vue')),
            new Menu('', 'external', '', () => import('@/view/info/External.vue')),
            new Menu('', 'info', '', () => import('@/view/info/Info.vue')),
            new Menu('', 'license', '', () => import('@/view/info/License.vue')),
        ]),
    ]),
    new MenuGroup('parameter', [
        new Menu('header', '/header', '', () => import('@/view/HeaderPage.vue')),
        new Menu('parameter', '/parameter', '', () => import('@/view/ParameterPage.vue')),
    ]),
    new MenuGroup('path', [
        new Menu('path', '/path', '', () => import('@/view/PathPage.vue'), [
            new Menu('', '', '/path/operation'),
            new Menu('', 'operation', '', () => import('@/view/path/OperationList.vue')),
            new Menu('', 'parameter', '', () => import('@/view/path/Parameter.vue')),
            new Menu('', 'property', '', () => import('@/view/path/Property.vue')),
        ]),
        new Menu('tag', '/tag', '', () => import('@/view/TagPage.vue')),
    ]),
    new MenuGroup('request', [
        new Menu('example', '/example', '', () => import('@/view/ExamplePage.vue')),
        new Menu('request body', '/request', '', () => import('@/view/RequestPage.vue'), [
            new Menu('', '', '/request/content'),
            new Menu('', 'content', '', () => import('@/view/response/Content.vue')),
            new Menu('', 'property', '', () => import('@/view/response/Property.vue')),
        ]),
        new Menu('response', '/response', '', () => import('@/view/ResponsePage.vue'), [
            new Menu('', '', '/response/content'),
            new Menu('', 'content', '', () => import('@/view/response/Content.vue')),
            new Menu('', 'header', '', () => import('@/view/response/Header.vue')),
            new Menu('', 'property', '', () => import('@/view/response/Property.vue')),
        ]),
    ]),
    new MenuGroup('schema', [
        new Menu('encoding', '/encoding', '', () => import('@/view/EncodingPage.vue')),
        new Menu('enumer', '/enumer', '', () => import('@/view/EnumerPage.vue')),
        new Menu('schema', '/schema', '', () => import('@/view/SchemaPage.vue'), [
            new Menu('', '', '/schema/structure'),
            new Menu('', 'discriminator', '', () => import('@/view/schema/Discriminator.vue')),
            new Menu('', 'excluded', '', () => import('@/view/schema/ExcludedField.vue')),
            new Menu('', 'import', '', () => import('@/view/schema/Import.vue')),
            new Menu('', 'property', '', () => import('@/view/schema/Property.vue')),
            new Menu('', 'required', '', () => import('@/view/schema/RequiredField.vue')),
            new Menu('', 'script', '', () => import('@/view/schema/Script.vue')),
            new Menu('', 'structure', '', () => import('@/view/schema/SchemaComplex.vue')),
        ]),
    ]),
    new MenuGroup('security', [
        new Menu('requirement', '/security-requirement', '', () => import('@/view/SecurityRequirementPage.vue')),
        new Menu('scheme', '/security-scheme', '', () => import('@/view/SecuritySchemePage.vue')),
        new Menu('scope', '/security-scope', '', () => import('@/view/SecurityScopePage.vue')),
    ]),
    new MenuGroup('server', [
        new Menu('server', '/server', '', () => import('@/view/ServerPage.vue')),
        new Menu('variable', '/server-variable', '', () => import('@/view/ServerVariablePage.vue')),
    ]),
    new MenuGroup('preset', [
        new Menu('property', '/preset', '', () => import('@/view/PresetPage.vue')),
        new Menu('script', '/script', '', () => import('@/view/ScriptPage.vue')),
        // new Menu('template', '/template', '', () => import('@/view/TemplatePage.vue')),
    ]),
]

function addLayer() {
    const group = new MenuGroup('layer', [])
    menuxx.push(group)

    const component = () => import('@/view/LayerPage.vue')
    const list = [
        'LayerMediaType',
        'LayerOperation',
        'LayerPath',
        'LayerRequestBody',
        'LayerResponse',
        'LayerSchema',
    ]
    list.forEach((item) => {
        group.menuxx.push(new Menu(item, '/' + item, '', component))
    })
}
addLayer()

export default menuxx
