/* eslint-env browser */

// https://github.com/yjs/y-webrtc/blob/master/demo/index.js

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

const ydoc = new Y.Doc()
const provider = new WebrtcProvider('webrtc-test', ydoc, { signaling: ['ws://localhost:5555'] })
const yarray = ydoc.getArray()

provider.on('synced', synced => {
  // NOTE: This is only called when a different browser connects to this client
  // Windows of the same browser communicate directly with each other
  // Although this behavior might be subject to change.
  // It is better not to expect a synced event when using y-webrtc
  console.log('synced!', synced)
})

yarray.observeDeep(() => {
  console.log('yarray updated: ', yarray.toJSON())
})

// @ts-ignore
window.example = { provider, ydoc, yarray }
