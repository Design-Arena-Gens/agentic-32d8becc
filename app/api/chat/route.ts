import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: string;
  content: string;
}

// Simple pattern-based AI responses with web search capability
async function generateResponse(message: string, history: Message[]): Promise<string> {
  const lowerMessage = message.toLowerCase();

  // Web search capability using DuckDuckGo
  if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('look up')) {
    const searchQuery = message.replace(/search|find|look up|for|about|information/gi, '').trim();
    try {
      const searchResults = await searchWeb(searchQuery);
      return `I searched for "${searchQuery}" and found:\n\n${searchResults}`;
    } catch (error) {
      return `I tried to search but encountered an issue. However, I can still help you with general questions!`;
    }
  }

  // Weather queries
  if (lowerMessage.includes('weather')) {
    return `To get current weather information, I can help you access free weather APIs. For Ubuntu, you can use:\n\n\`\`\`bash\ncurl wttr.in/YourCity\n\`\`\`\n\nOr visit https://wttr.in for visual weather forecasts. Would you like weather for a specific location?`;
  }

  // News queries
  if (lowerMessage.includes('news') || lowerMessage.includes('latest')) {
    return `Here are some ways to get the latest news on Ubuntu:\n\n1. **Terminal News**: \`curl getnews.tech\` or \`curl newsapi.org\`\n2. **RSS Feeds**: Use newsboat or RSS readers\n3. **Free News Sources**: Reuters, BBC, AP News, Google News\n\nWould you like me to search for news on a specific topic?`;
  }

  // Ubuntu/Linux help
  if (lowerMessage.includes('ubuntu') || lowerMessage.includes('linux') || lowerMessage.includes('command')) {
    return `**Ubuntu Command Help**\n\nCommon commands:\n- \`ls\` - List files\n- \`cd\` - Change directory\n- \`sudo apt update\` - Update package lists\n- \`sudo apt install <package>\` - Install software\n- \`ps aux\` - Show running processes\n- \`df -h\` - Show disk usage\n- \`top\` or \`htop\` - System monitor\n\nWhat specific task do you need help with?`;
  }

  // Time and date
  if (lowerMessage.includes('time') || lowerMessage.includes('date')) {
    const now = new Date();
    return `Current date and time: ${now.toLocaleString()}\n\nOn Ubuntu, you can use:\n- \`date\` - Show current date/time\n- \`timedatectl\` - Show detailed time info\n- \`cal\` - Show calendar`;
  }

  // System information
  if (lowerMessage.includes('system') || lowerMessage.includes('hardware') || lowerMessage.includes('specs')) {
    return `**Ubuntu System Information Commands**\n\n\`\`\`bash\n# System info\nuname -a\n\n# Hardware details\nlscpu        # CPU info\nlsmem        # Memory info\nlsblk        # Block devices\nlspci        # PCI devices\nlsusb        # USB devices\n\n# System monitoring\nhtop         # Interactive process viewer\nfree -h      # Memory usage\ndf -h        # Disk usage\n\`\`\`\n\nRun these commands in your terminal to get detailed system information!`;
  }

  // Programming help
  if (lowerMessage.includes('code') || lowerMessage.includes('program') || lowerMessage.includes('python') || lowerMessage.includes('javascript')) {
    return `I can help with programming! I support:\n\n- **Python**: Package management, scripting, data analysis\n- **JavaScript/Node.js**: Web development, automation\n- **Bash**: Shell scripting and automation\n- **Git**: Version control\n\nWhat would you like to code or learn about?`;
  }

  // File operations
  if (lowerMessage.includes('file') || lowerMessage.includes('folder') || lowerMessage.includes('directory')) {
    return `**File Management on Ubuntu**\n\n\`\`\`bash\n# Create\nmkdir folder_name          # Create directory\ntouch file.txt            # Create file\n\n# View\nls -la                    # List all files\ncat file.txt              # View file content\nless file.txt             # View with pagination\n\n# Copy/Move\ncp source dest            # Copy\nmv source dest            # Move/rename\n\n# Delete\nrm file.txt               # Remove file\nrm -r folder              # Remove directory\n\n# Search\nfind . -name "*.txt"      # Find files\ngrep "text" file.txt      # Search in file\n\`\`\`\n\nWhat file operation do you need help with?`;
  }

  // AI/ML topics
  if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('neural network')) {
    return `**Open-Source AI on Ubuntu**\n\nYou can run local AI models without paid APIs:\n\n1. **Ollama** - Run LLMs locally (Llama, Mistral, etc.)\n2. **LocalAI** - OpenAI-compatible API with local models\n3. **Stable Diffusion** - Image generation\n4. **Whisper** - Speech recognition\n5. **PyTorch/TensorFlow** - Deep learning frameworks\n\nInstall Ollama:\n\`\`\`bash\ncurl https://ollama.ai/install.sh | sh\nollama run llama2\n\`\`\`\n\nWould you like help setting up any of these?`;
  }

  // Networking
  if (lowerMessage.includes('network') || lowerMessage.includes('internet') || lowerMessage.includes('wifi')) {
    return `**Network Commands for Ubuntu**\n\n\`\`\`bash\n# Check connection\nping google.com\n\n# Network interfaces\nip addr show\nifconfig\n\n# WiFi\nnmcli device wifi list\nnmcli device wifi connect SSID password PASSWORD\n\n# Ports and connections\nnetstat -tulpn\nss -tulpn\n\n# Speed test\nspeedtest-cli\n\n# DNS\nnslookup domain.com\ndig domain.com\n\`\`\`\n\nWhat network issue are you experiencing?`;
  }

  // General greeting
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage === 'hi' || lowerMessage.includes('hey')) {
    return `Hello! I'm Brian, your open-source AI assistant for Ubuntu. I can help you with:\n\n- **System administration** and Ubuntu commands\n- **Web searches** and information retrieval\n- **Programming** and development\n- **File management** and automation\n- **News, weather**, and general information\n\nI don't use any paid APIs - everything is free and open-source! What would you like help with?`;
  }

  // Help
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return `**Brian AI Capabilities**\n\n✓ Web search and information retrieval\n✓ Ubuntu/Linux system help\n✓ Programming assistance\n✓ File management\n✓ News and weather\n✓ System monitoring\n✓ Network troubleshooting\n✓ Open-source AI recommendations\n\n**Features:**\n- No paid APIs required\n- Privacy-focused (no data collection)\n- Works offline for many tasks\n- Extensible and customizable\n\nJust ask me anything!`;
  }

  // Default intelligent response
  return `I understand you're asking about: "${message}"\n\nI'm Brian, an open-source AI assistant. While I'm designed to work without paid APIs, I can:\n\n1. Help you search for information online\n2. Provide Ubuntu/Linux assistance\n3. Guide you through various tasks\n4. Offer programming help\n\nCould you be more specific about what you need? For example:\n- "Search for [topic]" - I'll search the web\n- "Help with Ubuntu [task]" - I'll provide commands\n- "How do I [action]" - I'll give instructions\n\nWhat would you like to know?`;
}

