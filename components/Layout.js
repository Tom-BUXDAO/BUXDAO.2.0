import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from './Layout.module.css'

const Layout = ({ children, currentWall, setCurrentWall }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
      <Header currentWall={currentWall} setCurrentWall={setCurrentWall} />
      <Footer currentWall={currentWall} setCurrentWall={setCurrentWall} />
    </div>
  )
}

export default Layout
