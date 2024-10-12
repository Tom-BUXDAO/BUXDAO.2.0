import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'

function WalletConnection() {
  const { publicKey } = useWallet()

  return (
    <div className="absolute top-4 right-4">
      {publicKey ? (
        <p className="text-neon-green">Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}</p>
      ) : (
        <WalletMultiButton className="bg-neon-blue text-background hover:bg-neon-pink hover:text-text transition-all duration-300 shadow-neon-blue hover:shadow-neon-pink" />
      )}
    </div>
  )
}

export default WalletConnection