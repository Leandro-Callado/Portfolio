'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { LandscapeSVG } from './landscape'
import { ICONS, TASKBAR } from './constants'
import { ExplorerModal } from './ExplorerModal'


export default function PortfolioPage() {
  const wrapRef = useRef(null)
  const [timeStr, setTimeStr] = useState('')
  const [isExplorerOpen, setExplorerOpen] = useState(false)

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
            <span className="text-lg sm:text-xl font-medium">{"Ol\u00e1! Eu sou Leandro Callado"}</span>
            <span className="text-purple-300 text-xl sm:text-2xl drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]">&#10022;</span>
          </div>
          <h1 className="hero-el font-black text-5xl sm:text-6xl md:text-7xl" style={{ color: 'white', lineHeight: 1, letterSpacing: '-0.025em', marginBottom: '0.25rem' }}>
            Desenvolvedor
          </h1>
          <h2 className="hero-el font-black text-5xl sm:text-6xl md:text-7xl" style={{ color: '#a855f7', lineHeight: 1, letterSpacing: '-0.025em', marginBottom: '1.5rem' }}>
            Full Stack
          </h2>
          
          <div className="hero-el flex items-center gap-3 mb-4 sm:mb-6">
            <div className="rounded-full" style={{ background: 'linear-gradient(to right, #a855f7, transparent)', height: '2px', width: '6rem' }} />
            <span style={{ color: '#c084fc', fontSize: '0.875rem' }}>&#10022;</span>
          </div>
          
          <p className="hero-el text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
            Construo {"experi\u00eancias"} web, backend e mobile que conectam pessoas e ideias. Transformando conceitos em realidade digital.
          </p>
          
          <div className="hero-el flex mt-2">
            <button 
              onClick={() => setExplorerOpen(true)}
              style={{ alignSelf: 'flex-start' }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md"
            >
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

        {/* Tech Stack Bar at the Bottom */}
        <div 
          className="absolute left-0 w-full flex items-center justify-center gap-6 sm:gap-10 z-20 pointer-events-auto"
          style={{ bottom: '16px' }}
        >
          {TASKBAR.map(tech=>(
            <div key={tech.label} className="relative flex flex-col items-center justify-center transition-all duration-300 cursor-pointer hover:-translate-y-1 group">
              <img src={tech.src} alt={tech.label} className="w-8 h-8 sm:w-10 sm:h-10 object-contain hover:scale-110 transition-transform opacity-70 group-hover:opacity-100" />
            </div>
          ))}
        </div>
        {/* Renderizar o Modal condicionalmente */}
        {isExplorerOpen && <ExplorerModal onClose={() => setExplorerOpen(false)} />}
      </div>
    </div>
  )
}
