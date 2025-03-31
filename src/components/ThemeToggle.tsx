
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 150);
  };

  if (!mounted) {
    return <div className="w-10 h-10"></div>;
  }

  return (
    <button
      onClick={toggleTheme}
      disabled={isAnimating}
      className={cn(
        "w-10 h-10 rounded-full transition-all duration-500 relative overflow-hidden",
        "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
        "border border-border",
        theme === "dark" 
          ? "bg-gradient-to-br from-slate-900 to-indigo-950" 
          : "bg-gradient-to-br from-amber-100 to-sky-200"
      )}
      aria-label="Toggle theme"
    >
      {/* Background effects based on theme */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          theme === "dark" 
            ? "opacity-100 bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.15)_0%,_rgba(17,24,39,0)_70%)]" 
            : "opacity-0"
        )}
      />
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          theme === "light" 
            ? "opacity-100 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.2)_0%,_rgba(255,255,255,0)_70%)]" 
            : "opacity-0"
        )}
      />
      
      {/* Stars in dark mode */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-500 pointer-events-none",
          theme === "dark" ? "opacity-100" : "opacity-0"
        )}
      >
        {[...Array(6)].map((_, i) => (
          <span 
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Sun/Moon icons with enhanced styling */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-transform duration-500",
          isAnimating && theme === "dark" ? "scale-75 opacity-0" : "scale-100 opacity-100"
        )}
      >
        {theme === "dark" ? (
          <div className="relative">
            <Moon className="h-5 w-5 text-slate-200" strokeWidth={1.5} />
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-slate-200/10 to-slate-100/5 blur-[1px]" />
          </div>
        ) : (
          <div className="relative">
            <Sun className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/40 to-amber-100/20 blur-[1px]" />
            <span className="absolute -inset-1 rounded-full bg-amber-300/10 animate-pulse" style={{ animationDuration: "3s" }} />
          </div>
        )}
      </div>

      {/* Transition effects */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-500 rounded-full",
          isAnimating ? "opacity-100" : "opacity-0",
          theme === "dark" 
            ? "bg-gradient-to-br from-amber-200 to-amber-400" 
            : "bg-gradient-to-br from-slate-700 to-indigo-900"
        )}
      />
    </button>
  );
}
