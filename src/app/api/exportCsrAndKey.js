"use client"

import generateKeyPair from "./generateKeyPair";
import generateCsr from "./generateCsr";
import * as pkijs from "pkijs";
import exportCryptoKey from "./exportKey";
import JSZip from "jszip";

export default async (isEcc, keyLength, commonName, country, locality, state, organization, hashAlg) => {

    try {
        const rawKey = await generateKeyPair(
            isEcc,
            keyLength
        );
        const csrRaw = await generateCsr(rawKey, commonName, country, locality, state, organization, hashAlg);
        const csr = pkijs.CertificationRequest.fromBER(csrRaw);
        const csrText = `-----BEGIN CERTIFICATE REQUEST-----\n${
            csr.toString("base64")
        }\n-----END CERTIFICATE REQUEST-----`
        const FileSaver = require('file-saver');
        var JSZip = require("jszip");
        const zip = new JSZip();
        const csrZip = zip.folder("csr");
        const csrBlob = new Blob([csrText], {type: "application/pkcs10"});
        csrZip.file({commonName}.commonName + ".csr", csrBlob);
        exportCryptoKey(isEcc, rawKey.privateKey).then((res) => {
            const keyBlob = new Blob([res], {type: "application/pkcs8"});
            csrZip.file({commonName}.commonName + ".key", keyBlob);
            // generate zip with key and csr
            zip.generateAsync({type: "blob"}).then(function (content) {
                FileSaver.saveAs(content, {commonName}.commonName + ".zip");
            });
        });
    } catch (e) {
        console.log(e.message);
    }
};