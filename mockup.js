class Installation {
  id
  status
  darstatus
  vejkode
  vejnavn
  adresseringsvejnavn
  husnr
  etage
  dør
  supplerendebynavn
  postnr
  postnrnavn
  stormodtagerpostnr
  stormodtagerpostnrnavn
  kommunekode
  adgangsadresseid
  x
  y
  href
  tekst
  constructor() {}
}



function navigate(input) {
  switch (input) {
    case "installation":
      window.location.href = 'mockup-installation.html'
    case "address":
      window.location.href = 'mockup-address.html'
      break;
    case "edit":
      window.location.href = 'edit.html'
    default:
      break;
  }
}

var coordinate = []
var str = "";

function search() {
  var ele = document.getElementById('iaddress')
  var value = ele.value

  console.log(value)

  fetch(`https://dawa.aws.dk/adresser/autocomplete?q=${value} &fuzzy=`)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      var liste = document.getElementById('optionlist')
      liste.innerHTML = ""
      coordinate = []
      data.forEach(a => {
        // console.log(a)
        liste.innerHTML += `<li onclick="navigate('address')" class="optionlist" value="'+${a.adresse.id}+'">${a.tekst}</li>`
        coordinate.push({
          x: a.adresse.x,
          y: a.adresse.y
        })
      });
      if (coordinate.length == 1) {
        installation = data[0]
        // changemap(installation)
      }
    })
}

//Sætter links på rækker i tabellen.
document.onload = setlinks()
var linkliste = []


function setlinks() {
  linkliste = document.getElementsByName('installationLink')
  linkliste.forEach(l => {
    l.href = "mockup-installation.html"
  });
}
