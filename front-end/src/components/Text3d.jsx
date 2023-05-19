import React, { useRef } from 'react';
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Roboto from '../font/helvetiker_bold.typeface.json';
import texture from '../images/texture.jpg'
extend({ TextGeometry })

function TextMesh ({position, textureRef, options, text}) {
    const mesh = useRef(null)
    const font = new FontLoader().parse(Roboto);
    useFrame(() => {
        // mesh.current.rotation.x += 0.01
        mesh.current.rotation.y += 0.01
        // mesh.current.rotation.z += 0.01
        mesh.current.geometry.center();
    })

    // configure font geometry
    const defaultTextOptions = {
        font,
        size:10,
        height: 1
    };
    const textureName = textureRef ? textureRef : texture;
    const three_texture = new THREE.TextureLoader().load(textureName)
    three_texture.wrapS = THREE.RepeatWrapping
    three_texture.wrapT = THREE.RepeatWrapping
    three_texture.repeat.set(0.1, 0.1);
    const textOptions = options ? options : defaultTextOptions;
    const finalText = text ? text : 'Pacific Event Wizard';
   return (
        <mesh position={position} ref={mesh}>
            <textGeometry attach='geometry' args={[finalText, textOptions]} />
            <meshBasicMaterial attach='material' args={[{ map: three_texture }]}/>
        </mesh>
    )
}

export default TextMesh;