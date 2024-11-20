import React from 'react';
import { ChatTab } from './tabs/ChatTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { ModelsTab } from './tabs/ModelsTab';
import { PipelineTab } from './tabs/PipelineTab';
import { PerformanceTab } from './tabs/PerformanceTab';
import { SettingsTab } from './tabs/SettingsTab';

type TabViewProps = {
  activeTab: string;
};

export function TabView({ activeTab }: TabViewProps) {
  return (
    <div className="p-6">
      {activeTab === 'chat' && <ChatTab />}
      {activeTab === 'projects' && <ProjectsTab />}
      {activeTab === 'models' && <ModelsTab />}
      {activeTab === 'pipeline' && <PipelineTab />}
      {activeTab === 'performance' && <PerformanceTab />}
      {activeTab === 'settings' && <SettingsTab />}
    </div>
  );
}