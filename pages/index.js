import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.85;
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

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
      const reply = data.text || "Error processing request.";

      setMessages([...newMsgs, { role: 'elon', text: reply }]);
      speakText(reply);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#090d16', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Sleek Header */}
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', color: '#00f2fe' }}>Elon Musk Gemini AI</h2>
        <button 
          onClick={() => setIsCalling(true)}
          style={{ background: '#00f2fe', color: '#000', border: 'none', padding: '10px 18px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
          📞 Call Mode
        </button>
      </div>

      {/* Elon Avatar Visual */}
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <div style={{
          width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto',
          border: '4px solid #00f2fe',
          boxShadow: isSpeaking ? '0 0 40px #00f2fe' : '0 0 15px rgba(0, 242, 254, 0.2)',
          transform: isSpeaking ? 'scale(1.06)' : 'scale(1)',
          transition: 'all 0.2s ease-in-out'
        }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" alt="Elon Musk" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <p style={{ marginTop: '12px', color: '#94a3b8', fontSize: '14px' }}>
          {isSpeaking ? "Elon is speaking..." : loading ? "Elon is thinking..." : "Ready to chat"}
        </p>
      </div>

      {/* Chat Area */}
      <div style={{ width: '100%', maxWidth: '600px', flex: 1, background: '#111827', borderRadius: '16px', padding: '15px', overflowY: 'auto', marginBottom: '15px', maxHeight: '300px' }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <span style={{
              display: 'inline-block', padding: '10px 14px', borderRadius: '12px',
              background: m.role === 'user' ? '#1e293b' : '#0284c7',
              color: '#fff', fontSize: '14px'
            }}>
              {m.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" value={input} onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask Elon anything..." 
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '10px', color: '#fff', outline: 'none' }}
        />
        <button onClick={() => handleSend()} style={{ background: '#0284c7', border: 'none', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
          Send
        </button>
      </div>

      {/* VOICE CALL OVERLAY */}
      {isCalling && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(5, 9, 17, 0.96)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
          padding: '50px 20px', zIndex: 9999
        }}>
          <div>
            <h3 style={{ color: '#00f2fe', fontSize: '22px' }}>Gemini Voice Call</h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Connected to Elon Musk AI</p>
          </div>

          <div style={{
            width: '220px', height: '220px', borderRadius: '50%', overflow: 'hidden',
            border: '4px solid #00f2fe',
            boxShadow: isSpeaking ? '0 0 60px #00f2fe' : '0 0 20px rgba(0,242,254,0.3)',
            transform: isSpeaking ? 'scale(1.08)' : 'scale(1)',
            transition: 'all 0.2s ease-in-out'
          }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" alt="Elon Musk" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <button 
            onClick={() => { setIsCalling(false); window.speechSynthesis.cancel(); }}
            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>
            End Call 🛑
          </button>
        </div>
      )}

    </div>
  );
    }
        
