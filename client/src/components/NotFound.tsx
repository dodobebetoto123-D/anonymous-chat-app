import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-4">404 - Page Not Found</h1>
      <p className="lead">The page you are looking for does not exist.</p>
      <a href="/" className="btn btn-primary mt-3">Go to Home</a>
    </div>
  );
};

export default NotFound;