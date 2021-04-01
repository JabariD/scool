import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Authenticate from '../../firebase/auth/Authenticate.js';
import Firestore from '../../firebase/firestore/Firestore.js';

export default function MessagingSearchBar( props ) {
    const DB = new Firestore();

    const [users, setUsers] = useState([]);
    const [valueselected, setValueSelected] = useState(null);
    const [inputValue, setInputValue] = useState('');

    // 2 options
    // query ALL users and let user search that way
    // as user types make repeated calls to firebase to search.

    useEffect( async() => {
        const usersInCollection = await DB.getUsers();
        let usersArray = [];
        usersInCollection.forEach((user) => {
            if (user.id !== Authenticate.user.uid)
                usersArray.push({id: user.id, data: user.data()})
        });
        setUsers(usersArray);
        setValueSelected(null);
        setInputValue('');
    }, [] )


    return (
        <div>
            <Autocomplete
                valueselected={valueselected}
                onChange={(event, newValue) => {
                    setValueSelected(newValue);
                    props.getSelectedUser(newValue); // send message one component up.
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 13 && valueselected) {
                        props.getSelectedUser(valueselected);
                    }
                }}
                id="combo-box-demo"
                options={users}
                getOptionLabel={(user) => user.data.email}
                style={searchBarStyle}
                freeSolo
                renderInput={(params) => <TextField {...params}  InputProps={{...params.InputProps, disableUnderline: true}} placeholder="Search people and groups..." />}
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