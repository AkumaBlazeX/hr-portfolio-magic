
import { useProjects } from '../utils/markdown';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedProjects = () => {
  const { projects, loading } = useProjects();
  
  // Show only the first 2 projects on the home page
  const featuredProjects = projects.slice(0, 2);
  
  return (
    <section id="featured" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Highlighted data engineering solutions that demonstrate technical expertise 
            and business impact.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((_, index) => (
              <div key={index} className="h-96 rounded-2xl bg-muted/40 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <div key={project.id} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                to="/projects" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View all projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
