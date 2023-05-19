import {Link, useLocation, useNavigate} from "react-router-dom";
import {MdDateRange, MdDescription, MdOutlineEmail,MdGroups2, MdOutlineFastfood, MdOutlineCancel} from "react-icons/md"
import {AiFillTag, AiOutlineQuestionCircle} from "react-icons/ai"
import React from "react";
import {Button, Fab} from "@mui/material";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {BsCheckCircle} from "react-icons/bs";
import {RiBaseStationLine} from "react-icons/ri"
import {getDateString, getDuration, showDays, getTime} from "../utils/DateHandler";
import EventsService from "../services/eventsService";
import UserList from "../components/UserList";
const EventDetails = ({setNotification}) => {
    const event = useLocation().state;
    const navigate = useNavigate();
    // console.log("state", useLocation())
    const userDetails = JSON.parse(window.localStorage.getItem("userDetails"));
    const attendEvent = async (eventObj) => {
        // console.log(eventObj);
        let users = eventObj.users ? eventObj.users : [];
        let currentUser = window.localStorage.getItem("userDetails");
        currentUser = JSON.parse(currentUser);
        const userIds = users.map(u=>u.id);
        const alreadyExist = userIds.find(e=> e == currentUser.id);
        if(!alreadyExist)
            users =  userIds.concat(currentUser.id);
        const userData = { users };
        // console.log("users", userDetails)
        if(process.env.REACT_APP_DATABASE === 'firebase') {
            const userInfo = {id: userDetails.id, name: userDetails.name};
            event.users.push(userInfo);
            setNotification({msg:`You are attending ${eventObj.name}!`, variant:'info', header:'Success'});
        } else {
            await EventsService.update(eventObj.id, userData, '/api/events');
            const userInfo = {id: userDetails.id, name: userDetails.name};
            event.users.push(userInfo);
            setNotification({msg:`You are attending ${eventObj.name}!`, variant:'info', header:'Success'});
        }
        // navigate("/events");
    }
    return (
        <div style={{marginTop: '7%'}}>
            <h3 style={{marginBottom: '10px'}}>{event.name}</h3>
            {/*<img src={event.imgUrl} style={{ height:'200px', borderRadius:'3%', width: '300px' }}/>*/}
            <div className="d-flex">
                <div className="p-2 flex-fill" style={{width:'65%'}}>
                        <div>
                            <div style={{display: 'inline-block'}}>
                                <div className="p-1">
                                    <MdDateRange className="mb-2" color="#f99812" size={20}/>
                                    <span style={{marginLeft: '10px', fontWeight: '600'}}>Date & Time:</span>
                                    <span style={{marginLeft: '10px'}}>{getDateString(event.startDate)} {getTime(event.startDate)} -</span>
                                    <span> {getDateString(event.endDate)} {getTime(event.endDate)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column mb-1" style={{width: '60%'}}>
                            <div className="p-1">
                                <MdDescription className="mb-2" color="#f99812" size={20}/>
                                <span style={{marginLeft: '10px', fontWeight: '600'}}>Description:</span>
                                <span style={{marginLeft: '10px'}}>{event.description}</span>
                            </div>
                        </div>

                        <div className="d-flex flex-column mb-1" style={{width: '60%'}}>
                            <div className="p-1">
                                <AiFillTag className="mb-2" color="#f99812" size={20}/>
                                <span style={{marginLeft: '10px', fontWeight: '600'}}>Type:</span>
                                <span style={{marginLeft: '10px'}}>{event.type}</span>
                            </div>
                        </div>

                        <div>
                            <div style={{display: 'inline-block',}}>
                                <div className="p-1">
                                    <HiOutlineLocationMarker className="mb-2" color="#f99812" size={20}/>
                                    <span style={{marginLeft: '10px', fontWeight: '600'}}>Location :</span>
                                    <span style={{marginLeft: '10px'}}>{event.location}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div style={{display: 'inline-block'}}>
                                <div className="p-1">
                                    <MdOutlineEmail className="mb-2" color="#f99812" size={20}/>
                                    <span style={{marginLeft: '10px', fontWeight: '600'}}>Email:</span>
                                    <span style={{marginLeft: '10px'}}>{event.email}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column mb-1">
                                <div className="p-1">
                                    <MdGroups2 className="mb-2" color="#f99812" size={20}/>
                                    <span style={{marginLeft: '10px', fontWeight: '600'}}>Club:</span>
                                    <span style={{marginLeft: '10px'}}>{event.club ? event.club.name : 'Other'}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column mb-1">
                                <div className="p-1">
                                    <MdOutlineFastfood color="#f99812" className="mb-2" size={20}/>
                                    <span style={{marginLeft: '10px', fontWeight: '600'}}>Food:</span>
                                    <span style={{marginLeft: '10px'}}>{event.food ? 'Available' : 'Not Available'}</span>
                                </div>
                            </div>
                            <div>
                                <Button onClick={()=>{ attendEvent(event) } } className="mt-2" style={{backgroundColor:"#f99812", border: "solid 1px #f99812"}}
                                        variant="contained" endIcon={<BsCheckCircle />}>
                                    Attend
                                </Button>
                                <Button className="mt-2" style={{backgroundColor:"#f99812", border: "solid 1px #f99812", marginLeft: '15px'}}
                                        variant="contained" endIcon={<AiOutlineQuestionCircle />}>
                                    May be
                                </Button>
                                <Button className="mt-2" style={{backgroundColor:"#f99812", border: "solid 1px #f99812", marginLeft: '15px'}}
                                        variant="contained" endIcon={<MdOutlineCancel />}>
                                    No
                                </Button>
                                <Button className="mt-2" style={{backgroundColor:"#f99812", border: "solid 1px #f99812", marginLeft: '15px'}}
                                        variant="contained" endIcon={<RiBaseStationLine/>}>
                                    Attend online
                                </Button>
                            </div>
                        </div>
                </div>
                <div className="flex-fill" style={{width:'35%'}}>
                        <div className="d-flex justify-content-center">
                            <h5 style={{display: 'inline-block'}}>People Attending</h5>
                            <Button size="small" variant="text" style={{color: '#f99812',padding: '0px',fontSize: '20px' ,fontWeight:'600', marginLeft: '10px'}}>
                                {event.users.length}
                            </Button>
                        </div>
                        <div className="d-flex justify-content-center">
                            {userDetails && (userDetails.role == 'Admin' || userDetails.role == 'Superadmin') && (<UserList users={event.users}></UserList>)}
                        </div>
                </div>
            </div>

        </div>
    )
}
export default EventDetails;