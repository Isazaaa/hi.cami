// "Más allá del portafolio" — reels, ediciones y videoclips.
//
// Each item:
//   type      → 'reel' | 'edicion' | 'videoclip'  (shown as the tag)
//   shape     → 'vertical' (9:16) | 'horizontal' (16:9) | 'square' (1:1)
//   thumbnail → poster image (use a VERTICAL poster for vertical reels)
//   videoSrc  → optional muted .mp4 that plays on hover (desktop). Omit to show
//               the thumbnail only. Keep these short + lightweight.
//   url       → link to the full piece (Instagram / Vimeo / YouTube)
//
// The strip fixes a constant HEIGHT, so width follows each shape automatically:
// vertical reels read narrow, horizontal edits read wide — same row, no cropping.

export const reelTypes = {
  reel: 'Reel',
  edicion: 'Edición',
  videoclip: 'Videoclip',
}

export const reels = [
  {
    id: 'r1',
    type: 'reel',
    shape: 'vertical',
    title: 'Dream Wear',
    client: 'Marca · Streetwear',
    thumbnail: '/images/camila7.jpeg',
    // videoSrc: '/videos/reels/dream-wear-reel.mp4',
    url: '#',
  },
  {
    id: 'r2',
    type: 'edicion',
    shape: 'horizontal',
    title: 'Color Grading — Reel',
    client: 'Montaje & corrección de color',
    thumbnail: '/images/camila5.jpeg',
    // videoSrc: '/videos/reels/color-grading.mp4',
    url: '#',
  },
  {
    id: 'r3',
    type: 'reel',
    shape: 'vertical',
    title: 'Campaña Temporada',
    client: 'Marca · Lanzamiento',
    thumbnail: '/images/camila8.jpeg',
    url: '#',
  },
  {
    id: 'r4',
    type: 'videoclip',
    shape: 'horizontal',
    title: 'Sesión en Vivo',
    client: 'Artista · Música',
    thumbnail: '/images/camila6.jpeg',
    url: '#',
  },
  {
    id: 'r5',
    type: 'reel',
    shape: 'vertical',
    title: 'Contenido Orgánico',
    client: 'Marca · Social',
    thumbnail: '/images/camila4.jpeg',
    url: '#',
  },
  {
    id: 'r6',
    type: 'edicion',
    shape: 'horizontal',
    title: 'After Movie',
    client: 'Evento · Aftermovie',
    thumbnail: '/images/camila3.jpeg',
    url: '#',
  },
]
