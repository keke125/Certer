/*
Convert an ArrayBuffer into a string
from https://developer.chrome.com/blog/how-to-convert-arraybuffer-to-and-from-string/
*/
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

/*
Export the given key and convert to base64 string.
*/
export default async (isEcc, key) => {
    const exported = await window.crypto.subtle.exportKey("pkcs8", key);
    const exportedAsString = ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    if (isEcc) {
        return `-----BEGIN EC PRIVATE KEY-----\n${exportedAsBase64}\n-----END EC PRIVATE KEY-----`;
    } else {
        return `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
    }
}