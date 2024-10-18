import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import VREnvironment from '../components/VREnvironment'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [currentWall, setCurrentWall] = useState('Home')

  return (
    <Layout currentWall={currentWall} setCurrentWall={setCurrentWall}>
      <Head>
        <title>BUX DAO - VR Experience</title>
        <meta name="description" content="Explore the BUX DAO VR Experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <VREnvironment currentWall={currentWall} setCurrentWall={setCurrentWall} />
    </Layout>
  )
}
