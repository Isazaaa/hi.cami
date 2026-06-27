// Portfolio dataset — imágenes locales.
// `category` keys must match the filter ids in `categories`.
// Optional fields: `client`, `description`, `videoUrl` (renders an embed in the lightbox).

const base = '/images/'

export const categories = [
  { id: 'all', label: 'Todo' },
  { id: 'cortometraje', label: 'Cortometraje' },
  { id: 'documental', label: 'Documental' },
  { id: 'comercial', label: 'Comercial' },
]

export const projects = [
  {
    id: 'p1',
    title: 'Un Partido en el Barrio',
    category: 'cortometraje',
    year: '2026',
    location: 'Medellín, Co',
    aspect: 'wide',
    file: 'portadas/Un partido en el barrio.jpg',
    videoFile: '/videos/un-partido-en-el-barrio.mp4',
    description:
      'Los sueños también empiezan en una cancha de barrio.',
  },
  {
    id: 'p2',
    title: 'Memoria de la Mejor Mamita',
    category: 'documental',
    year: '2025',
    location: 'Antioquia, Co',
    aspect: 'wide',
    file: 'portadas/MEMORIA DE LA MEJOR MAMITA.png',
    videoFile: '/videos/memoria-de-la-mejor-mamita.mp4',
    description:
      'Algunas personas permanecen incluso cuando ya no están. Un retrato íntimo sobre la memoria, la familia y los recuerdos que sobreviven al tiempo.',
  },
  {
    id: 'p3',
    title: 'Dream Wear',
    category: 'comercial',
    year: '2026',
    location: 'Medellín, Co',
    client: 'Dream Wear',
    aspect: 'wide',
    file: 'portadas/Dream wear.jpg',
    videoFile: '/videos/dream-wear.mp4',
    description:
      'Una reinterpretación visual de la identidad de Dream Wear. Un ejercicio de dirección creativa donde la moda, la música y la cultura urbana se encuentran.',
  },
  {
    id: 'p4',
    title: 'ETAPA REINA',
    category: 'documental',
    year: '2020',
    location: 'Medellín, Co',
    aspect: 'wide',
    file: 'portadas/etapa reina.jpeg',
    videoUrl: 'https://youtu.be/LG56BLPr7FE?si=u1HAaeWf14bthCVP',
    description:
      'La pasión no entiende de edades, solo de personas que aún tienen algo por crear.',
  },
  {
    id: 'p5',
    title: 'Color Grading',
    category: 'cortometraje',
    year: '2026',
    location: 'Medellín, Co',
    aspect: 'wide',
    file: 'portadas/Color granding.jpg',
    videoFile: '/videos/color-grading.mp4',
    description:
      'El color no corrige una imagen. La transforma. Una exploración sobre cómo la luz, el contraste y el color también construyen emociones y narrativas.',
  },
  {
    id: 'p6',
    title: 'TRNAL',
    category: 'comercial',
    year: '2024',
    location: 'Antioquia, Co',
    aspect: 'wide',
    file: 'portadas/F1.jpg',
    videoFile: '/videos/trnal.mp4',
    description:
      'Proyectos inmobiliarios y territorios a mostrar su verdadero potencial desde una nueva perspectiva.',
  },
].map((p) => ({
  ...p,
  src: `${base}${p.file}`,
  placeholder: `${base}${p.file}`,
}))
