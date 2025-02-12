import Paper from '@mui/material/Paper'
import {Button, FormControl, TextField} from "@mui/material";
import {formStyle, paperStyle} from "../styles/CreateComponentFormStyles";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";

type CardFormData = {
    question: string;
    answer: string;
    tag: string;
}
const initialCardFormData: CardFormData = {
    question: '',
    answer: '',
    tag: ''
}
export type ResponseCard = {
    id:string;
    question: string;
    answer: string;
    tag: string;
    category: string;
}

/*type CreateCardFormProps = {
    cardFormData: CardFormData
}*/

export default function CreateCardForm() {

    const [formData, setFormData] = useState<CardFormData>(initialCardFormData);
    const [error, setError] = useState<string | null>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));
    };

    async function postCard(formData: CardFormData) {
        try {
            let API_URL = "http://localhost:3000";
            let response = await fetch(`${API_URL}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                setError('Failed to create the card' + response.statusText);
            }
            console.log(response);
            let data: ResponseCard = await response.json();
            return data;
        }catch (error) {
            setError('Failed to create the card' + error);
            return {} as ResponseCard;
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Call the API to create the card
            const newCard: ResponseCard = await postCard(formData);
            if (!newCard.id) {
                return;
            }
           // addToAllCards(newCard);
        } catch (error) {
            setError('Failed to create the card' + error);
        } finally {
            // Reset form fields
            setFormData({question: '', answer: '', tag: ''});
        }

    }

    return (
        <>
                <h2>Create a card</h2>

                {error && <p>{error}</p>}
                <FormControl style={formStyle}>
                    <TextField name="question" placeholder="ex: Who is that pokemon?" label="Question" onChange={handleChange} />
                    <TextField name="answer" placeholder="ex: Pikachu" label="Answer" onChange={handleChange} />
                    <TextField name="tag" placeholder="ex: Gaming" label="Tag" onChange={handleChange} />
                    <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>Create Card</Button>
                </FormControl>

        </>
    )
}