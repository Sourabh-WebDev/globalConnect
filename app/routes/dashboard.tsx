import React from 'react';
import { useNavigate } from 'react-router';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={() => handleLogout()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
      >
        Logout
      </button>
    </div>
  );
}
