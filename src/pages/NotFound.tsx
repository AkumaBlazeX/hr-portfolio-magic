
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <h1 className="text-7xl font-display font-bold text-primary mb-4">404</h1>
        <p className="text-xl font-medium mb-6">Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="cta-button">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
