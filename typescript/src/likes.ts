export const likes = (a : string[]) : string => {
    if (a.length === 0) {
        return 'no one likes this'
    } else if (a.length === 1) {
        return `${a[0]} likes this`
    }
    return `${a[0]} and ${a[1]} like this`
}
