import React from 'react'
import { motion } from 'framer-motion'

export default function FloatingCard(){
  return (
    <motion.div className="float-wrapper" initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.6}}>
      <motion.div className="device" whileHover={{y:-8, scale:1.01}} transition={{type:'spring', stiffness:260}}>
        <div className="screen">
          <div className="s-title">Featured</div>
          <div className="s-desc">PromptAlbumBuilder — Smart photo organizer</div>
          <div className="s-tags"><span>#python</span><span>#streamlit</span></div>
        </div>
      </motion.div>
      <svg className="float-orn" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--accent2)" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path d="M45,-10 C70,10 120,-10 150,20 C180,50 170,110 130,140 C90,170 30,160 5,130 C-20,100 -10,40 20,10 Z" fill="url(#g1)" />
      </svg>
    </motion.div>
  )
}
