import '../styles/globals.scss'
import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (

      <React.Fragment>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </React.Fragment>
    )
  }

export default MyApp
