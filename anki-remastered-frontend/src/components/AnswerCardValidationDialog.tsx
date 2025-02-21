import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";
type CardDialogProps = {
    openDialog:boolean,
    setOpenDialog: Function,
    userAnswer:string,
    cardAnswer:string,
    validateUserAnswer: Function,
}
export default function AnswerCardValidation({openDialog, setOpenDialog, userAnswer, cardAnswer, validateUserAnswer}: CardDialogProps) {

    function handleValidationAnswer(isValid: boolean) {
        validateUserAnswer(isValid);
        setOpenDialog(false);
    }
    const [validity, setValidity] = useState<boolean>(false);
    async function handleValidity() {
        const CLOUD_FUNC_URL = "https://http-triggered-card-comparison-1098142107823.europe-west1.run.app"
        const response = await fetch(`${CLOUD_FUNC_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userAnswer: userAnswer, cardAnswer: cardAnswer}),
        });

        if (!response.ok) {
            console.log("erreur");
        }else{

            const data : {isValid: boolean} = await response.json();
            console.log(data);
            const isValid = data.isValid;
            validateUserAnswer(isValid);
            setOpenDialog(false);
        }

    }

    useEffect(() => {
        handleValidity().then(() => setValidity(true)).catch(() => console.error("Error occured"));
    }, [userAnswer])

    return (
        <Dialog
            open={openDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
               Let's check your answer!
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Your answer : {userAnswer}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    The good answer : {cardAnswer}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    Decision : you answer is {validity ? "" : "not"} valid
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleValidationAnswer(cardAnswer === userAnswer )}>Agree with the decision</Button>
                <Button onClick={() => handleValidationAnswer(!(cardAnswer === userAnswer ))} autoFocus>
                    Disagree
                </Button>
            </DialogActions>
        </Dialog>
    )
}