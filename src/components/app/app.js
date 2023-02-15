import './app.css';

import {Component} from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Игорь Б.', salary: 800, increase: true, rise: false, id: 1},
                {name: 'Полина Г.', salary: 3000, increase: false, rise: true, id: 2},
                {name: 'Александр А.', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all',
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {

            //первый способ для фильтра данных и возврата нового массива
            //const index = data.findIndex(elem => elem.id === id);
            // const before = data.slice(0, index);
            // const after = data.slice(index+1);
            // const newArr = before.concat(after);

            return {
                data: data.filter(item => item.id !== id) //второй способ
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    // onToggleIncrease = (id) => {
    //     //первый способ
    //     //this.setState(({data}) => {
    //     // const index = data.findIndex(item => item.id === id);
    //     // const old = data[index];
    //     // const newItem = {...old, increase: !old.increase};
    //     // const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)];
    //     // return {
    //     //     data: newArr
    //     // }
    //     //})
    //
    //     //второй способ
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, increase: !item.increase}
    //             }
    //             return item;
    //         })
    //     }))
    //
    // }

    onToggleProp =(e, id, prop) => {
        if (e.type === 'click' || e.keyCode === 13 || e.keyCode === 32) {
            this.setState(({data}) => ({
                data: data.map(item => {
                    if (item.id === id) {
                        return {...item, [prop]: !item[prop]}
                    }
                    return item;
                })
            }))
        }
    }

    // onChangeSalary = (id, salary) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, salary: salary}
    //             }
    //             return item;
    //         })
    //     }))
    // }


    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(elem => {
            return elem.name.indexOf(term) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise' :
                return items.filter(elem => elem.rise);
            case 'moreThen1000' :
                return items.filter(elem => elem.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    onChangeSalary = (id, salary) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: salary}
                }
                return item;
            })
        }))
    }

    render(){
        const {data, term, filter} = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className={'app'}>
                <AppInfo employees={employees}
                        increased={increased}/>

                <div className={'search-panel'}>
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;

