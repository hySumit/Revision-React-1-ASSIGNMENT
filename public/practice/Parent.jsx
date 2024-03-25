import React, { useEffect, useState } from 'react'

export const Child = () => {

    // console.log("Comp updated");

    useEffect(()=>{
        console.log("Mount");
        return ()=>{
            console.log("Component UnMounted");
        }
    },[])

    const [text,setText] = useState("Child Component")
  return (
    <>
    <div>Child</div>
    
    <input onChange={((e)=> setText(e.target.value))}  type="text" value={text}/>
    <div>{text}</div>
    </>
  )
}
