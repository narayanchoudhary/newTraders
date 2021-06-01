import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DoneAll from '@material-ui/icons/DoneAll';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PanToolIcon from '@material-ui/icons/PanTool';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
    },
});

// const groupBy = key => array =>
//     array.reduce((objectsByKeyValue, obj) => {
//         const value = obj[key];
//         objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
//         return objectsByKeyValue;
//     }, {});

export default function MyTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState("toPay");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.setStatus(newValue);
    };

    return (
        <div>
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <Tab icon={<AssignmentTurnedInIcon />} label="To Pay" value="toPay" />
                    <Tab icon={<DoneAll />} label="Paid" value="paid" />
                    <Tab icon={<PanToolIcon />} label="OnHold" value="onHold" />
                </Tabs>
            </Paper>
        </div >
    );
}
