'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Sidebar from './components/menuLateral'
import InfoGrid from './components/infoGrid'
import GaleriaGrid from './components/galeriaGrid'
import projetosData from './data/projetos.json'

// ---------- Tipos ----------
type LayoutType = 'full' | 'grid' | 'mosaic' | 'vertical'

interface ProjectBlock {
  layout: LayoutType
  imagens: string[]
}

interface Project {
  id: number
  titulo: string
  descricao: string
  miniatura: string
  capa: string
  blocos: ProjectBlock[]
}

// ---------- Página principal ----------
export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const projetos = projetosData as Project[]

  // Restaura projeto selecionado ao carregar
  useEffect(() => {
    const storedId = localStorage.getItem('selectedProjectId')
    if (storedId) {
      const project = projetos.find((p) => p.id === Number(storedId))
      if (project) {
        setSelectedProject(project)
        setShowInfo(false)
        setShowGallery(false)
      }
      localStorage.removeItem('selectedProjectId')
    }
  }, [projetos])

  // Slide automático das capas
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % projetos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [projetos.length])

  const handleSelectFromGallery = (id: number) => {
    const project = projetos.find((p) => p.id === id)
    if (project) {
      setSelectedProject(project)
      setShowGallery(false)
      setShowInfo(false)
    }
  }

  // ---------- Renderização dinâmica dos blocos ----------
  const renderProjectBlocks = (project: Project) => {
    return (
      <div className="flex flex-col gap-5">
        {project.blocos.map((bloco, i) => {
          switch (bloco.layout) {
            case 'full':
              return (
                <div key={i} className="relative w-full h-[100vh] rounded-2xl overflow-hidden">
                  <Image
                    src={bloco.imagens[0]}
                    alt={`${project.titulo} bloco ${i}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )

            case 'grid':
              return (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {bloco.imagens.map((img, index) => (
                    <div key={index} className="relative w-full h-[50vh] rounded-2xl overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.titulo} grid ${index}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )

            case 'mosaic':
              return (
                <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {bloco.imagens.map((img, index) => (
                    <div
                      key={index}
                      className={`relative overflow-hidden rounded-2xl ${
                        index === 0 ? 'col-span-2 h-[80vh]' : 'h-[50vh]'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${project.titulo} mosaic ${index}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )

            case 'vertical':
              return (
                <div
                  key={i}
                  className="flex flex-col md:flex-row justify-center items-center gap-5 rounded-2xl overflow-hidden"
                >
                  {bloco.imagens.map((img, index) => (
                    <div
                      key={index}
                      className="relative flex justify-center items-center h-full w-screen"
                    >
                      <Image
                        src={img}
                        alt={`${project.titulo} vertical ${index}`}
                        width={1000}
                        height={1200}
                        unoptimized
                        className="object-contain h-full w-full rounded-2xl"
                      />
                    </div>  
                  ))}
                </div>
              )

            default:
              return null
          }
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Menu lateral */}
      <div className="w-full md:w-[38vh] md:flex-shrink-0">
        <Sidebar
          selectedId={selectedProject?.id ?? null}
          showInfo={showInfo}
          onProjectSelect={(project) => {
            const proj = project as unknown as Project // 🔧 Corrige o erro de tipagem
            if (selectedProject?.id === proj.id) {
              setSelectedProject(null)
            } else {
              setSelectedProject(proj)
            }
            setShowInfo(false)
            setShowGallery(false)
          }}
          onInfoClick={() => {
            setShowInfo((prev) => {
              const next = !prev
              if (next) {
                setSelectedProject(null)
                setShowGallery(false)
              }
              return next
            })
          }}
        />
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 p-5 overflow-y-auto transition-all duration-500">
        {showGallery ? (
          <GaleriaGrid onSelectProject={handleSelectFromGallery} />
        ) : showInfo ? (
          <InfoGrid />
        ) : !selectedProject ? (
          <div className="w-full h-full relative rounded-2xl overflow-hidden transition-all duration-700">
            <Image
              key={projetos[currentImageIndex].id}
              src={projetos[currentImageIndex].capa}
              alt={projetos[currentImageIndex].titulo}
              fill
              unoptimized
              className="object-cover transition-opacity duration-1000"
            />
          </div>
        ) : (
          renderProjectBlocks(selectedProject)
        )}
      </main>
    </div>
  )
}
