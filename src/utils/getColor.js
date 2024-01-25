/* eslint-disable */
function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i+=1) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i) {
    const c = (i & 0x00AFBABC)
        .toString(16)
        .toUpperCase()
        .padStart(6, '0');
    return `#${c}`;
}

function getColor(id) {
    const hash = stringToHash(id);
    return intToRGB(hash);
}


export default getColor;