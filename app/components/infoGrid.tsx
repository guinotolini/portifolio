'use client'
import Image from 'next/image'
import Link from 'next/link'
import familia from '@/public/images/familia.jpg'
import guilherme from '@/public/images/guilherme.jpg'

export default function InfoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 bg-white rounded-2xl">
      {/* IMAGEM PRINCIPAL */}
      <div className="md:col-span-1">
        <Image
          src={familia}
          alt="Sala de reunião"
          width={400}
          height={400}
          className="rounded-2xl w-full h-full object-cover"
        />
      </div>

      {/* CARD PESSOA 1 */}
      <div className="bg-gray-100 p-5 rounded-2xl flex flex-col items-start">
        <Image
          src={guilherme}
          alt="Guilherme Notolini"
          width={400}
          height={400}
          className="rounded-2xl mb-3 object-cover w-full h-auto"
        />
        <h3 className="font-inter font-semibold text-black text-lg">Guilherme Notolini</h3>
        <p className="font-inter text-sm text-gray-600 mb-2">Designer | Diretor de Arte</p>
        <p className="font-inter text-sm text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* CARD PESSOA 2 */}
      <div className="bg-gray-100 p-5 rounded-2xl shadow-sm flex flex-col items-start">
        <h3 className="font-inter font-semibold text-black text-lg">Experiência Acadêmica</h3>
        <p className="font-inter text-sm text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* LISTA DE CLIENTES */}
      <div className="bg-gray-100 p-5 rounded-2xl md:col-span-3">
        <h3 className="font-inter font-semibold text-black mb-3 text-lg">Clientes</h3>
        <ul className="font-inter text-sm text-gray-500 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 sm:gap-y-2 md:gap-7">
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

      
      

      {/* CONTATO */}
      <div className="bg-gray-100 p-5 rounded-2xl md:col-span-3 flex flex-col sm:flex-row sm:justify-between gap-5 text-sm text-gray-700">
        <div>
          <h4 className="font-inter font-semibold mb-1 text-black text-base">Contato</h4>
          <p className="font-inter text-gray-500 mb-2">Email: guilhermenotolini@gmail.com</p>
          <p className="font-inter text-gray-500">
            Redes Sociais:{' '}
            <Link
              href="https://www.instagram.com/guinotolini/"
              target="_blank"
              className="hover:text-gray-800 underline"
            >
              Instagram
            </Link>{' '}
            /{' '}
            <Link
              href="https://www.linkedin.com/in/guilherme-notolini-%E2%9C%8A%F0%9F%8F%BD-771526234/"
              target="_blank"
              className="hover:text-gray-800 underline"
            >
              LinkedIn
            </Link>{' '}
            /{' '}
            <Link 
              href={"https://w.app/vmydph"} 
              className="font-inter text-gray-500 hover:text-gray-800 underline mt-2"
            >
              WhatsApp
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
