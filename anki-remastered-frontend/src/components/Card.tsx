import {Button, Card, CardActions, CardContent, FormControl, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {formStyle} from "../styles/CreateComponentFormStyles.ts";
import {ResponseCard} from "./CreateCardForm.tsx";

type AnkiProps = {
    question: string,
    id: string,
    answer: string,
    tag: string,
    category: string,
    cardIndex: number,
    totalCards: number,
    canAnswer: boolean,
    setCards: Function,
    cards: ResponseCard[]
}
export default function AnkiCard({question, id, answer, tag, category, cardIndex, totalCards, canAnswer, setCards, cards}: AnkiProps){

    console.log(id, category);
    const [showAnswer, setShowAnswer] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [error, setError] = useState("");

    function handleUserAnswer(e: ChangeEvent<HTMLInputElement>){
        setUserAnswer(e.target.value);
    }

    async function updateCardCategory(isValid: boolean) {
        try {
            let API_URL = "http://localhost:3000";
            let response = await fetch(`${API_URL}/cards/${id}/answer`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({isValid: isValid, date: new Date().toISOString()}),
            });

            if (!response.ok) {
                setError('Failed to update the card s category : ' + response.statusText);
            }
        }catch (error) {
            setError('Failed to update the card' + error);
        }
    }

    function submitUserAnswer() {
        updateCardCategory(userAnswer === answer).then(() => {
            console.log("User isValid answer : " + userAnswer === answer);
            setError(userAnswer === answer ? "C'est ça bg" : "Wrong looser!");
            //setCards(cards.filter(card => card.id !== id));
        }).catch((e) => {
            setError('Failed to update the card' + error);
        });
    }

    function toggleAnswer() {
        setShowAnswer(!showAnswer);
    }

    return (
    <Card sx={{ maxWidth: 275, marginRight: "5vw"}}>
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                Card {cardIndex} / {totalCards}
            </Typography>
            <Typography variant="h5" component="div">
                {question}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Tag: {tag}</Typography>
            <FormControl>
                {canAnswer && <TextField name="userAnswer" placeholder="" label="Your answer" onChange={handleUserAnswer}></TextField>}
            </FormControl>
            <Typography id={"cardAnswerRevealed"} style={{color: "green"}} variant="body2">
                {showAnswer && "Answer: " + answer}
            </Typography>
            <Typography id={"cardErrorUpdated"} style={{color: "red"}} variant="body2">
                {error}
            </Typography>
        </CardContent>
        <CardActions>
            {canAnswer && <Button size="small" onClick={submitUserAnswer}>Submit</Button>}
            {!canAnswer && <Button size="small" onClick={toggleAnswer}>Reveal Answer</Button> }
        </CardActions>
    </Card>
    );
}