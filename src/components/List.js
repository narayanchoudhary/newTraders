import React from 'react';
import { FirestoreCollection } from '@react-firebase/firestore';

export default function PinnedSubheaderList(props) {

    return (
        <FirestoreCollection
            path="/payments/"
            orderBy={[{ field: "date", type: "asc" }, { field: "amount", type: "asc" }]}
            where={{ field: "status", operator: "==", value: props.status }}
        >
            {
                payments => {
                    return (
                        payments.value ?
                            payments.value.map((payment) => {
                                return (
                                    <div>
                                        <span>{payment.amount}</span>
                                        <span>{new Date(payment.date * 1000).getDate()}</span>
                                        <span>{payment.name}</span>
                                        <span>{payment.status}</span>
                                    </div>
                                )
                            }) : 'Loading..'
                    )
                }
            }
        </FirestoreCollection>
    );
}
