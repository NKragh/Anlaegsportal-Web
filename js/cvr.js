/**
 * Gets information from the CVR API based on input text
 */
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

/**
 * Fills result into a html list
 * @param {Object} data - JSON data from CVR API
 */
function fyldresult(data) {
  let div = document.getElementById('resultlist')
  for (const key in data) {
    const value = data[key];
    div.innerHTML += `<li>${key} : ${value}</li>`
  }
}