'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import PortfolioPage from './portfolio/page'

const FAKE_PASSWORD = 'Lc@2024!secure'

export default function Page() {
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')

  const wrapperRef = useRef(null)
  const topBarRef = useRef(null)
  const glowRef = useRef(null)
  const glow2Ref = useRef(null)
  const redLineRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const inputRef = useRef(null)
  const submitBtnRef = useRef(null)
  const iconRef = useRef(null)
  const h1Ref = useRef(null)
  const h2Ref = useRef(null)
  const subtitleRef = useRef(null)
  const userCardRef = useRef(null)
  const guestCardRef = useRef(null)
  const portfolioRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(topBarRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
      tl.fromTo(redLineRef.current, { scaleY: 0, transformOrigin: 'center' }, { scaleY: 1, duration: 0.8, ease: 'power3.inOut' }, '-=0.2')
      tl.fromTo([glowRef.current, glow2Ref.current], { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', stagger: 0.2 }, '-=0.6')
      tl.fromTo(iconRef.current, { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.4')
      tl.fromTo([h1Ref.current, h2Ref.current, subtitleRef.current], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.12 }, '-=0.3')
      tl.fromTo([userCardRef.current, guestCardRef.current], { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.15 }, '-=0.4')
    }, wrapperRef)

    let typingInterval: NodeJS.Timeout

    const startTyping = setTimeout(() => {
      let i = 0
      if (inputRef.current) {
        // @ts-ignore
        inputRef.current.focus()
        gsap.to(userCardRef.current, { boxShadow: '0 0 30px rgba(239,68,68,0.7)', duration: 0.3, yoyo: true, repeat: 1 })
      }
      typingInterval = setInterval(() => {
        if (i < FAKE_PASSWORD.length) {
          setPasswordValue(prev => prev + FAKE_PASSWORD[i])
          i++
        } else {
          clearInterval(typingInterval)
          setTimeout(() => {
            if (submitBtnRef.current) {
              gsap.timeline()
                .to(submitBtnRef.current, { scale: 0.88, duration: 0.1, ease: 'power1.in' })
                .to(submitBtnRef.current, { scale: 1, duration: 0.12, ease: 'power1.out' })
                .call(() => triggerTransition())
            }
          }, 400)
        }
      }, 80)
    }, 5000)

    function triggerTransition() {
      const tl = gsap.timeline({ onComplete: () => setShowPortfolio(true) })
      tl.to([leftColRef.current, rightColRef.current], { y: -20, opacity: 0, duration: 0.4, ease: 'power2.in', stagger: 0.08 })
      tl.to(redLineRef.current, { scaleY: 0, opacity: 0, duration: 0.35, ease: 'power2.in' }, '-=0.2')
      tl.to(wrapperRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.1')
    }

    return () => { ctx.revert(); clearTimeout(startTyping); clearInterval(typingInterval) }
  }, [])

  useEffect(() => {
    if (showPortfolio && portfolioRef.current) {
      gsap.fromTo(portfolioRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power2.out' })
    }
  }, [showPortfolio])

  if (showPortfolio) {
    return (
      <div ref={portfolioRef} style={{ opacity: 0 }} className="w-screen h-screen">
        <PortfolioPage />
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className="flex flex-col h-screen w-screen bg-[#050014] text-white font-sans overflow-hidden">
      
      {/* Barra superior */}
      <div ref={topBarRef} className="h-10 w-full border-b border-white/10 bg-[#0a0022] flex-shrink-0" />

      {/* Main Container */}
      <main className="relative flex-1 flex items-center justify-center p-4 sm:p-10 w-full h-full overflow-hidden">
        
        {/* Glows com tamanhos responsivos e posicionamento fixo para evitar estourar a tela */}
        <div ref={glowRef} className="absolute top-1/4 left-1/2 sm:left-16 -translate-x-1/2 sm:translate-x-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-700/50 rounded-full blur-[140px] pointer-events-none" />
        <div ref={glow2Ref} className="absolute top-1/2 left-1/2 sm:left-1/4 -translate-x-1/2 sm:translate-x-0 w-[200px] h-[200px] bg-purple-900/30 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Linha vermelha - central */}
        <div ref={redLineRef} className="hidden sm:block absolute left-1/2 -translate-x-1/2 h-[450px] w-[2px] bg-red-500 z-0" style={{ boxShadow: '0 0 20px rgba(239,68,68,0.8), 0 0 40px rgba(239,68,68,0.4)' }} />

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 sm:gap-16 md:gap-24 w-full max-w-5xl px-4">

          {/* Coluna Esquerda */}
          <div ref={leftColRef} className="flex flex-col items-center justify-center text-center flex-1 min-w-[280px]">
            <div ref={iconRef} className="mb-4 flex items-center justify-center" style={{ width: '120px', height: '96px', maxWidth: '100%' }}>
              <img src="/icon.png" alt="Icone Neon Desenvolvedor" className="drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h1 ref={h1Ref} className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">desenvolvedor</h1>
            <h2 ref={h2Ref} className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-[#8B5CF6]">Fullstack</h2>
            <p ref={subtitleRef} className="mt-4 sm:mt-5 text-sm text-gray-400">Para comecar, clique no seu nome de usuario</p>
          </div>

          {/* Coluna Direita */}
          <div ref={rightColRef} className="flex flex-col justify-center gap-4 flex-1 min-w-[320px] max-w-sm mx-auto">
            
            <div ref={userCardRef} className="relative p-[1px] rounded-2xl w-full" style={{ background: 'linear-gradient(to right, #dc2626, rgba(239,68,68,0.7), transparent)', boxShadow: '-8px 0 24px -4px rgba(239,68,68,0.6)' }}>
              <div className="flex flex-col gap-3 p-4 w-full bg-[#080018] rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-purple-600/20 rounded-lg overflow-hidden border border-white/10" style={{ width: '56px', height: '56px' }}>
                    <img src="/picture.jpg" alt="Leandro picture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white leading-tight">Leandro Callado</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Digite sua senha</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <input ref={inputRef} type="password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)} className="flex-1 min-w-0 h-9 rounded px-3 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                  <button ref={submitBtnRef} className="h-9 w-10 bg-red-600 hover:bg-red-500 rounded flex items-center justify-center transition-colors flex-shrink-0">
                    <span className="text-white text-base">&#10132;</span>
                  </button>
                  <button className="h-9 w-10 bg-purple-900 border border-purple-700 hover:bg-purple-800 rounded flex items-center justify-center transition-colors flex-shrink-0">
                    <span className="text-white text-sm font-bold">?</span>
                  </button>
                </div>
              </div>
            </div>

            <div ref={guestCardRef} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer w-fit pr-12 group">
              <div className="flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group-hover:border-purple-700/50 transition-colors" style={{ width: '56px', height: '56px' }}>
                <img src="/chess-avatar.jpg" alt="Guest avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 className="text-base font-medium text-gray-300 group-hover:text-white transition-colors">Guest</h3>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  )
}
