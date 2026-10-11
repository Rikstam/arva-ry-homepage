# ARVA ry

Hugo site for Arvokas vanhuus ARVA ry. The public pages are the home page, Kunniakirjat, Hankkeet, Minun Ääneni, Unelmatehdas, and Yhteys.

## Preview

```sh
hugo server
```

## Edit

- Page copy lives in `content/`.
- Shared contact details, the membership account, and the donation account are in `data/site.yaml`.
- The board on the Yhteys page is `data/board.yaml`.
- Partner logos on the home page are `data/partners.yaml`.
- Unelmatehdas photo galleries are the `galleries` list in `content/hankkeet/unelmatehdas.md`.
- A new kunniakirja is a Markdown file in `content/kunniakirjat/`. It is listed on that page and does not get its own URL.
- A new hanke is a Markdown file in `content/hankkeet/`.

## Build

```sh
hugo
```

The finished site is written to `public/`.
