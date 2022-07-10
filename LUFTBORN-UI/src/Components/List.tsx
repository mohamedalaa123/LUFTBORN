import { MouseEvent, ChangeEvent, Component, FC, useEffect, useState } from 'react';
import ComplainDataService from '../Services/Complain.service';
import Employee from '../Models/Employee';
import { Link, useNavigate } from "react-router-dom";
import EmployeeRequest from '../Models/EmployeeRequest';

type State = {
    employees: Array<Employee>
}
type Props = {};


// const List: FC<Props> = ({ }): JSX.Element => {

//     let [EmployeesState, setEmployeesState] = useState(Array<Employee>());


//     useEffect(() => {

//         ComplainDataService.GetStations().then(res => {
//             console.log(res);

//             let EmpResponse = res.data.employees as Employee[];
//             EmpResponse;

//             console.log(EmpResponse);

//             setEmployeesState(a => a = EmpResponse);


//         }).catch((err) => {
//             console.error(err);

//         });

//     }, []);


//     const getAll = () => {
//         ComplainDataService.GetStations().then(res => {
//             console.log(res);

//             let EmpResponse = res.data.employees as Employee[];
//             EmpResponse;

//             console.log(EmpResponse);

//             setEmployeesState(a => a = EmpResponse);


//         }).catch((err) => {
//             console.error(err);

//         });


//     }
//     return (

//         <>
//             <div className='container'>

//                 <Link to="/Create">Create</Link>
//                 <br />

//                 <table className='table'>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Address</th>
//                             <th>Age</th>
//                             <th>Deleted</th>
//                             <th></th>

//                         </tr>
//                     </thead>
//                     <tbody>
//                         {console.log(EmployeesState)}
//                         {
//                             EmployeesState.length > 0 &&

//                             EmployeesState.map((item, index) => {

//                                 return (
//                                     <tr key={index}>
//                                         <td>{item.Id}</td>
//                                         <td>{item.Name}</td>
//                                         <td>{item.Address}</td>
//                                         <td>{item.Age}</td>
//                                         <td><input type="checkbox" /></td>
//                                         <td><Link to='/details' state={{ id: item.Id }}>Details</Link></td>
//                                     </tr>
//                                 )

//                             })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     )
// }

//export default List;

export default class List extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
        }

        this.deleteEmployee = this.deleteEmployee.bind(this);

        this.getAll();

    }

    getAll = () => {
        ComplainDataService.GetStations().then(res => {

            let EmpResponse = res.data.employees as Employee[];
            console.log(EmpResponse);

            this.setState({ employees: EmpResponse });

        }).catch((err) => {
            console.error(err);
        });
    }


    deleteEmployee(item: MouseEvent<HTMLAnchorElement>) {
        console.log(item.target);


        const { id } = item.target as HTMLElement;

        let Req: EmployeeRequest = {
            id: parseInt(id)
        };

        ComplainDataService.DeleteEmployeeById(Req).then((result) => {

            console.log(result.data);

            if (result.data.statusCode === 1) {
                //window.location.reload();
                const i = this.state.employees.findIndex(a => a.id === parseInt(id));

                let EmpResponse = this.state.employees;
                delete EmpResponse[i];


                this.setState({ employees: EmpResponse });
            }

        }).catch((err) => {
            console.error(err);
        });

    }

    render() {

        return (
            <div>
                <div className='container'>

                    <Link to="/Create">Create</Link>
                    <br />

                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Age</th>
                                <th>Deleted</th>
                                <th></th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.length > 0 &&

                                this.state.employees.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>{item.age}</td>
                                            <td>
                                                {
                                                    item.isDeleted === true ?
                                                        <input type="checkbox" checked disabled /> :
                                                        <input type="checkbox" disabled />
                                                }


                                            </td>
                                            <td><Link to='/details' state={{ id: item.id }}>Details</Link></td>
                                            <td><Link to='/update' state={{ id: item.id }}>update</Link></td>
                                            <td><a href='#' onClick={this.deleteEmployee} id={item.id.toString()}>Delete</a></td>


                                        </tr>
                                    )
                                })
                            }
                            {
                                this.state.employees.length === 0 &&
                                <tr>
                                    <td>no data available</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        )
    }
}