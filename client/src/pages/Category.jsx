import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Transactions from '@mui/material/Typography'
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import {setUser} from "../store/auth.js"
import CategoryForm from '../components/CategoryForm.jsx';
import { useState } from 'react';

export default function Catgory() {
  const token = Cookies.get('token')

  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const [ editCategory, setEditCategory ] = useState({})

  const remove = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
      method: 'DELETE',
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    if(res.ok){
      const _user = {...user, categories: user.categories.filter(cat => cat._id != id)}
      dispatch(setUser({user:_user}))
    }
  }

  const setEdit = (category) => {    
      setEditCategory(category)
  }

  return (
    <Container>
      <CategoryForm editCategory={ editCategory } />
      <Transactions sx={{marginTop: 10}} variant="h6">
        List of categories
      </Transactions> 
      <TableContainer component={Paper} >      
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Actions</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((row) => (
              <TableRow
                key={row._id}                
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.label}</TableCell>
                <TableCell align="center">{row.icon}</TableCell>
                
                <TableCell align="center">
                  <IconButton 
                    aria-label="edit" 
                    color="info" 
                    onClick={()=>setEdit(row)}
                  >
                    <EditSharpIcon />
                  </IconButton>
                  <IconButton 
                    aria-label="delete" 
                    color="info" 
                    onClick={()=>remove(row._id)}
                  >        
                    <DeleteSharpIcon />
                  </IconButton>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}