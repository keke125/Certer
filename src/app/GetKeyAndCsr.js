import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {useCookies} from "next-client-cookies";


export default function GetKeyAndCsr() {
    const cookieStore = useCookies();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                確認資料
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography>主要網域(CN): {cookieStore.get("commonName")}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>組織名稱(O): {cookieStore.get("organization")}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>地區(L): {cookieStore.get("locality")}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>州、省(ST): {cookieStore.get("state")}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>國家(C): {cookieStore.get("country")}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        金鑰長度: {cookieStore.get("csrAlg")} {cookieStore.get("csrKeyLength")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        雜湊演算法: {cookieStore.get("hashAlg")}
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