async function searchWeb(query: string): Promise<string> {
  if (!query.trim()) {
    return 'Please provide a search query.';
  }

  try {
    // Use DuckDuckGo instant answer API (free, no key required)
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    let result = '';

    if (data.AbstractText) {
      result += `**${data.Heading || 'Information'}**\n\n${data.AbstractText}\n\n`;
      if (data.AbstractURL) {
        result += `Source: ${data.AbstractURL}\n\n`;
      }
    }

    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      result += '**Related Information:**\n\n';
      data.RelatedTopics.slice(0, 5).forEach((topic: any) => {
        if (topic.Text) {
          result += `• ${topic.Text}\n`;
          if (topic.FirstURL) {
            result += `  ${topic.FirstURL}\n`;
          }
        }
      });
    }

    if (!result) {
      result = `I searched for "${query}" but didn't find instant results. Here are some suggestions:\n\n`;
      result += `1. Try searching on DuckDuckGo: https://duckduckgo.com/?q=${encodeURIComponent(query)}\n`;
      result += `2. Use Wikipedia: https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}\n`;
      result += `3. For technical info: https://stackoverflow.com/search?q=${encodeURIComponent(query)}\n\n`;
      result += 'You can also try rephrasing your question!';
    }

    return result;
  } catch (error) {
    return `Search unavailable at the moment. You can search manually:\n\n` +
           `- DuckDuckGo: https://duckduckgo.com/?q=${encodeURIComponent(query)}\n` +
           `- Wikipedia: https://en.wikipedia.org/wiki/${encodeURIComponent(query)}\n\n` +
           `Or use terminal: \`curl "https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json"\``;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await generateResponse(message, history || []);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
