# dotnyc

This repo is a custom static site engine I created in NodeJS to transform Markdown into static pages. The frontend stack for this website is incredibly barebones.

## Local Development

Requires NodeJS >= version 10.

```sh
$ npm install
$ npm start
```

## Adding a new blog post

1. Create a new folder under `content/${slug}`.
2. Add a `meta.json` file,
  ```json
  {
    "title": "...",
    "description": "...",
    "publishedAt": "00/00/0000",
    "cover": "...jpg",
    "coverAlt": "..."
  }
  ```
3. Add a `content.md` file with Markdown.
