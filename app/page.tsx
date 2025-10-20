'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Sidebar from './components/menuLateral'
import InfoGrid from './components/infoGrid'
import GaleriaGrid from './components/galeriaGrid'
import projetos from './data/projetos.json'

interface Project {
  id: number
  titulo: string
  descricao: string
  miniatura: string
  capa: string
  imagens: string[]
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const searchParams = useSearchParams()
  const projectId = searchParams.get('id')

  // Se houver um ?id= na URL, abre o projeto correspondente automaticamente
  useEffect(() => {
    if (projectId) {
      const project = projetos.find((p) => p.id === Number(projectId))
      if (project) {
        setSelectedProject(project)
        setShowInfo(false)
        setShowGallery(false)
      }
    }
  }, [projectId])

  // Alterna automaticamente as capas dos projetos a cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % projetos.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleSelectFromGallery = (id: number) => {
    const project = projetos.find((p) => p.id === id)
    if (project) {
      setSelectedProject(project)
      setShowGallery(false)
      setShowInfo(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* SIDEBAR */}
      <div className="w-full md:w-[38vh] md:flex-shrink-0">
        <Sidebar
          selectedId={selectedProject?.id ?? null}
          showInfo={showInfo}
          onProjectSelect={(project) => {
            if (selectedProject?.id === project.id) {
              setSelectedProject(null)
            } else {
              setSelectedProject(project)
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

      {/* CONTEÚDO PRINCIPAL */}
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
              className="object-cover transition-opacity duration-1000"
            />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full overflow-y-auto">
              {selectedProject.imagens.map((img, index) => (
                <div key={index} className="relative w-full h-64 rounded-2xl overflow-hidden">
                  <Image
                    src={img}
                    alt={`${selectedProject.titulo} image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
