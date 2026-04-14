import React from 'react';
import './LeadCard.css';

const LeadCard = ({ lead }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return '#f59e0b';
      case 'completed':
        return '#10b981';
      case 'error':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="lead-card">
      <div className="lead-header">
        <div className="lead-info">
          <h3>{lead.name}</h3>
          <p className="company">{lead.company}</p>
          <p className="email">{lead.email}</p>
        </div>
        <div 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(lead.status) }}
        >
          {lead.status === 'processing' && (
            <div className="spinner-small"></div>
          )}
          {getStatusText(lead.status)}
        </div>
      </div>

      <div className="lead-description">
        <h4>Description</h4>
        <p>{lead.description}</p>
      </div>

      {lead.status === 'processing' && (
        <div className="processing-message">
          <p>AI is generating personalized outreach...</p>
        </div>
      )}

      {lead.status === 'completed' && (
        <>
          <div className="lead-summary">
            <h4>AI Summary</h4>
            <p>{lead.summary}</p>
          </div>

          <div className="lead-outreach">
            <h4>Personalized Outreach</h4>
            <div className="outreach-message">
              <pre>{lead.outreachMessage}</pre>
            </div>
          </div>
        </>
      )}

      {lead.status === 'error' && (
        <div className="error-message">
          <p>Failed to generate AI response. Please try again.</p>
        </div>
      )}

      <div className="lead-footer">
        <small>Created: {formatDate(lead.createdAt)}</small>
      </div>
    </div>
  );
};

export default LeadCard;
