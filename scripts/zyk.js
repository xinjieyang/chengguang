// 创建华容道 6 * 6
var w = 100,h = 100;
var now_control_obj = null;
var now_labels_map = null;
var now_arrays_maps = null;
var now_map_name = "map1.png";

// 类别数 + 出口行列索引 key默认初始为[result[0],0]
var labels_map3 =
{"12":[1,[3,0]],
"21":[3,[0,0],[0,2],[4,1]],
"13":[3,[0,3],[1,3],[5,2]],
"31":[1,[2,3]],
"result":[2,4],
"key":[2,0]}

var arrays_map3 =  
[     [ 211, 0, 212, 131, 131, 131 ], 
      [ 211, 0, 212, 132, 132, 132 ], 
      [ -1, -1, 0, 311, 0, 0 ], 
      [121,121, 0, 311, 0, 0 ], 
      [ 0, 213, 0, 311, 0, 0 ], 
      [ 0, 213, 133, 133, 133, 0 ],  ];

var labels_map2 =
{"12":[2,[0,0],[4,4]],
"21":[1,[4,0]],
"13":[1,[5,2]],
"31":[3,[1,0],[1,3],[0,5]],
"result":[2,4],
"key":[2,1]}

var arrays_map2 =  
[     [ 121, 121, 0, 0,  0, 313 ], 
      [ 311, 0, 0, 312,  0, 313 ],
      [ 311,-1,-1, 312,  0, 313 ],
      [ 311, 0, 0, 312,  0, 0 ],
      [ 211, 0, 0, 0,   121, 121 ],
      [ 211, 0, 131, 131, 131, 0 ] ];

var labels_map1 =
{"12":[2,[0,1],[5,0]],
"21":[6,[0,4],[1,5],[2,2],[2,3],[3,1],[4,2]],
"13":[1,[1,1]],
"31":[0],
"result":[2,4],
"key":[2,0]}

var arrays_map1 =  
[     [ 0, 121, 121, 0,  211, 0 ], 
      [ 0, 131, 131, 131,   211, 212 ],
      [-1, -1, 213, 214,  0,  212 ],
      [ 0, 215,213, 214, 0, 0 ],
      [ 0, 215,  216, 0, 0, 0 ],
      [ 122,122, 216, 0, 0, 0 ] ];

function print(){
      console.log(now_arrays_maps);
      console.log(now_labels_map);
}

function check(){
      if(now_labels_map["result"][0] == now_labels_map["key"][0] && now_labels_map["result"][1] == now_labels_map["key"][1])
            return true;
      else return false;
}

/**
 * 判断元素是否可以向上移动,不能为key
 * @param {obj.getAttribute("class") == "blocks blocks-21" || obj.getAttribute("class") == "blocks blocks-31")} obj 
 */
function canMoveW(obj){
      let obj_id = obj.getAttribute("id"); // 213?
      let k_id = obj_id.substring(0,2),index =  obj_id.substring(2,3); // 21 3
      let x = now_labels_map[k_id][index][0],y = now_labels_map[k_id][index][1]; // 2 , 2
      //只判断上,检测开始索引上方值是否存在，存在是否为0
      if(x == 0 ){ //最上方，无法上移
            console.log("最上方，无法上移");
            return false;
      }
      else if(now_arrays_maps[x-1][y] != 0){ //上移位置有其他块存在
            console.log("上移位置有其他块存在");
            return false;
      }
      else{//可以移动，修改now_arrays_maps,now_labels_map
            now_labels_map[k_id][index][0] -= 1;
            now_arrays_maps[x-1][y] = parseInt(obj_id);
            if(k_id === "21"){
                  now_arrays_maps[x+1][y] = 0;  //这一条不同
            }
            if(k_id === "31"){
                  now_arrays_maps[x+2][y] = 0;
            }
            return true;
      }
}
/**
 * 判断元素是否可以向下移动
 * @param {obj.getAttribute("class") == "blocks blocks-21" || obj.getAttribute("class") == "blocks blocks-31")} obj 
 */
