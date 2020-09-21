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

let installation = new Installation();

async function testapi() {
  
  let result = await fetch('http://localhost:51456/api/installations')
  console.log(result)
}

document.onload = setlinks()

function navigate(input) {
  switch (input) {
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
        console.log(installation.tekst)
      }
    })
}

function changemap(data) {
  var kort = document.getElementById('iframemap')
  console.log(data)
  // kort.src = `https://www.google.com/maps/${coordinate[0].x}, ${coordinate[0].y}, 12<`
  str = `https://maps.google.com/maps?q=${data.adresse.vejnavn}+${data.adresse.husnr}&amp;ie=UTF8&amp;iwloc=&amp;output=embed`
  // kort.src = "https://www.w3schools.com" + "&output=embed"
  kort.src = str
}

var linkliste = []

function setlinks() {
  linkliste = document.getElementsByName('installationLink')
  linkliste.forEach(l => {
    l.href = "mockup-installation.html"
  });
}