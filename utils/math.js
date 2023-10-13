export function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

export function roundXDec(number, dec) {
    return Math.round(number * Math.pow(10, dec)) / Math.pow(10, dec);
}

export function round3Dec(number) {
    return Math.round(number * 1000) / 1000;
}

export function toRadians(angle) {
    return angle * (Math.PI / 180);
}
  