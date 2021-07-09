import { writeWav } from './writeWav'
import { readDmx } from './readDmx'

export const dmx2wav = (dmx: Buffer): Buffer => writeWav(readDmx(dmx))
