import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useState} from "react";

type AnkiProps = {
    question: string,
    id: string,
    answer: string,
    tag: string,
    category: string,
    cardIndex: number,
    totalCards: number
}
export default function AnkiCard({question, id, answer, tag, category, cardIndex, totalCards}: AnkiProps){
    console.log(question);
    const [showAnswer, setShowAnswer] = useState(false);

    function submitUserAnswer() {
        //api call to submit user answer
        console.log("User submitted answer");
    }
    function toggleAnswer() {
        setShowAnswer(!showAnswer);
    }

    return (
    <Card sx={{ maxWidth: 275, marginRight: "5vw" }}>
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                Card {cardIndex} / {totalCards}
            </Typography>
            <Typography variant="h5" component="div">
                {question}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Tag: {tag}</Typography>
            <Typography id={"cardAnswerRevealed"} variant="body2">
                {showAnswer && question}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={submitUserAnswer}>Submit</Button>
            <Button size="small" onClick={toggleAnswer}>Reveal Answer</Button>
        </CardActions>
    </Card>
    );
}