import Menu from './model/Entity/Menu'

const menuxx = [
    new Menu('home', '/'),
    new Menu('info', '/info'),
    new Menu('example', '/example'),
    new Menu('parameter', '', [
        new Menu('header', '/header'),
        new Menu('parameter', '/parameter'),
    ]),
    new Menu('path', '/path'),
    new Menu('request', '', [
        new Menu('request body', '/request'),
        new Menu('response', '/response'),
    ]),
    new Menu('schema', '/schema'),
    new Menu('security', '', [
        new Menu('requirement', '/security-requirement'),
        new Menu('scheme', '/security-scheme'),
        new Menu('scope', '/security-scope'),
    ]),
    new Menu('server', '', [
        new Menu('server', '/server'),
        new Menu('variable', '/server-variable'),
    ]),
    new Menu('tag', '/tag'),
    new Menu('preset', '', [
        new Menu('enumer', '/enumer'),
        new Menu('property', '/preset'),
        new Menu('script', '/script'),
        // new Menu('template', '/template'),
    ]),
]

export default menuxx
