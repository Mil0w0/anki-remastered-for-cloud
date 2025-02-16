import {CSSProperties, useState} from "react";
import {ResponseCard} from "./CreateCardForm.tsx";
import {Alert, Button} from "@mui/material";
import {cardListStyles} from "./CardsList.tsx";
import AnkiCard from "./Card.tsx";

const alertStyle : CSSProperties = {
    position: "absolute",
    top: "9vh",
    right: "2vw",
}
export function QuizzOfTheDay() {

    const [quizzCards, setQuizzCards] = useState<ResponseCard[]>([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [quizzDate, setQuizzDate] = useState(new Date());

    async function getQuizzOfTheDay() {
        const queryParams = "?date=" + quizzDate.toISOString(); // TEST TMRW: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString();
        let API_URL = "http://localhost:3000";
        try {
            let response = await fetch(`${API_URL}/cards/quizz${queryParams}`);
            let cards: ResponseCard[] = await response.json();
            return cards;
        }
        catch (error) {
            setError( "Failed to fetch quizz cards" + error);
            setOpen(false);
            return [];
        }
    }
    return (
        <div>
            {open &&
                <Alert style={alertStyle} variant="filled" severity="success" onClose={() => {setOpen(false)}}>
                    {error}
                </Alert>
            }
            <Button variant="contained" color="primary"
                    onClick={() => getQuizzOfTheDay().then((data) => setQuizzCards(data))}>Quizz of the day</Button>
            <h2>Quizz du {quizzDate.toISOString()}</h2>
            <div id={"cardList"} style={cardListStyles}>
                {quizzCards.map((card, index) => (
                    <AnkiCard id={card.id} tag={card.tag} answer={card.answer} category={card.category}
                              question={card.question} cardIndex={index + 1} totalCards={quizzCards.length}
                              canAnswer={true} setCards={setQuizzCards} cards={quizzCards}
                              setOpen={setOpen} setError={setError} answerDate={quizzDate.toISOString()}
                    />
                ))}
            </div>
        </div>

    )
}
