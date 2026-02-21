'use client';
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface Project {
  id: number;
  title: string;
  description: string;
}

export default function Dashboard({ userId }: { userId: number }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/projects?userId=${userId}`);
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (projectData: { title: string; description: string; }) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...projectData, userId, }),
      });
      if (response.ok) {
        setShowForm(false);
        fetchProjects();
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch(`/api/projects/${projectId}`, {
          method: 'DELETE',
        });
        fetchProjects();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {showForm ? 'Cancel' : 'New Project'}
        </button>
      </div>
      {showForm && (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg">
          <ProjectForm onSubmit={handleCreateProject} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} onEdit={() => console.log('Edit:', project.id)} onDelete={handleDeleteProject} />
        ))}
      </div>
      {projects.length === 0 && !showForm && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No projects yet</p>
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create Your First Project
          </button>
        </div>
      )}
    </div>
  );
}