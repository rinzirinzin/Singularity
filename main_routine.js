// シンギュラリティータイピング メインルーチン
'use strict';

//問題ファイル名の取得
let Q = filename();

//変数定義
let Q_No = Math.floor( Math.random() * Q.length);//問題をランダムで出題する
let Q_i = 0;//回答初期値・現在単語どこまで合っているか判定している文字番号
let Q_l = Q[Q_No].length;//計算用の文字の長さ
let good_score = 0; //正解数
let bad_score = 0; //不正解数
let ohuzake = 0; //けしからん
let initsw = true; //初回のみ動作するように
let gamesw = false; //
let state = true; //キーの受付を管理
let ju = true;
let esc = false;

let timePassed = 0; //時間経過のパラメータ
let start_time = 0;
let limtime = 60000; //制限時間[ms]

//仕事中に関するパラメータ
let up_push = false;
let down_push = false;
let left_push = false;
let right_push = false;
let alt_push = false;

//クリックボタン処理のパラメータ
let clickbtn = -1;

//音声ファイル https://soundeffect-lab.info/sound/button/  https://maou.audio/
let wadaiko1 = new Audio('./voice/wadaikod.mp3');
let wadaiko2 = new Audio('./voice/wadaikoddn.mp3');
let yeah = new Audio('./voice/yeahh.mp3');
let keytype = new Audio('./voice/cursor2.mp3');
let misstype = new Audio('./voice/cursor12.mp3');
let correct = new Audio('./voice/correct.mp3');
let buttonsound = new Audio('./voice/determine.mp3');
let startsound = new Audio('./voice/start.mp3');
let finishsound = new Audio('./voice/finish.mp3');
let bgm = new Audio('./voice/maou_bgm_cyber45.mp3');

//音声のボリューム
bgm.volume = 0.05;
wadaiko1.volume = 0.1;
wadaiko2.volume = 0.1;
yeah.volume = 0.1;
keytype.volume = 0.2; 
misstype.volume = 0.2; 
correct.volume = 0.1;
buttonsound.volume = 0.1;  
startsound.volume = 0.1;
finishsound.volume = 0.1;

//ロードしてる感を出す
loading();

//ボタンがクリックされた時の処理
function LinkCheck(clickbtn){
    esc = false;
    /*押されたボタン*/
    //console.log(btn);
    buttonsound.currentTime = 0;
    buttonsound.play();
    if(clickbtn === 1){
        document.getElementById("explain").innerHTML = '<img src="./exp.jpg" id="expimg"></img><button class="btn-5" Onclick="LinkCheck(4)" type="button"> Return </button>';
        document.getElementById('btn-list').innerHTML = "";
    }
    if(clickbtn === 2){
        init();
    }
    if(clickbtn === 3){
        reset();
    }
    if(clickbtn === 4){
        reset();
    }
    if(clickbtn === 0 || clickbtn === 2){
    state = false;
    //何かキーを押してくださいを削除
    document.getElementById("push").innerHTML = "";

    var count = 3; //カウントダウンの秒数
    $('#btn-list').fadeOut(500); 
    document.getElementById("imgg").src = "";

    setTimeout(function(){
    //カウントダウンの関数
    var countdown = function(){
    if (count === 0)
    {
        startsound.play();
        document.getElementById("push").innerHTML = "Start!!!";
    }
    else if(count >= 1){
        wadaiko1.currentTime = 0;
        wadaiko1.play();
        document.getElementById("push").innerHTML = count.toString();
    }

    count--;
    var id = setTimeout(countdown, 1000);
    if(count < -1){
        clearTimeout(id);
        initsw = false;
        //console.log(event);
        imgg.id = "img";
        start_time = Date.now();
        state = true
        bad_score -=1;
        document.getElementById("push").innerHTML = "";
        document.getElementById('btn-list').innerHTML = "";
        document.getElementById('footer').innerHTML = "Esc : Reset　　　　　　Backspace : Hint　　　　　Score = "+(Math.max(good_score*3 - bad_score,0)).toString();
        bgm.currentTime = 0;
        bgm.play();
        bgm.loop = true;
        //document.getElementById("footer").innerHTML = "";
        //console.log(esc);
        push_Keydown({
            key: 'Enter'
        });
    }
    }
    countdown();

    }, 500);
    }

}

/*クリック判定*/
window.addEventListener("keydown", push_Keydown);


//キーが押された時の挙動
function push_Keydown(event){
    //console.log(event);
    //console.log(gamesw);
    //console.log(state);
    console.log(event);
    ////仕事している感を出せるルーチン///////////////////
    document.addEventListener('keydown', (event) => {
        if(event.key == "ArrowUp"){
            up_push = true;
        }
        if(event.key == "ArrowDown"){
            down_push = true;
        }
        if(event.key == "ArrowLeft"){
            left_push = true;
        }
        if(event.key == "ArrowRight"){
            right_push = true;
        }
        if(event.key == "Alt"){
            alt_push = true;
        }
    });

    //隠しコマンド動作確認
    console.log(up_push,down_push,left_push,right_push,alt_push);
    
    //上下右左Altを押すとhtmlが切り替わる。
    if(up_push && down_push && left_push && right_push && alt_push) {
        reset();
        document.getElementById('body').innerHTML = '<img src="./image/work.png" id="nise_work"></img>'
        document.getElementById("title").innerHTML = "無題のスプレッドシート - Gooogle";
    }


    if(!state)
    {
        return;
    }
    else if((event.key === "Enter") && (gamesw === false)){
        if(ohuzake >= 60)
        {
            document.getElementById("gametitle").innerHTML = "";
            document.getElementById("push").innerHTML = "また今度!!";
            document.getElementById("start").innerHTML = "";
            state = false;
        }
        else{
            //countdown function
            gamesw = true;
            push_Keydown(event);
        }
    }
    else if(gamesw === false)
    {   
        //document.getElementById("push").innerHTML = "エンターキーを押してね!!";
        //document.getElementById("push").innerHTML = "Please click on the button below";
        ohuzake++;
        if(ohuzake >= 60)
        {
            //document.getElementById("push").innerHTML = "";
            document.getElementById("start").innerHTML = "ボタンを押さずにキーボードを<br>叩き続けた<br>score = 0<br>今度はボタンをちゃんと押してね。";
            document.getElementById('btn-list').innerHTML = "";
        }
    }
    else {
    
    //初回の処理
        if(initsw)
        {

        }
        else{
        //押したキーが格納される
        let keyCode = event.key;
        //console.log(start_time);

        let timer = setInterval(function() {
        // 開始からの経過時間は？
        timePassed = Date.now() - start_time;
        document.getElementById("limit_timer").innerHTML = '残り時間 : ' + ((1+(limtime-timePassed)/1000)|0).toString() + ' 秒';
        //console.log(timePassed,start_time);
        if (timePassed >= limtime) {
            if(esc){document.getElementById('limit_timer').innerHTML = ""; clearInterval(timer); }
            else{
                document.getElementById("limit_timer").innerHTML = '残り時間 : ' + 0 + ' 秒';
                clearInterval(timer); 
                finish();
            }
        }
    
        }, 20);

        if (Q_l == Q_l-Q_i){
            document.getElementById("img").src = "./image/" + Q[Q_No] + ".png";
        //document.getElementById("start").innerHTML = Q[Q_No].substring(Q_i, Q_l); //問題を書き出す
            document.getElementById("start").innerHTML = "";
        }

        if (Q[Q_No].charAt(Q_i) == keyCode) { //押したキーが合っていたら    
            Q_i++; //判定する文章に１足す
            document.getElementById("start").innerHTML = Q[Q_No].substring(0,Q_i)//, Q_l); //問題を書き出す
            good_score+=1;
            document.getElementById('footer').innerHTML = "Esc : Reset　　　　　　Backspace : Hint　　　　　Score = "+(Math.max(good_score*3 - bad_score,0)).toString();
            keytype.currentTime = 0;
            keytype.play();
            
        if (Q_l-Q_i === 0){ //全部正解したら
            correct.play();
            //init()
            //new Audio('ok.mp3').play(); // 音声再生;
            Q_No = Math.floor( Math.random() * Q.length);//問題をランダムで出題する
            Q_i = 0;    //回答初期値・現在どこまで合っているか判定している文字番号
            Q_l = Q[Q_No].length;   //計算用の文字の長さ
            document.getElementById("img").src="./image/" + Q[Q_No] + ".png";
            //document.getElementById("start").innerHTML = Q[Q_No].substring(Q_i, Q_l); //新たな問題を書き出す
            document.getElementById("start").innerHTML = "";
            if(Q_No%10 === 0){
                alert("あなたはロボットではないですよね？");
            }
        } else {
            //new Audio('good.mp3').play(); // 音声再生;
        }
        }
        else if(event.key === "Shift"){

        }
        else if(event.key === "Escape"){
            //esc = true;
            //init();
            reset();
            //LinkCheck(2);
        }
        else if(event.code === 'Backspace'){
            /* 単語の読み上げ */ //ヒントボタンを押すと反応
            var speak = new SpeechSynthesisUtterance();
            speak.text = Q[Q_No];
            speak.lang = 'en-US';
            speechSynthesis.speak(speak);
            /* 単語の読み上げ終わり */
        }
        else{
            if(bad_score >=1){
                misstype.currentTime = 0;
                misstype.play();
            }
            bad_score +=1;
            document.getElementById('footer').innerHTML = "Esc : Reset　　　　　　Backspace : Hint　　　　　Score = "+(Math.max(good_score*3 - bad_score,0)).toString();
        }
    }
    }

}


