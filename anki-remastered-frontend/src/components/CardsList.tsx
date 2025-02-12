import {CSSProperties, use, useEffect, useState} from "react";
import {ResponseCard} from "./CreateCardForm.tsx";
import AnkiCard from "./Card.tsx";
import {SearchInput} from "./SearchInput.tsx";

export const cardListStyles : CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
    padding: "20px",
    margin: "20px",
}
export default function CardsList() {

   const [cards, setCards] = useState<ResponseCard[]>([]);
   const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
        async function fetchCards() {
            const queryParams =  searchQuery.length > 0 ? "?tag="+searchQuery : "";
            let API_URL = "http://localhost:3000";
            try {
                let response = await fetch(`${API_URL}/cards${queryParams}`);
                let data: ResponseCard[] = await response.json();
                return data;
            }
            catch (error) {
                console.error('Failed to fetch cards' + error);
                return [];
            }
        }
        fetchCards().then((data) => setCards(data));
    }, [searchQuery]);

    return (
        <div>
            <h2>All your cards</h2>
            <SearchInput setSearchQuery={setSearchQuery} />
            <div id={"cardList"} style={cardListStyles}>
                {cards.map((card, index) => (
                    <AnkiCard id={card.id} tag={card.tag} answer={card.answer} category={card.category} question={card.question} cardIndex={index+1} totalCards={cards.length} canAnswer={false} setCards={setCards} cards={cards}/>
                ))}
            </div>
        </div>
    )
}