import { browser } from '$app/environment';
import { Buffer } from 'buffer';

// declare let Buffer: typeof BufferPolyfill;
// globalThis.Buffer = BufferPolyfill;
// console.log('buffer', Buffer.from('foo', 'hex'));


if (browser) {
	window.global = window.global ?? window;
	window.Buffer = window.Buffer ?? Buffer;
	window.process = window.process ?? { env: {} };
}

export {};
