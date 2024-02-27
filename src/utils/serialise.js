/* eslint-disable */

const getMockName = (id) => {
    let x = 0;
    let names = ["Ramesh Lal", "Kishore Kumar", "Khan Sahab", "Raksha Sharma", "KK Pant" ]
    for(let i =0; i<id.length; i++){
        x= (x+id.charCodeAt(i))%names.length
    }
    return names[x];
}

const getMockNumber = (id) => {
    let x = 0;
    let names = ["7894567891", "7457894127", "9456781258", "9456789128", "8974789458" ]
    for(let i =0; i<id.length; i++){
        x= (x+id.charCodeAt(i))%names.length
    }
    return names[x];
}

function serialise(data){
    if(data instanceof Map){
        
        return Array.from(data.keys()).map((key)=>{
            
        const value = data.get(key); 
        const id = key;
        const lat = value.lat
        const lng = value.lng
        const driver_name = getMockName(id)
        const driver_contact = getMockNumber(id)
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