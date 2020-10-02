import { rest_url } from "./storage.js";


document.onload = GetInformation()

function GetInformation() {
  try {
    var qrid = localStorage.getItem('qrid')
  } catch (error) {
    var qrid = ""
    console.log(error)
  }
    
  fetch(`${rest_url}search?qrId=${qrid}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })

}