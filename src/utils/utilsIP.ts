export function compareIp(ip1: string, ip2: string): number {
    const a = toBytes(ip1);
    const b = toBytes(ip2);
    for (let i = 0; i < 4; i++) {
        if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
}

export function maskToCidr(mask: string): number {
    return mask
        .split('.')
        .map(Number)
        .map(n => n.toString(2))
        .join('')
        .split('1').length - 1;
}

const toBytes = (ip: string) => ip.split('.').map(Number);
