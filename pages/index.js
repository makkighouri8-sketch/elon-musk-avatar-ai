<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Workspace | Clean Cyber Engine</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        cyber: {
                            bg: '#000000',
                            card: '#0a0a0a',
                            border: '#1f1f1f',
                            cyan: '#00f2fe',
                            blue: '#3b82f6',
                        }
                    }
                }
            }
        }
    </script>

    <style>
        /* Sleek Solid Pure Black Theme */
        body {
            background-color: #000000;
            color: #f3f4f6;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }

        /* Glassmorphism Clean Panel */
        .glass-panel {
            background: rgba(10, 10, 10, 0.95);
            border: 1px solid #1f1f1f;
        }

        /* Custom Minimal Scrollbar */
        ::-webkit-scrollbar {
            width: 5px;
        }
        ::-webkit-scrollbar-track {
            background: #000000;
        }
        ::-webkit-scrollbar-thumb {
            background: #262626;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #00f2fe;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between bg-black font-sans relative antialiased">

    <!-- TOP MINIMAL HEADER -->
    <header class="w-full max-w-4xl mx-auto px-4 py-6 flex justify-between items-center z-20">
        <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center p-0.5 shadow-md">
                <div class="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
                    <i class="fa-solid fa-sparkles text-cyan-400 text-sm"></i>
                </div>
            </div>
            <div>
                <h1 class="text-base font-bold tracking-wide text-white flex items-center gap-2">
                    AI CHAT <span class="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-400 font-mono">v2.5</span>
                </h1>
            </div>
        </div>

        <button onclick="clearChat()" class="text-xs text-zinc-400 hover:text-white transition-colors bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
            <i class="fa-solid fa-trash-can mr-1.5"></i>Clear Chat
        </button>
    </header>

    <!-- MAIN CHAT CONTAINER (GEMINI STYLE) -->
    <main class="w-full max-w-4xl mx-auto px-4 flex-1 flex flex-col justify-between z-10 pb-6">

        <!-- CHAT HISTORY BOX -->
        <div class="w-full glass-panel rounded-2xl p-4 sm:p-6 mb-4 flex flex-col flex-1 min-h-[420px] max-h-[600px] shadow-2xl relative overflow-hidden">
            
            <!-- Chat Messages Area -->
            <div id="chatFeed" class="flex-1 overflow-y-auto space-y-4 pr-2">
                <!-- Welcome Message -->
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <i class="fa-solid fa-robot text-xs text-cyan-400"></i>
                    </div>
                    <div class="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-xs sm:text-sm text-zinc-200 leading-relaxed">
                        Hello! Main aapka AI assistant hoon. Aap mujhse koi bhi sawal pooch sakte hain.
                    </div>
                </div>
            </div>
        </div>

        <!-- TEXT INPUT CONTROL BAR (GEMINI STYLE INPUT BOX) -->
        <div class="w-full flex space-x-2">
            <div class="relative flex-1">
                <input 
                    type="text" 
                    id="userInput" 
                    placeholder="Type your message here..." 
                    onkeydown="if(event.key==='Enter') sendTextMessage()"
                    class="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                />
                <i class="fa-solid fa-message absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
            </div>

            <button 
                onclick="sendTextMessage()"
                class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold px-5 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/10 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-paper-plane text-sm"></i>
            </button>
        </div>

    </main>

    <!-- FOOTER -->
    <footer class="w-full max-w-4xl mx-auto px-4 py-4 text-center text-xs text-zinc-600 border-t border-zinc-900 z-10">
        <p>AI Interface • Fast & Minimalist Workspace</p>
    </footer>

    <script>
        // Simple Clean Chat Functions
        function sendTextMessage() {
            const input = document.getElementById('userInput');
            const message = input.value.trim();
            if (!message) return;

            const chatFeed = document.getElementById('chatFeed');

            // User Message Element
            const userBubble = `
                <div class="flex items-start justify-end space-x-3">
                    <div class="bg-cyan-500/10 border border-cyan-500/30 p-3.5 rounded-2xl rounded-tr-none max-w-[85%] text-xs sm:text-sm text-cyan-200 leading-relaxed">
                        ${escapeHtml(message)}
                    </div>
                </div>
            `;
            chatFeed.insertAdjacentHTML('beforeend', userBubble);
            input.value = '';
            chatFeed.scrollTop = chatFeed.scrollHeight;

            // Simulated AI Response (Connect your backend API here)
            setTimeout(() => {
                const aiBubble = `
                    <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <i class="fa-solid fa-robot text-xs text-cyan-400"></i>
                        </div>
                        <div class="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-xs sm:text-sm text-zinc-200 leading-relaxed">
                            Aapka message mil gaya hai! Yeh UI ab bilkul clean aur Gemini jesi sleek black screen par chal rahi hai.
                        </div>
                    </div>
                `;
                chatFeed.insertAdjacentHTML('beforeend', aiBubble);
                chatFeed.scrollTop = chatFeed.scrollHeight;
            }, 600);
        }

        function clearChat() {
            document.getElementById('chatFeed').innerHTML = `
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <i class="fa-solid fa-robot text-xs text-cyan-400"></i>
                    </div>
                    <div class="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-xs sm:text-sm text-zinc-200 leading-relaxed">
                        Chat cleared. Main aapki kya madad kar sakta hoon?
                    </div>
                </div>
            `;
        }

        function escapeHtml(text) {
            return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
    </script>
</body>
</html>
    
