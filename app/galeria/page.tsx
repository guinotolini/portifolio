import galeria from '@/app/data/projetos.json'
import Image from 'next/image'
import Link from 'next/link'

export default function GaleriaPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Link href="/" className="text-blue-600 underline mb-4 block">← Voltar para Home</Link>
      <h1 className="text-3xl font-bold text-center mb-8">Galeria Completa</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {galeria.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-2xl shadow-md">
            <Image
              src={item.capa}
              alt={item.titulo}
              width={600}
              height={400}
              className="object-cover w-full h-64"
            />
            <div className="bg-white p-4 text-center font-medium">{item.titulo}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
