import { convertQuotes } from './typography'

/**
 * Расширенное преобразование типографии
 */
export function advancedTypography(text: string): string {
    if (!text) return text

    let result = convertQuotes(text)

    // Дополнительные типографские преобразования:

    // Замена дефисов на тире в определенных контекстах
    result = result.replace(/(\s)-(\s)/g, '$1—$2')

    // Замена трех точек на многоточие
    result = result.replace(/\.\.\./g, '…')

    // Неразрывные пробелы после коротких слов
    result = result.replace(/(^|\s)([а-яА-Яa-zA-Z]{1,2})\s/g, '$1$2\u00A0')

    return result
}
