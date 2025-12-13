import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({project}){
  return (
    <motion.article className="project-card" whileHover={{scale:1.02}} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.35}}>
      <div className="pc-top"><div className="pc-dot"/><div className="pc-title">{project.title}</div></div>
      <div className="pc-desc">{project.desc}</div>
      <div className="pc-tags">{project.tags.map(t=> <span key={t}>{t}</span>)}</div>
      <div className="pc-actions"><a className="link-sm" href="#">View</a><a className="link-sm" href="#">Code</a></div>
    </motion.article>
  )
}
