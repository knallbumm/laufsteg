---
title: General
---

<img src="/laufsteg-header-image.jpg"/>

## TL;DR;

Laufsteg helps you create endless horizontal scrolling carousels.\
It can be used in many ways. To give you a little inspiration, we have put together a few examples [here](/demo).

## Motivation

We wanted to have a library with which we could easily create an infinite carousel in both directions. On the one hand, this should be able to scroll automatically, but the users should also be able to interact with it.

It was also very important to us to have a really smooth user experience, for which not least a great performance is necessary. Because we couldn't find a library that could offer us exactly that, we decided to write our own.

## Disclaimers / When not to use it

We are honest: Laufsteg currently does not support all features you would expect from an endless carousel.\
This is mainly because we think that not everything has to be perfect before it can be published and because our time is limited. All the libraries we publish are actually just a by-product of our actual work at [smunzl](https://smunzl.com).

Accordingly, we would be happy if others would help us to further develop Laufband and fix bugs.

Specifically, we plan to support the following in the future:

### Cell size

Laufsteg currently does not support multiple cell sizes per Laufsteg. When calling `createLaufsteg()` it measures the first item via `clientWidth` and `clientHeight` and will keep it's width and height forever.

### Paging

Laufsteg does not snap to specific points or support a paging animation
