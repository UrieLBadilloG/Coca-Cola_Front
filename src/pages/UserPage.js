import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
// @mui
import {
  Stack,
  Button,
  Container,
  Typography,
  Grid,
  TextField
} from '@mui/material';
import Box from "@mui/material/Box";
import { AccessTime } from "@mui/icons-material";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// components
import Iconify from '../components/iconify';
// sections
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
const center = { lat: 19.432798623260396, lng: -99.1294855652893 }

// ----------------------------------------------------------------------

function readExcel(file) {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: 'buffer' });
      const wsname = wb.SheetNames[2];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      resolve(data);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  })
  promise.then((d) => {
    console.log(d);
  })
}


const containerStyle = {
  width: '400px',
  height: '400px'
};

export default function UserPage() {

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries: ['places'],
  // })



  const fileInputRef = useRef();






  return (
    <>
      <Helmet>
        <title> Inicio </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Bienvenido!
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>
        <Grid item xs={12} sm={9} display='flex' justifyContent='space-between' alignItems='center'>
          <Box
            component='div'
            sx={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '1px solid E5E5E5FF',
              backgroundColor: '#e5e5e5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <AccessTime fontSize='medium' />
          </Box>
          <Box
            component='div'
            sx={{
              width: '80%',
              height: '100%',
              borderRadius: '12px',
              border: '1px solid #d3d3d3',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}

          >
            <Typography component='h2' fontSize={"medium"}>
              <span
                style={{ fontWeight: 'bold', color: '#2196f3', cursor: 'pointer' }}
              // onClick={ () => fileInputRef.current.click() }
              >
                Click to upload
              </span>
              , png, jpg, jpeg
            </Typography>
          </Box>

          <TextField
            fullWidth
            type='file'
            id="file"
            name='file'
            value={undefined}
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
            sx={{ display: 'none' }}
            inputRef={fileInputRef}
            inputProps={{ accept: 'image/*' }}
          />

        </Grid>
        <LoadScript
          googleMapsApiKey="AIzaSyBLVDZMCwDct9gnHGb13nUkl7oHpEKG3Wg"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
             <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </Container>
    </>
  );
}
