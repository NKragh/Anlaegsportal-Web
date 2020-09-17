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

  fetch(`https://dawa.aws.dk/adresser/autocomplete?q=${value}&fuzzy=`)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      var liste = document.getElementById('optionlist')
      liste.innerHTML = ""
      coordinate = []
      data.forEach(a => {
        console.log(a)
        liste.innerHTML += `<li onclick="navigate()" class="optionlist" value="'+${a.adresse.id}+'">${a.tekst}</li>`
        coordinate.push({
          x: a.adresse.x,
          y: a.adresse.y
        })
      });
      // if (coordinate.length == 1) {
      //   console.log(coordinate)
      //   changemap(data[0])
      // }
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

//https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2252.522478317918!2d12.080531515925676!3d55.627724280520056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46525fe9a8b9ee3f%3A0xc1b98f0c07aa237b!2sPenselstr%C3%B8get%2030%2C%204000%20Roskilde!5e0!3m2!1sda!2sdk!4v1600252510578!5m2!1sda!2sdk
//https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2252.5101266681727!2d12.079593316561274!3d55.62793918052008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46525fe9a9327fa7%3A0x47b841097d1bbc90!2sPenselstr%C3%B8get%2066%2C%204000%20Roskilde!5e0!3m2!1sda!2sdk!4v1600252896720!5m2!1sda!2sdk