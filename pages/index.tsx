import type { NextPage } from 'next'
import { About } from '../components/Home/About'
import { Contact } from '../components/Home/Contact'
import { Experiences } from '../components/Home/Experiences'
import { Landing } from '../components/Home/Landing'
import { Projects } from '../components/Home/Projects'
import { Skills } from '../components/Home/Skills'
import NavBar from '../components/Navigation/NavBar'
import Head from 'next/head'
import { useRouter, NextRouter } from 'next/router'

const Home: NextPage = () => {
  const router: NextRouter = useRouter()

  return (
    <>
      <Head>
        <title>
          {router?.asPath === '/'
            ? 'Sambeet.devfolio'
            : router?.asPath.split('#')[1]}
        </title>
      </Head>
      <NavBar />
      <Landing />
      <About />
      <Skills />
      <Projects />
      <Experiences />
      <Contact />
    </>
  )
}

export default Home
