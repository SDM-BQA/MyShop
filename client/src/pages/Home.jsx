import {motion, AnimatePresence} from 'framer-motion'
import { useSnapShot } from 'valtio'

import state from '../store/Index'

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion'

function Home() {
    const snap = useSnapShot(state)
  return (
    <div>Home</div>
  )
}

export default Home