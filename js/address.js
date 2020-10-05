import {
  sastoken,
  getimage_url,
  rest_url
} from './storage.js'

document.onload = GetInstallations()

/**
 * Sets links on rows in tableasd
 */
function setlinks() {
  var linkliste = []
  linkliste = document.getElementsByName('installationLink')
  linkliste.forEach(l => {
    l.onclick = function () {
      installationClick(l.getAttribute('id'))
    }
  });
}

function setlinks2() {
  var linkliste = []
  linkliste = Array.from(document.getElementsByClassName('actionbutton'))
  linkliste.forEach(l => {
    l.onclick = function () {
      actionbuttonClick(l.getAttribute('name'))
    }
  });
}

var installationList = []

function GetInstallations() {
  document.getElementById('loader').style.visibility = "visible"
  GetInstallationsAsync()
    .then(data => {
      installationList = data

      var table = document.getElementById('installationTable')

      for (let i = 0; i < installationList.length; i++) {
        const element = installationList[i]
        var str = `<ul class="trow">`

        str += `<li name="installationLink" 
                    id="${element.installationId}" 
                    class="cell other" 
                    style="text-align: center;">
                      <i style="font-size: 20px; color: grey;" class="fas fa-bookmark actionbutton"></i>
                </li>`
        str += `<li name="installationLink" 
                    id="${element.installationId}" 
                    class="cell other image">
                    <img style="width: inherit; max-width: 45px; height: 65px" class="actionbutton"
                    src="${getimage_url}/${element.installationId}.jpg">
                </li>`
        str += `<li name="installationLink" 
                    id="${element.installationId}" 
                    class="cell">${element.model}
                </li>`
        str += `<li name="installationLink" 
                    id="${element.installationId}" 
                    class="cell">${element.productType}
                </li>`
        str += `<li name="installationLink" id="${element.installationId}" class="cell">${element.bbrId}</li>`
        str += `<li name="installationLink" id="${element.installationId}" class="cell">${element.lastReview}</li>`
        str += `<li name="installationLink" id="${element.installationId}" class="cell">${element.responsible}</li>`
        str += `<ul class="cell other">
                    <li name="edit" class="actionbutton"><i class=" fas fa-pencil-alt"></i></li>
                    <li name="archive" class="actionbutton"><i class=" fas fa-archive"></i></li>
                    <li name="subinstallation" class="actionbutton"><i class=" fas fa-plus-square"></i></li>
                    <li name="task" class="actionbutton"><i class=" fas fa-stream"></i></li>
                    <li name="checklist" class="actionbutton"><i class=" fas fa-clipboard-list"></i></li>
                    <li name="comment" class="actionbutton"><i class=" fas fa-comment-dots"></i></li>
                    <li name="watch" class="actionbutton"><i class=" fas fa-eye"></i></li>
                </ul>`

        str += `</ul>`
        table.innerHTML += str
      }
      setlinks()
      setlinks2()
      console.log(installationList)
      document.getElementById('loader').style.visibility = "hidden"
    });
}

/**
 * Gets installations from API async
 */
async function GetInstallationsAsync() {
  var bbrid = localStorage.getItem("bbrid")
  console.log(bbrid)

  let response = await fetch(`${rest_url}search?bbrid=${bbrid}`)
  // fetch(`http://localhost:51456/api/installations/search?bbrid=${bbrid}`)
  let data = await response.json()

  return data
}

function installationClick(id) {
  localStorage.setItem('installationId', id)
  window.location.href = "installation.html"
}

function actionbuttonClick(name) {
  switch (name) {
    case "edit":
      console.log(`${name} button clicked`)
      break;
    case "archive":
      console.log(`${name} button clicked`)
      break;
    case "subinstallation":
      console.log(`${name} button clicked`)
      break;
    case "task":
      console.log(`${name} button clicked`)
      break;
    case "checklist":
      console.log(`${name} button clicked`)
      break;
    case "comment":
      console.log(`${name} button clicked`)
      break;
    case "watch":
      console.log(`${name} button clicked`)
      break;
    default:
      console.log("test")
      break;
  }
}