"use client"

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import DataForm from './DataForm';
import GetKeyAndCsr from './GetKeyAndCsr';
import {useCookies} from "next-client-cookies";
import exportCsr from "@/app/api/exportCsrAndKey";
import Grid from "@mui/material/Grid";

function Copyright() {
    return (<Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://certer.keke125.com">
            Certer
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>);
}

const steps = ['填寫資料', '確認資料', '下載CSR及金鑰'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <DataForm/>;
        case 1:
            return <GetKeyAndCsr/>;
        default:
            throw new Error('錯誤');
    }
}

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const cookieStore = useCookies();
    const isEcc = cookieStore.get("csrAlg") === "ECC";
    const commonName = cookieStore.get("commonName");
    const organization = cookieStore.get("organization");
    const locality = cookieStore.get("locality");
    const state = cookieStore.get("state");
    const country = cookieStore.get("country");
    const keyLength = cookieStore.get("csrKeyLength");
    const hashAlg = cookieStore.get("hashAlg");

    const handleNext = () => {
        if (cookieStore.get("isFormValid") === "true") {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (<React.Fragment>
        <CssBaseline/>
        <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
                position: 'relative',
            }}
        >
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Certer
                </Typography>
            </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm" sx={{mb: 4}}>
            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                <Typography component="h1" variant="h4" align="center">
                    製作憑證請求檔(csr)
                </Typography>
                <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                    {steps.map((label) => (<Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>))}
                </Stepper>
                {activeStep === steps.length - 1 ? (<React.Fragment>
                    <Typography variant="h5" gutterBottom>
                        CSR及私鑰已產製完成
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Button variant="contained"
                                    onClick={() => exportCsr(isEcc, keyLength, commonName, country, locality, state, organization, hashAlg)}>下載CSR及私鑰</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">如需繼續申請新的csr，請重新整理頁面</Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>) : (<React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        {activeStep !== 0 && (<Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                            返回
                        </Button>)}

                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{mt: 3, ml: 1}}
                        >
                            {activeStep === steps.length - 1 ? '確認申請' : '下一步'}
                        </Button>
                    </Box>
                </React.Fragment>)}
            </Paper>
            <Copyright/>
        </Container>
    </React.Fragment>);
}
