import {
  getdocuments_url,
  local_url,
  sastoken
} from '../../js/storage.js'

document.getElementById('uploadbtn').addEventListener('click', upload)

var file;

function SendDocument() {
  var installationId = localStorage.getItem('installationId')
  const now = new Date()
  fetch(`${getdocuments_url}/${installationId}/${file.name}${sastoken}`, {
      'method': 'PUT',
      'content-length': file.size,
      'body': file,
      'headers': {
        'x-ms-date': now.toDateString(),
        'x-ms-blob-type': 'BlockBlob'
      }
    })
    .then(result => {
      console.log('Success:', result);
      if (result.ok) {
        document.getElementById('status').innerText = "Uploaded. Redirecting in 3 sec."
        setTimeout(() => {
          window.location.href = "documentation.html"
        }, 3000)
      }
    })



  // //XMLHttp POST metode, med dokumentet.
  // var xmlhttp = new XMLHttpRequest();
  // xmlhttp.onreadystatechange = function () {
  //   if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
  //     document.getElementById('status').innerText = "Uploaded. Redirecting in 5 sec."
  //     this.timeout(5000)
  //     history.back()
  //   }
  // }
  // xmlhttp.open("PUT", `${getdocuments_url}/${installationId}/`, true)
  // xmlhttp.send(file)
}

function upload() {
  file = document.getElementById('myFile').files[0]
  SendDocument()
  console.log(file.name)
}