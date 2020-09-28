/**
 * Function that sets the map at the coordinates corresponding to the found address in search.
 * @param {Object} data  - Obsolete parameter.
 */
function changemap(data) {
  var kort = document.getElementById('iframemap')
  console.log(coordinate)
  kort.src = `https://www.google.com/maps/@${coordinate[0].x},${coordinate[0].y},12z`
  // str = `https://maps.google.com/maps?q=${data.adresse.vejnavn}+${data.adresse.husnr}&amp;ie=UTF8&amp;iwloc=&amp;output=embed`
  // kort.src = "https://www.w3schools.com" + "&output=embed"
  // kort.src = str
}

/**
 * Test function that gets installations from REST
 */
function testapi() {
  let instlist = [];

  // fetch('http://localhost:51456/api/installations')
  fetch('https://lekondbrest.azurewebsites.net/api/installations')
    .then(response => response.json())
    .then(body => {
      for (let i = 0; i < body.length; i++) {
        const inst = body[i];
        instlist.push(inst)
      }
    })
  
  console.log(instlist)
}

var coordinate = []
var str = "";

/**
 * Function that searches in the BBR's autocomplete API
 */
function search() {
  var ele = document.getElementById('iaddress')
  var value = ele.value

  // console.log(value)

  fetch(`https://dawa.aws.dk/adresser/autocomplete?q=${value} &fuzzy=`)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      var liste = document.getElementById('optionlist')
      liste.innerHTML = ""
      coordinate = []
      data.forEach(a => {
        // console.log(a)
        liste.innerHTML += `<li onclick="navigate('address')" class="optionlist" id="${a.adresse.id}" value="${a.adresse.id}">${a.tekst}</li>` //
        coordinate.push({
          x: a.adresse.x,
          y: a.adresse.y
        })
      });
      // if (coordinate.length == 1) {
      //   installation = data[0]
      //   var bbrid = document.getElementById(data[0].adresse.id).getAttribute("value")
      //   console.log(bbrid)

      //   selected(bbrid)
      //   // changemap(installation)
      // }
    })
}

function selected(bbrid) {
  // fetch(`https://www.lekondbrest.azurewebsites.net/api/installations/${bbrid}`)
  fetch(`http://localhost:51456/api/installations/${bbrid}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)

    })
}