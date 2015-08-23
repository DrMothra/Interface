/**
 * Created by DrTone on 29/07/2015.
 */
//Interface to 3D model

var ROT_INC = Math.PI/32;
var MOVE_INC = 5;
var ROT_LEFT=0, ROT_RIGHT=1, ROT_UP=2, ROT_DOWN= 3, ZOOM_IN=4, ZOOM_OUT=5;
//Init this app from base
function Interface() {
    BaseApp.call(this);
}

Interface.prototype = new BaseApp();

Interface.prototype.init = function(container, gui) {
    this.xRot = 0;
    this.yRot = 0;
    this.zTrans = 0;
    this.checkTime = 100;
    this.rotating = false;
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

Interface.prototype.repeat = function(direction) {
    if(direction === undefined) {
        clearInterval(this.repeatTimer);
        return;
    }
    var _this = this;
    switch(direction) {
        case ROT_LEFT:
            _this.xRot = 0;
            _this.yRot = -ROT_INC;
            _this.rotating = true;
            break;

        case ROT_RIGHT:
            _this.xRot = 0;
            _this.yRot = ROT_INC;
            _this.rotating = true;
            break;

        case ROT_UP:
            _this.xRot = -ROT_INC;
            _this.yRot = 0;
            _this.rotating = true;
            break;

        case ROT_DOWN:
            _this.xRot = ROT_INC;
            _this.yRot = 0;
            _this.rotating = true;
            break;

        case ZOOM_IN:
            _this.zTrans = MOVE_INC;
            _this.rotating = false;
            break;

        case ZOOM_OUT:
            _this.zTrans = -MOVE_INC;
            _this.rotating = false;
            break;

        default:
            break;
    }
    this.repeatTimer = setInterval(function() {
        if(_this.rotating) {
            _this.loadedModel.rotation.x += _this.xRot;
            _this.loadedModel.rotation.y += _this.yRot;
        } else {
            _this.loadedModel.position.z += _this.zTrans;
        }

    }, this.checkTime);
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
                this.repeat(ROT_LEFT);
                break;
            case ROT_RIGHT:
                this.loadedModel.rotation.y += ROT_INC;
                this.repeat(ROT_RIGHT);
                break;
            case ROT_UP:
                this.loadedModel.rotation.x -= ROT_INC;
                this.repeat(ROT_UP);
                break;
            case ROT_DOWN:
                this.loadedModel.rotation.x += ROT_INC;
                this.repeat(ROT_DOWN);
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
                this.repeat(ZOOM_IN);
                break;
            case ZOOM_OUT:
                this.loadedModel.position.z -= MOVE_INC;
                this.repeat(ZOOM_OUT);
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
    $('#rotateLeft').on("mousedown", function() {
        app.rotateObject(ROT_LEFT);
    });
    $('#rotateRight').on("mousedown", function() {
        app.rotateObject(ROT_RIGHT);
    });
    $('#rotateUp').on("mousedown", function() {
        app.rotateObject(ROT_UP);
    });
    $('#rotateDown').on("mousedown", function() {
        app.rotateObject(ROT_DOWN);
    });
    $("[id^=rotate]").on("mouseup", function() {
        app.repeat();
    });

    $('#zoomOut').on("mousedown", function() {
        app.translateObject(ZOOM_OUT);
    });

    $('#zoomIn').on("mousedown", function() {
        app.translateObject(ZOOM_IN);
    });
    $("[id^=zoom]").on("mouseup", function() {
        app.repeat();
    });

    app.run();
});