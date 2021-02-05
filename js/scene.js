import {OBJLoader} from 'https://threejs.org/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejs.org/examples/jsm/loaders/MTLLoader.js';
import {OrbitControls} from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import {PointerLockControls} from 'https://threejs.org/examples/jsm/controls/PointerLockControls.js';

var container, scene, camera, renderer, mtlLoader, objLoader, tex, m, material, mesh, orbitControls, plControls, manager;
var clock = new THREE.Clock();
var moveForward = false;
var moveBackward = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var target = new THREE.Vector3();

noise.seed(Math.random());

$('#scene-overlay').click(function() {
    $(this).hide();
    plControls.lock();
})

init();
animate();

function init() {
    container = $('#scene');
    var width = $('#scene').width();
    var height = $('#scene').height();

    manager = new THREE.LoadingManager();
    manager.onLoad = function() {
        setTimeout(() => {
            $('#scene-overlay i').hide();
            $('#scene-overlay').append('<p>Click to enter interactive 3D view');
        }, 2000);
    }

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 40000);
    camera.position.set(0, 2, 20);
    camera.up = new THREE.Vector3(0, 1, 0)
    camera.lookAt(scene);
    
    var light = new THREE.PointLight(0xffffff, 0.9);
    light.position.set(-200, 400, -250)
    scene.add(light);

    light = new THREE.AmbientLight(0xffffff, 0.2);
    light.position.set(0, 10, 0)
    scene.add(light);

    var box = new THREE.BoxGeometry(40000, 40000, 40000);
    tex = new THREE.CubeTextureLoader()
    .setPath( './objects/cube-map/' )
    .load([
        'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
    ]);
    tex.mapping = THREE.CubeRefractionMapping;
    material = new THREE.MeshPhongMaterial({envMap: tex, side: THREE.BackSide});    
    mesh = new THREE.Mesh(box, material);
    mesh.rotateY(1.57);
    scene.add(mesh);

    var plane = new THREE.PlaneGeometry(200, 200, 30, 30);
    for (var i = 0; i < 320; i++) {
        var offset = noise.simplex2(plane.vertices[i].x, plane.vertices[i].y);
        plane.vertices[i].z = 5 + plane.vertices[i].z + 2 * offset;
    }
    for (var i = 320; i < 640; i++) {
        var offset = noise.simplex2(plane.vertices[i].x, plane.vertices[i].y);
        if(plane.vertices[i].x > -35 && plane.vertices[i].x < 35) {
            plane.vertices[i].z = plane.vertices[i].z + (offset / 2);
        } else {
            plane.vertices[i].z = 5 + plane.vertices[i].z + 2 * offset;
        }
    }
    for (var i = 640; i < 961; i++) {
        var offset = noise.simplex2(plane.vertices[i].x, plane.vertices[i].y);
        plane.vertices[i].z = 5 + plane.vertices[i].z + 5 * offset;
    }

    plane.verticesNeedUpdate = true;
    plane.rotateX(-1.57);
    tex =  new THREE.TextureLoader().load('./objects/moon-textures/moon.jpg');
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    material = new THREE.MeshPhongMaterial({map: tex, shininess: 10});    
    mesh = new THREE.Mesh(plane, material);
    scene.add(mesh);

    var earthGroup = new THREE.Group();

    var sphere = new THREE.SphereGeometry(100, 100, 100);
    material = new THREE.MeshPhongMaterial();
    tex = new THREE.TextureLoader().load('./objects/earth-textures/earth-diffuse.jpg');
    material.map = tex;
    tex = new THREE.TextureLoader().load('./objects/earth-textures/earth-bump.jpg');    
    material.bumpMap = tex;
    tex = new THREE.TextureLoader().load('./objects/earth-textures/earth-specular.jpg');   
    material.specularMap = tex;  
    material.specular = new THREE.Color(0xfffff0);
    material.refractionRatio = 0.5;
    material.shininess = 5;
    mesh = new THREE.Mesh(sphere, material);
    earthGroup.add(mesh);

    sphere = new THREE.SphereGeometry(100.1, 100, 100);
    material = new THREE.MeshPhongMaterial();
    tex = new THREE.TextureLoader().load('./objects/earth-textures/earth-cloud.png');
    material.map = tex;
    tex = new THREE.TextureLoader().load('./objects/earth-textures/earth-cloud-specular.jpg');
    material.specularMap = tex; 
    material.specular = new THREE.Color(0xfffff0);
    material.side = THREE.DoubleSide;
    material.transparent = true;
    material.opacity = 0.3;
    material.depthWrite = false;
    material.refractionRatio = 0.5;
    material.shininess = 5;
    mesh = new THREE.Mesh(sphere, material);
    earthGroup.add(mesh);

    earthGroup.translateZ(-500);
    earthGroup.translateY(200);
    earthGroup.rotateY(-2);
    earthGroup.rotateZ(-0.5);
    
    scene.add(earthGroup);

    var transX = [-25, -20, 0, 20, 25, 20, 0, -20];
    var transZ = [0,  -20, -25, -20, 0, 20, 25, 20];
    var rotY = [1.57, 0.73, 0, -0.73, -1.57, -2.3, 3.14, 2.3];

    var beds = new THREE.Group();
    var domes = new THREE.Group();


    for (var i = 0; i < 8; i++) {
        try {throw i}
        catch (ii) {
            var room = new THREE.Group();

            try {throw room}
            catch (roomroom) {
                mtlLoader = new MTLLoader()
                .load('./objects/bed.mtl', (material) => {
                    objLoader = new OBJLoader()
                    .setMaterials(material)
                    .load('./objects/bed.obj', (object) => {
                        object.rotateX(-1.57);
                        m = new THREE.Matrix4();
                        m.set(0.01, 0, 0, 0,
                            0, 0.01, 0, 0,
                            0, 0, 0.01, 0,
                            0, 0, 0, 1);
                        object.applyMatrix4(m);
                        object.translateX(-1);
                        object.translateY(0.8);
                        object.translateZ(1);
                        roomroom.add(object);
                    })
                })
    
                mtlLoader = new MTLLoader()
                .load('./objects/dome.mtl', (material) => {
                    objLoader = new OBJLoader()
                    .setMaterials(material)
                    .load('./objects/dome.obj', (object) => {
                        //glass
                        object.children[2].material.transparent = true;
                        object.children[2].material.opacity = 0.2;
            
                        //concrete rims
                        tex = new THREE.TextureLoader().load('./objects/dome-textures/outer-rim.png');
                        tex.wrapS = THREE.RepeatWrapping;
                        tex.wrapT = THREE.RepeatWrapping;  
                        object.children[4].material.map = tex;
                        object.children[7].material.map = tex;
            
                        tex = new THREE.TextureLoader().load('./objects/dome-textures/inner-rim.png');
                        tex.wrapS = THREE.RepeatWrapping;
                        tex.wrapT = THREE.RepeatWrapping;  
                        object.children[0].material.map = tex;
            
                        //floors
                        tex = new THREE.TextureLoader().load('./objects/dome-textures/outer-floor.png');
                        tex.wrapS = THREE.RepeatWrapping;
                        tex.wrapT = THREE.RepeatWrapping;   
                        object.children[6].material.map = tex;
                        object.children[6].material.shininess = 5;
            
                        tex = new THREE.TextureLoader().load('./objects/dome-textures/inner-floor.png');
                        tex.wrapS = THREE.RepeatWrapping;
                        tex.wrapT = THREE.RepeatWrapping;   
                        object.children[3].material.map = tex;
                        object.children[3].material.shininess = 5; 
            
                        m = new THREE.Matrix4();
                        m.set(0.01, 0, 0, 0,
                            0, 0.01, 0, 0,
                            0, 0, 0.01, 0,
                            0, 0, 0, 1);
                        object.applyMatrix4(m);
                        object.rotateY(1.57);
                        object.translateY(0.2);
                        roomroom.add(object);
                    })
                })

                roomroom.translateX(transX[ii]);
                roomroom.translateZ(transZ[ii]);
                roomroom.rotateY(rotY[ii]);
                scene.add(roomroom);
            }

        }
    }

    mtlLoader = new MTLLoader()
    .load('./objects/dance-dome.mtl', (material) => {
        objLoader = new OBJLoader()
        .setMaterials(material)
        .load('./objects/dance-dome.obj', (object) => {
            //glass
            tex = new THREE.TextureLoader().load('./objects/dome-textures/laser.png');
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            object.children[2].material.map = tex;
            object.children[2].material.transparent = true;
            object.children[2].material.opacity = 0.2;

            //concrete rim
            tex = new THREE.TextureLoader().load('./objects/dome-textures/inner-rim.png');
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;  
            object.children[0].material.map = tex;

            //floor
            tex = new THREE.TextureLoader().load('./objects/dome-textures/dancefloor.jpg');
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;  
            object.children[3].material.shininess = 5; 
            object.children[3].material.map = tex;

            m = new THREE.Matrix4();
            m.set(0.05, 0, 0, 0,
                0, 0.05, 0, 0,
                0, 0, 0.05, 0,
                0, 0, 0, 1);
            object.applyMatrix4(m);
            object.rotateY(1.57);
            object.translateY(0.1);
            object.translateX(-4);
            scene.add(object);
        })
    })

    transX = [-10, -7, 0, 7, 10, 7, 0, -7];
    transZ = [0,  -7, -10, -7, 0, 7, 10, 7];
    rotY = [1.57, 0.73, 0, -0.73, -1.57, -2.3, 3.14, 2.3];
    var colors = [0x3C5FA6, 0xBFB169];

    for (var i = 0; i < 8; i++) {
        try {throw i}
        catch (ii) {
            var idol = new THREE.Group();

            try {throw idol}
            catch (idolidol) {
                mtlLoader = new MTLLoader()
                .load('./objects/character.mtl', (material) => {
                    objLoader = new OBJLoader(manager)
                    .setMaterials(material)
                    .load('./objects/character.obj', (object) => {
                        m = new THREE.Matrix4();
                        m.set(0.06, 0, 0, 0,
                            0, 0.06, 0, 0,
                            0, 0, 0.06, 0,
                            0, 0, 0, 1);
                        object.applyMatrix4(m);
                        object.translateY(1.2);
                        object.rotateX(-1.57);
                        idolidol.add(object);
                    })
                })

                objLoader = new OBJLoader() 
                .load('./objects/pillow.obj', (object) => {
                    var color = Math.random() < 0.5 ? 0 : 1;
                    object.children[0].material.color = new THREE.Color(colors[color]);
                    object.translateY(1.6);
                    idolidol.add(object);
                })

                idolidol.translateX(transX[ii]);
                idolidol.translateZ(transZ[ii]);
                idolidol.rotateY(rotY[ii]);
                scene.add(idolidol);
            }
        }
    }

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true
    renderer.setSize(container.width(), container.height())
    container.append(renderer.domElement);

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enabled = false;

    plControls = new PointerLockControls(camera, renderer.domElement);
    scene.add(plControls.getObject());

    renderer.render(scene, camera);
}

