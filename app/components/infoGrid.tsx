'use client'
import Image from 'next/image'
import Link from 'next/link'
import familia from '@/public/images/familia.jpg'
import guilherme from '@/public/images/guilherme.jpg'

export default function InfoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-white rounded-2xl">
      
      {/* IMAGENS SUPERIORES */}
      <div className="rounded-2xl overflow-hidden">
        <Image
          src={familia}
          alt="Família"
          width={600}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="rounded-2xl overflow-hidden">
        <Image
          src={guilherme}
          alt="Guilherme Notolini"
          width={600}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>

      {/* BLOCO CLIENTES */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h3 className="font-inter font-semibold text-black mb-3 text-lg">Clientes</h3>
        <ul className="font-inter text-sm text-gray-600 leading-relaxed space-y-1">
          <li>Liberty Seguros</li>
          <li>EDP</li>
          <li>Samsung</li>
          <li>Sky TV</li>
          <li>Google</li>
          <li>Huggies / Plenitud</li>
          <li>Intimus / Kotex</li>
          <li>Brastemp / Consul</li>
          <li>Rede Record</li>
          <li>Giraffas</li>
          <li>Tokio Marine Hall</li>
          <li>Casas Bahia</li>
        </ul>
      </div>

      {/* BLOCO FORMAÇÃO */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h3 className="font-inter font-semibold text-black mb-3 text-lg">Formação</h3>
        <ul className="font-inter text-sm text-gray-600 leading-relaxed space-y-2">
          <li>Propaganda e Marketing (UNIP - 2012 – 2015)</li>
          <li>Adobe CS6 AI/PS/ID (Senac 2014)</li>
          <li>Criação Publicitária (Escola Cuca 2016)</li>
          <li>Branding Essencial (Laje / Ana Couto 2023)</li>
          <li>Gestão de Tecnologia da Informação (ETEP – cursando)</li>
        </ul>
      </div>

      {/* BLOCO CONTATO */}
      <div className="bg-gray-100 p-6 rounded-2xl md:col-span-2 text-sm text-gray-700">
        <h4 className="font-inter font-semibold mb-2 text-black text-base">Contato</h4>
        <p className="font-inter text-gray-600 mb-2">
          Email:{' '}
          <Link
            href="mailto:guilhermenotolini@gmail.com"
            className="underline hover:text-gray-800"
          >
            guilhermenotolini@gmail.com
          </Link>
        </p>
        <p className="font-inter text-gray-600">
          Redes Sociais:{' '}
          <Link
            href="https://www.instagram.com/guinotolini/"
            target="_blank"
            className="underline hover:text-gray-800"
          >
            Instagram
          </Link>{' '}
          /{' '}
          <Link
            href="https://www.linkedin.com/in/guilherme-notolini-%E2%9C%8A%F0%9F%8F%BD-771526234/"
            target="_blank"
            className="underline hover:text-gray-800"
          >
            LinkedIn
          </Link>{' '}
          /{' '}
          <Link
            href="https://w.app/vmydph"
            target="_blank"
            className="underline hover:text-gray-800"
          >
            WhatsApp
          </Link>
        </p>
      </div>
    </div>
  )
}
