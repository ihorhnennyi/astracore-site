import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import toIco from 'to-ico'

const dir = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(dir, '../public')
const svg = readFileSync(path.join(publicDir, 'favicon.svg'), 'utf8')

function renderPng(size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background: 'transparent',
  })

  return resvg.render().asPng()
}

const icon16 = renderPng(16)
const icon32 = renderPng(32)
const icon180 = renderPng(180)

writeFileSync(path.join(publicDir, 'favicon-16x16.png'), icon16)
writeFileSync(path.join(publicDir, 'favicon-32x32.png'), icon32)
writeFileSync(path.join(publicDir, 'favicon.png'), icon32)
writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), icon180)
writeFileSync(path.join(publicDir, 'favicon.ico'), await toIco([icon16, icon32]))

console.log('Favicons generated in public/')
