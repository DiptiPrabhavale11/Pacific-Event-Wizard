import { useState } from 'react'
import EventList from "./components/EventList";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import CreateEvent from "./components/CreateEvent";
import CreateClub from "./components/CreateClub";
import EventDetails from "./components/EventDetails";
import {
    BrowserRouter as Router,
    Routes, Route, Link, useMatch
} from "react-router-dom"
import { Container } from '@mui/material'
import "./css/app.css";
import { Canvas } from "@react-three/fiber";
import Notification from "./components/Notification";
import About from "./components/About";
import * as THREE from 'three';
import Cylinder3d from "./components/Cylinder3d";
const App = () => {
    const [notificationInfo, setNotificationInfo] = useState({msg:null, variant:'info', header:'Success'})
    const setNotification = (notification) => {
        setNotificationInfo(notification);
        setTimeout(()=>{
            setNotificationInfo({msg:null, variant:'info', header:'Success'})
        }, 5000)
    }
    return (
        <div>
            <Router>
                <AppHeader></AppHeader>
                <Notification {...notificationInfo}></Notification>
                <div className="container mt-5 pa-2">
                    <Routes>
                        <Route path="/" element={<EventList/>} />
                        <Route path="/events" element={<EventList/>} />
                        <Route path="/events/:id" element={<EventDetails setNotification={setNotification}/>} />
                        <Route path="/create-event" element={<CreateEvent setNotification={setNotification}/>} />
                        <Route path="/create-club" element={<CreateClub setNotification={setNotification}/>} />
                        <Route path="/about" element={<About/>} />
                    </Routes>
                </div>
                <AppFooter/>
            </Router>
        </div>
    )
}

export default App
