import axios from 'axios';
import React, { useState } from 'react';

const ChatAi = () => {
  const [input, setInput] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";
  const api_key = "AIzaSyB3P6vKtsDry9M8fr7P-9RyPnVE5u0FvKA";

  const handleChange = (e) => setInput(e.target.value);

  const handleClick = async(e)=>{
    e.preventDefault()

    if(!input.trim()) return

    setAnswer('')
    setQuestion(input)
    setLoading(true)

    const sendingdata = {
        contents:[
           {
            parts:[{text: input}]
           }
        ]
    }


    try {
        const response = await axios.post(`${url}${api_key}`,sendingdata)
        const textresponse = response.data.candidates[0].content.parts[0].text
        setAnswer(textresponse)
    } catch (error) {
        console.log("error",error)
        setAnswer("something went wrong brother")
    } finally {
        setInput('')
        setLoading(false)
    }
  }

  return (
    <div className="gemini-wrapper">
      <div className="gemini-chat-container">
        <div className="gemini-chat-messages">
          {question && <p className="question">🧑‍💻 {question}</p>}
          {loading ? (
            <p className="answer typing">Gemini is thinking...</p>
          ) : (
            answer && <p className="answer">🤖 {answer}</p>
          )}
        </div>
        <form className="gemini-chat-input-area">
          <input
            type="text"
            className="gemini-chat-input"
            placeholder="Ask something..."
            value={input}
            onChange={handleChange}
          />
          <button className="gemini-chat-button" onClick={handleClick}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAi;
