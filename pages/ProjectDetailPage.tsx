
import React from 'react';
import { useApp } from '../store/AppContext';
import ProjectDetail from '../components/ProjectDetail';

/**
 * პროექტის დეტალური ინფორმაციის გვერდი.
 * იყენებს გლობალურ მდგომარეობას არჩეული პროექტის მისაღებად.
 */
const ProjectDetailPage: React.FC = () => {
  const { selectedProject, setView, setSelectedProject } = useApp();

  const handleBack = () => {
    setSelectedProject(null);
    setView('SITE');
  };

  if (!selectedProject) {
    handleBack();
    return null;
  }

  return (
    <ProjectDetail 
      project={selectedProject} 
      onBack={handleBack} 
    />
  );
};

export default ProjectDetailPage;
