import DmxHeader from './DmxHeader'

export default interface Dmx {
    header: DmxHeader
    samples: Buffer
}
