'use client'

import React, { useState } from 'react'
import Image from 'next/image'
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
            // ao selecionar um projeto, fecha info e define o projeto
            if (selectedProject?.id === project.id) {
              setSelectedProject(null) // clicar no mesmo fecha
            } else {
              setSelectedProject(project)
            }
            setShowInfo(false)
            setShowGallery(false)
          }}
          onInfoClick={() => {
            // toggle: se já está aberto, fecha; se não, abre e limpa selectedProject
            setShowInfo((prev) => {
              const next = !prev
              if (next) {
                setSelectedProject(null) // abrir Info: limpa seleção de projeto
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
          <div className="w-full h-full relative rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb"
              alt="Main"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div>
            {/* Grid de Imagens */}
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
