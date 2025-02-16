import CreateCardForm from "./components/CreateCardForm.tsx";
import {CSSProperties,} from "react";
import {QuizzOfTheDay} from "./components/QuizzOfTheDay.tsx";
import CardsList from "./components/CardsList.tsx";

const mainStyle: CSSProperties = {
    margin: "2rem",
}

export function App() {
    document.body.style.margin = "0";

    return (
        <div>
            <div id="main" style={mainStyle}>

                <QuizzOfTheDay/>
                <CardsList/>
                <CreateCardForm/>
            </div>
        </div>
    )
}

export default App
