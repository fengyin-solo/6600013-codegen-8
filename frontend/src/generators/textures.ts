import type { TextureType, GradientType, BackgroundTexture } from '../types'

export function generateTextureLayer(
  w: number, h: number, bg: BackgroundTexture
): string {
  const parts: string[] = []
  const defs: string[] = []

  if (bg.gradientType !== 'none') {
    const grad = generateGradientDef(w, h, bg)
    defs.push(grad.def)
    parts.push(`<rect width="${w}" height="${h}" fill="url(#${grad.id})" opacity="${bg.gradientOpacity}"/>`)
  }

  if (bg.textureType !== 'none') {
    const tex = generateTexturePatternDef(bg)
    defs.push(tex.def)
    parts.push(`<rect width="${w}" height="${h}" fill="url(#${tex.id})" opacity="${bg.textureOpacity}"/>`)
  }

  if (defs.length === 0 && parts.length === 0) return ''

  const defsBlock = defs.length > 0 ? `<defs>${defs.join('')}</defs>` : ''
  return `${defsBlock}${parts.join('')}`
}

function generateGradientDef(
  w: number, h: number, bg: BackgroundTexture
): { id: string; def: string } {
  const id = 'bg-grad'
  const angle = (bg.gradientAngle * Math.PI) / 180
  const cx = w / 2, cy = h / 2
  const len = Math.sqrt(w * w + h * h) / 2

  if (bg.gradientType === 'radial') {
    const def = `<radialGradient id="${id}" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${bg.gradientColor1}"/>
      <stop offset="100%" stop-color="${bg.gradientColor2}"/>
    </radialGradient>`
    return { id, def }
  }

  const x1 = cx - Math.cos(angle) * len
  const y1 = cy - Math.sin(angle) * len
  const x2 = cx + Math.cos(angle) * len
  const y2 = cy + Math.sin(angle) * len

  const def = `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${bg.gradientColor1}"/>
    <stop offset="100%" stop-color="${bg.gradientColor2}"/>
  </linearGradient>`
  return { id, def }
}

function generateTexturePatternDef(bg: BackgroundTexture): { id: string; def: string } {
  const id = 'bg-tex'
  const color = bg.textureColor

  switch (bg.textureType) {
    case 'dots': {
      const size = 8
      const r = 1
      const def = `<pattern id="${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${color}"/>
      </pattern>`
      return { id, def }
    }
    case 'lines': {
      const gap = 6
      const def = `<pattern id="${id}" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse">
        <line x1="0" y1="${gap / 2}" x2="${gap}" y2="${gap / 2}" stroke="${color}" stroke-width="0.5"/>
      </pattern>`
      return { id, def }
    }
    case 'crosshatch': {
      const gap = 8
      const def = `<pattern id="${id}" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="${gap}" y2="${gap}" stroke="${color}" stroke-width="0.4"/>
        <line x1="${gap}" y1="0" x2="0" y2="${gap}" stroke="${color}" stroke-width="0.4"/>
      </pattern>`
      return { id, def }
    }
    case 'grain': {
      const size = 100
      let rects = ''
      const pseudo = (n: number) => {
        let v = n
        return () => {
          v = (v * 16807 + 7) % 2147483647
          return v / 2147483647
        }
      }
      const rng = pseudo(12345)
      for (let y = 0; y < size; y += 2) {
        for (let x = 0; x < size; x += 2) {
          if (rng() < 0.5) {
            const o = (rng() * 0.3 + 0.05).toFixed(2)
            rects += `<rect x="${x}" y="${y}" width="2" height="2" fill="${color}" opacity="${o}"/>`
          }
        }
      }
      const def = `<pattern id="${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse">${rects}</pattern>`
      return { id, def }
    }
    default:
      return { id, def: '' }
  }
}

export function adjustBrightness(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v * factor)))
  return '#' + [clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, '0')).join('')
}
