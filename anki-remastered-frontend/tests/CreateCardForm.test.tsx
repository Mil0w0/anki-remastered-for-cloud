import {render, screen} from "@testing-library/react";
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
});