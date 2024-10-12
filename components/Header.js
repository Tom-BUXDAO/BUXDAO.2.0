import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

function NavItem({ icon, text, onClick, isActive }) {
  return (
    <li>
      <button 
        onClick={onClick} 
        className={`flex items-center text-sm group ${isActive ? 'text-neon-blue' : 'text-white'}`}
      >
        <Image src={`/images/${icon}.svg`} alt={`${text} icon`} width={20} height={20} className="mr-1 transition-all duration-300 group-hover:filter group-hover:brightness-150" />
        <span className="group-hover:text-neon-blue transition-colors duration-300">{text}</span>
      </button>
    </li>
  )
}

function Header({ setCurrentWall, currentWall }) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { icon: 'home', text: 'Home' },
    { icon: 'bux', text: 'BUX' },
    { icon: 'nfts', text: 'NFTs' },
    { icon: 'poker', text: 'Poker' },
    { icon: 'spades', text: 'Spades' },
    { icon: 'shop', text: 'Shop' },
  ]

  const handleNavClick = (wall) => {
    console.log('Nav clicked:', wall);
    setCurrentWall(wall);
    setIsOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 bg-primary bg-opacity-80 text-white h-[120px] w-full flex items-center z-10">
      <div className="w-full px-4 md:px-8 flex items-center justify-between h-full">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="BUX DAO Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold">BUX DAO</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <NavItem 
                key={item.text} 
                {...item} 
                onClick={() => handleNavClick(item.text)}
                isActive={currentWall === item.text}
              />
            ))}
          </ul>
        </nav>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <span className="material-icons">{isOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden absolute top-[120px] left-0 right-0 bg-primary bg-opacity-80">
          <ul className="space-y-2 p-4">
            {navItems.map((item) => (
              <NavItem 
                key={item.text} 
                {...item} 
                onClick={() => handleNavClick(item.text)}
                isActive={currentWall === item.text}
              />
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
