import {useState} from 'react';
export default function Login({setUser}){
   
   const dummyUser = [
   {username: "anurag", password: "rasengan", role: 0},
   {username: "namrata", password: "rasengan", role: 1},
   {username: "yamani", password: "rasengan", role: 2}   
   ];

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError]= useState('');

   const handleSubmit = (event) => {
   	event.preventDefault();

   	let found = false;
   	for(let i = 0; i<dummyUser.length; i++){
   		if(username === dummyUser[i].username && password === dummyUser[i].password){
   			setUser(dummyUser[i]);
   			setError('');
   			found = true;
   			break;
   		}
        }

        if(!found){
        	setError("Wrong Credentials");
        }
   		setUsername('');
   		setPassword('');
   };

return(
	<>
	<form onSubmit = {handleSubmit}>
    <input 
      type = "text"
      value = {username}
      placeholder = "username"
      onChange = {(event)=>setUsername(event.target.value)} 
      required />

    <input 
      type = "password"
      value = {password}
      placeholder = "password"
      onChange = {(event)=>setPassword(event.target.value)} 
      required />

    <input 
      type = "submit"
      value = "login"/>    
	</form>
	<span style={{color:'red'}}>{error}</span>
	</>
	);
}