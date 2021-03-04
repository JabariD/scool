import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// React Router
import { useHistory } from 'react-router-dom';


// This component simply searches the questions that are queried by the current page BY TITLE and does nothing after that
export default function SearchBar(props) {
    const history = useHistory();
    const [valueselected, setValueSelected] = useState(null);
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            {console.log(valueselected) /* <------- here's where the data resides*/}
            <Autocomplete
                valueselected={valueselected}
                onChange={(event, newValue) => {
                    setValueSelected(newValue);
                    history.push(`/${props.questionCollectionID}/${newValue.id}`); // push to history
                    
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
