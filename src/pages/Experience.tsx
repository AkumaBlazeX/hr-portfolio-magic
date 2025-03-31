
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExperienceCard from '../components/ExperienceCard';
import { useIsMobile } from '../hooks/use-mobile';
import { useExperience, type Experience } from '../utils/markdown';

const ExperiencePage = () => {
  const { experience, loading } = useExperience();
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const fadeInAnimationStyle = {
    opacity: 0,
    animation: 'fade-in 0.5s ease-out forwards',
    animationDelay: '200ms'
  };
  
  // Correctly format the timeline style for React
  const timelineStyle = isMobile ? {} : { borderLeft: '2px solid var(--border)' };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-display font-bold mb-4 animate-fade-in">Experience</h1>
          <p className="text-muted-foreground animate-fade-in" style={fadeInAnimationStyle}>
            A timeline of my career path and key achievements.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6">
                <div className="h-6 bg-muted rounded"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative md:pl-8" style={timelineStyle}>
            {experience.map((item, index) => (
              <ExperienceCard 
                key={index}
                experience={item}
                index={index}
              />
            ))}
            
            <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: `${(experience.length * 0.1) + 0.3}s` }}>
              <Link to="/connect" className="cta-button">
                Let's Work Together
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperiencePage;
