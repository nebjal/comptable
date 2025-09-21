import { useState, useEffect } from 'react';
import { TrendingUp, Users, FileText, Award, DollarSign, Clock, LucideIcon } from 'lucide-react';
import { AnimatedCounter, ScrollReveal } from './Animations';

interface MetricCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color: string;
  delay?: number;
}

function MetricCard({ icon: Icon, value, label, suffix = '', prefix = '', color, delay = 0 }: MetricCardProps) {
  return (
    <ScrollReveal direction="up" delay={delay}>
      <div className={`bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">{prefix}</span>
          <AnimatedCounter
            end={value}
            duration={2000}
            className="text-2xl font-bold text-gray-900"
          />
          <span className="text-2xl font-bold text-gray-900">{suffix}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{label}</p>
      </div>
    </ScrollReveal>
  );
}

interface MetricsDashboardProps {
  className?: string;
}

export default function MetricsDashboard({ className = '' }: MetricsDashboardProps) {
  const metrics = [
    {
      icon: Users,
      value: 2500,
      label: "Clients satisfaits",
      suffix: "+",
      color: "from-blue-500 to-blue-600",
      delay: 0.1
    },
    {
      icon: FileText,
      value: 15000,
      label: "Documents traités",
      suffix: "+",
      color: "from-green-500 to-green-600",
      delay: 0.2
    },
    {
      icon: TrendingUp,
      value: 99.9,
      label: "Taux de disponibilité",
      suffix: "%",
      color: "from-purple-500 to-purple-600",
      delay: 0.3
    },
    {
      icon: Clock,
      value: 24,
      label: "Support disponible",
      suffix: "/7",
      color: "from-orange-500 to-orange-600",
      delay: 0.4
    },
    {
      icon: DollarSign,
      value: 2.5,
      label: "Millions économisés",
      prefix: "$",
      suffix: "M",
      color: "from-indigo-500 to-indigo-600",
      delay: 0.5
    },
    {
      icon: Award,
      value: 98,
      label: "Satisfaction client",
      suffix: "%",
      color: "from-pink-500 to-pink-600",
      delay: 0.6
    }
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ${className}`}>
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          icon={metric.icon}
          value={metric.value}
          label={metric.label}
          suffix={metric.suffix}
          prefix={metric.prefix}
          color={metric.color}
          delay={metric.delay}
        />
      ))}
    </div>
  );
}

// Composant pour les statistiques en temps réel
export function RealTimeStats({ className = '' }: { className?: string }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`flex items-center space-x-6 text-sm text-gray-600 ${className}`}>
      <div className="flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <span>Système opérationnel</span>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-1" />
        <span>{currentTime.toLocaleTimeString('fr-CA')}</span>
      </div>
      <div className="flex items-center">
        <Users className="h-4 w-4 mr-1" />
        <span>247 clients actifs</span>
      </div>
    </div>
  );
}

// Composant pour les indicateurs de performance
export function PerformanceIndicators({ className = '' }: { className?: string }) {
  const indicators = [
    { label: "Temps de réponse", value: "< 100ms", status: "excellent" },
    { label: "Disponibilité", value: "99.9%", status: "excellent" },
    { label: "Sécurité", value: "256-bit SSL", status: "excellent" },
    { label: "Sauvegarde", value: "Auto (5min)", status: "excellent" }
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {indicators.map((indicator, index) => (
        <div key={index} className="text-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            indicator.status === 'excellent'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            <div className="w-1.5 h-1.5 bg-current rounded-full mr-1.5"></div>
            {indicator.label}
          </div>
          <p className="text-sm font-semibold text-gray-900 mt-1">{indicator.value}</p>
        </div>
      ))}
    </div>
  );
}
