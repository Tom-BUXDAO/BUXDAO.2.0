import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './Footer.module.css'

const NavItem = React.forwardRef(({ icon, text, onClick, isActive, buttonSize }, ref) => {
  return (
    <li>
      <button 
        onClick={onClick} 
        className={`flex items-center justify-center text-base group ${isActive ? 'text-neon-blue' : 'text-white'}`}
        style={{
          width: buttonSize.width ? `${buttonSize.width}px` : 'auto',
          height: buttonSize.height ? `${buttonSize.height}px` : 'auto',
          padding: '10px 13px',
        }}
      >
        <Image src={`/images/${icon}.svg`} alt={`${text} icon`} width={24} height={24} className="mr-2 transition-all duration-300 group-hover:filter group-hover:brightness-150" />
        <span className="group-hover:text-neon-blue transition-colors duration-300">{text}</span>
      </button>
    </li>
  )
})

NavItem.displayName = 'NavItem'

function Footer({ currentWall, setCurrentWall }) {
  const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 });
  const spadesButtonRef = useRef(null);

  const navItems = [
    { icon: 'home', text: 'Home' },
    { icon: 'bux', text: 'BUX' },
    { icon: 'nfts', text: 'NFTs' },
    { icon: 'poker', text: 'Poker' },
    { icon: 'spades', text: 'Spades' },
    { icon: 'shop', text: 'Shop' },
  ]

  useEffect(() => {
    if (spadesButtonRef.current) {
      const { offsetWidth, offsetHeight } = spadesButtonRef.current;
      setButtonSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleNavClick = (wall) => {
    console.log('Nav clicked:', wall);
    setCurrentWall(wall);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-primary bg-opacity-80 text-white w-full z-10">
      <div className="w-full mx-auto px-[3vw]">
        <div className="flex items-center justify-center h-[120px]">
          <nav>
            <ul className="flex justify-center space-x-4">
              {navItems.map((item) => (
                <NavItem 
                  key={item.text} 
                  {...item} 
                  onClick={() => handleNavClick(item.text)}
                  isActive={currentWall === item.text}
                  buttonSize={buttonSize}
                  ref={item.text === 'Spades' ? spadesButtonRef : null}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