function animate() {
    if (window.location.hash == '#home' || window.location.hash == '') {
        requestAnimationFrame(animate);
        render();
    }
}

function render() {
    if ( plControls.isLocked === true ) {
        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.z -= velocity.z * 40.0 * delta;

        camera.getWorldDirection(target);

        direction = Number(moveForward) - Number(moveBackward);

        velocity.z -= direction * 400.0 * delta;

        target.multiplyScalar(direction);

        if (Math.abs(camera.position.z + target.z) < 31 && Math.abs(camera.position.x + target.x) < 31) {
            plControls.moveForward( - velocity.z * delta );  
        }

        prevTime = time; 

        var camPos = new THREE.Vector3();
        camera.getWorldPosition(camPos);

        var distFromO = Math.sqrt(Math.pow(camPos.x, 2) + Math.pow(camPos.z, 2));

        if (distFromO < 13.5) {
            camera.position.y = 3;
        } else {
            camera.position.y = 2; 
        }
    }

    if (plControls.isLocked === false) {
        $('#scene-overlay').show();
    } else {
        $('#scene-overlay').hide();  
    }

    renderer.render(scene, camera);
}

$(document).on('keydown', (event) => {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = true;
            break;

        case 40: // down
        case 83: // s
            moveBackward = true;
            break;
    }
})

$(document).on('keyup', (event) => {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;

        case 40: // down
        case 83: // s
            moveBackward = false;
            break;
    }
})

$(window).resize(() => {
    renderer.setSize($('#scene').width(), $('#scene').height());
})

$(window).on('hashchange', () => {
    if (window.location.hash == '#home') {
        animate();
    }
})
