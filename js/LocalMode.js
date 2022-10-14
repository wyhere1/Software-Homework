//中间、左右骰子的状态
var State = 0, lState = 1, rState = 1;
//左右九宫格的分数
var leftScore =0, rightScore = 0;
var index;
var i = 0;
lArrays = ["./img/saizi/0.jpg","./img/saizi/l1.jpg","./img/saizi/l2.jpg","./img/saizi/l3.jpg",
    "./img/saizi/l4.jpg","./img/saizi/l5.jpg","./img/saizi/l6.jpg"];
rArrays = ["./img/saizi/0.jpg","./img/saizi/r1.jpg","./img/saizi/r2.jpg","./img/saizi/r3.jpg",
    "./img/saizi/r4.jpg","./img/saizi/r5.jpg","./img/saizi/r6.jpg"];

// 投掷骰子事件
function diceClick() {
    // alert(document.getElementById("diceId").src)
    if (State === 0 && lState === 1 && rState === 1) {
        // 随机骰子
        ds = ["./img/saizi/0.jpg","./img/saizi/1.jpg","./img/saizi/2.jpg","./img/saizi/3.jpg",
            "./img/saizi/4.jpg","./img/saizi/5.jpg","./img/saizi/6.jpg"];
        index =  Math.floor(Math.random() * 6 + 1);
        document.getElementById("diceId").src = ds[index];
        //中间状态置为1
        State = 1;
        // 余数0可点击左九宫格，余数1可点击右九宫格
        if (i % 2 === 0) {
            i++;
            lState = 0;
            rState = 1;
            // 边框
            document.getElementById("left").style.border = "5px solid rgb(28 100 184)";
        } else {
            i++;
            lState = 1;
            rState = 0;
            // 边框
            document.getElementById("right").style.border = "5px solid rgb(28 100 184)"
        }
    }
}
// 处理左右九宫格点击 放置骰子
function locatDice(id){
    if (State === 1 &&  (document.getElementById(id).src).match(/0.jpg/i) ) {
        if(lState === 0 && rState === 1){
            if ((document.getElementById(id).id).match(/左/i)) {
                //
                document.getElementById(id).src = lArrays[index];
                //消去右边骰子
                n = document.getElementById(id).id.match(/左([1-6].)/i)[1];
                idName = "右" + n;
                for (j = 1; j < 4 ; j++) {
                    if((document.getElementById(idName + j).src).match (/img\/saizi\/.?([0-6])\.jpg/i)[1] == index){
                        document.getElementById(idName + j).src = rArrays[0];
                    }
                }

                lrCount();
                lState = 1;
                State = 0;
                if (ifend("左")===false) {
                    diceClick();
                }
                //取消边框
                document.getElementById("left").style.border = "";
            }

        }else{
            if ((document.getElementById(id).id).match(/右/i)){
                document.getElementById(id).src = rArrays[index]
                //消去左边骰子
                n = document.getElementById(id).id.match(/右([1-6].)/i)[1]
                idName = "左" + n
                for (j = 1; j < 4 ; j++) {
                    if((document.getElementById(idName + j).src).match (/img\/saizi\/.?([0-6])\.jpg/i)[1] == index){
                        document.getElementById(idName + j).src = lArrays[0]
                    }
                }

                lrCount();
                rState = 1;
                State = 0;

                if (ifend("右")===false) {
                    diceClick();
                }
                document.getElementById("right").style.border = "";
            }
        }
    }
}
//计算左右分数

function lrCount() {
    leftScore = 0;
    rightScore = 0;
    var lscore = [];
    var rscore = [];
    for(var x = 1; x < 4; x++){
        for(var y = 1; y < 4; y++){
            //计算左格子
            stringNum = (document.getElementById("左" + x + "." + y).src).match (/img\/saizi\/.?([0-6])\.jpg/i)[1]
            lscore[y-1] =Number(stringNum)
            // 计算右格子
            stringNum = (document.getElementById("右" + x + "." + y).src).match (/img\/saizi\/.?([0-6])\.jpg/i)[1]
            rscore[y-1] =Number(stringNum)

        }
        leftScore += readCount(lscore);
        rightScore += readCount(rscore);
    }
    document.getElementById("leftScore").innerHTML = leftScore;
    document.getElementById("rightScore").innerHTML = rightScore;
}
//分数统计
function readCount(score) {
    let lrScore = 0;
    // 一行三个数三个相等，或者都不相等，或者两个相等
    if(score[0] == score[1] && score[1] == score[2]){
        lrScore += score[0]*9
    }else if (score[0] != score[1] && score[0]!= score[2] && score[1]!= score[2]){
        lrScore += score[0] + score[1] + score[2]
    }else{
        if(score[0] == score[1]){
            lrScore += score[0] * 4 + score[2];
        }else if(score[0] == score[2]){
            lrScore += score[0] * 4 + score[1];
        }else{
            lrScore += score[1] * 4 + score[0];
        }
    }
    return lrScore;
}
//判断是否结束
function ifend(site){
    // 如果有各自骰子为0，退出函数
    for(var x = 1; x < 4; x++){
        for(var y = 1; y < 4; y++){
            if(((document.getElementById(site + x + "." + y).src).match (/img\/saizi\/.?([0-6])\.jpg/i)[1]) == "0") {
                return false;
            }
        }
    }

    //显示最终结果
    const obj = {
        titile: '游戏结束',
        content: leftScore + ":" + rightScore,
        res: '',
    }

    if(leftScore > rightScore) {
        obj['res'] = "左方胜利";
    }else if(leftScore < rightScore) {
        obj['res'] = "右方胜利";
    }else{
        obj['res'] = "双方平局";
    }

    document.querySelector(".result-header").innerHTML = `<div>${obj['titile']}</div>`;
    document.querySelector(".result-body").innerHTML = `<div>${obj['content']}</div>`;
    document.querySelector(".result-result").innerHTML = `<div>${obj['res']}</div>`;

    //游戏结束 取消点击事件
    document.getElementById('diceId').onclick = null;

    //音乐切换
    musiccontrol=document.querySelector('.musiccontrol');  //对应audio标签
    musicsource= document.querySelector('.musicsource');  //对应source标签

    musiccontrol.pause();
    musicsource.src = "./mp3/Yukari Fresh - Cat.mp3";
    musiccontrol.load();
    musiccontrol.play();
}

