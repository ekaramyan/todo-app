import axios from "axios";


//Destructurisation

const api = async () => {

    const url = 'http://localhost:1337/api/to-dos'
    const get = async () => {
        const result = await axios.get(link); //calling api
        setTodos(result?.data); //setting fetched data
    }

    get() //calling function  
        .catch(console.error) //catching errors
}

