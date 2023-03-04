---
title: Callbacks
---

# Callbacks

### onDragStart

- type: `(offset: number) => void`

This callback is fired, when the user starts dragging.

### onDragEnd

- type: `(offset: number) => void`

This callback is fired, when the user ends dragging and the deceleration will start.

### onDecelerationStart

- type: `(offset: number, speed: number) => void`

This callback is fired, when the user ends dragging and the deceleration starts.

### onDecelerationEnd

- type: `(offset: number) => void`

This callback is fired, when the deceleration is done and the normal animation process starts.
