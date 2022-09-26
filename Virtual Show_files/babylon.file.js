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
  let framedepth = 0.06
  let veid = 'vec1fwten7'

  let veboothList = [
    {
        "vebId": "vec1fwten7_box.006",
        "extend": "{\"id\":\"vec1fwten7_box.006\",\"scaling\":{\"x\":1,\"y\":1,\"z\":1},\"rotation\":{\"x\":0,\"y\":-1.5707963267948966,\"z\":0},\"position\":{\"x\":-11.215584754943848,\"y\":1.780613660812378,\"z\":0.06187520921230315},\"TextureData\":{\"src\":\"deep_home/data/tilized/fa1ca966069b43cdbf949965900f4ae3/fa1ca966069b43cdbf949965900f4ae3.jpg\",\"width\":0.328,\"height\":1,\"origWidth\":656,\"origHeight\":2000},\"exItem\":{\"tilizeSid\":\"fa1ca966069b43cdbf949965900f4ae3\",\"laid\":\"LAx1n9bp73j53b\",\"resourceId\":\"RAbz5tydq4mcaxx\",\"updateTime\":1652153130963,\"sort\":97297,\"sgaid\":\"SGAisk26vryw6vd\",\"lmid\":\"LMvof7qy27px7d\",\"lsid\":\"LSv2i86qdehopa\",\"sgaDatail\":\"\",\"originalName\":\"01-雏鸡小鱼(2).jpg\",\"resourceDzi\":\"deep_home/data/tilized/fa1ca966069b43cdbf949965900f4ae3/fa1ca966069b43cdbf949965900f4ae3.dzi\",\"materialName\":\"水墨画\",\"sgaName\":\"测试tif转jgp清晰度\",\"createTime\":1652066656323,\"resourceIcon\":\"deep_home/data/tilized/fa1ca966069b43cdbf949965900f4ae3/fa1ca966069b43cdbf949965900f4ae3.jpg\",\"width\":1168,\"artistName\":\"文森特·梵高\",\"id\":89,\"sectName\":\"浪漫主义\",\"status\":1,\"tilizeStatus\":3,\"height\":3560}}",
        "createTime": 1663577493998,
        "updateTime": 1663577493998,
        "veid": "vec1fwten7"
    },
    {
        "vebId": "vec1fwten7_box.004",
        "extend": "{\"id\":\"vec1fwten7_box.004\",\"scaling\":{\"x\":1,\"y\":1,\"z\":1},\"rotation\":{\"x\":0,\"y\":-8.74227694680485e-8,\"z\":0},\"position\":{\"x\":-6.247916243474345,\"y\":2.0754146575927734,\"z\":12.465986251831053},\"TextureData\":{\"src\":\"deep_home/data/tilized/aefb3b4ffa9d42acbbd8952380dad60f/aefb3b4ffa9d42acbbd8952380dad60f.jpg\",\"width\":0.758,\"height\":1,\"origWidth\":1516,\"origHeight\":2000},\"exItem\":{\"tilizeSid\":\"aefb3b4ffa9d42acbbd8952380dad60f\",\"laid\":\"LAnrmgyj9sb5vp\",\"resourceId\":\"RAfg9jf6l7fir1k\",\"updateTime\":1651803431033,\"sort\":59633,\"sgaid\":\"SGAyvym2v6aijnz\",\"lmid\":\"LMvof7qy27px7d\",\"lsid\":\"LSv2i86qdehopa\",\"sgaDatail\":\"《最后的晚餐》（意大利语：l'ultima cena）是一幅广为人知的大型壁画，文艺复兴时期由列奥纳多·达·芬奇于米兰的天主教恩宠圣母的多明我会院食堂墙壁上绘成。1980年，绘有《最后的晚餐》的恩宠圣母被列为世界遗产。\\n\\n这幅画高4.6米，宽8.8米，画面利用透视原理，使观众感觉房间随画面作了自然延伸。为了构图使徒坐得比正常就餐的距离更近，并且分成四组，在耶稣周围形成波浪状的层次。越靠近耶稣的门徒越显得激动。耶稣坐在正中间，他摊开双手镇定自若，和周围紧张的十二门徒形成鲜明的对比。耶稣背后的门外是祥和的外景，明亮的天空在他头上仿佛一道光环。他的双眼注视画外，仿佛看穿了世间的一切炎凉。最后的晚餐的画中窗外显示是白天，因此被人列为疑点。\\n\\n为了呈现出每位门徒的形象，达芬奇将这戏剧性的一幕安排在一个大型食堂里，让聚集在长条桌一方的耶稣及其门徒都能面对观众，传神的刻划出每位门徒在瞬间所显现的惊异又复杂的表情。画面的构图以耶稣为中心向两旁展开，就像一个等边三角形，再以高低起伏的人物动作形成三人一组的四个小三角形，使画面显得协调平衡又富有动态感，同时确立了文艺复兴极盛时期高度理想化的构图原则与表现手法。\\n\\n达芬奇还运用正确的透视法成功呈现出“最后的晚餐”中的立体空间构图。透视法，也称为“投影法”，是将三维实际物体或景物描绘在二维图面上，由于二维平面要表现出三维景物的立体感与相互之间的空间距离关系，必须解决不同媒介的视角转换，达成似真的视觉效果。“最后的晚餐”中使用的“交点透视法”是以景物中的天花板、墙角、地砖、壁柱连线、桌椅左右边线、窗框上下边线或斜角阴影边线等的假设延长线，相交于画面深处消失的一点，营造出景观深入的感觉。画中食堂两边的墙与天花板上一格格的嵌板都向后退，创造一种景深的效果，最后集中并消失在耶稣头上后方的窗户，这一点正是整个壁画的中心点，也是视觉的焦点。窗户的光线极其自然的落在耶稣的头上，形成光环的效果，完美的表达了耶稣的神性，可说是透视法极其成功的运用。\",\"originalName\":\"Sunflowers - Vincent van Gogh.jpg\",\"resourceDzi\":\"deep_home/data/tilized/aefb3b4ffa9d42acbbd8952380dad60f/aefb3b4ffa9d42acbbd8952380dad60f.dzi\",\"materialName\":\"水墨画\",\"sgaName\":\"202204290003\",\"createTime\":1651203395244,\"resourceIcon\":\"deep_home/data/tilized/aefb3b4ffa9d42acbbd8952380dad60f/aefb3b4ffa9d42acbbd8952380dad60f.jpg\",\"width\":2000,\"artistName\":\"Pierre-Auguste Renoir\",\"id\":73,\"sectName\":\"浪漫主义\",\"status\":1,\"tilizeStatus\":3,\"height\":2639}}",
        "createTime": 1663577554225,
        "updateTime": 1663577554225,
        "veid": "vec1fwten7"
    },
    {
        "vebId": "vec1fwten7_box",
        "extend": "{\"id\":\"vec1fwten7_box\",\"scaling\":{\"x\":1,\"y\":1,\"z\":1},\"rotation\":{\"x\":0,\"y\":-4.71238898038469,\"z\":0},\"position\":{\"x\":-1.3068476915359497,\"y\":1.7741817235946655,\"z\":10.007823944091797},\"TextureData\":{\"src\":\"deep_home/data/tilized/b560f08677ac40c889edd9cd496dbf46/b560f08677ac40c889edd9cd496dbf46.jpg\",\"width\":1.602,\"height\":0.06,\"origWidth\":3204,\"origHeight\":120},\"exItem\":{\"tilizeSid\":\"b560f08677ac40c889edd9cd496dbf46\",\"laid\":\"LAx1n9bp73j53b\",\"resourceId\":\"RAel7y9sgpm2fjx\",\"updateTime\":1653274908349,\"sort\":24641,\"sgaid\":\"SGAxxh7ty2k0tbr\",\"lmid\":\"LMswfsfmxlvew5\",\"lsid\":\"LSi52lzj0igpdm\",\"sgaDatail\":\"啊实打实大\",\"originalName\":\"Up the River.jpg\",\"resourceDzi\":\"deep_home/data/tilized/b560f08677ac40c889edd9cd496dbf46/b560f08677ac40c889edd9cd496dbf46.dzi\",\"materialName\":\"油画\",\"sgaName\":\"View of Delft - Vermeer\",\"createTime\":1651039569024,\"resourceIcon\":\"deep_home/data/tilized/b560f08677ac40c889edd9cd496dbf46/b560f08677ac40c889edd9cd496dbf46.jpg\",\"width\":3204,\"artistName\":\"文森特·梵高\",\"id\":58,\"sectName\":\"巴洛克\",\"status\":1,\"tilizeStatus\":3,\"height\":120}}",
        "createTime": 1663577574347,
        "updateTime": 1663577574347,
        "veid": "vec1fwten7"
    },
    {
        "vebId": "vec1fwten7_box.001",
        "extend": "{\"id\":\"vec1fwten7_box.001\",\"scaling\":{\"x\":1,\"y\":1,\"z\":1},\"rotation\":{\"x\":0,\"y\":-4.71238898038469,\"z\":0},\"position\":{\"x\":-1.3068468570709229,\"y\":1.7919758558273315,\"z\":4.966555595397949},\"TextureData\":{\"src\":\"deep_home/data/tilized/4a2c6c2ae95b417daf72afe39483d429/4a2c6c2ae95b417daf72afe39483d429.jpg\",\"width\":0.7435,\"height\":1,\"origWidth\":1487,\"origHeight\":2000},\"exItem\":{\"tilizeSid\":\"4a2c6c2ae95b417daf72afe39483d429\",\"laid\":\"LAfc0ieo1ypd36\",\"resourceId\":\"RAu0c9x0ynfu0li\",\"updateTime\":0,\"sort\":23729,\"sgaid\":\"SGAndgzk6upcx8b\",\"lmid\":\"LMvof7qy27px7d\",\"lsid\":\"LSv2i86qdehopa\",\"sgaDatail\":\"2323232\",\"originalName\":\"Failed-抱银鼠的女子 Lady_with_an_Ermine.jpg\",\"resourceDzi\":\"deep_home/data/tilized/4a2c6c2ae95b417daf72afe39483d429/4a2c6c2ae95b417daf72afe39483d429.dzi\",\"materialName\":\"水墨画\",\"sgaName\":\"3232323\",\"createTime\":1651034130638,\"resourceIcon\":\"deep_home/data/tilized/4a2c6c2ae95b417daf72afe39483d429/4a2c6c2ae95b417daf72afe39483d429.jpg\",\"width\":1931,\"artistName\":\"Shitao\",\"id\":52,\"sectName\":\"浪漫主义\",\"status\":1,\"tilizeStatus\":3,\"height\":2597}}",
        "createTime": 1663577583345,
        "updateTime": 1663577583345,
        "veid": "vec1fwten7"
    }
]

  //load babaylon or gltf
  BABYLON.SceneLoader.Load('', 'https://devrecord.imclass.cn/2magic-room-change-glass-box90-placeholder-ai-rename.glb', engine, function (newScene) {
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
      camera = new BABYLON.FreeCamera('FreeCamera', new BABYLON.Vector3(-1, 1.7, 1), scene);
      window.camera = camera
      camera.rotation.y = -Math.PI / 2;
      camera.fov = 0.9
      camera.speed = 0.1;
      camera.minZ = 0.05
      // camera.fovMode = BABYLON.Camera.FOVMODE_HORIZONTAL_FIXED
      // camera.fovMode = BABYLON.Camera.FOVMODE_VERTICAL_FIXED
      // camera.useAutoRotationBehavior = true;
      // camera.applyGravity = true
      camera.inverseRotationSpeed = 0.2
      camera.invertRotation = true

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


      // initPlaceholder()//渲染占位

      renderCover()

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
            mousedownFloor = false
            mouseDownFlag = true
            mouseMove = false
            pickInfo = pointerInfo.pickInfo;
            clearPickedMesh()

            break;
          case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
            break;
          case BABYLON.PointerEventTypes.POINTERUP:
            pickInfo = pointerInfo.pickInfo;

            mouseDownFlag = false
            pickFloor(pickInfo)
            break;
          case BABYLON.PointerEventTypes.POINTERMOVE:
            if(mouseDownFlag){
              mouseMove = true
            }
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
            pickInfo = pointerInfo.pickInfo;
            pickMesh(pickInfo)
            break;
        }
      });

      function animEnd(item) {
        pickedMesh = item
        sgaid = item.sgaid
        window.history.pushState(null, null, '#')
      }

      function pickMesh(pickInfo) {
        if (pickInfo.pickedMesh) {
          if (pickInfo.pickedMesh && (pickInfo.pickedMesh.name.includes(veid) || (pickInfo.pickedMesh.parent && pickInfo.pickedMesh.parent.name == ("placeholder")))) {//点击mesh 对焦相机
            let targetMesh = pickInfo.pickedMesh;
  
            // var angle1 = BABYLON.Angle.FromRadians(0.9).degrees()
  
            // var clientHeight = ((targetMesh.sgItem.height * 0.0005 + 0.1)/2)/Math.tan(angle1/2)
  
            // console.log(mesh, size, 'clientHeight')
  
            // const mesh_sphere = targetMesh.getBoundingInfo().boundingSphere
            // const size = mesh_sphere.radiusWorld
            // var ratio = engine.getAspectRatio(camera, true)//获取相机的纵横比
            // var distance = (size / 2) / (Math.tan(camera.fov / 2))
  
            // targetMesh.computeWorldMatrix(true)
            // var size = targetMesh.getBoundingInfo().boundingBox.extendSizeWorld
            // var maxSize = size.x > size.z ? size.x : size.z
            // var ratio = engine.getAspectRatio(camera, true)//获取相机的纵横比
            // console.log(maxSize, size, ratio, 'ratio')
            // // var distance = maxSize / (Math.tan(camera.fov/2) * ratio)
            // var distance = (maxSize / 2) / (Math.tan(camera.fov/2))
  
            // console.log(distance)
  
  
            let targetPos = targetMesh.getAbsolutePosition();
            let rotationAngle = pickInfo.pickedMesh.name.includes(veid) ? targetMesh.rotation.clone() : targetMesh.rotationQuaternion.toEulerAngles()
            if(pickInfo.pickedMesh.name.includes(veid)){
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
            let distance = 1.65
              // if(pickInfo.pickedMesh.parent && pickInfo.pickedMesh.parent.name == ("placeholder")){
              //   distance = distance - 0.25
              // }
              _x = targetPos.x - distance * Math.sin(rotationAngle.y)
              _z = targetPos.z + distance * Math.cos(rotationAngle.y)
  
              // 重力关闭
              camera.applyGravity = false;
  
              // 声明相机点击 mesh 对其变量
              var camEndPos;
              var targetEndPos;
              // 移动速度
              var speed = 100;
              // 移动帧
              var frameCount = 200;
              // 设置？？
              var ease = new BABYLON.CubicEase();
              ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
              // 设置动画函数
              var setCamLateralLeft = ()=> {
                  // 获取点击 mesh 坐标向量，作为相机镜头指向
                  targetEndPos =  new BABYLON.Vector3(targetPos.x, targetPos.y, targetPos.z);
                  // 获取点击 mesh 对应相机移动位置坐标
                  camEndPos = new BABYLON.Vector3(_x, targetPos.y, _z);
  
                  BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation.x', 30, 50, camera.rotation.x, 0, 0, ease);
                  BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation.z', 30, 50, camera.rotation.z, 0, 0, ease);
                  BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation.y', 30, 50, cameraMo, angle, 0, ease);
                  // 相机镜头指向动画定义
                  // BABYLON.Animation.CreateAndStartAnimation('at2', camera, 'target', speed, frameCount, camera.target, targetEndPos, 0, ease);
                  // 相机移动动画定义
                  BABYLON.Animation.CreateAndStartAnimation('at1', camera, 'position', speed, frameCount, camera.position, camEndPos, 0, ease, ()=>{
                    if(pickInfo.pickedMesh.name.includes(veid)){
                      animEnd(pickInfo.pickedMesh.sgItem)
                    };
                  });
              }
  
              // 执行函数
              setCamLateralLeft();
          } else if (pickInfo.pickedMesh.name == 'impact' || (pickInfo.pickedMesh.parent &&pickInfo.pickedMesh.parent.name == 'floor')) {
            // console.log('设置mousedownFloor为true')
            mousedownFloor = true
          }
        }
      }
      function pickFloor(pickInfo) {
        if (pickInfo.pickedMesh) {
          //如果点击地板，则前进
          // console.log('mousedownFloor', _this.mousedownFloor)
          if ((pickInfo.pickedMesh.name == 'impact' || (pickInfo.pickedMesh.parent &&pickInfo.pickedMesh.parent.name == 'floor')) && mousedownFloor) {
            // var position = pickInfo.pickedPoint
            // position.y += 1
            // var direction = pickInfo.ray.direction
            // direction.y = 0
            // var target = position.add(direction)
  
            // _this.mousedownFloor = false;
  
            // // 重力开放
            // camera.applyGravity = true;
  
            // var ease = new BABYLON.CubicEase();
            // ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  
            // // BABYLON.Animation.CreateAndStartAnimation("transition", camera, "position", 100, 200, camera.globalPosition, position, 0, ease)
            // var animation = BABYLON.Animation.CreateAndStartAnimation("transtion", camera, "target", 50, 200, camera.getTarget(), target, 0, ease)
  
            // setTimeout(() => {
            //   animation.stop()
            // }, 1000)
            // return
  
            let _targetMesh = pickInfo.pickedMesh;
            // 获取 mesh 坐标
            let _targetPos = _targetMesh.getAbsolutePosition();
            // 获取点击 mesh 坐标 x 轴
            let pointX = pickInfo.pickedPoint._x,
              pointY = camera.position.y,
              // 获取点击 mesh 坐标 z 轴
              pointZ = pickInfo.pickedPoint._z;
  
            //将这个参数设置为默认
            mousedownFloor = false;
  
            // 重力开放
            camera.applyGravity = true;
  
            // 点击地板动画设置
            var camEndPos;
            var targetEndPos;
            //帧每秒
            var speed = 100;
            //总共帧数
            var frameCount = 200;
            var ease = new BABYLON.CubicEase();
            ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  
            var setCamLateralLeft = function() {
                camEndPos = new BABYLON.Vector3(pointX, pointY, pointZ);
                targetEndPos = new BABYLON.Vector3(pointX, pointY, pointZ);
                BABYLON.Animation.CreateAndStartAnimation('at2', camera, 'target', speed, frameCount - 100, camera.target, targetEndPos, 0, ease);
                BABYLON.Animation.CreateAndStartAnimation('at1', camera, 'position', speed, frameCount, camera.position, camEndPos, 0, ease);
            };
  
            setCamLateralLeft();
          }
        }
      }

      function renderCover(){
        scene.meshes.forEach((mesh) => {
          if(mesh.parent && mesh.parent.name == ("placeholder")){
            // mesh.visibility = 0
            mesh.setEnabled(false)
            for (let i = 0; i < veboothList.length; i++) {
              let vebId = veboothList[i].vebId;
              let uniqueIdArr = vebId.split('_');
              let uniqueId = uniqueIdArr[1];
              // console.log("===========", uniqueId, mesh.uniqueId)
              if (uniqueId == mesh.id) {
                // console.log("renderCover: ", mesh.id)
                let extend = JSON.parse(veboothList[i].extend);
                let exItem = extend.exItem;
                let coverData = extend.TextureData;
                coverData.position = extend.position;
                coverData.rotation = extend.rotation;
                coverData.scaling = extend.scaling;
                //渲染画框
                initPicFrame(coverData, mesh);
                //渲染展品
                initialCover(coverData, mesh, exItem);
              }
            }
          }
        })
      }

      function initPicFrame(coverData, pickedMesh){
        let width = coverData.width;
        let height = coverData.height;
        let position = coverData.position;
        let rotation = coverData.rotation;
        let scaling = coverData.scaling;
        let boxName = "frame_" + pickedMesh.id;
        let faceColors = [];
        faceColors[0] = BABYLON.Color3.Black();
        faceColors[1] = BABYLON.Color3.Black()
        faceColors[2] = BABYLON.Color3.Black();
        faceColors[3] = BABYLON.Color3.Black();
        faceColors[4] = BABYLON.Color3.Black();
        faceColors[5] = BABYLON.Color3.Black();
        let boxPane = BABYLON.MeshBuilder.CreateBox(boxName, {
          width: width * scaling.x + 0.1,
          height: height * scaling.y + 0.1,
          depth: framedepth,
          // faceColors: faceColors,
          updatable: false,
        }, scene);
  
        boxPane.position.x = position.x; //pickedMesh.getAbsolutePosition().x + 0.25 * Math.sin(rotationAngle.y) //pickedMesh.getAbsolutePosition().x
        boxPane.position.y = position.y; //pickedMesh.getAbsolutePosition().y
        boxPane.position.z = position.z; //pickedMesh.getAbsolutePosition().z - 0.25 * Math.cos(rotationAngle.y)//pickedMesh.getAbsolutePosition().z
  
        //设置贴图rotation
        boxPane.rotation.x = rotation.x; //rotationX
        boxPane.rotation.y = rotation.y; //-rotationY
        boxPane.rotation.z = rotation.z; //rotationz
  
        let frameSrc = "https://rc.imclass.cn/frame.jpeg"
        let materialPlane = new BABYLON.StandardMaterial('texturePlane', scene);
        materialPlane.diffuseTexture = new BABYLON.Texture(frameSrc, scene);
        materialPlane.specularTexture = new BABYLON.Texture(frameSrc, scene);
        materialPlane.emissiveTexture = new BABYLON.Texture(frameSrc, scene);
        // materialPlane.ambientTexture = new BABYLON.Texture(imgSrc, scene);
  
        materialPlane.alpha = 1;
        materialPlane.diffuseTexture.hasAlpha = true;
        materialPlane.shadowLevel = 0.4;
  
        boxPane.material = materialPlane
      }
  
  
      function initialCover(coverData, pickedMesh, exItem) {
        let cover = coverData.src;
        let imgSrc = getImageUrl(cover, '?imageMogr2/thumbnail/4000x2000>/quality/80');
        let width = coverData.width;
        let height = coverData.height;
        let position = coverData.position;
        let rotation = coverData.rotation;
        let scaling = coverData.scaling;
  
        let materialPlane = new BABYLON.StandardMaterial('texturePlane', scene);
        materialPlane.diffuseTexture = new BABYLON.Texture(imgSrc, scene);
        materialPlane.specularTexture = new BABYLON.Texture(imgSrc, scene);
        materialPlane.emissiveTexture = new BABYLON.Texture(imgSrc, scene);
        // materialPlane.ambientTexture = new BABYLON.Texture(imgSrc, scene);
  
        materialPlane.alpha = 1;
        materialPlane.diffuseTexture.hasAlpha = true;
        materialPlane.shadowLevel = 0.4;
  
        let ExName = veid + '_' + pickedMesh.id;
        let tiledPane = BABYLON.MeshBuilder.CreatePlane(ExName, {
          width: width,
          height: height,
          updatable: false,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, scene);
  
        let rotationAngle = pickedMesh.rotationQuaternion.toEulerAngles();
  
        //设置贴图position
        //tiledPane.position.x = position.x; //pickedMesh.getAbsolutePosition().x + 0.25 * Math.sin(rotationAngle.y) //pickedMesh.getAbsolutePosition().x
        //tiledPane.position.y = position.y; //pickedMesh.getAbsolutePosition().y
        //tiledPane.position.z = position.z; //pickedMesh.getAbsolutePosition().z - 0.25 * Math.cos(rotationAngle.y)//pickedMesh.getAbsolutePosition().z
  
        tiledPane.position.x = position.x - (framedepth/2 + 0.003) * Math.sin(rotationAngle.y);
        tiledPane.position.y = position.y;
        tiledPane.position.z = position.z + (framedepth/2 + 0.003) * Math.cos(rotationAngle.y);
  
        // let rotationX =  pickedMesh.rotationQuaternion.toEulerAngles().x
        // let rotationY =  pickedMesh.rotationQuaternion.toEulerAngles().y + Math.PI
        // let rotationz =  pickedMesh.rotationQuaternion.toEulerAngles().z
  
        //设置贴图rotation
        tiledPane.rotation.x = rotation.x; //rotationX
        tiledPane.rotation.y = rotation.y; //-rotationY
        tiledPane.rotation.z = rotation.z; //rotationz
  
        //设置贴图scaling
        tiledPane.scaling.x = scaling ? scaling.x : 1;
        tiledPane.scaling.y = scaling ? scaling.y : 1;
  
        if (pickedMesh) {
          tiledPane.material = materialPlane
          tiledPane.sgItem = exItem
        }
      }

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

      function clearPickedMesh() {
        pickedMesh = {}
        sgaid = ''
      }


      scene.onKeyboardObservable.add((kbInfo) => {
        var inputIndex = kbInfo.event.inputIndex
        var arrs = [65,83,68,87,37,38,39,40]

        if (arrs.indexOf(inputIndex) != -1) {
          // 重力开放
          camera.applyGravity = true;
          clearPickedMesh() //隐藏弹出层
        }

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

  function getImageUrl(url, style) {
    return style ? 'https://devrecord.imclass.cn/' + url + style : 'https://devrecord.imclass.cn/' + url;
  }
});
