/**
 * 数字保留小数位
 * @param value 数字
 * @param num 保留的小数位
 * @param isRound 是否需要四舍五入
 * @return 返回数字
 * @throws 无法转换为数字
 * @throws isRound不是boolean
 * @example
 * 不进行四舍五入
 * ```ts
 * toFixed(1.238, 2, false) // 1.23
 * ```
 */
export function toFixed (value: number, num = 2, isRound = true): number {
    const toNumber = Number(value)
    if (isNaN(num)) {
        throw `${toNumber}无法转换为数字`
    }
    if (!!isRound) { return parseFloat(toNumber.toFixed(num)) }
    return parseFloat(toNumber.toFixed(num + 1).slice(0, -1))
}

/**
 * 均衡获取指定范围的随机整数
 * @param min 范围最小整数
 * @param max 范围最大整数
 * @return 随机整数
 * @category 工具Util
 * @example
 * 均衡获取0或者1的数
 * ```ts
 * getRandom()
 * ```
 * @example
 * 均衡获取1或者10的数
 * ```ts
 * getRandom(1, 10)
 * ```
 */
export function getRandomNumber (min = 0, max = 1): number {
    return Math.round(Math.random() * (max - min) + min)
}

