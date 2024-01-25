/* eslint-disable */
function serialise(data){
    console.log("unserialised: ",{data})
    if(data instanceof Map){
        
        return Array.from(data.keys()).map((key)=>{
            
        const value = data.get(key); 
        const id = key;
        const lat = value.lat
        const lng = value.lng
        const driver_name = value.driver_name
        const driver_contact = value.driver_contact
        let time = value.time
        const date = new Date(time)
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const dt = date.getDate()
     
        let result = new Date(time).toLocaleTimeString();
        time = result + ', ' + dt + '/' + month + '/'+ year

        return {
            id, 
            lat,
            lng,
            driver_contact,
            driver_name,
            time
    }
    });
}
else{
    let time = data
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const dt = date.getDate()
    let result = new Date(time).toLocaleTimeString();
    time = result + ', ' + dt + '/' + month + '/'+ year
    return (
        time
    )
}
}

export default serialise