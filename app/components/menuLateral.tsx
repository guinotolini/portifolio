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
  onProjectSelect: (project: Project) => void
  onInfoClick: () => void
}

export default function Sidebar({ onProjectSelect, onInfoClick }: SidebarProps) {
  return (
    <aside className="fixed md:static top-0 left-0 h-full w-[38vh] bg-white border-r border-gray-200 p-5 overflow-y-auto rounded-r-2xl transform transition-transform duration-500">
      <header className="text-center mb-8">
        <h2 className="text-md font-semibold font-doto uppercase tracking-[0.6vh] mt-24 text-black">Guilherme Notolini</h2>
        <p className="text-sm font-inter text-gray-400 mt-1">Designer | Diretor de Arte</p>
      </header>

      {/* INFO */}
      <section className="mb-8 cursor-pointer" onClick={onInfoClick}>
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
        <h3 className="font-inter text-xs uppercase text-gray-500 mb-2">Projetos</h3>
        {projetos.map((project) => (
          <div
            key={project.id}
            onClick={() => onProjectSelect(project)}
            className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl cursor-pointer hover:bg-gray-200 transition mb-3"
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
            <div>
              <div className="flex">
                <h4 className="font-inter text-sm font-semibold text-black">{project.titulo}</h4>
                <p className='font-inter absolute left-[28.5vh] text-sm text-gray-700'>Ver Mais</p>
              </div>
              <p className="font-inter text-xs text-gray-500">{project.descricao}</p>
            </div>
          </div>
        ))}
      </section>
    </aside>
  )
}
