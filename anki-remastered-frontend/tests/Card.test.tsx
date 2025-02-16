import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import AnkiCard from "../src/components/Card";

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: false,
        statusText: 'Bad Request',
        json: () => Promise.resolve(),
    })
) as jest.Mock;

describe('Anki Card component', () => {

    it('renders the card data', () => {
        const mockCardProps = {
            id: "auibfu",
            question: "What is love?",
            answer: "Baby don't hurt me",
            tag: "Songs",
            category: "FIRST",
            cardIndex: 1,
            totalCards: 1,
            setOpen: function (): any {},
            setCards: function (): any {},
            setError: function (): any {},
            canAnswer: false,
            cards: []
        }

        render(<AnkiCard {...mockCardProps}/>);

        const question = screen.getByText("What is love?");
        const tag = screen.getByText("Tag: Songs");

        expect(question).toBeInTheDocument();
        expect(tag).toBeInTheDocument();
    });

    it('reveals the answer on button clicked', () => {
        const mockCardProps = {
            id: "auibfu",
            question: "What is love?",
            answer: "Baby don't hurt me",
            tag: "Songs",
            category: "FIRST",
            cardIndex: 1,
            totalCards: 1,
            setOpen: function (): any {},
            setCards: function (): any {},
            setError: function (): any {},
            canAnswer: false,
            cards: []
        }

        render(<AnkiCard {...mockCardProps}/>);

        const revealButton = screen.getByText("Reveal Answer");

        expect(screen.queryByText("Answer: Baby don't hurt me")).not.toBeInTheDocument();
        fireEvent.click(revealButton);
        expect(screen.getByText("Answer: Baby don't hurt me")).toBeInTheDocument();
    });

    it('opens the validation dialog when Submit is clicked', () => {
        const mockCardProps = {
            id: "auibfu",
            question: "What is love?",
            answer: "Baby don't hurt me",
            tag: "Songs",
            category: "FIRST",
            cardIndex: 1,
            totalCards: 1,
            setOpen: function (): any {},
            setCards: function (): any {},
            setError: function (): any {},
            canAnswer: true,
            cards: []
        }

        render(<AnkiCard {...mockCardProps}/>);

        const submitButton = screen.getByText("Submit");

        fireEvent.click(submitButton);

        expect(screen.getByText("Let's check your answer!")).toBeInTheDocument();
    });
});