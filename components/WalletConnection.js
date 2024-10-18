import { useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import styles from './Header.module.css'

function WalletConnection() {
  const { publicKey, connected, connect, disconnect } = useWallet()

  const handleClick = () => {
    if (connected) {
      disconnect()
    } else {
      connect()
    }
  }

  return (
    <div className="flex flex-col items-end justify-center h-full">
      <button
        onClick={handleClick}
        className="flex items-center justify-center text-lg group bg-neon-pink text-white hover:bg-neon-blue transition-all duration-300"
        style={{
          width: 'auto',
          height: 'auto',
          padding: '12px 20px',
        }}
      >
        <Image 
          src="/images/login.svg" 
          alt="Login icon" 
          width={28}
          height={28}
          className="mr-3 transition-all duration-300 group-hover:filter group-hover:brightness-150"
        />
        <span className="group-hover:text-white transition-colors duration-300 font-semibold">{connected ? 'Disconnect' : 'Login'}</span>
      </button>
      {connected && publicKey && (
        <p className="text-neon-green mt-2 text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
          Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
        </p>
      )}
    </div>
  )
}

export default WalletConnection
