import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {Button} from "@mui/material";
import {useEffect} from "react";
import {useCookies} from "next-client-cookies";


export default function DataForm() {
    const [csrAlg, setCsrAlg] = React.useState("RSA");
    const [csrKeyLength, setCsrKeyLength] = React.useState("2048");
    const [commonName, setCommonName] = React.useState("");
    const [organization, setOrganization] = React.useState("");
    const [locality, setLocality] = React.useState("");
    const [state, setState] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [isFormValid, setIsFormValid] = React.useState(false);
    const [hashAlg, setHashAlg] = React.useState("SHA-256");
    const cookieStore = useCookies();

    useEffect(() => {
        if (cookieStore.get("commonName") !== null) {
            setCommonName(cookieStore.get("commonName"));
        }
        if (cookieStore.get("organization") !== null) {
            setOrganization(cookieStore.get("organization"));
        }
        if (cookieStore.get("locality") !== null) {
            setLocality(cookieStore.get("locality"));
        }
        if (cookieStore.get("state") !== null) {
            setState(cookieStore.get("state"));
        }
        if (cookieStore.get("country") !== null) {
            setCountry(cookieStore.get("country"));
        }

        if (cookieStore.get("csrAlg") !== undefined) {
            setCsrAlg(cookieStore.get("csrAlg"));
        } else {
            cookieStore.set("csrAlg", "RSA");
            setCsrAlg("RSA");
        }
        if (cookieStore.get("csrKeyLength") !== undefined) {
            setCsrKeyLength(cookieStore.get("csrKeyLength"));
        } else {
            cookieStore.set("csrKeyLength", "2048");
            setCsrKeyLength("2048");
        }
        if (cookieStore.get("hashAlg") !== undefined) {
            setHashAlg(cookieStore.get("hashAlg"));
        } else {
            cookieStore.set("hashAlg", "SHA-256");
            setHashAlg("SHA-256");
        }
    }, []);

    useEffect(() => {
        validateForm();
    }, [commonName, organization, locality, state, country]);

    const validateForm = () => {
        let errors = {};

        if (!commonName) {
            errors.commonName = "commonName is required.";
        } else if (!organization) {
            errors.organization = "organization is required.";
        } else if (!locality) {
            errors.locality = "locality is required.";
        } else if (!state) {
            errors.state = "state is required.";
        } else if (!country) {
            errors.country = "country is required.";
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
        cookieStore.set("isFormValid", Object.keys(errors).length === 0);
    };

    const handleCsrAlgChange = (event) => {
        if (event.target.value === "RSA") {
            setCsrKeyLength("2048");
            cookieStore.set("csrKeyLength", "2048");
        } else {
            setCsrKeyLength("P-256");
            cookieStore.set("csrKeyLength", "P-256");
        }
        setCsrAlg(event.target.value);
        cookieStore.set("csrAlg", event.target.value);
    };

    const handleCsrKeyLengthChange = (event) => {
        setCsrKeyLength(event.target.value);
        cookieStore.set("csrKeyLength", event.target.value.toString());
    };

    const handleHashAlgChange = (event) => {
        setHashAlg(event.target.value);
        cookieStore.set("hashAlg", event.target.value);
    }

    const clearData = () => {
        cookieStore.set("state", "");
        cookieStore.set("organization", "");
        cookieStore.set("locality", "");
        cookieStore.set("country", "");
        cookieStore.set("commonName", "");
        cookieStore.set("csrAlg", "RSA");
        cookieStore.set("csrKeyLength", "2048");
        cookieStore.set("hashAlg", "SHA-256");
        window.location.reload();
    };
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                憑證資訊
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="CommonName"
                        name="CommonName"
                        label="主要網域(CN)"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setCommonName(e.target.value);
                            cookieStore.set("commonName", e.target.value);
                        }}
                        value={commonName}
                        error={commonName === ""}
                        helperText={commonName === "" ? '請填入主要網域(CN)' : ' '}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="organization"
                        name="organization"
                        label="組織名稱(O)"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setOrganization(e.target.value);
                            cookieStore.set("organization", e.target.value);
                        }}
                        value={organization}
                        error={organization === ""}
                        helperText={organization === "" ? '請填入組織名稱(O)' : ' '}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="locality"
                        name="locality"
                        label="地區(L)"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setLocality(e.target.value);
                            cookieStore.set("locality", e.target.value);
                        }}
                        value={locality}
                        error={locality === ""}
                        helperText={locality === "" ? '請填入地區(L)' : ' '}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="state"
                        name="state"
                        label="州、省(ST)"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setState(e.target.value);
                            cookieStore.set("state", e.target.value);
                        }}
                        value={state}
                        error={state === ""}
                        helperText={state === "" ? '請填入州、省(ST)' : ' '}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="國家(C)"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setCountry(e.target.value);
                            cookieStore.set("country", e.target.value);
                        }}
                        value={country}
                        error={country === ""}
                        helperText={country === "" ? '請填入國家(C)' : ' '}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="csr-label">金鑰長度</InputLabel>
                    <Select
                        required
                        labelId="csr-label"
                        id="csr-alg"
                        value={csrAlg}
                        onChange={handleCsrAlgChange}
                    >
                        <MenuItem value={"RSA"}>RSA</MenuItem>
                        <MenuItem value={"ECC"}>ECC</MenuItem>
                    </Select>
                    <Select
                        required
                        labelId="csr-label"
                        id="csr-key-length"
                        value={csrKeyLength}
                        onChange={handleCsrKeyLengthChange}
                    >
                        <MenuItem value={"2048"} disabled={csrAlg !== "RSA"}>
                            2048
                        </MenuItem>
                        <MenuItem value={"3072"} disabled={csrAlg !== "RSA"}>
                            3072
                        </MenuItem>
                        <MenuItem value={"4096"} disabled={csrAlg !== "RSA"}>
                            4096
                        </MenuItem>
                        <MenuItem value={"P-256"} disabled={csrAlg !== "ECC"}>
                            256
                        </MenuItem>
                        <MenuItem value={"P-384"} disabled={csrAlg !== "ECC"}>
                            384
                        </MenuItem>
                        <MenuItem value={"P-521"} disabled={csrAlg !== "ECC"}>
                            521
                        </MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="hash-label">雜湊演算法</InputLabel>
                    <Select
                        required
                        labelId="hash-label"
                        id="hash-alg"
                        value={hashAlg}
                        onChange={handleHashAlgChange}
                    >
                        <MenuItem value={"SHA-256"}>
                            SHA256
                        </MenuItem>
                        <MenuItem value={"SHA-384"} disabled={csrAlg !== "ECC"}>
                            SHA384
                        </MenuItem>
                        <MenuItem value={"SHA-512"} disabled={csrAlg !== "ECC"}>
                            SHA512
                        </MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" color="warning" onClick={clearData}>
                        清除資料
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
