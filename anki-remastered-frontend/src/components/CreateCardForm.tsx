import Paper from '@mui/material/Paper'
import {Button, FormControl, TextField} from "@mui/material";
import {formStyle, paperStyle} from "../styles/CreateComponentFormStyles";

export default function CreateCardForm() {

    return (
        <>
            <Paper  elevation={1} style={paperStyle}>

                <h1>Create a card</h1>

                <FormControl style={formStyle}>
                    <TextField name="question" placeholder="ex: Who is that pokemon?" label="Question" />
                    <TextField name="answer" placeholder="ex: Pikachu" label="Answer" />
                    <TextField name="tag" placeholder="ex: Gaming" label="Tag" />
                    <Button variant="contained" color="primary">Create Card</Button>
                </FormControl>

            </Paper>
        </>
    )
}