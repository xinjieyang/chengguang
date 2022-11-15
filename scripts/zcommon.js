let textControl = document.getElementById('text_control');
let background = document.getElementById('bg');

//转发微博后
// function show00(){
//     typing("content","您已转发微博，被同学们询问疾病的详细信息，由于自己只是略微了解，很多同学们的问题都不清楚，所以没有办法回答，同学们心里你的可信度降低了！");
//     textControl.innerHTML = '<button id="btn_text" type="button" onclick="show01()">继续</button>';
// }

//转发微博后，继续
function show01(){
    background.src = "images\\zhiyuanzhezhaomu.jpg";
    typing("content","在疫情期间，你听说了wuhan2020志愿者活动。你是否参加活动？");
    setInnerHTML('<button id="btn_text1" type="button" onclick="show02()">参加</button> <button id="btn_text2" type="button" onclick="show03()">不参加</button>');
}

function show02(){
    typing("content","因为自己在疫情期间，通过志愿者活动贡献了属于自己的一份力量，所以大家对你的印象又提升了，很感谢你对抗疫的一份付出！");
    setInnerHTML('<button id="btn_text" type="button" onclick="finish()">结束</button>');
}

function show03(){
    typing("content","时间流转，由于自己在疫情期间又发布了很多无法证明真实性的言论，所以在同学之间的可信度也越来越低了！");
    setInnerHTML('<button id="btn_text" type="button" onclick="finish()">结束</button>');
}

//参加了wuhan2020志愿者活动
// function show04(){
//     background.src = "images\\zwuhan2020.jpeg";
//     typing("content","您参加了wuhan2020志愿者活动，为武汉抗疫增加了属于自己的一份力量！");
//     setInnerHTML('<button id="btn_text" type="button" onclick="show05()">继续</button>');
// }

function show05(){
    background.src = "images\\songbie.jpg";
    typing("content","最近舆论导向就一位最先开始的医生就发出警告却签署了协议书一事，将其与其余8名人员一同誉为“吹哨人”！看到这一舆论信息，你觉得合理吗？");
    setInnerHTML('<button id="btn_text1" type="button" onclick="show06()">合理</button> <button id="btn_text2" type="button" onclick="show07()">不合理</button>');
}

function show06(){
    typing("content","医生被誉为吹哨人倒也合理，可是另外8个人无凭无据的胡言乱语，不该有此美誉。");
    setInnerHTML('<button id="btn_text" type="button" onclick="finish()">结束</button>');
}

function show07(){
    typing("content","这九个人早就警告过了，却还要签署协议书，对别人太不公了吧！由于情绪激动，在朋友圈表达了自己情绪上的不满……");
    setInnerHTML('<button id="btn_text" type="button" onclick="show08()">继续</button>');
}

function show08(){
    typing("content","被朋友询问，如果医生是以专业的眼光看待问题而得到的结论，那么其余几个人是如何一口断定危险的呢？凭借臆想吗？");
    setInnerHTML('<button id="btn_text" type="button" onclick="show09()">反思</button>');
}

function show09(){
    typing("content","觉得自己朋友的言论有道理而撤销了自己的言论，同时还为自己的盲目相信舆论而没有独立思考感到羞耻！自己更加努力的为志愿者活动付出，在几周后，最紧张的阶段结束，志愿活动也圆满收官了！");
    setInnerHTML('<button id="btn_text" type="button" onclick="show10()">几天后</button>');
}

function show10(){
    background.src = "images\\zhiyuanzhengming.jpeg";
    typing("content","你收到了一份志愿者活动举办商的感谢和志愿证明，感谢在疫情期间为了每个人所作出的付出！");
    setInnerHTML('<button id="btn_text" type="button" onclick="finish()">结束</button>');
}

function setInnerHTML(innerHTML) {
    textControl.innerHTML = innerHTML;
}

function typing (elementID, text) {
    let element = document.getElementById(elementID);
    let i = 0;

    function typeText(){
        if(i < text.length){
            element.innerHTML = text.slice(0, i++) + '_';
            typer = setTimeout(typeText, 50);
        }
        else{
            element.innerHTML = text;
        }
    }
    typeText();
}

function finish(){
    window.location.href='over.html';
}