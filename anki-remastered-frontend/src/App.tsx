import CreateCardForm from "./components/CreateCardForm.tsx";
import {CSSProperties,} from "react";
import {QuizzOfTheDay} from "./components/QuizzOfTheDay.tsx";
import CardsList from "./components/CardsList.tsx";

const headerStyle: CSSProperties = {
    backgroundColor: "black",
    minHeight: "8vh",
}
const mainStyle = {
    margin: "2rem",
}

function App() {
    document.body.style.margin = "0";

    return (
        <div>
            <div style={headerStyle}></div>
            <div id="main" style={mainStyle}>

                <QuizzOfTheDay/>
                <CardsList/>
                <CreateCardForm/>
            </div>
        </div>
    )
}

export default App
