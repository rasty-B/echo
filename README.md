# Echo - Local LLM Interface

A modern, efficient interface for interacting with local Large Language Models through Ollama.

## Features

- 🤖 Direct integration with Ollama API
- 📁 Project-based chat organization
- 🔄 Custom processing pipelines
- 📊 Real-time system performance monitoring
- 🎯 Model management and deployment
- 🌐 Dark mode interface
- 📱 Responsive design

## Prerequisites

- Node.js 20 or higher
- Ollama installed and running locally
- Docker (optional, for containerized deployment)
- NVIDIA GPU (optional, for hardware acceleration)

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure the following variables:
- `VITE_OLLAMA_API_URL`: Ollama API endpoint (default: http://localhost:11434)

## Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Architecture

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons
- Direct integration with Ollama API

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request