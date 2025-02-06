import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

describe('Create card form component', () => {
    it('renders the form', () => {
        render(<CreateCardForm />);

        const questionInput = screen.getByText("Question");
        const answerInput = screen.getByText("Answer");
        const tagINput = screen.getByText("Tag");

        expect(questionInput).toBeInTheDocument();
        expect(answerInput).toBeInTheDocument();
        expect(tagINput).toBeInTheDocument();

    });
});