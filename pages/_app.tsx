import type { AppProps } from 'next/app';
import React, { StrictMode } from "react";
import { Layout } from "../components";
import '../styles/globals.scss';
import "../styles/prism-dracula.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (

      <React.Fragment>
        <StrictMode>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StrictMode>
      </React.Fragment>
    )
  }

export default MyApp
