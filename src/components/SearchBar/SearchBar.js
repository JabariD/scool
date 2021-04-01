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

    console.log(props.questions)

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
                options={props.questions}
                getOptionLabel={(option) => option.data.title}
                style={searchBarStyle}
                freeSolo
                // renderOption={(props, option) => {
                //     console.log(props);
                //     console.log(option);
                //     const { title, color } = option;
                //     return (
                //       <div {...props} style={{ backgroundColor: "blue" }}>
                //         {props.data.title}
                //       </div>
                //     );
                //   }}
                renderInput={(params) => <TextField {...params}  InputProps={{...params.InputProps, disableUnderline: true}} placeholder="Search feed" />}
            />
        </div>
    )
}

const searchBarStyle = {
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
    borderRadius: "18px",
    paddingTop: "7px",
    paddingLeft: "20px"
}
