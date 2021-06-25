export function debounce(fn: any, delay: number) {
    let flag = true;
    return (...args: any) => {
        if(flag) {
            setTimeout(() => {flag = true}, delay)
            flag = false;
            fn.apply(null, args);
        }

    }
}
