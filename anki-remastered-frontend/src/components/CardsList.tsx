import {CSSProperties, useEffect, useState} from "react";
import {ResponseCard} from "./CreateCardForm.tsx";
import AnkiCard from "./Card.tsx";
import {SearchInput} from "./SearchInput.tsx";
import {InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

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
   const [filterCategory, setFilterCategory] = useState("ALL");

   useEffect(() => {
        async function fetchCards() {
            const queryParams =  searchQuery.length > 0 ? "?tags="+searchQuery : "";
            const API_URL = "http://localhost:3000";
            try {
                const response = await fetch(`${API_URL}/cards${queryParams}`);
                const data: ResponseCard[] = await response.json();
                return data;
            }
            catch (error) {
                console.error('Failed to fetch cards' + error);
                return [];
            }
        }
        fetchCards().then((data) => {
            if(filterCategory === "ALL"){
                setCards(data);
            }else{
                setCards(data.filter((card) => card.category === filterCategory))
            }
        });
    }, [searchQuery,filterCategory]);

   function filterCardsByCategory(e: SelectChangeEvent<HTMLInputElement>) {
       const filterParams = e.target.value as string;
       setFilterCategory(filterParams);
   }


    return (
        <div>
            <h2>All your cards</h2>
           <div className="filters">
               <SearchInput setSearchQuery={setSearchQuery} />
               <InputLabel>Category</InputLabel>
           </div>

            <Select
                // @ts-ignore
                value={filterCategory}
                label="Category"
                onChange={filterCardsByCategory}
            >
                <MenuItem value={"ALL"}>ALL</MenuItem>
                <MenuItem value={"FIRST"}>CAT 1</MenuItem>
                <MenuItem value={"SECOND"}>CAT 2</MenuItem>
                <MenuItem value={"THIRD"}>CAT 3</MenuItem>
                <MenuItem value={"DONE"}>DONE</MenuItem>
            </Select>
            <div id={"cardList"} style={cardListStyles}>
                {cards.map((card, index) => (
                    <AnkiCard id={card.id} tag={card.tag} answer={card.answer}
                              category={card.category} question={card.question}
                              cardIndex={index+1} totalCards={cards.length} canAnswer={false}
                              setCards={setCards} cards={cards} setOpen={()=>{}} setError={()=>{}}/>
                ))}
            </div>
        </div>
    )
}