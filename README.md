![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_id_nanoid)
![David](https://img.shields.io/david/thzero/library_id_nanoid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_id_nanoid

Id generation for [@thzero/library_common](https://github.com/thzero/library_common),
backed by [nanoid](https://github.com/ai/nanoid).

The default — `library_common` depends on this one directly, so unless an
application swaps it out, this is what `Utility.generateId()` uses. Ids are URL
safe, 21 characters long and 16 short, on nanoid's default alphabet.

## Requirements

### NodeJs

[NodeJs](https://nodejs.org) version 22+

### Installation

[![NPM](https://nodei.co/npm/@thzero/library_id_nanoid.png?compact=true)](https://npmjs.org/package/@thzero/library_id_nanoid)

```
npm install @thzero/library_id_nanoid
```

Already a dependency of `@thzero/library_common`; install it explicitly only if
you import it directly.

#### Peer dependencies

None. [nanoid](https://github.com/ai/nanoid) is a direct dependency.

## What it provides

`index.js` — default export `IdGenerator`, a class of statics implementing the
generator contract `library_common` delegates to.

| Member | Behaviour |
|---|---|
| `generateId()` | `generateLongId()` |
| `generateLongId()` | 21 characters, or `_lengthLong` when set |
| `generateShortId()` | 16 characters, or `_lengthShort` when set |
| `setAlphabet(alphabet)` | Installs a `customAlphabet` generator. `null` restores the default |
| `setLengthLong(length)` / `setLengthShort(length)` | Set the lengths |
| `translateToShortId(id)` / `translateToId(id)` | **Identity.** nanoid ids have no separate short form |
| `init(alphabet)` | Builds and **returns** a generator — see below |

`openSource.js` — a default-exported function returning the licence manifest for
this package and nanoid, under both the `client` and `server` categories, for an
application's attribution page.

### `init` does not install anything

```js
IdGenerator.init('AB');          // returns a generator; the class is unchanged
IdGenerator.setAlphabet('AB');   // this is the one that takes effect
```

`init(alphabet)` returns `customAlphabet(alphabet)` and does not assign it to the
class, so calling it and expecting later `generateId()` calls to use that
alphabet is a trap the name invites. Use `setAlphabet`. `init` is useful only if
you want a standalone generator function of your own.

### Choosing lengths

Both lengths are a collision trade-off. Read
[nanoid's collision calculator](https://zelark.github.io/nano-id-cc) before
changing them or the alphabet — a short alphabet with a short length collides
much sooner than the defaults.

## Configuration

None. This package reads no configuration. Lengths and alphabet are set through
the API above.

## Wiring it up

Nothing to do — `library_common` already uses it. To set an alphabet or lengths:

```js
Utility.setIdGeneratorAlphabet(AppSharedConstants.IdGenerator.alphabet);
Utility.setIdGeneratorLengthLong(24);
Utility.setIdGeneratorLengthShort(8);
```

On the server these are reached through `BootMain`'s `_initIdGeneratorAlphabet`,
`_initIdGeneratorLengthLong` and `_initIdGeneratorLengthShort` hooks:

```js
class AppBootMain extends BootMain {
    _initIdGeneratorAlphabet() {
        return AppSharedConstants.IdGenerator.alphabet;
    }
}
```

### Swapping generators

The other two implementations of the same contract are
[library_id_shortuuid](https://github.com/thzero/library_id_shortuuid) (uuid v4
with a real 22-character short form) and
[library_id_uuid](https://github.com/thzero/library_id_uuid) (plain uuid v4).
Both are drop-in:

```js
import IdGenerator from '@thzero/library_id_shortuuid';

Utility.setIdGenerator(IdGenerator);
```

## Development

```
npm run lint       # eslint .
npm run lint:fix   # eslint . --fix
npm test           # node --test "test/*.test.js"
```
