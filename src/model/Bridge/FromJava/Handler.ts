import Response from './Response'

export default interface Handler {
    (data: Response): void
}
