import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateCardForm from "../src/components/CreateCardForm";

describe('Create card form component', () => {

    beforeEach(() => {
        render(<CreateCardForm />);
    });

    it('renders the form', () => {

        const questionInput = screen.getByLabelText("Question");
        const answerInput = screen.getByLabelText("Answer");
        const tagINput = screen.getByLabelText("Tag");

        expect(questionInput).toBeInTheDocument();
        expect(answerInput).toBeInTheDocument();
        expect(tagINput).toBeInTheDocument();

    });

    it('updates the card data from the form', () => {

        const questionInput = screen.getByLabelText("Question");
        const answerInput = screen.getByLabelText("Answer");
        const tagINput = screen.getByLabelText("Tag");

        fireEvent.change(questionInput, { target: { value: 'What is love?' } });
        fireEvent.change(answerInput, { target: { value: 'Baby don\'t hurt me' } });
        fireEvent.change(tagINput, { target: { value: 'Songs' } });

        expect(questionInput).toHaveValue('What is love?');
        expect(answerInput).toHaveValue('Baby don\'t hurt me');
        expect(tagINput).toHaveValue('Songs');
    });


    it('creates a card when the form is submitted', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                }),
            })
        ) as jest.Mock;

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

       expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('displays an error message when the form submit fails', async () => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: 'Bad Request',
                json: () => Promise.resolve(),
            })
        ) as jest.Mock;

        const questionInput = screen.getByLabelText("Question");
        const answerInput = screen.getByLabelText("Answer");
        const submitButton = screen.getByText("Create Card");

        fireEvent.change(questionInput, { target: { value: 'Who is that pokemon?' } });
        fireEvent.change(answerInput, { target: { value: 'Pikachu' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Failed to create the card :Bad Request')).toBeInTheDocument();
        });
    });


});