export function once(fn: any) {
    let flag = true;
    return (...args: any) => {
        if(flag) {
            flag = false;
            fn.apply(null, args);
        }

    }
}
