import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import LeadForm from './components/LeadForm';
import LeadDashboard from './components/LeadDashboard';
import './App.css';

// Use production Railway backend URL when deployed, localhost for development
const socketUrl = process.env.NODE_ENV === 'production' 
  ? 'ai-lead-generation-api-server-production.up.railway.app' 
  : 'http://localhost:5000';

const socket = io(socketUrl);

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial leads
    fetchLeads();

    // Listen for real-time updates
    socket.on('lead-updated', (updatedLead) => {
      setLeads(prevLeads => {
        const index = prevLeads.findIndex(lead => lead._id === updatedLead._id);
        if (index !== -1) {
          const newLeads = [...prevLeads];
          newLeads[index] = updatedLead;
          return newLeads;
        } else {
          return [updatedLead, ...prevLeads];
        }
      });
    });

    return () => {
      socket.off('lead-updated');
    };
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (leadData) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to create lead');
      }
      
      // The lead will be added automatically via socket event
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Failed to submit lead. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Lead Generator</h1>
        <p>Generate personalized outreach with AI</p>
      </header>
      
      <main className="App-main">
        <div className="form-section">
          <LeadForm onSubmit={handleLeadSubmit} />
        </div>
        
        <div className="dashboard-section">
          <LeadDashboard leads={leads} loading={loading} />
        </div>
      </main>
    </div>
  );
}

export default App;
