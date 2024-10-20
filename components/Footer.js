import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Footer.module.css'

const NavItem = React.memo(({ icon, text, onClick, isActive, isMobilePortrait, isDesktop }) => {
  return (
    <li className={isMobilePortrait ? "px-1" : "px-2"}>
      <button 
        onClick={() => onClick(text)}
        className={`flex items-center justify-center text-base group transition-all duration-300
                    ${isActive ? 'text-yellow-400' : 'text-white hover:bg-neon-pink'}
                    ${isDesktop ? styles.desktopButton : ''}`}
        style={{
          padding: isMobilePortrait ? '5px' : (isDesktop ? '10px 12px' : '8px 10px'),
          backgroundColor: 'transparent',
        }}
      >
        <Image 
          src={`/images/${icon}.svg`} 
          alt={`${text} icon`} 
          width={isDesktop ? 28 : 24}
          height={isDesktop ? 28 : 24}
          className={`transition-all duration-300 ${
            isActive ? 'filter brightness-150 saturate-200' : 'group-hover:filter group-hover:brightness-150'
          }`}
        />
        {!isMobilePortrait && (
          <span className={`transition-colors duration-300 group-hover:text-white ml-2 ${isDesktop ? 'text-base' : 'text-sm'}`}>{text}</span>
        )}
      </button>
    </li>
  )
})

NavItem.displayName = 'NavItem'

const navItems = [
  { icon: 'home', text: 'Home' },
  { icon: 'bux', text: 'BUX' },
  { icon: 'nfts', text: 'NFTs' },
  { icon: 'poker', text: 'Poker' },
  { icon: 'spades', text: 'Spades' },
  { icon: 'shop', text: 'Shop' },
]

function Footer({ currentWall, setCurrentWall }) {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsMobilePortrait(window.innerHeight > window.innerWidth && window.innerWidth < 768);
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const handleNavClick = useCallback((wall) => {
    console.log('Nav clicked:', wall);
    setCurrentWall(wall);
  }, [setCurrentWall]);

  return (
    <footer className={`${styles.footer} ${isMobilePortrait ? styles.footerMobilePortrait : ''} bg-primary bg-opacity-80`}>
      <div className={`${styles.footerContent} w-full mx-auto px-[3vw]`}>
        <nav className="w-full">
          <ul className={`flex ${isMobilePortrait ? 'justify-around' : 'justify-center space-x-2'} items-center`}>
            {navItems.map((item) => (
              <NavItem 
                key={item.text} 
                {...item} 
                onClick={handleNavClick}
                isActive={currentWall === item.text}
                isMobilePortrait={isMobilePortrait}
                isDesktop={isDesktop}
              />
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
