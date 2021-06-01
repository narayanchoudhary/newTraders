import React from 'react';
import { FirestoreCollection } from '@react-firebase/firestore';
import { groupByDate } from '../utilities';
import { DateSection } from './DateSection';

export default function PinnedSubheaderList(props) {

    return (
        <FirestoreCollection
            path="/payments/"
            orderBy={[{ field: "date", type: "asc" }, { field: "amount", type: "asc" }]}
            where={{ field: "status", operator: "==", value: props.status }}
        >
            {
                data => {
                    let paymentsGroupedByDate = groupByDate(data.value);

                    return paymentsGroupedByDate.map((date) => {
                        return <DateSection {...date} />
                    })
                }
            }
        </FirestoreCollection>
    );
}
