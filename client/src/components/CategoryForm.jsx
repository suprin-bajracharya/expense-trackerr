import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Cookies from "js-cookie"
import { Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "../store/auth.js"

const InitalForm = {
    label: '',
    icon: ""
}
const icons = ["User", "Edit", "Plus"]
    

export default function CategoryForm({editCategory}) {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const token = Cookies.get('token')    
    const [form, setForm] = useState(InitalForm)

    useEffect(()=>{
        if(editCategory._id !== undefined)
            setForm(editCategory)
    },[editCategory])

    const handleSubmit = async (e) => {
        e.preventDefault();
        editCategory._id === undefined ? create() : update()
    }
    const reload = (res, _user) => {
        if(res.ok){
            
            dispatch(setUser({user:_user}))

        }
    }
   
    const create = async () => {
        console.log(form);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        });
        const _user = {...user, categories: [...user.categories, {...form} ]}
        reload(res, _user)
    }

    const update = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${editCategory._id}`, {
        method: 'PATCH',
        body: JSON.stringify(form),
        headers: {
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        });
        const _user = {
            ...user,
            categories: user.categories.map((cat) =>
              cat._id == editCategory._id ? form : cat
            ),
          };
        reload(res, _user)
    }

    const handleChange = (e) => {
    
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleDate = (newValue) => {
        setForm({...form, date: newValue})
    }
    
    const getCategoryNameById = () =>{
      console.log(user.categories)
        return user.categories.find((category) => category._id === form.category_id) ?? "";
    }


  return (
    
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">
          Add New category
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{display:'flex'}}>

        
        <TextField 
            sx={{marginRight: 5}} 
            size="small" 
            id="outlined-basic" 
            label="Label" 
            variant="outlined" 
            value= {form.label}
            onChange={handleChange}
            name="label"
            />

            <Autocomplete
            value={ getCategoryNameById() }
            onChange={(event, newValue) => {
              setForm({ ...form, icon: newValue });
            }}
            id="icons"
            options={icons}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Icon" />
            )}
          />        

        {
           editCategory._id !== undefined && (
                <Button type="submit" variant="outlined">Update</Button>
            )
        }
        {
            editCategory._id === undefined && (
                <Button type="submit" variant="contained">Submit</Button>
            )
        }
       </Box>
        
      </CardContent>
    </Card>
    
  );
}