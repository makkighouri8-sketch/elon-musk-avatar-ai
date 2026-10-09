```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elon Musk AI Avatar | Cyberpunk Voice Engine</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts: Inter & Orbitron -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@600;800;900&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        cyber: ['Orbitron', 'sans-serif'],
                    },
                    colors: {
                        cyber: {
                            bg: '#050811',
                            card: '#0d1322',
                            border: '#1e293b',
                            cyan: '#00f2fe',
                            blue: '#4facfe',
                            purple: '#7928ca',
                            magenta: '#ff0080',
                        }
                    },
                    animation: {
                        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
                        'spin-slow': 'spin 12s linear infinite',
                        'ping-once': 'ping 0.8s cubic-bezier(0, 0, 0.2, 1) 1',
                    },
                    keyframes: {
                        pulseGlow: {
                            '0%, 100%': { boxShadow: '0 0 20px rgba(0, 242, 254, 0.3), inset 0 0 15px rgba(0, 242, 254, 0.2)' },
                            '50%': { boxShadow: '0 0 50px rgba(0, 242, 254, 0.8), inset 0 0 25px rgba(0, 242, 254, 0.5)' },
                        }
                    }
                }
            }
        }
    </script>

    <style>
        /* Custom Styles & Visual Effects */
        body {
            background-color: #050811;
            color: #f8fafc;
            overflow-x: hidden;
            user-select: none;
        }

        /* Scanline Overlay Effect */
        .scanline-bg {
            background: linear-gradient(
                rgba(18, 16, 16, 0) 50%, 
                rgba(0, 0, 0, 0.25) 50%
            ), linear-gradient(
                90deg,
                rgba(255, 0, 0, 0.03),
                rgba(0, 255, 0, 0.01),
                rgba(0, 0, 255, 0.03)
            );
            background-size: 100% 4px, 6px 100%;
        }

        /* Glassmorphism panel */
        .glass-panel {
            background: rgba(13, 19, 34, 0.75);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(0, 242, 254, 0.15);
        }

        .glass-modal {
            background: rgba(5, 8, 17, 0.94);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #050811;
        }
        ::-webkit-scrollbar-thumb {
            background: #1e293b;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #00f2fe;
        }

        /* Avatar Dynamic Ring States */
        .ring-idle {
            border-color: #00f2fe;
            box-shadow: 0 0 25px rgba(0, 242, 254, 0.3);
        }
        .ring-listening {
            border-color: #22c55e;
            box-shadow: 0 0 45px rgba(34, 197, 94, 0.75);
            animation: pulseGlowGreen 1.2s infinite ease-in-out;
        }
        .ring-thinking {
            border-color: #eab308;
            box-shadow: 0 0 45px rgba(234, 179, 8, 0.75);
            animation: pulseGlowYellow 1s infinite ease-in-out;
        }
        .ring-speaking {
            border-color: #00f2fe;
            box-shadow: 0 0 65px rgba(0, 242, 254, 0.9);
            animation: pulseGlowCyan 0.8s infinite ease-in-out;
        }

        @keyframes pulseGlowGreen {
            0%, 100% { boxShadow: 0 0 20px rgba(34, 197, 94, 0.4); }
            50% { boxShadow: 0 0 50px rgba(34, 197, 94, 0.9); }
        }
        @keyframes pulseGlowYellow {
            0%, 100% { boxShadow: 0 0 20px rgba(234, 179, 8, 0.4); }
            50% { boxShadow: 0 0 50px rgba(234, 179, 8, 0.9); }
        }
        @keyframes pulseGlowCyan {
            0%, 100% { boxShadow: 0 0 25px rgba(0, 242, 254, 0.5); transform: scale(1); }
            50% { boxShadow: 0 0 65px rgba(0, 242, 254, 1); transform: scale(1.03); }
        }

        /* Audio Wave Visualizer Bars */
        .wave-bar {
            width: 4px;
            background: linear-gradient(180deg, #00f2fe 0%, #4facfe 100%);
            border-radius: 4px;
            transition: height 0.1s ease;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between scanline-bg font-sans relative antialiased">

    <!-- TOP CYBERPUNK HEADER -->
    <header class="w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 flex justify-between items-center z-20">
        <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-cyan to-cyber-purple flex items-center justify-center p-0.5 shadow-lg shadow-cyber-cyan/20">
                <div class="w-full h-full bg-cyber-bg rounded-[10px] flex items-center justify-center">
                    <i class="fa-solid font-cyber text-cyber-cyan text-lg">X</i>
                </div>
            </div>
            <div>
                <h1 class="font-cyber text-lg sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-blue">
                    ELON MUSK <span class="text-xs px-2 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-sans ml-1">GEMINI AI</span>
                </h1>
                <p class="text-xs text-slate-400 hidden sm:block">Neural Interactive Neural Link v2.5</p>
            </div>
        </div>

        <!-- Launch Call Mode Button -->
        <button id="launchCallBtn" onclick="openCallOverlay()" class="relative group overflow-hidden rounded-full p-[1px] focus:outline-none">
            <span class="absolute inset-0 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple rounded-full animate-spin-slow"></span>
            <span class="relative px-5 py-2.5 rounded-full bg-cyber-bg flex items-center space-x-2 transition-all duration-300 group-hover:bg-opacity-80">
                <i class="fa-solid fa-microphone text-cyber-cyan text-sm animate-pulse"></i>
                <span class="font-cyber text-xs sm:text-sm font-semibold tracking-wide text-white">Live Call Mode</span>
            </span>
        </button>
    </header>

    <!-- MAIN APPLICATION CONTAINER -->
    <main class="w-full max-w-4xl mx-auto px-4 flex-1 flex flex-col justify-center items-center z-10 py-4">

        <!-- AVATAR DISPLAY SECTION -->
        <div class="flex flex-col items-center justify-center my-4 relative">
            
            <!-- Tech Rotating HUD Ring -->
            <div class="absolute w-64 h-64 sm:w-72 sm:h-72 border border-dashed border-cyber-cyan/20 rounded-full animate-spin-slow pointer-events-none"></div>

            <!-- Avatar Container with Dynamic Status Ring -->
            <div id="mainAvatarRing" class="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1 border-4 ring-idle transition-all duration-500 bg-cyber-bg flex items-center justify-center">
                <img 
                    id="elonAvatarImg"
                    src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" 
                    alt="Elon Musk AI Avatar" 
                    class="w-full h-full object-cover rounded-full filter contrast-105 brightness-105"
                    onerror="this.src='https://placehold.co/400x400/0d1322/00f2fe?text=Elon+Musk+AI'"
                />
                
                <!-- Live Pulse Indicator Badge -->
                <div class="absolute bottom-2 right-2 bg-cyber-card border border-cyber-cyan/40 px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-lg">
                    <span id="statusDot" class="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse"></span>
                    <span id="statusText" class="text-xs font-cyber tracking-wider text-slate-300">IDLE</span>
                </div>
            </div>

            <!-- Avatar Subtitle Status -->
            <p id="mainStatusDesc" class="mt-4 text-xs sm:text-sm font-medium text-slate-400 tracking-wide text-center">
                Tap <span class="text-cyber-cyan">Live Call Mode</span> or send a text to talk about SpaceX, Tesla, or Mars.
            </p>
        </div>

        <!-- CHAT HISTORY BOX -->
        <div class="w-full glass-panel rounded-2xl p-4 mb-4 flex flex-col h-64 sm:h-72 max-h-[320px] shadow-2xl relative overflow-hidden">
            <!-- Terminal Header -->
            <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <div class="flex items-center space-x-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                    <span class="text-xs font-mono text-slate-400 ml-2">starlink-neural-feed.log</span>
                </div>
                <button onclick="clearChat()" class="text-xs text-slate-500 hover:text-cyber-cyan transition-colors">
                    <i class="fa-solid fa-trash-can mr-1"></i>Clear
                </button>
            </div>

            <!-- Chat Messages Area -->
            <div id="chatFeed" class="flex-1 overflow-y-auto space-y-3 pr-1">
                <!-- Welcome Message -->
                <div class="flex items-start space-x-2">
                    <div class="w-7 h-7 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/50 flex items-center justify-center shrink-0 mt-0.5">
                        <span class="text-xs font-bold text-cyber-cyan">X</span>
                    </div>
                    <div class="bg-cyber-card border border-cyber-cyan/20 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs sm:text-sm text-slate-200">
                        Hey there. Elon here. Ask me anything about Starship, Tesla FSD, Optima robots, or making life multiplanetary.
                    </div>
                </div>
            </div>
        </div>

        <!-- TEXT INPUT CONTROL BAR -->
        <div class="w-full flex space-x-2">
            <div class="relative flex-1">
                <input 
                    type="text" 
                    id="userInput" 
                    placeholder="Ask Elon about SpaceX, Tesla, AI..." 
                    onkeydown="if(event.key==='Enter') sendTextMessage()"
                    class="w-full bg-cyber-card/90 border border-slate-700/80 rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all shadow-inner"
                />
                <i class="fa-solid fa-comment-dots absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            </div>

            <button 
                onclick="sendTextMessage()"
                class="bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:from-cyber-blue hover:to-cyber-purple text-cyber-bg font-bold px-5 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-cyber-cyan/20 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-paper-plane text-base"></i>
            </button>
        </div>

    </main>

    <!-- FULL-SCREEN LIVE VOICE CALL OVERLAY -->
    <div id="callOverlay" class="fixed inset-0 glass-modal z-50 flex flex-col justify-between items-center p-6 sm:p-10 hidden transition-opacity duration-300">
        
        <!-- Call Header -->
        <div class="w-full max-w-2xl flex justify-between items-center text-center">
            <div class="text-left">
                <span class="inline-block text-[10px] font-cyber tracking-widest text-cyber-cyan uppercase px-2 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30">
                    Encrypted Starlink Link
                </span>
                <h2 class="text-lg sm:text-2xl font-cyber font-bold text-white mt-1">Elon Musk Live Voice</h2>
            </div>
            <div class="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>00:<span id="callTimer">00</span></span>
            </div>
        </div>

        <!-- Center Interactive Call Visualizer -->
        <div class="flex flex-col items-center justify-center my-auto w-full max-w-md">
            
            <!-- Audio Ring Visualizer -->
            <div class="relative flex items-center justify-center">
                <!-- Background Pulse Rings -->
                <div id="overlayPulseBg" class="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-cyber-cyan/5 transition-all duration-300"></div>

                <div id="overlayAvatarRing" class="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full p-1.5 border-4 ring-idle transition-all duration-300 bg-cyber-bg flex items-center justify-center">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" 
                        alt="Elon Musk AI Call" 
                        class="w-full h-full object-cover rounded-full filter contrast-105"
                        onerror="this.src='https://placehold.co/400x400/0d1322/00f2fe?text=Elon+Musk+AI'"
                    />
                </div>
            </div>

            <!-- Dynamic Audio Visualizer Bars -->
            <div id="audioWaveform" class="flex items-center justify-center space-x-1.5 h-10 my-6">
                <div class="wave-bar h-2"></div>
                <div class="wave-bar h-4"></div>
                <div class="wave-bar h-7"></div>
                <div class="wave-bar h-3"></div>
                <div class="wave-bar h-8"></div>
                <div class="wave-bar h-5"></div>
                <div class="wave-bar h-2"></div>
            </div>

            <!-- Call Live Status Banner -->
            <div class="text-center space-y-2 px-4">
                <p id="overlayStatus" class="text-base sm:text-lg font-cyber font-semibold text-cyber-cyan tracking-wide">
                    Connected. Tap speak or speak directly.
                </p>
                <div id="transcriptBox" class="min-h-[40px] max-w-sm mx-auto text-xs sm:text-sm text-slate-300 italic font-mono bg-cyber-card/60 border border-slate-800 p-2.5 rounded-xl">
                    "Waiting for user input..."
                </div>
            </div>
        </div>

        <!-- Call Control Buttons -->
        <div class="w-full max-w-sm flex items-center justify-center space-x-6 mb-4">
            <!-- Manual Speak / Listen Trigger -->
            <button 
                onclick="toggleListening()" 
                id="micControlBtn"
                class="flex flex-col items-center justify-center space-y-1 text-slate-300 hover:text-white group">
                <div class="w-14 h-14 rounded-full bg-cyber-card border border-cyber-cyan/40 flex items-center justify-center shadow-lg group-hover:border-cyber-cyan group-hover:scale-105 transition-all">
                    <i id="micIcon" class="fa-solid fa-microphone text-cyber-cyan text-lg"></i>
                </div>
                <span class="text-[11px] font-cyber tracking-wider">SPEAK</span>
            </button>

            <!-- End Call Red Button -->
            <button 
                onclick="closeCallOverlay()" 
                class="flex flex-col items-center justify-center space-y-1 text-slate-300 hover:text-white group">
                <div class="w-16 h-16 rounded-full bg-red-600/90 border-2 border-red-400 flex items-center justify-center shadow-lg shadow-red-600/40 group-hover:bg-red-500 group-hover:scale-105 transition-all">
                    <i class="fa-solid fa-phone-slash text-white text-xl"></i>
                </div>
                <span class="text-[11px] font-cyber tracking-wider text-red-400">END CALL</span>
            </button>
        </div>

    </div>

    <!-- FOOTER -->
    <footer class="w-full max-w-5xl mx-auto px-4 py-4 text-center text-xs text-slate-600 border-t border-slate-900 z-10">
        <p>Elon Musk AI Avatar • Powered by Gemini AI & Web Speech API • Built for High Viral Velocity</p>
    </footer>

    <script>
        // Application State Variables
        let isCalling = false;
        let isListening = false;
        let isSpeaking = false;
        let callTimerInterval = null;
        let secondsElapsed = 0;
        let recognition = null;
        let waveInterval = null;

        // Elon Musk Response Library for Fast Interactive Speech
        const elonResponses = [
            "Yeah, absolutely. The core physics challenge with Starship is maximizing payload to orbit while minimizing cost per ton.",
            "Honestly, full self-driving is basically solved at a foundational level with end-to-end neural networks replacing handwritten code.",
            "We need to accelerate sustainable energy, but ultimately, becoming a multi-planetary species is the best insurance policy for consciousness.",
            "Haha, wild! X is evolving into the ultimate everything-app. Real-time audio, video, payments, and AI integrated seamlessly.",
            "Optimus humanoid robot will eventually be worth more than Tesla's automotive business combined. Mark my words.",
            "If you're not failing, you're not innovating enough. The feedback loop must be extremely rapid."
        ];

        // Initialize Web Speech Recognition
        function initSpeech() {
            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = true;

                recognition.onstart = () => {
                    isListening = true;
                    updateUIState('listening');
                };

                recognition.onresult = (event) => {
                    let currentTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        currentTranscript += event.results[i][0].transcript;
                    }
                    document.getElementById('transcriptBox').innerText = `"${currentTranscript}"`;

                    if (event.results[0].isFinal) {
                        processUserQuery(currentTranscript);
                    }
                };

                recognition.onerror = (err) => {
                    console.warn("Speech recognition error:", err);
                    updateUIState('idle');
                };

                recognition.onend = () => {
                    isListening = false;
                    if (!isSpeaking && isCalling) {
                        updateUIState('idle');
                    }
                };
            }
        }

        // Toggle Speech Listening
        function toggleListening() {
            if (!rec
