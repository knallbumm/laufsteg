---
title: Options
---

# Options

Of course you can customize laufsteg to fit your exact usecase.

::: warning
Some of the properties may not take effect if changed after initializing, because laufsteg is currently not 100% reloadable. We are working on this.
:::

### gap
- type: `string | number`
- default: `0`

Space between the cells. Either a absolute CSS-Unit-String ("3rem", "10px") or a number (in px)

### offset

- type: `number`
- default: `0`

Initial offset (movement) in pixels. A positive value means it is scrolled to the right, a negative, it is scrolled to the left.

While animating / dragging this value will change.

### draggable

- type: `boolean`
- default: `true`

Defines if the laufsteg is draggable by the user. When disabled it only can animate automatically and be controlled programatically.

### animationSpeed

- type: `number`
- default: `100`

Speed of the automatic animation in px/s.

Negative values mean it is animating to left. A positive value will animate it to the right. When set to `0`, there is no movement.

### friction

- type: `number`
- default: `5`

The friction applied to the cells, after the user stopped dragging them. They start moving in the same speed they got released and then over time slowly adjust to the `animationSpeed`.
This unitless value controls the duration this process takes. When given `0` they will stay at their drag-speed forever. The higher the value the faster the animation stops.

For normal usecases a value between `5` and `10` looks fine.

### overflowItems

- type: `number`
- default: `1`

(Minimum) number of items on each side to make sure there is no blank space — even with fast dragging.

If you often see blank spaces on the edges, you can increase this value. For normal usecasess the default value of 1 is fine.

### cursor

- type: `string | { hover: string, dragging: string }`
- default: `{ hover: "grab", dragging: "grabbing" }`

The CSS `cursor`-property applied in the different states (hovering, dragging). When given a single string, instead of an object it is used for every state.
