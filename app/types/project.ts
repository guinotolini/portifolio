export interface ProjectBlock {
  layout: 'full' | 'grid' | 'mosaic' | 'vertical'
  imagens: string[]
}

export interface Project {
  id: number
  titulo: string
  descricao: string
  miniatura: string
  capa: string
  imagens?: string[] // opcional — compatibilidade
  blocos: ProjectBlock[]
}
