import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateCardForm from "../src/components/CreateCardForm";

describe('Create card form component', () => {
    it('renders the form', () => {
        render(<CreateCardForm />);

        const questionInput = screen.getByLabelText("Question");
        const answerInput = screen.getByLabelText("Answer");
        const tagINput = screen.getByLabelText("Tag");

        expect(questionInput).toBeInTheDocument();
        expect(answerInput).toBeInTheDocument();
        expect(tagINput).toBeInTheDocument();

    });

    it('updates the card data from the form', () => {

        let cardFormData : CardFormData = {
            question: '',
            answer: '',
            tag: ''
        }

        render(<CreateCardForm data={{cardFormData}} />);

        const questionInput = screen.getByLabelText("Question");
        const answerInput = screen.getByLabelText("Answer");
        const tagINput = screen.getByLabelText("Tag");

        fireEvent.change(questionInput, { target: { value: 'What is love?' } });
        fireEvent.change(answerInput, { target: { value: 'Baby don\'t hurt me' } });
        fireEvent.change(tagINput, { target: { value: 'Songs' } });

        expect(cardFormData.question).toBe('What is love?');
        expect(cardFormData.answer).toBe('Baby don\'t hurt me');
        expect(cardFormData.tag).toBe('Songs');
    });

    it('creates a card when the form is submitted', () => {
        let cardFormData : CardFormData = {
            question: '',
            answer: '',
            tag: ''
        }
        let allCards : Card[] = [];
        let addToAllCards = () => jest.fn();

        render(<CreateCardForm data={cardFormData} allCards={allCards} addToAllCards={addToAllCards} />);
        const submitButton = screen.getByRole("button");
        fireEvent.click(submitButton);
        expect(allCards.length).toBe(1);

    });

});