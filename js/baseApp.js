/**
 * Created by atg on 14/05/2014.
 */
//Common baseline for visualisation app

function BaseApp() {
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.stats = null;
    this.container = null;
    this.raycaster = null;
    this.objectList = [];
    this.root = null;
    this.mouse = { startX:0, startY:0};
    this.pickedObjects = [];
    this.selectedObject = null;
    this.hoverObjects = [];
    this.startTime = 0;
    this.elapsedTime = 0;
    this.clock = new THREE.Clock();
    this.clock.start();
    this.objectsPicked = false;
}

BaseApp.prototype.init = function(container, guiContainer) {
    this.container = container;
    this.guiContainer = guiContainer;
    console.log("BaseApp container =", container);
    this.createRenderer();
    console.log("BaseApp renderer =", this.renderer);
    this.createCamera();
    this.raycaster = new THREE.Raycaster();
    //this.stats = initStats();
    this.statsShowing = true;

};

BaseApp.prototype.createRenderer = function() {
    this.renderer = new THREE.WebGLRenderer( {antialias : true});
    this.renderer.setClearColor(0x474747, 1.0);
    this.renderer.shadowMapEnabled = true;
    var isMSIE = /*@cc_on!@*/0;

    var width = this.container.clientWidth;
    if (isMSIE) {
        // do IE-specific things
        width = window.innerWidth;
    }
    this.renderer.setSize(width, window.innerHeight);
    this.container.appendChild( this.renderer.domElement );
    var _this = this;

    window.addEventListener('keydown', function(event) {
        _this.keydown(event);
    }, false);

    window.addEventListener('resize', function(event) {
        _this.windowResize(event);
    }, false);
};

BaseApp.prototype.buttonRepeat = function() {

};

BaseApp.prototype.keydown = function(event) {
    //Key press functionality
    switch(event.keyCode) {
        case 83: //'S'
            if (this.stats) {
                if (this.statsShowing) {
                    $("#Stats-output").hide();
                    this.statsShowing = false;
                } else {
                    $("#Stats-output").show();
                    this.statsShowing = true;
                }
            }
            break;
        case 80: //'P'
            console.log('Cam =', this.camera.position);
            console.log('Look =', this.controls.getLookAt());
    }
};

BaseApp.prototype.mouseClicked = function(event) {
    //Update mouse state
    this.pickedObjects.length = 0;

    if(event.type == 'mouseup') {
        this.mouse.endX = event.clientX;
        this.mouse.endY = event.clientY;
        this.mouse.down = false;
        this.objectsPicked = false;
        return;
    }

    this.mouse.startX = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.startY = (event.clientY / window.innerHeight) * 2 + 1;
    this.mouse.down = true;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    this.pickedObjects = this.raycaster.intersectObjects(this.scene.children, true);
};

BaseApp.prototype.windowResize = function(event) {
    //Handle window resize
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( this.container.clientWidth, window.innerHeight);
    //console.log('Size =', )
};

BaseApp.prototype.createScene = function() {
    this.scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0x000000);
    this.scene.add(ambientLight);

    /*
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-1000, 100, 5000);
    spotLight.intensity = 1;
    this.scene.add(spotLight);
    */


    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
    directionalLight.position.set( 1, 1, 1 );
    this.scene.add( directionalLight );

    /*
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(200,200,200);
    pointLight.name = 'PointLight';
    this.scene.add(pointLight);
    */
};

BaseApp.prototype.createCamera = function() {

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000 );
    this.camera.position.set(0, 0, 40 );

    console.log('dom =', this.renderer.domElement);
};

BaseApp.prototype.update = function() {
    //Do any updates

};

BaseApp.prototype.run = function() {
    this.renderer.render( this.scene, this.camera );
    var self = this;
    this.update();
    if(this.stats) this.stats.update();
    requestAnimationFrame(function() {
        self.run();
    });
};

function initStats() {

    var stats = new Stats();

    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    $("#Stats-output").append( stats.domElement );

    return stats;
}