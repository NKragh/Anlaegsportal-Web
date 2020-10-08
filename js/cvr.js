document.getElementById('inputcvr').addEventListener('keydown', hentcvr)

/**
 * Gets information from the CVR API based on input text
 */
function hentcvr() {

  if (event.key == "Enter") {
    result = {}

    input = document.getElementById('inputcvr').value

    fetch(`https://cvrapi.dk/api?search=${input}&country=dk`, {
        headers: {
          "User-agent": "Test af CVR integration til mit projekt"
        }
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        fyldresult(data)
        let list = document.getElementById('resultlist')
        for (const key in data) {
          const value = data[key];
          list.innerHTML += `<li>${key} : ${value}</li>`
        }
      })
  } else {
    return
  }
}

/**
 * Fills result into a html list
 * @param {Object} data - JSON data from CVR API
 */
function fyldresult(data) {
  let list = document.getElementById('resultlist')
  for (const key in data) {
    const value = data[key];
    list.innerHTML += `<li>${key} : ${value}</li>`
  }
}