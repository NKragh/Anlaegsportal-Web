document.onload = testapi()


function changemap(data) {
  var kort = document.getElementById('iframemap')
  console.log(coordinate)
  kort.src = `https://www.google.com/maps/@${coordinate[0].x},${coordinate[0].y},12z`
  // str = `https://maps.google.com/maps?q=${data.adresse.vejnavn}+${data.adresse.husnr}&amp;ie=UTF8&amp;iwloc=&amp;output=embed`
  // kort.src = "https://www.w3schools.com" + "&output=embed"
  // kort.src = str
}




function testapi() {
  let instlist = [];

  fetch('http://localhost:51456/api/installations')
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