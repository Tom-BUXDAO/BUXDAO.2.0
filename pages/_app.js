import '../styles/globals.css'
import '../styles/index.css'
import '../styles/text-adjust.css'
import '../styles/vr-warehouse.css'
import Layout from '../components/Layout'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

function MyApp({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = clusterApiUrl(network)
  const wallets = [new PhantomWalletAdapter()]

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletProvider>
  )
}

export default MyApp
