'use client'
import galeria from '@/app/data/projetos.json'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface GaleriaGridProps {
  onSelectProject: (projectId: number) => void
}

export default function GaleriaPage({ onSelectProject }: GaleriaGridProps)  {
  const router = useRouter()
  const handleSelect = (id: number) => {
    // salva o id no localStorage
    localStorage.setItem('selectedProjectId', id.toString())
    // redireciona para a home e força reload completo
    window.location.href = '/'
  }
  return (
    <main className="min-h-screen bg-white p-6">
      <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-sm font-inter text-black  px-3 py-2 rounded-full cursor-pointer">Voltar</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {galeria.map((item) => (
          <div
            key={item.id} 
            className="overflow-hidden cursor-pointer"
            onClick={() => handleSelect(item.id)}
          >
            
            <Image
              src={item.capa}
              alt={item.titulo}
              width={600}
              height={400}
              className="object-cover w-full h-64 rounded-2xl"
            />
            <h4 className="pt-2 text-left font-medium font-inter text-black">{item.titulo}</h4>
            <p className="pb-4 text-left text-sm font-inter text-gray-500">{item.descricao}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
