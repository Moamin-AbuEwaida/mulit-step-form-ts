import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { AppBar, Box, Container, CssBaseline, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { theme } from '../theme';
import Head from 'next/head';


function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Multi-Step Form</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h6">Multi-Step Form</Typography>
          </Toolbar>
        </AppBar>

        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container>
          <Box marginTop={10}>
            <Component {...pageProps} />
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
  // <Component {...pageProps} />
}

export default MyApp
