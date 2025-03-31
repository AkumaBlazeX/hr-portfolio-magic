
import { type Experience } from '../utils/markdown';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-md"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <h3 className="text-xl font-semibold">{experience.role}</h3>
            <p className="text-primary font-medium">{experience.company}</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-muted-foreground">{experience.period}</span>
            <p className="text-sm text-muted-foreground">{experience.location}</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Responsibilities</h4>
          <ul className="space-y-2">
            {experience.responsibilities.map((responsibility, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                {responsibility}
              </li>
            ))}
          </ul>
        </div>
        
        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Key Achievements</h4>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
