

$(document).ready(function () {
  console.log(sessionStorage.getItem("CampRound"));
  Connect_DB();
  ShowRegister();
});


function ShowRegister() {
  console.log("ShowRegister===="+sessionStorage.getItem("CampRound"));
  //document.getElementById('myDisplayLine').style.display='none';
  //document.getElementById('myRegister').style.display='none';
  //document.getElementById('myTimer').style.display='block';
  var str = "";
  var sCountID = 0;
  //str +='<div style="font-size: 14px; color:#fff;">ONE Retail Registration System<br><b>'+sessionStorage.getItem("CampName")+'</b></div>';
  //str +='<div id="DisplayCountRegister" style="margin: 10px auto; font-size: 13px; color: #ffff00;"></div>';
  dbBootRegister.where('CampRound','==',sessionStorage.getItem("CampRound"))
  .where('StatusRegister','==',1)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      console.log(doc.data().EmpName);
      sCountID = sCountID+1;
      str += '<div class="box-member" style="width:61px;height:80px;overflow:hidden;float: left;" onclick="OpenRegister(\''+ doc.id +'\')">';
      str += '<div><img src="'+ doc.data().LinePicture +'" onerror="javascript:imgError(this,\''+ doc.id +'\')" class="img-register"></div>';
      str += '<div class="clr txt-member" style="font-size:11px;line-height:1.2; color:#fff; padding-top:4px;">'+ doc.data().LineName +'</div></div>';
    });
    $("#AllRegister").html(str);    
    $("#DisplayCountRegister").html("<div style='margin:15px auto 5px auto; font-size: 14px; font-weight: 600; '>"+ sessionStorage.getItem("CampName") +"</div><div>จำนวนลงทะเบียน : "+sCountID+" คน</div>");
  });
}


function OpenRegister(x) {
  var str = "";
  dbBootRegister.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div style="margin-top:20px;"><img src=\''+ doc.data().LinePicture +'\' onerror="javascript:imgError(this,\''+ doc.id +'\')" class="img-member-true" style="width:120px;height:120px;border-radius:50%;box-shadow: 0px 0px 6px 5px rgba(178,178,178,0.17);">';
      str += '<div class="txt-member1" style="padding-top: 6px;color:#f68b1f">'+doc.data().LineName+'</div>';
      str += '<div style="margin-top:20px;font-size:13px;font-weight: 600;color:#0056ff;">คุณ'+doc.data().EmpName+'</div>';
      str += '<div style="color:#002d63;">ลงทะเบียนกิจกรรม<br>'+sessionStorage.getItem("CampName")+'</div>';
      str += '<div style="color:#999;font-size:11px;">ลงทะเบียนเมื่อ '+doc.data().DateTime+'</div>';
    });
    $("#DisplayUser").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}


function imgError(image,id) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    //alert(sessionStorage.getItem("LinePicture")+"==="+id);
    UpdateLinePicture(id);
    return true;
}