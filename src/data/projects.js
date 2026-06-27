// Portfolio dataset — imágenes locales.
// `category` keys must match the filter ids in `categories`.

const base = '/images/'

export const categories = [
  { id: 'all', label: 'Todo' },
  { id: 'commercial', label: 'Comercial' },
  { id: 'portrait', label: 'Retrato' },
  { id: 'video', label: 'Video' },
]

export const projects = [
  {
    id: 'p1',
    title: 'Concreto / Sombra',
    category: 'commercial',
    year: '2025',
    location: 'Medellín, CO',
    aspect: 'wide',
    file: 'camila3.jpeg',
  },
  {
    id: 'p2',
    title: 'Núcleo',
    category: 'portrait',
    year: '2025',
    location: 'Estudio',
    aspect: 'wide',
    file: 'camila4.jpeg',
  },
  {
    id: 'p3',
    title: 'Editorial Mónaco',
    category: 'commercial',
    year: '2024',
    location: 'Bogotá, CO',
    aspect: 'wide',
    file: 'camila5.jpeg',
  },
  {
    id: 'p4',
    title: 'Movimiento 02',
    category: 'video',
    year: '2025',
    location: 'Cali, CO',
    aspect: 'wide',
    file: 'camila6.jpeg',
  },
  {
    id: 'p5',
    title: 'Hormigón',
    category: 'commercial',
    year: '2024',
    location: 'Medellín, CO',
    aspect: 'wide',
    file: 'camila7.jpeg',
  },
  {
    id: 'p6',
    title: 'Retrato I',
    category: 'portrait',
    year: '2025',
    location: 'Estudio',
    aspect: 'wide',
    file: 'camila8.jpeg',
  },
].map((p) => ({
  ...p,
  src: `${base}${p.file}`,
  placeholder: `${base}${p.file}`,
}))
