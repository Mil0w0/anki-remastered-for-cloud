import {useState} from "react";
import {ResponseCard} from "./CreateCardForm.tsx";
import {Button} from "@mui/material";
import {cardListStyles} from "./CardsList.tsx";
import AnkiCard from "./Card.tsx";

export function QuizzOfTheDay() {

    //const [isLoadingQuizz, setIsLoadingQuizz] = useState(false);
    const [quizzCards, setQuizzCards] = useState<ResponseCard[]>([]);
    async function getQuizzOfTheDay() {
        const queryParams = "?date=" + new Date().toISOString();
        //console.log(queryParams);
        let API_URL = "http://localhost:3000";
        try {
            let response = await fetch(`${API_URL}/cards/quizz${queryParams}`);
            let cards: ResponseCard[] = await response.json();
            return cards;
        }
        catch (error) {
            console.error('Failed to fetch quizz cards' + error);
            return [];
        }
    }
    return (
        <div>
            <Button variant="contained" color="primary"
                    onClick={() => getQuizzOfTheDay().then((data) => setQuizzCards(data))}>Quizz of the day</Button>
            <h2>Quizz du {new Date().toDateString()}</h2>
            <div id={"cardList"} style={cardListStyles}>
                {quizzCards.map((card, index) => (
                    <AnkiCard id={card.id} tag={card.tag} answer={card.answer} category={card.category}
                              question={card.question} cardIndex={index + 1} totalCards={quizzCards.length}
                              canAnswer={true} setCards={setQuizzCards} cards={quizzCards}/>
                ))}
            </div>
        </div>

    )
}
