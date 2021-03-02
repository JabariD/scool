import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


// This component simply searches the questions that are queried by the current page BY TITLE and does nothing after that
export default function SearchBar(props) {

    const [valueselected, setValueSelected] = useState(null);
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            {console.log(valueselected) /* <------- here's where the data resides*/}
            <Autocomplete
                valueselected={valueselected}
                onChange={(event, newValue) => {
                    setValueSelected(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                }}
                id="combo-box-demo"
                options={props.questions}
                getOptionLabel={(option) => option.data.title}
                style={{ width:"300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white"}}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Search" variant="outlined" placeholder="Enter search term..." />}
            />
        </div>
    )
}
