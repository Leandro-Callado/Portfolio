'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

// Arquivos disponíveis no explorador
const FILES = [
  { id: 'apresentacao', name: 'Apresentação.txt', type: 'txt', icon: '📝' },
  { id: 'habilidades', name: 'Habilidades.pdf', type: 'pdf', icon: '📕' },
  { id: 'curriculo', name: 'Curriculo.docx', type: 'docx', icon: '📄' }
]

export function ExplorerModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  
  const [openedFile, setOpenedFile] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(Draggable)
    
    // Animação de entrada
    gsap.fromTo(modalRef.current, 
      { scale: 0.95, opacity: 0, y: 20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
    )

    // Configurar o Draggable
    if (modalRef.current && headerRef.current) {
      Draggable.create(modalRef.current, {
        type: 'x,y',
        trigger: headerRef.current,
        bounds: window,
        inertia: true
      })
    }
  }, [])

  const fecharModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onClose()
  }

  const toggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsMaximized(!isMaximized)
    
    // Reset transform when maximizing so it perfectly aligns to the top-left
    if (!isMaximized && modalRef.current) {
      gsap.set(modalRef.current, { x: 0, y: 0 })
    }
  }

  // Conteúdo interno de cada arquivo
  const renderFileContent = () => {
    if (openedFile === 'apresentacao') {
      return (
        <div className="p-6 text-gray-300 font-mono text-sm leading-relaxed h-full overflow-y-auto">
          <h2 className="text-xl text-white mb-4">Olá! Eu sou Leandro Callado</h2>
          <p className="mb-4">
            Sou um Desenvolvedor Full Stack apaixonado por criar experiências que conectam pessoas e ideias.
            Transformando conceitos em realidade digital.
          </p>
          <p>
            Com foco em design limpo, interações fluidas e backends robustos, eu construo produtos que não são apenas funcionais, mas visualmente deslumbrantes.
          </p>
        </div>
      )
    }
    if (openedFile === 'habilidades') {
      return (
        <div className="p-6 text-gray-300 h-full overflow-y-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded p-4 mb-4 flex items-center gap-3">
            <span className="text-2xl">📕</span>
            <div>
              <h3 className="text-red-400 font-bold">Visualizador de PDF</h3>
              <p className="text-xs">Documento de Habilidades</p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong className="text-white">Frontend:</strong> React, Next.js, Tailwind CSS, GSAP</li>
            <li><strong className="text-white">Backend:</strong> Python, Django, PostgreSQL</li>
            <li><strong className="text-white">Design:</strong> Figma, UI/UX, Componentização</li>
            <li><strong className="text-white">Ferramentas:</strong> Git, Docker, Vercel</li>
          </ul>
        </div>
      )
    }
    if (openedFile === 'curriculo') {
      return (
        <div className="p-6 text-gray-800 bg-white min-h-full pb-16">
          <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-black mb-1 border-b-2 border-gray-300 pb-2 text-gray-900">Leandro Callado</h1>
            <p className="text-gray-500 text-sm mb-6">Desenvolvedor Full Stack | leandrocallado.dev@gmail.com</p>
            
            <h2 className="text-lg font-bold text-blue-600 mt-6 mb-2 uppercase">Resumo Profissional</h2>
            <p className="text-sm leading-relaxed mb-4 text-gray-800">
              Profissional focado no desenvolvimento de sistemas web de ponta a ponta, com experiência
              na estruturação de bancos de dados até a entrega de interfaces ricas e responsivas.
            </p>

            <h2 className="text-lg font-bold text-blue-600 mt-6 mb-2 uppercase">Experiência e Projetos</h2>
            <div className="mb-4">
              <h3 className="font-bold text-gray-900">Portfólio Interativo</h3>
              <p className="text-xs text-gray-500 mb-1">Desenvolvedor Lead</p>
              <ul className="list-disc list-inside text-sm pl-2 text-gray-800">
                <li className="text-gray-800">Design de interface inspirada em sistemas operacionais.</li>
                <li className="text-gray-800">Animações complexas utilizando GSAP e Tailwind.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 pointer-events-auto"
      style={{ zIndex: 99999 }}
    >
      {/* Container Principal do Modal - Cor de fundo roxo acinzentado */}
      <div 
        ref={modalRef} 
        className={`flex flex-col overflow-hidden shadow-2xl relative ${
          isMaximized 
            ? 'w-full h-full rounded-none border-none' 
            : 'w-full max-w-2xl h-[70vh] min-h-[500px] rounded-xl border border-white/10'
        }`}
        style={{ backgroundColor: '#181321', zIndex: 100000 }} /* Roxo muito escuro acinzentado */
      >
        
        {/* Barra de Título (Header) - Draggable Area */}
        <div 
          ref={headerRef} 
          onDoubleClick={toggleMaximize}
          className="h-10 bg-[#120e18] flex items-center justify-between px-3 select-none cursor-move border-b border-white/5"
        >
          {/* Abas Esquerda */}
          <div className="flex items-center gap-2 h-full pt-1">
            <div className="bg-[#181321] text-gray-300 text-xs px-4 py-1.5 rounded-t-lg flex items-center gap-2 border-t border-x border-white/5">
              <span>🗂️</span>
              <span>Início</span>
              <button className="ml-2 hover:text-white rounded-full p-0.5">×</button>
            </div>
            <button className="text-gray-400 hover:text-white px-2">+</button>
          </div>

          {/* Controles da Janela Direita */}
          <div className="flex items-center">
            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-white/10 transition-colors" data-clickable="true">─</button>
            <button 
              onClick={toggleMaximize} 
              onPointerDown={(e) => e.stopPropagation()} 
              data-clickable="true" 
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-white/10 transition-colors z-50 relative"
            >
              {isMaximized ? '❐' : '□'}
            </button>
            <button 
              onClick={fecharModal} 
              onPointerDown={(e) => e.stopPropagation()} 
              data-clickable="true" 
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-colors z-50 relative"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Barra de Navegação e Ferramentas */}
        <div className="bg-[#181321] p-2 flex items-center gap-3 border-b border-white/5 text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded hover:bg-white/10" onClick={() => setOpenedFile(null)}>←</button>
            <button className="p-1.5 rounded hover:bg-white/10 opacity-50">→</button>
            <button className="p-1.5 rounded hover:bg-white/10" onClick={() => setOpenedFile(null)}>↑</button>
          </div>
          
          <div className="flex-1 flex items-center gap-2 bg-[#221b2d] rounded px-3 py-1.5 border border-white/10">
            <span>💻</span>
            <span>{'>'} Este Computador {'>'} Leandro - Pessoal {openedFile ? `> ${openedFile}` : ''}</span>
          </div>

          <div className="w-48 bg-[#221b2d] rounded px-3 py-1.5 border border-white/10 flex items-center gap-2 text-gray-500">
            <span className="text-xs">🔍</span>
            <input type="text" placeholder="Pesquisar..." className="bg-transparent border-none outline-none w-full text-xs text-white" disabled />
          </div>
        </div>

        {/* Corpo do Explorador */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          
          {/* Barra Lateral (Sidebar) */}
          <div className="w-48 bg-[#15101c] border-r border-white/5 py-3 flex flex-col overflow-y-auto">
            <div className="px-4 text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Acesso Rápido</div>
            
            <button className="w-full flex items-center gap-2 px-4 py-1.5 text-sm text-gray-300 hover:bg-white/5 text-left bg-white/5 border-l-2 border-purple-500">
              <span className="text-blue-400">📁</span> Leandro - Pessoal
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-1.5 text-sm text-gray-400 hover:bg-white/5 text-left">
              <span className="text-yellow-400">⭐</span> Projetos
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-1.5 text-sm text-gray-400 hover:bg-white/5 text-left">
              <span className="text-blue-300">🖥️</span> Área de Trabalho
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-1.5 text-sm text-gray-400 hover:bg-white/5 text-left">
              <span className="text-purple-400">📄</span> Documentos
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-1.5 text-sm text-gray-400 hover:bg-white/5 text-left">
              <span className="text-green-400">🖼️</span> Imagens
            </button>
          </div>

          {/* Área Principal de Conteúdo */}
          <div className="flex-1 bg-[#181321] relative overflow-hidden flex flex-col min-h-0">
            {openedFile ? (
              // Visualizador de Arquivo
              <div className="flex-1 overflow-hidden flex flex-col relative bg-[#120e18] min-h-0">
                <div className="h-8 bg-[#181321] flex items-center px-4 border-b border-white/10 shadow-sm z-10 shrink-0">
                  <span className="text-xs text-gray-400 flex items-center gap-2 cursor-pointer hover:text-white" onClick={() => setOpenedFile(null)}>
                    ← Voltar para a pasta
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto min-h-0">
                  {renderFileContent()}
                </div>
              </div>
            ) : (
              // Visualização de Grade de Arquivos
              <div className="p-4 h-full overflow-y-auto">
                <div className="text-xs text-gray-400 mb-4 pb-2 border-b border-white/5 flex">
                  <span className="flex-1">Nome</span>
                  <span className="w-24">Data de modificação</span>
                  <span className="w-20">Tipo</span>
                </div>
                
                <div className="grid grid-cols-1 gap-1">
                  {FILES.map(file => (
                    <div 
                      key={file.id}
                      onClick={() => setSelectedFile(file.id)}
                      onDoubleClick={() => setOpenedFile(file.id)}
                      className={`flex items-center p-2 rounded cursor-pointer select-none transition-colors ${
                        selectedFile === file.id ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex-1 flex items-center gap-3">
                        <span className="text-xl drop-shadow-sm">{file.icon}</span>
                        <span className="text-sm text-gray-200 font-medium">{file.name}</span>
                      </div>
                      <div className="w-24 text-xs text-gray-500">Hoje 10:45</div>
                      <div className="w-20 text-xs text-gray-500 uppercase">{file.type}</div>
                    </div>
                  ))}
                </div>

                {/* Ajuda (Double click) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 bg-black/40 px-3 py-1.5 rounded-full pointer-events-none">
                  Dê um clique duplo para abrir um arquivo
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Barra de Status */}
        <div className="h-6 bg-[#181321] border-t border-white/5 flex items-center px-3 text-[11px] text-gray-500 select-none">
          {openedFile ? '1 item selecionado' : `${FILES.length} itens`}
        </div>

      </div>
    </div>
  )
}
