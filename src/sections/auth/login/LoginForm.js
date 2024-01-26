import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Password, setPassword] = useState("");

  useEffect(() => {
    // check if user is logged in
    axios.get('/check-already-login').then((res) => {
      console.log(res.data);
      if(res.data.status === "success"){
        navigate('/dashboard/app', { replace: true });
      }
    }
    ).catch((err) => {
      console.log(err);
    })
  }, []);
  

  const handleClick = () => {
    // if(Password === "admin"){
    // navigate('/dashboard/app', { replace: true });
    // }
    if(username === "" || email === "" || Password === ""){
      alert("Please fill all the fields");
      return;
    }

    try {
      axios.post('/admin-login', {
        'name': username,
        'email': email,
        'password': Password
      }).then((res) => {
        console.log(res.data);
        if(res.data.status === "success"){
          navigate('/dashboard/app', { replace: true });
        }
        else{
          alert("Invalid credentials");
        }
      }
      ).catch((err) => {
        console.log(err);
        alert("Invalid credentials");
      })  
    } catch (error) {
      alert("Invalid credentials");
    }

  };

  return (
    <>
      <Stack spacing={3}>

        <TextField name="username" label="Username" onChange={(e) => setUsername(e.target.value)} />

        <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
