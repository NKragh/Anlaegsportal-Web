import {
  getdocuments_url,
  local_url
} from '../../js/storage.js'

document.getElementById('uploadbtn').addEventListener('click', upload)

var file;

function SendDocument() {
  var installationId = localStorage.getItem('installationId')
  //XMLHttp POST metode, med dokumentet.
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      document.getElementById('status').innerText = "Uploaded. Redirecting in 5 sec."
      this.timeout(5000)
      history.back()
    }
  }
  xmlhttp.open("PUT", `${getdocuments_url}/${installationId}/${file.name}`, true)
  xmlhttp.send(file)
}

function upload() {
  file = document.getElementById('myFile').files[0]
  SendDocument()
  console.log(file.name)
}