//終了処理
function finish() {
    bgm.pause();
    //console.log(esc);
    if (esc){esc=false;}
    else{
    state = false;
    if(ju){
    //console.log("終了処理");
    $('#btn-list').fadeIn(0); 
    img.id = "imgg";
    document.getElementById("imgg").src = "";
    finishsound.play();
    document.getElementById("push").innerHTML = "Finish !!!";
    document.getElementById("start").innerHTML = "";
    document.getElementById('footer').innerHTML = "<br>";
    document.getElementById("start").innerHTML = '<br>正解文字数 : ' + good_score.toString()+'<br><br>';
    document.getElementById("result").innerHTML = '不正解文字数 : ' + bad_score.toString() +'<br><br>';
    document.getElementById("result2").innerHTML = 'スコアは ' + (Math.max(good_score*3 - bad_score,0)).toString() + ' でした!!<br>';
    $('#start').hide();
    $('#result').hide();
    $('#result2').hide();
    setTimeout(function(){$('#limit_timer').hide(500)}, 2500);
    setTimeout(function(){$('#push').fadeOut(500);}, 2500);
    setTimeout(function(){$('#start').fadeIn(10); wadaiko1.play();}, 3000);
    setTimeout(function(){$('#result').fadeIn(10); wadaiko2.play();}, 4000);
    setTimeout(function(){$('#result2').fadeIn(10); yeah.play();}, 5000);
    setTimeout(function(){document.getElementById('btn-list2').innerHTML = '<table><tr><td><button class="btn-3 fadeIn" Onclick="LinkCheck(2)" type="button"> Retry </button></td> <td><button class="btn-4 fadeIn" Onclick="LinkCheck(3)" type="button"> Title </button></td></tr></table>';}, 6000);
    ju=false;
    }
    }
}

