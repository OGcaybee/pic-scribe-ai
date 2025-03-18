
import React from "react";
import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container max-w-6xl mx-auto py-4 px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
            <ImageIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              PicScribe AI
            </h1>
            <p className="text-xs text-muted-foreground">Image Caption Generator</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Documentation
          </a>
          <a 
            href="#" 
            className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Get API Key
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
