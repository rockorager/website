<h1>
  <p align="center">
    <img src="https://user-images.githubusercontent.com/1299/199110421-9ff5fc30-a244-441e-9882-26070662adf9.png" alt="Logo" width="100">
    <br>Ghostty Website
  </p>
</h1>
<p align="center">
  This repository contains the entire source for <a href="https://ghostty.org">ghostty.org</a>.
</p>

## Local Development

### via Node (recommended)

To spin up a local server, you can simply run `make`.

```bash
make
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.

### via Docker

If you don't have node configured, you can also build the website locally with Docker.

This approach will compile a [production build](https://nextjs.org/docs/pages/building-your-application/deploying#production-builds), which is  less ideal for local development.

```bash
make docker
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.
