
import axios from "axios";
import { useState , useEffect} from 'react';
import serialise from "../utils/serialise";
/* eslint-disable */
function User(){
  const [data, setData] = useState(new Map())

  const [serialisedData, setSerialisedData] = useState([])
   
  useEffect(() => {
    console.log("hiashihasdhias: ")
   axios.get(`/get-erick-data/`).then((response) => {
       response.map((element) => {
           setData(
               (map) => new Map(map.set(element._id, element.data))
           );
       });
  });
 }, []);
 useEffect(() => {
  if(data !== undefined){
    // setSerialisedData(serialise(data))
  }
 }, [data])
 
 console.log({serialisedData})
 return serialisedData

}

export default User;
