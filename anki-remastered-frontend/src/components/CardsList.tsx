import {use, useEffect, useState} from "react";
import {ResponseCard} from "./CreateCardForm.tsx";
import AnkiCard from "./Card.tsx";

const cardListStyles = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
    padding: "20px",
    margin: "20px",
}
export default function CardsList() {

    const [cards, setCards] = useState<ResponseCard[]>([{id: "1", question: "What is the capital of France?", answer: "Paris", tag: "Geography", category: "General Knowledge"}, {id: "1", question: "What is the capital of France?", answer: "Paris", tag: "Geography", category: "General Knowledge"}]);

  /*  useEffect(() => {
        async function fetchCards() {
            let API_URL = "http://localhost:3000";
            try {
                let response = await fetch(`${API_URL}/cards`);
                let data: ResponseCard[] = await response.json();
                return data;
            }
            catch (error) {
                console.error('Failed to fetch cards' + error);
                return [];
            }
        }
        fetchCards().then((data) => setCards(data));
    }, []);*/

    return (
        <div>
            <h2>Cards List</h2>
            <div id={"cardList"} style={cardListStyles}>
                {cards.map((card, index) => (
                    <AnkiCard id={card.id} tag={card.tag} answer={card.answer} category={card.category} question={card.question} cardIndex={index+1} totalCards={cards.length}/>
                ))}
            </div>
        </div>
    )
}