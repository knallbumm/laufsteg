---
title: Basic Usage
---

# Basic Usage

## Vanilla JS/TS

1. Use this DOM structure:

```html
<div id="laufsteg-sample-1" className="laufsteg-container">
  <div className="laufsteg-trolley">
    <div className="laufsteg-cell">YOUR_CONTENT_GOES_HERE</div>
  </div>
</div>
```

2. Call `createLaufsteg()`

```ts
import { createLaufsteg } from 'laufsteg'
...
const options: LaufstegOptions = {...}
const container = document.getElementById("laufsteg-sample-1")
const laufsteg = createLaufsteg(container, options)
...
```

## Framework-Adapters

If you use one of our adapters you don't have to call `createLaufsteg()` manually. You only have to use the provided component as a wrapper and pass the options as props.

### Vue

```tsx
<Laufsteg offset="100" ... >YOUR_CONTENT_GOES_HERE</Laufsteg>
```

The options described on [this page](/docs/options) can be passed as props. The [callbacks](/docs/callbacks) are exposed as emits.

### React

```tsx
<Laufsteg offset={100} ... >YOUR_CONTENT_GOES_HERE</Laufsteg>
```

The options described on [this page](/docs/options) can be passed as props. The [callbacks](/docs/callbacks) are available as classic callback functions (e.g. `onDragStart`)
