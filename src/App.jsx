import React from 'react';
import Navbar from './components/Navbar';
import Trip from './components/Trip';
import AddTrip from './components/AddTrip.jsx';
import './App.css';
import { useState } from 'react';

export default function App() {

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    img: ""
  }
)

  function handleChange(event) {

    const {name, value} = event.target

    setFormData(prevFormData => ({

        ...prevFormData,
        [name]: value
    }))
}


  function handleSubmit(event) {
    event.preventDefault()
    const newTrip = {
      id: trips.length + 1,
      ...formData
    }

    setTrips(prevTrips => [...prevTrips, newTrip]);
    setFormData({
      title: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      img: ""
    });
  }

  const [addTrip, setAddTrip] = useState(false)

  function handleClick(){
    setAddTrip(prevState => !prevState)
}
  return (
    <>
      <Navbar addTrip={addTrip} handleClick={handleClick}/>
      <section className='background'>
      {addTrip && <AddTrip formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>}
      <Trip />
      </section>
    </>
  )
}
