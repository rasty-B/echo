import React from 'react';

const tabs = [
  { id: 'chat', label: 'Chat' },
  { id: 'projects', label: 'Projects' },
  { id: 'models', label: 'Models' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'performance', label: 'Performance' },
  { id: 'settings', label: 'Settings' },
];

type HeaderProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img src="/yin-yang.svg" alt="Echo Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-white">ECHO</h1>
          </div>
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors
                  ${activeTab === tab.id
                    ? 'text-yellow-400'
                    : 'text-zinc-400 hover:text-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}