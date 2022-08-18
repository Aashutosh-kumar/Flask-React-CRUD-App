import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import {useState} from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const fetchUsers = async () =>{
    const response = await axios.get(`http://127.0.0.1:5000/get`)
    return setUsers(response.data)
  }
  // fetchUsers()
  const fetchUser = async (id) =>{
    const response = await axios.get(`http://127.0.0.1:5000/get/${id}`)
    return setUser(response.data)
  } 
  const createorEditUser = async () =>{
    if(user.id){
      await axios.put(`http://127.0.0.1:5000/update/${user.id}`,user)
    }else{
      await axios.post(`http://127.0.0.1:5000/add`, user)
    }
    await fetchUsers()
    await setUser({id: 0, name: '', email: ''})
  } 
  const deleteUser = async (id) =>{
    await axios.delete(`http://127.0.0.1:5000/delete/${id}`)
    await fetchUsers()
  }
  return (
    <div >
      <AppBar position="static">
        <Toolbar> 
          <Button color="inherit">Users</Button>
        </Toolbar>
      </AppBar>
      <Box m={10}>
      <TableContainer >
      <TextField value={user.id} type="hidden" />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
        <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
              <TextField value={user.name} onChange={(e) => setUser({...user,name:e.target.value})} id="standard-basic" label="Name" variant="standard" />
              </TableCell>
              <TableCell >
              <TextField value={user.email} onChange={(e) => setUser({...user,email:e.target.value})} id="standard-basic" label="Email" variant="standard" />
              </TableCell>
              <TableCell >
              <Button onClick={()=> createorEditUser()} variant="contained" color='primary'>Submit</Button>
              </TableCell>
            </TableRow>
        <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >Name</TableCell>
              <TableCell >Email</TableCell>
              <TableCell >Edit</TableCell>
              <TableCell >Delete</TableCell>
            </TableRow>
          {users.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell >{row.id}</TableCell> */}
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >
              <Button onClick={()=> fetchUser(row.id)} variant="contained" color='primary'>Edit</Button>
              </TableCell>
              <TableCell >
              <Button onClick={()=> deleteUser(row.id)} variant="contained" color='primary'>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </div>
  );
}

export default App;
