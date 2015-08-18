/**
 * Created by DrTone on 29/07/2015.
 */
//Interface to 3D model

var ROT_INC = Math.PI/32;
var MOVE_INC = 5;
var ROT_LEFT=0, ROT_RIGHT=1, ROT_UP=2, ROT_DOWN=3;
var ZOOM_IN=0, ZOOM_OUT=1;
//Init this app from base
function Interface() {
    BaseApp.call(this);
}

Interface.prototype = new BaseApp();

Interface.prototype.init = function(container, gui) {
    BaseApp.prototype.init.call(this, container, gui);
};

Interface.prototype.createScene = function() {
    //Create scene
    BaseApp.prototype.createScene.call(this);

    //Load desired model
    this.modelLoader = new THREE.OBJMTLLoader();
    this.loadedModel = null;
    var _this = this;


    this.modelLoader.load( 'models/helmet.obj', 'models/helmet.mtl', function ( object ) {

        _this.scene.add( object );
        _this.model = object;
        object.position.set(0, 0, 0);
        _this.loadedModel = object;

    } );
};

Interface.prototype.update = function() {
    BaseApp.prototype.update.call(this);
};

/*
Interface.prototype.buttonRepeat = function() {
    if(!this.loadedModel) return;

    switch(this.rotateDirection) {
        case ROT_LEFT:
            this.loadedModel.rotation.y -= ROT_INC;
            break;

        case ROT_RIGHT:
            this.loadedModel.rotation.y += ROT_INC;
            break;

        case ROT_UP:
            this.loadedModel.rotation.x -= ROT_INC;
            break;

        case ROT_DOWN:
            this.loadedModel.rotation.x += ROT_INC;
            break;

        default:
            break;
    }
};
*/

Interface.prototype.rotateObject = function(direction) {
    if(this.loadedModel) {
        this.rotateDirection = direction;
        switch(direction) {
            case ROT_LEFT:
                this.loadedModel.rotation.y -= ROT_INC;
                break;
            case ROT_RIGHT:
                this.loadedModel.rotation.y += ROT_INC;
                break;
            case ROT_UP:
                this.loadedModel.rotation.x -= ROT_INC;
                break;
            case ROT_DOWN:
                this.loadedModel.rotation.x += ROT_INC;
                break;
            default:
                break;
        }


    }
};

Interface.prototype.translateObject = function(direction) {
    if(this.loadedModel) {
        switch(direction) {
            case ZOOM_IN:
                this.loadedModel.position.z += MOVE_INC;
                break;
            case ZOOM_OUT:
                this.loadedModel.position.z -= MOVE_INC;
                break;
            default:
                break;
        }
    }
};

$(document).ready(function() {
    //Init app
    var container = document.getElementById("WebGL-output");
    var gui = document.getElementById("buttonControls");
    var app = new Interface();
    app.init(container, gui);
    app.createScene();

    //GUI callbacks

    $('#rotateLeft').on("click", function() {
        app.rotateObject(ROT_LEFT);
    });

    $('#rotateRight').on("click", function() {
        app.rotateObject(ROT_RIGHT);
    });

    $('#rotateUp').on("click", function() {
        app.rotateObject(ROT_UP);
    });

    $('#rotateDown').on("click", function() {
        app.rotateObject(ROT_DOWN);
    });

    $('#zoomOut').on("click", function() {
        app.translateObject(ZOOM_OUT);
    });

    $('#zoomIn').on("click", function() {
        app.translateObject(ZOOM_IN);
    });

    app.run();
});