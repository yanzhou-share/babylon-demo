window.addEventListener('DOMContentLoaded', ()=> {
    var canvas = document.getElementById('renderCanvas');
    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    var scene

    var camera
    var cameraHeight = 5

    //load babaylon or gltf
    BABYLON.SceneLoader.Load("", "art_gallery_demo_no_texture_no_skybox.glb", engine, function(newScene) {
        scene = newScene

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        let Wall = scene.getMeshByName('Wall');
        Wall.checkCollisions = true

        //scene are ready
        scene.executeWhenReady(function(){
            //create free camera
            camera = new BABYLON.FreeCamera("FreeCam", new BABYLON.Vector3(-1 , 1, 1), scene, true);
            camera.rotation.y = -Math.PI / 2
            camera.fov = 1.33
            camera.speed = 0.5
            // camera.useAutoRotationBehavior = true;

            // camera.inputs.addMouseWheel();
            // camera.setTarget(BABYLON.Vector3.Zero());

            scene.activeCamera = camera
            scene.collisionsEnabled = true;
            scene.activeCamera.checkCollisions = true;
            scene.activeCamera.attachControl(canvas, true);

            //初始化摇杆
            // _initJoy()

            let getChildRotation = function(child){ //return the rotation of a child of a parent object by using a temporary World Matrix
                var scale = new BABYLON.Vector3(0, 0, 0);
                var rotation = new BABYLON.Quaternion();
                var translation = new BABYLON.Vector3(0,0,0);

                var tempWorldMatrix = child.getWorldMatrix();
                tempWorldMatrix.decompose(scale, rotation, translation);
                var rot = rotation.toEulerAnglesToRef(rotation)
                return rot;
            }

            //绑定事件
            scene.onPointerObservable.add((pointerInfo) => {
                switch (pointerInfo.type) {
                    case BABYLON.PointerEventTypes.POINTERDOWN:
                        pickInfo = pointerInfo.pickInfo
                        if (pickInfo.pickedMesh) {
                            //如果点击地板，则前进
                            if (pickInfo.pickedMesh.name && pickInfo.pickedMesh.name != 'Wall' && pickInfo.pickedMesh.name != 'Floor') {//点击mesh 对焦相机
                                // let targetMesh = pickInfo.pickedMesh
                                // let targetPos = targetMesh.getAbsolutePosition();
                                // var CoT = new BABYLON.TransformNode("renderCanvas"); 
                                // camera.lockedTarget = CoT

                                // var whereto = new BABYLON.Vector3(
                                //     pickInfo.pickedPoint.x,
                                //     pickInfo.pickedPoint.y,
                                //     pickInfo.pickedPoint.z - 30);//minus 10 to get infront of the mesh
                        
                                // var wheretoTwo = new BABYLON.Vector3(
                                //     pickInfo.pickedPoint.x,
                                //     pickInfo.pickedPoint.y,
                                //     pickInfo.pickedPoint.z);//minus 10 to get infront of the mesh

                                // camera.setTarget(targetPos);

                                // var easingFunction = new BABYLON.BackEase(.0);
                                // easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);

                                // var animTwo = BABYLON.Animation.CreateAndStartAnimation("anim", CoT, "position", 300, 100, CoT.position, wheretoTwo, 2, easingFunction);
                                // var anim = BABYLON.Animation.CreateAndStartAnimation("anim", camera, "position", 30, 100, camera.position, whereto, 2, easingFunction);

                                let targetMesh = pickInfo.pickedMesh

                                console.log(targetMesh.rotationQuaternion.toEulerAngles())
                                // camera.lockedTarget = targetMesh
                                // return

                                // scene.activeCamera.detachControl(canvas);
                                // targetMesh.setEnabled(false);

                                let targetPos = targetMesh.getAbsolutePosition();
                                console.log('元素绝对位置:', targetPos)
                                var targetrot = getChildRotation(targetMesh);
                                console.log('元素旋转位置:', targetrot)
                                targetrot.x = 0;
                                targetrot.y = targetrot.y 
                                targetrot.z = 0;
                                
                                var ang1 = camera.rotation.y;
                                var ang2 = targetrot.y;
                                var angDiffT = ang2 - ang1;

                                angDiffT %= Math.PI * 2;

                                if (angDiffT > Math.PI)
                                    angDiffT -= Math.PI * 2;
                                else if (angDiffT < -Math.PI)
                                    angDiffT += Math.PI * 2;
                                    
                                targetrot.y = ang1 + angDiffT;

                                // targetrot._y = -1.570796192436049
                                // targetrot._w = 0

                                console.log('计算之后:', targetrot)

                                // camera.rotation._y = -1.5707963267948966
                                // targetPos._x = -5.06572151184082
                                // targetPos._y = 0.8999999761581421
                                // targetPos._z = -1.0071661472320557
                                // camera.rotation._x = -camera.rotation._x
                                // console.log(targetrot)
                                // targetrot._y = -targetrot._y 
                                // targetrot._x = -targetrot._x

                                console.log('相机旋转:', camera.rotation)

                                var ease = new BABYLON.CubicEase();
                                ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'position', 30, 120, camera.position, new BABYLON.Vector3(targetPos._x, targetPos._y, targetPos._z), 0, ease, animEnd);
                                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation', 30, 120, camera.rotation, targetrot, 0, ease);
                            }
                        }
                        break;
                    case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
                        pickInfo = pointerInfo.pickInfo
                        if (pickInfo.pickedMesh) {
                            //如果点击地板，则前进
                            if (pickInfo.pickedMesh.name == 'Floor') {
                                let pointX = pointerInfo.pickInfo.pickedPoint._x,
                                    pointY = pointerInfo.pickInfo.pickedPoint._y,
                                    pointZ = pointerInfo.pickInfo.pickedPoint._z
                                
                                var ease = new BABYLON.CubicEase();
                                ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'position', 30, 120, camera.position,new BABYLON.Vector3(pointX, 1, pointZ), 0, ease, animEnd);
                            }
                        }
                        break;
                    case BABYLON.PointerEventTypes.POINTERUP:
                        break;
                    case BABYLON.PointerEventTypes.POINTERMOVE:
                        break;
                }
            })

            var animEnd = function() {}

            function _initJoy (){
                let leftJoyStick = new BABYLON.VirtualJoystick(true, {
                    alwaysVisible: true,
                    position: { x: 100,y: 500 },
                    // puckImage:"http://192.168.50.184:8000/Bake.jpg"
                })

                let rightJoyStick = new BABYLON.VirtualJoystick(false)

                let cameraPosition;
                // 每次摄像机移动的距离
                scene.onBeforeRenderObservable.add(()=>{
                    if(leftJoyStick.pressed){
                        //如果左边的被点击
                        let moveX = leftJoyStick.deltaPosition.x * 0.01
                        let moveY = leftJoyStick.deltaPosition.y * 0.01
                        cameraPosition = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(moveX, 0, moveY), BABYLON.Matrix.RotationY(scene.activeCamera.rotation.y))
                        // 生成一个新的位置：以运动的2维矢量，在原来的点上面，也就是y轴的位置，以y轴为变化的就是跳一下了
                        scene.activeCamera.cameraDirection.addInPlace(cameraPosition)

                        // camera.cameraDirection=new BABYLON.Vector3(moveX,moveY,0)
                        
                        // 相机的变化方法：前后左右，一种就是整体重新set position的值，一种就是用矩阵的方式，也就是上面的操作
                        // 感觉就是一种是按键，一种是给出值来操作。这里是滑块键决定方向，能知道的只有当前滑动的距离，我们要把「x,y」每次滑块告诉的数据，转化成3维坐标里面
                    }
                    
                    if(rightJoyStick.pressed){
                        // 这个是镜头的旋转角度,按照常理来说这个是跟着鼠标的，按键控制前后左右，鼠标控制视野
                        scene.activeCamera.cameraRotation.y += rightJoyStick.deltaPosition.x * 0.005
                        scene.activeCamera.cameraRotation.x += rightJoyStick.deltaPosition.y * 0.005
                        // sphere.position.y+=rightJoyStick.deltaPosition.y
                    }
                }) 
            }

            engine.runRenderLoop(function(){
                scene.render();
            });
        })

        window.addEventListener('resize', function(){
            engine.resize();
        });
    })

    function setCollisions (item){
        // item.checkCollisions
    }
})