import React, { useState } from 'react';

function App() {
  let tempJSON = {
    array : []
  }
  localStorage.setItem("thisArray", JSON.stringify(tempJSON))
  const [currentText, setCurrentText] = useState("");
  const [sites, setSites] = useState({
    array : JSON.parse(localStorage.getItem("thisArray")).array
  });
  const [error, setError] = useState();
  const [buttonState, setButtonState] = useState({
    stage : "Start",
    color : "success"
  })

  let addToList = e => {
    e.preventDefault();
    if(currentText === ""){
      setError("This is not a valid site")
    }
    else{
      let example = sites.array;
      //console.log(currentText)
      //console.log(typeof currentText)
      console.log(example.push(currentText))
      //console.log(sites)
      //console.log(typeof sites)
      setCurrentText("")
      setSites({
        array : example
      })
      //console.log("SetSites Below ->")
      //console.log(sites)


      let myJSON = JSON.stringify(sites);

      localStorage.setItem("thisArray", myJSON)
      //console.log(localStorage.getItem("thisArray"))
      //console.log(JSON.parse(localStorage.getItem("thisArray")))


    }
    e.preventDefault();
  }

  const updateText = (e)=>{
    setCurrentText(e.target.value)
  }

  const clearArray = () => {
    setSites({
      array : []
    })
    localStorage.clear()
  }

  const defineCSS = () => {
    return `<style>
    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 100%;
      height: auto;
    }
    </style>`
  }

  const defineHTML = () => {
    return `<div class = "content">
    <img src = "https://media.makeameme.org/created/padh-le-bhai.jpg">
    </div>`
  }







  const startStopBlocker = () => {
      if(buttonState.stage === "Start"){
          setButtonState({
              stage : "Stop",
              color : "danger"
          })
        const set = new Set(sites.array);
        if(set.has(window.location.hostname)){
          document.head.innerHTML = defineCSS();
          document.body.innerHTML = defineHTML();
        }
      }
      else
      {
          setButtonState({
              stage : "Start",
              color : "success"
          })
      }


}

  return (
    <div className='container my-5 text-center'>
      <h3>Add websites you want to block!</h3>
      <p>{error}</p>
      <form className='d-flex' onSubmit={addToList}>
        <input className='form-control me-2' value={currentText} onChange={updateText} id="inputId"/>
        <button className='btn btn-dark' type="submit">Submit</button>
      </form>
      <div className='my-2'>
        <ul className='list-group'> 
          {sites.array.map((e) => {
            return <li className='list-group-item'>{e}</li>
          })}
        </ul>
      </div>
      <div className='d-flex justify-content-center'>
        <button className='btn btn-dark mx-3' onClick={clearArray}>Clear</button>
        <button onClick={startStopBlocker} className={`btn btn-${buttonState.color} mx-3`}>{buttonState.stage}</button>
      </div>
    
    </div>
  );
}

export default App;
