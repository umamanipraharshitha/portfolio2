import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({children}){
  const [theme, setTheme] = useState(()=>{
    try{ return localStorage.getItem('theme') || 'dark' }catch(e){return 'dark'}
  })

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    try{ localStorage.setItem('theme', theme) }catch(e){}
  },[theme])

  const toggle = ()=> setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{theme, toggle}}>{children}</ThemeContext.Provider>
  )
}

export function useTheme(){ return useContext(ThemeContext) }
