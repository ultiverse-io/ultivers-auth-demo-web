import Head from 'next/head'
import dynamic from 'next/dynamic'

const Page = dynamic(()=> import('components/page'), { ssr: false })

function App() {

  return (
    <>
      <Head>
        <title>Demo | Ultiverse</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={`Built on Unreal Engine 5, Ultiverse brings AAA-gaming to blockchain with an immersive social virtual world and native Web3 technology to usher in the future of the metaverse.`}
        />
      </Head>
      <Page />
    </>
  )
}

export default App
