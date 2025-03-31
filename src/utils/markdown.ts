import { useEffect, useState } from 'react';

// Define types for our content
export interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  results: string[];
  date: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id?: string;
  role: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 1-5
}

export type WorkStatus = 'Open to Work' | 'Currently Employed';

// Mock data for projects
export const useProjects = (): { projects: Project[], loading: boolean } => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from markdown files
    setTimeout(() => {
      setProjects([
        {
          id: 'project-1',
          title: 'Enterprise Data Pipeline Optimization',
          description: 'Redesigned ETL processes to improve data processing efficiency and reduce operational costs.',
          tools: ['Apache Spark', 'Airflow', 'AWS Glue', 'Python'],
          results: [
            'Reduced processing time by 65%',
            'Decreased cloud infrastructure costs by 40%',
            'Improved data accuracy by implementing robust validation'
          ],
          date: '2023',
          githubUrl: 'https://github.com/AkumaBlazeX?tab=repositories',
          liveUrl: 'https://github.com/AkumaBlazeX?tab=repositories'
        },
        {
          id: 'project-2',
          title: 'Real-time Analytics Dashboard',
          description: 'Developed a comprehensive real-time analytics solution for monitoring business KPIs and customer behavior.',
          tools: ['Kafka', 'Elasticsearch', 'Kibana', 'React'],
          results: [
            'Enabled real-time decision making',
            'Consolidated 7 legacy reporting systems',
            'Reduced time-to-insight from days to minutes'
          ],
          date: '2022',
          githubUrl: 'https://github.com/AkumaBlazeX?tab=repositories',
          liveUrl: 'https://github.com/AkumaBlazeX?tab=repositories'
        },
        {
          id: 'project-3',
          title: 'Data Quality Framework Implementation',
          description: 'Created an automated data quality monitoring system to ensure consistent data integrity across the organization.',
          tools: ['Python', 'dbt', 'Great Expectations', 'Snowflake'],
          results: [
            'Automated 95% of data quality checks',
            'Identified and remediated critical data inconsistencies',
            'Established company-wide data quality standards'
          ],
          date: '2021',
          githubUrl: 'https://github.com/AkumaBlazeX?tab=repositories',
          liveUrl: 'https://github.com/AkumaBlazeX?tab=repositories'
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return { projects, loading };
};

// Experience data
export const useExperience = (): { experience: Experience[], loading: boolean } => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from markdown files
    setTimeout(() => {
      setExperience([
        {
          id: 'exp-1',
          role: 'Data Analyst',
          company: 'Omnicom Media Services',
          period: '2024 - Present',
          location: 'Bangalore, Karnataka, India',
          responsibilities: [
            'Built Altryex workflows to transform the ad-genrated data into the needed way',
            'Using tableau for genral and direct reporting',
            'Direct engagment with clients discussing about the Ad- Data descripencies and much more',
            'Made Automation about 30% of the recurring work'
          ],
          achievements: []
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return { experience, loading };
};

// Mock data for skills
export const useSkills = (): { skills: Skill[], loading: boolean } => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from markdown files
    setTimeout(() => {
      setSkills([
        { id: 'skill-1', name: 'Python', category: 'Programming', proficiency: 5 },
        { id: 'skill-2', name: 'SQL', category: 'Data', proficiency: 5 },
        { id: 'skill-3', name: 'Apache Spark', category: 'Big Data', proficiency: 4 },
        { id: 'skill-4', name: 'AWS', category: 'Cloud', proficiency: 4 },
        { id: 'skill-5', name: 'Airflow', category: 'Orchestration', proficiency: 5 },
        { id: 'skill-6', name: 'Kafka', category: 'Streaming', proficiency: 3 },
        { id: 'skill-7', name: 'dbt', category: 'Data Transformation', proficiency: 4 },
        { id: 'skill-8', name: 'Docker', category: 'Containerization', proficiency: 4 },
        { id: 'skill-9', name: 'Kubernetes', category: 'Orchestration', proficiency: 3 },
        { id: 'skill-10', name: 'Snowflake', category: 'Data Warehouse', proficiency: 4 },
        { id: 'skill-11', name: 'Terraform', category: 'Infrastructure as Code', proficiency: 3 },
        { id: 'skill-12', name: 'Git', category: 'Version Control', proficiency: 5 }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return { skills, loading };
};

// Work status data
export const useWorkStatus = (): { status: WorkStatus, loading: boolean } => {
  const [status, setStatus] = useState<WorkStatus>('Currently Employed');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from status.md file
    setTimeout(() => {
      setStatus('Currently Employed');
      setLoading(false);
    }, 500);
  }, []);

  return { status, loading };
};
