import { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Dynamically import VREnvironment with SSR disabled
const VREnvironment = dynamic(() => import('../components/VREnvironment'), { ssr: false })

export default function Home() {
  const [currentWall, setCurrentWall] = useState('Home')

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Head>
        <title>BUX DAO - VR Experience</title>
        <meta name="description" content="Explore the BUX DAO VR Experience" />
      </Head>

      <div className="absolute inset-0">
        <VREnvironment currentWall={currentWall} setCurrentWall={setCurrentWall} />
      </div>

      <Header />
      <Footer setCurrentWall={setCurrentWall} currentWall={currentWall} />
    </div>
  )
}
