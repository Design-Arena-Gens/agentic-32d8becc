# Brian AI Assistant 🤖

An open-source AI personal assistant designed for Ubuntu OS that provides worldwide information access without requiring paid APIs.

## Features

✅ **100% Open Source** - No proprietary dependencies
✅ **No Paid APIs** - Uses free services (DuckDuckGo, Wikipedia, etc.)
✅ **Privacy-Focused** - No data collection or tracking
✅ **Web Search** - Access worldwide information
✅ **Ubuntu System Help** - Commands and troubleshooting
✅ **Programming Assistance** - Multiple languages supported
✅ **Modern UI** - Beautiful, responsive interface
✅ **Real-time Chat** - Interactive conversation

## Capabilities

- **Web Search**: Search and retrieve information from the internet
- **Ubuntu/Linux Help**: System commands, troubleshooting, configuration
- **Programming**: Python, JavaScript, Bash, Git assistance
- **File Management**: Commands for file operations
- **Network Tools**: Connection diagnostics and configuration
- **News & Weather**: Access to current information
- **Local AI Integration**: Guidance for running Ollama, LocalAI, etc.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Search API**: DuckDuckGo (free, no key required)
- **Deployment**: Vercel

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <your-repo>
cd brian-ai-assistant

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## Usage

1. Open the application in your browser
2. Type your question or request in the input field
3. Brian will respond with helpful information, commands, or search results
4. Use the quick action buttons for common tasks

### Example Queries

- "Search for latest AI news"
- "Help me with Ubuntu commands"
- "What is the weather today?"
- "How do I install Python packages?"
- "Find information about machine learning"

## Local AI Integration

Brian can guide you to set up local AI models on Ubuntu:

```bash
# Install Ollama for local LLMs
curl https://ollama.ai/install.sh | sh
ollama run llama2

# Or use LocalAI
docker run -p 8080:8080 localai/localai
```

## Privacy

- No user data is collected or stored
- No telemetry or tracking
- All searches go through public APIs
- No account required

## Contributing

Contributions are welcome! This is an open-source project designed to help the Ubuntu community.

## License

MIT License - Free to use, modify, and distribute

## Roadmap

- [ ] Integration with local LLMs (Ollama)
- [ ] Voice input/output
- [ ] Plugin system for extensions
- [ ] Desktop application (Electron)
- [ ] Offline mode with cached responses
- [ ] Integration with Ubuntu system services

---

Built with ❤️ for the Ubuntu community
