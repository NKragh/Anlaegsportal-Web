//Navigate() kan bruges til at navigerer mellem 
function navigate(input) {
  switch (input) {
    case "home":
      window.location.href = '/'
      break;
    case "address":
      try {
        // document.getElementById('installationlink')
        window.location.href = 'address.html'
      } catch (error) {
        
        window.location.href = 'address.html'
      }
      break;
    case "installation":
      window.location.href = 'installation.html'
      break;
    case "edit":
      window.location.href = 'edit.html'
      break;
    case "documentation":
      window.location.href = 'documentation.html'
      break;
    case "review":
      window.location.href = 'review.html'
      break;
    default:
      break;
  }
}