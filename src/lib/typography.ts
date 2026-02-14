/**
 * Преобразует прямые кавычки в типографские (русские кавычки-ёлочки)
 * @param text - Текст для преобразования
 * @returns Текст с типографскими кавычками
 */
export function convertQuotes(text: string): string {
    if (!text) return text

    let result = ''
    let isOpen = true // Флаг для отслеживания открывающей/закрывающей кавычки

    for (let i = 0; i < text.length; i++) {
        const char = text[i]
        const prevChar = i > 0 ? text[i - 1] : ''
        const nextChar = i < text.length - 1 ? text[i + 1] : ''

        // Если это двойная кавычка
        if (char === '"') {
            // Проверяем, является ли это открывающей кавычкой
            const shouldBeOpen = isOpen && !isClosingContext(prevChar, nextChar)

            if (shouldBeOpen) {
                result += '«'
                isOpen = false
            } else {
                result += '»'
                isOpen = true
            }
        } else {
            result += char
        }
    }

    return result
}

/**
 * Определяет, должен ли символ быть закрывающей кавычкой
 */
function isClosingContext(prevChar: string, nextChar: string): boolean {
    // Если перед кавычкой есть пробел, а после нет, это вероятно открывающая
    // Если перед кавычкой нет пробела, а после есть, это вероятно закрывающая
    const hasSpaceBefore = /\s/.test(prevChar)
    const hasSpaceAfter = /\s/.test(nextChar)

    return !hasSpaceBefore && hasSpaceAfter
}
