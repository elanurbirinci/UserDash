import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, IconButton, TextField, Grid, Typography, Dialog, DialogContent, DialogActions, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Tab, Tabs, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import CustomPagination from './component/CustomPagination';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function App() {
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#f5f5f7',
        fontWeight: 'bold',
        textAlign: 'left',
        padding: '18px',
      },
    },
    pagination: {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      pageButtonsStyle: {
        borderRadius: '50%',
        height: '40px',
        width: '40px',
        padding: '8px',
        margin: '5px',
        cursor: 'pointer',
        backgroundColor: '#f5f5f7',
      },
    },
  };

  const avatars = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/4.jpg',
    'https://randomuser.me/api/portraits/men/5.jpg',
  ];

  const columns = [
    {
      name: 'Avatar',
      cell: row => (
        <div>
          <img
            src={row.selectedAvatar}
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
    },
  ];

  const data = [
    {
      id: 1,
      name: 'Ela',
      username: 'Yılmaz',
      email: 'kfc@vfkvf',
      role: 'Editor',
      selectedAvatar: avatars[0]
    },
    {
      id: 2,
      name: 'Leyla',
      username: 'Yılmaz',
      email: 'kc@vff',
      role: 'Author',
      selectedAvatar: avatars[1]
    },
    {
      id: 3,
      name: 'Ali',
      username: 'Yılmaz',
      email: 'kfkc@f',
      role: '',
      selectedAvatar: avatars[2]
    },
    {
      id: 4,
      name: 'Veli',
      username: 'Demir',
      email: 'veli@demir.com',
      role: 'Administrator',
      selectedAvatar: avatars[3]
    },
    {
      id: 5,
      name: 'Ayşe',
      username: 'Kara',
      email: 'ayse@kara.com',
      role: 'Subscriber',
      selectedAvatar: avatars[4]
    },
    {
      id: 6,
      name: 'Fatma',
      username: 'Sarı',
      email: 'fatma@sarı.com',
      role: 'Contributor',
      selectedAvatar: avatars[0]
    }
  ];

  const [records, setRecords] = useState(data);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
    selectedAvatar: null
  });
  const [selectedRows, setSelectedRows] = useState([]); // Seçilen satırları takip etmek için state
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

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

  const filteredRecords = records.filter(record => {
    if (activeTab === 0) {
      return true;
    } else {
      return record.role === getRoleFilter();
    }
  });

  const paginatedRecords = filteredRecords.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  function handleFilter(event) {
    const searchQuery = event.target.value.toLowerCase();
    const newData = data.filter(row => {
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
    setIsEditMode(true);
    setOpen(true);
  }

  function handleDelete(id) {
    const newData = records.filter(row => row.id !== id);
    setRecords(newData);
  }

  function handleDeleteAll() {
    const newData = records.filter(row => !selectedRows.includes(row.id));
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
    setIsEditMode(false);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = () => {
    if (isEditMode) {
      const updatedRecords = records.map(row => row.id === formData.id ? formData : row);
      setRecords(updatedRecords);
    } else {
      const newRecord = {
        id: records.length + 1,
        ...formData
      };
      setRecords([...records, newRecord]);
    }
    setOpen(false);
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }

  const handleRowSelected = state => {
    setSelectedRows(state.selectedRows.map(row => row.id)); // Seçilen satırların ID'lerini güncelle
  }

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
        <Grid item xs={12} sm={2}>
          <Button onClick={handleOpen} fullWidth variant="contained" startIcon={<AddCircleIcon />} style={{ backgroundColor: '#2940D3', color: 'white', height: '50px' }}>
            <Typography variant="body2">Add New User</Typography>
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
        data={paginatedRecords}
        selectableRows
        fixedHeader
        pagination={false}
        customStyles={customStyles}
        onSelectedRowsChange={handleRowSelected}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CustomPagination
          count={Math.ceil(filteredRecords.length / rowsPerPage)}
          color="primary"
          onChange={handlePageChange}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Full name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              label="Role"
            >
              <MenuItem value="Contributor">Contributor</MenuItem>
              <MenuItem value="Author">Author</MenuItem>
              <MenuItem value="Administrator">Administrator</MenuItem>
              <MenuItem value="Subscriber">Subscriber</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle1" gutterBottom>Select Avatar</Typography>
          <Grid container spacing={2}>
            {avatars.map((avatar, index) => (
              <Grid item key={index}>
                <img
                  src={avatar}
                  alt={`Avatar ${index}`}
                  style={{ width: 50, height: 50, borderRadius: '50%', cursor: 'pointer', border: formData.selectedAvatar === avatar ? '2px solid blue' : 'none' }}
                  onClick={() => setFormData(prevState => ({ ...prevState, selectedAvatar: avatar }))}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#2940D3', color: 'white' }}>
              {isEditMode ? 'Update User' : 'Create User'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
