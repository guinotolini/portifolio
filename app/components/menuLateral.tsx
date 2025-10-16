'use client'

import React from 'react'
import Image from 'next/image'
import projetos from '@/app/data/projetos.json'

interface Project {
  id: number
  titulo: string
  descricao: string
  miniatura: string
  capa: string
  imagens: string[]
}

interface SidebarProps {
  selectedId: number | null
  onProjectSelect: (project: Project) => void
  onInfoClick: () => void
}

export default function Sidebar({ selectedId, onProjectSelect, onInfoClick }: SidebarProps) {
  return (
    <aside className="h-full w-full md:w-[38vh] bg-white border-r border-gray-200 p-5 overflow-y-auto rounded-r-2xl md:rounded-none">
      <header className="text-center mb-8">
        <h2 className="text-md font-semibold font-doto uppercase tracking-[0.6vh] mt-8 text-black">
          Guilherme Notolini
        </h2>
        <p className="text-sm font-inter text-gray-400 mt-1">Designer | Diretor de Arte</p>
      </header>

      {/* INFO */}
      <section
        className={`mb-8 cursor-pointer ${selectedId ? 'hidden sm:block' : ''}`} // se um projeto está selecionado, esconder Info no mobile
        onClick={onInfoClick}
      >
        <h3 className="font-inter text-xs uppercase text-gray-500 mb-2">Info</h3>
        <div className="bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition">
          <h4 className="font-inter text-sm font-semibold text-black mb-2">About us</h4>
          <p className="font-inter text-sm text-gray-500">
            We are a New York-based agency uniting strategy and design to make work that evolves
            with the world we live in.
          </p>
        </div>
      </section>

      {/* PROJETOS */}
      <section>
        <h3 className={`font-inter text-xs uppercase text-gray-500 mb-2 ${selectedId ? 'hidden sm:block' : ''}`}>
          Projetos
        </h3>

        {projetos.map((project) => {
          const isSelected = selectedId === project.id

          // Se existe selectedId e este projeto NÃO é o selecionado:
          // -> esconder no mobile: use classes 'hidden sm:flex' (hidden for <sm, flex for >=sm)
          const baseClass =
            selectedId && !isSelected ? 'hidden sm:flex' : 'flex' // show only selected on mobile

          return (
            <div
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className={`${baseClass} items-center gap-3 bg-gray-100 p-3 rounded-xl cursor-pointer hover:bg-gray-200 transition mb-3`}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Image
                  src={project.miniatura}
                  alt={project.titulo}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-inter text-sm font-semibold text-black">{project.titulo}</h4>
                  <p className="font-inter text-xs text-gray-700">Ver Mais</p>
                </div>
                <p className="font-inter text-xs text-gray-500">{project.descricao}</p>
              </div>
            </div>
          )
        })}
      </section>
    </aside>
  )
}
