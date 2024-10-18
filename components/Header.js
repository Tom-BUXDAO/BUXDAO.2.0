import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.css'
import WalletConnection from './WalletConnection'

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-primary bg-opacity-80 text-white w-full z-10">
      <div className="w-full mx-auto px-[3vw]">
        <div className="flex items-center justify-between h-[120px]">
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center justify-center h-[120px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  key="logo-image"
                  src="/images/logo.png" 
                  alt="BUX DAO Logo" 
                  width={100}
                  height={100}
                  priority
                  className="z-0 filter blur-[2px] opacity-50 transition-all duration-300"
                />
              </div>
              <span 
                className="relative z-10 text-5xl lg:text-6xl font-black text-transparent bg-clip-text whitespace-nowrap font-poppins" 
                style={{
                  WebkitTextStroke: '3px yellow',
                }}
              >
                BUX&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DAO
              </span>
            </div>
          </Link>
          <WalletConnection />
        </div>
      </div>
    </header>
  )
}

export default Header
