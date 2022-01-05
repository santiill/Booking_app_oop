import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import Table from '../table/Table'
import "./HomePage.css"
import Header from '../header/Header';

const HomePage = () => {

    return (
        <>
            <Header />
            <div className='hero'>
                <div className='content'>
                    <Table />
                </div> 
            </div>
        </>
        
    )
}

export default HomePage
