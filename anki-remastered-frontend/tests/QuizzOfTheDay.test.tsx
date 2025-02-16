import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {QuizzOfTheDay} from "../src/components/QuizzOfTheDay";

// Mock the AnkiCard component
jest.mock('../src/components/Card', () => ({
    __esModule: true,
    default: ({ question, answer }: { question: string; answer: string }) => (
        <div>{`${question}: ${answer}`}</div>
    ),
}));

// Mock the fetch API
global.fetch = jest.fn();

describe('QuizzOfTheDay', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    it('renders the quizz', () => {
        render(<QuizzOfTheDay/>);

        // Check if the quiz date is displayed correctly
        expect(screen.getByText(/Quizz du/)).toBeInTheDocument();
    });

    it('should display an error message if there is an error fetching cards', async () => {
        // Mock a failed API call
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => [],
        });

        render(<QuizzOfTheDay/>);

        fireEvent.click(screen.getByText('Quizz of the day'));

        await waitFor(() => screen.getByText('Failed to fetch quizz cards'));
        expect(screen.getByText('Failed to fetch quizz cards')).toBeInTheDocument();
    });

    it('should display a warning if the quizz has already been taken today', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        render(<QuizzOfTheDay/>);
        fireEvent.click(screen.getByText('Quizz of the day'));


        await waitFor(() => screen.getByText('You already took the quizz today!'));
        expect(screen.getByText('You already took the quizz today!')).toBeInTheDocument();
    });

});