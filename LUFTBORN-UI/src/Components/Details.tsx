import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


import ComplainDataService from '../Services/Complain.service';
import EmployeeRequest from '../Models/EmployeeRequest';
import Employee from '../Models/Employee';

type State = {
    id: number
}

let Req: Employee = {
    address: '',
    age: 0,
    id: 0,
    name: '',
    isDeleted: false
};

export default function Details() {
    const location = useLocation();
    console.log(location);

    const { id } = location.state as State;

    let [EmployeeReq, setEmployeeReq] = useState(Req);


    useEffect(() => {
        console.log(id);

        let Req: EmployeeRequest = {
            id: id
        };

        ComplainDataService.GetEmployeeById(Req).then((result) => {

            console.log(result.data);
            setEmployeeReq(result.data.employee);

        }).catch((err) => {
            console.error(err);
        });

    }, []);


    return (
        <div>
            <div>Details</div>


            <Link to='/'>List</Link>

            <br />
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">ID</label>
                <div className="col-sm-10" >
                    <input className="form-control" type="text" value={EmployeeReq.id} aria-label="Disabled input example" disabled />
                </div >
            </div >


            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10" >
                    <input className="form-control" type="text" value={EmployeeReq.name} aria-label="Disabled input example" disabled />
                </div >
            </div >

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10" >
                    <input className="form-control" type="text" value={EmployeeReq.address} aria-label="Disabled input example" disabled />
                </div >
            </div >



            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">age</label>
                <div className="col-sm-10" >
                    <input className="form-control" type="text" value={EmployeeReq.age} aria-label="Disabled input example" disabled />
                </div >
            </div >

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Deleted</label>
                <div className="col-sm-10" >
                <input className="form-check-input" type="checkbox" checked={EmployeeReq.isDeleted} aria-label="Disabled input example" disabled />
                </div >
            </div >
        </div >
    )

}
