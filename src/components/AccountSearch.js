import React from 'react';
import './AccountSearch.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FirestoreCollection } from '@react-firebase/firestore';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export default function AccountSearch() {

    return (
        <FirestoreCollection path="/accounts/" orderBy={[{ field: "name", type: "asc" }]} >
            {accounts => {
                return (
                    <div className="wrapper">
                        <Autocomplete
                            id="accountSearch"
                            options={accounts.value ? accounts.value : []}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300 }}
                            openOnFocus={true}
                            clearOnBlur={false}
                            renderInput={(params) => {
                                // This line is just for capitalization of input :) 
                                params = { ...params, inputProps: { ...params.inputProps, style: { ...params.inputProps.style, textTransform: 'capitalize' } } }
                                return <TextField autoFocus {...params} label="Select Account" variant="outlined" />
                            }}
                            autoHighlight={true}
                            renderOption={(option, { inputValue }) => {
                                const matches = match(option.name, inputValue);
                                const parts = parse(option.name, matches);

                                return (
                                    <div style={{ textTransform: 'capitalize' }}>
                                        {parts.map((part, index) => (
                                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                {part.text}
                                            </span>
                                        ))}
                                    </div>
                                );
                            }}
                        />
                    </div>);
            }}
        </FirestoreCollection>
    );
}
