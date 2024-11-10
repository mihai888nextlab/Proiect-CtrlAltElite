import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
      window.location.href = '/home';
  }, []);

  return <div>Redirecting...</div>;
};

export default MyComponent;