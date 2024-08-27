import React, {useState} from 'react'

function AddTrip({formData, handleChange}) {

  async function handleSave() {
    try {
      const response = await fetch(`http://localhost:3001/saveTrip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      console.log(data);

      handleChange({target : { name: 'title', value: ''}})
      handleChange({target : { name: 'location', value: ''}})
      handleChange({target : { name: 'startDate', value: ''}})
      handleChange({target : { name: 'endDate', value: ''}})
      handleChange({target : { name: 'description', value: ''}})
      handleChange({target : { name: 'img', value: ''}})
    } catch (error) {
      console.log('Error during fetch: ', error);
    }
  }
  

  return (
    <form className='form' onSubmit={handleSave}>

      <label htmlFor="title">Title</label>
        <input 
        type='text'
        name="title"
        className="form--input"
        placeholder="Unexpected trip to DR"
        value={formData.title}
        onChange={handleChange}
        />

        <label htmlFor="Location">Location</label>
        <input 
        type='text'
        name="location"
        className="form--input"
        placeholder="Dominican Republic"
        value={formData.location}
        onChange={handleChange}
        />

        <label htmlFor="startDate">Start Date</label>
        <input 
        type='text'
        name="startDate"
        className="form--input"
        placeholder="DD/MM/YYYY"
        value={formData.startDate}
        onChange={handleChange}
        />

        <label htmlFor="endDate">End Date</label>
        <input 
        type='text'
        name="endDate"
        className="form--input"
        placeholder="DD/MM/YYYY"
        value={formData.endDate}
        onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <input 
        type='text'
        name="description"
        className="form--input"
        placeholder="Very nice place!"
        value={formData.description}
        onChange={handleChange}
        />

        <label htmlFor="img">Image</label>
        <input 
        type='text'
        name="img"
        className="form--input"
        placeholder="Upload a cute picture!"
        value={formData.img}
        onChange={handleChange}
        />

        <button className='form--button'>Submit</button>

    </form>
  )
}

export default AddTrip