document.getElementById("downloadBtn").addEventListener("click", function() {
    var videoUrl = document.getElementById("videoUrl").value;
    
    if (videoUrl) {
      var videoId = extractVideoId(videoUrl);
      if (videoId) {
        var downloadUrl = "/api/download?videoId=" + videoId;
        downloadVideo(downloadUrl);
      } else {
        alert("Link de Youtube invalido");
      }
    } else {
      alert("El Link esta mal escrito");
    }
  });
  
  function extractVideoId(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    
    if (match && match[7].length === 11) {
      return match[7];
    } else {
      return null;
    }
  }
  
  function downloadVideo(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      if (xhr.status === 200) {
        var blob = new Blob([xhr.response], { type: "audio/mp3" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "video.mp3";
        link.click();
      }
    };
    xhr.send();
  }
  