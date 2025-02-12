import CreateCardForm from "./components/CreateCardForm.tsx";
import CardsList from "./components/CardsList.tsx";
import {CSSProperties} from "react";
import {Button} from "@mui/material";

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
            <Button variant="contained" color="primary">Quizz of the day</Button>
            <CardsList />
            <CreateCardForm />
        </div>
    </div>
  )
}

export default App
