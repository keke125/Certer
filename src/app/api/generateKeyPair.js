export default async (isEcc, keyLength) => {
  if (isEcc) {
    let eccKeyLength = "P-256";
    if (keyLength === "P-384") {
      eccKeyLength = "P-384";
    } else if (keyLength === "P-521") {
      eccKeyLength = "P-521";
    }
      return window.crypto.subtle.generateKey(
        {
            name: "ECDSA",
            namedCurve: eccKeyLength,
        },
        true,
        ["sign", "verify"],
    );
  } else {
    let rsaKeyLength = 2048;
    if (keyLength === "3072") {
      rsaKeyLength = 3072;
    } else if (keyLength === "4096") {
      rsaKeyLength = 4096;
    }

    return window.crypto.subtle.generateKey(
        {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: rsaKeyLength,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["sign", "verify"],
    );
  }
};