//画像のファイル名配列
function filename() {
    let Question =['02EfYqvPaG', '02se9', '03ZgGLy', '04IYfvfhEIjY', '0ArMJikO', '0D6GE4RQK3NS', '0DHYyL', '0e3MIioy', '0g7Ch2zUhbt', '0GzqpLX', '0hu2CV7JgNXy', '0jyJIUbNGFL', '0KgK6k0H', '0ksWNNj9', '0Lgv2PFOk', '0mbkoE', '0MFnQdwm0', '0N7KHbeluQ', '0n81mS', '0RfnX14vLbh', '0rgdIYyKLJ', '0SZ6WMM1x3c', '0udxKuxzYbFY', '0VhA2', '0Vl3bqp2i', '0vNvk2vHF8', '0WOYSK2', '0WPbDhRJT', '13Dydm8yaOh', '14Usm3tNlxw', '161yvIg3eF', '16Wiu26YsK', '17ldPy', '1886Z0aEJ9HY', '1AB3qY', '1BGJKZ', '1CG1mnx', '1dSWVBYNnJI', '1h6JdJysyI', '1hjI0n', '1HMgN8', '1i2dNPTMM', '1ibPg', '1irUPW', '1JK5owvSRc7p', '1MxR0dr', '1os8nFPlqefy', '1PsAYZcU0Bp', '1q3tUGcC', '1sUODhiYi', '1SXcgrHDNZH', '1tMx2q', '1uge5qhu1vZ', '1wx4T', '1xfgFO9gGRj', '1Xu4y', '1xVzlTCVxYC', '22jaS1st', '24w0JmB1g', '28MiGL1XZjr', '2B2Xxc1eBN', '2bBy4yYkl4U', '2BrMwn', '2c7PU13', '2Cji5', '2elpUE', '2eO6Nce1Qh2p', '2G3HR', '2IafPq', '2Jh9WYsgg2G', '2n1eVPdCW', '2or0faRkSK', '2pC0Prshb', '2pDBBg', '2pkHL6', '2QmSCdf', '2qrerGseQu4a', '2TkdeVNXz4', '2wMDWf', '2xCgPUA', '2zBzSWnqI0', '2zdiwktf6D', '31oyTkObmI', '33074qdS3iVS', '36p4C5M', '39NeoclDyeXa', '3becz1ac5Hp', '3CBLQQbmnF', '3cZqtZ1v4cr', '3DBt1ZY6fZ', '3ELla', '3GJfIgw', '3i7lTmwAzKt', '3iHyoUbl4R', '3JLI3', '3JmYT', '3jXfcs3z', '3kW3JKzG83UG', '3L5xn', '3mTAPrDJ2qKr', '3nkXpqNd', '3q1sBKveoqr4', '3rQ2zVua6', '3RVvg', '3TVCu5euW', '3uDhZe', '3UH45Npr', '3WPmeWk5VqA', '3XdaFRZe', '3yasW4wxjqh', '434Bu', '46vSgGiluYn', '47qynZ0RDuuI', '49Mz87f8bsp8', '4AeyFFNw8ib4', '4DTwm', '4EnXIiSo', '4joPECLP', '4lcucdujc', '4mC72TDKPJ', '4nFIQNyKt', '4QbcJWhSDYJ', '4rcoo', '4S4Rr', '4sDfkrZc', '4sY4MHqk0P00', '4urbb4V5XVx', '4V1YnEFYBU', '50x92Cb7G', '52JQwBkaAJft', '53gF6', '54Ky7Y4x', '57BK8a1', '57Qrj', '5AH0cY', '5ASapGtmB2Ec', '5bbyip4e1H', '5BGyGyWexd', '5ek7ZPVU34j9', '5eztSeOft', '5Fj6yMNiHGU', '5gvwl9', '5HOcn1WMd', '5HRLiiR8u', '5ixXxTc', '5JuT6EL82t', '5LIBho', '5mz2V40XCuiD', '5SelxkPEHH', '5tDnRRpGvH', '5tIFX', '5UeP0uW', '5Us8TH', '5Xjyami1y', '5YDO51Pn', '5yTIh8nvl', '5YwqGXn4', '62qIm9ZqHjz', '63mTMM', '65V11zrnOed', '66CBYnGy7', '6AlgWEP', '6aLJD93TCpLr', '6dkj7edrd', '6dmRC', '6Eh1x3pvy', '6EOa9TBKl', '6FwpCZO', '6Gj9AZO0D5GO', '6JddyeWU1uX1', '6lLQ4QMlKtq', '6Mbr4OxrFd', '6mr462UYQ62A', '6s4bMnXbO8l', '6t4bRhRcn79', '6T8Yy', '6tIV8xrgdOZ', '6TlUK', '6vE4eEHX', '6W8thA3', '6wdF60', '6YjWc', '74yYhKrU', '7bexVmewHa', '7CYnfE8jxIsw', '7Di8Ct', '7DuHG0HsWI2', '7J0lFH', '7keCbvqj', '7ljDtL8XoEb', '7mTg5', '7npsTi1', '7q6RfrePRtzk', '7qZG6vn', '7SvMYFmyMqh', '7T8vWqxqCz', '7wm7lVkIX84', '7wXO5gZ5', '7Z2ZMjBPEo', '81nRw', '81nsvolV2sl', '82I90OF', '87YYX', '898U9M', '89X3NfaOIr', '8AUc4ZPs', '8GDQkMTF4', '8GZHx', '8IaYHfTnjhQg', '8iJkD0', '8j40vfWSyt', '8JeNud', '8L3EIowNrdOb', '8lDIt2Gpdu', '8mAMIJyBC', '8oFhaBYHjxSW', '8p6uQPKnja', '8PJCq', '8qJoemhjGL', '8RGgz6mqz', '8swHOWO', '8UGCXE4w5a7', '8ulH3RL', '8VHtlSj', '8wFwyaFYAMI7', '8zZQZK4s', '91bvgMV', '92XmN', '957PTc4f', '95owQGrE', '98Ldp3', '99HtlQ1Ta', '9ah89e', '9DZWG027q', '9ehxWVxr6zR', '9g5daJ4Og', '9gcHU3Rg48', '9GfiyhnQp', '9gUnIKai5lI', '9HoGuuZBTMS', '9HQRN', '9kHc78BYmjo', '9ltZi', '9mk7gTF0', '9n8TrEsr0TaK', '9S95Oa', '9SjIueABAcP', '9SSuztr', '9T9g7', '9UbrXs5', '9VAEm', '9vsBI', '9xp01xAE2S', '9zQ76Yoihx', '9ZSFMOBq3', 'a1eqe', 'A5yN8Tam', 'A94w3Tvf', 'aAZ2571', 'AbQXIdW', 'actmZ', 'adMYp7', 'aEWloPcHk', 'AFt2cwxC93', 'aGeU4ys5', 'AjeMB3', 'aJNtLhtB8', 'amf71rqvIb', 'aMIDsX', 'ANrPW9i6if3', 'aqAmuG4Jy0', 'AqFD4', 'Ar4dqfQZEk', 'ArDOq', 'ArIPF5wa', 'aRUXkO', 'AsCio', 'Asmo0rX7HO5F', 'assKDfK', 'aUHBrqYf', 'Aw8qwh', 'aWPot3DOosG', 'AWVyVTVLhGj', 'AX62y7Fw', 'axJWLi', 'ayQuwmLAzbk', 'AYqwR2IT9PX', 'Az94aXw8', 'AZFL5tX', 'b0fnsg', 'b1LCUH', 'B2ANpfHE', 'B2aRRNP9SFOt', 'B5FPkp', 'b5SJZub4', 'b6kJ0bPLK6', 'BaCRkkwKhjKD', 'bB69U9PQJUdu', 'bBLU5R9F8', 'BBN7FkyTl', 'BbsLgl7Pndd', 'bbsV88H0v', 'BBWWR', 'bcpHf', 'bCs39JbR', 'bd0TQUo', 'bDqV8', 'bDRF1wm', 'bdycyAmHW6', 'bEGdjS9', 'bEgliFA', 'bESdf', 'bFxRz', 'BgODgn0SwwDl', 'bGSkWgT0', 'Bgw6aVMrn7B', 'BHqrbccnG', 'bJDoDMo1RD', 'BjOBMzXN', 'BKf5L3Mu', 'bKJzZ7N91q1', 'BkOznaG6', 'bLNE3TaK', 'BlpHAlZ', 'BN9VT31hdE', 'bNsztUBtPs', 'bp6X0Zh9Fq3N', 'bpH04', 'BqhdX6lsn0', 'BSIoo', 'bSlXO', 'BT5E5GJ', 'bTfsx9U0a', 'bV5blQLmPP', 'BwPUs0Y2Rc9p', 'BXHmqD65niC', 'bzGVL', 'C3SYIJ2ua', 'c4Eq6VV1', 'C5DQlTMjk', 'c99QapYk', 'caCEKfkY3ekx', 'CaML8mFs', 'CBFr3E6PXHgw', 'cC4ynkNfrR8', 'cDNIGesJs', 'cfPLzN', 'cfr5YW', 'cGIJrinoDReU', 'cgpQ9vd', 'ch0DF1qruXi7', 'chi0UE5kJ8', 'Ci4rI0OwB', 'cj39Ru1KEBd', 'cJMz2WWf', 'ck5XgCz7tu', 'CkJUBN', 'CkNEDAEt', 'cL3IalmqR2x', 'cnmqMx', 'CnvG5', 'cO1XLYsPS', 'Coi9EfM1oLDB', 'CoIRMRIO7n', 'CosEtVXd', 'coyAp', 'cPBqMVl1pJBA', 'CQHeg7GOJXU', 'CrwDAuf6R', 'cRY1E', 'CsRrxII', 'csz5LVE', 'CTcdrfQ0I8', 'cteQs4uzhE', 'CToF34her', 'cttlO', 'cUB1IY88mce', 'CUgiuhLGm', 'cUsmwp8oC', 'cuwsowT', 'CV7c6PHk', 'cVby2GlXU', 'CvMIA', 'cVZdbFJ0', 'cx7ViB3f1O', 'cXeRB', 'cxz4HFP', 'Cy9qV', 'CYN1HMyxgY2', 'CyRGBo65', 'CYYfdiVL2q', 'D2FfVS', 'D3vAiKLcpp', 'd7Ai1lSxyW', 'd7gWSOzW', 'd7KDg6', 'D7Lk6p3', 'D860PJMH', 'DAqYG', 'DAXL79', 'DbaaZnS', 'DbbMj', 'dCIpbrt4jeD', 'DcmdfSD', 'DcQUulF', 'ddcI6H', 'dEPPkOjIR1Ng', 'DF5FYxsqBv', 'dFbDWcst', 'dgLLXRq4w', 'DgTze', 'djKAtJq', 'DkXmPF3vu0', 'dKzc0N5tBt', 'dLpkc', 'dmOdJRk0', 'DMOshHfo3', 'dMU5Kt', 'DnhpXGN7cR', 'DOlCFqgjjpX3', 'Dp2e31zMUS3', 'DqHOUmP1b6VI', 'DRGuUSIay', 'drYWQpb94', 'DrZxNsD1wH', 'ds0sbiDf', 'dSKR9F9v9Bx4', 'DTOUbqI4LK', 'DU195Mz', 'dWlQtu9', 'DwmJgGQ8', 'DWoFBPHW', 'dxTImnVYMv', 'DXyRAE4dEjiQ', 'e0BvUVyRg', 'E1xc9F5uCrv', 'E2jMVjmO7a', 'E2OGX3gE9', 'E3aKWm', 'e4ytf5Epix2', 'e4yZJmW6uSS', 'E5ddvJAM', 'E5qblvtWP', 'E6YnCDrQEM', 'EAeRQ', 'eBieL6ld4dgF', 'ecnagqTPZ84', 'EDlmo7', 'eDrPaLNBoGce', 'eEasZ0PK0ll', 'EEmYHPI', 'EexPlNWI', 'eGcqiZRAq', 'eIz3ZgPBm6QE', 'eJ0uqX', 'eJ47L', 'EK1PGsfBS4JN', 'ekd23fth', 'eKVm3eWAS2WY', 'ekZXszHYoE2', 'ELFZTc', 'ElRxh', 'EmHk4YnSYA07', 'eMX8t3', 'eNePFJl', 'Eo0BaJdNpG1', 'EPqPyOuMYdvD', 'eptB3diW', 'eQbfoxP', 'EqGnbq', 'eQvUUHU', 'ErCBLOiXe', 'eRwSMrm', 'Es1teDUoMheY', 'EsbX55CBVUO', 'eSOlz74hWh', 'EUg1OvC', 'EviQQ3z1rcQy', 'EVuQZ', 'ew3NmfbHyi', 'EwTuJY2tO', 'ey6iqP7mIfEH', 'f3L6Ao', 'f5kq79Xkh', 'f6DwEO8Stct', 'f7sstran', 'F9I4hwdO', 'f9SNFBBfi', 'fakICxDoUJ', 'fBALPdzuRe', 'fBQ7EJ3p', 'FBrINg', 'FD3eJXXJUHAP', 'FDqlGE5rE4v', 'FEmAs', 'FEWVSQxn', 'Fg6Ju9qxptT', 'FGtsGNYHruSo', 'FHgiSnOvSC', 'fHRjEr1nL', 'fI2dD8x', 'fi9Y3k', 'FIurPQ', 'fjgaBKgu3ZQ', 'FKKur2eiKwtA', 'FKNS2BS', 'fl5azSHYYWu4', 'FmSclTaCAWE', 'fnx2G1', 'fOChlGD', 'FooiBCZxvhB', 'FOwvcJI', 'Fp2VmQ5xwOy', 'fPeYT9udXdq', 'fpGA8qvzEH', 'FPSXuzL', 'fqFOO', 'FqqwO', 'fRRGIQQ', 'FruA8', 'FryoioTm', 'FSGQl4md', 'fsJ6Wrk', 'FslUmT', 'Ft0NTSCLHZ', 'fTJ5b41', 'FUtsjENFVlAY', 'fvc4Lffeyb', 'fW1ar7Zg7J9', 'FW3nB59rTX', 'fXBQnYzODC', 'FXf2fqrWdxK', 'fxIe93cyDm', 'fXo1I', 'fzeqIosqS', 'FzLpvGID', 'FzmM6', 'fZOBfIjee', 'g04ag', 'G0eMuksi', 'g3e6Bwgvnao', 'g4ru7DIW3', 'g4Tg9B', 'G5FxLEkD', 'G5yz8Pu2C3', 'G7A20WO', 'G8vHyUC', 'g9JDl81snWv', 'GAcqqcSbc92', 'gapbDzE', 'GAq2gV8', 'gAxRonamh', 'gBdpp5jWXINa', 'gBtkE', 'GcMirum8C', 'gCOIliX', 'gcqtJHQFitsx', 'Gd37Z', 'GGhzWKJv', 'ggxBdk', 'gh32vMA4K8', 'GHm6GP', 'GIjGmF5', 'Gj7VI4d4nts', 'gjnJCN', 'GJNqScEkFg', 'gJPX1fGMLN', 'GJz5iXtjsX', 'GKdDCAul', 'gkuxBDvh2', 'gkV5jq2', 'gKZRaA3lI', 'GLnF4a', 'gMf8wW', 'gNab5up0U', 'gND68BZE11fP', 'GNDzGfTmnt', 'gPEtb6Xtoa', 'GpfsLQ', 'GQ2UJQvbb8', 'GQ8rABQ', 'gQnGWD', 'gREVlBTqa', 'GRHeP626tM', 'GRUoI', 'Gslgsdhkj', 'gsmZXwFf', 'GStccrX86uR', 'gSYo7l5u', 'gTjg5bLr', 'gtXqzN08', 'GTyihB2y', 'GuN1f0', 'gV1Q3CJ0Z', 'gwIugEcXq8', 'gXdamVDG', 'gz6AfMd53x', 'GZcvVIbrAas', 'gZNedSFdG', 'GzOMxgh', 'H0xGM39Mmi', 'h1rgU', 'h4JiL3kBZ', 'h4kqwpkREHD', 'h5kNaD', 'h7S6cA', 'ha3EqT8i', 'ha5n3', 'HAiJya4A8J', 'Hav951', 'HaV9gO', 'HCw9w2mxOr', 'Hd16txu', 'HDakGlN3', 'HdDA4NS2w', 'HDgXDnr1jonW', 'Hedfp', 'hFPsT', 'HFv61XAz', 'Hhn5al9FP1D', 'HL4cx2H', 'hLkqz1xpPS', 'HlQAJTqU0YJ', 'hMR7kXp0p', 'hMVc15OMCL37', 'HmvDC44ya2M', 'HO5gn28P', 'HQ4vWtPn1', 'hqJHjuWEpJ4', 'hqYrG', 'Hr2tq', 'HR575Qgr', 'hrkTFIB9HpW', 'hu2NR5q9o', 'huAQs7', 'HuJeijYiapQT', 'HUjFUMia', 'huRLrNBex', 'HvTOYrcxRp', 'hWshP0DXeS', 'hWv086siGGS', 'hx8Kz1Dku0', 'hxdWQanvmXH', 'hxtmb8', 'hzCTWcS', 'hzkALatnXt', 'i1KGfC6', 'i24QQ4BL', 'i2A8evTmoCt', 'I2LCkftE', 'i53XvA52P', 'i5OpdJ', 'i6k5eh9k', 'I8QFWFGkQtBm', 'i91QsJbNJYvW', 'IAH4qJiGaB', 'Iao8qaUwh', 'IBiaHv5mF8', 'ibLks1Mn', 'ibPQ01pAbc0', 'IBWMn8Xa', 'IC5Bl0JH', 'IDXY3O6qR', 'iE0ak0y', 'iefTn', 'iEoBFHkkyo', 'IfgcY', 'IFhsXShuaC', 'iFvpJ', 'IfydkTdU', 'IGWKQxg5A9JU', 'Ih8yymJk', 'iI1NbJhQe0s6', 'iIHbMB7y0F', 'iIOYoIP', 'iipFkRd', 'ikpHjmvk', 'IKXk1nK5', 'imlT0y7G3Cz', 'inISwYX8k', 'Io2phzfKT', 'ipJDTrf', 'Ipk0ZVS9q7dP', 'iq3Sc7C', 'IQ75wJxmyn', 'IqUBbd', 'iRQbsReXr', 'ITbovzYD', 'iTx12hHS', 'IUjjgsm2', 'iutapS1', 'IVeFEN9LkAk', 'IwjHODAquJR', 'IX2vtpj', 'ixAlnP', 'ixiKzyPT', 'IZ1XP', 'IZEctKSfSSHg', 'izq4Wrxh35uB', 'izsbC3x5Mc6', 'J2Ki4C94bq', 'j36iSOG9OdG', 'J6JR4q', 'J7qgeZi', 'J8jDH', 'j8JR5YGnP59', 'JaNIl', 'jAphifig8', 'JAusK', 'JCH5bHN', 'JcHcsgJVNx', 'jCKO1M0j3', 'jCKTcblX1V', 'JcYt09ob', 'jdI0DK', 'JEKbLYkq4IJ7', 'JeOS3ZlEgxN6', 'jeQu9', 'Jf34dxs', 'JFzhnw2uDaq', 'jgHBNEOs', 'jgMeqkFW7G', 'jhcrgg', 'jhgLoXlYaQOg', 'ji8paK6', 'jjKHERE', 'jjmhmxI', 'JjrJrO', 'jjS3izz5U', 'jK4O27', 'jKWLG9RRqS3', 'jL5Ezc4c', 'jlC8S', 'jLudM', 'jMAqPjZ5oZD', 'jN87Jg', 'jnpHSn', 'JojxsZH0b', 'JOu3mFf6AQ', 'joWqIE', 'JPU5FYbK0T', 'jpvQm', 'jqKcG', 'jrRYQU', 'js5r7LkHAJU5', 'JSN2ITKy5o', 'JtgomKQBwDA', 'JTPXrxCkgwh', 'JuBfPA9WO', 'jUo1B83Zt9', 'jVXbWtrR0y', 'JWfuu5ai', 'JwMub', 'jxAJeOmx6pi', 'JXhC4gd', 'JY2bppDuPJq', 'jy846lkUX5', 'jYEicAB0UrvQ', 'JzfotbuwCXxX', 'JzNwdpB', 'k1yOt', 'k2h9e', 'k3ufTV', 'k45FbXa', 'K63wQ', 'k6GhF8oGi', 'k6q3fFm0jW', 'k7FIJ', 'k8AmU1k', 'k9HJzVicuGIv', 'K9zfaG', 'kBVyAv7K2M', 'kEnnlSH1', 'Kf2Try5', 'Kf4DJsOv1rSx', 'kfLci0lEH', 'KfoBRRklo', 'KgwBggFWgC', 'khETHpxC3XK7', 'ki7jrwlp', 'KK7opx7', 'Kka2EWjOXH', 'kMrCCRx8Vk', 'KNeZHsAUSqnB', 'KNGVW', 'KNiEZJ0hiI', 'kNVNtX', 'krLJBjV9', 'KRzxaxvnQc', 'KUM2B', 'kvQG6C', 'KWo6rf', 'kxNbjjk4CYRw', 'kyA6j', 'kypWdieR9I', 'KZ2uqKs', 'L1Si1', 'L4zRQ1ge2', 'L56KPqpsm', 'L6nJqeV5', 'L8SxZT2uK', 'lBS9lt6cnZgu', 'LBu5dcxKs', 'LC3mat6pg', 'lcDsf1', 'LDIyqg', 'LgHSn3', 'lGoEQwyELK', 'Li350lEIlYQ', 'LJrwHJ', 'lKbAUWX1', 'LkHzyw', 'llEgb7isjpkN', 'LLfEy4', 'LNoZT', 'LOQ21Zgugli', 'lqheptBa6', 'LQvJWC', 'LqxAGnG', 'lqzpVHBYtW', 'Lr78kUd', 'lSmmf0k', 'lumSC7mE', 'lV95qLwT', 'lvVGNJ0G', 'lWJX4wVM', 'lxJtSWveduM', 'LxLHWUQ', 'lxuvz64ZFz', 'LYi8u122Z', 'LyJMAwZezI', 'm1b5W1N', 'm2gxR7U', 'M3HBy5SvJ', 'm3Z1pZB', 'm4ozioE2B5', 'M9HlQBK', 'M9Y95gWmGq', 'Mabj6N6sw', 'MadIr4P', 'mb1pAShHzU', 'MBAK3idHEtY', 'mBi49m2Jd', 'MBsAchKZkl', 'mcy40ViCwl7D', 'mdrooui9Cm', 'meVYrKB', 'MFAvL4', 'MgKKep4Mw', 'mi0df6gbpL', 'MjTwzXQZgwE3', 'mjzqq', 'mKFYuDn', 'mlbmcPtXKl3L', 'MljGzOo', 'mlQOVouW9g', 'mLy2lk2Xd38Z', 'mMGSYZ', 'mNBVQaEl8Chg', 'Mo2gb3Gg', 'mOyEb5n8CTJU', 'MPeqnaliCdmB', 'mPJvMfJoE', 'mpUttO9dOXU', 'mPZcR2R1qh', 'MQm9h', 'mSErCarPwS', 'mSMjm229E', 'MT5lozf', 'MtBOd0WnWr', 'mU0D8wQ', 'mUwyEBUAOQh', 'mv9i0IMV', 'mvAk3UCwXKDb', 'mVEwkCbK', 'mVZQhgse', 'MwOgt0b', 'mWzQJqf', 'Mx125wI', 'MXBMHsXeG', 'mY8me2', 'mymteWzZU9Z3', 'MZL9L', 'mZqgTl', 'n5eILOn', 'N7Cwsw', 'n8cg80', 'nAKqubOnSW', 'NAppi', 'Nc9MEm', 'Nc9X2y2', 'NENOnVpV', 'NEoDE8', 'Nf4Rp139e', 'NfsvTlkKTAf', 'NFzwim', 'nGQRl', 'nGvMHUc', 'niNVtYGU', 'nITiFQ', 'nkEHzXxt', 'nKLEBce', 'nKVV9QenlBK', 'Nl2mU8e', 'nlqVqSh', 'nm663rCZUWts', 'no6H3Cjp9n', 'NOrNTFue', 'Nr6bkDO6gV', 'NrH4Lgv1yE1R', 'NrsJUSzWzOcM', 'NSLOxMPF', 'NspAlDPi', 'NsTge', 'Nt2KvFq', 'ntuwtwpC', 'nue8S', 'nW1dZJ1qoCu', 'NYxoSfwz', 'nznIQpj6W7l', 'nzUq2sMJ9XCP', 'o1ws6m', 'O3ia2769qH6', 'O6gQl', 'O6WKQD5LufhG', 'o8UmzWv', 'O9tRb', 'OaaQsKVL', 'OAKDARJ', 'OaRTt264Bo', 'Obuyn1', 'Oby1b9YMD', 'OcG6yKGV', 'OCHNC12Vbts', 'oCMe7X', 'odPrrT6R2DF', 'OdYxm5rGT', 'oedKJfjdq', 'OEL2orKvmjNC', 'OGraUX', 'OGwIu', 'OHDUhF', 'oI7WEL', 'OJ8SYQ', 'oKPKXE', 'OLdnF', 'oLg43', 'oLzI5YKvw', 'OmYLJM6', 'op3og5Wg', 'Op5HIYlpnerc', 'OpYBKt', 'OqAXBsVfB', 'OQZk3SsuaZMY', 'oR4zzwo', 'oRi8m', 'ornWF', 'orQxzVl', 'osnpcpUlrJwj', 'OU6dWa', 'OYlnvpJr', 'oYrHi5', 'OZ0H4SM', 'OZody', 'P1LyPM', 'P1OGLcZQG6', 'P1pUw', 'p3GnIvCm', 'p4a1yl', 'p5m9UZFhFCOM', 'p6G8gOiLEu', 'P8j0G', 'PBazXnJc9hI', 'Pc0h7', 'pCmsrn', 'PE5stjll', 'pEW2pERqd2Z', 'pgXSeCoTjgt7', 'pIJLfHlyv', 'pIpXjKZzfa7', 'pl1S3Uoh', 'PlgfDtrRT', 'PmaOFW9JmOar', 'PmjUPQaYat2', 'PmMstthU', 'pMx877UE', 'PNV6Hi3nGUCX', 'POJlZ6', 'ppRk3hHB6El', 'pqPZrzv64', 'pr0igS', 'pSbwE', 'psChs7hf', 'psFOI', 'psME9', 'ptnH1', 'PtOG6RdmFrqr', 'PtUaw8', 'PuJLXebcgt', 'puMFoXH', 'PX3JwqSBE3', 'Px4j3CjfquIg', 'pyb2YE1tn', 'pyfoI6nZov', 'pYmRAHXI75X', 'PZ8ho', 'PzfgXkiaWL', 'pzIsBiKNoCKb', 'PzmmCzHIALt', 'q1AeV6J', 'q1PMeoD4R', 'q3fvD1IR', 'q3qCKRuku', 'Q402DmDK', 'Qastvm0Z70', 'QauSBow', 'QB9YOZWDj', 'qbAvepf9294', 'QBgflhe', 'qBLmdLj0C', 'qCEogAa3qtho', 'qCI3SjnBfm', 'QCuHuSSI', 'qdNxPmgCP', 'QdWV9I', 'QEcxkC', 'QerRH', 'qfk48ludkLO', 'QgArS3tKFbip', 'Qh358hSNE', 'QivmzQP8VfK', 'qK794Y', 'qLCQG9Ied', 'QMb3DxoP', 'qNm1f', 'qNPtXi', 'Qp21YyM', 'QqM91HdirKm', 'qQp4vFsPwIY', 'QRKKEd4G9xf', 'QS02k', 'qSBWaZuD71', 'QSJgz3rmNR', 'QTMC23X', 'qttG7Xz4HA6', 'qtVxSv', 'quhmcE7J', 'QVzhIQ0Dbjj', 'QwAzNlLgCGy', 'QWMu0o', 'QxCWA', 'QxyNXx', 'qZnP5', 'QzPJQJgv5ah', 'qZs02', 'r1XhEbw2te', 'R9SA3az5', 'rAA2h', 'raa9s', 'rb8E4qlYazF6', 'rBe8L11', 'rbmjwqeAG', 'RCux8x1fpgQ', 'rdiDSYsQfI7', 'REAV01x7', 'Rel6aPqcX', 'rfnSeswtYS2', 'RGIaIVGQ', 'RgXvlRO9X', 'rjI9ruBdo6h', 'RJvtaEra06', 'RKnIQjynJ3i', 'rkvBONM1Y', 'rl3lbE', 'RlawBL5vPKk9', 'rLNncQAr', 'rlYVdqyD', 'RLYWAi', 'RoKeJksLzOza', 'roXc9lozn2sf', 'RPE9GLs5PYf', 'RPv4snkYAOQ', 'rQhCH7OZufTO', 'RQMTCiug1Td', 'rQs2wiAC9k7O', 'RQUZTuEpk8Hj', 'RQVi4', 'Rr6IpBGYV', 'RS2LWt9', 'RS2zx', 'rS4cVaWyG', 'RtOrFv', 'Ruhug', 'rw7y0', 'rwhput', 'rX59tH0Dv', 'RxW4l36', 'rzUqvDMKpX', 'rZZz9B6wGTb', 'S0lxi6WPPNT', 'S12pv7', 's1i1W', 'S1MZ5d7hA', 'S2S3E', 'S3IS2YHGWX', 'S6dB9cQ', 'S8Mz7Mp9YD', 's9zn9NoY2LQ4', 'sAhxKQ', 'sajVcM', 'sbO66cy', 'SCU9J5XYWdj', 'SDBKiTCUC', 'SDHMBxQ', 'SezlDzNqPe', 'SfdDaZkZHV', 'sGXDD5n', 'sH3AiVt93dA', 'shFHf0Ujk', 'sHIQa', 'sHNGqgeq4', 'sikqIoWRl', 'SiUIWv61', 'SjDqirHu', 'SJiUGMk8', 'sjRnhkBONexa', 'Sk7jBtQyMURn', 'sK9TbJvoLU7', 'sKXl2', 'slYFh9EZXQT', 'smAB8r5qhZU', 'sMQHY7g', 'SMseJWmvT', 'sN3N9dpOWWvv', 'SOQN9ip', 'sOUW9jHhqX1', 'sQVHjyiI6BI', 'ssNtdW', 'sSYK2DhYG2L', 'SUctIJ', 'SuYYhpN2qVTh', 'sVIrMpXcAOW', 'sWDsauxu6Hh', 'SwoD74TZPO', 'SY2rFge8t84', 'T2RgHKkxF', 'T4EJ9gv22', 'T4SdU6bz', 't6ME8F', 'T6x5KUEwzd41', 't8Iid6MycHt', 'TAg2CBR', 'tAJz1nIe7hkn', 'tB96UpU', 'TCcAWcOiXkBE', 'tCYPpNiH93C', 'tdkqrT', 'TDSNeI3zeSnE', 'tduUy9ap', 'tE5tyiX0E', 'tF3yWIJHi', 'TFBhWZaqcqt', 'tFXheumWBXS7', 'tGMjLrY6lir', 'tJ9rNdqTVUie', 'tjVlvLee', 'tKFi56uey50', 'tmC70I', 'tMm7G', 'tn6to82zvo', 'TnHapt', 'TNVPgkdFy', 'TPcQoN1NA', 'TpXUP', 'TS4jVHOH2', 'TS9hg8ZoBR', 'TSECc1i8jctd', 'tsfU4OEyDvX', 'tURb6FPSxmi8', 'TUw5fhaMVPM2', 'Tv2KCS0HFyQ', 'tvx5Z1K1XiLd', 'txFHH', 'TxImO558SZi', 'TXPF1LX', 'tY2P0aO', 'TzquLkp5swL', 'tzZ0LGi1c', 'U1tkSFF7nM', 'U28ILhVuEEL', 'u3ABwUMoPd0j', 'u3LXhlGoLlBz', 'u3srsf', 'U4FhfKZR', 'u5djFImN5Ns', 'u5jJz', 'U5lWnlwDdUZS', 'U6Cv4jCf2VIp', 'U6Pi9S0', 'U7Bdm', 'U7BPRmMCI8Qe', 'u8YeDdivvd', 'U9CXHrYi', 'uAhYSnG5fZ2A', 'uaQviaJHqi2', 'uBIEY', 'ucB8df', 'UcVi45Jg', 'udi73', 'udQ24Ng7yfrE', 'UDQpFH', 'uE9JIa', 'ufCAec4', 'uFEOAvl', 'UG0YXwP7FO', 'UgFamK', 'uH5nUvM9DUK', 'uH7dJa', 'uHbpuyl5J', 'UhdO1M0', 'UhJ9JwSuT', 'UIrzMz', 'uJlucYW', 'ujR0Kb', 'uKgnKKvfqzDs', 'UMgX66lxw8', 'upFB2gbzFH', 'uprrCE3hHYO', 'uPtNn4z2nCD', 'UQ6YBZaE', 'uq99xQIeCzZ', 'uQf8Mf', 'uQW9PsC', 'UqzS6wg8lE', 'URkOHZr', 'UsjwU', 'UTM7k', 'UU49KU9yw', 'UU9Uh', 'uva666zL', 'uwV8lwQhAcU', 'uxlnndbxLRx', 'UxosaMPWK', 'UxV3Ivdj', 'uxYuP', 'UYEjCXtxPP', 'UZVTvoqg80', 'uzyO2', 'v1cKpKFjmVM1', 'V2FSJqOSwh', 'v31VeW6s9d', 'v3dio3Qs', 'V66OPwCi61', 'V6IX4ncG', 'v7Dt0NV', 'V99MIdSNW7t8', 'vaFSBGnmG', 'vC6gd42x06', 'vCeM54', 'VEf9da8Y', 'veoPldwU', 'VffFWX85WHo', 'vFN1OIBeyrEA', 'vFTAit', 'VFu1NT47RkAj', 'vgZXU', 'VhpuufOqdgb', 'ViTA8edrT', 'vjdXJp', 'VJlzFVUR', 'VKpSGhRk0nF', 'VL8CfahqXWN', 'VMPiPvC', 'vQCADSwA', 'VQRveWYpN', 'VqsyosJB', 'vRoRoa', 'vSBWT4Mg', 'vSV5QL', 'vsxT49', 'vuCwd0', 'vufwdY', 'vV7xDC', 'Vvp7nkG', 'Vz0edA', 'vzES3ejT87h2', 'VzwcJ', 'VzxFNMzIDpcz', 'w00dclN', 'W0a2ahDBW', 'W0PPSOcM9', 'W3BVFzzlrG3', 'w3NWQGJq', 'W5damb6', 'W66OETlC33K', 'w6ViqL7POVD6', 'W87b7bt0uS4z', 'w8zeNEj', 'w933sI8', 'w9HBWJz', 'WcLrm2q', 'wDELJ0dneVsO', 'wefoEPM8j', 'WFMJe4APxy', 'Wge7gwj98F', 'wgmGL9', 'wgWluPxiZS6N', 'WHkML', 'WhMeynqiBPf', 'wHsRyPOjLlmY', 'WhUSD7UtPmlX', 'whZgTY76', 'WiIRu', 'wIxGFcpJV', 'WJ06sZsv', 'wj5w3uI16Jgq', 'Wl3vxjj', 'wmjqn2S', 'WOBMN', 'woGmXPH', 'wOWy4', 'wp9D4yujU', 'wPCun', 'WpkxFge', 'wQ3seg', 'WQh5zVJv', 'wRkcD', 'wS95Pj', 'WT2EtzdnUz2R', 'wtbAD', 'WtORpKu9z', 'WUamdzC3M', 'WUlbywVKnCc', 'wvPS3EZzvq', 'wWAlQj7', 'wWgT9FXm1v', 'wX79t', 'wXyOddZM9J54', 'wYJXAr8CN', 'wYsE6X', 'WYV8ItoqNlu', 'wzZmOXpkXVe', 'X4UX9Jz5gk', 'X4V0amv', 'X54n7iYHsvhM', 'x5P1XqMp', 'X864OBV', 'X8hpR', 'x8VzI7YugV', 'XBoF1O4pOYB', 'XDPHdcCHtAe2', 'xDrdLr3', 'XdwUfsO8cu6g', 'xdYzyy8YfPUN', 'xEox3HX96', 'XEp34R35eR', 'xF4rRaeOothX', 'XgCyO', 'xgpNIxITAQk2', 'XGx5P', 'XH4uGY4o9gK', 'XhaOOxtSxNy', 'xHXxTqIqsvpn', 'XiB62', 'xiOdGil', 'XJOXWWPM16FB', 'xJPT3', 'XjqzFHcTxyBM', 'xkksd3jpGxsA', 'XlYuO', 'xMqCgpf', 'Xo2N0WTYpPS', 'xorMeUqG26n', 'XrrNKxAc', 'xsGFLh', 'Xt40s2', 'xTEh3NrHsV', 'XTTuT1Bg7Tgk', 'xTzarJ', 'XUWS1', 'xvrrWz', 'XW0KczhdrL', 'xW45HQP', 'xwTDY5WF', 'xx6ob', 'xXFhrMX', 'XxkXKmwHT', 'xXwPiZwFl', 'xYz3YZsQ3lG', 'xZ7u39neKJ', 'Y0hSS56OS', 'y4mSnR', 'Y5i1N6C64eZ', 'y7d4yL', 'y7loDA5NcL', 'y8EuCmR4CC', 'y8KdWy4sm', 'Y9Fuvb', 'yaJXFIt8MG', 'yaYuPWMjpq27', 'yBLBt', 'YctpFs', 'ydh7I6H', 'yDjZDbd', 'YEOj7', 'YfaVZre', 'YFtLIvnu4', 'ygHxsXYujhS', 'yH0QGf5XB', 'YHhosC9vF4dw', 'YHXUTsgxqj', 'yiw9p', 'yKD9EPq', 'YlwFpa0f', 'yMR5wwJAPVSP', 'ymsoGqiS', 'ymzwuEP', 'YPdrWiELoAr', 'yr4RC', 'yr6jY', 'YsDAvG', 'YSEviCm', 'YShWIlV', 'YSkXy', 'ySpWMEEzM', 'YSrnfYjoMxCs', 'yssUPmR', 'YT44Klpb', 'yTSsK94', 'YU9bGCHWf', 'YUnB8bLXc', 'YVdJybARo', 'YVo9UeUT', 'YVyOUX', 'YxplqsD4MQO8', 'YYLQ9DFg', 'YYx6E3jPW', 'Yz3U0Mm0Kk8H', 'yzf7O', 'Yzk0qZYO', 'z0EOZMiRQ4', 'Z0SvHNUfxQ', 'z4iFmOq', 'z51zszZEMm', 'z5STW5HLKM', 'Z69sDNvVHI', 'z6H87', 'z81uTZV', 'Z8cLUBaL', 'Z9oTU', 'ZabEa', 'zadCN', 'zBWLvqtSFkO', 'zcnPky3ih', 'ZDdTl', 'zDEDaB', 'zDkuw', 'zDRdO', 'zedys', 'ZEEFAd7VTDh', 'zFQYYVK', 'Zg0KzBla3S', 'zGckE6', 'ZgkmE06w6gMx', 'zGNIXZCTZ8', 'ZGQzC0W', 'zHDfD2YB', 'zHzfG8', 'ZI6pEa3D', 'ZJ5J6HjDY', 'ZJefs9nIX41', 'ZjqqZ', 'ZL21Ql2gnkj7', 'ZLaADMQM65', 'zLpguChJ7hUt', 'ZM43mpGZX', 'ZmA7oxiXuq', 'zmrpszcVMB7', 'Zn7CFfer0', 'zNSn7lo8', 'ZOhkOMj2TGWu', 'ZosNl', 'Zotk2tHsqg', 'zPpFn4', 'zqEMTvOovf8', 'ZqPiKnH6vx0', 'zqYbSW', 'zriq6YS', 'zro4HLQgH', 'zs6Rt7VA', 'ZsAfBdhef8C', 'ztgCMsWtC', 'ZTgz8slfCJ', 'ZtvL2', 'zvEchv', 'ZXKoUPKy', 'ZY0sQNL', 'ZYuneC', 'zzFMYJyn', 'zzNygIgDP'];
    return Question;
}

