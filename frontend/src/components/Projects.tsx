import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Calendar, Users, Target, FolderOpen } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'pending' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  dueDate: string;
  teamMembers: string[];
  tasksCount: number;
}

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Audit Q3 Entreprise ABC',
      description: 'Audit trimestriel des comptes et conformité fiscale.',
      status: 'active',
      priority: 'high',
      progress: 60,
      dueDate: '2025-09-30',
      teamMembers: ['Marie Comptable', 'Jean Auditeur'],
      tasksCount: 5,
    },
    {
      id: '2',
      name: 'Reporting Mensuel DEF',
      description: 'Préparation et envoi du rapport mensuel de gestion.',
      status: 'pending',
      priority: 'medium',
      progress: 20,
      dueDate: '2025-09-25',
      teamMembers: ['Sophie Analyste'],
      tasksCount: 2,
    },
    {
      id: '3',
      name: 'Migration Système Cabinet',
      description: 'Migration des données vers la nouvelle plateforme cloud.',
      status: 'completed',
      priority: 'low',
      progress: 100,
      dueDate: '2025-08-31',
      teamMembers: ['Marie Comptable'],
      tasksCount: 8,
    },
  ]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: 'Nouveau projet',
      description: 'Description à compléter...',
      status: 'pending',
      priority: 'low',
      progress: 0,
      dueDate: new Date().toISOString().slice(0, 10),
      teamMembers: ['Marie Comptable'],
      tasksCount: 0,
    };
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects => projects.filter(project => project.id !== projectId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
          <p className="text-gray-600 mt-2">Gérez et suivez vos projets</p>
        </div>
        <button className="btn-servitax-primary flex items-center space-x-2" onClick={handleAddProject}>
          <Plus className="w-5 h-5" />
          <span>Nouveau Projet</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher des projets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="pending">En attente</option>
          <option value="completed">Terminé</option>
          <option value="archived">Archivé</option>
        </select>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-5 h-5" />
          <span>Filtres</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status === 'active' ? 'Actif' :
                     project.status === 'pending' ? 'En attente' :
                     project.status === 'completed' ? 'Terminé' : 'Archivé'}
                  </span>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => handleDeleteProject(project.id)}>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progression</span>
                <span className="text-sm text-gray-600">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.dueDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{project.teamMembers.length}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                {project.priority === 'high' ? 'Haute' :
                 project.priority === 'medium' ? 'Moyenne' : 'Faible'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet trouvé</h3>
          <p className="text-gray-600 mb-6">Commencez par créer votre premier projet</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
            Créer un Projet
          </button>
        </div>
      )}
    </div>
  );
}