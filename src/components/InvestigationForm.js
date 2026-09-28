import React, { useState } from 'react';
import axios from 'axios';

function InvestigationForm({ suspects, onSubmitted }) {
    // Part Q: React State for the form
    const [selectedSuspectId, setSelectedSuspectId] = useState('');
    const [conclusion, setConclusion] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Part R: Basic form validation
        if (!selectedSuspectId) {
            setError('You must select a suspect before submitting.');
            return;
        }
        if (conclusion.trim() === '') {
            setError('You must enter an investigation conclusion.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Part M: POST request to the API
            const payload = {
                caseID: 1, // Assuming Case ID is 1
                suspectID: parseInt(selectedSuspectId),
                conclusion: conclusion,
                dateStarted: new Date().toISOString()
            };

            const response = await axios.post('https://localhost:7291/api/investigations', payload);

            if (onSubmitted) {
                onSubmitted(response.data);
            }
        } catch (err) {
            console.error("Submission error:", err);
            setError('There was an error submitting the investigation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Select Suspect:</label>
                <select
                    value={selectedSuspectId}
                    onChange={(e) => setSelectedSuspectId(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">-- Choose a suspect --</option>
                    {suspects.map(s => (
                        <option key={s.suspectID} value={s.suspectID}>{s.name} ({s.occupation})</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Investigation Conclusion:</label>
                <textarea
                    rows="5"
                    value={conclusion}
                    onChange={(e) => setConclusion(e.target.value)}
                    placeholder="Explain your findings and why you believe this suspect is responsible..."
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                />
            </div>

            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                style={{ width: '100%', padding: '12px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.1rem', cursor: 'pointer' }}
            >
                {isSubmitting ? 'Submitting...' : 'SUBMIT INVESTIGATION'}
            </button>
        </form>
    );
}

export default InvestigationForm;