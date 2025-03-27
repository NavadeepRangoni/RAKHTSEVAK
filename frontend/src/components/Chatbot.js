import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! Select a question to learn about blood donation.", sender: "bot" },
  ]);

  const faqResponses = {
    "Who can donate blood?": "Anyone aged 18-65, healthy, and weighing over 50kg can donate.",
    "How often can I donate?": "You can donate whole blood every 12 weeks (men) and every 16 weeks (women).",
    "Does donating blood hurt?": "No, just a small pinch when the needle is inserted.",
    "How much blood is taken?": "About 470ml, which your body replaces within 24-48 hours.",
    "What are the benefits of donating blood?": "Blood donation helps save lives, reduces harmful iron stores, and stimulates the production of new blood cells.",
    "What should I do before donating blood?": "Drink plenty of water, eat a healthy meal, and avoid alcohol and smoking before donating.",
    "What should I do after donating blood?": "Rest for a few minutes, drink fluids, and avoid strenuous activities for the rest of the day.",
    "Can I donate blood if I have diabetes?": "Yes, if your diabetes is under control and you're not on insulin injections.",
    "Can I donate blood if I have high blood pressure?": "Yes, if your blood pressure is within a safe range at the time of donation.",
    "Can pregnant women donate blood?": "No, pregnant women are not eligible to donate blood.",
    "How long does a blood donation take?": "The donation process takes about 10-15 minutes, but the entire visit may take about an hour.",
    "Can I donate if I have a tattoo?": "Yes, but only if your tattoo was done in a licensed facility and is older than 6 months.",
    "What are the different blood donation types?": "There are whole blood, platelet, plasma, and double red cell donations.",
    "What is the universal donor blood type?": "O-negative blood can be given to patients of any blood type in emergencies.",
    "How can I check my blood type?": "You can check your blood type by donating blood or getting a blood test from a medical facility.",
    "Where can I donate blood?": "You can donate at blood banks, hospitals, or mobile blood donation camps.",
  };

  const handleQuestionClick = (question) => {
    setMessages([...messages, { text: question, sender: "user" }]);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: faqResponses[question], sender: "bot" }]);
    }, 1000);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="chat-toggle-btn">
        💬 Chat
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chat-header">Blood Donation Chatbot</div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-questions">
            <p>Select a question:</p>
            {Object.keys(faqResponses).map((question, index) => (
              <button key={index} onClick={() => handleQuestionClick(question)} className="question-btn">
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
