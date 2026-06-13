import type { ColorTheme } from '../types'

export const THEMES: ColorTheme[] = [
  { id: 'sunset',  name: '日落',    colors: ['#ff6b35','#f7c59f','#efefd0','#004e89','#1a659e'], textureHint: '#f7c59f', gradientHint: ['#1a659e','#ff6b35'] },
  { id: 'ocean',   name: '海洋',    colors: ['#05445e','#75e6da','#189ab4','#d4f1f9','#22577a'], textureHint: '#75e6da', gradientHint: ['#05445e','#189ab4'] },
  { id: 'neon',    name: '霓虹',    colors: ['#ff00ff','#00ffff','#ffff00','#ff6600','#66ff00'], textureHint: '#00ffff', gradientHint: ['#ff00ff','#66ff00'] },
  { id: 'forest',  name: '森林',    colors: ['#1b4332','#2d6a4f','#40916c','#52b788','#95d5b2'], textureHint: '#52b788', gradientHint: ['#1b4332','#95d5b2'] },
  { id: 'mono',    name: '单色',    colors: ['#ffffff','#cccccc','#888888','#444444','#222222'], textureHint: '#888888', gradientHint: ['#222222','#cccccc'] },
  { id: 'pastel',  name: '糖果',    colors: ['#ffadad','#ffd6a5','#caffbf','#9bf6ff','#bdb2ff'], textureHint: '#ffd6a5', gradientHint: ['#bdb2ff','#ffadad'] },
  { id: 'fire',    name: '火焰',    colors: ['#ff0000','#ff6600','#ffcc00','#ff9900','#ff3300'], textureHint: '#ff6600', gradientHint: ['#ff3300','#ffcc00'] },
  { id: 'aurora',  name: '极光',    colors: ['#00ff87','#60efff','#0061ff','#c850c0','#ffcc70'], textureHint: '#60efff', gradientHint: ['#0061ff','#ffcc70'] },
]
