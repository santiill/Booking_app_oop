import React, {useState, useEffect} from 'react'
import axios from "axios"
import "./Reserves.css"
import Header from '../header/Header'


const Reserves = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`https://alatoo-booking.herokuapp.com/my_reserves/`).then(res => setData(res.data))
    }, [])
    console.log(data);

    const deleteReserveByID = (id) => {
        axios.delete(`https://alatoo-booking.herokuapp.com/my_reserves/${id}/`)
        window.location.reload()
    }

    const deleteAllReserves = () => {
        fetch(`https://alatoo-booking.herokuapp.com/my_reserves/`, {
            method: "DELETE",
          })
    }

    return (
        <>
        <Header />
            <div className='reserves_list'>
                <table className='reserves_table'>
                    <thead>
                        <tr>
                            <th className='head'>Date</th>
                            <th className='head'>Starting time</th>
                            <th className='head'>Finishing time</th>
                            <th className='head'>Reason</th>
                            <th className='head'>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map(item => { return (
                            <tr key={item.id} className='reserve_block'>
                                <td className='item'>{item.date}</td>
                                <td className='item'>{item.reserve_period.starting_time}</td>
                                <td className='item'>{item.reserve_period.finishing_time}</td>
                                <td className='item'>{item.reason}</td>
                                <td className='item'><button className='d_button' onClick={() => deleteReserveByID(item.id)}>Delete</button></td>
                            </tr>
                            )   
                        })
                    }
                    </tbody>
                </table>
                
            </div>
        </>
        
    )
}

export default Reserves
