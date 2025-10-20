'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  showInfo: boolean
  onProjectSelect: (project: Project) => void
  onInfoClick: () => void
}

export default function Sidebar({ selectedId, showInfo, onProjectSelect, onInfoClick }: SidebarProps) {
  return (
    <aside className="h-full w-full md:w-[38vh] bg-white border-r border-gray-200 p-5 overflow-y-auto rounded-r-2xl md:rounded-none">
      
      <Link href={"galeria"} className='bg-gray-100 hover:bg-gray-200 text-sm font-inter text-black  px-3 py-2 rounded-full cursor-pointer'>Todos os projetos</Link>
      {/* Cabeçalho */}
      <header onClick={() => window.location.reload()} className="text-center mt-10 mb-8 cursor-pointer">
        <button className="text-md font-semibold font-doto uppercase tracking-[0.6vh] mt-8 text-black">Guilherme Notolini</button>
        <p className="text-sm font-inter text-gray-400 mt-1">Designer | Diretor de Arte</p>
      </header>

      {/* Seção Info */}
      {/* Regras:
          - Se showInfo === true  => Info fica visível no mobile (flex) e clicável (toggle).
          - Se selectedId !== null => Info é escondido no mobile (porque um projeto está aberto).
          - No desktop (sm+), Info sempre aparece.
      */}
      <section
        // mobile: mostrar somente se showInfo true; se selectedId existe, esconder no mobile.
        className={`mb-8 cursor-pointer flex flex-col ${
          showInfo ? 'flex' : selectedId ? 'hidden sm:flex' : 'flex'
        }`}
        onClick={onInfoClick}
      >
        <h3 className="font-inter text-xs uppercase text-gray-500 mb-2">Info</h3>
        <div className="bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition w-full">
          <div className="flex justify-between items-center">
            <h4 className="font-inter text-sm font-semibold text-black mb-2">Sobre</h4>
            <p className="font-inter text-xs text-gray-700">Ver Mais</p>
          </div>
          <p className="font-inter text-sm text-gray-500">
            Marido, Pai, Designer e Diretor de arte.
          </p>
        </div>
      </section>

      {/* Lista de Projetos */}
      <section>
        <h3
          className={`font-inter text-xs uppercase text-gray-500 mb-2 ${
            (selectedId || showInfo) ? 'hidden sm:block' : ''
          }`}
        >
          Projetos
        </h3>

        {projetos.map((project) => {
          const isSelected = selectedId === project.id
          const hideOthers = Boolean(selectedId) || showInfo // se projeto selecionado ou showInfo aberto -> esconder os outros no mobile
          const baseClass = hideOthers && !isSelected ? 'hidden sm:flex' : 'flex'

          return (
            <div
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className={`${baseClass} items-center gap-3 bg-gray-100 p-3 rounded-xl cursor-pointer hover:bg-gray-200 transition mb-3`}
            >
              <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                <Image
                  src={project.miniatura}
                  alt={project.titulo}
                  width={100}
                  height={100}
                  className="object-contain rounded-xl"
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
