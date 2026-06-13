export type PatternType = 'spiral' | 'fractal' | 'wave' | 'circles' | 'voronoi' | 'noise'

export type TextureType = 'none' | 'dots' | 'lines' | 'crosshatch' | 'grain'

export type GradientType = 'none' | 'linear' | 'radial'

export interface BackgroundTexture {
  textureType: TextureType
  gradientType: GradientType
  textureOpacity: number
  gradientOpacity: number
  gradientAngle: number
  textureColor: string
  gradientColor1: string
  gradientColor2: string
}

export interface DesignParams {
  pattern: PatternType
  seed: number
  iterations: number
  scale: number
  rotation: number
  strokeWidth: number
  opacity: number
  bgColor: string
  palette: string[]
  width: number
  height: number
  bgTexture: BackgroundTexture
}

export interface ColorTheme {
  id: string
  name: string
  colors: string[]
  textureHint: string
  gradientHint: [string, string]
}
