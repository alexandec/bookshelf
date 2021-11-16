function client(endpoint, customConfig = {method: 'GET'}) {
  const fullUrl = `${process.env.REACT_APP_API_URL}/${endpoint}`

  return window.fetch(fullUrl, customConfig).then(async response => {
    const data = await response.json()
    return response.ok ? data : Promise.reject(data)
  })
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
