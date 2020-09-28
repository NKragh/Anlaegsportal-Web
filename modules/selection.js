var selectedAddress = ""

/**
 * Gets installations from database on selected BBR address.
 * @param {Integer} bbrid - BBRid, used as query parameter in REST API
 */
function selected(bbrid) {
  selectedAddress = bbrid
    
  console.log(selectedAddress)
  // navigate('address')
}

export {selected, selectedAddress};