import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {useState, useEffect} from 'react';
import Cookies from "js-cookie"
import { Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';

const InitalForm = {
    amount: 0,
    description: '',
    date: new Date(),
    category_id: ''
  }

export default function TransactionForm({fetchTransactions, editTransaction}) {

    const {categories} = useSelector(state => state.auth.user)
    const token = Cookies.get('token')    
    const [form, setForm] = useState(InitalForm)

    useEffect(()=>{
        if(editTransaction.amount !== undefined)
            setForm(editTransaction)
    },[editTransaction])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = editTransaction.amount === undefined ? create() : update()
    }
    const reload = (res) => {
        if(res.ok){
            setForm(InitalForm)
            fetchTransactions();
        }
    }
   
    const create = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        });
        reload(res)
    }

    const update = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`, {
        method: 'PATCH',
        body: JSON.stringify(form),
        headers: {
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        });
        reload(res)
    }

    const handleChange = (e) => {
    
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleDate = (newValue) => {
        setForm({...form, date: newValue})
    }
    
    const getCategoryNameById = () =>{
        return categories.find((category) => category._id === form.category_id) ?? '';
    }


  return (
    
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">
          Add New Transaction
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{display:'flex'}}>

        
        <TextField 
            sx={{marginRight: 5}} 
            size="small" 
            id="outlined-basic" 
            label="Amount" 
            variant="outlined" 
            value= {form.amount}
            onChange={handleChange}
            name="amount"
            />
        <TextField 
            sx={{marginRight: 5}} 
            size="small" 
            id="outlined-basic" 
            label="Description" 
            variant="outlined"
            value= {form.description}
            onChange={handleChange} 
            name="description"
            />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
           
            <DesktopDatePicker
            label="Transaction Date"
            inputFormat="MM/DD/YYYY"
            onChange={handleDate}
            value = {form.date}
            
            renderInput={(params) => <TextField sx={{marginRight: 5}} size="small" {...params} />}
            />
            
        </LocalizationProvider>

        <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={getCategoryNameById()}
            onChange = {(event, newValue)=>{
                setForm({...form, category_id:newValue._id})
            }}
            options={categories}
            sx={{ width: 210, marginRight: 3 }}
            renderInput={(params) => <TextField {...params} size='small' label="Category" />}
        />

        {
            editTransaction.amount !== undefined && (
                <Button type="submit" variant="outlined">Update</Button>
            )
        }
        {
            editTransaction.amount === undefined && (
                <Button type="submit" variant="contained">Submit</Button>
            )
        }
       </Box>
        
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    
  );
}