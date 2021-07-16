/// [String source]
/// [int? radix] range 2..64
/// [return int?]
export default function intParse(source, radix = 10) {
    if(/\D/.test(source))
        throw new Error(`The parameter [source] only accepts int type String`)
    if(/\s/.test(source))
        throw new Error(`The parameter [source] no whitespace characters`)

    if(radix >= 2 && radix <= 32)
        return Number.parseInt(source, radix)
    else if(radix >= 33 && radix <= 64) 
        /// 做不出来。。
        return null
    else
        return null
}