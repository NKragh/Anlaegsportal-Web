import {
  getimage_url,
  rest_url
} from "./storage.js";

document.onload = GetInformation()

async function GetInformation() {
  var data = [];

  var ref = document.referrer
  console.log(ref.split('/'))

  if (ref.split('/')[3] == "address.html") {
    myfetch('address')
      .then(result => {
        const inst = result
        localStorage.setItem('qrid', inst['qrId'])
        console.log(inst)
        for (const key in inst) {
          if (inst.hasOwnProperty(key)) {
            const val = inst[key];
            // console.log(key, val)
            var temp = document.getElementById(key)
            if (key == 'bbrId') {
              temp.innerHTML = '<i class="fas fa-map-marker-alt"></i>'
              temp.innertext += val
              temp.href = `https://www.google.com/maps/place/${val}/`
            } else if (key == 'qrId') {
              continue
            } else {
              temp.innerText = val
            }
          }
        }
        var picele = document.getElementById('infopic')
        picele.src = `${getimage_url}/${inst.installationId}.jpg`
      })
  } else {
    myfetch('qrid') //
      .then(data => {
        const inst = data
        localStorage.setItem('installationId', inst.installationId)
        localStorage.setItem('bbrid', inst.bbrId)
        console.log(inst)
        for (const key in inst) {
          if (inst.hasOwnProperty(key)) {
            var temp;
            const val = inst[key];
            // console.log(key, val)
            if (key == 'bbrId') {
              fetch(`https://dawa.aws.dk/adresser/${val}`)
                .then(response => response.json())
                .then(data => {
                  temp = document.getElementById(key)

                  var address = data['adressebetegnelse']

                  temp.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${address}`
                  temp.href = `https://www.google.com/maps/place/${data['adressebetegnelse']}/`
                })
            } else if (key == 'qrId') {
              continue
            } else {
              temp = document.getElementById(key)
              temp.innerText = val
            }
          }
        }
        var picele = document.getElementById('infopic')
        picele.src = `${getimage_url}/${inst.installationId}.jpg`

      })
  }
}

async function myfetch(q) {
  if (q == 'address') {
    const installationId = localStorage.getItem('installationId');

    var response = await fetch(`${rest_url}${installationId}`)
    var data = await response.json()
    return data
  } else {
    try {
      var qrid = localStorage.getItem('qrid')
    } catch (error) {
      var qrid = ""
      console.log(error)
    }

    var response = await fetch(`${rest_url}search?qrid=${qrid}`)
    var data = await response.json()
    return data[0]

  }
}