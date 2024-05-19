import './App.css';
import DataTable from 'react-data-table-component';
import React, { useState } from 'react';
import {IconButton,TextField , Grid,Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [records, setRecords] = useState([
    {
      id: 1,
      name: 'Ela',
      username: 'Yılmaz',
      email: 'ela@gmail.com',
      role: 'Administrator'
    },
    {
      id: 2,
      name: 'Leyla',
      username: 'Aslan',
      email: 'asl@gmail.com',
      role: 'Author'
    },
    {
      id: 3,
      name: 'Ali',
      username: 'Şahin',
      email: 'shn@gmail.com',
      role: 'Author'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
    selectedAvatar: null
  });

  function handleFilter(event) {
    const searchQuery = event.target.value.toLowerCase();
    const newData = records.filter(row => {
      // İsim veya e-posta alanında arama yap
      return (
        row.name.toLowerCase().includes(searchQuery) ||
        row.email.toLowerCase().includes(searchQuery)
      );
    });
    setRecords(newData);
  }

  function handleEdit(row) {
    setFormData({
      id: row.id,
      name: row.name,
      username: row.username,
      email: row.email,
      role: row.role,
      selectedAvatar: row.selectedAvatar || null
    });
    setOpen(true);
  }

  function handleDelete(id) {
    const newData = records.filter(row => row.id !== id);
    setRecords(newData);
  }

  function handleDeleteAll() {
    // Seçili olan kullanıcıları silme işlevini burada tanımlayabilirsiniz
    const newData = records.filter(row => !row.selected);
    setRecords(newData);
  }
  
  function handleAvatarSelect(id) {
    const updatedRecords = records.map(row => {
      if (row.id === id) {
        return { ...row, selectedAvatar: formData.selectedAvatar };
      }
      return row;
    });
    setRecords(updatedRecords);
    setOpen(false);
  }

  

  const columns = [
    {
      name: 'Avatar',
      cell: row => (
        <div>
          <img
            src={row.selectedAvatar }
            alt="Avatar"
            style={{ width: 30, height: 30, borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => handleAvatarSelect(row.id)}
          />
        </div>
      )
    },
    {
      name: 'Name',
      selector: row => row.name
    },
    {
      name: 'Username',
      selector: row => row.username
    },
    {
      name: 'Email',
      selector: row => row.email
    },
    {
      name: 'Role',
      selector: row => row.role
    },
    {
      name: 'Edit',
      cell: row => (
        <div>
          <IconButton onClick={() => handleEdit(row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  return (
    <div className="App">
      <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <TextField
          id="source"
          placeholder="Source"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <IconButton disabled>
                <SearchIcon />
              </IconButton>
            ),
          }}
          onChange={handleFilter}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={handleDeleteAll}>
          <DeleteIcon />
          <Typography variant="body2">Delete</Typography>
        </IconButton>
      </Grid>
    </Grid>
      <DataTable
        columns={columns}
        data={records}
        selectableRows
        fixedHeader
        pagination
      />
    </div>
  );
}

export default App;
