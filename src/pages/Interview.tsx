import React, { useState } from 'react';
import Webcam from 'react-webcam';

const Interview = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'AI', text: "Hello! Let's start the interview." },
  ]);
  const [input, setInput] = useState('');
  const [isCandidateTurn, setIsCandidateTurn] = useState(true);

  const handleSend = async () => {
    if (input.trim()) {
      const newCandidateMessage = { id: messages.length + 1, sender: 'Candidate', text: input };
      setMessages((prevMessages) => [...prevMessages, newCandidateMessage]);
      setInput('');
      setIsCandidateTurn(false);

      // Prepare request payload
      const payload = {
        job_description: "Job description goes here",  // Include relevant job description if necessary
        message: input,
        history: messages.map((msg) => ({
          content: msg.text,
          author: msg.sender,
        })),
      };

      // Fetch AI response from Flask API
      try {
        const response = await fetch('/interview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        
        if (response.ok) {
          const data = await response.json();
          const newAIMessage = {
            id: messages.length + 2,
            sender: 'AI',
            text: data.response,  // This is the AI's response from the backend
          };
          setMessages((prevMessages) => [...prevMessages, newAIMessage]);
          setIsCandidateTurn(true);
        } else {
          console.error('Failed to fetch AI response.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Video Section */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white p-4 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Candidate's Video</h2>
        <div className="w-full h-96 rounded-md overflow-hidden bg-gray-300">
          <Webcam
            audio={true}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-1/2 flex flex-col justify-between bg-gray-50 border-l border-gray-300">
        <div className="flex-grow overflow-y-scroll p-4">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'AI' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'AI' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="border-t p-4 flex items-center space-x-2 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none"
            disabled={!isCandidateTurn} // Disable input during AI's turn
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={!isCandidateTurn} // Disable button during AI's turn
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
