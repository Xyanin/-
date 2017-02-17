var turnplate = {
  restaraunts: [], //大转盘奖品名称
  colors: [], //大转盘奖品区块对应背景颜色
  outsideRadius: 238, //大转盘外圆的半径
  textRadius: 170, //大转盘奖品位置距离圆心的距离
  insideRadius: 0, //大转盘内圆的半径
  startAngle: 0, //开始角度
  bRotate: false, //false:停止;ture:旋转
  positionX: 380,
  positionY: 530
};

turnplate.restaraunts = ["二等奖", "明天再来", "三等奖", "谢谢参与", "一等奖", "不要灰心"];
turnplate.colors = ["#b07b00", "#f0ca23", "#b07b00", "#f0ca23", "#b07b00", "#f0ca23"];

var setColor = (function () {
  // 保存所有圆点对应颜色
  var colors = [
    "#f7e004", "#f9da01", "#f9c102", '#f9a605', '#f9750a', '#f14e1a',
    '#cc3f36', '#973f58', '#5f4088', '#333fa3', '#143fb5', '#093eb8',
    '#0841c6', '#0940c6', '#193fab', '#4445a0', '#704482', '#a14d5e',
    '#cc3f36', '#f14e1a', '#f9750a', '#f9a605', "#f9c102", "#f9da01"
  ];
  // 保存颜色数量
  var length = colors.length;
  // 记录setColor执行次数
  var times = 0;

  return function doSetColor() {
    console.log('%c第（%c' + times + '%c）次执行', 'color: red', 'color: #f60', 'color: red')
    // foreach 语句为数组或对象集合中的每个元素重复一个嵌入语句组
    colors.forEach(function(color, j) {
      var circleElement = document.getElementById('d' + (j + 1));
      circleElement.style.background = colors[(times + j) % length];
    });
    times++
  }
})();

var timer = null;
var item = null;
function changeColor() {
  setColor();
  timer = setTimeout("changeColor()", 300);
};


// 1 二等奖
// 2 明天再来
// 3 三等奖
// 4 谢谢参与
// 5 一等奖
// 6 不要灰心

function rnd() {
  var randomNumber = Math.random() * 100;
  var goldMedal = 5; // 一等奖概率 5%
  var silverMedal = 15; // 二等奖概率
  var copperMedal = 35; // 三等奖概率
  var fourth = 15; // 谢谢参与概率
  var fifth = 15; // 不要灰心概率
  // var sixth = 15; // 明天再来概率

  // var diff = 100 - goldMedal; // 一等奖概率5%，所以此处认为大于95的数字都是一等奖
  if (randomNumber >= 100 - goldMedal) { // 一等奖
    console.log('恭喜你获得了1等奖')
    return 5;
  } else if (randomNumber >= 100 - goldMedal - silverMedal
          && randomNumber < 100 - goldMedal) { // 二等奖概率
    console.log('恭喜你获得了2等奖')
    return 1;
  } else if (randomNumber >= 100 - goldMedal - silverMedal - copperMedal
          && randomNumber < 100 - goldMedal - silverMedal) { // 三等奖概率
    console.log('恭喜你获得了3等奖')
    return 3;
  } else if (randomNumber >= 100 - goldMedal - silverMedal - copperMedal - fourth
          && randomNumber < 100 - goldMedal - silverMedal - copperMedal) { // 谢谢参与概率
    console.log('恭喜你获得了谢谢参与')
    return 4;
  } else if (randomNumber >= 100 - goldMedal - silverMedal - copperMedal - fourth - fifth
          && randomNumber < 100 - goldMedal - silverMedal - copperMedal - fourth) { // 不要灰心概率
    console.log('恭喜你获得了不要灰心')
    return 6;
  } else { // 明天再来概率
    console.log('恭喜你获得了明天再来')
    return 2;
  }
};

function response() {
  var result = item;
  if (result == 1 || result == 3 || result == 5) {
    return {
      point: result,
      duijiang: 'xsdfsdfsdfs', // 兑奖随机字符串
      time:1,	//第几次玩
    };
  }
  else {
    return {
  	  point: result,
  	  time:1,  //第几次玩
    };
  }
}

