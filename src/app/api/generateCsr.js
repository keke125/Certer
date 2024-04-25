import * as pkijs from "pkijs";
import * as asn1js from "asn1js";

export default async (keyPair, commonName, country, locality, state, organization, hashAlg) => {
    // Get a "crypto" extension
    const crypto = pkijs.getCrypto(true);

    const pkcs10 = new pkijs.CertificationRequest();

    let hash = "SHA-256";
    if (hashAlg === "SHA-384") {
        hash = "SHA-384";
    } else if (hashAlg === "SHA-512") {
        hash = "SHA-512";
    }

    pkcs10.subject.typesAndValues.push(
        new pkijs.AttributeTypeAndValue({
            type: "2.5.4.3",
            value: new asn1js.Utf8String({value: commonName}),
        },),
        new pkijs.AttributeTypeAndValue({
            type: "2.5.4.10",
            value: new asn1js.Utf8String({value: organization}),
        }),
        new pkijs.AttributeTypeAndValue({
            type: "2.5.4.7",
            value: new asn1js.Utf8String({value: locality}),
        }), new pkijs.AttributeTypeAndValue({
            type: "2.5.4.8",
            value: new asn1js.Utf8String({value: state}),
        }),
        new pkijs.AttributeTypeAndValue({
                type: "2.5.4.6",
                value: new asn1js.Utf8String({value: country})
            }
        ));

    await pkcs10.subjectPublicKeyInfo.importKey(keyPair.publicKey);

    pkcs10.attributes = [];

    // Subject Alternative Name
    const altNames = new pkijs.GeneralNames({
        names: [
            new pkijs.GeneralName({
                // domain
                type: 2,
                value: commonName,
            }),
        ],
    });


    // SubjectKeyIdentifier
    const subjectKeyIdentifier = await crypto.digest(
        {name: "SHA-1"},
        pkcs10.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex
    );


    pkcs10.attributes.push(
        new pkijs.Attribute({
            type: "1.2.840.113549.1.9.14", // pkcs-9-at-extensionRequest
            values: [
                new pkijs.Extensions({
                    extensions: [
                        new pkijs.Extension({
                            extnID: "2.5.29.14", // id-ce-subjectKeyIdentifier
                            critical: false,
                            extnValue: new asn1js.OctetString({
                                valueHex: subjectKeyIdentifier,
                            }).toBER(false),
                        }),
                        new pkijs.Extension({
                            extnID: "2.5.29.17", // id-ce-subjectAltName
                            critical: false,
                            extnValue: altNames.toSchema().toBER(false),
                        }),/*
                        new pkijs.Extension({
                            extnID: "1.2.840.113549.1.9.7", // pkcs-9-at-challengePassword
                            critical: false,
                            extnValue: new asn1js.PrintableString({
                                value: "passwordChallenge",
                            }).toBER(false),
                        }),*/
                    ],
                }).toSchema(),
            ],
        })
    );

    // Signing final PKCS#10 request
    await pkcs10.sign(keyPair.privateKey, hash);

    return pkcs10.toSchema(true).toBER();
};
