import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import InvestigationForm from './components/InvestigationForm';

// Set up the mock adapter to intercept axios calls
const mock = new MockAdapter(axios);

const mockSuspects = [
    { suspectID: 1, name: 'Alex Morgan', occupation: 'Software Developer' }
];

describe('Integration Test: Submitting an Investigation', () => {

    // Reset the mock before each test
    beforeEach(() => {
        mock.reset();
    });

    test('successfully submits an investigation to the API', async () => {
        // 1. Set up the mock to intercept the POST request and return a 201 Created
        mock.onPost('https://localhost:7291/api/investigations').reply(201, {
            investigationID: 99,
            caseID: 1,
            suspectID: 1,
            conclusion: 'Test conclusion',
            dateStarted: new Date().toISOString()
        });

        // 2. Mock the onSubmitted callback function
        const mockOnSubmitted = jest.fn();

        // 3. Render the form
        render(<InvestigationForm suspects={mockSuspects} onSubmitted={mockOnSubmitted} />);

        // 4. Fill out the form
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
        fireEvent.change(screen.getByPlaceholderText(/Explain your findings/i), {
            target: { value: 'Alex Morgan is the primary suspect because...' }
        });

        // 5. Click Submit
        fireEvent.click(screen.getByText('SUBMIT INVESTIGATION'));

        // 6. Wait for the asynchronous API call to complete and verify the callback was hit
        await waitFor(() => {
            expect(mockOnSubmitted).toHaveBeenCalledTimes(1);
        });
    });
});