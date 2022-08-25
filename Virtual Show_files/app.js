  window.addEventListener('DOMContentLoaded', function(){
        // get the canvas DOM element
        var canvas = document.getElementById('renderCanvas');

        // load the 3D engine
        var engine = new BABYLON.Engine(canvas, true);
      
    // loading screen --------------
      var loadingScreenDiv = window.document.getElementById("loadingScreen");

        function customLoadingScreen() {
            console.log("customLoadingScreen creation")
        }
        customLoadingScreen.prototype.displayLoadingUI = function () {
            console.log("customLoadingScreen loading")
            loadingScreenDiv.innerHTML = " ";
        };
        customLoadingScreen.prototype.hideLoadingUI = function () {
            console.log("customLoadingScreen loaded")
            loadingScreenDiv.style.display = "none";
        };
        var loadingScreen = new customLoadingScreen();
        engine.loadingScreen = loadingScreen;

        engine.displayLoadingUI();
       
      
      
      
            // createScene function that creates and return the scene
           BABYLON.SceneLoader.Load("","art_gallery_demo_no_texture_no_skybox.glb",engine,function(newScene){
               var scene = newScene;
               console.log(scene)
               var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

                // Default intensity is 1. Let's dim the light a small amount
                light.intensity = 0.7;
            //    let Wall = scene.getMeshByName('Wall');
            //    Wall.checkCollisions = true

            //    let leftJoyStick=new BABYLON.VirtualJoystick(true,{
            //         alwaysVisible:true,
            //         // color:"red",
            //         // containerSize:20,
            //         position:{x:100,y:500},
            //         // 必须要有位置，才能默认显示出来，结合alwaysViaible
            //         // puckImage:"http://192.168.50.184:8000/Bake.jpg"
            //     })

            //     let rightJoyStick=new BABYLON.VirtualJoystick(false)

            //     let cameraPosition;
            // // 每次摄像机移动的距离
            // scene.onBeforeRenderObservable.add(()=>{
            //     if(leftJoyStick.pressed){
            //         //如果左边的被点击
            //         let moveX=leftJoyStick.deltaPosition.x*0.01
            //         let moveY=leftJoyStick.deltaPosition.y*0.01
            //         cameraPosition=BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(moveX,0,moveY),BABYLON.Matrix.RotationY(scene.activeCamera.rotation.y))
            //         // 生成一个新的位置：以运动的2维矢量，在原来的点上面，也就是y轴的位置，以y轴为变化的就是跳一下了
            //         scene.activeCamera.cameraDirection.addInPlace(cameraPosition)

            //         // camera.cameraDirection=new BABYLON.Vector3(moveX,moveY,0)
                    
            //         // 相机的变化方法：前后左右，一种就是整体重新set position的值，一种就是用矩阵的方式，也就是上面的操作
            //         // 感觉就是一种是按键，一种是给出值来操作。这里是滑块键决定方向，能知道的只有当前滑动的距离，我们要把「x,y」每次滑块告诉的数据，转化成3维坐标里面
            //     }
                
            //     if(rightJoyStick.pressed){
            //         // 这个是镜头的旋转角度,按照常理来说这个是跟着鼠标的，按键控制前后左右，鼠标控制视野
            //         scene.activeCamera.cameraRotation.y+=rightJoyStick.deltaPosition.x*0.005
            //         scene.activeCamera.cameraRotation.x+=rightJoyStick.deltaPosition.y*0.005
            //         // 
            //         // sphere.position.y+=rightJoyStick.deltaPosition.y
            //     }
            // }) 
            
            //    if (scene.activeCamera.intersectsMesh(VideoWall, false)) {
            //         alert('碰撞')
            //    }
            //    console.log(VideoWall)
               //show debug layer
               //scene.debugLayer.show();
               
/*         var music = new BABYLON.Sound("music", "../sound/Gymnopedie_No_3.mp3", scene, soundReady, {loop: true, autoplay:true });

     function soundReady() { 
//          setTimeout(function(){
//                          document.getElementById("babylonUnmuteIconBtn").click();
//                          },1500)
     }
       */        
               
               
               
               scene.executeWhenReady(function(){
                   
                   engine.hideLoadingUI();
            

/*
                      $('#playstop').on('click',function(){
                          if($(this).hasClass('play')){
                              $(this).removeClass('play');
                              $(this).addClass('stop');
                              music.stop();
                          }else if($(this).hasClass('stop')){
                              $(this).removeClass('stop');
                              $(this).addClass('play');
                              music.play();
                          }
                    
                })*/
                  
            
               
                    
            const arrowOrderArray = [1, 2, 3, 4, 8, 7, 6, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]; 
              let arrowArray = [];       
                   
            //  $.ajax({
            //     url: "./ajax.json"
            //     , success: OnSuccess
            //     , error: OnError
            // });

            // function OnSuccess(res) {
            //     let data = JSON.stringify(res);
            //     let parsedObj = JSON.parse(data); 
            //     arrowArray = 
            //     var is={ie:navigator.appName=='Microsoft Internet Explorer',java:navigator.javaEnabled(),ns:navigator.appName=='Netscape',ua:navigator.userAgent.toLowerCase(),version:parseFloat(navigator.appVersion.substr(21))||parseFloat(navigator.appVersion),win:navigator.platform=='Win32'}
            //     is.mac=is.ua.indexOf('mac')>=0;if(is.ua.indexOf('opera')>=0){is.ie=is.ns=false;is.opera=true;}
            //     if(is.ua.indexOf('gecko')>=0){is.ie=is.ns=false;is.gecko=true;};
            //     $.each(parsedObj, function (key, value) {                             
            //             createInfoBtn(key, value);                             
            //     });
            // }

            

            function OnError() {}     


            function createInfoBtn(k, v) {
                var id = v.id;                
                var plane = 'plane-' + id;
                //planeArray.push(plane.toString());
                var meshName = v.pic_name;
                var plane = new BABYLON.Mesh.CreatePlane(plane.toString(), 0.6, scene, true, 1);
                
                //plane.setEnabled(true);
                plane.setParent(scene.getMeshByName(meshName));                
                plane.position = new BABYLON.Vector3(v.infoicon[0], v.infoicon[1], v.infoicon[2]);
                plane.setParent();
                plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
                
                // Set Material
                var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
                advancedTexture2.backFaceCulling = false;
                
                var infobtn = 'button' + id;
                var infobtn = BABYLON.GUI.Button.CreateImageOnlyButton(v.pic_name, "infoicon.png");
                infobtn.color = "transparent";
                infobtn.onPointerUpObservable.add(function() {
                    
                    //let picName = v.pic_name;
                   $.each( arrowArray, function( index, val ) {
                        if(val.id == id){
                            $('#imgpreloader').html('<img  id="img2" src="https://cre8mania.com/ny_virtual_show/img/'+val.img+'" alt="">')
                                                       // let imgURLtag = document.getElementById("imgpreloader");
                            //let imgURLtag = document.getElementById("img2"); 
                            //console.log(imgURLtag)
                            //imgURLtag.src = 'https://cre8mania.com/babylon/v10/img/'+val.img;
                            //alert(imgURLtag.src)
                            if(val.img == ''){
                                //console.log('22')
                                $('.image-box').fadeOut(0)
                            }else{
                                //console.log('24')
                                $('.image-box').fadeIn(0)
                            }
                            let title = document.getElementById("h1"); 
                            title.innerHTML = val.title;

                            let subtitle = document.getElementById("h5"); 
                            subtitle.innerHTML = val.subtitle;

                            let artist = document.getElementById("h3"); 
                            artist.innerHTML = val.artist_name;

                            let location = document.getElementById("location"); 
                            location.innerHTML = val.location;

                            let article = document.getElementById("inner_box"); 
                            article.innerHTML = val.article;                         

                            $("#img2").load(function(){
                              centerImage();
                            });                            
                            $('#popup').fadeIn(400);                        
                        }                      
                    });
                                        
                });
                
                //Link button to plane
                advancedTexture2.addControl(infobtn);
            }
                   
           //-------------------------------Camera Setup-----------------------------------------------------
           var camheight = 15;
           var camera = new BABYLON.FreeCamera("FreeCam",new BABYLON.Vector3(1 ,1, 1),scene,true);
                   
            camera.rotation.y =-Math.PI/2;       
            camera.fov=1.33;//camera FOV
            // camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
            scene.activeCamera = camera;
            scene.collisionsEnabled = true;
            scene.activeCamera.checkCollisions = true;



            var canvas = document.getElementById("renderCanvas");
            scene.activeCamera.attachControl(canvas,true);

            
            //target mesh
            let target_arrow_name = 'Arrow '+ arrowOrderArray[0].toString();
            let targetMesh = scene.getMeshByName(target_arrow_name);  
            
                   
                   
            //CamViewRotationSet
                   
                let getChildRotation = function(child){ //return the rotation of a child of a parent object by using a temporary World Matrix
                    var scale = new BABYLON.Vector3(0, 0, 0);
                    var rotation = new BABYLON.Quaternion();
                    var translation = new BABYLON.Vector3(0,0,0);

                    var tempWorldMatrix = child.getWorldMatrix();
                    tempWorldMatrix.decompose(scale, rotation, translation);
                    var rot = rotation.toEulerAnglesToRef(rotation)
                    return rot;
                }
//--------------------------------Camera Move Animation------------------

            var camAnimation = function (){
                //stop mouse
                scene.activeCamera.detachControl(canvas);
                targetMesh.setEnabled(false);
                if (advancedTexture) {
                    advancedTexture.removeControl(button1);
                    advancedTexture.removeControl(button2);
                }

                var targetpos = targetMesh.getAbsolutePosition();
                targetpos.y = camheight;

                //targetMesh.rotationQuaternion = null;
                
                var targetrot = getChildRotation(targetMesh);
                    targetrot.x =0;
                    targetrot.y = targetrot.y + Math.PI;
                    targetrot.z =0;
                //console.log(targetrot);

                
                
                 var ang1 = camera.rotation.y;
                 var ang2 = targetrot.y;
                 var angDiffT = ang2 - ang1;

                angDiffT %= Math.PI * 2;

                if (angDiffT > Math.PI)
                    angDiffT -= Math.PI * 2;
                else if (angDiffT < -Math.PI)
                    angDiffT += Math.PI * 2;

                       
                targetrot.y = ang1 + angDiffT;
                       
                    
                var ease = new BABYLON.CubicEase();
                ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'position', 30, 120, camera.position,new BABYLON.Vector3(targetpos.x,camheight,targetpos.z), 0, ease,animEnd);
                BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation', 30, 120, camera.rotation,targetrot, 0, ease);
            } 
            //target reached
            var animEnd = function(){
                scene.activeCamera.attachControl(canvas,true); 

                                                     
                var arrowIDAni = targetMesh.name.split(' ');
                    arrowIDAni = parseInt(arrowIDAni[1]); 
                                        
                if (advancedTexture){                            
                    if(arrowIDAni =='1'){ 
                    }else if(arrowIDAni == '2'){                                
                        advancedTexture.addControl(button1);                                        
                    }else if(arrowIDAni == '21'){                                
                        advancedTexture.addControl(button1);                                        
                    }else{
                        advancedTexture.addControl(button1);
                        advancedTexture.addControl(button2); 
                    }
                }
            }

            let next_arrow_name = 'Arrow 2';
            // moveCamToArrow(next_arrow_name);
            $('.intro_popup').fadeOut(300)
            //     $('#startani, .closeinfobtn').on('click',function(){
            //         $('.intro_popup').fadeOut(300,function(){
            //  let next_arrow_name = 'Arrow 2';
            //  moveCamToArrow(next_arrow_name);
            //         });
                    
      
            //     })
                
                //Intro Cam Animation
            // camAnimation();
                   
                //    setTimeout(function(){
                //         $('.intro_popup').fadeIn(300);
                //    },3000)
                   

//--------------------------------------Mouse input Control-------------------------------------------------
    scene.onPointerObservable.add((pointerInfo) => {
		switch (pointerInfo.type) {
			case BABYLON.PointerEventTypes.POINTERDOWN:
                if (pointerInfo.pickInfo.pickedMesh) {  //&& pointerInfo.pickInfo.pickedMesh != targetMesh
        // is cam point
                    if(pointerInfo.pickInfo.pickedMesh.parent && pointerInfo.pickInfo.pickedMesh.parent.name == ("CamViews")) {
                        //assign target
                        if(targetMesh) {
                            scene.getMeshByName(targetMesh.name).setEnabled(true);
                        }
                        targetMesh = (pointerInfo.pickInfo.pickedMesh);
                        //hide target
                    // scene.getMeshByName(pointerInfo.pickInfo.pickedMesh.name).setEnabled(false);
                                //console.log(targetMesh)
                        camAnimation();                            
                    } else if (pointerInfo.pickInfo.pickedMesh.name == 'Floor') {
                        let pointX = pointerInfo.pickInfo.pickedPoint._x,
                            pointY = pointerInfo.pickInfo.pickedPoint._y,
                            pointZ = pointerInfo.pickInfo.pickedPoint._z
                        var ease = new BABYLON.CubicEase();
                        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                        BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'position', 30, 120, camera.position,new BABYLON.Vector3(pointX,1,pointZ), 0, ease,animEnd);
                        // BABYLON.Animation.CreateAndStartAnimation('at5', camera, 'rotation', 30, 120, camera.rotation,targetrot, 0, ease);
                    }
                }
			 break;
        }
    });


//------------------------------------------GUI Move Auto------------------------
        var w = window.innerWidth;
         let isMobile = false;

       if(w <= 985){
           //alert('ismobile')
           isMobile = true;
           $('.image-box').addClass('is_mobile');
       }
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

          
        var button1 = BABYLON.GUI.Button.CreateImageOnlyButton("Forw", "NavIcon.png");
        if (!isMobile) {
            button1.width = "50px"
            button1.height = "50px";
        }
        else {
            button1.width = "100px"
            button1.height = "100px";
        }
        button1.color = "transparent";
        button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        button1.top = "185px";
        button1.onPointerUpObservable.add(function () {
            advancedTexture.removeControl(button1);
            advancedTexture.removeControl(button2);
            next_prev_navigation('prev');
        });
 
                   
                   
       var button2 = BABYLON.GUI.Button.CreateImageOnlyButton("Back", "NavIcon.png");
       if (!isMobile) {
           button2.width = "50px"
           button2.height = "50px";
       }
       else {
           button2.width = "100px"
           button2.height = "100px";
       }
       button2.color = "transparent";
       button2.rotation = Math.PI;
       button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
       button2.top = "185px";
       button2.onPointerUpObservable.add(function () {
           advancedTexture.removeControl(button1);
           advancedTexture.removeControl(button2);
           
           next_prev_navigation('next');
           
       });
      // advancedTexture.addControl(button1);
       //advancedTexture.addControl(button2);

                   
                   
/*        let isArrow = false;
        function activateArrowPopup(arrowID) {
            let arrowName = 'Arrow ' + arrowID;
            arrowArray = [];
            isArrow = true;
            $.ajax({
                url: "./ajax.json"
                , success: OnSuccess
                , error: OnError
            });

            function OnSuccess(res) {
                let data = JSON.stringify(res);
                var parsedObj = JSON.parse(data);
                $.each(parsedObj, function (key, value) {
                    if (value.arrow == arrowName) {
                        arrowArray.push(value);
                    }
                });
                console.log(arrowArray)
            }

            function OnError() {}
        }
          */         

       function next_prev_navigation(e) {
         if (targetMesh != null) {
             scene.getMeshByName(targetMesh.name).setEnabled(true);
             let arrow_id = targetMesh.name;
             arrow_id = arrow_id.split(' ');
             arrow_id = parseInt(arrow_id[1]); 
             
             if(e =='prev' && ( arrow_id == 1 || arrow_id == 2 )){
                 e = 'next';
             }else if(e =='next' && ( arrow_id == 1 || arrow_id == 2 )){
                 e = 'prev';
             } 
             
             $.each(arrowOrderArray, function (arrow_index, arrow_value) {
                 if (arrow_value == arrow_id) {
                     const array_len = arrowOrderArray.length;
                     const last_arrow = arrowOrderArray[array_len-1]; 
                     const first_arrow = arrowOrderArray[0]; 
                     
                     
                     let next_arrow;
                     if (e == 'next') {
                         if (arrowOrderArray[arrow_index] == last_arrow) {
                             next_arrow = first_arrow;
                         }
                         else {
                             next_arrow = arrowOrderArray[arrow_index + 1];
                         }
                     }
                     else if (e == 'prev') {
                         if (arrowOrderArray[arrow_index] == first_arrow) {
                             next_arrow = last_arrow;
                         }
                         else {
                             next_arrow = arrowOrderArray[arrow_index - 1];
                         }
                     } 
                     //activateArrowPopup(next_arrow)
                     //console.log(next_arrow);
                     if (next_arrow == null) {
                         next_arrow = arrowOrderArray[0];
                     }
                     let next_arrow_name = 'Arrow ' + next_arrow.toString();
                     moveCamToArrow(next_arrow_name);
                 }
             });
         }
         else {
             let next_arrow = arrowOrderArray[0];
             let next_arrow_name = 'Arrow ' + next_arrow.toString();
             moveCamToArrow(next_arrow_name);
         }
     }

     function moveCamToArrow(objName) {
         scene.activeCamera.detachControl(canvas);
         targetMesh = scene.getMeshByName(objName);
         camAnimation();
     }     
 
///////////////////////////////////////////////////////////////////                   
                                      
    // scene.getMeshByID("Arrow1").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow2").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow3").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow4").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow5").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow6").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow7").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow8").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow9").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow10").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow11").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow12").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow13").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow14").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow15").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow16").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow17").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow18").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow19").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow20").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
    // scene.getMeshByID("Arrow21").scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
               
    // scene.getMeshByID("Arrow2").rotation = new BABYLON.Vector3(0, 4.049163864626845, 0);
    // scene.getMeshByID("Arrow3").rotationQuaternion = new BABYLON.Quaternion(0, 0.7071067811865475, -0, 0.7071067811865476);
    // scene.getMeshByID("Arrow4").position = new BABYLON.Vector3(1.8, 0.8999999761581421, -2.2);
    // scene.getMeshByID("Arrow5").position = new BABYLON.Vector3(-2.650661714463507, 0.9000000357627869, -1.7774192530577566);
    // scene.getMeshByID("Arrow6").rotation = new BABYLON.Vector3(0, 3.141592653589793, 0);
    // scene.getMeshByID("Arrow7").rotation = new BABYLON.Vector3(0, 0, 0);
    // scene.getMeshByID("Arrow8").position = new BABYLON.Vector3(-2.5, 0.8999999761581421, -2.8);
    // scene.getMeshByID("Arrow8").rotation = new BABYLON.Vector3(0, 0, 0);
    // scene.getMeshByID("Arrow9").rotation = new BABYLON.Vector3(0, 2.5307274153917776, 0);
    // scene.getMeshByID("Arrow11").position = new BABYLON.Vector3(0.6, 0.8999999761581421, 0.7285299301147461);
    // scene.getMeshByID("Arrow12").position = new BABYLON.Vector3(0.5, 0.8999999761581421, 3.6150529384613037);
    // scene.getMeshByID("Arrow13").position = new BABYLON.Vector3(0.55, 0.8999999761581421, 6.485210418701172);
    // scene.getMeshByID("Arrow14").rotation = new BABYLON.Vector3(0, 3.141592653589793, 0);
    // scene.getMeshByID("Arrow14").position = new BABYLON.Vector3(0.8144258856773376, 0.9000000357627869, 5.514644293221301);
    // scene.getMeshByID("Arrow15").rotation = new BABYLON.Vector3(0, 3.141592653589793, 0);
    // scene.getMeshByID("Arrow15").position = new BABYLON.Vector3(3.9781836861469135, 0.9000000357627869, 5.349292707662964);                 
    // scene.getMeshByID("Arrow16").position = new BABYLON.Vector3(4.65, 0.8999999761581421, 5.509345531463623);
    // scene.getMeshByID("Arrow17").position = new BABYLON.Vector3(4.590493116733458, 0.8999999761581421, 2.122999914459587);        
    // scene.getMeshByID("Arrow18").position = new BABYLON.Vector3(4.590493116733458, 0.9000000357627869, -1.0071658925471028);
    // scene.getMeshByID("Arrow19").position = new BABYLON.Vector3(4.800124552894828, 0.9000000357627869, -4.088973513095281);
    // scene.getMeshByID("Arrow21").position = new BABYLON.Vector3(2.5, 0.8999999761581421, -4.255);
    // scene.getMeshByID("Arrow20").rotation = new BABYLON.Vector3(0, 0, 0);
    // scene.getMeshByID("Arrow20").position = new BABYLON.Vector3(3.676, 0.8999999761581421, -5.32); 
                   
                   
    // scene.getMaterialByID("StandardMaterialadfca").diffuseColor = new BABYLON.Color3(0.9607843137254902, 0.6509803921568628, 0.13725490196078433);
    // scene.getMaterialByID("StandardMaterialadfca").emissiveColor = new BABYLON.Color3(0.8470588235294118, 0.5215686274509804, 0);
    // scene.getMaterialByID("StandardMaterialadfca").alpha = 0.75;
    // scene.getMaterialByID("StandardMaterialadfca").ambientColor = new BABYLON.Color3(0.9411764705882353, 0.3058823529411765, 0.3058823529411765);
                   
                   

                   
              ////////////////////////////////////////////////
            ////////////////////////////////////////////////////
            
        /*
        scene.onPointerDown = function (evt, pickResult) {
            
            //console.log('name: '+pickResult.pickedMesh.name);
            //console.log('parent ID : '+pickResult.pickedMesh.parent.id);
            //console.log('id: '+pickResult.pickedMesh.id)
            
            let isPlane = false;
            if ((pickResult.pickedMesh.id.split('-'))[0] == 'plane') {
               let planeID = pickResult.pickedMesh.id.split('-');
                planeID = planeID[1]; 
                activateArrowPopup_planeID(planeID);
                isPlane = true;
            }
            if (pickResult.hit) {
                if (isPlane == false) {
                    if (pickResult.pickedMesh.parent.id == 'CamViews') {
                        let arrowName = pickResult.pickedMesh.name.split(' ');
                        let arrowID = arrowName[1];
                        //activateArrowPopup(arrowID);
                    }
                }
            }
        };      
           
                    
        function activateArrowPopup_planeID(planeID) {
            //arrowArray = [];
            $.ajax({
                url: "./ajax.json"
                , success: OnSuccess
                , error: OnError
            });

            function OnSuccess(res) {
                let data = JSON.stringify(res);
                var parsedObj = JSON.parse(data);
                $.each(parsedObj, function (key, value) {
                    if (value.id == planeID) {
                        arrowArray.push(value);
                    }
                });
                //console.log(arrowArray)
            }

            function OnError() {}
        }*/ 
           
                   
                   

                   function centerImage() {
                     let myImg = document.querySelector("#img2");
                        
                     let w = myImg.naturalWidth;
                     let h = myImg.naturalHeight;
                     let vw = $('.image-box figure').width();
                     let vh = $(window).height();
                  
                        
                          
                     if (w > h) {
                         if (w < vw) {
                             if (h > vh) {
                                 addH()
                                    console.log('app '+11)
                             }
                             else {
                                 addW()
                                    console.log('app '+12)
                             }
                         }
                         else if (w > vw) {
                             if (h > vh) {
                                 addH()
                                    console.log('app '+13)
                             }
                             else {
                                 addW()
                                    console.log('app '+14)
                             }
                         }
                     }
                     else if (h > w) {
                         if (w < vw) {
                             if (h > vh) {
                                 addH()
                                    console.log('app '+21)
                             }
                             else {
                                 addW()
                                    console.log('app '+22)
                             }
                         }
                         else if (w > vw) {
                             if (h > vh) {
                                 
                                 if(isMobile){
                                   addW()   
                                 }else{
                                      addH()
                                 }
                                
                                    console.log('app '+23)
                             }
                             else {
                                 addH()
                                    console.log('app '+24)
                             }
                         }
                     }
                     else if (h = w) {
                         if (w < vw) {
                             if (h > vh) {
                                 addH()
                                    console.log('app '+31)
                             }
                             else {
                                 addW()
                                    console.log('app '+32)
                             }
                         }
                         else if (w > vw) {
                             if (h > vh) { 
                                if(isMobile){
                                   addW()   
                                 }else{
                                  addH()
                                 }                                
                                  console.log('app '+33)
                             }
                             else {
                                 addH()
                                     console.log('app '+34)
                             }
                         }
                     }
                       let imgURL = document.getElementById("img"); 
                       let imgURL2 = document.getElementById("img2");
                       
                       imgURL.src = imgURL2.src;
                       $('#ex1').zoom({ on:'click' });
                       
                    setTimeout(function () {
                        $('#img').css('visibility', 'visible');
                    }, 3000)

                             }

function addH(){
    $('.image-box figure').addClass('height');
    $('.image-box figure').removeClass('width');
}
function addW(){
    $('.image-box figure').addClass('width');
    $('.image-box figure').removeClass('height');
}
    /**
     * Called on each frame
     */
/*    public update (deltaTimeMs: number): void {

        // Your code...
      
      var dist = campoint.position.subtract(scene.activeCamera.position);
      var pickPoint = function(campoint){
              if(dist < new BABYLON.Vector3(0.2,0.2,0.2)){
                
                plane.setEnabled(true);
               
            } else {
                plane.setEnabled(false);
              
                
            }

          
      }
         pickPoint(campoint);
        
    }
 */
                    // run the render loop
                    engine.runRenderLoop(function(){
                    scene.render();
                    });  
                   
               });
           });

          

            // the canvas/window resize event handler
            window.addEventListener('resize', function(){
                engine.resize();
            });
        });