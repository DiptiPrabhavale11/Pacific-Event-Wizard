import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import EventsService from "../services/eventsService";
import FirebaseService from "../services/firebaseService";
import {useNavigate} from "react-router-dom";
import {sortDescDate} from "../utils/DateHandler";
import firebaseService from "../services/firebaseService";
const CreateEvent = ({setNotification})=> {
    const eventTypes = ['Activity', 'Sport', 'Other'];
    // const clubs = [{id: 1, name: 'Google Developer Student Club'}, {id: 2,name: 'SWE'}, {id: 3,name: 'UOPI'}, {id: 4,name: 'Other'}]
    const [validated, setValidated] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setHours(new Date().getHours() + 1)));
    const [location, setLocation] = useState('');
    // const [link, setLink] = useState('');
    const [type, setType] = useState(eventTypes[0]);
    const [imgUrl, setImgUrl] = useState('');
    const [description, setDescription] = useState('');
    const [food, setFood] = useState(false);
    const [online, setOnline] = useState(false);
    const [name, setName] = useState('');
    const [clubs, setClubs] = useState([]);
    const [club, setClub] = useState({});
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if(process.env.REACT_APP_DATABASE === 'firebase') {
            FirebaseService.getFirebaseData('clubs')
                .then(response =>{
                    let clubs = [];
                    response.forEach((doc) => {
                        clubs = clubs.concat(doc.data());
                    });
                    setClubs(clubs);
                    setClub(clubs[0]);
                });
        } else{
            EventsService.getAll('api/clubs')
                .then(response => {
                    // console.log('promise resolved', response)
                    setClubs(response);
                    setClub(response[0]);
                })
        }
    }, [])
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        form.checkValidity();
        const testEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
        // console.log(form.checkValidity(), testEmail)
        if (name.length>=2 && name.length<=30 && location.length>=2 && testEmail) {
            setValidated(true);
            const clubId = typeof club == 'string' ? club : club.id;
            if(new Date(startDate).getTime()>new Date(endDate).getTime()) {
                setNotification({msg:`Start date can not be greater than end date!`, variant:'danger', header:'Error'});
                return;
            }
            console.log("club", clubId)
            let eventDetails = {startDate, endDate,name,imgUrl,description,food,online,type,location, email, club: clubId};
            // console.log("eventDetails", eventDetails)
            console.log("DATABASE", process.env.REACT_APP_DATABASE);
            if(process.env.REACT_APP_DATABASE === 'firebase') {
                eventDetails.id = new Date().getTime();
                await firebaseService.saveFirebaseData(eventDetails, 'events');
            } else {
                await EventsService.create(eventDetails, '/api/events');
            }
            setNotification({msg:`${name} has successfully created!`, variant:'info', header:'Success'});
            navigate("/events");
        } else {
            setValidated(true);
        }
    };
    const changeValue = (value, func) => {
        func(value);
    }
    return (
        <div style={{ display: 'block',
            width: '100%',
            padding: 10, marginTop:'60px'}}>
            <h4>Create New Event</h4>
            <Form noValidate validated={validated}>
            <div className="mb-6" style={{display:'inline-block', width:'100%'}}>
                <Form.Group as={Col} md="5" style={{display:'inline-block'}} controlId="validationCustom01">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={name}
                        onChange={e=>{changeValue(e.target.value, setName)}}
                        placeholder="Event name"
                    />
                    {/*<Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                </Form.Group>
                <Form.Group as={Col} md="5" style={{display:'inline-block', marginLeft:'10px'}} controlId="validationCustom02">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={e=>{changeValue(e.target.value, setLocation)}}
                    />
                    {/*<Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                </Form.Group>

                <Form.Group as={Col} md="3" className="mt-2" style={{display:'inline-block'}} controlId="validationCustom03">
                    <Form.Label>Type</Form.Label>
                    <Form.Select aria-label="Default select example" value={type} onChange={e=>{changeValue(e.target.value, setType)}}>
                        <option>Select type</option>
                        {
                            eventTypes.map(
                                (eventType,i)=>(<option key={i}>{eventType}</option>))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="3" className="mt-2" style={{display:'inline-block', marginLeft:'10px'}} controlId="validationCustomUsername">
                    <Form.Label className="mr-2" style={{marginRight:'10px'}}>Starts</Form.Label>
                    <Datetime value={startDate} onChange={e=>{changeValue(e._d, setStartDate)}}/>
                </Form.Group>
                <Form.Group as={Col} md="3" className="mt-2" style={{display:'inline-block', marginLeft:'10px'}} controlId="validationCustomUsername">
                    <Form.Label className="mr-2" style={{marginRight:'10px'}}>Ends</Form.Label>
                    <Datetime value={endDate} onChange={e=>{changeValue(e._d, setEndDate)}}/>
                </Form.Group>
                <Form.Group as={Col} md="2" style={{display:'inline-block', marginLeft:'20px'}} className="mt-2">
                    <Form.Check
                        label="Food"
                        checked={food}
                        onChange={e=>{changeValue(!food, setFood)}}
                    />
                </Form.Group>

                <Form.Group as={Col} md="3" style={{display:'inline-block'}} controlId="validationCustom03">
                    <Form.Label>Club</Form.Label>
                    <Form.Select aria-label="Default select example" value={club.id} onChange={e=>{changeValue(e.target.value, setClub)}}>
                        <option>Select type</option>
                        {
                            clubs.map(
                                (club,i)=>(<option key={i} value={club.id}>{club.name}</option>))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="3" style={{display:'inline-block', marginLeft:'10px'}} className="mt-2" controlId="validationCustom04">
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control onChange={e=>{changeValue(e.target.value, setImgUrl)}} type="text" placeholder="Link" value={imgUrl} />
                </Form.Group>
                <Form.Group as={Col} md="3" style={{display:'inline-block', marginLeft:'10px'}} className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" value={email}  onChange={e=>{changeValue(e.target.value, setEmail)}} placeholder="Enter email" />
                </Form.Group>
                <Form.Group as={Col} md="2" style={{display:'inline-block', marginLeft:'20px'}} className="mt-2">
                    <Form.Check
                        label="Online"
                        checked={online}
                        onChange={e=>{changeValue(!online, setOnline)}}
                    />
                </Form.Group>

                <Form.Group as={Col} md="10" className="mt-2" controlId="validationDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={e=>{changeValue(e.target.value, setDescription)}} as="textarea" rows={3} value={description}/>
                    {/*<Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                </Form.Group>

            </div>
            <div style={{ textAlign:'right' }}>
                <Button style={{backgroundColor:"#f99812", border: "solid 1px #f99812"}} onClick={handleSubmit}>Submit</Button>
            </div>
        </Form>
        </div>
    );
}

export default CreateEvent;