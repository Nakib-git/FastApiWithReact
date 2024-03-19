import React, { useEffect, useState } from 'react';
import './App.css';
import { Employee, addEmployee, deleteEmployee, filterEmployeeByDateRange, filterEmployeeByName, getAllEmployees, updateEmployee } from './Service/appService';
import { TableCellDateTime } from './Utility/common';

function App() {

  const [employeeList, setEmployee] = useState<Employee[]>([]);
  const [formData, setFormData] = useState<Employee>({ employeeId: '', name: '', phoneNo: '', age: 0, createDate: new Date() } as Employee);
  const [name, setName] = useState<string>()
  const [fromDate, setFromDate] = useState<string>(new Date().toISOString())
  const [toDate, setToDate] = useState<string>(new Date().toISOString())

  const convertPropertyNamesToLowerCase = (list: any[]): any[] => {
    return list.map(item => {
      const newItem: any = {};
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const newKey = key.charAt(0).toLowerCase() + key.slice(1);
          newItem[newKey] = item[key];
        }
      }
      return newItem;
    });
  };

  const fetchUsers = async () => {
    const employees = await getAllEmployees();
    const list = convertPropertyNamesToLowerCase(employees);
    setEmployee(list as Employee[]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.employeeId || formData.employeeId !== '') {
      await updateEmployee(formData.employeeId, formData.createDate, formData as Employee);
      alert('Employee updated successfully')
    } else {
      await addEmployee(formData);
      alert('Employee added  successfully')
    }
    setFormData({ employeeId: '', name: '', phoneNo: '', age: 0, createDate: new Date() } as Employee);
    fetchUsers();
  }

  const handleEdit = (id: string) => {
    const personToEdit = employeeList.find(person => person.employeeId === id);
    if (personToEdit) {
      if (!personToEdit.createDate) {
        personToEdit.createDate = new Date();
      }
      if (!personToEdit.age) {
        personToEdit.age = 0;
      }
      setFormData(personToEdit);
    }
  };

  const handleDelete = async (employeeId: string, createDate: Date) => {
    await deleteEmployee(employeeId, createDate);
    alert('Employee deleted successfully')
    fetchUsers();
  };
  const onSearch = async () => {
    if (name) {
      const employees = await filterEmployeeByName(name);
      const list = convertPropertyNamesToLowerCase(employees);
      setEmployee(list as Employee[]);
    }
  }
  const onReload = () => {
    setName('');
    fetchUsers();
  }
  // const handleFromDateChange = (e: any) => {
  //   if (e.target.value) {
  //     setFromDate(new Date(e.target.value).toISOString())
  //   }
  // }
  // const handleToDateChange = (e: any) => {
  //   if (e.target.value) {
  //     setToDate(new Date(e.target.value).toISOString())
  //   }
  // }
  const onDateRangeSearch = async () => {
    if (fromDate && toDate) {
      const employees = await filterEmployeeByDateRange(fromDate, toDate);
      const list = convertPropertyNamesToLowerCase(employees);
      setEmployee(list as Employee[]);
    }
  }
  return (
    <div className="container">
      <div className="form-container">
        <h2>Add/Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={formData.employeeId} />
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} />
          </div>
          <div>
            <label>Phone No:</label>
            <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleFormChange} />
          </div>
          <div>
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleFormChange} />
          </div>
          <button type="submit">{formData.employeeId === '' ? 'Add' : 'Update'}</button>
        </form>
      </div>
      <div className="list-container">
        <h2>Employee List</h2>
        <div className='search'>
          <label >Name:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
          <button className='serach-button' type='button' onClick={onSearch}>Search</button>
          <button className='reload-button' type='button' onClick={onReload}>Reload</button>
        </div>
        <div className='search'>
          <label htmlFor="datePicker">From date:</label>
          <input
            type='date'
            id='datePicker'
            value={fromDate.split('T')[0]}
            onChange={(e) => setFromDate(new Date(e.target.value).toISOString())}
          />
          <label htmlFor="datePicker">To date:</label>
          <input
            type='date'
            id='datePicker'
            value={toDate.split('T')[0]}
            onChange={(e) => setToDate(new Date(e.target.value).toISOString())}
          />
          <button className='serach-button' type='button' onClick={onDateRangeSearch}>Search</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employeeList?.map(person => (
              <tr key={person.employeeId}>
                {/* <td>{person.employeeId}</td> */}
                <td>{person.name}</td>
                <td>{person.phoneNo}</td>
                <td>{person.age}</td>
                {/* <td>{person.createDate.toISOString()}</td> */}
                {/* <td>{person.createDate.split('T')[0]}</td> */}
                <TableCellDateTime datetime={person.createDate} />
                <td>
                  <button className='edit-button' type='submit' onClick={() => handleEdit(person.employeeId)}>Edit</button>
                  <button className='delete-button' type='button' onClick={() => handleDelete(person.employeeId, person.createDate)}>Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
