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
      <button className='btn btn-dark' onClick={clearArray}>Clear</button>
    </div>
  );
}

export default App;
