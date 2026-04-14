import React from 'react';
import LeadCard from './LeadCard';
import './LeadDashboard.css';

const LeadDashboard = ({ leads, loading }) => {
  if (loading) {
    return (
      <div className="lead-dashboard">
        <h2>Lead Dashboard</h2>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading leads...</p>
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="lead-dashboard">
        <h2>Lead Dashboard</h2>
        <div className="empty-state">
          <p>No leads yet. Submit your first lead to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-dashboard">
      <h2>Lead Dashboard</h2>
      <div className="leads-grid">
        {leads.map((lead) => (
          <LeadCard key={lead._id} lead={lead} />
        ))}
      </div>
    </div>
  );
};

export default LeadDashboard;
