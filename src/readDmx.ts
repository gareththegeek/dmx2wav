import Dmx from './interfaces/Dmx'
import DmxHeader from './interfaces/DmxHeader'

const SoundHeadOffset = {
    format: 0,
    sampleRate: 2,
    sampleCount: 4,
    samples: 18
}

const PaddingByteCount = 32

const readDmxHeader = (buffer: Buffer): DmxHeader => {
    const format = buffer.readInt16LE(SoundHeadOffset.format)
    const sampleRate = buffer.readInt16LE(SoundHeadOffset.sampleRate)
    const sampleCount = buffer.readInt16LE(SoundHeadOffset.sampleCount)

    return {
        format,
        sampleRate,
        start: SoundHeadOffset.samples,
        sampleCount: sampleCount - PaddingByteCount
    }
}

enum AudioFormat {
    Pcm = 3
}

export const readDmx = (buffer: Buffer): Dmx => {
    const header = readDmxHeader(buffer)

    if (header.format !== AudioFormat.Pcm) {
        throw new Error(`Unsupported audio format ${header.format}`)
    }

    const samples = buffer.slice(header.start, header.start + header.sampleCount)

    return {
        header,
        samples
    }
}
