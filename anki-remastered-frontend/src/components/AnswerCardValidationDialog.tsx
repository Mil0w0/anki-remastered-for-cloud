import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
type CardDialogProps = {
    openDialog:boolean,
    setOpenDialog: Function,
    userAnswer:string,
    cardAnswer:string,
    validateUserAnswer: Function,
    validity: boolean
}
export default function AnswerCardValidation({openDialog, setOpenDialog, userAnswer, cardAnswer, validateUserAnswer, validity}: CardDialogProps) {

    function handleValidationAnswer(isValid: boolean) {
        validateUserAnswer(isValid);
        setOpenDialog(false);
    }
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