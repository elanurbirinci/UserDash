
import './App.css';
import DataTable from 'react-data-table-component';
import React, {useState} from 'react';

function App() {

  const columns=[
    {
      name: 'Avatar',
      
    },
    {
      name: 'Name',
      selector: row =>row.name
      
    },
    {
      name: 'Userame',
      selector: row =>row.username
      
    },
    {
      name: 'Email',
      selector: row =>row.email
    },
    {
      name: 'Role',
      selector: row =>row.role
    },
    {
      name:'Edit',
      
    },

  ];

  const data=[
    {
      id:1,
      name:'Ela',
      username:'Yılmaz',
      email:'ela@gmail.com',
      role:'Administrator'
    },
    {
      id:2,
      name:'Leyla',
      username:'Aslan',
      email:'asl@gmail.com',
      role:'Author'
    },
    {
      id:3,
      name:'Ali',
      username:'Şahin',
      email:'shn@gmail.com',
      role:'Author'
    }
    
  ]

  const [records, setRecords]=useState(data);

  function handleFilter(event) {
    const searchQuery = event.target.value.toLowerCase();
    const newData = data.filter(row => {
      // İsim veya e-posta alanında arama yap
      return (
        row.name.toLowerCase().includes(searchQuery) ||
        row.email.toLowerCase().includes(searchQuery)
      );
    });
    setRecords(newData);
  }

  return (

    <div className="App">
      <div className='text-end'><input type='text' onChange={handleFilter}/></div>
      <DataTable
      columns={columns}
      data={records}
      selectableRows
      fixedHeader
      pagination></DataTable>
      
      
    </div>
  );
}

export default App;
