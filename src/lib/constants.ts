import { Service, SystemStats } from '@/types';

export const SYSTEM_VERSION = '4.0.0-STABLE';

export const SERVICES: Service[] = [
  {
    id: 'profile-service',
    name: 'profile-service',
    version: '1.2.0',
    status: 'healthy',
    description: 'Core profile and bio data',
    uptime: 15778463,
    latency: 12,
  },
  {
    id: 'projects-service',
    name: 'projects-service',
    version: '2.0.5',
    status: 'healthy',
    description: 'Repository telemetry and project details',
    uptime: 15778463,
    latency: 45,
  },
  {
    id: 'experience-service',
    name: 'experience-service',
    version: '1.0.0',
    status: 'healthy',
    description: 'Career deployment history',
    uptime: 15778463,
    latency: 18,
  },
  {
    id: 'analytics-service',
    name: 'analytics-service',
    version: '3.1.0',
    status: 'healthy',
    description: 'Live visitor telemetry and system health',
    uptime: 15778463,
    latency: 89,
    dependencies: ['redis-cache'],
  },
];

export const INITIAL_STATS: SystemStats = {
  visitorCount: 1247,
  totalProjects: 12,
  activeServices: 6,
  uptimePercentage: 99.9,
};
