var AbstractMesh = BABYLON.AbstractMesh;

AbstractMesh.prototype.lookAt = function (targetPoint, yawCor, pitchCor, rollCor, space) {
            /// <summary>Orients a mesh towards a target point. Mesh must be drawn facing user.</summary>
            /// <param name="targetPoint" type="Vector3">The position (must be in same space as current mesh) to look at</param>
            /// <param name="yawCor" type="Number">optional yaw (y-axis) correction in radians</param>
            /// <param name="pitchCor" type="Number">optional pitch (x-axis) correction in radians</param>
            /// <param name="rollCor" type="Number">optional roll (z-axis) correction in radians</param>
            /// <returns>Mesh oriented towards targetMesh</returns>
            if (yawCor === void 0) { yawCor = 0; }
            if (pitchCor === void 0) { pitchCor = 0; }
            if (rollCor === void 0) { rollCor = 0; }
            if (space === void 0) { space = BABYLON.Space.LOCAL; }
            var dv = AbstractMesh._lookAtVectorCache;
            var pos = space === BABYLON.Space.LOCAL ? this.position : this.getAbsolutePosition();
            targetPoint.subtractToRef(pos, dv);
            var yaw = Math.atan2(dv.x, dv.z);
            var len = Math.sqrt(dv.x * dv.x + dv.z * dv.z);
            var pitch = Math.atan2(len, dv.y) - Math.PI*.5;
            this.rotationQuaternion = this.rotationQuaternion || new BABYLON.Quaternion();
            BABYLON.Quaternion.RotationYawPitchRollToRef(yaw + yawCor, pitch + pitchCor, rollCor, this.rotationQuaternion);
        };

var createScene = function () {

    var canvas = document.getElementById('renderCanvas');

    var engine = new BABYLON.Engine(canvas, true);

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
	
    var box = BABYLON.Mesh.CreateBox("box", 1, scene);
	
	var sphere = BABYLON.Mesh.CreateSphere("sphere", 16, .5, scene);
	
	var direction = BABYLON.Vector3.Zero();
	
	var radius = 3;
	
	var sphereParent = new BABYLON.Mesh('', scene);
	sphere.parent = sphereParent;
	sphere.position.x = radius;
	
	scene.registerBeforeRender(function () {
		
		box.lookAt(sphere.getAbsolutePosition());
		
		sphereParent.rotation.x += .01;
		sphereParent.rotation.y += .02;
		sphereParent.rotation.z += .03;
		
	});
	
	scene.debugLayer.shouldDisplayAxis = function (mesh) {
		if(mesh.name == 'box')
	    return true;
	}
	
	scene.debugLayer.axisRatio = .2;
	
	scene.debugLayer.show(false);

    engine.runRenderLoop(function(){
        scene.render();
    });
	

    return scene;

};

createScene()