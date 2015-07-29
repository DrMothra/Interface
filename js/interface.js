/**
 * Created by DrTone on 29/07/2015.
 */
//Interface to 3D model


//Init this app from base
function Interface() {
    BaseApp.call(this);
}

Interface.prototype = new BaseApp();

Interface.prototype.init = function(container) {
    BaseApp.prototype.init.call(this, container);
};

Interface.prototype.createScene = function() {
    //Create scene
    BaseApp.prototype.createScene.call(this);

    //Load desired model
    this.modelLoader = new THREE.OBJMTLLoader();
    var _this = this;


    this.modelLoader.load( 'models/pumpkin.obj', '', function ( object ) {

        _this.scene.add( object );
        object.rotation.y = 1.25 * Math.PI;
        _this.loadedModel = object;

    } );
};

Interface.prototype.update = function() {
    BaseApp.prototype.update.call(this);
};

$(document).ready(function() {
    //Init app
    var container = document.getElementById("WebGL-output");
    var app = new Interface();
    app.init(container);
    app.createScene();

    //GUI callbacks

    app.run();
});