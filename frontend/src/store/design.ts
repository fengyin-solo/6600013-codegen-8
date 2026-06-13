import { create } from 'zustand'
import type { DesignParams, PatternType, BackgroundTexture } from '../types'
import { THEMES } from '../themes/palettes'

const DEFAULT_BG_TEXTURE: BackgroundTexture = {
  textureType: 'none',
  gradientType: 'none',
  textureOpacity: 0.15,
  gradientOpacity: 0.3,
  gradientAngle: 135,
  textureColor: THEMES[0].textureHint,
  gradientColor1: THEMES[0].gradientHint[0],
  gradientColor2: THEMES[0].gradientHint[1],
}

interface DesignStore extends DesignParams {
  svgContent: string
  setParam: <K extends keyof DesignParams>(key: K, value: DesignParams[K]) => void
  setPattern: (p: PatternType) => void
  setTheme: (id: string) => void
  setBgTexture: (patch: Partial<BackgroundTexture>) => void
  randomSeed: () => void
  setSvgContent: (s: string) => void
  exportSvg: () => void
  exportPng: () => void
}

export const useDesignStore = create<DesignStore>((set, get) => ({
  pattern: 'spiral',
  seed: 42,
  iterations: 200,
  scale: 1.0,
  rotation: 0,
  strokeWidth: 1.5,
  opacity: 0.8,
  bgColor: '#030712',
  palette: THEMES[0].colors,
  width: 800,
  height: 1000,
  bgTexture: { ...DEFAULT_BG_TEXTURE },
  svgContent: '',
  setParam: (key, value) => set({ [key]: value } as any),
  setPattern: (p) => set({ pattern: p }),
  setTheme: (id) => {
    const theme = THEMES.find(t => t.id === id)
    if (!theme) return
    const current = get().bgTexture
    set({
      palette: theme.colors,
      bgTexture: {
        ...current,
        textureColor: theme.textureHint,
        gradientColor1: theme.gradientHint[0],
        gradientColor2: theme.gradientHint[1],
      },
    })
  },
  setBgTexture: (patch) => {
    set({ bgTexture: { ...get().bgTexture, ...patch } })
  },
  randomSeed: () => set({ seed: Math.floor(Math.random() * 99999) }),
  setSvgContent: (s) => set({ svgContent: s }),
  exportSvg: () => {
    const { svgContent } = get()
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `art-${get().seed}.svg`; a.click()
    URL.revokeObjectURL(url)
  },
  exportPng: () => {
    const { svgContent, width, height } = get()
    const canvas = document.createElement('canvas')
    canvas.width = width; canvas.height = height
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      canvas.toBlob(blob => {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob!)
        a.download = `art-${get().seed}.png`; a.click()
      })
    }
    img.src = url
  },
}))
