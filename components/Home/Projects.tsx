import Image from 'next/image'
import { FC, useEffect } from 'react'
import {
  motion,
  useAnimation,
  AnimationControls,
  Variants,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import HeadingAnimate from '../custom/HeadingAnimate'
import { Launch } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Link from 'next/link'

//CSS
const styles = {
  projectContainer: 'flex flex-col md:flex-row justify-between gap-6',
}

//variants
const projectVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
}

//COMPONENT: COLLEGE SEARCH
const CollegeSearch: FC = () => {
  const [ref, inView] = useInView()
  const controls: AnimationControls = useAnimation()

  //animation side effect
  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      variants={projectVariants}
      initial="hidden"
      animate={controls}
      className={styles.projectContainer}
    >
      <div className="order-last md:order-first">
        <Image
          src="/images/education.webp"
          alt="search college"
          height={500}
          width={600}
          className="aspect-square"
        />
      </div>
      <div className="md:basis-[38%]">
        <h1 className="flex items-center font-bold text-2xl tracking-wide capitalize">
          College Search
          <a
            href="https://education-b9d7b.firebaseapp.com"
            target="_blank"
            rel="noreferrer"
          >
            <IconButton>
              <Launch fontSize="small" />
            </IconButton>
          </a>
        </h1>
        <h3 className="font-semibold text-xl tracking-wide capitalize my-2">
          Features
        </h3>
        <ul className="list-disc ml-4">
          <li>Search engineering colleges based of branches.</li>
          <li>Search engineering colleges based on states.</li>
          <li>Graphical representation of different colleges.</li>
          <li>Tabular representation of different colleges.</li>
          <li>Get list of sudents and their details.</li>
        </ul>
        <h3 className="font-semibold text-xl tracking-wide capitalize my-2">
          technology used
        </h3>
        <ul className="list-disc ml-4">
          <li>React for fontend</li>
          <li>Express js and node js for backend apis</li>
          <li>MongoDB from database.</li>
          <li>Chart js for graphs.</li>
          <li>Get list of sudents and their details.</li>
        </ul>
      </div>
    </motion.div>
  )
}

//COMPONENT: CHAT APPLICATION
const ChatApp: FC = () => {
  const [ref, inView] = useInView()
  const controls: AnimationControls = useAnimation()

  //animation side effect
  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      variants={projectVariants}
      initial="hidden"
      animate={controls}
      className={styles.projectContainer}
    >
      <div className="order-last">
        <Image
          src="/images/chat.webp"
          alt="search college"
          height={350}
          width={600}
        />
      </div>
      <div className="md:basis-[38%]">
        <h1 className="flex gap-2 items-center font-bold text-2xl tracking-wide capitalize">
          NextChat
          <Link href="/chat">
            <a href="/chat" target="_blank" rel="noreferrer">
              <IconButton>
                <Launch fontSize="small" />
              </IconButton>
            </a>
          </Link>
        </h1>
        <h3 className="font-semibold text-xl tracking-wide capitalize my-2">
          Features
        </h3>
        <ul className="list-disc ml-4">
          <li>Pear to pear private chat.</li>
          <li>Send emojis.</li>
          <li>Send images.</li>
          <li>Debounced search from the list of online users.</li>
        </ul>
        <h3 className="font-semibold text-xl tracking-wide capitalize my-2">
          technology used
        </h3>
        <ul className="list-disc ml-4">
          <li>React for fontend</li>
          <li>Express js and node js for backend apis</li>
          <li>Socket io for websocket.</li>
          <li>Tailwind css and Material UI for css framework</li>
        </ul>
      </div>
    </motion.div>
  )
}

//COMPONENT: MOVIE APP
const MovieApp: FC = () => {
  const [ref, inView] = useInView()
  const controls: AnimationControls = useAnimation()

  //animation side effect
  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      variants={projectVariants}
      initial="hidden"
      animate={controls}
      style={{ marginTop: '10rem' }}
      className={styles.projectContainer}
    >
      <div className="order-last md:order-first">
        <Image
          src="/images/movies.webp"
          alt="search college"
          height={350}
          width={600}
        />
      </div>
      <div className="md:basis-[38%]">
        <h1 className="flex gap-2 items-center font-bold text-2xl tracking-wide capitalize">
          Movie Review Application
          <a href="/movies" target="_blank" rel="noreferrer">
            <IconButton>
              <Launch fontSize="small" />
            </IconButton>
          </a>
        </h1>
        <h3 className="font-semibold text-xl tracking-wide capitalize my-2">
          Features
        </h3>
        <ul className="list-disc ml-4">
          <li>Watch trailers.</li>
          <li>Checkout popular, top rated and upcoming movies.</li>
          <li>Search Movie</li>
          <li>Read ratings and reviews.</li>
        </ul>
        <h3 className="font-semibold text-xl tracking-wide capitalize my-2">
          technology used
        </h3>
        <ul className="list-disc ml-4">
          <li>React for fontend</li>
          <li>Express js and node js for backend apis</li>
          <li>TMDB API</li>
          <li>Tailwind css and Material UI for css framework</li>
        </ul>
      </div>
    </motion.div>
  )
}

//COMPONENT: SHOES E-COMMERCE
const ShoesECommerce: FC = () => {
  const [ref, inView] = useInView()
  const controls: AnimationControls = useAnimation()

  //animation side effect
  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      variants={projectVariants}
      initial="hidden"
      animate={controls}
      style={{ marginTop: '10rem' }}
      className={styles.projectContainer}
    >
      <div className="order-last">
        <Image
          src="/images/shoe_ecommerce.webp"
          alt="search college"
          height={350}
          width={600}
        />
      </div>
      <div className="md:basis-[38%]">
        <h1 className="flex gap-2 items-center font-bold text-2xl tracking-wide capitalize">
          Shoes E-Commerce
          <a href="/shoes" target="_blank" rel="noreferrer">
            <IconButton>
              <Launch fontSize="small" />
            </IconButton>
          </a>
        </h1>
        <h3 className="font-semibold text-xl tracking-wide capitalize my-2">
          Features
        </h3>
        <ul className="list-disc ml-4">
          <li>Check different shoes.</li>
          <li>Add shoes to cart</li>
          <li>Get details about each product.</li>
          <li>Checkout and make payment.</li>
        </ul>
        <h3 className="font-semibold text-xl tracking-wide capitalize my-2">
          technology used
        </h3>
        <ul className="list-disc ml-4">
          <li>React for fontend</li>
          <li>Express js and node js for backend apis</li>
          <li>
            Razorpay for payment gateway with razorpay webhook for payment
            validation.
          </li>
          <li>Tailwind css and Material UI for css framework</li>
        </ul>
      </div>
    </motion.div>
  )
}

//COMPONENT: PROJECTS
export const Projects: FC = () => {
  return (
    <div id="projects" className="min-h-screen grid place-items-center px-4">
      <div className="w-full md:max-w-5xl">
        {/*--- heading ---*/}
        <HeadingAnimate
          text="Projects"
          className="text-3xl font-semibold tracking-wider mt-16 mb-7 text-center"
        />
        <CollegeSearch />
        <ChatApp />
        <MovieApp />
        <ShoesECommerce />
      </div>
    </div>
  )
}
