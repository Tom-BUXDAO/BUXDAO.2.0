import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.css'

function Header() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 bg-primary bg-opacity-80 text-white w-full z-10 ${styles.header} ${isPortrait ? styles.headerPortrait : ''}`}>
      <div className="w-full mx-auto px-[3vw]">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center">
            <div className={`relative flex items-center justify-center ${styles.logoContainer}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  key="logo-image"
                  src="/images/logo.png" 
                  alt="BUX DAO Logo" 
                  width={isPortrait ? 60 : 100}
                  height={isPortrait ? 60 : 100}
                  priority
                  className={`z-0 filter blur-[2px] transition-all duration-300 ${styles.logoImage}`}
                />
              </div>
              <span 
                className={`relative z-10 font-black text-transparent bg-clip-text whitespace-nowrap font-poppins ${styles.logoText}`}
              >
                BUX&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DAO
              </span>
            </div>
          </Link>
          <button className={`bg-neon-pink text-white hover:bg-neon-blue active:bg-neon-blue transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl active:shadow-xl flex items-center justify-center ${styles.loginButton}`}>
            <Image 
              src="/images/login.svg"
              alt="Login"
              width={isPortrait ? 20 : 28}
              height={isPortrait ? 20 : 28}
              className={`mr-2 ${styles.loginIcon}`}
            />
            <span className={styles.loginText}>Login</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