function draw() {
  var i = 0;
  setColor();
  var canvas = document.getElementById("wheelcanvas");
  var arc = (2 * Math.PI) / (turnplate.restaraunts.length);
  var ctx = canvas.getContext('2d');
  for (var i = 0; i < turnplate.restaraunts.length; i++) {
    ctx.beginPath();
    ctx.arc(turnplate.positionX, turnplate.positionY, turnplate.outsideRadius, i * arc, (i + 1) * arc, false);
    ctx.arc(turnplate.positionX, turnplate.positionY, turnplate.insideRadius, (i + 1) * arc, i * arc, true);

    var g1 = ctx.createRadialGradient(turnplate.positionX, turnplate.positionY, turnplate.insideRadius,
      turnplate.positionX, turnplate.positionY, turnplate.outsideRadius);
    g1.addColorStop(0, '#f9eaab');
    g1.addColorStop(1, turnplate.colors[i]);
    ctx.fillStyle = g1;
    ctx.fill();
    ctx.save();

    ctx.fillStyle = "#000000"
    var text = turnplate.restaraunts[i];
    ctx.font = "bold 32px Arial";
    ctx.translate(turnplate.positionX + Math.cos(i * arc + arc / 2) * turnplate.textRadius,
      turnplate.positionY + Math.sin(i * arc + arc / 2) * turnplate.textRadius);
    switch (i) {
      case 0:
        var img = document.getElementById("img2");
        // ctx.drawImage(img, -70, -70);
        ctx.rotate(120 * Math.PI / 180);
        ctx.fillText('二等奖', -ctx.measureText('二等奖').width / 2, 80);
        break;
      case 1:
        ctx.rotate(180 * Math.PI / 180);
        ctx.fillText('明天', -ctx.measureText('明天').width / 2, 0);
        ctx.fillText('再来', -ctx.measureText('再来').width / 2, 40);
        break;
      case 2:
        var img = document.getElementById("img3");
        // ctx.drawImage(img, -70, -70);
        ctx.rotate(-120 * Math.PI / 180);
        ctx.fillText('三等奖', -ctx.measureText('三等奖').width / 2, 80);
        break;
      case 3:
        ctx.rotate(-60 * Math.PI / 180);
        ctx.fillText('谢谢', -ctx.measureText('谢谢').width / 2, 0);
        ctx.fillText('参与', -ctx.measureText('参与').width / 2, 40);
        break;
      case 4:
        ctx.fillText('一等奖', -ctx.measureText('一等奖').width / 2, 70);
        var img = document.getElementById("img1");
        // ctx.drawImage(img, -50, -50);
        break;
      case 5:
        ctx.rotate(60 * Math.PI / 180);
        ctx.fillText('不要', -ctx.measureText('不要').width / 2, 0);
        ctx.fillText('灰心', -ctx.measureText('灰心').width / 2, 40);
        break;
    }
    ctx.restore();
  };
};
draw();

$(document).ready(function() {
  var rotateTimeOut = function() {
    $('#wheelcanvas').rotate({
      angle: 0,
      animateTo: 2160,
      duration: 800,
      callback: function() {
        alert('网络超时，请检查您的网络设置！');
      }
    });
  };
  //旋转转盘 item:奖品位置; txt：提示语;
  var rotateFn = function(item, txt) {
    var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
    if (angles < 270) {
      angles = 270 - angles;
    } else {
      angles = 360 - angles + 270;
    }
    $('#wheelcanvas').stopRotate();
    $('#wheelcanvas').rotate({
      angle: 0,
      animateTo: angles + 1800,
      duration: 800,
      callback: function() {
        turnplate.bRotate = !turnplate.bRotate; //停止两者切换
    	  if(item === 1 || item === 3 || item === 5){
            $('#prize').text(txt);
            $('#num').text('兑奖码：'+response().duijiang);
            $('#result').show();
            $('#game').hide();
          }
        $('#start').attr('src', './static/images/start1.png');
        clearTimeout(timer);
      }
    });
  };
  $('#start').on("touchstart", function() {
    this.src = "./static/images/start2.png";
    item = rnd();
    if(response().time > 2) {
      $('#result1').show();
      $('#game').hide();
    } else {
      if (turnplate.bRotate) return;
      turnplate.bRotate = !turnplate.bRotate;
      console.log(item);
      changeColor();
      rotateFn(item, turnplate.restaraunts[item - 1]);
    }
  });

  $('#seeyou').on("touchstart", function() {
    $('#result1').hide();
    $('#game').show();
  });
  $('#result').on("touchstart", function() {
    $('#result').hide();
    $('#game').show();
  });
});
