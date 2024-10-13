import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NavItem = React.forwardRef(({ icon, text, onClick, isActive, buttonSize }, ref) => {
  return (
    <li>
      <button 
        onClick={onClick} 
        className={`flex items-center justify-center text-base group ${isActive ? 'text-neon-blue' : 'text-white'}`}
        style={{
          width: buttonSize.width ? `${buttonSize.width}px` : 'auto',
          height: buttonSize.height ? `${buttonSize.height}px` : 'auto',
          padding: '10px 13px', // Apply the extra padding to all buttons
        }}
      >
        <Image src={`/images/${icon}.svg`} alt={`${text} icon`} width={24} height={24} className="mr-2 transition-all duration-300 group-hover:filter group-hover:brightness-150" />
        <span className="group-hover:text-neon-blue transition-colors duration-300">{text}</span>
      </button>
    </li>
  )
})

NavItem.displayName = 'NavItem'

function Header({ setCurrentWall, currentWall }) {
  const [isOpen, setIsOpen] = useState(false)
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
    setIsOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 bg-primary bg-opacity-80 text-white w-full z-10">
      <div className="w-full mx-auto px-[3vw]">
        <div className="flex items-center justify-between h-[120px]">
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center justify-center h-[120px] ml-[3vw]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  src="/images/logo.png" 
                  alt="BUX DAO Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="120px"
                  className="z-0 filter blur-[2px] opacity-50 transition-all duration-300"
                />
              </div>
              <span className="relative z-10 text-3xl lg:text-4xl font-bold text-transparent bg-clip-text whitespace-nowrap" style={{
                WebkitTextStroke: '2px yellow',
                textStroke: '2px yellow'
              }}>
                BUX&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DAO
              </span>
            </div>
          </Link>
          <nav className="hidden md:block flex-grow">
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
          <div className="flex items-center">
            <button className="flex items-center justify-center text-base group bg-neon-pink text-white px-4 py-2 rounded hover:bg-neon-blue transition-colors duration-300">
              <Image src="/images/login.svg" alt="Login icon" width={24} height={24} className="mr-2" />
              <span>Login</span>
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <span className="material-icons">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-primary bg-opacity-80">
          <ul className="space-y-2 p-[3vw]">
            {navItems.map((item) => (
              <NavItem 
                key={item.text} 
                {...item} 
                onClick={() => handleNavClick(item.text)}
                isActive={currentWall === item.text}
                buttonSize={buttonSize}
              />
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
