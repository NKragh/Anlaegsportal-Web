import {
  local_url,
  getimage_url,
  rest_url
} from '../../js/storage.js'

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
      actionbuttonClick(l.getAttribute('name'), l.getAttribute('id'))
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

        str += `<li name="installationLink" id="${element.installationId}" class="cell other" style="text-align: center;">
                      <i style="font-size: 20px; color: grey;" class="fas fa-bookmark actionbutton"></i>
                </li>`
        str += `<li name="installationLink" id="${element.installationId}" class="cell other image">
                    <img style="width: inherit; max-width: 45px; height: 65px" class="actionbutton" src="${getimage_url}/${element.installationId}.jpg">
                </li>`
        str += `<li name="installationLink" id="${element.installationId}" class="cell">${element.model}</li>`
        str += `<li name="installationLink" id="${element.installationId}" class="cell">${element.productType}</li>`
        str += `<li name="installationLink" id="${element.installationId}" class="cell">${element.address}</li>`
        str += `<li name="installationLink" id="${element.installationId}" class="cell">${element.lastReview}</li>`
        str += `<li name="installationLink" id="${element.installationId}" class="cell">${element.responsible}</li>`

        str += `<ul class="cell other">
                    <li id="${element.installationId}" name="edit" class="actionbutton">
                      <div class="actionbuttoncontainer">
                        <i class=" fas fa-pencil-alt"></i>
                        Edit
                      </div>
                    </li>
                    <li id="${element.installationId}" name="archive" class="actionbutton">
                      <div class="actionbuttoncontainer">
                        <i class=" fas fa-archive"></i>
                        archive
                      </div>
                    </li>
                    <li id="${element.installationId}" name="subinstallation" class="actionbutton">
                      <div class="actionbuttoncontainer">
                        <i class=" fas fa-plus-square"></i>
                        Subinstallation
                      </div>
                    </li>
                    <li id="${element.installationId}" name="task" class="actionbutton">
                      <div class="actionbuttoncontainer">
                        <i class=" fas fa-stream"></i>
                        Task
                      </div>
                    </li>
                    <li id="${element.installationId}" name="checklist" class="actionbutton">
                      <div class="actionbuttoncontainer">
                        <i class=" fas fa-clipboard-list"></i>
                        Checklist
                      </div>
                    </li>
                    <li id="${element.installationId}" name="comment" class="actionbutton">
                      <div class="actionbuttoncontainer">
                        <i class=" fas fa-comment-dots"></i>
                        Comment
                      </div>
                    </li>
                    <li id="${element.installationId}" name="watch" class="actionbutton">
                      <div class="actionbuttoncontainer">
                        <i class=" fas fa-eye"></i>
                        Watch
                      </div>
                    </li>
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

  let response = await fetch(`${local_url}/search?bbrid=${bbrid}`)
  // fetch(`http://localhost:51456/api/installations/search?bbrid=${bbrid}`)
  let data = await response.json()

  return data
}

function installationClick(id) {
  localStorage.setItem('installationId', id)
  window.location.href = "installation.html"
}

function actionbuttonClick(name, id) {
  switch (name) {
    case "edit":
      console.log(`${name} button clicked`)
      localStorage.setItem('installationId', id)
      window.location.href = "edit.html"
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