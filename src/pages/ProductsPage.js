import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { InputLabel, Link, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
// components

// mock

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [erickValue, setErickValue] = useState('');

  const [byteValue, setByteValue] = useState('');

  const [openFilter, setOpenFilter] = useState(false);

  const [idSet, setIdSet] = useState(false);
  const [erick_id, setErick_id] = useState('');

  const [locations, setLocations] = useState(new Map());

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  useEffect(() => {
    axios.get(`/get-erick-data/`).then((response) => {
      response.data.map((element) => {
        setLocations((map) => new Map(locations.set(element._id, element.data)));
      });
    });
  }, []);

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  function encodeDownlink(input) {
    // input has the following structure:
    // {
    //   field: "value"
    // }
    return {
      bytes: [1, 2, 3], // FRMPayload (byte array)
      fPort: 1,
      warnings: ['warning 1', 'warning 2'], // optional
      errors: ['error 1', 'error 2'], // optional (if set, the encoding failed)
    };
  }

  const handleErickIdChange = (event) => {
    setErick_id(event.target.value);
    console.log('erick_id: ' + event.target.value);
    setIdSet(true);
  };
  
  const handleDownlink = () => {
    console.log(erickValue, byteValue);
    console.log({ byteValue });
    console.log(encodeDownlink({ byteValue: byteValue }));
    console.log({ byteValue });
    axios({
      method: 'post',
      url: '/post-message',
      data: { device_id: erick_id, message_data: byteValue },
    }).then(console.log('Data sent'));
  };

  const handleChangeVal = (e) => {
    setErickValue(e.target.value);
  };

  const handleChangeByte = (e) => {
    setByteValue(e.target.value);
  };
  return (
    <>
      <Helmet>
        <title> E-Rick Tracking System </title>
      </Helmet>

      <div className="d-flex flex-column mb-3">
        <div className="p-2" style={{ padding: '10px' }}>
        <FormControl style={{ width: 300 }}>
        <InputLabel>
                E-Rick Id :
              </InputLabel>
        <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select"
                value={erick_id}
                label="Erick Id"
                onChange={handleErickIdChange}
                
                >
                {Array.from(locations.keys()).map((element) => {
                  return (
                    <MenuItem style={{ paddingRight: '20px' }} value={element}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
              </FormControl>
        </div>
        <div className="p-2" style={{ padding: '10px' }}>
          <TextField
            value={byteValue}
            style={{ width: 300 }}
            label="Enter String"
            color="secondary"
            focused
            onChange={handleChangeByte}
            />
        </div>
        <div className="p-2" style={{ padding: '10px' }}>
          <Button variant="contained" onClick={handleDownlink}>
            Send Downlink
          </Button>
        </div>
      </div>
    </>
  );
}
