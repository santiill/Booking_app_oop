import React, {useState, useEffect, useRef} from 'react'
import './Table.css'
import "../categories/Categories.css"
import axios from 'axios'
import dayjs from 'dayjs';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import dataC from "../Data"

const Table = () => {

    const [data, setData] = useState()
    const date = dayjs(data).format('YYYY-MM-DD')
    const [isChoosen, setIsChoosen] = useState(false);
    const [bdata, setbData] = useState([])
    const [placeId, setPlaceId] = useState('')
    const [reason, setReason] = useState('')
    const [category, setCategory] = useState(false)
    
    console.log("log/date: " + date);
    console.log(placeId);

    useEffect(() => {
        axios.get(`https://alatoo-booking.herokuapp.com/categories/1/`).then(res => setbData(res.data))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("post");
        axios.post(`https://alatoo-booking.herokuapp.com/categories/1/${placeId}/${date}/`, {
            reason: reason
          })  
          .then(resp => {
            console.log(resp);
            alert("Successfully reserved :)")
          })
          .catch(error => {
            console.log(error);
          });
    }

    const getDateData = () => {
        axios.post(`https://alatoo-booking.herokuapp.com/categories/1/`, {
            date: date
          })  
          .then(res => {
            console.log(res.data);
            setbData(res.data)
          })
          .catch(error => {
            console.log(error);
          });
    }

    const getCategoryData = (id, name) => {
        setCategory(!category)
        axios.get(`https://alatoo-booking.herokuapp.com/categories/${id}/`).then(res => setbData(res.data))
        console.log(id);
        if(name == "Football Stadium"){
            setCategory(false)
        }else{
            setCategory(true)
        }
    }

    const getPlaceID = (id) => {
        setPlaceId(id)
        setIsChoosen(!isChoosen)
    }

    
    return (
        <>
            <div className='categories_block'>
                <h3>
                    Categories
                </h3>
                <div className="down-2">
                    <ul className="down-2">
                        {
                            dataC.map(catg => catg.map(catgr => { return (
                               <li onClick={() => getCategoryData(catgr.id, catgr.name)} key={catgr.id}>{catgr.name}</li> 
                            )
                            }))
                        }
                    </ul>
                </div>
            </div>

            <Calendar onClickDay={getDateData} className='calendar' onChange={setData} value={data} /> 
            {
                category ? <h2>Library</h2> : <h2>Football</h2>
            }
            <table className='table'>
                <thead>
                    <tr>
                        <th className='sport_zone'>Sport zones</th>
                        {
                            bdata.map(it => it.periods.map( item =>  { return (
                                <th key={item.id}>{item.starting_time} {item.finishing_time}</th>
                            )
                            
                            }))
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            bdata.map(item => <td className='name' key={item.id}>{item.name}</td>)
                        }
                        {
                            bdata.map(it => it.periods.map( item =>  { return (
                                <td className={ isChoosen ? "dark_mode" : item.status == "free" ? "free_place" : "reserved_place"}  onClick={() => getPlaceID(item.id)}  key={item.id}>{item.status}</td>
                            )}))
                        }
                    </tr>
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <label>
                Reason:
                <input type="text" value={reason} onChange={e => setReason(e.target.value)} />
                </label>
                <button type="submit">Post</button>
            </form>
        </>
    )
}

export default Table
