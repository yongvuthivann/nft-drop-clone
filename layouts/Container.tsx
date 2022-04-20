import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface Props {
    children: React.ReactNode
}

function Container({children}: Props) {
  return (
    <>
        <Head>
          <title>NTF Drop</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="min-h-screen bg-white dark:bg-black">
        <div className="to-blue-400[0.35] dark:to-blue-400[0.25] bg-gradient-to-tr from-purple-400/[0.35] dark:from-purple-400/[0.15]">
          <div className="mx-auto flex min-h-screen max-w-7xl flex-col p-8">
          <header className="">
              <Link href="/">
                <h1 className="cursor-pointer font-poppins text-sm font-extralight uppercase tracking-wider text-purple-800/75 dark:text-purple-300/50 md:text-xl">
                  The Best{' '}
                  <span className="font-medium text-purple-800 dark:text-purple-400">
                    NFTS
                  </span>
                </h1>
              </Link>
              </header>
            {children}
          </div>

        </div>
      </div>
    </>
  )
}

export default Container