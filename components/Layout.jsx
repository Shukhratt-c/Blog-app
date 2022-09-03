import React from 'react'
import Head from 'next/head'
import { Navbar, Footer } from "./"



const Layout = ( {children} ) => {
  return (

    <div>
        <>
          <Head>
            <title>Shukhratt | Blog</title>
            <link rel="icon" href="/Shan_Icon.ico" />
          </Head>
            <Navbar />
            
              {children}

            <Footer />
        </>
    </div>
  )
}

export default Layout