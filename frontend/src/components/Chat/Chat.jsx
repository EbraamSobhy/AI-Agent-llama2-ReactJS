    import React, { useState, useRef, useEffect } from 'react';
    import './chat.css';

    export default function ChatApp() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        const userMessage = { role: "user", content: message, id: Date.now() };
        setMessages(prev => [...prev, userMessage]);
        setMessage("");
        setIsLoading(true);

        try {
        const res = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        if (!data || !data.response) {
            throw new Error('Invalid response format from server');
        }

        setMessages(prev => [...prev, { role: "assistant", content: data.response, id: Date.now() }]);
        } // In handleSubmit()
        catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: `Error: ${error.message}. Please check backend services.`,
                id: Date.now()
            }]);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col h-screen text-white bg-black'>
        {/* Header */}
        <header className='p-4 flex items-center justify-between bg-black text-white'>
            <div className="flex items-center space-x-2">
            <div className='w-8 h-8 rounded-full flex items-center justify-center bg-white'>
                <img src="/src/assets/brain.jpg" alt="Brain" className="h-8 w-8 rounded-full" />
            </div>
            <h1 className="text-xl font-bold">Braynix</h1>
            </div>
            <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-bold"
            >
            Home
            </button>
        </header>
        <hr className="border-t border-white my-0" />
        {/* Main chat area */}
        <div className='flex-1 overflow-y-auto p-4 bg-neutral-900'>
            <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md p-4 rounded-xl ${msg.role === 'user' ? 'bg-white text-black' : 'bg-black text-white border border-white'}`}>
                    {msg.content.split('\n').map((line, idx) => (
                        <span key={`line-${idx}`}>
                            {line}
                            <br />
                        </span>
                    ))}
                </div>
                </div>
            ))}
            {/* Loading indicator */}
            {isLoading && (
                <div className="flex justify-start">
                <div className="max-w-md p-4 rounded-xl bg-black text-white border border-white">
                    <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
                </div>
            )}
            <div ref={messagesEndRef} />
            </div>
        </div>
        {/* Input area */}
        <div className='p-4 bg-black border-t border-white'>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative">
                <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className='w-full p-3 pr-16 rounded-lg border bg-black border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white'
                disabled={isLoading}
                />
                <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className='absolute right-2 top-2 p-1 rounded-full bg-white hover:bg-gray-200 text-black transition-colors'
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                </button>
            </div>
            <div className="text-xs text-center mt-2 text-white">
                AI Assistant may produce inaccurate information about people, places, or facts.
            </div>
            </form>
        </div>
        </div>
    );
    }