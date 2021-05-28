import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DoneAll from '@material-ui/icons/DoneAll';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PanToolIcon from '@material-ui/icons/PanTool';
import { FirestoreCollection } from '@react-firebase/firestore';

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

export default function MyTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <FirestoreCollection path="/payments/" orderBy={[{ field: "date", type: "asc" }, { field: "amount", type: "asc" }]} >
                {
                    payments => {
                        console.log(payments.value);
                        return (
                            payments.value ?
                                payments.value.map((payment) => {
                                    return (
                                        <div>
                                            <span>{payment.amount}</span><span>{payment.name}</span>
                                        </div>
                                    )
                                }) : 'Loading..'
                        )
                    }
                }
            </FirestoreCollection>
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <Tab icon={<AssignmentTurnedInIcon />} label="To Pay" />
                    <Tab icon={<DoneAll />} label="Paid" />
                    <Tab icon={<PanToolIcon />} label="OnHold" />
                </Tabs>
            </Paper>
        </div>
    );
}
