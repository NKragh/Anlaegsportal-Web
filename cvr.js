function hentcvr() {
  result = {}

  input = document.getElementById('inputcvr').value

  fetch(`https://cvrapi.dk/api?search=${input}&country=dk`, {
      headers: {
        "User-agent": "Test af CVR integration til mit projekt"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      fyldresult(data)
    })
}

function fyldresult(data) {
  let div = document.getElementById('resultdiv')
  div.innerHTML = '<ul style="list-style-type:none;">'

  for (const key in data) {
    const value = data[key];
    div.innerHTML += `<li>${key} : ${value}</li>`
  }

  div.innerHTML += '</ul>'

}