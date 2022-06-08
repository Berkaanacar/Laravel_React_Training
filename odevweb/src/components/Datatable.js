import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";



export default function DataList({ personalData }) {

    // const [personalList, setPersonalList] = useState(personalData);
    // useEffect(() => {
    //     console.log(personalData);
    // }, [personalData])
    const columns = [
        {
            name: <h6>Name</h6>,
            selector: row => row.name,
        },
        {
            name: <h6>Surname</h6>,
            selector: row => row.surname,
        },
        {
            name: <h6>Birthday</h6>,
            selector: row => row.birthday,
        },
        {
            name: <h6>Birthplace</h6>,
            selector: row => row.birthplace,
        },
    ];
    return (
        <DataTable
            columns={columns}
            data={personalData}
        />

    );
};