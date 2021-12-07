import React from 'react'
import './Loading.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function Loading() {
    return (
        <div className="loading">
            <div className="loading-icon">
                <AiOutlineLoading3Quarters />
            </div>
            Loading...
        </div>
    )
}

export default Loading