function canMoveS(obj){
      let obj_id = obj.getAttribute("id"); // 213?
      let k_id = obj_id.substring(0,2),index =  obj_id.substring(2,3); // 21 3
      let x = now_labels_map[k_id][index][0],y = now_labels_map[k_id][index][1]; // 2 , 2
      //只判断下,检测开始索引下方值是否存在，存在是否为0
      if(k_id === "21"){
            if(x == 4 ){ //最下方，无法下移
                  console.log("最下方，无法下移");
                  return false;
            }
            else if(now_arrays_maps[x+2][y] != 0){ //下移位置有其他块存在
                  console.log("下移位置有其他块存在");
                  return false;
            }
            else{//可以移动，修改now_arrays_maps,now_labels_map
                  now_labels_map[k_id][index][0] += 1;
                  now_arrays_maps[x][y] = 0;  
                  now_arrays_maps[x+2][y] = parseInt(obj_id);
            }
      }
      if(k_id === "31"){
            if(x == 3 ){ //最下方，无法下移
                  console.log("最下方，无法下移");
                  return false;
            }
            else if(now_arrays_maps[x+3][y] != 0){ //下移位置有其他块存在
                  console.log("下移位置有其他块存在");
                  return false;
            }
            else{//可以移动，修改now_arrays_maps,now_labels_map
                  now_labels_map[k_id][index][0] += 1;
                  now_arrays_maps[x][y] = 0;  
                  now_arrays_maps[x+3][y] = parseInt(obj_id);
            }
      }
      return true;
}
/**
 * 判断元素是否可以向左移动
 * @param {e.keyCode==37 && (control_obj.getAttribute("class") == "blocks blocks-12" || control_obj.getAttribute("class") == "blocks blocks-13"
 || control_obj.getAttribute("id") == "key"))} obj 
 */ 
function canMoveA(obj){
      let obj_id = obj.getAttribute("id"); // 213?
      if(obj_id != "key"){
            let k_id = obj_id.substring(0,2),index =  obj_id.substring(2,3); // 21 3
            let x = now_labels_map[k_id][index][0],y = now_labels_map[k_id][index][1]; // 2 , 2
            //只判断左,检测开始索引左方值是否存在，存在是否为0
            if(y == 0 ){ //最左方，无法左移
                  console.log("最左方，无法左移");
                  return false;
            }
            else if(now_arrays_maps[x][y-1] != 0){ //左移位置有其他块存在
                  console.log("左移位置有其他块存在");
                  return false;
            }
            else{ //可以移动，修改now_arrays_maps,now_labels_map
                  now_labels_map[k_id][index][1] -= 1;
                  now_arrays_maps[x][y-1] = parseInt(obj_id);  
                  if(k_id === "12"){
                        now_arrays_maps[x][y+1] = 0;
                  }
                  if(k_id === "13"){
                        now_arrays_maps[x][y+2] = 0;
                  }
            }
      }
      else {
            let x = now_labels_map[obj_id][0],y = now_labels_map[obj_id][1]; // 2 , 2
            if(y == 0 ){ //最左方，无法左移
                  console.log("最左方，无法左移");
                  return false;
            }
            else if(now_arrays_maps[x][y-1] != 0){ //左移位置有其他块存在
                  console.log("左移位置有其他块存在");
                  return false;
            }
            else{ //可以移动，修改now_arrays_maps,now_labels_map
                  now_labels_map[obj_id][1] -= 1;
                  now_arrays_maps[x][y-1] = -1;  
                  now_arrays_maps[x][y+1] = 0;
            }
      }
      return result;   
}
/**
 * 判断元素是否可以向右移动
 * @param {e.keyCode==37 && (control_obj.getAttribute("class") == "blocks blocks-12" || control_obj.getAttribute("class") == "blocks blocks-13"
 || control_obj.getAttribute("id") == "key"))} obj 
 */ 
function canMoveD(obj){
      let obj_id = obj.getAttribute("id"); // 213?
      if(obj_id != "key"){
            let k_id = obj_id.substring(0,2),index =  obj_id.substring(2,3); // 21 3
            let x = now_labels_map[k_id][index][0],y = now_labels_map[k_id][index][1]; // 2 , 2
            //只判断右,检测开始索引右方值是否存在，存在是否为0
            if(y == 4 ){ //最右方，无法右移
                  console.log("最右方，无法右移");
                  return false;
            }
            else{ 
                  if(k_id === "12"){
                        if(y == 4 ){ //最右方，无法右移
                              console.log("最右方，无法右移");
                              return false;
                        }
                        else if(now_arrays_maps[x][y+2] != 0){ //右移位置有其他块存在
                              console.log("右移位置有其他块存在");
                              return false;
                        }
                        else{//可以移动，修改now_arrays_maps,now_labels_map
                              now_labels_map[k_id][index][1] += 1;
                              now_arrays_maps[x][y] = 0;  
                              now_arrays_maps[x][y+2] = parseInt(obj_id);
                        }
                  }
                  if(k_id === "13"){
                        if(y == 3 ){ //最右方，无法右移
                              console.log("最右方，无法右移");
                              return false;
                        }
                        else if(now_arrays_maps[x][y+3] != 0){ //右移位置有其他块存在
                              console.log("右移位置有其他块存在");
                              return false;
                        }
                        else{//可以移动，修改now_arrays_maps,now_labels_map
                              now_labels_map[k_id][index][1] += 1;
                              now_arrays_maps[x][y] = 0;  
                              now_arrays_maps[x][y+3] = parseInt(obj_id);
                        }
                  }
                  return true;
            }
      }
      else {
            let x = now_labels_map[obj_id][0],y = now_labels_map[obj_id][1]; // 2,0
            if(y == 4 ){ //最右方，无法右移
                  console.log("最右方，无法右移");
                  return false;
            }
            else if(now_arrays_maps[x][y+2] != 0){ //右移位置有其他块存在
                  console.log("右移位置有其他块存在");
                  return false;
            }
            else{ //可以移动，修改now_arrays_maps,now_labels_map
                  now_labels_map[obj_id][1] += 1;
                  now_arrays_maps[x][y] = 0;  
                  now_arrays_maps[x][y+2] = -1;
                  return true;
            }
      } 
}

