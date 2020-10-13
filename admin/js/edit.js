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
  var ref = document.referrer

  if (ref.split('/')[3] == "address.html") {
    const installationId = localStorage.getItem('installationId');

    fetch(`${local_url}/${installationId}`)
      .then(response => response.json())
      .then(data => {
        const inst = data
        installation = inst
        localStorage.setItem('qrid', inst['qrId'])
        for (const key in inst) {
          if (inst.hasOwnProperty(key)) {
            const val = inst[key];
            var temp = document.getElementById(key)
            if (key == 'address') {
              temp = document.getElementById(key)
              temp.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${val}`
              temp.href = `https://www.google.com/maps/place/${val}/`
            } else if (key == 'installationId' || key == 'qrId' || key == 'bbrId') {
              continue
            } else if (key == 'owner') {
              temp.innerText = val['email']
            } else {
              temp.innerText = val
            }
          }
        }
        var picele = document.getElementById('infopic')
        picele.src = `${getimage_url}/${inst.installationId}.jpg`
      })
  } else {
    var qrid = localStorage.getItem('qrid')
    fetch(`${local_url}/search?qrid=${qrid}`)
      .then(response => response.json())
      .then(data => {
        const inst = data[0]
        installation = inst

        // console.log(inst)
        localStorage.setItem('installationId', inst.installationId)
        localStorage.setItem('bbrid', inst.bbrId)
        for (const key in inst) {
          if (inst.hasOwnProperty(key)) {
            var temp = document.getElementById(key)
            const val = inst[key];
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
}

function GetOwners() {
  fetch(`${local_url}/owners`)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      var dlist = document.getElementById('ownerlist')
      var option;

      for (let i = 0; i < data.length; i++) {
        option = dlist.appendChild(document.createElement('option'))
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
        if (temp.value != null && temp.value != val) {
          //Her sætter vi owner til at være værdien i input feltet. Men det skal være et owner objekt.
          //Nu er det bare navnet, og det er ikke nok når det skal videre til RESTen
          installation[key] = temp.value
          changed = true
        }
      } else {
        if (temp.innerText != val) {
          installation[key] = temp.innerText
          changed = true
        }
      }

      // if (key == 'address') {
      //   temp = document.getElementById(key)
      //   temp.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${val}`
      //   temp.href = `https://www.google.com/maps/place/${val}/`
      // } else if (key == 'installationId' || key == 'qrId' || key == 'bbrId') {
      //   continue
      // } else if (key == 'owner') {
      //   temp.innerHTML = `<a href="mailto:${val['email']}">${val['name']}</a>`
      //   // temp.innerText = val['name']
      //   // temp.setAttribute('data-email', val['email'])
      // } else {
      //   temp.innerText = val
      // }
    }
  }
  if (changed) put(installation)
}

function put(installation) {
  fetch(`${local_url}/${installation['installationId']}`, {
    method: 'PUT',
    body: JSON.stringify(installation),
    headers: {
      'content-type': 'application/json'
    }
  })

}

function cancel() {
  window.location.href = '../address.html'
  localStorage.removeItem('admin')
}