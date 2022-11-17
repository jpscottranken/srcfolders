import React, {useState} from 'react'

import './index.css'

function App() {
  const	MINHEIGHT =  12;
  const MAXHEIGHT =  96;
  const MINWEIGHT =   1;
  const MAXWEIGHT = 777;
  
  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')

  let calculateBMI = (e) => {
    //prevent submitting
    e.preventDefault()

    if (weight === 0 || height === 0) 
	{
      alert('Please enter a valid weight and height')
    } 
	else if ((height < MINHEIGHT || height > MAXHEIGHT)) 
	{
      alert('Please enter a valid height (12 - 96)')
    }
	else if ((weight < MINWEIGHT || weight > MAXWEIGHT)) 
	{
      alert('Please enter a valid height (1 - 777)')
    }
	else 
	{
      let bmi = (weight / (height * height) * 703)
      setBmi(bmi.toFixed(1))

      // Logic for message
      if (bmi < 18.5) 
	  {
        setMessage('You are underweight')
      } 
	  else if (bmi < 25.0) 
	  {
        setMessage('You are optimal weight')
      }
	  else if (bmi < 30.0) 
	  {
        setMessage('You are overweight')
      }
	  else if (bmi >= 30.0)
	  {
		setMessage('You are obese')
	  }	  
    }
  }

  //  show image based on bmi calculation
  let imgSrc;

  if (bmi < 1) 
  {
    imgSrc = null
  } 
  else if (bmi < 18.5) 
  {
	imgSrc = require('../src/assets/underweight.png')
  } 
  else if (bmi < 25.0) 
  {
	imgSrc = require('../src/assets/optimalweight.png')
  }
  else if (bmi < 30.0) 
  {
	imgSrc = require('../src/assets/overweight.png')
  }
  else if (bmi >= 30.0)
  {
	imgSrc = require('../src/assets/obese.png')
  }	  


  let reload = () => {
    window.location.reload()
  }

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calculateBMI}>
          <div>
            <label>Height (12 - 96)</label>
            <input value={height} onChange={(event) => setHeight(event.target.value)} />
          </div>
          <div>
            <label>Weight (1 - 777)</label>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
          </div>
        </form>

        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>

        <div className='img-container'>
          <img src={imgSrc} alt=''></img>
        </div>
      </div>
    </div>
  );
}

export default App;
