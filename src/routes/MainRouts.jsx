import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'
import LeftSideBar from '../components/leftsidebar/LeftSideBar'
import Factorial from '../pages/factorial/Factorial'
import Review from '../pages/review/Review'

export default function MainRouts() {
    return (
        <div className='main'>
            <LeftSideBar />
            <div className='main_right'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/review' element={<Review />} />
                    <Route path='/factorial' element={<Factorial />} />
                </Routes>
            </div>
        </div>
    )
}
