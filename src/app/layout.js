import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata = {
  title: "Certer",
  description: "Certer",
};

export default function RootLayout(props) {
  return (
    <CookiesProvider>
      <html lang="zh-Hant-TW">
        <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </CookiesProvider>
  );
}
