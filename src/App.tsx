import React, { useState } from 'react';
import { Header } from './components/Header';
import { TabView } from './components/TabView';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-black text-white">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto py-8">
        <TabView activeTab={activeTab} />
      </main>
    </div>
  );
}

export default App;