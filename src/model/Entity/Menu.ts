export default class Menu {
    constructor(
        readonly title: string,
        readonly path: string,
        readonly redirect: string,
        readonly component: Function | null = null,
        readonly menuxx: Menu[] = [],
    ) {}
}
