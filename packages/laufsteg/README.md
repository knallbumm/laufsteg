<img src="./laufsteg-header-image.jpg"/>

<h1 align="center" style="margin-top:1rem">laufsteg.js</h1>
<h4 align="center">Endless draggable carousel with focus on performance & usability.</h4>

<p align="center" style="margin-top:0.5rem">
  <a href="https://badge.fury.io/js/laufsteg">
    <img src="https://badge.fury.io/js/laufsteg.svg">
  </a>
</p>

## Features

- 💈 Endless horizontal scrolling in both directions
- 🤖 Automatic scrolling (with adjustable speed) & User scrolling
- ⚡️ Optimized for Performance (efficient reordering & CPU/GPU Usage)
- 🧈 Buttery smooooooooth
- 📱 Support for Touch-Devices
- 🙏🏽 Framework agnostic (Works with [React](https://github.com/knallbumm/laufsteg/tree/main/packages/laufsteg-react), Vue, Svelte & even with Vanilla JS/TS)
- 🎁 Many more little things that make developers happy

## Open TODOs / Currently not supported

If you want to help us with this, please have a look at our [Contribution](#contributing) section

- 📏 Variable cell sizes
- 🔥 Updating options after initializing

## Relevant Links

- [Full Documentation](https://knallbumm.github.io/laufsteg/)

## Installation

### Vanilla JS/TS

```bash
# pnpm
pnpm add laufsteg

# npm
npm i laufsteg
```

#### CDN

```html
<script src="https://unpkg.com/laufsteg"></script>
```

This exposes laufsteg globally via `window.laufsteg`

### React

```bash
# pnpm
pnpm add laufsteg-react

# npm
npm i laufsteg-react
```

### Vue

```bash
# pnpm
pnpm add laufsteg-vue

# npm
npm i laufsteg-vue
```

## Usage

The concrete usage depends on on the framework you are using.

For further information please have a look at the concrete adapters:

- [React](React)
- [Vue](Vue)

If you want to use laufsteg without any framework, or want to write an adapter on your own, you only have to do two simple things:

### 1. Use this DOM Structure

```html
<div id="laufsteg-sample-1" className="laufsteg-container">
  <div className="laufsteg-trolley">
    <div className="laufsteg-cell">Your cell content goes here</div>
  </div>
</div>
```

There can be as many cells, as you want (with the same size). If there are not enough cells to fill the whole screen, laufsteg will automatically duplicate cells.

### 2. Call `createLaufsteg()`

```ts
import { createLaufsteg } from 'laufsteg'
...
const options: laufstegOptions = {...}
const container = document.getElementById("laufsteg-sample-1")
const laufsteg = createLaufsteg(container, options)
...
```

## Motivation

We wanted to have a library with which we could easily create an infinite carousel in both directions. On the one hand, this should be able to scroll automatically, but the users should also be able to interact with it.

It was also very important to us to have a really smooth user experience, for which not least a great performance is necessary. Because we couldn't find a library that could offer us exactly that, we decided to write our own.

## Support us

### Contributing

If you want to contribute to Laufsteg, please either open a PR directly, or send a short email with your plans to [hello@smunzl.com](mailto:hello@smunzl.com)

We are sure that Laufsteg can be improved a lot and we are looking forward to your ideas!

### Sponsoring

If you appreciate our work, we would of course be very proud if you supported us with a small donation:
<br/>
<a href="https://www.buymeacoffee.com/quintusluis"><img height="38" style="margin-top:10px" src="https://img.buymeacoffee.com/button-api/?text=Make us happy&emoji=✅&slug=quintusluis&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>

## Crew

This project is initiated and maintained by the crew behind [smunzl](https://smunzl.com): a service to send unique digital greeting cards.

## License

This project is licensed under the MIT license. Feel free to edit and distribute this template as you like.

See LICENSE for more information.
