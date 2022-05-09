const axios = require('axios')

module.exports = {
  fetchRemoteData: async (url, options) => {
    const sendTimeStamp = Date.now()
    const res = await axios.get(url, options)
    const logData = {
      logType: 'fetchRemoteData',
      sendTimeStamp,
      recieveTimestamp: Date.now(),
      // url,
      // options,
      // headers: res.headers,
      // data: res.data,
      payloadSize: res.data.length,
    }
    console.log(JSON.stringify(logData))
    return { data: res.data, sessionId: res.headers['sessionid'] }
  },
  unwrapPromiseArray: (promiseArray) => {
    return new Promise((resolve, reject) => {
      let len = promiseArray.length
      if (len == 0)
        resolve([])
  
      const res = []
      promiseArray.map(async (promise ) => {
        try {
          const data = await promise
          res.push(data)
  
          len = len - 1
          if (len == 0)
            resolve(res)
        } catch (err) {
          console.log("AXIOS_ERROR:", err)
          resolve('')
        }
      })
    })
  }

} 