function changeMap(){
      if(now_map_name == "map1.png")
            now_map_name = "map2.png";
      else if(now_map_name == "map2.png")
            now_map_name = "map3.png";
      else if(now_map_name == "map3.png")
            now_map_name = "map1.png";
      alert("当前地图:" + now_map_name);
}

//重置地图数据
function restart(){
      if(now_map_name == "map1.png"){
            labels_map1 =
            {"12":[2,[0,1],[5,0]],
            "21":[6,[0,4],[1,5],[2,2],[2,3],[3,1],[4,2]],
            "13":[1,[1,1]],
            "31":[0],
            "result":[2,4],
            "key":[2,0]}
            now_labels_map = labels_map1;
            arrays_map1 =  
            [     [ 0, 121, 121, 0,  211, 0 ], 
                  [ 0, 131, 131, 131,   211, 212 ],
                  [-1, -1, 213, 214,  0,  212 ],
                  [ 0, 215,213, 214, 0, 0 ],
                  [ 0, 215,  216, 0, 0, 0 ],
                  [ 122,122, 216, 0, 0, 0 ] ];
            now_arrays_maps = arrays_map1;
            now_control_obj = null;
      }
      else if(now_map_name == 'map2.png'){
            labels_map2 =
            {"12":[2,[0,0],[4,4]],
            "21":[1,[4,0]],
            "13":[1,[5,2]],
            "31":[3,[1,0],[1,3],[0,5]],
            "result":[2,4],
            "key":[2,1]}
            now_labels_map = labels_map2;
            arrays_map2 =  
            [     [ 121, 121, 0, 0,  0, 313 ], 
            [ 311, 0, 0, 312,  0, 313 ],
            [ 311,-1,-1, 312,  0, 313 ],
            [ 311, 0, 0, 312,  0, 0 ],
            [ 211, 0, 0, 0,   121, 121 ],
            [ 211, 0, 131, 131, 131, 0 ] ];
            now_arrays_maps = arrays_map2;
            now_control_obj = null;
      }
      else if(now_map_name == 'map3.png'){
            labels_map3 =
            {"12":[1,[3,0]],
            "21":[3,[0,0],[0,2],[4,1]],
            "13":[3,[0,3],[1,3],[5,2]],
            "31":[1,[2,3]],
            "result":[2,4],
            "key":[2,0]}
            now_labels_map = labels_map3;
            arrays_map3 =  
            [     [ 211, 0, 212, 131, 131, 131 ], 
            [ 211, 0, 212, 132, 132, 132 ], 
            [ -1, -1, 0, 311, 0, 0 ], 
            [121,121, 0, 311, 0, 0 ], 
            [ 0, 213, 0, 311, 0, 0 ], 
            [ 0, 213, 133, 133, 133, 0 ],  ];
            now_arrays_maps = arrays_map3;
            now_control_obj = null;
      }
}

// 重置地图并生成新地图
function restartMap(){
      restart();
      createMap();
}

//建立地图
function createMap(picture){
      console.log("!");
      now_map_name = picture;
      restart();
      switch(now_map_name){
            case "map1.png":
                  now_labels_map = labels_map1;
                  now_arrays_maps = arrays_map1;
                  break;
            case "map2.png":
                  now_labels_map = labels_map2;
                  now_arrays_maps = arrays_map2;
                  break;
            case "map3.png":
                  now_labels_map = labels_map3;
                  now_arrays_maps = arrays_map3;
                  break;
      }
      document.getElementById("huarongdao").innerHTML="";
      var frag = document.createDocumentFragment();
      var keys =  document.createElement("div");
      keys.setAttribute("id", "key");
      for(let key in now_labels_map){
            //  console.log(key + '--' + now_labels_map[key][0] + "\n")
            //  for(var i = 1;i <= now_labels_map[key][0];++i)
            //       console.log(key + '--' + now_labels_map[key][i])
            if(key == "key"){
                  keys.setAttribute("style","top: "+  now_labels_map["key"][0] * w   + "px;left: " + now_labels_map["key"][1] * h+"px;"); //top：距离整体顶部 left：距离左边
                  frag.appendChild(keys);
            }
            if(key != "result" && key != "key"){
                  // console.log(key);
                  for(var i = 1 ;i <= now_labels_map[key][0];++i){
                        var pic = document.createElement("div");
                        //多个class中间加空格就行
                        pic.setAttribute("class", "blocks blocks-"+key);
                        pic.setAttribute("id", key+i);
                        pic.setAttribute("style","top: "+  now_labels_map[key][i][0] * w   + "px;left: " + now_labels_map[key][i][1] * h+"px;" //top：距离整体顶部 left：距离左边
                        )
                        frag.appendChild(pic);
                  }
            }
      }
      document.getElementById("huarongdao").appendChild(frag);
      setMove_byClass("blocks");
}

