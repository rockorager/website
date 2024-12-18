<h1>
  <p align="center">
    <img src="https://github.com/user-attachments/assets/fe853809-ba8b-400b-83ab-a9a0da25be8a" alt="Logo" width="128">
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

This approach will compile a [production build](https://nextjs.org/docs/pages/building-your-application/deploying#production-builds), which is less ideal for local development.

```bash
make docker
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.
