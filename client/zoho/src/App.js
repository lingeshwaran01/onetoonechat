import './App.css';
import connector from 'socket.io-client'
import { useEffect, useState} from 'react'
import {BsClipboard2Check} from 'react-icons/bs'
const socket=connector('/')



function App() {
  const [message,setMessage]=useState('');
  const [key,setKey]=useState('');
  const[messageList,setMessageList]=useState([]);
const[userid,setUserId]=useState()
  useEffect(()=>{

    socket.on('connect',(err)=>{
      setUserId(socket.id)
    })
  function dataprinter(data){
      console.log(data)
      setMessageList(previous=>[...previous,data])
    }
    socket.on('client',dataprinter)
   
    return() =>{
      socket.removeListener('client',dataprinter)
       socket.removeAllListeners('connect')}
  },[])

 
  
function sendMessage(e){
  async function clipvalue(){
  
    try{
     const value= await navigator.clipboard.readText();
     console.log(value)

    }catch(e){
console.log(e)
    }

  }
  e.preventDefault()
  if(key.length===0){
console.log("enter it")
clipvalue()}

  
  socket.emit('Message-user',message,key)
}

function cliped(e){
window.navigator.clipboard.writeText(userid)
alert("succesfully copied")
}
function cliked(){
  socket.emit('join-room',key);

}
  return (
    <div className="App">
<div className='popup'></div>
<h1>Your ID is  {userid}   <BsClipboard2Check  className="liop"onClick={cliped}/></h1>
<ul className='listo'>
      {messageList.length &&
        messageList.map((data,keys)=>{
          return <li key={keys}> {data}</li>
        })
      }
     </ul>
      <form className='sender' onSubmit={sendMessage}>

     <input placeholder='Enter Message' value={message} onChange={(e)=>{setMessage(e.target.value)}}></input>
     <button type='submit'>Send</button>

     <input placeholder="Enter Id" value={key} onChange={(e)=>{setKey(e.target.value)}}></input>
     <button type='button' onClick={cliked}>Join</button>

     </form>
   
    </div>
  );
}

export default App;
