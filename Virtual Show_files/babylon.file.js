window.addEventListener('DOMContentLoaded', () => {
  var divFps = document.getElementById("fps");
  var canvas = document.getElementById('renderCanvas');
  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  var scene;

  var camera
  var cameraHeight = 5
  var mousedownFloor = false
  let sceneId = "scene"
  var mouseDownFlag = false
  var mouseMove = false
  let selectExhibit = null
  let selectMesh = null

  //load babaylon or gltf
  BABYLON.SceneLoader.Load('', 'buygallery-no-Light-placeholder-rename.glb', engine, function (newScene) {
    scene = newScene;

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 2, 15), scene);
    var light2 = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0, 10, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    light2.intensity = 0.5;

    //scene are ready
    scene.executeWhenReady(function () {
      //create free camera
      camera = new BABYLON.UniversalCamera('UniversalCamera', new BABYLON.Vector3(-1, 1, 1), scene);
      window.camera = camera
      camera.rotation.y = -Math.PI / 2;
      camera.fov = 0.9
      camera.speed = 0.1;
      camera.minZ = 0.05
      // camera.fovMode = BABYLON.Camera.FOVMODE_HORIZONTAL_FIXED
      // camera.fovMode = BABYLON.Camera.FOVMODE_VERTICAL_FIXED
      // camera.useAutoRotationBehavior = true;
      // camera.applyGravity = true

      camera.onCollide = function(collidedMesh) {//碰撞回调事件
        // console.log(collidedMesh)
    }


      // camera.inputs.addMouseWheel();
      // camera.setTarget(BABYLON.Vector3.Zero());

      scene.activeCamera = camera;
      scene.collisionsEnabled = true;
      scene.activeCamera.checkCollisions = true;
      scene.activeCamera.attachControl(canvas, true);

      scene.collisionsEnabled = true
      camera.checkCollisions = true
      // camera.ellipsoid = new BABYLON.Vector3(1, 1, 1)
      camera.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);
      scene.gravity = new BABYLON.Vector3(0, -0.15, 0)
      camera.applyGravity = true;
      camera._needMoveForGravity = true


      // scene.registerBeforeRender(function () {
      //   if(camera.rotation.x>0  ){
      //     camera.rotation.x = 0;
      //   }else if(camera.rotation.x<0){
      //     camera.rotation.x = 0;
      //   }
      // })

      //绑定键盘
      if (scene.activeCamera.keysUp) {
        scene.activeCamera.keysUp.push(90)
        scene.activeCamera.keysUp.push(87)
        scene.activeCamera.keysDown.push(83)
        scene.activeCamera.keysLeft.push(65)
        scene.activeCamera.keysRight.push(68)
      }

      scene.meshes.forEach((mesh) => {
        // console.log("mesh: ", mesh.name)
        if(mesh.parent && mesh.parent.name == "collision"){
          console.log("collision: ", mesh.name)
          mesh.checkCollisions = true;
        }
        // if(mesh.name.includes("Floor")){
        if(mesh.parent && mesh.parent.name == "floor"){
          console.log("floor: ", mesh.name)
          mesh.checkCollisions = true;
        }
      });


      initPlaceholder()//渲染占位

      //初始化摇杆
      // if (isUserMobile()) _initJoy()

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
            mouseDownFlag = true
            mouseMove = false
            pickInfo = pointerInfo.pickInfo;
            if (pickInfo.pickedMesh) {
              if (pickInfo.pickedMesh && (pickInfo.pickedMesh.name.includes("exhibit_") || (pickInfo.pickedMesh.parent && pointerInfo.pickInfo.pickedMesh.parent.name == ("placeholder")))) {//点击mesh 对焦相机
                let targetMesh = pickInfo.pickedMesh;
                let targetPos = targetMesh.getAbsolutePosition();
                var targetrot = getChildRotation(targetMesh);
                let rotationAngle = pickInfo.pickedMesh.name.includes("exhibit_") ? targetMesh.rotation.clone() : targetMesh.rotationQuaternion.toEulerAngles()
                if(pickInfo.pickedMesh.name.includes("exhibit_")){
                  rotationAngle.y = -rotationAngle.y - Math.PI
                }
                let angle = -rotationAngle.y % (2 * Math.PI) - Math.PI
                let cameraMo = camera.rotation.y % (2 * Math.PI)

                if (Math.abs(angle - cameraMo) > Math.PI && (angle - cameraMo) <= 0) {
                  cameraMo -= (2 * Math.PI)
                } else if (Math.abs(angle - cameraMo) > Math.PI && (angle - cameraMo) > 0){
                  cameraMo += (2 * Math.PI)
                }

                console.log('result cameraMo:', cameraMo)

                let _x, _z
                let distance = 2
                if(pickInfo.pickedMesh.parent && pickInfo.pickedMesh.parent.name == ("placeholder")){
                  distance = distance - 0.25
                }
                _x = targetPos.x - distance * Math.sin(rotationAngle.y)
                _z = targetPos.z + distance * Math.cos(rotationAngle.y)


                let _pos = {_x: _x, _y: targetPos.y - 0.25, _z: _z}


                var ease = new BABYLON.CubicEase();
                ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation.x', 30, 50, camera.rotation.x, 0, 0, ease);
                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation.z', 30, 50, camera.rotation.z, 0, 0, ease);
                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation.y', 30, 50, cameraMo, angle, 0, ease);
                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'position', 30, 50, camera.position, _pos, 0, ease, ()=>{
                  if(!pickInfo.pickedMesh.name.includes("exhibit_")){
                    animEnd(pickInfo.pickedMesh)
                  }
                });
                // camera.rotation.x =0
                // camera.rotation.z =0

              } else if (pickInfo.pickedMesh.parent.name == 'floor') {
                mousedownFloor = true
              }
            }

            // if (pickInfo.pickedMesh && pickInfo.pickedMesh.parent && pointerInfo.pickInfo.pickedMesh.parent.name == ("placeholder")) {//placeholder
            //   let pickedMesh = (pointerInfo.pickInfo.pickedMesh)
            //   insertPic(pickedMesh)
            //   // console.log("============", pointerInfo.pickInfo.pickedPoint, pickedMesh.getAbsolutePosition())
            // }

            break;
          case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
            console.log(camera.getTarget())
            console.log(camera.getFrontPosition(1))
            break;
          case BABYLON.PointerEventTypes.POINTERUP:
            if (mouseMove && mouseDownFlag) {
              mouseMove = false
              mouseDownFlag = false
              return
            }
            pickInfo = pointerInfo.pickInfo;
            if (pickInfo.pickedMesh) {
              // //如果点击地板，则前进
              // if (pickInfo.pickedMesh.parent.name == 'floor' && mousedownFloor) {
              //   let pointX = pointerInfo.pickInfo.pickedPoint._x,
              //     pointY = pointerInfo.pickInfo.pickedPoint._y,
              //     pointZ = pointerInfo.pickInfo.pickedPoint._z;

              //     mousedownFloor = false

              //   var ease = new BABYLON.CubicEase();
              //   ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
              //   BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'position', 30, 120, camera.position, new BABYLON.Vector3(pointX, 1, pointZ), 0, ease, animEnd);
              //   BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation.x', 30, 50, camera.rotation.x, 0, 0, ease);
              //   BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation.z', 30, 50, camera.rotation.z, 0, 0, ease);
              //   // camera.rotation.x =0
              //   // camera.rotation.z =0
              // }

              //如果点击地板，则前进
              if (pickInfo.pickedMesh.parent.name == 'floor' && mousedownFloor) {
                let pointX = pointerInfo.pickInfo.pickedPoint._x,
                  // pointY = pointerInfo.pickInfo.pickedPoint._y,
                  pointY = camera.position.y,
                  pointZ = pointerInfo.pickInfo.pickedPoint._z;

                  mousedownFloor = false;

                var camEndPos;
                var targetEndPos;
                var speed = 45;
                var frameCount = 200;
                var ease = new BABYLON.CubicEase();
                ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

                var setCamLateralLeft = function() {
                    camEndPos = new BABYLON.Vector3(pointX, pointY, pointZ);
                    targetEndPos = new BABYLON.Vector3(pointX, pointY, pointZ);
                    BABYLON.Animation.CreateAndStartAnimation('at1', camera, 'position', speed, frameCount, camera.position, camEndPos, 0, ease);
                    BABYLON.Animation.CreateAndStartAnimation('at2', camera, 'target', speed, frameCount - 100, camera.target, targetEndPos, 0, ease);
                };
                
                setCamLateralLeft();
              }
            }
            break;
          case BABYLON.PointerEventTypes.POINTERMOVE:
            if(mouseDownFlag) mouseMove = true
            break;
          case BABYLON.PointerEventTypes.POINTERWHEEL:
            // console.log("POINTER WHEEL");
            if (pointerInfo.event.wheelDelta) {
              if (pointerInfo.event.wheelDelta > 0) { //当鼠标滚轮向上滚动时
                zoomInPic()
              }
              if (pointerInfo.event.wheelDelta < 0) { //当鼠标滚轮向下滚动时
                zoomOutPic()
              }
            } else if (e.detail) {
              if (pointerInfo.event.detail < 0) { //当鼠标滚轮向上滚动时
                zoomInPic()
              }
              if (pointerInfo.event.detail > 0) { //当鼠标滚轮向下滚动时
                zoomOutPic()
              }
            }
            break;
          case BABYLON.PointerEventTypes.POINTERPICK:
            break;
        }
      });

      let animEnd = function (pickedMesh) {
        if(pickedMesh){
          setTimeout(()=>{
            insertPic(pickedMesh)//插入图片
          }, 1)
        }
      };

      function _initJoy() {
        var height = document.body.offsetHeight, width = document.body.offsetWidth

        let leftJoyStick = new BABYLON.VirtualJoystick(true, {
          containerSize: 100,
          alwaysVisible: false,
          position: {x: width / 2 - 50, y: height - 250},
          limitToContainer: true,
          reverseLeftRight: true,
          reverseUpDown: true
          // puckImage:"http://192.168.50.184:8000/Bake.jpg"
        });

        // let rightJoyStick = new BABYLON.VirtualJoystick(false);

        let cameraPosition;
        // 每次摄像机移动的距离
        scene.onBeforeRenderObservable.add(() => {
          if (leftJoyStick.pressed) {
            //如果左边的被点击
            // let moveX = leftJoyStick.deltaPosition.x * 0.01;
            // let moveY = leftJoyStick.deltaPosition.y * 0.01;
            // cameraPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(moveX, 0, moveY), BABYLON.Matrix.RotationY(scene.activeCamera.rotation.y));
            // 生成一个新的位置：以运动的2维矢量，在原来的点上面，也就是y轴的位置，以y轴为变化的就是跳一下了
            // scene.activeCamera.cameraDirection.addInPlace(cameraPosition);
            // camera.rotation.y += moveY

            let moveSpeed = 0.01

            let x = leftJoyStick.deltaPosition.x,
                y = leftJoyStick.deltaPosition.y

            if ((x >= -1 && x <=1 && y == 1) || (y == -1 && x >= -1 && x <=1)) {
              //前进
              let moveX = leftJoyStick.deltaPosition.x * 0.005;
              let moveY = leftJoyStick.deltaPosition.y * 0.005;
              cameraPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(moveX, 0, moveY), BABYLON.Matrix.RotationY(scene.activeCamera.rotation.y));
              scene.activeCamera.cameraDirection.addInPlace(cameraPosition);
              // camera.position.x -= Math.abs(x) * moveSpeed
              // camera.position.z -= Math.abs(y) * moveSpeed
            } else if (x == 1 && y >= -1 && y <= 1) {
              //右旋转
              console.log('右旋转')
              camera.rotation.y += moveSpeed
            } else if (x == -1 && y >= -1 && y <= 1) {
              console.log('左旋转')
              camera.rotation.y -= moveSpeed
            }
          }

          // if (rightJoyStick.pressed) {
          //   scene.activeCamera.cameraRotation.y += rightJoyStick.deltaPosition.x * 0.005;
          //   scene.activeCamera.cameraRotation.x += rightJoyStick.deltaPosition.y * 0.005;
          //   // sphere.position.y+=rightJoyStick.deltaPosition.y
          // }
        });
      }

      //初始化占位
      function initPlaceholder(){
        scene.meshes.forEach((mesh) => {
          // console.log("mesh: ", mesh.name)
          if(mesh.parent && mesh.parent.name == ("placeholder")){
            // console.log("uniqueId============", mesh.uniqueId)
            let materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
            materialPlane.diffuseTexture = new BABYLON.Texture("placeholder.jpg", scene)
            materialPlane.specularTexture = new BABYLON.Texture("placeholder.jpg", scene)
            materialPlane.emissiveTexture = new BABYLON.Texture("placeholder.jpg", scene)
            materialPlane.ambientTexture = new BABYLON.Texture("placeholder.jpg", scene)

            materialPlane.diffuseTexture.hasAlpha = true
            mesh.visibility = 0

            let tiledPane = BABYLON.MeshBuilder.CreatePlane("placeholder", {height: 0.5, width: 0.5, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene)
            let rotationAngle = mesh.rotationQuaternion.toEulerAngles()

            tiledPane.position.x = mesh.getAbsolutePosition().x + 0.25 * Math.sin(rotationAngle.y)
            tiledPane.position.y = mesh.getAbsolutePosition().y
            tiledPane.position.z = mesh.getAbsolutePosition().z - 0.25 * Math.cos(rotationAngle.y)

            let rotationX =  mesh.rotationQuaternion.toEulerAngles().x
            let rotationY =  mesh.rotationQuaternion.toEulerAngles().y + Math.PI
            let rotationz =  mesh.rotationQuaternion.toEulerAngles().z

            //console.log("========", rotationX, rotationY, rotationz)


            tiledPane.rotation.x = rotationX
            tiledPane.rotation.y = -rotationY
            tiledPane.rotation.z = rotationz

            //console.log("========", tiledPane.rotation.x, tiledPane.rotation.y, tiledPane.rotation.z)

            tiledPane.material = materialPlane

            mesh.placeholder = tiledPane

          }
        });
      }

      function randomRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      function insertPic(pickedMesh){
        let imgSrc = ""
        let width = 0
        let height = 0
        let baseValue = 0.001
        if(pickedMesh.rotationQuaternion.toEulerAngles().y/Math.PI == 0){
          imgSrc = "placeholder_500*1000.jpg";
          width = baseValue * 500
          height = baseValue * 1000
        }else if((pickedMesh.rotationQuaternion.toEulerAngles().y/Math.PI).toFixed(1) == 1){
          imgSrc = "placeholder_1000*500.jpg";
          width = baseValue * 1000
          height = baseValue * 500
        }else if((pickedMesh.rotationQuaternion.toEulerAngles().y/Math.PI).toFixed(1) == -0.5){
          imgSrc = "placeholder_2000*2000.jpg"
          width = baseValue * 2000
          height = baseValue * 2000
        }else{
          imgSrc = "placeholder_2000*2000.jpg"
          width = baseValue * 2000
          height = baseValue * 2000
        }

        let materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
        materialPlane.diffuseTexture = new BABYLON.Texture(imgSrc, scene)
        materialPlane.specularTexture = new BABYLON.Texture(imgSrc, scene)
        materialPlane.emissiveTexture = new BABYLON.Texture(imgSrc, scene)
        materialPlane.ambientTexture = new BABYLON.Texture(imgSrc, scene)


        materialPlane.diffuseTexture.hasAlpha = true

        // pickedMesh.setEnabled(false)

        let tiledPane = BABYLON.MeshBuilder.CreatePlane("exhibit_" + randomRange(1,1000), {width: width, height: height, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);

        let rotationAngle = pickedMesh.rotationQuaternion.toEulerAngles()

        tiledPane.position.x = pickedMesh.getAbsolutePosition().x + 0.25 * Math.sin(rotationAngle.y) //pickedMesh.getAbsolutePosition().x
        tiledPane.position.y = pickedMesh.getAbsolutePosition().y
        tiledPane.position.z = pickedMesh.getAbsolutePosition().z - 0.25 * Math.cos(rotationAngle.y)//pickedMesh.getAbsolutePosition().z



        let rotationX =  pickedMesh.rotationQuaternion.toEulerAngles().x
        let rotationY =  pickedMesh.rotationQuaternion.toEulerAngles().y + Math.PI
        let rotationz =  pickedMesh.rotationQuaternion.toEulerAngles().z


        tiledPane.rotation.x = rotationX
        tiledPane.rotation.y = -rotationY
        tiledPane.rotation.z = rotationz

        if(pickedMesh.placeholder){
          pickedMesh.placeholder.visibility = 0
          tiledPane.material = materialPlane
          pickedMesh.placeholder.tiledPane = tiledPane
          selectMesh = pickedMesh
          let exhibitData = {}
          exhibitData.id = sceneId + "_" + pickedMesh.uniqueId
          exhibitData.rotation = {x: tiledPane.rotation.x, y: tiledPane.rotation.y, z: tiledPane.rotation.z}
          exhibitData.position = {x: tiledPane.position.x, y: tiledPane.position.y, z: tiledPane.position.z}
          exhibitData.TextureData = {src: imgSrc, width: width, height: height}
          console.log("exhibitData=========", exhibitData)
        }

        // if(pickedMesh.tiledPane){
        //   pickedMesh.tiledPane.material = materialPlane
        // }


        // if(pickedMesh.tiledPane){
        //   let selectPic = pickedMesh.tiledPane
        // }else{
        //   let tiledPane = BABYLON.MeshBuilder.CreatePlane("tiledPane", {height: 0.5, width: 0.8, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        //
        //
        //   tiledPane.position.x = pickedMesh.getAbsolutePosition().x
        //   tiledPane.position.y = pickedMesh.getAbsolutePosition().y
        //   tiledPane.position.z = pickedMesh.getAbsolutePosition().z
        //
        //   //
        //   //tiledPane.renderingGroupId = 2//
        //
        //   // tiledPane.rotation.y = -Math.PI/2
        //
        //   let rotationX =  pickedMesh.rotationQuaternion.toEulerAngles().x
        //   let rotationY =  pickedMesh.rotationQuaternion.toEulerAngles().y + Math.PI
        //   let rotationz =  pickedMesh.rotationQuaternion.toEulerAngles().z
        //
        //   //console.log("========", rotationX, rotationY, rotationz)
        //
        //
        //   tiledPane.rotation.x = rotationX
        //   tiledPane.rotation.y = -rotationY
        //   tiledPane.rotation.z = rotationz
        //
        //   //console.log("========", tiledPane.rotation.x, tiledPane.rotation.y, tiledPane.rotation.z)
        //
        //
        //   tiledPane.material = materialPlane
        //
        //   pickedMesh.tiledPane = tiledPane
        // }
      }

      function zoomInPic(){
        if(selectMesh){
          let tiledPane = selectMesh.placeholder.tiledPane
          let scalingX  = tiledPane.scaling.x < 5 ? tiledPane.scaling.x + 0.1 : 5
          let scalingY = tiledPane.scaling.y < 5 ? tiledPane.scaling.y + 0.1 : 5
          tiledPane.scaling = new BABYLON.Vector3(scalingX, scalingY, tiledPane.scaling.z)
        }
      }

      function zoomOutPic(){
        if(selectMesh){
          let tiledPane = selectMesh.placeholder.tiledPane
          let scalingX  = tiledPane.scaling.x > 0.1 ? tiledPane.scaling.x - 0.1 : 0.1
          let scalingY = tiledPane.scaling.y > 0.1 ? tiledPane.scaling.y - 0.1 : 0.1
          tiledPane.scaling = new BABYLON.Vector3(scalingX, scalingY, tiledPane.scaling.z)
        }
      }


      scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
          case BABYLON.KeyboardEventTypes.KEYDOWN:
            //console.log("KEY DOWN: ", kbInfo.event.key);
            break;
          case BABYLON.KeyboardEventTypes.KEYUP:
            //console.log("KEY UP: ", kbInfo.event.keyCode, kbInfo.event.key)
            if(selectMesh && kbInfo.event.key == "Backspace"){
              let tiledPane = selectMesh.placeholder.tiledPane
              let placeholder = selectMesh.placeholder
              tiledPane.visibility = 0
              placeholder.visibility = 1
            }
            break;
        }
      });

      engine.runRenderLoop(function () {
        scene.render();
        divFps.innerHTML = engine.getFps()
          .toFixed() + " fps";
      });
    });

    window.addEventListener('resize', function () {
      engine.resize();
    });
  });

  function setCollisions(item) {
    // item.checkCollisions
  }

  function isUserMobile() {
    const ua = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipod|phone|ipad/i.test(ua);
  }
});
