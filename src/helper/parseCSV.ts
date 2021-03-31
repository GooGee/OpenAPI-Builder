import papaparse from 'papaparse'

export interface StringObject {
    [key: string]: string
}

export function parseCSV(text: string, delimiter: string) {
    return papaparse.parse<StringObject>(text, {
        delimiter,
        header: true,
    })
}
