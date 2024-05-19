import './App.css';
import DataTable from 'react-data-table-component';
import React, { useState } from 'react';
import {Button,IconButton,TextField , Grid,Typography} from '@mui/material';
import { Tab, Tabs, TabList,  } from 'react-tabs';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomPagination from './component/CustomPagination';

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
    },{
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
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
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
    setCurrentPage(1);
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


  const handleOpen = () => {
    setOpen(true);
    setFormData({
      name: '',
      username: '',
      email: '',
      role: '',
      selectedAvatar: null
    });
  };

  // Tab tıklamasını işleyen fonksiyon
  const handleTabClick = (index) => {
    setActiveTab(index); 
    setCurrentPage(1);
  };

  // Aktif sekmenin role değerini belirlemek için bir fonksiyon
  const getRoleFilter = () => {
    switch (activeTab) {
      case 0:
        return true; 
      case 1:
        return 'Contributor';
      case 2:
        return 'Author';
      case 3:
        return 'Administrator';
      case 4:
        return 'Subscriber';
      default:
        return '';
    }
  };

  // DataTable bileşeni için role göre filtreleme işlevi
  const filteredRecords = records.filter(record => {
    if (activeTab === 0) {
      return true; 
    } else {
      return record.role === getRoleFilter();
    }
  });
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#f5f5f7',
        fontWeight: 'bold',
        textAlign: 'left',
        padding: '8px',
      },
    },
    pagination: {
      
      style: {
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      
    },
  };
  

  return (
    <div className="App">
      <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={9}>
      <Tabs>
    <TabList>
      <Tab onClick={() => handleTabClick(0)}>All Users</Tab>
      <Tab onClick={() => handleTabClick(1)}>Contributor</Tab>
      <Tab onClick={() => handleTabClick(2)}>Author</Tab>
      <Tab onClick={() => handleTabClick(3)}>Administrator</Tab>
      <Tab onClick={() => handleTabClick(4)}>Subscriber</Tab>
    </TabList>
  </Tabs>
      </Grid>
      <Grid item xs={12} sm={2}  >
        <Button onClick={handleOpen} fullWidth variant="contained" style={{ backgroundColor: '#2940D3', color: 'white',height: '50px'  }} >
          <Typography variant="body2" >Add New User</Typography>
        </Button>
      </Grid>
    </Grid>
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
        customStyles={customStyles}
      />
      <CustomPagination  count={Math.ceil(filteredRecords.length / rowsPerPage)} color="primary" onChange={handlePageChange} />
    </div>
  );
}

export default App;
