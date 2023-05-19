import Form from "react-bootstrap/Form";
import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Datetime from "react-datetime";

const FilterPanel = (props) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [food, setFood] = useState(false);
    const eventTypes = ['Activity', 'Sport', 'Other'];
    const [type, setType] = useState('');
    const locationList = [...new Set(props.events.map(e=>e.location))];
    const [location, setLocation]= useState('');
    const clubList = props.clubs.map(c=>c.name);
    const [club, setClub]= useState('');
    const changeFilter = (value, func) => {
        func(value);
    }
    const changeStartDate = (value) => {
        setStartDate(value);
        const end = new Date(new Date(value).getTime() + (60 * 60 * 24 * 1000));
        setEndDate(end);
    }
    const changeEndDate = (value) => {
        setEndDate(value);
        if(new Date(value).getTime()<new Date(startDate).getTime()) {
            const start = new Date(new Date(value).getTime() - (60 * 60 * 24 * 1000));
            setStartDate(start)
        }
    }
    // console.log("props", props);
    useEffect(()=>{
        if(props.filters && Object.keys(props.filters).length) {
            setClub(props.filters.club);
            setType(props.filters.type);
            setLocation(props.filters.location);
            setFood(props.filters.food);
            setStartDate(props.filters.startDate);
            setEndDate(props.filters.endDate);
        }
    },[])
    const applyFilters = () =>{
        const filterDetails = {startDate, endDate, food, type, club, location}
        props.onHide('Apply', filterDetails)
    }
    const clearFilters = () =>{
        setClub('');
        setType('');
        setLocation('');
        setFood(false);
        setStartDate('');
        setEndDate('');
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Event Filters
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Col} md="4" style={{display:'inline-block'}} controlId="validationCustom01">
                        <Form.Label>Venue</Form.Label>
                        <Form.Select  value={location} onChange={(e)=>{changeFilter(e.target.value, setLocation)}} style={{display:'inline-block',marginLeft: '10px'}} size="sm">
                            <option value="" disabled hidden></option>
                            {
                                locationList.map((loc, index) => <option key={index} value={loc}>{loc}</option>)
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="4" style={{display:'inline-block',marginLeft: '10px'}} controlId="validationCustom01">
                        <Form.Label>Club</Form.Label>
                        <Form.Select  value={club} onChange={(e)=>{changeFilter(e.target.value, setClub)}} style={{display:'inline-block',marginLeft: '10px'}} size="sm">
                            <option value="" disabled hidden>
                            </option>
                            {
                                clubList.map((c, index) => <option key={index} value={c}>{c}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="4" style={{display:'inline-block'}} controlId="validationCustom01">
                        <Form.Label>Type</Form.Label>
                        <Form.Select  value={type} onChange={(e)=>{changeFilter(e.target.value, setType)}} style={{display:'inline-block',marginLeft: '10px'}} size="sm">
                            <option value="" disabled hidden>
                            </option>
                            {
                                eventTypes.map((type, index) => <option key={index} value={type}>{type}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="5" style={{display:'inline-block', marginLeft:'25px'}} className="mt-2">
                        <Form.Check
                            label="Food"
                            checked={food}
                            onChange={e=>{changeFilter(!food, setFood)}}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="5" className="mt-2" style={{display:'inline-block', marginLeft:'10px'}} controlId="validationCustomUsername">
                        <Form.Label className="mr-2" style={{marginRight:'10px'}}>Starts</Form.Label>
                        <Datetime value={startDate} onChange={e=>{changeStartDate(e._d)}}/>
                    </Form.Group>
                    <Form.Group as={Col} md="5" className="mt-2" style={{display:'inline-block', marginLeft:'10px'}} controlId="validationCustomUsername">
                        <Form.Label className="mr-2" style={{marginRight:'10px'}}>Ends</Form.Label>
                        <Datetime value={endDate} onChange={e=>{changeEndDate(e._d)}}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{backgroundColor:"#f99812", border: "solid 1px #f99812"}} onClick={applyFilters}>Apply</Button>
                <Button style={{backgroundColor:"#f99812", border: "solid 1px #f99812"}} onClick={clearFilters}>Clear</Button>
            </Modal.Footer>
        </Modal>)
}
export default FilterPanel;

