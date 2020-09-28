document.onload = GetInstallations()
document.onload = setlinks()
var linkliste = []

/**
 * Sets links on rows in tableasd
 */
function setlinks() {
  linkliste = document.getElementsByName('installationLink')
  linkliste.forEach(l => {
    l.href = "installation.html"
  });
}

var installationList = []

function GetInstallations() {
  bbrid = localStorage.getItem("bbrid")
  console.log(bbrid)

  fetch(`https://lekondbrest.azurewebsites.net/api/installations/search?bbrid=${bbrid}`)
    // fetch(`http://localhost:51456/api/installations/search?bbrid=${bbrid}`)
    .then(response => response.json())
    .then(data => {
      installationList = data

      var table = document.getElementById('installationTable')

      for (let i = 0; i < installationList.length; i++) {
        var str = `<div class="trow">`

        str += `<a name="installationlink" class="cell" style="text-align: center;"><i style="font-size: 20px; color: grey;" class="fas fa-bookmark"></i></a>`
        str += `<a name="installationLink" class="cell"><img style="width: inherit; max-width: 45px;" src="./common/dykkerflaske.jpg"alt=""></a>`
        str += `<a name="installationLink" class="cell">${installationList[i].make}</a>`
        str += `<a name="installationLink" class="cell">${installationList[i].productType}</a>`
        str += `<a name="installationLink" class="cell">${installationList[i].bbrId}</a>`
        str += `<a name="installationLink" class="cell">${installationList[i].lastReview}</a>`
        str += `<a name="installationLink" class="cell">${installationList[i].responsible}</a>`
        str += `<div class="cell">
                  <div style="display: flex;">
                    <a href="edit.html">
                      <i class="actionbutton fas fa-pencil-alt"></i>
                    </a>
                    <a href="installation.html">
                      <i class="actionbutton fas fa-archive"></i>
                    </a>
                    <a href="installation.html">
                      <i class="actionbutton fas fa-plus-square"></i>
                    </a>
                    <a href="installation.html">
                      <i class="actionbutton fas fa-stream"></i>
                    </a>
                    <a href="installation.html">
                      <i class="actionbutton fas fa-clipboard-list"></i>
                    </a>
                    <a href="installation.html">
                      <i class="actionbutton fas fa-comment-dots"></i>
                    </a>
                    <a href="installation.html">
                      <i class="actionbutton fas fa-eye"></i>
                    </a>
                  </div>
                </div>`

        str += `</div>`
        table.innerHTML += str
      }

      console.log(installationList)
    });
}