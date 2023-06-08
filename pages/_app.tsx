import 'styles/globals.css'
import type { AppProps } from 'next/app'

import '@rainbow-me/rainbowkit/styles.css'
import 'react-json-view-lite/dist/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}
