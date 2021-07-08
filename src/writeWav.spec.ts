import * as path from 'path'
import { promises as fs } from 'fs'
import { readDmx } from './readDmx'
import { writeWav } from './writeWav'

describe('writeWav', () => {
    it('writes wave', async () => {
        const dmxbuffer = await fs.readFile(path.join(__dirname, 'dspistol.dmx'))
        const dmx = readDmx(dmxbuffer)
        const wave = writeWav(dmx)
        await fs.writeFile(path.join(__dirname, 'dspistol.wav'), wave)
    })
})
