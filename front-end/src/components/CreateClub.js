import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import EventsService from "../services/eventsService";
import firebaseService from "../services/firebaseService";
const CreateEvent = ({setNotification})=> {
    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const createClub = async (event) => {
        const form = event.currentTarget;
        form.checkValidity();
        const testEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
        // console.log(form.checkValidity(), testEmail)
        if (name.length>=2 && name.length<=30 && testEmail) {
            setValidated(true);
            let clubDetails = {name,imgUrl,description,email}
            console.log("DATABASE", process.env.REACT_APP_DATABASE);
            if(process.env.REACT_APP_DATABASE === 'firebase') {
                clubDetails.id = new Date().getTime();
                await firebaseService.saveFirebaseData(clubDetails, 'clubs');
            } else {
                await EventsService.create(clubDetails, '/api/clubs');
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
            <h4 className="mt-3">Create New Club</h4>
            <Form className="mt-3" noValidate validated={validated}>
                <div className="mb-6" style={{display:'inline-block', width:'100%'}}>
                    <Form.Group as={Col} md="5" style={{display:'inline-block'}} controlId="validationCustom01">
                        <Form.Label>Club Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={name}
                            onChange={e=>{changeValue(e.target.value, setName)}}
                            placeholder="Club name"
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="5"  className="mt-2" controlId="validationCustom04">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control onChange={e=>{changeValue(e.target.value, setImgUrl)}} type="text" placeholder="URL" value={imgUrl} />
                    </Form.Group>
                    <Form.Group as={Col} md="4" style={{display:'inline-block', marginTop:'10px'}} className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" value={email}  onChange={e=>{changeValue(e.target.value, setEmail)}} placeholder="Enter email" />
                    </Form.Group>


                    <Form.Group as={Col} md="10" className="mt-2" controlId="validationDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={e=>{changeValue(e.target.value, setDescription)}} as="textarea" rows={3} value={description}/>
                        {/*<Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                    </Form.Group>

                </div>
                <div style={{ textAlign:'right' }}>
                    <Button style={{backgroundColor:"#f99812", border: "solid 1px #f99812"}} onClick={createClub}>Create</Button>
                </div>
            </Form>
        </div>
    );
}

export default CreateEvent;