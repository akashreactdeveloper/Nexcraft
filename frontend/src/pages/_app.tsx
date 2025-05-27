// src/pages/_app.tsx
import '../globals.css'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import DefaultLayout from '@/components/layout/DefaultLayout'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)
  return getLayout(<Component {...pageProps} />)
}
