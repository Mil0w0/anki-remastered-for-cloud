export default function CreateCardForm() {
    return (
        <>
            <form>
                <label htmlFor="question">Question</label>
                <input type="text" name="question" placeholder="ex: Who is that pokemon?" />
                <label htmlFor="answer">Answer</label>
                <input type="text" name="answer" placeholder="ex: Pikachu" />
                <label htmlFor="tag">Tag</label>
                <input type="text" name="tag" placeholder="ex: Gaming" />
                <button type="submit">Create Card</button>
            </form>
        </>
    )
}