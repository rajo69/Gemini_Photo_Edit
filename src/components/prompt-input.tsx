'use client';

import React, { useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="w-[70vw] p-4 bg-card rounded-lg flex items-center border border-border shadow-lg">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="w-full bg-transparent text-foreground placeholder-muted-foreground focus:outline-none resize-none"
        placeholder="e.g., grayscale the image, increase contrast"
        rows={1}
      />
      <button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-lg ml-4 transition-colors">
        Send
      </button>
    </div>
  );
};

export default PromptInput;