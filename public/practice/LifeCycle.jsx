import React, { useState } from 'react'
import { Child } from './Parent'

export const LifeCycle = () => {

    const [toggle,setToggle] = useState(true)

    const handleToggle = ()=>{
        setToggle(!toggle)
    }
  return (
    <div>
        <p>Parent</p>
        <button onClick={handleToggle}> {toggle ? "Hide" : "Show"} </button>
        {toggle ? <Child/> : null}
    </div>
  )
}
