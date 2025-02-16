import { Button, Card, CardActions, CardContent, FormControl, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {ResponseCard} from "./CreateCardForm.tsx";
import AnswerCardValidation from "./AnswerCardValidationDialog.tsx";

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
    setError: Function
    setOpen: Function,
    answerDate?: string,
}
export default function AnkiCard({question, id, answer, tag, category, cardIndex, totalCards, canAnswer, setCards, cards, setError, setOpen, answerDate}: AnkiProps){

    const [showAnswer, setShowAnswer] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    function handleUserAnswer(e: ChangeEvent<HTMLInputElement>){
        setUserAnswer(e.target.value);
    }

    async function updateCardCategory(isValid: boolean, answerDate: string) {
        try {
            let API_URL = "http://localhost:3000";
            let response = await fetch(`${API_URL}/cards/${id}/answer`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({isValid: isValid, date: answerDate}),
            });

            if (!response.ok) {
                setOpen(true);
                setError('Failed to update the card s category : ' + response.statusText);
            }
        }catch (error) {
            setOpen(true);
            setError('Failed to update the card' + error);
        }
    }

    function openAnswerValidationDialog() {
        setOpenDialog(true);
    }

    function validateUserAnswer(isValid: boolean) {
        updateCardCategory(isValid, answerDate ? answerDate : new Date().toISOString()).then(() => {
            setCards(cards.filter(card => card.id !== id));
            setUserAnswer("");
        }).catch((e) => {
            setError('Failed to update the card' + e);
            setOpen(true);
        });
    }

    function toggleAnswer() {
        setShowAnswer(!showAnswer);
    }

    return (
    <Card key={id} sx={{ maxWidth: 275, marginRight: "5vw", marginTop: "4vh" }}>
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
        </CardContent>
        <CardActions>
            {canAnswer && <Button size="small" onClick={openAnswerValidationDialog}>Submit</Button>}
            {!canAnswer && <Button size="small" onClick={toggleAnswer}>Reveal Answer</Button> }
        </CardActions>

        <AnswerCardValidation openDialog={openDialog} setOpenDialog={setOpenDialog} cardAnswer={answer} userAnswer={userAnswer} validateUserAnswer={validateUserAnswer} />

    </Card>
    );
}