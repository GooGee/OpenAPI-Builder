export default class Menu {
    constructor(
        readonly title: string,
        readonly path: string,
        readonly menuxx: Menu[] = [],
    ) {}
}