function setMove_byClass(blockClass){
      var objs = document.getElementsByClassName(blockClass);
      // console.log(blockClass);
      if(objs != null){
            for( var i = 0; i < objs.length;i+=1){
                  //console.log(objs[i].id);
                  setMove_byId(objs[i].id);
            }
      }
      else console.log("无法找到增加响应的元素组");
      setMove_byId("key");
}

// 添加移动响应
function setMove_byId(blockId){
      // console.log("进入响应");
      var obj = document.getElementById(blockId);
      if(obj != null){
            obj.onclick = (function(){
                  // console.log(obj.getAttribute("id"),getComputedStyle(obj).border); 
                  if(getComputedStyle(obj).border === "1px solid rgb(255, 255, 255)")
                        obj.style.border = "2px solid rgb(255, 0, 0)";
                  removeControl(now_control_obj); //解除控制
                  control(obj);
                  now_control_obj = obj;
            });
      }
      else console.log("无法找到增加响应的元素");
}

/**
 * 键盘控制元素上下左右移动，注意这里是通过控制内嵌style来实现控制
 * @param {*} control_obj 控制的元素对象
 */
function control(control_obj){
      console.log("control"); 
      if(control_obj != null){
            //对document设置键盘监听
            document.onkeydown= function(event){
                  // console.log(control_obj.getAttribute("id")); 
                  var e = event || window.event || arguments.callee.caller.arguments[0];
                  // console.log(control_obj.getAttribute("class"));
                  if(e && e.keyCode==38 && (control_obj.getAttribute("class") == "blocks blocks-21" || control_obj.getAttribute("class") == "blocks blocks-31")){ //上移减100px
                        if(canMoveW(control_obj))
                              control_obj.style.top = (+control_obj.style.top.replace("px","")-100) + "px";
                        //console.log('38=上键 '+ control_obj.style.top.replace("px",""));        
                  }
                  else if(e && e.keyCode==40 && (control_obj.getAttribute("class") == "blocks blocks-21" || control_obj.getAttribute("class") == "blocks blocks-31")){
                        if(canMoveS(control_obj))
                              control_obj.style.top = (+control_obj.style.top.replace("px","")+100) + "px";
                        //console.log('40=下键 '+control_obj.style.top.replace("px",""));
                  }
                  else if(e && e.keyCode==37 && (control_obj.getAttribute("class") == "blocks blocks-12" || control_obj.getAttribute("class") == "blocks blocks-13"
                  || control_obj.getAttribute("id") == "key")){ //左移减100px
                        if(canMoveA(control_obj))
                              control_obj.style.left = (+control_obj.style.left.replace("px","")-100) + "px";
                        //console.log('37=左键 '+control_obj.style.left.replace("px",""))
                  }
                  else if(e && e.keyCode==39 && (control_obj.getAttribute("class") == "blocks blocks-12" || control_obj.getAttribute("class") == "blocks blocks-13"
                  || control_obj.getAttribute("id") == "key")){
                        if(canMoveD(control_obj))
                              control_obj.style.left = (+control_obj.style.left.replace("px","")+100) + "px";
                        //console.log('39=右键 '+control_obj.style.left.replace("px",""))
                  }

                  if(check()){
                        alert("成功！");
                        switch(now_map_name){
                              case "map1.png":
                                    window.location.href="didianxuanze.html";
                                    break;
                              case "map2.png":
                                    window.location.href="toushenkangyi.html";
                                    break;
                              case "map3.png":
                                    window.location.href="zhuanfaweibo.html";
                                    break;
                        }
                  }
                  
            }; 
      }
}

function removeControl(control_obj){
      if(control_obj != null){
            if(getComputedStyle(control_obj).border === "2px solid rgb(255, 0, 0)")
                  control_obj.style.border = "1px solid rgb(255, 255, 255)";
            control_obj.onkeydown = null;
      }
}
