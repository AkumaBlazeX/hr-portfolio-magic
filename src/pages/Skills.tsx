
import { useEffect, useState } from 'react';
import { useSkills } from '../utils/markdown';
import SkillBar from '../components/SkillBar';

const Skills = () => {
  const { skills, loading } = useSkills();
  const [filter, setFilter] = useState<string>('All');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get unique categories
  const categories = loading ? [] : ['All', ...new Set(skills.map(skill => skill.category))];
  
  // Filter skills by category
  const filteredSkills = filter === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === filter);
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-display font-bold mb-4 animate-fade-in">Skills & Expertise</h1>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '100ms' }}>
            A comprehensive overview of my technical capabilities and proficiencies.
          </p>
        </div>
        
        {loading ? (
          <div className="space-y-6 max-w-3xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="h-8 rounded-full bg-muted/40 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap justify-center gap-2 animate-fade-in">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {filteredSkills.map((skill, index) => (
                <div key={skill.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <SkillBar skill={skill} index={index} />
                </div>
              ))}
            </div>
          </>
        )}
        
        <div className="mt-16 glass-card rounded-2xl p-10 max-w-3xl mx-auto animate-scale-in">
          <h2 className="text-2xl font-semibold mb-6 text-center">My Approach</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Data-Driven Problem Solving</h3>
              <p className="text-muted-foreground">
                I approach each project by first understanding the business context and requirements,
                then designing data solutions that deliver measurable impact.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Continuous Learning</h3>
              <p className="text-muted-foreground">
                The data landscape evolves rapidly. I continuously expand my skills and stay 
                current with emerging technologies and best practices.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Collaboration & Communication</h3>
              <p className="text-muted-foreground">
                Beyond technical skills, I excel at translating complex data concepts into 
                clear, actionable insights for stakeholders at all levels.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/connect" className="cta-button">
              Let's Work Together
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
