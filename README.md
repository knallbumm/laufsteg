> :warning: **This library is still in an early stage of development and should therefore not be used productively at this point! Many things are either not yet implemented or not documented.**

<h1 align="center">laufsteg </h1>
<h4 align="center">Endless draggable carousel with focus on performance and usability.</h4>

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
- 🙏🏽 Framework agnostic (Works with React, Vue, Svelte & even with Vanilla JS/TS)
- 🎁 Many more little things that make developers happy

## Open TODOs / Currently not supported

- 📏 Variable cell sizes

## Demo Usecases

## Relevant Links

- [Full Documentation](https://docs.pinsel.xyz)
- [Examples](https://demo.pinsel.xyz)

## Installation

### Vanilla JS/TS

```bash
# pnpm
pnpm add laufband

# npm
npm i laufband
```

#### CDN

```html
<script src="https://unpkg.com/laufband"></script>
```

This exposes Laufband globally via `window.Laufband`

### React

```bash
# pnpm
pnpm add @laufband/react

# npm
npm i @laufband/react
```

### Vue

```bash
# pnpm
pnpm add @laufband/vue

# npm
npm i @laufband/vue
```

## Usage

The concrete usage depends on on the framework you are using.

For further information please have a look at the concrete adapters:

- [React](React)
- [Vue](Vue)

If you want to use Laufband without any framework, or want to write an adapter on your own, you only have to do two simple things:

### 1. Use this DOM Structure

```html
<div id="laufsteg-sample-1" className="laufsteg-container">
  <div className="laufsteg-trolley">
    <div className="laufsteg-cell">Your cell content goes here</div>
  </div>
</div>
```

There can be as many cells, as you want (with the same size). If there are not enough cells to fill the whole screen, Laufband will automatically duplicate cells.

### 2. Call `createLaufband()`

```ts
import { createLaufband } from 'laufband'
...
const options: LaufbandOptions = {...}
const container = document.getElementById("laufsteg-sample-1")
const laufband = createLaufband(container, options)
...
```

## Motivation

We were looking for a simple & performant libary for building endless carousels, but every libary we could find either focussed on very specific usecases, simply duplicated all the cells or simply felt not smooth enough.

The basic idea for this particular way of functioning of this Libary comes from a mentor of one of our team members.

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
