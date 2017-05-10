var table = [
	"KB", "Kyle Brown", "http://kylebrownstudio.com/", 1, 1,
	"LM", "Laura Mun", "http://lauramun.me", 2, 1,
	"ET", "Elliot Tanha", "mailto:morgueresident@gmail.com", 3, 1,
	"AS", "Amy Samudio", "mailto:amy.samudiob@gmail.com", 4, 1,
	"DN", "David Neves", "mailto:solorogue99@gmail.com", 5, 1,
	"JP", "Jessie Pang", "mailto:jessiepang73@gmail.com", 1, 2,
	"GS", "Gayatri Sehgal", "mailto:gayatri.sehgal@stonybrook.edu", 2, 2,
	"CM", "Christopher D Munoz", "http://crystalzenaida.com", 3, 2,
	"DS", "Denise Sahin", "mailto: denisemarie.sahin@gmail.com", 4, 2,
	"JV", "Jeanmarie Vargas", "http://jeanmarievargas.com", 5, 2,
	"JR", "Joseph Renna", "http://www.renna.studio", 1, 3,
	"JH", "Jenifer Holden", "http://www.jenholdenstudio.com", 2, 3,
	"KL", "Kunlang Li", "mailto:kunlangli@gmail.com", 3, 3,
	"RT", "Ranzi Tian", "mailto:ranzi.tian@hotmail.com", 4, 3,
	"SW", "Suellen Wang", "mailto:suellentic@gmail.com", 5, 3,
	"HT", "Hugo Tam", "mailto:hugotam2004@gmail.com", 1, 4,
	"YK", "Yuki (Yik Kiu) Fong", "mailto:yukifong410@gmail.com", 2, 4,
	"SP", "Sean Patrick ", "http://www.seanpatrick.nyc/", 3, 4,
	"SC", "Samantha Combs", "mailto:samcombsart@gmail.com", 4, 4,
	"GZ", "Gaoqi Zheng", "mailto:zgqqi@126.com", 5, 4,
	"AB", "Angela Bair", "http://www.angelabair.com/", 1, 5,
	"LJ", "Libo Jiang", "mailto:jianglibo1995@gmail.com", 2, 5,
	"JTG", "Jesse Talavera-Greenberg", "https://jessetg.github.io/", 3, 5,
	"MC", "Michael Castro", "mailto:Michael.Castro@stonybrook.edu", 4, 5,
    "FC", "Flannery Cunningham", "http://flannerycunningham.com", 5, 5,
];

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 3000;

	scene = new THREE.Scene();

	// table

	for ( var i = 0; i < table.length; i += 5 ) {

		var contact = document.createElement( 'a' );
		contact.setAttribute( 'href', table [i + 2] );
		contact.setAttribute( 'target', '_blank' );

		var element = document.createElement( 'div' );
		element.className = 'element';
		element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
		contact.appendChild( element );

		var symbol = document.createElement( 'div' );
		symbol.className = 'symbol';
		symbol.textContent = table[ i ];
		element.appendChild( symbol );

		var details = document.createElement( 'div' );
		details.className = 'details';
		details.innerHTML = table[ i + 1 ];
		element.appendChild( details );

		var object = new THREE.CSS3DObject( contact );
		object.position.x = Math.random() * 4000 - 2000;
		object.position.y = Math.random() * 4000 - 2000;
		object.position.z = Math.random() * 4000 - 2000;
		scene.add( object );

		objects.push( object );

		//

		var object = new THREE.Object3D();
		object.position.x = ( table[ i + 3 ] * 240 ) - 700;
		object.position.y = - ( table[ i + 4 ] * 280 ) + 890;

		targets.table.push( object );

	}

	// sphere

	var vector = new THREE.Vector3();

	for ( var i = 0, l = objects.length; i < l; i ++ ) {

		var phi = Math.acos( -1 + ( 2 * i ) / l );
		var theta = Math.sqrt( l * Math.PI ) * phi;

		var object = new THREE.Object3D();

		object.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
		object.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
		object.position.z = 800 * Math.cos( phi );

		vector.copy( object.position ).multiplyScalar( 2 );

		object.lookAt( vector );

		targets.sphere.push( object );

	}

	// helix

	var vector = new THREE.Vector3();

	for ( var i = 0, l = objects.length; i < l; i ++ ) {

		var phi = i * 0.175 + Math.PI;

		var object = new THREE.Object3D();

		object.position.x = 900 * Math.sin( phi );
		object.position.y = - ( i * 8 ) + 450;
		object.position.z = 900 * Math.cos( phi );

		vector.x = object.position.x * 2;
		vector.y = object.position.y;
		vector.z = object.position.z * 2;

		object.lookAt( vector );

		targets.helix.push( object );

	}

	// grid

	for ( var i = 0; i < objects.length; i ++ ) {

		var object = new THREE.Object3D();

		object.position.x = ( ( i % 5 ) * 400 ) - 800;
		object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
		object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

		targets.grid.push( object );

	}

	//

	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute';
	document.getElementById( 'container' ).appendChild( renderer.domElement );

	//

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed = 0.5;
	controls.minDistance = 500;
	controls.maxDistance = 6000;
	controls.addEventListener( 'change', render );

	var button = document.getElementById( 'table' );
	button.addEventListener( 'click', function ( event ) {

		transform( targets.table, 2000 );

	}, false );

	var button = document.getElementById( 'sphere' );
	button.addEventListener( 'click', function ( event ) {

		transform( targets.sphere, 2000 );

	}, false );

	var button = document.getElementById( 'helix' );
	button.addEventListener( 'click', function ( event ) {

		transform( targets.helix, 2000 );

	}, false );

	var button = document.getElementById( 'grid' );
	button.addEventListener( 'click', function ( event ) {

		transform( targets.grid, 2000 );

	}, false );

	transform( targets.table, 2000 );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function transform( targets, duration ) {

	TWEEN.removeAll();

	for ( var i = 0; i < objects.length; i ++ ) {

		var object = objects[ i ];
		var target = targets[ i ];

		new TWEEN.Tween( object.position )
			.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

		new TWEEN.Tween( object.rotation )
			.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

	}

	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( render )
		.start();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function animate() {

	requestAnimationFrame( animate );

	TWEEN.update();

	controls.update();

}

function render() {

	renderer.render( scene, camera );

}