import React from 'react';

interface HeaderProps {
  onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUploadClick }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-transparent text-white w-full">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-white rounded-full mr-2"></div>
        <div>
          <h1 className="text-lg font-bold">Gemini Image Chat</h1>
          <p className="text-xs">Powered by Gemini 2.5 Flash Image (preview)</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground font-bold py-2 px-4 rounded-lg transition-colors">Demo Mode</button>
        <button onClick={onUploadClick} className="bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground font-bold py-2 px-4 rounded-lg transition-colors">Upload</button>
        <button className="bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground font-bold py-2 px-4 rounded-lg transition-colors">Run Self-Tests</button>
      </div>
    </header>
  );
};

export default Header;