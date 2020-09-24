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

document.onload = setlinks()
var linkliste = []

/**
 * Sets links on rows in table
 */
function setlinks() {
  linkliste = document.getElementsByName('installationLink')
  linkliste.forEach(l => {
    l.href = "installation.html"
  });
}
