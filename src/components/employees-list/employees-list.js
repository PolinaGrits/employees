import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';


const EmployeesList = ({data, onDelete, onToggleProp, onChangeSalary}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return(
            <EmployeesListItem
                key={id}
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(e, id, e.currentTarget.getAttribute('data-toggle'))}
                onChangeSalary={(e) => onChangeSalary(id, Number(e.target.value.slice(0, -1)))}/>
        )
    });

    return (
        <ul className={'app-list list-group'}>
            {elements}
        </ul>
    );
}

export default EmployeesList;

