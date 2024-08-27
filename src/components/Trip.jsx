import React, { useEffect, useState } from 'react';

export default function Trip(){

    const [trips, setTrips] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({id: null, title: "", location: "", startDate: "", endDate: "", description: "", img: ""})

    useEffect(() => {
        fetch('http://localhost:3001/getTrip')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText)
                }
                return res.json();
            })
            .then(data => setTrips(data))
            .catch(err => console.log('Fetch error: ', err))
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost:3001/deleteTrip/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.text())
        .then(mes => {
            console.log(mes);
            setTrips(trips.filter(trip => trip.id !== id))
        })
        .catch(err => console.error('Delete Error: ', err));
    }

    function handleEditClick(trip) {
        setEditData(trip)
        setShowModal(true);

    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setEditData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleFormSubmitEdit(event) {
        event.preventDefault();

        console.log(editData.id)

        fetch(`http://localhost:3001/updateTrip/${editData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: editData.title,
                location: editData.location,
                startDate: editData.startDate,
                endDate: editData.endDate,
                description: editData.description,
                img: editData.img
            }),
        })
            .then(res => res.text())
            .then(mes => {
                console.log(mes);
                setTrips(trips.map(trip => trip.id === editData.id ? editData : trip));
                setShowModal(false)
            })
            .catch(err => console.error('Update error: ', err))
    }


    return (
        <>
                {trips.map(trip => (
                    <div className='trip--card' key={trip.id}> 
                <img className='trip--img' src={trip.img} />
                <section className='trip--info'>
                <section className='trip--location'>
                <p>{trip.location}</p> 
                <button onClick={() => handleEditClick(trip)} style={{background: 'transparent', border: 'none', cursor: 'pointer'}}>
                    <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(trip.id)} style={{background: 'transparent', border: 'none', cursor: 'pointer'}}>
                    <span>Delete</span>
                </button>
                </section>
                    <h2 className='trip--title'>{trip.title}</h2>
                    <p ><strong>{trip.startDate} - {trip.endDate}</strong></p>
                    <p className='trip--description'>
                    {trip.description}
                    </p>
                </section>
                </div>
                ))}

                {showModal && (
                    <div className='overlay'>
                            <form className='form--overlay' onSubmit={handleFormSubmitEdit}>
                                <label htmlFor="title">Title</label>
                                <input 
                                type='text'
                                name="title"
                                className="form--input"
                                placeholder="Unexpected trip to DR"
                                value={editData.title}
                                onChange={handleInputChange}
                                />

                                <label htmlFor="Location">Location</label>
                                <input 
                                type='text'
                                name="location"
                                className="form--input"
                                placeholder="Dominican Republic"
                                value={editData.location}
                                onChange={handleInputChange}
                                />

                                <label htmlFor="startDate">Start Date</label>
                                <input 
                                type='text'
                                name="startDate"
                                className="form--input"
                                placeholder="DD/MM/YYYY"
                                value={editData.startDate}
                                onChange={handleInputChange}
                                />

                                <label htmlFor="endDate">End Date</label>
                                <input 
                                type='text'
                                name="endDate"
                                className="form--input"
                                placeholder="DD/MM/YYYY"
                                value={editData.endDate}
                                onChange={handleInputChange}
                                />

                                <label htmlFor="description">Description</label>
                                <input 
                                type='text'
                                name="description"
                                className="form--input"
                                placeholder="Very nice place!"
                                value={editData.description}
                                onChange={handleInputChange}
                                />

                                <label htmlFor="img">Image</label>
                                <input 
                                type='text'
                                name="img"
                                className="form--input"
                                placeholder="Upload a cute picture!"
                                value={editData.img}
                                onChange={handleInputChange}
                                />

                                <button className='form--button' type='submit'>Submit</button>
                                <button className='form--button' onClick={() => setShowModal(false)}>Cancel</button>

                                </form>
                    </div>
                )}
        </>
    )
}