import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState('');

  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);

      recognitionRef.current.onresult = (event) => {
        const currentText = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(currentText);

        if (event.results[0].isFinal) {
          handleSend(currentText);
        }
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.85;
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (isCalling) {
        setTimeout(() => startListening(), 500);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (userMsg) => {
    const prompt = userMsg || input;
    if (!prompt.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: prompt }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });
      const data = await res.json();
      const reply = data.text || "Connection dropped.";

      setMessages([...newMsgs, { role: 'elon', text: reply }]);
      speakText(reply);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#090d16', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', color: '#00f2fe', fontWeight: 'bold' }}>Elon Musk Gemini AI</h2>
        <button 
          onClick={() => { setIsCalling(true); startListening(); }}
          style={{ background: 'linear-gradient(90deg, #00f2fe, #4facfe)', color: '#000', border: 'none', padding: '12px 22px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 15px rgba(0, 242, 254, 0.5)' }}>
          🎙️ Launch Live Call Mode
        </button>
      </div>

      {/* Main Avatar Canvas */}
      <div style={{ margin: '30px 0', textAlign: 'center' }}>
        <div style={{
          width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto',
          border: '4px solid #00f2fe',
          boxShadow: isSpeaking ? '0 0 50px #00f2fe' : '0 0 20px rgba(0, 242, 254, 0.2)',
          transform: isSpeaking ? 'scale(1.08)' : 'scale(1)',
          transition: 'all 0.2s ease-in-out'
        }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" alt="Elon Musk" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <p style={{ marginTop: '15px', color: '#94a3b8', fontSize: '15px', fontWeight: '500' }}>
          {isSpeaking ? "🔊 Elon is talking..." : loading ? "⚡ Processing via Gemini..." : "Idle — Ready to Chat"}
        </p>
      </div>

      {/* Chat History Box */}
      <div style={{ width: '100%', maxWidth: '600px', flex: 1, background: '#111827', borderRadius: '16px', padding: '15px', overflowY: 'auto', marginBottom: '15px', maxHeight: '280px', border: '1px solid #1e293b' }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '10px 0' }}>
            <span style={{
              display: 'inline-block', padding: '10px 16px', borderRadius: '14px',
              background: m.role === 'user' ? '#1e293b' : '#0284c7',
              color: '#fff', fontSize: '14px', maxWidth: '80%'
            }}>
              {m.text}
            </span>
          </div>
        ))}
      </div>

      {/* Text Input Controls */}
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" value={input} onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask Elon about SpaceX, Tesla, Mars..." 
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '12px', color: '#fff', outline: 'none' }}
        />
        <button onClick={() => handleSend()} style={{ background: '#0284c7', border: 'none', color: '#fff', padding: '14px 24px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
          Send
        </button>
      </div>

      {/* FULL SCREEN LIVE VOICE CALL INTERFACE */}
      {isCalling && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'radial-gradient(circle at center, #0d1527 0%, #050911 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
          padding: '60px 20px', zIndex: 9999
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#00f2fe', fontSize: '24px', margin: 0 }}>Gemini Live Voice Engine</h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Connected to Elon Musk AI Avatar</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '240px', height: '240px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto',
              border: '4px solid #00f2fe',
              boxShadow: isSpeaking 
                ? '0 0 70px #00f2fe' 
                : isListening 
                ? '0 0 50px #22c55e' 
                : '0 0 20px rgba(0,242,254,0.3)',
              transform: isSpeaking ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.2s ease-in-out'
            }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" alt="Elon Musk" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ marginTop: '25px', minHeight: '50px' }}>
              {isListening && <p style={{ color: '#22c55e', fontSize: '16px', fontWeight: 'bold' }}>🎙️ Listening: "{transcript}"</p>}
              {loading && <p style={{ color: '#eab308', fontSize: '16px', fontWeight: 'bold' }}>⚡ Gemini Thinking...</p>}
              {isSpeaking && <p style={{ color: '#00f2fe', fontSize: '16px', fontWeight: 'bold' }}>🔊 Elon Speaking...</p>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={startListening}
              style={{ background: '#1e293b', color: '#fff', border: '1px solid #334155', padding: '15px 30px', borderRadius: '30px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
              🎤 Speak Again
            </button>
            <button 
              onClick={() => { setIsCalling(false); window.speechSynthesis.cancel(); if (recognitionRef.current) recognitionRef.current.stop(); }}
              style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '15px 35px', borderRadius: '30px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}>
              End Call 🛑
            </button>
          </div>
        </div>
      )}

    </div>
  );
        }
            
