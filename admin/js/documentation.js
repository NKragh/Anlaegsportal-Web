import {
  sastoken,
  getdocuments_url
} from '../../js/storage.js'

const installationId = localStorage.getItem('installationId');

document.onload = GetDocuments()

document.getElementById('uploadbtn').addEventListener('click', () => {
  window.location.href = "upload.html"
})

/**
 * Get list of documents, and parses xml through parseXML
 * @see parsexml
 */
function GetDocuments() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      parseXML(this)
    }
  }
  xmlhttp.open("GET", `${getdocuments_url}/?restype=container&comp=list`, true)
  xmlhttp.send()
}

/**
 * Gets all properties and metadata for document
 * @param {string} title - Title of document
 */
function GetHeaders(title) {
  let result = ""
  fetch(`${getdocuments_url}/${title}`, {
      method: 'HEAD'
    })
    .then(response => {
      const headers = Object.fromEntries(response.headers.entries())
      // console.log(headers)
      if (title.split('/')[0] != installationId) {
        return
      }
      result = `<ul class="trow">`;
      result += `<li name="documentlink" class="cell">${headers['last-modified']}</li>`
      result += `<li name="documentlink" class="cell"><a style="color: blue;" target="blank" href="${getdocuments_url}/${title}">${title.split('/')[1]}</a></li>`
      result += `<li name="documentlink" class="cell">${headers['x-ms-meta-responsible']}</li>`
      result += `</ul>`
      document.getElementById('documentTable').innerHTML += result
    })
}

/**
 * Parses xml to get title of file
 * @param {XMLHttpRequest} xml 
 */
function parseXML(xml) {
  let xmlDoc = xml.responseXML;
  // console.log(xml)
  let x = xmlDoc.getElementsByTagName('Name') //Title of the file is stored as "Name": <title>
  for (let i = 0; i < x.length; i++) {
    var title = x[i].childNodes[0].nodeValue
    GetHeaders(title)
  }
}