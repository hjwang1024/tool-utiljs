import { getRandomNumber, toFixed } from '../Number'
import { getType } from '../Type'
/**
 * 随机生成16进制色值
 * @returns 字符串
 * @category 颜色Color
 * @example
 * ```ts
 * randomHex() // => '#cf65dd'
 * ```
 */
export function randomHex (): string {
    const hexs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    let hex = '#'
    for (let i = 0; i < 6; i++) {
        hex += hexs[getRandomNumber(0, 15)]
    }
    return hex
}

/**
   * 随机生成RGBA色值
   * @returns 字符串
   * @category 颜色Color
   * @example
   * ```ts
   * randomRgba() // => '#cf65dd'
   * ```
   */
export function randomRgba (): string {
    return `${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${toFixed(getRandomNumber(0, 100) / 100)}`
}

/**
 * 判断是否是16进制hex色值
 * @param hex 字符串
 * @returns true | false
 * @category 颜色Color
 * @example
 * ```ts
 * isHex('#aabbcc') // => true
 * ```
 * @example
 * // 支持3位
 * ```ts
 * isHex('#abc') // => true
 * ```
 * @example
 * // 支持透明度
 * ```ts
 * isHex('#aabbcc8d') // => true
 * ```
 * @example
 * // 支持透明度
 * ```ts
 * isHex('#df') // => false
 * ```
 * @example
 * // 支持透明度
 * ```ts
 * isHex('#adg') // => false
 * ```
 */
export function isHex (hex: string): boolean {
    if (hex && getType(hex) !== 'string') { return false }
    return /#(([0-9a-f]{3})|([0-9a-f]{4})|([0-9a-f]{6})|([0-9a-f]{8}))$/gi.test(hex)
}
/**
 * 判断是否是16进制hex色值
 * @param rgba 字符串
 * @returns true | false
 * @category 颜色Color
 * @example
 * ```ts
 * isRgba('170,187,255') // => true
 * ```
 * @example
 * // 支持透明度
 * ```ts
 * isRgba('170,187,255,0.91') // => true
 * ```
 * @example
 * // 支持透明度
 * ```ts
 * isRgba('170,187,266,0.91') // => false
 * ```
 * @example
 * // 支持透明度
 * ```ts
 * isRgba('170,187,256,2') // => false
 * ```
 */
export function isRgba (rgba: string): boolean {
    if (rgba && getType(rgba) !== 'string') { return false }
    return rgba.split(',').every((s, i) => {
        if (i === 3) { return Number(s) * 255 >= 0 && Number(s) * 255 <= 255 }
        return Number(s) >= 0 && Number(s) <= 255
    })
}

/**
 * 将3(4)位16进制色值转为6(8)位
 * @param hex 字符串
 * @returns 6位hex
 * @throws 无法识别正确的hex hex参数不是正确的hex时触发
 * @category 颜色Color
 * @example
 * ```ts
 * extendHex('#03f') // => '#0033ff'
 * ```
 * @example
 * ```ts
 * extendHex('#03ff') // => '#0033ffff'
 * ```
 */
export function extendHex (hex: string): string {
    if (!isHex(hex)) { throw '无法识别正确的hex' }
    if (hex.length > 6) { return hex }
    return `#${hex
        .substring(1)
        .split('')
        .map(item => item += item)
        .join('')}`
}
/**
 * 将16进制hex色值转为rgb(a)色值
 * @param hex 字符串
 * @returns 字符串
 * @throws 无法识别正确的hex hex参数不是正确的hex时触发
 * @category 颜色Color
 * @example
 * ```ts
 * hexToRgb('#aabbcc') // => '170,187,204'
 * ```
 * @example
 * // 支持透明度
 * ```ts
 * hexToRgb('#aabbcc8d') // => '170,187,204,0.55'
 * ```
 */
export function hexToRgb (hex: string): string {
    if (!isHex(hex)) { throw '无法识别正确的hex' }
    let _hex = hex.substring(1)
    if (_hex.length < 6) { _hex = extendHex(hex).substring(1) }
    _hex = (_hex.match(/[0-9a-f]{2}/gi) || [])
        .map((s, i) => i === 3 ? toFixed(parseInt(s, 16) / 255) : parseInt(s, 16))
        .join(',')
    return _hex
}

/**
 * 将rgb(a)色值转为16进制hex色值
 * @param rgba 字符串
 * @returns 字符串
 * @throws 无法识别正确的rgba rgba参数不是正确的hex时触发
 * @category 颜色Color
 * @example
 * ```ts
 * rgbToHex('170,187,255') // => '#aabbff'
 * ```
 * @example
 * // 支持透明度
 * ```ts
 * rgbToHex('170,187,255,0.91') // => '#aabbffe8'
 * ```
 */
export function rgbToHex (rgba: string): string {
    if (!isRgba(rgba)) { throw '无法识别正确的rgba' }
    return (
        '#' +
      rgba
          .split(',')
          .map((s, i) => {
              if (i === 3) {
                  return Math.round(Number(s) * 255)
                      .toString(16)
                      .padStart(2, '0')
              }
              return Number(s).toString(16).padStart(2, '0')
          })
          .join('')
    )
}
