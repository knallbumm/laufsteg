```ts

const container = document.getElementById("laufsteg-container")


const config = {
  direction: 'LEFT' | 'RIGHT',
  draggable: boolean,
  preserveDirectionAfterDraging: boolean,
  speed: number
  initialOffset: number
  sizeOverride: {width: string | number, height: string | number}
  changeCursor: boolean
}

const laufsteg = createLaufsteg(container, config)
l.addEventListener("l-direction-changed", (newDirection: 'LEFT' | 'RIGHT') => {})
l.addEventListener("l-started-dragging" => {})
l.addEventListener("l-ended-dragging" => {})
l.addEventListener("l-moved-dragging" => {})

l.start(): void
l.pause(): void
l.offset: number
l.setOffset(400, animate: true)


```