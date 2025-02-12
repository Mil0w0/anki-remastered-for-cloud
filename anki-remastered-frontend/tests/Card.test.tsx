import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import AnkiCard from "../src/components/Card";

describe('Anki Card component', () => {
    it('renders the card data', () => {

        const card = {
            question: "What is love?",
            answer: "Baby don't hurt me",
            tag: "Songs",
            id: "aohfohMORGSI892UU4",
            category: "FIRST"
        }
        render(<AnkiCard id={card.id} tag={card.tag} answer={card.answer} category={card.category}
                         question={card.question} cardIndex={1} totalCards={1}/>);

        const question = screen.getByText(card.question);
        expect(question).toBeInTheDocument();
    });
});