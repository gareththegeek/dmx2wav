# mus2midi

A library for converting dmx format pcm audio files found in Doom wads to wave format.

Thanks to the following resources for helping me figure this out:

- [Doom wiki](https://doomwiki.org/wiki/Sound)

## Installation

```bash
yarn add dmx2wav
```
or
```bash
npm install --save dmx2wav
```

## Usage Example

Reading the file `dspistol.dmx`, converting to wave and writing out to `dspistol.wav`.

```typescript
import { promises as fs } from 'fs'
import { dmx2wav } from 'dmx2wav'

(async () => {
    const dmx = await fs.readFile('dspistol.dmx')
    const wav = dmx2wav(dmx)
    await fs.write('dspistol.wav', wav)
})()
```

## Build

```bash
yarn
yarn build
```
