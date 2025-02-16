import { render, screen, fireEvent } from '@testing-library/react';
import AnswerCardValidation from "../src/components/AnswerCardValidationDialog";
import "@testing-library/jest-dom";


describe('AnswerCardValidation', () => {

    it('renders dialog with user answer and card answer', () => {
        const mockValidateUserAnswer = jest.fn();
        const mockSetOpenDialog = jest.fn();

        render(
            <AnswerCardValidation
                openDialog={true}
                setOpenDialog={mockSetOpenDialog}
                userAnswer="Pikachu"
                cardAnswer="Pikachu"
                validateUserAnswer={mockValidateUserAnswer}
            />
        );

        expect(screen.getByText("Let's check your answer!")).toBeInTheDocument();
        expect(screen.getByText("Your answer : Pikachu")).toBeInTheDocument();
        expect(screen.getByText("The good answer : Pikachu")).toBeInTheDocument();
        expect(screen.getByText("Decision : you answer is valid")).toBeInTheDocument();
    });

    it('closes the dialog on click', () => {
        const mockValidateUserAnswer = jest.fn();
        const mockSetOpenDialog = jest.fn();

        render(
            <AnswerCardValidation
                openDialog={true}
                setOpenDialog={mockSetOpenDialog}
                userAnswer="Pikachu"
                cardAnswer="Pikachu"
                validateUserAnswer={mockValidateUserAnswer}
            />
        );

        fireEvent.click(screen.getByText('Agree with the decision'));

        expect(mockValidateUserAnswer).toHaveBeenCalledWith(true);

        expect(mockSetOpenDialog).toHaveBeenCalledWith(false);
    });
});
