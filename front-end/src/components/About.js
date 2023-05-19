import {Canvas} from "@react-three/fiber";
// import Cylinder3d from "./Cylinder3d";
import OptimiserRegular from '../font/optimer_regular.typeface.json';
import TextMesh from  "./Text3d";
import {FontLoader} from "three/addons/loaders/FontLoader";
const About = () => {
    const font = new FontLoader().parse(OptimiserRegular);
    const options= {
        font,
        size:10,
        height: 1
    };
    return (<div style={{marginTop: '8%'}}>
        <h3>About</h3>
        <div style={{height:'300px', width:'100%'}}>
            <Canvas orthographic camera={{ zoom: 9, position: [0, 0, 10] }} >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <directionalLight intensity={4.16} />

                <TextMesh position={[0, 0, -10]} options={options}/>

            </Canvas>
            {/*<Canvas>*/}
            {/*    /!*<pointLight position={[10, 10, 10]} />*!/*/}
            {/*    /!*<ambientLight color={"red"} />*!/*/}
            {/*    /!*<Cylinder3d position={[-1.2, 0, 0]} />*!/*/}
            {/*    <PerspectiveCamera*/}
            {/*        makeDefault*/}
            {/*        fov={50}*/}
            {/*        position={[0, 0, 80]}*/}
            {/*        rotation={[0, 10, 0]}*/}
            {/*    />*/}
            {/*    <TextMesh position={[0, 0, -10]}/>*/}
            {/*</Canvas>*/}
        </div>
            <p className="mt-1">
                The Pacific Event Wizard application is a common platform for all the UOP students to get the details of all the on-campus events organized by various clubs and departments altogether.
            </p>
            <h6 className="mt-4">Targeted Users for this application</h6>
            <ul>
                <li> All the University of the Pacific students who want to explore the different activities/ events on the campus.</li>
                <li>All the representatives of various clubs inside University of the Pacific can use this application</li>
                <li> All the faculty members who are representatives of various departments.</li>
                <li>Students out of the University of the Pacific can not use it.</li>
            </ul>


    </div>
)}
export default About;