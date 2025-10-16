'use client'

import Image from 'next/image'
import projetos from '@/app/data/projetos.json'

interface GaleriaGridProps {
  onSelectProject: (projectId: number) => void
}

export default function GaleriaGrid({ onSelectProject }: GaleriaGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projetos.map((item) => (
        <div
          key={item.id}
          className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => onSelectProject(item.id)}
        >
          <Image
            src={item.capa}
            alt={item.titulo}
            width={600}
            height={400}
            className="object-cover w-full h-64"
          />
          <div className="absolute bottom-0 bg-black bg-opacity-50 text-white w-full text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {item.titulo}
          </div>
        </div>
      ))}
    </div>
  )
}