function init() {
    Q_No = Math.floor( Math.random() * Q.length);//問題をランダムで出題する
    Q_i = 0;//回答初期値・現在単語どこまで合っているか判定している文字番号
    Q_l = Q[Q_No].length;//計算用の文字の長さ
    good_score = 0; //正解数
    bad_score = 0; //不正解数
    //ohuzake = 0; //けしからん
    initsw = true; //初回のみ動作するように
    gamesw = false; //
    //state = true; //
    ju = true;
    esc = false;

    timePassed = 0; //時間経過のパラメータ
    start_time = 0;
    limtime = 60000; //制限時間[ms]

    //仕事中に関するパラメータ
    up_push = false;
    down_push = false;
    left_push = false;
    right_push = false;
    alt_push = false;

    //クリックボタン処理のパラメータ
    clickbtn = -1;

    document.getElementById("imgg").src = "";
    document.getElementById("push").innerHTML = "";
    document.getElementById("start").innerHTML = "";
    document.getElementById("start").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("result2").innerHTML = "";
    document.getElementById('btn-list').innerHTML = "";
    document.getElementById('limit_timer').innerHTML = "";
    document.getElementById('btn-list2').innerHTML ="";
    $('#push').fadeIn(0); 
    $('#limit_timer').fadeIn(0); 
}

