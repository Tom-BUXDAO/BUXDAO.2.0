import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Footer.module.css'

const NavItem = React.memo(({ icon, text, onClick, isActive, isLandscape }) => {
  return (
    <li className="px-1">
      <button 
        onClick={() => onClick(text)}
        className={`flex flex-row items-center justify-center text-base group transition-all duration-300
                    ${isActive ? 'text-yellow-400' : 'text-white hover:bg-neon-pink'}`}
        style={{
          padding: isLandscape ? '5px 6px' : '8px 10px',
          backgroundColor: 'transparent',
        }}
      >
        <Image 
          src={`/images/${icon}.svg`} 
          alt={`${text} icon`} 
          width={isLandscape ? 18 : 24}
          height={isLandscape ? 18 : 24}
          className={`mr-1 transition-all duration-300 ${
            isActive ? 'filter brightness-150 saturate-200' : 'group-hover:filter group-hover:brightness-150'
          }`}
        />
        <span className={`transition-colors duration-300 group-hover:text-white ${isLandscape ? 'text-xs' : 'text-sm'}`}>{text}</span>
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
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerHeight <= 500 && window.innerWidth > window.innerHeight);
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
    <footer className={`${styles.footer} bg-primary bg-opacity-80`}>
      <div className={`${styles.footerContent} w-full mx-auto px-[3vw]`}>
        <nav className="w-full">
          <ul className="flex justify-center items-center space-x-2">
            {navItems.map((item) => (
              <NavItem 
                key={item.text} 
                {...item} 
                onClick={handleNavClick}
                isActive={currentWall === item.text}
                isLandscape={isLandscape}
              />
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
