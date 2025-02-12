import {fireEvent, render, screen, waitFor} from "@testing-library/react";
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

   /* it('updates the card data from the form', () => {

        render(<CreateCardForm />);

        const questionInput = screen.getByLabelText("Question");
        const answerInput = screen.getByLabelText("Answer");
        const tagINput = screen.getByLabelText("Tag");

        fireEvent.change(questionInput, { target: { value: 'What is love?' } });
        fireEvent.change(answerInput, { target: { value: 'Baby don\'t hurt me' } });
        fireEvent.change(tagINput, { target: { value: 'Songs' } });

    });*/



    /*it('creates a card when the form is submitted', async () => {

        let allCards : Card[] = [];
        let addToAllCards = () => jest.fn();
        let postCard = jest.fn();

        let mockAnswerFromAPI = {
            question: 'What is love?',
            answer: 'Baby don\'t hurt me',
            tag: 'Songs',
            id: "aohfohMORGSI892UU4",
            category: "FIRST"

        }

        postCard.mockResolvedValue(mockAnswerFromAPI); // Simulating a successful API response

        render(<CreateCardForm allCards={allCards} addToAllCards={addToAllCards} />);

        const questionInput = screen.getByLabelText("Question") as HTMLInputElement;
        const answerInput = screen.getByLabelText("Answer") as HTMLInputElement;
        const tagINput = screen.getByLabelText("Tag") as HTMLInputElement;
        const submitButton = screen.getByRole("button");

        fireEvent.change(questionInput, { target: { value: 'What is love?' } });
        fireEvent.change(answerInput, { target: { value: 'Baby don\'t hurt me' } });
        fireEvent.change(tagINput, { target: { value: 'Songs' } });

        fireEvent.click(submitButton);

        expect(questionInput.value).toBe('What is love?');
        expect(answerInput.value).toBe('Baby don\'t hurt me');
        expect(tagINput.value).toBe('Songs');

        await waitFor(() => expect(postCard).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(addToAllCards).toHaveBeenCalledWith(mockAnswerFromAPI));


    });*/

});