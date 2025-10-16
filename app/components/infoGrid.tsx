'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function InfoGrid({  }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-2xl">
      {/* Imagem principal */}
      <div className="col-span-2">
        <Image
          src="/sala-reuniao.jpg" // substitua pela sua imagem
          alt="Sala de reunião"
          width={1000}
          height={600}
          className="rounded-2xl w-full h-auto object-cover"
        />
      </div>

      {/* Card pessoa 1 */}
      <div className="bg-gray-100 p-4 rounded-2xl flex flex-col items-start">
        <Image
          src="/guilherme.jpg"
          alt="Guilherme Notolini"
          width={300}
          height={300}
          className="rounded-2xl mb-3 object-cover w-full h-auto"
        />
        <h3 className="font-inter font-semibold text-black">Guilherme Notolini</h3>
        <p className="font-inter text-sm text-gray-600">Designer | Diretor de Arte</p>
        <p className="font-inter text-sm text-gray-500 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Lista de clientes */}
      <div className="bg-gray-100 p-4 rounded-2xl col-span-2">
        <h3 className="font-inter font-semibold text-black mb-2">Clientes</h3>
        <ul className="font-inter text-sm text-gray-500 space-y-5">
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
        </ul>
      </div>

      {/* Card pessoa 2 */}
      <div className="bg-gray-100 p-4 rounded-2xl shadow-sm flex flex-col items-start">
        <Image
          src="/familia.jpg"
          alt="Família Notolini"
          width={300}
          height={300}
          className="rounded-2xl mb-3 object-cover w-full h-auto"
        />
        <h3 className="font-semibold text-gray-900">Guilherme Notolini</h3>
        <p className="text-sm text-gray-600">Designer | Diretor de Arte</p>
        <p className="text-sm text-gray-500 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Contato */}
      <div className="bg-gray-100 p-4 rounded-2xl col-span-3 flex flex-wrap justify-between text-sm text-gray-700">
        <div>
          <h4 className="font-inter font-semibold mb-1 text-black">Contato</h4>
          <p className='font-inter text-gray-500'>Email: guilhermenotolini@gmail.com</p>
          <p className='font-inter text-gray-500'>Redes Sociais: <Link href={"https://www.instagram.com/guinotolini/"} className='hover:text-gray-800'>Instagram</Link> / <Link href={"https://www.instagram.com/guinotolini/"} className='hover:text-gray-800'>LinkedIn</Link></p>
          <p className='font-inter text-gray-500'>WhatsApp: 12 98885-2050</p>
        </div>
        <div>
          <h4 className="font-inter font-semibold mb-1 text-black">Vagas Disponíveis</h4>
          <p className='font-inter text-gray-500'>UX Designer</p>
        </div>
      </div>
    </div>
  )
}
