'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Sidebar from './components/menuLateral'
import InfoGrid from './components/infoGrid'
import GaleriaGrid from './components/galeriaGrid'
import projetosData from './data/projetos.json'
import type { Project } from './types/project'

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
                <div
                  key={i}
                  className="relative w-full flex justify-center items-center bg-white rounded-2xl overflow-hidden"
                >
                  {bloco.video ? (
                    <div
                      className="relative w-full max-w-7xl aspect-video overflow-hidden rounded-2xl"
                    >
                      <iframe
                        src={`${Array.isArray(bloco.video) ? bloco.video[0] : bloco.video}${
                          (Array.isArray(bloco.video) ? bloco.video[0] : bloco.video).includes('?')
                            ? '&'
                            : '?'
                        }autoplay=1&loop=1&muted=1&background=1&controls=0&byline=0&portrait=0&title=0`}
                        title={`Vídeo do projeto ${project.titulo}`}
                        allow="autoplay; fullscreen; picture-in-picture"
                        frameBorder="0"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="relative w-[1625px] aspect-video overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={bloco.imagens[0]}
                        alt={`${project.titulo} bloco ${i}`}
                        fill
                        unoptimized
                        className="object-cover justify-center items-center"
                      />
                    </div>
                  )}
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
                  className="flex flex-col md:flex-row justify-center items-stretch gap-5 rounded-2xl overflow-hidden"
                >
                  {/* --- vídeos (um ou vários) --- */}
                  {bloco.video &&
                    (Array.isArray(bloco.video)
                      ? bloco.video.map((videoUrl, idx) => (
                        <div
                          key={`video-${idx}`}
                          className="w-full md:w-1/2 overflow-hidden rounded-2xl"
                        >
                          <div
                            className="relative w-full h-0 md:pb-0 md:h-[90vh]"
                            style={{ paddingBottom: '133.333%' }} // 3:4 para mobile
                          >
                            <iframe
                              src={`${videoUrl}?autoplay=1&loop=1&background=1&muted=1&controls=0`}
                              title={`Vídeo ${idx + 1} do projeto ${project.titulo}`}
                              className="absolute inset-0 w-full h-full"
                              allow="autoplay; fullscreen; picture-in-picture"
                              frameBorder="0"
                            />
                          </div>
                        </div>
                      ))
                    : (
                        <div className="w-full md:w-1/2 overflow-hidden rounded-2xl">
                          <div
                            className="relative w-full h-0 md:pb-0 md:h-[90vh]"
                            style={{ paddingBottom: '133.333%' }}
                          >
                            <iframe
                              src={`${bloco.video}?autoplay=1&loop=1&background=1&muted=1&controls=0`}
                              title={`Vídeo do projeto ${project.titulo}`}
                              className="absolute inset-0 w-full h-full"
                              allow="autoplay; fullscreen; picture-in-picture"
                              frameBorder="0"
                            />
                          </div>
                        </div>
                      ))}

                  {/* --- imagens (sempre renderizam) --- */}
                  {bloco.imagens?.map((img, idx) => (
                    <div
                      key={`img-${idx}`}
                      className="w-full md:w-1/2 overflow-hidden rounded-2xl flex justify-center items-center"
                    >
                      <Image
                        src={img}
                        alt={`${project.titulo} vertical ${idx}`}
                        width={1080}
                        height={1920}
                        unoptimized
                        className="object-contain w-full h-full rounded-2xl"
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