/*ローディング待ち*/
function loading() {
    window.onload = function() {
        var count = 1;
        setTimeout(function(){
            //カウントダウンの関数
            var countdown = function(){
                count--;
            //console.log(count--);
            var id = setTimeout(countdown, 1000);
            if(count < -1){
                clearTimeout(id);
                document.getElementById('gametitle').innerHTML ="Singularity Typing";
                const title = document.querySelector("#gametitle");
                //title.computedStyleMap.cssText = 'animation:tl-color 5s infinite;';
                reset();
                title.className = "";
            }
            }
            countdown();
        }, 0);
    }
}

function reset(){
    bgm.pause();
    Q_No = Math.floor( Math.random() * Q.length);//問題をランダムで出題する
    Q_i = 0;//回答初期値・現在単語どこまで合っているか判定している文字番号
    Q_l = Q[Q_No].length;//計算用の文字の長さ
    good_score = 0; //正解数
    bad_score = 0; //不正解数
    //ohuzake = 0; //けしからん
    initsw = true; //初回のみ動作するように
    gamesw = false; //
    //state = true; //
    ju = true;
    esc = true;

    timePassed = 0; //時間経過のパラメータ
    start_time = 0;
    limtime = 60000; //制限時間[ms]

    //仕事中に関するパラメータ
    up_push = false;
    down_push = false;
    left_push = false;
    right_push = false;

    //クリックボタン処理のパラメータ
    clickbtn = -1;

    $('#btn-list').fadeIn(0); 
    $('#push').fadeIn(0); 
    $('#limit_timer').fadeIn(0); 

    document.getElementById('gameContainer').innerHTML = ('<div id="limit_timer"></div>\
    <div id="push" class="gametext" style="color: rgb(255, 255, 255); font-size: 100px;"></div>\
    <!--<div id="push" class="gametext" style="color: rgb(255, 255, 255);">Enterキーを押して下さい</div>-->\
    <div id="question"> <img src = "" id="imgg"/> </div>\
    <div id="start" class="gametext" style="color: rgb(255, 255, 255);"><br></div>\
    <div id="result" class="gametext" style="color: rgb(255, 255, 255);"></div>\
    <div id="result2" class="gametext" style="color: rgb(255, 255, 255);"></div>\
\
    <div class="btn-list" id="btn-list">\
        <button class="btn-1 fadeIn" type="button" Onclick="LinkCheck(0)"> Game Start\
        </button>\
\
        <button class="btn-2 fadeIn" type="button" Onclick="LinkCheck(1)"> How to play\
        </button>\
\
        <!--<button class="return_btn" type="buttron" Onclick="LinkCheck(3)"> How to play\
        </button>-->\
    </div>\
    <div class="btn-list2" id="btn-list2"></div>\
\
    <!--<canvas id="#canvas" width="500" height="420" style="cursor: default;">\
    </canvas>-->\
    <div id="explain"></div>\
    <div class="logo Dark" style="display: none;">\
    </div>\
    <div class="progress Dark" style="display: none;">\
        <div class="empty" style="width: 0%;">\
        </div>\
        <div class="full" style="width: 100%;">\
        </div>\
    </div>');
    document.getElementById('footer').innerHTML = "<br>";
}
