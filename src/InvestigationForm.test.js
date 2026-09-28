import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvestigationForm from './components/InvestigationForm';

// Mock suspect data to pass into the component
const mockSuspects = [
    { suspectID: 1, name: 'Alex Morgan', occupation: 'Software Developer' },
    { suspectID: 2, name: 'Jamie Smith', occupation: 'Security Officer' }
];

describe('InvestigationForm Validation', () => {

    // TEST 1: Verify the form renders correctly
    test('renders the form with the submit button', () => {
        render(<InvestigationForm suspects={mockSuspects} onSubmitted={() => { }} />);
        expect(screen.getByText('SUBMIT INVESTIGATION')).toBeInTheDocument();
    });

    // TEST 2 (Part R Required): Cannot submit without selecting a suspect
    test('shows an error message if no suspect is selected', () => {
        render(<InvestigationForm suspects={mockSuspects} onSubmitted={() => { }} />);

        // Click submit without filling anything in
        fireEvent.click(screen.getByText('SUBMIT INVESTIGATION'));

        // Check that the error message appeared
        expect(screen.getByText('You must select a suspect before submitting.')).toBeInTheDocument();
    });

    // TEST 3 (Part R Required): Cannot submit with an empty conclusion
    test('shows an error message if the conclusion is empty', () => {
        render(<InvestigationForm suspects={mockSuspects} onSubmitted={() => { }} />);

        // Select a suspect from the dropdown
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

        // Click submit without typing a conclusion
        fireEvent.click(screen.getByText('SUBMIT INVESTIGATION'));

        // Check that the correct error message appeared
        expect(screen.getByText('You must enter an investigation conclusion.')).toBeInTheDocument();
    });
});