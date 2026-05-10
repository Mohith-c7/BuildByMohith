/**
 * Core System Types for Microservices Portfolio v4.0
 */

export type ServiceHealth = 'healthy' | 'degraded' | 'offline' | 'initializing';

export interface Service {
  id: string;
  name: string;
  version: string;
  status: ServiceHealth;
  description: string;
  uptime: number; // in seconds
  latency: number; // in ms
  dependencies?: string[];
}

export interface SystemStats {
  visitorCount: number;
  totalProjects: number;
  activeServices: number;
  uptimePercentage: number;
}

export interface Project {
  id: string;
  repoName: string;
  description: string;
  status: 'production' | 'beta' | 'experimental';
  stars: number;
  commits: number;
  issues: number;
  stack: string[];
  links: {
    github: string;
    demo?: string;
  };
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  metrics: string[];
  stack: string[];
  version: string; // Career stage version (v1.0 - v4.0)
}
