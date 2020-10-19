import {
  local_url,
  getimage_url,
  rest_url
} from "../../js/storage.js";

document.onload = GetInformation()
document.onload = GetOwners()

document.getElementById('savebtn').addEventListener('click', save)
document.getElementById('cancelbtn').addEventListener('click', cancel)

var installation;

async function GetInformation() {
  const installationId = localStorage.getItem('installationId');

  fetch(`${rest_url}/${installationId}`)
    .then(response => response.json())
    .then(data => {
      const inst = data
      installation = inst
      localStorage.setItem('qrid', inst['qrId'])
      for (const key in inst) {
        if (inst.hasOwnProperty(key)) {
          const val = inst[key];
          var temp = document.getElementById(key)
          if (key == 'address' || key == 'installationId' || key == 'qrId' || key == 'bbrId') {
            continue
          } else if (key == 'owner') {
            temp.placeholder = val['name']
          } else {
            temp.innerText = val
          }
        }
      }
      var picele = document.getElementById('infopic')
      picele.src = `${getimage_url}/${inst.installationId}.jpg`
    })
}

function GetOwners() {
  fetch(`${rest_url}/owners`)
    .then(response => response.json())
    .then(data => {
      // console.log(data)

      var dlist = document.getElementById('ownerlist')
      var option;

      for (let i = 0; i < data.length; i++) {
        option = dlist.appendChild(document.createElement('option'))
        option.dataset.ownerid = data[i].ownerId
        option.value = data[i].name
      }

    })
}

function save() {
  //POST mod REST
  //og fjern "admin"-creds
  console.log(installation)
  var changed = false
  for (const key in installation) {
    if (installation.hasOwnProperty(key)) {
      const val = installation[key];
      var temp = document.getElementById(key)
      if (key == 'address' || key == 'installationId' || key == 'qrId' || key == 'bbrId') {
        continue
      } else if (key == 'owner') {
        if (temp.value != "" && temp.value != val) {
          //Her sætter vi owner til at være værdien i input feltet. Men det skal være et owner objekt.
          //Nu er det bare navnet, og det er ikke nok når det skal videre til RESTen
          var ownerId;

          var dl = document.getElementById('ownerlist').children
          for (let i = 0; i < dl.length; i++) {
            if (dl[i].value == temp.value) ownerId = dl[i].dataset.ownerid;
          }


          installation[key] = {
            'ownerId': ownerId
          }
          changed = true
        }
      } else {
        if (temp.innerText != val) {
          installation[key] = temp.innerText
          changed = true
        }
      }
    }
  }
  JSON.stringify(installation)
  if (changed) put(installation)
}

function put(installation) {
  fetch(`${rest_url}/${installation['installationId']}`, {
    method: 'PUT',
    body: JSON.stringify(installation),
    headers: {
      'content-type': 'application/json'
    }
  })

}

function cancel() {
  window.location.href = 'installation.html'
  localStorage.removeItem('admin')
}