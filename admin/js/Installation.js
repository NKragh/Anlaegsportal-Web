import {
  local_url,
  getimage_url,
  rest_url
} from "../../js/storage.js";

document.onload = GetInformation()

document.getElementById('editbtn').addEventListener('click', edit)

async function GetInformation() {
  var ref = document.referrer

  if (ref.split('/')[3] == "address.html") {
    const installationId = localStorage.getItem('installationId');

    fetch(`${rest_url}/${installationId}`)
      .then(response => response.json())
      .then(data => {
        const inst = data
        localStorage.setItem('qrid', inst['qrId'])
        for (const key in inst) {
          if (inst.hasOwnProperty(key)) {
            const val = inst[key];
            var temp = document.getElementById(key)
            if (key == 'address') {
              temp.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${val}`
              temp.href = `https://www.google.com/maps/place/${val}/`
            } else if (key == 'installationId' || key == 'qrId' || key == 'bbrId') {
              continue
            } else if (key == 'owner') {
              temp.innerHTML = `<a href="mailto:${val['email']}">${val['name']}</a>`
              // temp.innerText = val['name']
              // temp.setAttribute('data-email', val['email'])
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
    fetch(`${rest_url}/search?qrid=${qrid}`)
      .then(response => response.json())
      .then(data => {
        const inst = data[0]
        console.log(inst)
        localStorage.setItem('installationId', inst.installationId)
        localStorage.setItem('bbrid', inst.bbrId)
        for (const key in inst) {
          if (inst.hasOwnProperty(key)) {
            var temp = document.getElementById(key)
            const val = inst[key];
            if (key == 'address') {
              temp.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${val}`
              temp.href = `https://www.google.com/maps/place/${val}/`
            } else if (key == 'installationId' || key == 'qrId' || key == 'bbrId') {
              continue
            } else if (key == 'owner') {
              temp.innerHTML = `<a href="mailto:${val['email']}">${val['name']}</a>`
              // temp.innerText = val['name']
              // temp.setAttribute('data-email', val['email'])
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

function edit() {
  window.location.href = "edit.html"
}