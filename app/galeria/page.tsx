import galeria from '@/app/data/projetos.json'
import Image from 'next/image'
import Link from 'next/link'

export default function GaleriaPage() {
  return (
    <main className="min-h-screen bg-white p-6">
      <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-sm font-inter text-black  px-3 py-2 rounded-full cursor-pointer">Voltar</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {galeria.map((item) => (
          <div key={item.id} className="overflow-hidden">
            <Image
              src={item.capa}
              alt={item.titulo}
              width={600}
              height={400}
              className="object-cover w-full h-64 rounded-2xl"
            />
            <h4 className="pt-2 text-left font-medium font-inter text-black">{item.titulo}</h4>
            <p className="pb-4 text-left text-sm font-inter text-black">{item.descricao}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
