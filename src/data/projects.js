// Portfolio dataset — imágenes locales.
// `category` keys must match the filter ids in `categories`.
// Optional fields: `client`, `description`, `videoUrl` (renders an embed in the lightbox).

const base = '/images/'

export const categories = [
  { id: 'all', label: 'Todo' },
  { id: 'documental', label: 'Documental' },
  { id: 'comercial', label: 'Comercial' },
]

export const projects = [
  {
    id: 'p1',
    title: 'Aves de Paso',
    category: 'documental',
    year: '2024',
    location: 'Costa Rica',
    aspect: 'wide',
    file: 'camila3.jpeg',
    description:
      'Estudio del litoral y su fauna: pelícanos en vuelo sobre una bahía rocosa, capturados en la quietud de la media mañana.',
  },
  {
    id: 'p2',
    title: 'La Orilla',
    category: 'documental',
    year: '2025',
    location: 'California',
    aspect: 'wide',
    file: 'camila4.jpeg',
    description:
      'Una historia íntima frente al agua. El gesto mínimo de dos personas que miran el mismo horizonte.',
  },
  {
    id: 'p3',
    title: 'Un Partido en el Barrio',
    category: 'documental',
    year: '2024',
    location: 'Medellín, CO',
    aspect: 'wide',
    file: 'camila5.jpeg',
    description:
      'Cortometraje documental sobre el fútbol de barrio como ritual. La camiseta tendida sobre la ciudad como bandera.',
  },
  {
    id: 'p4',
    title: 'Sesión Nocturna',
    category: 'comercial',
    year: '2025',
    location: 'Medellín, CO',
    aspect: 'wide',
    file: 'camila6.jpeg',
    description:
      'Dirección de fotografía low-key: vinilo, whisky y cartas. Una pieza de atmósfera construida con luz mínima.',
  },
  {
    id: 'p5',
    title: 'DreamWear · Encendido',
    category: 'comercial',
    year: '2025',
    location: 'Medellín, CO',
    client: 'DreamWear',
    aspect: 'wide',
    file: 'camila7.jpeg',
    description:
      'Campaña de marca para DreamWear. Detalle, textura y actitud en clave nocturna para una línea de streetwear.',
  },
  {
    id: 'p6',
    title: 'DreamWear · Carmesí',
    category: 'comercial',
    year: '2025',
    location: 'Medellín, CO',
    client: 'DreamWear',
    aspect: 'wide',
    file: 'camila8.jpeg',
    description:
      'Pieza de cierre de la campaña DreamWear: un lavado carmesí, movimiento y logotipo como firma visual.',
  },
].map((p) => ({
  ...p,
  src: `${base}${p.file}`,
  placeholder: `${base}${p.file}`,
}))
