import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 bg-primary bg-opacity-80 text-white w-full z-10">
      <div className="w-full mx-auto px-[3vw]">
        <div className="flex items-center justify-between h-[120px]">
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center justify-center h-[120px] ml-[3vw]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  key="logo-image"
                  src="/images/logo.png" 
                  alt="BUX DAO Logo" 
                  fill
                  priority
                  style={{ objectFit: 'contain' }}
                  sizes="120px"
                  className="z-0 filter blur-[2px] opacity-50 transition-all duration-300"
                />
              </div>
              <span 
                className="relative z-10 text-3xl lg:text-4xl font-bold text-transparent bg-clip-text whitespace-nowrap" 
                style={{
                  WebkitTextStroke: '2px yellow',
                }}
              >
                BUX&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DAO
              </span>
            </div>
          </Link>
          <div className="flex items-center">
            <button className="flex items-center justify-center text-base group bg-neon-pink text-white px-4 py-2 rounded hover:bg-neon-blue transition-colors duration-300">
              <Image src="/images/login.svg" alt="Login icon" width={24} height={24} className="mr-2" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
