import { Shield, Map as Maple, LayoutDashboard, Users, FileText, FolderOpen, PenTool, MessageSquare, BarChart3, Settings, ChevronLeft, ChevronRight, Briefcase, Calculator, BookOpen, UserCheck } from 'lucide-react';

const menuItems = [
  // Vue d'ensemble
  { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard, group: 'Vue d\'ensemble' },

  // Gestion Clients
  { id: 'clients', label: 'Gestion Clients', icon: Users, group: 'Clients' },
  { id: 'clientAccounts', label: 'Comptes Clients', icon: UserCheck, group: 'Clients' },

  // Documents & Services
  { id: 'documents', label: 'Documents', icon: FileText, group: 'Documents' },
  { id: 'clientDocuments', label: '📁 Documents Clients', icon: FolderOpen, group: 'Documents' },
  { id: 'signatures', label: 'Signatures Électroniques', icon: PenTool, group: 'Documents' },

  // Services & Opérations
  { id: 'communications', label: 'Communications', icon: MessageSquare, group: 'Opérations' },
  { id: 'projects', label: 'Gestion Projets', icon: Briefcase, group: 'Opérations' },
  { id: 'tasks', label: 'Gestion Tâches', icon: Calculator, group: 'Opérations' },

  // Analyses & Rapports
  { id: 'reports', label: 'Rapports & Analytics', icon: BarChart3, group: 'Analyses' },
  { id: 'knowledge', label: 'Base de Connaissances', icon: BookOpen, group: 'Analyses' },

  // Administration
  { id: 'settings', label: 'Paramètres Système', icon: Settings, group: 'Administration' }
];

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ activeView, setActiveView, sidebarCollapsed, setSidebarCollapsed }: SidebarProps) {
  return (
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-br from-blue-200 via-purple-100 to-white border-r border-gray-200 transition-all duration-300 z-40 backdrop-blur ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white/60 backdrop-blur rounded-t-xl shadow-md">
  {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">ComptaQC</h1>
              <p className="text-xs text-gray-500">Gestion Client</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {['Vue d\'ensemble', 'Clients', 'Documents', 'Opérations', 'Analyses', 'Administration'].map((groupName) => {
          const groupItems = menuItems.filter(item => item.group === groupName);
          if (groupItems.length === 0) return null;

          return (
            <div key={groupName} className="mb-6 last:mb-0">
              {!sidebarCollapsed && (
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">
                  {groupName}
                </h3>
              )}
              <ul className="space-y-1">
                {groupItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        title={sidebarCollapsed ? item.label : undefined}
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                        {!sidebarCollapsed && (
                          <span className="font-medium text-left truncate">{item.label}</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Compliance Badge */}
  {!sidebarCollapsed && (
        <div className="absolute bottom-20 left-4 right-4">
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="flex items-center space-x-2">
              <Maple className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs font-medium text-green-800">Conforme LCJTI</p>
                <p className="text-xs text-green-600">Loi 25 • TPS/TVQ</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile */}
  {!sidebarCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-3 border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">MC</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Marie Comptable CPA</p>
                <p className="text-xs text-gray-500 truncate">Cabinet Conseil QC</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}