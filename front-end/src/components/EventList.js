import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"
import React, {useEffect, useState} from "react";
import EventsService from "../services/eventsService";
import {Button} from "@mui/material";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import {getDateString, getDuration, showDays, getTime, sortDescDate} from "../utils/DateHandler";
import Form from "react-bootstrap/Form";
import {BiSearch, BiFilterAlt} from "react-icons/bi";
import {AiOutlineCloseCircle} from "react-icons/ai";
import FilterPanel from "./FilterPanel";
import {Dropdown} from "react-bootstrap";
import eventDetails from "./EventDetails";
import FirebaseService from "../services/firebaseService";
const EventList = () => {
    const [events, setEvents] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [search, setSearch] = useState('');
    const filterMenu = ['All', 'Today','Tomorrow','This Month', 'Next Month'];
    const [filterName, setFilterName]= useState(filterMenu[0]);
    const [modalShow, setModalShow] = useState(false);
    const [filterDetails, setFilterDetails] = useState({});
    useEffect(() => {
        if(process.env.REACT_APP_DATABASE === 'firebase') {
            FirebaseService.getFirebaseData('events')
                .then(querySnapshot =>{
                    console.log("querySnapshot", querySnapshot)
                    let data = [];
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.data())
                        const temp = doc.data();
                        temp.startDate = temp.startDate.toDate();
                        temp.endDate = temp.endDate.toDate();
                        temp.users = [];
                        data = data.concat(temp);
                    });
                    console.log("eventList", data)
                    setEvents(sortDescDate(data));
                    setAllEvents(data);
                });
            FirebaseService.getFirebaseData('clubs')
                .then(response =>{
                console.log("querySnapshot", response)
                let clubs = [];
                    response.forEach((doc) => {
                    // console.log(doc.data())
                    clubs = clubs.concat(doc.data());
                });
                console.log("clubList", clubs)
                setClubs(clubs);
            });
            // const userList = firebaseService.getFirebaseData('users');
        } else {
            EventsService.getAll()
                .then(response => {
                    // console.log('promise resolved', response)
                    setEvents(sortDescDate(response));
                    setAllEvents(response);
                })
            EventsService.getAll('/api/clubs')
                .then(response => {
                    // console.log('Clubs promise resolved', response);
                    setClubs(response);
                })
        }
    }, [])

    const searchEvents = (search)=>{
        setSearch(search);
        if(search.length>0) {
            const filteredEvents = events.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
            // console.log(filteredEvents, search, allEvents)
            setEvents(filteredEvents);
        } else {
            setEvents(filterEvents(filterName));
        }

    }
    const getImage = (event) => {
        const club = clubs.find(e => {
            if(process.env.REACT_APP_DATABASE === 'firebase') {
                return event.club && e.id == event.club
            } else {
                return event.club && e.id == event.club.id
            }
        });
        console.log("img", club, clubs)
        return club ? club.imgUrl : '/other.png';
    }

    const openFilters = ()=>{
        setModalShow(!modalShow)
    }
    const changeFilterName = (value)=>{
        setSearch('');
        setFilterName(value);
        if(Object.keys(filterDetails).length) {
            applyFilters(filterDetails, value);
        } else {
            setEvents(filterEvents(value));
        }
    }
    const clearFilters = () => {
        setFilterDetails({});
        setSearch('');
        setFilterName(filterMenu[0]);
        setEvents(allEvents);
    }
    const applyFilters = (filters, name) => {
        // console.log("applyFilters",filters, filterName);
        setSearch('');
        const filter = name ? name : filterName;
        const events = filterEvents(filter);
        setFilterDetails(filters);
        const eventsWithFilters = events.filter(event => {
            const start = new Date(event.startDate).getTime();
            const end = new Date(event.endDate).getTime();
            const filterStart = filters.startDate ? new Date(filters.startDate).getTime() : "";
            const filtersEnd = filters.endDate ? new Date(filters.endDate).getTime() : "";
            if(
            (event.club && (filters.club =='' || event.club.name == filters.club))
            && (filters.food == true ? event.food == true : (event.food == false || event.food == true))
            && (filters.location =='' || event.location == filters.location)
            && (filters.type == '' || event.type == filters.type)
            && (filterStart == "" || filtersEnd == "" || (start>= filterStart && end<= filtersEnd) )
                ){
                return event;
            }
        })
        // console.log("filterEvents",eventsWithFilters);
        setEvents(eventsWithFilters);
    }
     const filterEvents = (filter)=>{
        if(filter == 'All')
            return allEvents;
        if(filter == 'Today'){
            return allEvents.filter(e=> {
                const startDate = new Date(e.startDate);
                const today = new Date();
                return (startDate.getDate() == today.getDate() &&
                startDate.getMonth() == today.getMonth() &&
                startDate.getFullYear() == today.getFullYear());
            })
        }
         if(filter == 'Tomorrow'){
             return allEvents.filter(e=> {
                 const startDate = new Date(e.startDate);
                 const today = new Date();
                 return (startDate.getDate() == (today.getDate() + 1) &&
                     startDate.getMonth() == today.getMonth() &&
                     startDate.getFullYear() == today.getFullYear());
             })
         }
         if(filter == 'This Month'){
             return allEvents.filter(e=> {
                 const startMonth = new Date(e.startDate).getMonth();
                 const month = new Date().getMonth();
                 return (startMonth == month );
             })
         }
         if(filter == 'Next Month'){
             return allEvents.filter(e=> {
                 const startMonth = new Date(e.startDate).getMonth();
                 const month = new Date().getMonth() + 1;
                 return (startMonth == month );
             })
         }
     }
    return(
        <div className="rowContainer">
            <Form className="d-flex" style={{width:'95%', display:'inline-block'}}>
                <BiSearch style={{marginTop:'12px', marginRight:'5px', marginLeft: '5px', color: 'grey'}} size={20}/>
                {/*<Form.Text style={{width:'33%', marginRight:'5px', marginTop:'10px'}}>Search Events</Form.Text>*/}
                <Form.Control
                    type="search"
                    className="mt-2"
                    style={{width:'35%', display:'inline-block', marginRight:'5px'}}
                    placeholder="Search Event Name"
                    value={search}
                    onChange={(event)=>{searchEvents(event.target.value)}}
                    size={"sm"}
                />
                <Dropdown size={"sm"} className="mt-2" style={{minWidth:'100px', maxWidth:'100px'}}
                          onSelect={(event,e)=>changeFilterName(e.target.text)}>
                    <Dropdown.Toggle style={{backgroundColor:"#f99812", border: "solid 1px #f99812"}} >
                        {filterName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            filterMenu.map((menu, index) => (<Dropdown.Item key={index} value={menu}>{menu}</Dropdown.Item>))
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Button onClick={openFilters} className="mt-2" size="small" style={{marginLeft:'30%',backgroundColor:"#f99812", border: "solid 1px #f99812"}}
                        variant="contained" startIcon={<BiFilterAlt style={{color: 'white'}}/>}>
                    Filters
                </Button>
                <Button onClick={clearFilters} className="mt-2" size="small" style={{marginLeft:'2%',backgroundColor:"#f99812", border: "solid 1px #f99812"}}
                        variant="contained" startIcon={<AiOutlineCloseCircle style={{color: 'white'}}/>}>
                    Reset
                </Button>
            </Form>

            {
                modalShow && (<FilterPanel
                show={modalShow}
                events={allEvents}
                clubs={clubs}
                filters={filterDetails}
                onHide={(value, filters) => {
                    if(value && value == 'Apply') applyFilters(filters)
                    setModalShow(false)
                }}
                />)
            }
            <CardGroup style={{ marginTop: '10px'}}>
            {
                events.map(event => {
                    return (
                        <Card key={event.id} style={{ minWidth: '15rem', maxWidth: '15rem', height: '250px',padding: '1px', marginLeft: '10px', marginRight: '15px', marginTop: '10px', marginBottom: '10px', borderRadius:'2%',border: 'solid 1px #f99812'}}>
                            {/*<FaRegCalendarCheck style={{color:'orange'}}/>*/}
                            <Card.Img variant="top" src={getImage(event)} style={{ height:'100px', borderRadius:'3%' }}/>
                            <Card.Body>
                                <div style={{ textAlign:'center' }}>
                                    <Card.Text style={{ fontsize:'14px', fontWeight: 'bold', margin: '0px'}}>
                                        <Link style={{color:"#f99812" }}  state={event} to={`/events/${event.id}`}>
                                            {event.name}
                                        </Link>
                                    </Card.Text>
                                    <div style={{ height:'45px', fontSize: '12px', fontWeight: '400'}}>
                                        <Card.Text className="mt-2" style={{margin: '0px'}}><b style={{color:'#8b8479'}}>Venue:</b> {event.location}</Card.Text>
                                        <Card.Text style={{margin: '0px'}}><b style={{color:'#8b8479'}}>Date:</b> {getDateString(event.startDate)}</Card.Text>
                                        <Card.Text style={{margin: '0px'}}><b style={{color:'#8b8479'}}>Time:</b> { getDuration(event) < 24 ? `${getTime(event.startDate)} - ${getTime(event.endDate)}` : showDays(event)} </Card.Text>
                                    </div>
                                {/*<Button style={{backgroundColor:"#f99812", border: "solid 1px #f99812"}} size="sm">View</Button>*/}
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })
            }
            </CardGroup>
        </div>
    )
}

export default EventList;