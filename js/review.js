import {
  getdocuments_url,
  getreviews_url,
  rest_url
} from './storage.js'

document.onload = GetReviews()

function GetReviews() {
  var installationId = localStorage.getItem('installationId')

  fetch(`${rest_url}/${installationId}/reviews`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      var table = document.getElementById('reviewTable')
      for (const r of data) {
        let result = `<ul class="trow">`;
        result += `<li class="cell">${r['dateCompleted']}</li>`
        result += `<li class="cell">${r['name']}</li>`
        result += `<li class="cell">${r['responsible']}</li>`
        result += `<li class="cell" id="${r['reviewId']}">Document not found...</li>`

        if (r['status']) {
          result += `<li class="cell"><i style="color: green;" class="fas fa-thumbs-up"></i> OK</li>`
        } else {
          result += `<li class="cell"><i style="color: red;" class="fas fa-thumbs-down"></i> IKKE-OK</li>`
        }

        result += `</ul>`
        table.innerHTML += result
      }

      GetDocuments()
    })

}

function GetDocuments() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let xmlDoc = this.responseXML;
      // console.log(this)
      let x = xmlDoc.getElementsByTagName('Name') //Title of the file is stored as "Name": <title>
      for (let i = 0; i < x.length; i++) {
        var [id, title] = x[i].childNodes[0].nodeValue.split('/')

        var documentation = document.getElementById(id)
        documentation.innerHTML = `<a style="color: blue;" target="blank" href="${getreviews_url}/${id}/${title}">${title}</a>`
      }
    }
  }
  xmlhttp.open("GET", `${getreviews_url}/?restype=container&comp=list`, true)
  xmlhttp.send()
}