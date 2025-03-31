
import { Code, Database, Network, Server, Bot } from 'lucide-react';

const AboutSection = () => {
  const expertise = [
    {
      icon: <Database className="w-10 h-10 text-primary" />,
      title: 'Data Architecture',
      description: 'Designing scalable, efficient data systems that grow with your business needs.'
    },
    {
      icon: <Code className="w-10 h-10 text-primary" />,
      title: 'Data Pipeline Development',
      description: 'Building robust ETL/ELT processes for reliable data transformation and loading.'
    },
    {
      icon: <Server className="w-10 h-10 text-primary" />,
      title: 'Cloud Infrastructure',
      description: 'Implementing cloud-native data solutions on AWS, Azure, and GCP platforms.'
    },
    {
      icon: <Bot className="w-10 h-10 text-primary" />,
      title: 'AI Agents & Workflows',
      description: 'Creating custom RAG agents and automation workflows using n8n and make.ai platforms.'
    }
  ];

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">About My Expertise</h2>
          <p className="text-muted-foreground">
            With a focus on collaboration, reliability, and data-driven impact, I build solutions 
            that transform how organizations leverage their data assets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertise.map((item, index) => (
            <div 
              key={index} 
              className="glass-card rounded-2xl p-6 text-center transition-transform hover:translate-y-[-5px] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center animate-blur-in">
          <h3 className="text-2xl font-semibold mb-4">Ready to transform your data strategy?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're looking to optimize existing data systems or build new data capabilities,
            I bring the technical expertise and business acumen to deliver impactful solutions.
          </p>
          <a href="/connect" className="cta-button">
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
