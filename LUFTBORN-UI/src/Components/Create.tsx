import { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from "react-router-dom";



import Employee from '../Models/Employee';

import ComplainDataService from '../Services/Complain.service';


let Req: Employee = {
    address: '',
    age: 0,
    id: 0,
    name: '',
    isDeleted: false
};

export default function Create() {

    let [EmployeeReq, setEmployeeReq] = useState(Req);

    let navigate = useNavigate();


    const submitForm = (item: MouseEvent<HTMLButtonElement>) => {


        let invalid = false;

        if (EmployeeReq.address === '' || EmployeeReq.address === undefined) {
            var elm = document.getElementById('address') as HTMLInputElement;
            elm.classList.add('is-invalid');
            invalid = true;
        } 

        if (EmployeeReq.name === '' || EmployeeReq.name === undefined) {
            var elm = document.getElementById('name') as HTMLInputElement;
            elm.classList.add('is-invalid');
            invalid = true;

        }

        if (EmployeeReq.age === 0 || EmployeeReq.age === undefined) {
            var elm = document.getElementById('age') as HTMLInputElement;
            elm.classList.add('is-invalid');
            invalid = true;

        }


        if (invalid === true) {
            return false;
        }

        ComplainDataService.AddEmployee(EmployeeReq).then((res) => {

            console.log(EmployeeReq);
            return navigate("/");

        }).catch((err) => {
            console.error(err);
        });
    }



    const onChangeEvent = (item: ChangeEvent<HTMLInputElement>) => {
        console.log(item.target);

        let NewReq: Employee = {
            address: '',
            age: 0,
            id: 0,
            name: '',
            isDeleted: false
        };

        const { id } = item.target as HTMLElement;
        const { value } = item.target as HTMLInputElement;

        console.log(id);

        console.log(value);


        switch (id) {

            case 'name':
                NewReq.name = value;
                NewReq.age = EmployeeReq.age;
                NewReq.address = EmployeeReq.address;

                break;
            case 'address':
                NewReq.address = value;
                NewReq.age = EmployeeReq.age;
                NewReq.name = EmployeeReq.name;

                break;
            case 'age':
                NewReq.age = parseInt(value);
                NewReq.address = EmployeeReq.address;
                NewReq.name = EmployeeReq.name;

                break;

        }

        setEmployeeReq(NewReq);


    }

    return (
        <div>
            <div>Create</div>

            <Link to='/'>List</Link>
            <br />


            <form className='needs-validation' noValidate>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" onChange={onChangeEvent} className="form-control" id="name" required />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                        <input type="text" onChange={onChangeEvent} className="form-control" id="address" required />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Age</label>
                    <div className="col-sm-10">
                        <input type="number" onChange={onChangeEvent} className="form-control" id="age" required />
                    </div>
                </div>


                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <input type="button" onClick={submitForm} value='submit' className="btn btn-primary" />
                    </div>
                </div>
            </form>
        </div>
    )

}