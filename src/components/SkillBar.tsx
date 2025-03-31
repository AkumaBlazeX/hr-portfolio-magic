
import { type Skill } from '../utils/markdown';

interface SkillBarProps {
  skill: Skill;
  index: number;
}

const SkillBar = ({ skill, index }: SkillBarProps) => {
  return (
    <div 
      className="space-y-1.5"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h4 className="text-sm font-medium">{skill.name}</h4>
          <span className="ml-2 px-1.5 py-0.5 text-xs bg-secondary text-secondary-foreground rounded">
            {skill.category}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{skill.proficiency}/5</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <div 
          className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${(skill.proficiency / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
