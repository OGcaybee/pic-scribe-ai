
import React from "react";
import { HeartIcon, GithubIcon, TwitterIcon } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-gradient-to-r from-blue-50 to-indigo-50 mt-12">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">PicScribe AI</h3>
            <p className="text-sm text-muted-foreground">
              Generate beautiful captions for your images using AI technology. Perfect for social media, accessibility, or content creation.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Made with</span>
              <HeartIcon className="h-4 w-4 mx-1 text-red-500" />
              <span>by Lovable</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-full border hover:bg-muted transition-colors"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-full border hover:bg-muted transition-colors"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PicScribe AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
