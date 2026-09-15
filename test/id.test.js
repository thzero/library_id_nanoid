import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import IdGenerator from '../index.js';
import openSource from '../openSource.js';

// Every library_id_* package implements the same contract, because
// library_common/utility/index.js delegates to whichever one is installed and
// cannot tell them apart. These tests are deliberately near-identical across the
// three packages - a divergence is the defect.
describe('the generator contract', () => {
	it('exposes every member the contract requires', () => {
		for (const member of [ 'generateId', 'generateLongId', 'generateShortId',
			'setAlphabet', 'setLengthLong', 'setLengthShort',
			'translateToShortId', 'translateToId' ])
			assert.equal(typeof IdGenerator[member], 'function', member);
	});

	it('generates a non-empty id', () => {
		for (const member of [ 'generateId', 'generateLongId', 'generateShortId' ]) {
			const id = IdGenerator[member]();
			assert.equal(typeof id, 'string', member);
			assert.ok(id.length > 0, member);
		}
	});

	it('generates a different id each time', () => {
		const ids = new Set();
		for (let i = 0; i < 500; i++)
			ids.add(IdGenerator.generateId());
		assert.equal(ids.size, 500);
	});

	// The round trip is what library_common's translateToId/translateToShortId
	// rely on. nanoid ids have no separate short form, so both directions are identity.
	it('round trips an id through the short form', () => {
		const id = IdGenerator.generateLongId();
		const short = IdGenerator.translateToShortId(id);
		assert.equal(typeof short, 'string', 'translateToShortId returns a string');
		assert.equal(IdGenerator.translateToId(short), id);
	});

	it('the setters do not throw, whatever the implementation does with them', () => {
		assert.doesNotThrow(() => IdGenerator.setLengthLong(24));
		assert.doesNotThrow(() => IdGenerator.setLengthShort(8));
		assert.doesNotThrow(() => IdGenerator.setAlphabet(null));
	});
});

describe('nanoid specifics', () => {
	it('honours a custom alphabet through setAlphabet', () => {
		try {
			IdGenerator.setAlphabet('AB');
			assert.match(IdGenerator.generateId(), /^[AB]+$/);
		}
		finally {
			IdGenerator.setAlphabet(null);
		}
	});

	it('honours the configured lengths', () => {
		try {
			IdGenerator.setLengthLong(24);
			IdGenerator.setLengthShort(8);
			assert.equal(IdGenerator.generateLongId().length, 24);
			assert.equal(IdGenerator.generateShortId().length, 8);
		}
		finally {
			IdGenerator.setLengthLong(null);
			IdGenerator.setLengthShort(16);
		}
	});

	// Known trap: init() builds a generator and hands it back, but does NOT install
	// it on the class - setAlphabet is the one that does. Pinning that so the name
	// does not mislead someone into calling init() and expecting it to take effect.
	it('init returns a generator without installing it', () => {
		const generator = IdGenerator.init('AB');
		assert.equal(typeof generator, 'function');
		assert.doesNotMatch(IdGenerator.generateId(), /^[AB]+$/, 'init did not change the class generator');
		assert.match(generator(4), /^[AB]{4}$/, 'but the returned generator does use the alphabet');
	});

	// translateTo* are identity: nanoid ids have no separate short form.
	it('translates as identity', () => {
		assert.equal(IdGenerator.translateToShortId('abc'), 'abc');
		assert.equal(IdGenerator.translateToId('abc'), 'abc');
	});
});

describe('openSource', () => {
	it('gives every entry a category, name, url and licence', () => {
		const entries = openSource();
		assert.ok(entries.length > 0);
		for (const entry of entries) {
			assert.ok([ 'client', 'server' ].includes(entry.category), entry.name);
			assert.ok(entry.name);
			assert.ok(entry.url, entry.name);
			assert.ok(entry.licenseName, entry.name);
			assert.ok(entry.licenseUrl, entry.name);
		}
	});

	it('lists this package under both categories', () => {
		const mine = openSource().filter(e => e.name === '@thzero/library_id_nanoid');
		assert.deepEqual(mine.map(e => e.category).sort(), [ 'client', 'server' ]);
	});
});
