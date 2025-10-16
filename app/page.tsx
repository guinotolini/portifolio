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
    }
  }

  return (
    <div className="flex h-full bg-white overflow-hidden">
      {/* BOTÃO TOGGLE */}
      <button
        onClick={() => setShowGallery(true)}
        className="fixed top-5 left-5 z-10 bg-gray-100 px-4 py-2 rounded-xl cursor-pointer text-sm text-gray-500 font-inter transition-colors hover:bg-gray-200"
      >
        Todos os Projetos
      </button>

      {/* SIDEBAR */}
      <Sidebar
        onProjectSelect={(project) => {
          setSelectedProject(project)
          setShowInfo(false)
          setShowGallery(false)
        }}
        onInfoClick={() => {
          setSelectedProject(null)
          setShowInfo(true)
          setShowGallery(false)
        }}
      />

      {/* MAIN AREA */}
      <main className="flex-1 p-5 transition-all duration-500">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full overflow-y-auto p-2">
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
        )}
      </main>
    </div>
  )
}
