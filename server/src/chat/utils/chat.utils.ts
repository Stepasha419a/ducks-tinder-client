export const parseUrl = (url: string) => {
    const newStr = url.slice(url.indexOf('=') + 1)
    
    return newStr.slice(0, newStr.indexOf('&'))
}