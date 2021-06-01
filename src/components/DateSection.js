import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { timestampToDate } from '../utilities';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    open: {
        transition: 'transform 0.4s',
        transform: 'rotateZ(90deg)'
    },
    close: {
        transition: 'transform 0.4s',
        transform: "rotateZ(0deg)",
    },
}));

export function DateSection({ sum, date, nestedPayments }) {
    const classes = useStyles();
    const [toggle, setToggle] = useState(true);
    return (
        <div style={{ maxWidth: '500px', margin: '4px' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#ecfbe74D', overflow: 'hidden' }}>
                <div style={{ borderBottom: toggle ? '1px solid #ccc' : null }}>
                    <IconButton aria-label="delete" onClick={() => setToggle(!toggle)} >
                        <PlayArrowRoundedIcon className={toggle ? classes.open : classes.close} />
                    </IconButton>
                    <span> {timestampToDate(date)}</span>
                    <span> {sum}</span>
                </div>

                {nestedPayments.map((nestedPayment) => {
                    return (
                        <Collapse in={toggle}>
                            <div style={{ backgroundColor: 'white', padding: '4px', display: 'flex', justifyContent: 'space-between' }}>
                                <div>{nestedPayment.amount}</div>
                                <div>{nestedPayment.name}</div>
                            </div>
                        </Collapse>
                    )
                })}
            </div>

        </div>
    )
}