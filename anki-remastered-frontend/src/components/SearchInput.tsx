import {IconButton, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function SearchInput({setSearchQuery}: {setSearchQuery: Function}) {
    return (
    <form>
        <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
                // @ts-ignore
                setSearchQuery(e.target.value);
            }}
            label="Enter a tag to filter"
            variant="outlined"
            placeholder="Ex: Gaming"
            size="small"
        />
        <IconButton type="submit" aria-label="search">
            <SearchIcon style={{fill: "blue"}}/>
        </IconButton>
    </form>
    );
}