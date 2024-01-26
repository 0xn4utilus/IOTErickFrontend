import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import axios from 'axios'
import { TextField , Button } from '@mui/material';

export default function RegisterErick() {
  const [erickValue, setErickValue] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [deviceUser, setDeviceUser] = useState("");

const erickRegister = () => {
    console.log("Register Erick");
    axios({
        method: "post",
        url: "/register-erick",
        data: {
            "device_id":erickValue, 
            "device_name":deviceName,
            "device_user":deviceUser,
        }
    }).then((res) => {
        console.log(res.status);
        if(res.status === 200){
          alert("Registered Sucessfully");
          setErickValue("");
          setDeviceName("");
          setDeviceUser("");
        }
        else{
          alert("Invalid details");
        }
    });
}

const handleChangeVal = e => {
  setErickValue(e.target.value)
}

const handleChangeDeviceName = e => {
  setDeviceName(e.target.value)
}

const handleChangeDeviceUser = e => {
    setDeviceUser(e.target.value)
}

  return (
    <>
      <Helmet>
        <title> E-Rick Registration Page </title>
      </Helmet>
    
      <div className="d-flex flex-column mb-3">
        <div className="p-2" style={{padding :"10px"}}>
            <TextField value={erickValue} style = {{width: 300}} label="Erick-ID" color="secondary" focused onChange={handleChangeVal}/>
        </div>
        <div className="p-2" style={{padding :"10px"}}>
            <TextField value={deviceName} style = {{width: 300}} label="Enter Device Name" color="secondary" focused onChange={handleChangeDeviceName}/>
        </div>
        <div className="p-2" style={{padding :"10px"}}>
            <TextField value={deviceUser} style = {{width: 300}} label="Enter Device User" color="secondary" focused onChange={handleChangeDeviceUser}/>
        </div>
        <div className="p-2" style={{padding :"10px"}}>
            <Button variant="contained" onClick={erickRegister} >Register</Button>
        </div>
      </div>
    </>
  );
}
