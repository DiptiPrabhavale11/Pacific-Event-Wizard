import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillCalendar2EventFill } from "react-icons/bs";
import {BiUser} from "react-icons/bi";
import {useEffect, useState} from "react";
import UsersService from "../services/usersService";
import TextMesh from "./Text3d";
import {Canvas} from "@react-three/fiber";
import texture from '../images/whiteTexture.jpg';
import FirebaseService from "../services/firebaseService";
const AppHeader = () => {
    const [userList, setUserList] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
        if(process.env.REACT_APP_DATABASE === 'firebase') {
            FirebaseService.getFirebaseData('users')
                .then(response =>{
                    console.log("querySnapshot", response)
                    let users = [];
                    response.forEach((doc) => {
                        // console.log(doc.data())
                        users = users.concat(doc.data());
                    });
                    console.log("userList", users)
                    const superAdmin = users.find(u=>u.role=='Superadmin')
                    setUserList(users);
                    window.localStorage.setItem("userDetails", JSON.stringify(superAdmin));
                    setUserDetails(superAdmin);
                });
        } else {
            UsersService.getAllUsers()
                .then(response => {
                    setUserList(response);
                    window.localStorage.setItem("userDetails", JSON.stringify(response[0]));
                    setUserDetails(response[0]);

                })
        }
    }, [])
    const changeUserDetails = (events,value)=>{
        const user = userList.find(u=>u.id==value)
        window.localStorage.setItem("userDetails", JSON.stringify(user));
        setUserDetails(user);
    }
    const createClub = () => {
        return (
            <LinkContainer to="/create-club">
                <Nav.Link>Create Club</Nav.Link>
            </LinkContainer>
        )
    }

    const createEvent = () => {
        return (
            <LinkContainer to="/create-event">
                <Nav.Link>Create Event</Nav.Link>
            </LinkContainer>
        )
    }
    return (
        <>
            <Navbar variant="dark" fixed="top" style={{backgroundColor: 'rgb(249 152 18)',color: '#fff'}}>
                <Container>
                    <Navbar.Brand>
                        <BsFillCalendar2EventFill className="mb-2" size={30}/>
                        {/*<h3 style={{display:'inline-block', marginLeft: '10px'}}>Pacific EventWizard</h3>*/}
                        <div style={{display:'inline-block', padding: '0px', marginLeft: '10px', height:'30px', width:'88%'}}>
                            <Canvas orthographic camera={{ zoom: 1.9, position: [0, 0, 2] }}>
                                <ambientLight />
                                <pointLight position={[10, 10, 10]} />
                                <directionalLight intensity={4.16} />
                                <TextMesh position={[0, 0, -10] } textureRef={texture} text={'Pacific EventWizard'}/>
                            </Canvas>
                        </div>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <LinkContainer to="/events">
                            <Nav.Link>Events</Nav.Link>
                        </LinkContainer>
                        {
                            userDetails && (userDetails.role == 'Admin' || userDetails.role == 'Superadmin') && createEvent()
                        }
                        {
                            userDetails && (userDetails.role == 'Superadmin') && createClub()
                        }
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <BiUser style={{marginRight: '10px'}} className="mt-2" size={20}/>
                        <span className="mt-2">Logged in as - <b>{userDetails && userDetails.name}</b></span>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title=""
                            align="end"
                            onSelect={(event,e)=>changeUserDetails(event, e.target.value)}
                        >
                            {
                                userList.map(
                                    user => {
                                        return (<NavDropdown.Item as="option" key={user.id} value={user.id}>{user.name} - ({user.role})</NavDropdown.Item>)
                                    }
                                )
                            }
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
export default AppHeader;