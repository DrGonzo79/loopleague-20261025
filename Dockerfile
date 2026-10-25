FROM node:26.12.1-bookworm-slim AS frontend
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && update-ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM python:3.12-slim AS api
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && update-ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY api/pyproject.toml api/uv.lock ./
RUN pip install --no-cache-dir uv && uv sync --locked --no-dev
COPY api ./api
EXPOSE 8000
CMD ["uv", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
