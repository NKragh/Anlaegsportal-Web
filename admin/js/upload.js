import {
  getdocuments_url
} from '../../js/storage.js'

document.getElementById('uploadbtn').addEventListener('click', upload)

function SendDocument() {
  //XMLHttp POST metode, med dokumentet.

}

function upload() {
  const file = document.getElementById('myFile').files[0]

  console.log(file.name)
}