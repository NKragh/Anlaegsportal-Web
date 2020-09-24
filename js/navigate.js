//Navigate() kan bruges til at navigerer mellem 
function navigate(input) {
  switch (input) {
    case "home":
      window.location.href = '/'
      break;
    case "address":
      window.location.href = 'mockup-address.html'
      break;
    case "installation":
      window.location.href = 'mockup-installation.html'
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