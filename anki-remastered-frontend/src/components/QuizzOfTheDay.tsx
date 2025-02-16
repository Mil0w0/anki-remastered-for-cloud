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
        const API_URL = "http://localhost:3000";
        try {
            const response = await fetch(`${API_URL}/cards/quizz${queryParams}`);
            if(!response.ok) {
                setError( "Failed to fetch quizz cards" + error);
                setOpen(true);
                return [];
            }
            const cards: ResponseCard[] = await response.json();
            if (cards.length === 0) {
                setError("You already took the quizz today!");
                setOpen(true);
            }
            return cards;
        }
        catch (error) {
            setError( "Failed to fetch quizz cards" + error);
            setOpen(true);
            return [];
        }
    }
    return (
        <div>
            {open &&
                <Alert style={alertStyle} variant="filled" severity="warning" onClose={() => {setOpen(false)}}>
                    {error}
                </Alert>
            }
            <Button variant="contained" color="primary"
                    onClick={() => getQuizzOfTheDay().then((data) => setQuizzCards(data))}>Quizz of the day</Button>
            <h3>Quizz du {quizzDate.toISOString()}</h3>
            <div id={"cardListFromQuizz"} style={cardListStyles}>
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
