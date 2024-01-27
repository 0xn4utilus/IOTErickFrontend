import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import axios from 'axios';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("Student");
  const [email, setEmail] = useState("no-email");

  useEffect(() => {
    // check if user is logged in
    axios.get('/check-already-login').then((res) => {
      console.log(res.data);
      if(res.data.status === "success"){
        setIsAdmin(true);
        setName(res.data.name);
        setEmail(res.data.email);
      } else {
        setIsAdmin(false);
        setName("Student");
        setEmail("no-email");
      }
    }
    ).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} isAdmin={isAdmin} name={name} email={email} setIsAdmin={setIsAdmin} setName={setName} setEmail={setEmail} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} isAdmin={isAdmin} name={name} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
