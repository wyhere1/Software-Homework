//中间、左右骰子的状态
var State = 0, lState = 1, rState = 1;
//左右九宫格的分数
var leftScore =0, rightScore = 0;
var index;
var i = 0;
lArrays = ["./img/saizi/0.jpg","./img/saizi/l1.jpg","./img/saizi/l2.jpg","./img/saizi/l3.jpg",
    "./img/saizi/l4.jpg","./img/saizi/l5.jpg","./img/saizi/l6.jpg"]
rArrays = ["./img/saizi/0.jpg","./img/saizi/r1.jpg","./img/saizi/r2.jpg","./img/saizi/r3.jpg",
    "./img/saizi/r4.jpg","./img/saizi/r5.jpg","./img/saizi/r6.jpg"]

// 投掷骰子事件
function diceClick() {
    // alert(document.getElementById("diceId").src)
    if (State === 0 && lState === 1 && rState === 1) {
        // 随机骰子
        ds = ["./img/saizi/0.jpg","./img/saizi/1.jpg","./img/saizi/2.jpg","./img/saizi/3.jpg",
            "./img/saizi/4.jpg","./img/saizi/5.jpg","./img/saizi/6.jpg"]
        index =  Math.floor(Math.random() * 6 + 1)
        document.getElementById("diceId").src = ds[index]
        //中间状态置为1
        State = 1
        // 偶数可点击左九宫格，奇数可点击右九宫格
        if (i % 2 === 0) {
            i++
            lState = 0
            rState = 1
            // 边框
            document.getElementById("left").style.border = " 5px solid rgb(28 100 184)"
        } else {
            i++
            lState = 1
            rState = 0

            nextlocat();
        }
    }
}
//AI对战
function nextlocat(){
    //中间的骰子摇过 且此处可以点击
    //lwin rwin存骰子的点数
    let lwin = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    let rwin = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    let temp = [-1, -1, -1];


    for(let x = 1; x < 4; x++) {
        for (let y = 1; y < 4; y++) {
            // 记录左格子
            stringNum = (document.getElementById("左" + x + "." + y).src).match(/img\/saizi\/.?([0-6])\.jpg/i)[1]
            lwin[x - 1][y - 1] = Number(stringNum)
            // 记录右格子
            stringNum = (document.getElementById("右" + x + "." + y).src).match(/img\/saizi\/.?([0-6])\.jpg/i)[1]
            rwin[x - 1][y - 1] = Number(stringNum)
        }
    }
    console.log(lwin)
    console.log(rwin)
    /**打分制   
     * 先确定有哪些行可以用
     * 1、如果摇出的骰子大于等于4 
     *       跟人类方的九宫格对应行有可以消掉 加分*10
     *       不能的话 则正常加分
     * 2、如果摇出的骰子小于等于3
     *       跟人类方的九宫格对应行有可以消掉 正常加分
     *       不能的话 则加分*5
     * 
     * 理由
     *      让较小的骰子留在人类九宫格中 不去消掉
     *      尽可能消掉人类的较大的骰子 让其留在AI
     *      
    */
    for(let x = 1; x < 4; x++) {
        for (let y = 1; y < 4; y++) {
            if (rwin[x - 1][y - 1] === 0) {
                temp[x - 1] = 0;
            }
        }
    }
    console.log(temp+111);
    for(let x = 1; x < 4; x++) {
        if (temp[x - 1] >= 0) {
            for (let y = 1; y < 4; y++) {
                if (index >= 4) {
                    if (lwin[x - 1][y - 1] === index) {
                        temp[x -  1] += index * 10;
                    } else {
                        temp[x -  1] += lwin[x - 1][y - 1];
                    }
                } else {
                    if (lwin[x - 1][y - 1] === index) {
                        temp[x -  1] += index ;
                    } else {
                        temp[x -  1] += lwin[x - 1][y - 1] * 5;
                    }
                }
            }
        }
    }
    console.log(temp+222);
    let max = temp[0], num1 = 1, num2 = 1;
    for(let x = 1; x < 4; x++) {
        if (max < temp[x - 1]) {
            max = temp[x - 1];
            num1 = x;
        }
    }
    for (let y = 1; y < 4; y++) {
        if (rwin[num1 - 1][y - 1] === 0) {
            num2 = y;
        }
    }
    console.log("num1:"+num1+"  num2:"+num2);


    let id = "右" + num1 + "." + num2
    console.log(id)
    //将摇到的骰子放到格子中
    document.getElementById(id).src = rArrays[index]
    //消去左边骰子
    n = document.getElementById(id).id.match(/右([1-6].)/i)[1]
    idName = "左" + n
    for (j = 1; j < 4 ; j++) {
        if((document.getElementById(idName + j).src).match (/img\/saizi\/.?([0-6])\.jpg/i)[1] == index){
            document.getElementById(idName + j).src = lArrays[0]
        }
    }

    lrCount()
    rState = 1
    State = 0;

    if (ifend("右")===false) {
        diceClick()
    }
}
// 处理左右九宫格点击 放置骰子
function locatDice(id){
    //中间的骰子摇过 且此处可以点击
    if (State === 1 &&  (document.getElementById(id).src).match(/0.jpg/i) ) {
        //点击左边九宫格
        if(lState === 0 && rState === 1){
            if ((document.getElementById(id).id).match(/左/i)){
                //将摇到的骰子放到格子中
                document.getElementById(id).src = lArrays[index]
                //消去右边骰子
                n = document.getElementById(id).id.match(/左([1-6].)/i)[1]
                idName = "右" + n
                for (j = 1; j < 4 ; j++) {
                    if((document.getElementById(idName + j).src).match (/img\/saizi\/.?([0-6])\.jpg/i)[1] == index){
                        document.getElementById(idName + j).src = rArrays[0]
                    }
                }

                lrCount()
                lState = 1
                State = 0;
                if (ifend("左")===false) {
                    diceClick()
                }
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

                lrCount()
                rState = 1
                State = 0;

                if (ifend("右")===false) {
                    diceClick()
                }
            }
        }
    }
}
//计算左右分数
function lrCount() {
    leftScore = 0
    rightScore = 0
    var lscore = []
    var rscore = []
    for(var x = 1; x < 4; x++){
        for(var y = 1; y < 4; y++){
            //计算左格子
            stringNum = (document.getElementById("左" + x + "." + y).src).match (/img\/saizi\/.?([0-6])\.jpg/i)[1]
            lscore[y-1] =Number(stringNum)
            // 计算右格子
            stringNum = (document.getElementById("右" + x + "." + y).src).match (/img\/saizi\/.?([0-6])\.jpg/i)[1]
            rscore[y-1] =Number(stringNum)

        }
        leftScore += readCount(lscore)
        rightScore += readCount(rscore)
    }
    document.getElementById("leftScore").innerHTML = leftScore;
    document.getElementById("rightScore").innerHTML = rightScore;
}
//分数统计
function readCount(score) {
    let lrScore = 0;
    // 一行三个数显相等，或者全部相等，或者两个相等
    if(score[0] == score[1] && score[1] == score[2]){
        lrScore += score[0]*9
    }else if (score[0] != score[1] && score[0]!= score[2] && score[1]!= score[2]){
        lrScore += score[0] + score[1] + score[2]
    }else{
        if(score[0] == score[1]){
            lrScore += score[0] * 4 + score[2]
        }else if(score[0] == score[2]){
            lrScore += score[0] * 4 + score[1]
        }else{
            lrScore += score[1] * 4 + score[0]
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
        obj['res'] = "左方胜利"
    }else if(leftScore < rightScore) {
        obj['res'] = "右方胜利"
    }else{
        obj['res'] = "双方平局"
    }

    document.querySelector(".result-header").innerHTML = `<div>${obj['titile']}</div>`;
    document.querySelector(".result-body").innerHTML = `<div>${obj['content']}</div>`;
    document.querySelector(".result-result").innerHTML = `<div>${obj['res']}</div>`;

    //游戏结束 取消点击事件
    document.getElementById('diceId').onclick = null;
    //音乐切换
    musiccontrol=document.querySelector('.musiccontrol')    //对应audio标签
    musicsource= document.querySelector('.musicsource')    //对应source标签

    musiccontrol.pause()
    musicsource.src="./mp3/Yukari Fresh - Cat.mp3"
    musiccontrol.load()
    musiccontrol.play()
}