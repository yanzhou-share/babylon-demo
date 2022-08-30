window.addEventListener('DOMContentLoaded', () => {
  var canvas = document.getElementById('renderCanvas');
  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  var scene;

  var camera;
  var cameraHeight = 5;
  var mousedownFloor = false

  //load babaylon or gltf
  BABYLON.SceneLoader.Load('', '45.glb', engine, function (newScene) {
    scene = newScene;

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //scene are ready
    scene.executeWhenReady(function () {
      //create free camera
      camera = new BABYLON.UniversalCamera('UniversalCamera', new BABYLON.Vector3(-1, 1, 1), scene);
      camera.rotation.y = -Math.PI / 2;
      camera.fov = 1.33;
      camera.speed = 0.5;
      // camera.useAutoRotationBehavior = true;


      // camera.inputs.addMouseWheel();
      // camera.setTarget(BABYLON.Vector3.Zero());

      scene.activeCamera = camera;
      scene.collisionsEnabled = true;
      scene.activeCamera.checkCollisions = true;
      scene.activeCamera.attachControl(canvas, true);

      //绑定键盘
      if (scene.activeCamera.keysUp) {
        scene.activeCamera.keysUp.push(90);
        scene.activeCamera.keysUp.push(87);
        scene.activeCamera.keysDown.push(83);
        scene.activeCamera.keysLeft.push(65);
        scene.activeCamera.keysLeft.push(81);
        scene.activeCamera.keysRight.push(69);
        scene.activeCamera.keysRight.push(68)
      }

      scene.meshes.forEach((mesh) => {
        // console.log("mesh: ", mesh.name)
        if(mesh.parent && mesh.parent.name == "wall"){
          console.log("Wall: ", mesh.name)
          mesh.checkCollisions = true;
        }
        if(mesh.name.includes("Floor")){
          console.log("Floor: ", mesh.name)
          // mesh.checkCollisions = true;
        }
        if(mesh.name.includes("Plan")){
          console.log("Plan: ", mesh.name)
          mesh.checkCollisions = true;
        }
        if(mesh.name.includes("Curtain")){
          console.log("Curtain: ", mesh.name)
          mesh.checkCollisions = true;
        }
        if(mesh.name.includes("TitleWall")){
          console.log("TitleWall: ", mesh.name)
          mesh.checkCollisions = true;
        }
        if(mesh.name.includes("VideoWall")){
          console.log("VideoWall: ", mesh.name)
          mesh.checkCollisions = true;
        }
        if(mesh.name.includes("Metals")){
          console.log("Metals: ", mesh.name)
          mesh.checkCollisions = true;
        }
        if(mesh.name.includes("Sofa")){
          mesh.checkCollisions = true;
        }
      });

      scene.collisionsEnabled = true
      camera.checkCollisions = true
      camera.ellipsoid = new BABYLON.Vector3(1, 1, 1)


      //初始化摇杆
      // _initJoy()

      let getChildRotation = function (child) { //return the rotation of a child of a parent object by using a temporary World Matrix
        var scale = new BABYLON.Vector3(0, 0, 0);
        var rotation = new BABYLON.Quaternion();
        var translation = new BABYLON.Vector3(0, 0, 0);

        var tempWorldMatrix = child.getWorldMatrix();
        tempWorldMatrix.decompose(scale, rotation, translation);
        var rot = rotation.toEulerAnglesToRef(rotation);
        return rot;
      };

      //绑定事件
      scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
          case BABYLON.PointerEventTypes.POINTERDOWN:
            pickInfo = pointerInfo.pickInfo;
            if (pickInfo.pickedMesh) {
              if (pickInfo.pickedMesh && pickInfo.pickedMesh.parent && pointerInfo.pickInfo.pickedMesh.parent.name == ("placeholder")) {//点击mesh 对焦相机
                let targetMesh = pickInfo.pickedMesh;
                let targetPos = targetMesh.getAbsolutePosition();
                var targetrot = getChildRotation(targetMesh);
                let rotationAngle = targetMesh.rotationQuaternion.toEulerAngles()
                let angle = -rotationAngle.y % (2 * Math.PI) - Math.PI
                let cameraMo = camera.rotation.y % (2 * Math.PI)
                console.log('rotationAngle:', rotationAngle)
                console.log('angle:', angle)
                console.log('cameraMo:', cameraMo)

                if (Math.abs(angle - cameraMo) > Math.PI && (angle - cameraMo) <= 0) {
                  cameraMo -= (2 * Math.PI)
                } else if (Math.abs(angle - cameraMo) > Math.PI && (angle - cameraMo) > 0){
                  cameraMo += (2 * Math.PI)
                }

                console.log('result cameraMo:', cameraMo)
                // if (Math.abs(rotationAngle.y.toFixed(2)) == Math.abs((Math.PI / 2).toFixed(2))) {
                //   BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'position.z', 30, 120, camera.position.z, targetPos.z, 0, ease, animEnd);
                // } else if(Math.abs(rotationAngle.y.toFixed(2)) == Math.abs((Math.PI * 2).toFixed(2)) || rotationAngle.y == 0) {
                //   BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'position.x', 30, 120, camera.position.x, targetPos.x, 0, ease, animEnd);
                // }

                var ease = new BABYLON.CubicEase();
                ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                // BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'position.z', 30, 120, camera.position.z, targetrot.z+3.6, 0, ease, animEnd);
                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation.y', 30, 120, cameraMo, angle, 0, ease);
              } else if (pickInfo.pickedMesh.name == 'Floor') {
                mousedownFloor = true
              }
            }

            if (pickInfo.pickedMesh && pickInfo.pickedMesh.parent && pointerInfo.pickInfo.pickedMesh.parent.name == ("placeholder")) {//placeholder
              let pickedMesh = (pointerInfo.pickInfo.pickedMesh)

              // console.log("============", pointerInfo.pickInfo.pickedPoint, pickedMesh.getAbsolutePosition())

              let materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
              materialPlane.diffuseTexture = new BABYLON.Texture("demo.png", scene)
              materialPlane.specularTexture = new BABYLON.Texture("demo.png", scene)
              materialPlane.emissiveTexture = new BABYLON.Texture("demo.png", scene)
              materialPlane.ambientTexture = new BABYLON.Texture("demo.png", scene)

              // pickedMesh.scaling = new BABYLON.Vector3(1, 1, 1)
              // materialPlane.diffuseTexture.uScale = 1.0
              // materialPlane.diffuseTexture.vScale = 1.0
              // materialPlane.fillMode = new BABYLON.Vector3(1, 1, 1);
              materialPlane.diffuseTexture.hasAlpha = true
              // materialPlane.backFaceCulling = true

              // pickedMesh.setEnabled(false)
              pickedMesh.visibility = 0


              if(pickedMesh.tiledPane){
                let selectPic = pickedMesh.tiledPane
              }else{
                let tiledPane = BABYLON.MeshBuilder.CreatePlane("tiledPane", {height: 0.5, width: 0.8, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);


                tiledPane.position.x = pickedMesh.getAbsolutePosition().x
                tiledPane.position.y = pickedMesh.getAbsolutePosition().y
                tiledPane.position.z = pickedMesh.getAbsolutePosition().z

                //
                //tiledPane.renderingGroupId = 2//

                // tiledPane.rotation.y = -Math.PI/2

                let rotationX =  pickedMesh.rotationQuaternion.toEulerAngles().x
                let rotationY =  pickedMesh.rotationQuaternion.toEulerAngles().y + Math.PI
                let rotationz =  pickedMesh.rotationQuaternion.toEulerAngles().z

                //console.log("========", rotationX, rotationY, rotationz)


                tiledPane.rotation.x = rotationX
                tiledPane.rotation.y = -rotationY
                tiledPane.rotation.z = rotationz

                //console.log("========", tiledPane.rotation.x, tiledPane.rotation.y, tiledPane.rotation.z)


                tiledPane.material = materialPlane

                pickedMesh.tiledPane = tiledPane

              }
            }

            break;
          case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
            break;
          case BABYLON.PointerEventTypes.POINTERUP:
            pickInfo = pointerInfo.pickInfo;
            if (pickInfo.pickedMesh) {
              //如果点击地板，则前进
              if (pickInfo.pickedMesh.name == 'Floor' && mousedownFloor) {
                let pointX = pointerInfo.pickInfo.pickedPoint._x,
                  pointY = pointerInfo.pickInfo.pickedPoint._y,
                  pointZ = pointerInfo.pickInfo.pickedPoint._z;

                  mousedownFloor = false

                var ease = new BABYLON.CubicEase();
                ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'position', 30, 120, camera.position, new BABYLON.Vector3(pointX, 1, pointZ), 0, ease, animEnd);
              }
            }
            break;
          case BABYLON.PointerEventTypes.POINTERMOVE:
            break;
        }
      });

      var animEnd = function () {

      };

      function _initJoy() {
        let leftJoyStick = new BABYLON.VirtualJoystick(true, {
          alwaysVisible: true,
          position: {x: 100, y: 500},
          // puckImage:"http://192.168.50.184:8000/Bake.jpg"
        });

        let rightJoyStick = new BABYLON.VirtualJoystick(false);

        let cameraPosition;
        // 每次摄像机移动的距离
        scene.onBeforeRenderObservable.add(() => {
          if (leftJoyStick.pressed) {
            //如果左边的被点击
            let moveX = leftJoyStick.deltaPosition.x * 0.01;
            let moveY = leftJoyStick.deltaPosition.y * 0.01;
            cameraPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(moveX, 0, moveY), BABYLON.Matrix.RotationY(scene.activeCamera.rotation.y));
            // 生成一个新的位置：以运动的2维矢量，在原来的点上面，也就是y轴的位置，以y轴为变化的就是跳一下了
            scene.activeCamera.cameraDirection.addInPlace(cameraPosition);

            // camera.cameraDirection=new BABYLON.Vector3(moveX,moveY,0)

            // 相机的变化方法：前后左右，一种就是整体重新set position的值，一种就是用矩阵的方式，也就是上面的操作
            // 感觉就是一种是按键，一种是给出值来操作。这里是滑块键决定方向，能知道的只有当前滑动的距离，我们要把「x,y」每次滑块告诉的数据，转化成3维坐标里面
          }

          if (rightJoyStick.pressed) {
            // 这个是镜头的旋转角度,按照常理来说这个是跟着鼠标的，按键控制前后左右，鼠标控制视野
            scene.activeCamera.cameraRotation.y += rightJoyStick.deltaPosition.x * 0.005;
            scene.activeCamera.cameraRotation.x += rightJoyStick.deltaPosition.y * 0.005;
            // sphere.position.y+=rightJoyStick.deltaPosition.y
          }
        });
      }

      //初始化占位
      function initPlaceholder(){
        scene.meshes.forEach((mesh) => {
          // console.log("mesh: ", mesh.name)
          if(mesh.parent.name == ("placeholder")){

          }
        });
      }

      engine.runRenderLoop(function () {
        scene.render();
      });
    });

    window.addEventListener('resize', function () {
      engine.resize();
    });
  });

  function setCollisions(item) {
    // item.checkCollisions
  }
});
