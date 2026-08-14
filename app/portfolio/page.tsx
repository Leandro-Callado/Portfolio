'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { LandscapeSVG } from './landscape'

const ICONS = [
  {label:'GitHub',href:'https://github.com/Leandro-Callado',color:'text-purple-400',d:'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z'},
  {label:'Help CLI',href:'https://github.com/Leandro-Callado/Help-CLI',color:'text-purple-400',d:'M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z'},
  {label:'LinkedIn',href:'www.linkedin.com/in/leandro-castilho-feitosa-callado-676ab5269',color:'text-blue-400',d:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'},
  {label:'Projeto Sticker',href:'https://github.com/Leandro-Callado/Sticker',color:'text-purple-400',d:'M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z'},
  {label:'Em breve',href:'#',color:'text-purple-400',d:'M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z'},
  {label:'Contato',href:'leandrocallado2@gmail.com',color:'text-purple-300',d:'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z'},
]
const TASKBAR = [
  {label:'VS Code',color:'text-blue-400',d:'M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.88V4.12a1.5 1.5 0 0 0-.85-1.533zm-5.146 14.861L10.826 12l7.178-5.448v10.896z'},
  {label:'Figma',color:'text-pink-400',d:'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148z'},
  {label:'PostgreSQL',color:'text-cyan-400',d:'M17.128 0a10.134 10.134 0 0 0-2.755.403C13.379.72 12.368 1.185 11.5 1.78 10.787.9 9.337.24 7.677.044 6.445-.1 5.145.04 4.013.55 1.7 1.54.112 3.486.005 5.97c-.05 1.237.154 2.36.5 3.25.347.89.79 1.52 1.307 1.89.518.37 1.043.462 1.53.33.5-.136.92-.507 1.202-.98.295-.498.46-1.12.502-1.83l.014-.313c.068-1.157-.038-2.15-.178-2.876-.14-.727-.31-1.187-.31-1.187l.974-.152s.164.436.312 1.195c.148.76.262 1.803.186 3.04l-.015.325c-.05.866-.254 1.637-.67 2.248-.416.61-1.038 1.043-1.795 1.237-.77.197-1.59.062-2.34-.452-.762-.52-1.348-1.362-1.75-2.424-.403-1.06-.617-2.33-.558-3.713.123-2.944 1.973-5.274 4.637-6.433 1.32-.575 2.826-.718 4.25-.553 1.38.16 2.652.72 3.55 1.66.67.706 1.1 1.588 1.252 2.552.15.963.025 1.98-.36 2.9-.77 1.84-2.578 3.12-4.736 3.478z'},
]

export default function PortfolioPage() {
  const wrapRef = useRef(null)
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    setTimeStr(new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}))
    const interval = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}))
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({defaults:{ease:'power3.out'}})
      tl.fromTo(wrapRef.current,{scale:0.96,opacity:0},{scale:1,opacity:1,duration:0.5})
      tl.fromTo('.di-wrap',{x:-28,opacity:0},{x:0,opacity:1,duration:0.38,stagger:0.08},'-=0.15')
      tl.fromTo('.hero-el',{y:28,opacity:0},{y:0,opacity:1,duration:0.48,stagger:0.1},'-=0.2')
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="w-screen h-screen flex flex-col overflow-hidden bg-[#0d0620] text-white" style={{ opacity: 0 }}>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .mobile-bar-force { display: none !important; }
        }
      `}} />
      {/* Removed top bar as requested */}

      {/* Main Desktop Area */}
      <div className="relative flex flex-1 overflow-hidden min-h-0 bg-[#0d0620]">
        
        {/* SVG Background Layer */}
        <div className="absolute inset-0 z-0">
          <LandscapeSVG />
        </div>

        {/* Overlay Gradients for readability */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-[#0d0620] via-[#0d0620]/90 to-[#0d0620]/30 md:via-[#0d0620]/80 md:to-transparent" />

        {/* Sidebar Icons (Desktop) */}
        <div className="relative z-20 hidden md:flex flex-col gap-2 pt-6 px-4">
          {ICONS.map(ic=>(
            <div key={ic.label} className="di-wrap">
              <a href={ic.href} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-all w-16">
                <svg viewBox="0 0 24 24" fill="currentColor" className={"w-8 h-8 " + ic.color}><path d={ic.d}/></svg>
                <span className="text-[10px] text-gray-300 font-medium text-center">{ic.label}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="relative z-20 flex flex-col justify-end px-6 md:px-12 py-8 w-full max-w-2xl h-full" style={{ justifyContent: 'flex-end', paddingBottom: '5rem' }}>
          <div className="hero-el flex items-center gap-2 mb-2 sm:mb-4">
            <span className="text-lg sm:text-xl font-medium">{"Ol\u00e1! Eu sou o"}</span>
            <span className="text-purple-300 text-xl sm:text-2xl drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]">&#10022;</span>
          </div>
          <h1 className="hero-el font-black leading-none tracking-tight mb-1 text-5xl sm:text-6xl md:text-7xl">Desenvolvedor</h1>
          <h2 className="hero-el font-black leading-none tracking-tight mb-4 sm:mb-6 text-5xl sm:text-6xl md:text-7xl text-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            Full Stack
          </h2>
          
          <div className="hero-el flex items-center gap-3 mb-4 sm:mb-6">
            <div className="h-0.5 w-16 sm:w-24 rounded-full bg-gradient-to-r from-purple-500 to-transparent" />
            <span className="text-purple-400 text-sm">&#10022;</span>
          </div>
          
          <p className="hero-el text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
            Construo {"experi\u00eancias"} web, backend e mobile que conectam pessoas e ideias. Transformando conceitos em realidade digital.
          </p>
          
          <div className="hero-el flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-br from-purple-600 to-purple-800 hover:scale-105 transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] w-full sm:w-auto">
              <span className="font-mono text-purple-200 text-xs">&gt;_</span> Ver projetos
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md w-full sm:w-auto">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
              Sobre mim
            </button>
          </div>
        </div>

        {/* Floating Icons for Mobile */}
        <div className="mobile-bar-force md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-2 rounded-2xl bg-[#0d0620]/80 border border-purple-500/20 backdrop-blur-md w-11/12 max-w-sm overflow-x-auto scrollbar-hide" style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)' }}>
          {ICONS.map(ic=>(
            <a key={ic.label} href={ic.href} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 min-w-[60px] flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className={"w-6 h-6 " + ic.color}><path d={ic.d}/></svg>
              <span className="text-[9px] text-gray-300">{ic.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Removed taskbar as requested */}
    </div>
  )
}
