import { useDesignStore } from '../store/design'
import { THEMES } from '../themes/palettes'
import type { PatternType, TextureType, GradientType } from '../types'

const PATTERNS: { value: PatternType; label: string }[] = [
  { value: 'spiral',  label: '🌀 螺旋' },
  { value: 'fractal', label: '🌳 分形树' },
  { value: 'wave',    label: '🌊 波浪' },
  { value: 'circles', label: '⭕ 圆环' },
  { value: 'noise',   label: '🎲 噪声场' },
]

const TEXTURES: { value: TextureType; label: string }[] = [
  { value: 'none',       label: '无' },
  { value: 'dots',       label: '⬤ 圆点' },
  { value: 'lines',      label: '≡ 线条' },
  { value: 'crosshatch', label: '✕ 交叉' },
  { value: 'grain',      label: '▥ 颗粒' },
]

const GRADIENTS: { value: GradientType; label: string }[] = [
  { value: 'none',    label: '无' },
  { value: 'linear',  label: '↗ 线性' },
  { value: 'radial',  label: '◎ 径向' },
]

export default function Sidebar() {
  const store = useDesignStore()
  const bg = store.bgTexture

  return (
    <div className="w-72 bg-gray-900 border-l border-gray-700 p-4 overflow-y-auto flex flex-col gap-4">
      <h2 className="text-lg font-bold">🎨 SVG 海报设计器</h2>

      {/* Pattern */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">图案类型</label>
        <div className="grid grid-cols-2 gap-2">
          {PATTERNS.map(p => (
            <button key={p.value} onClick={() => store.setPattern(p.value)}
              className={`px-2 py-1.5 rounded text-xs font-medium ${store.pattern===p.value?'bg-indigo-600':'bg-gray-700 hover:bg-gray-600'}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">颜色主题</label>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map(t => (
            <button key={t.id} onClick={() => store.setTheme(t.id)}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-700 hover:bg-gray-600">
              <div className="flex">{t.colors.map((c,i) => (
                <div key={i} style={{background:c}} className="w-3 h-3 rounded-full" />
              ))}</div>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background Texture */}
      <div className="border-t border-gray-700 pt-3">
        <label className="text-xs text-gray-400 block mb-2">背景纹理</label>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {TEXTURES.map(t => (
            <button key={t.value} onClick={() => store.setBgTexture({ textureType: t.value })}
              className={`px-1.5 py-1 rounded text-xs font-medium ${bg.textureType===t.value?'bg-indigo-600':'bg-gray-700 hover:bg-gray-600'}`}>
              {t.label}
            </button>
          ))}
        </div>
        {bg.textureType !== 'none' && (
          <>
            <div className="mb-2">
              <label className="text-xs text-gray-400">纹理透明度: {bg.textureOpacity.toFixed(2)}</label>
              <input type="range" min={0.02} max={0.5} step={0.01} value={bg.textureOpacity}
                onChange={e => store.setBgTexture({ textureOpacity: Number(e.target.value) })}
                className="w-full accent-cyan-500 mt-1" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <label className="text-xs text-gray-400">纹理色</label>
              <input type="color" value={bg.textureColor}
                onChange={e => store.setBgTexture({ textureColor: e.target.value })}
                className="w-7 h-5 rounded cursor-pointer bg-transparent border border-gray-600" />
            </div>
          </>
        )}
      </div>

      {/* Background Gradient */}
      <div className="border-t border-gray-700 pt-3">
        <label className="text-xs text-gray-400 block mb-2">渐变底纹</label>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {GRADIENTS.map(g => (
            <button key={g.value} onClick={() => store.setBgTexture({ gradientType: g.value })}
              className={`px-1.5 py-1 rounded text-xs font-medium ${bg.gradientType===g.value?'bg-indigo-600':'bg-gray-700 hover:bg-gray-600'}`}>
              {g.label}
            </button>
          ))}
        </div>
        {bg.gradientType !== 'none' && (
          <>
            <div className="mb-2">
              <label className="text-xs text-gray-400">渐变透明度: {bg.gradientOpacity.toFixed(2)}</label>
              <input type="range" min={0.05} max={0.8} step={0.05} value={bg.gradientOpacity}
                onChange={e => store.setBgTexture({ gradientOpacity: Number(e.target.value) })}
                className="w-full accent-violet-500 mt-1" />
            </div>
            {bg.gradientType === 'linear' && (
              <div className="mb-2">
                <label className="text-xs text-gray-400">渐变角度: {bg.gradientAngle}°</label>
                <input type="range" min={0} max={360} step={5} value={bg.gradientAngle}
                  onChange={e => store.setBgTexture({ gradientAngle: Number(e.target.value) })}
                  className="w-full accent-violet-500 mt-1" />
              </div>
            )}
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center gap-1">
                <label className="text-xs text-gray-400">起</label>
                <input type="color" value={bg.gradientColor1}
                  onChange={e => store.setBgTexture({ gradientColor1: e.target.value })}
                  className="w-7 h-5 rounded cursor-pointer bg-transparent border border-gray-600" />
              </div>
              <div className="flex items-center gap-1">
                <label className="text-xs text-gray-400">止</label>
                <input type="color" value={bg.gradientColor2}
                  onChange={e => store.setBgTexture({ gradientColor2: e.target.value })}
                  className="w-7 h-5 rounded cursor-pointer bg-transparent border border-gray-600" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Seed */}
      <div className="border-t border-gray-700 pt-3">
        <label className="text-xs text-gray-400">种子: {store.seed}</label>
        <div className="flex gap-2 mt-1">
          <input type="range" min={0} max={99999} value={store.seed}
            onChange={e => store.setParam('seed', Number(e.target.value))} className="flex-1 accent-indigo-500" />
          <button onClick={() => store.randomSeed()} className="px-2 bg-indigo-600 rounded text-xs">🎲</button>
        </div>
      </div>

      {/* Iterations */}
      <div>
        <label className="text-xs text-gray-400">迭代数: {store.iterations}</label>
        <input type="range" min={10} max={500} step={10} value={store.iterations}
          onChange={e => store.setParam('iterations', Number(e.target.value))} className="w-full accent-purple-500" />
      </div>

      {/* Scale */}
      <div>
        <label className="text-xs text-gray-400">缩放: {store.scale.toFixed(2)}</label>
        <input type="range" min={0.1} max={3} step={0.1} value={store.scale}
          onChange={e => store.setParam('scale', Number(e.target.value))} className="w-full accent-green-500" />
      </div>

      {/* Rotation */}
      <div>
        <label className="text-xs text-gray-400">旋转: {store.rotation}°</label>
        <input type="range" min={0} max={360} step={5} value={store.rotation}
          onChange={e => store.setParam('rotation', Number(e.target.value))} className="w-full accent-yellow-500" />
      </div>

      {/* Stroke */}
      <div>
        <label className="text-xs text-gray-400">描边: {store.strokeWidth.toFixed(1)}</label>
        <input type="range" min={0.5} max={5} step={0.5} value={store.strokeWidth}
          onChange={e => store.setParam('strokeWidth', Number(e.target.value))} className="w-full accent-orange-500" />
      </div>

      {/* Opacity */}
      <div>
        <label className="text-xs text-gray-400">透明度: {store.opacity.toFixed(2)}</label>
        <input type="range" min={0.1} max={1} step={0.05} value={store.opacity}
          onChange={e => store.setParam('opacity', Number(e.target.value))} className="w-full accent-pink-500" />
      </div>

      {/* Export */}
      <div className="flex gap-2 mt-2">
        <button onClick={() => store.exportSvg()} className="flex-1 py-2 bg-teal-600 rounded text-sm font-medium">⬇ SVG</button>
        <button onClick={() => store.exportPng()} className="flex-1 py-2 bg-rose-600 rounded text-sm font-medium">⬇ PNG</button>
      </div>
    </div>
  )
}
