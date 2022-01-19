const apiRequest = async (url = '', optionsObj = null, errorMessage = null) => {
  try {
    const response = await fetch(url, optionsObj);
    if(!response.ok) throw Error("please reload the app"); 

  } catch(err) {
    errorMessage = err.message;
  } finally {
  return errorMessage
  }
}

export default apiRequest