const Buffer = require('buffer/').Buffer
import Dmx from './interfaces/Dmx'

const RiffChunkSize = 12
const FormatChunkSize = 24
const DataChunkSize = 8

const RiffChunkOffsets = {
    riffSignature: 0,
    length: 4,
    waveSignature: 8
}

const FormatChunkOffsets = {
    signature: 0,
    length: 4,
    format: 8,
    channels: 10,
    sampleRate: 12,
    byteRate: 16,
    align: 20,
    bitsPerSample: 22
}

const DataChunkOffsets = {
    signature: 0,
    length: 4,
    data: 8
}

const Signatures = {
    riff: 'RIFF',
    wave: 'WAVE',
    format: 'fmt ',
    data: 'data'
}

const PcmFormat = 1

const writeRiffChunk = (buffer: Buffer): void => {
    const pos = 0
    buffer.write(Signatures.riff, pos + RiffChunkOffsets.riffSignature, 'utf-8')
    buffer.writeUInt32LE(buffer.length, pos + RiffChunkOffsets.length)
    buffer.write(Signatures.wave, pos + RiffChunkOffsets.waveSignature, 'utf-8')
}

const writeFormatChunk = (buffer: Buffer, sampleRate: number): void => {
    const pos = RiffChunkSize
    buffer.write(Signatures.format, pos + FormatChunkOffsets.signature)
    buffer.writeUInt32LE(16, pos + FormatChunkOffsets.length)
    buffer.writeUInt16LE(PcmFormat, pos + FormatChunkOffsets.format)
    buffer.writeUInt16LE(1, pos + FormatChunkOffsets.channels)
    buffer.writeUInt32LE(sampleRate, pos + FormatChunkOffsets.sampleRate)
    buffer.writeUInt16LE(1, pos + FormatChunkOffsets.align)
    buffer.writeUInt16LE(8, pos + FormatChunkOffsets.bitsPerSample)
}

const writeDataChunk = (buffer: Buffer, dmx: Dmx): void => {
    const pos = RiffChunkSize + FormatChunkSize
    buffer.write(Signatures.data, pos + DataChunkOffsets.signature)
    buffer.writeUInt32LE(dmx.samples.length, pos + DataChunkOffsets.length)
    dmx.samples.copy(buffer, pos + DataChunkOffsets.data)
}

export const writeWav = (dmx: Dmx): Buffer => {
    const length = RiffChunkSize + FormatChunkSize + DataChunkSize + dmx.samples.length
    const buffer = Buffer.alloc(length)

    writeRiffChunk(buffer)
    writeFormatChunk(buffer, dmx.header.sampleRate)
    writeDataChunk(buffer, dmx)

    return buffer
}
