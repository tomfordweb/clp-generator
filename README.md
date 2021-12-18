![deployment](https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/build-and-deploy.yml/badge.svg)

# Getting Started

Local development build, accessible at `http://localhost:3000`

```
docker-compose up --build
```

Or to test the production build...

```
docker-compose -f docker-compose.yml up --build

```

# CI/CD

This is performed via github actions. You can view details via the actions tab.
