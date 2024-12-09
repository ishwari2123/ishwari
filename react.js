import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'style.css';

const App = () => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);

    const handleAsk = () => {
        if (question) {
            setAnswers([...answers, question]);
            setQuestion('');
        }
    };

    return (
        <div className="container">
            <h1>Ask Me Anything</h1>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
            />
            <button onClick={handleAsk}> Ask </button>
            <div>
                <h2>Questions:</h2>
                <ul>
                    {answers.map((ans, index) => (
                        <li key={index}>{ans}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('App'));