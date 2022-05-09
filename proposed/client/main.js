const axios = require('axios')
const { SERVER1_URL, SERVER2_URL, SERVER3_URL, AUTHSERVER_URL } = require('./config')
const { unwrapPromiseArray, fetchRemoteData } = require('./util')

let sessionId = ''

const requestNewSession = async () => {
  const res = await axios.post(`${AUTHSERVER_URL}/session`)
  const id = res.data
  return id
}

const fetchData = async (payloadType) => {
  try {
    const headers = { 'SESSION-ID': sessionId }
    const promiseList = [
      fetchRemoteData(`${SERVER1_URL}/data?payloadType=${payloadType}`, {headers}),
      fetchRemoteData(`${SERVER2_URL}/data?payloadType=${payloadType}`, {headers}),
      fetchRemoteData(`${SERVER3_URL}/data?payloadType=${payloadType}`, {headers}),
    ]
    await Promise.all(promiseList)
    const res = await unwrapPromiseArray(promiseList)
    sessionId = res[0].sessionId
    return res[0].data + res[1].data + res[2].data

  } catch(err) {
    console.log('Unauthorized.', err)
  }
}

const responseTimeTest = async (lightTestCount, mediumTestCount, heavyTestCount) => {
  sessionId = await requestNewSession()
  const waitingList = []
  for (let i=0; i<lightTestCount; i++) {
    const testStartTimeStamp = Date.now()
    const testID = `light-${i}`
    const logType = 'test-case'
    const testType = 'light'
    waitingList.push(await fetchData('light'))
    const testEndTimeStamp = Date.now()
    const logData = {
      testID,
      logType,
      testType,
      testStartTimeStamp,
      testEndTimeStamp,
    }
    console.log(JSON.stringify(logData))
  }
  await Promise.all(waitingList)
  waitingList.splice(0, waitingList.length)

  if (mediumTestCount>0)
    sessionId = await requestNewSession()
  for (let i=0; i<mediumTestCount; i++) {
    const testStartTimeStamp = Date.now()
    const testID = `medium-${i}`
    const logType = 'test-case'
    const testType = 'medium'
    waitingList.push(await fetchData('medium'))
    const testEndTimeStamp = Date.now()
    const logData = {
      testID,
      logType,
      testType,
      testStartTimeStamp,
      testEndTimeStamp,
    }
    console.log(JSON.stringify(logData))
  }
  await Promise.all(waitingList)
  waitingList.splice(0, waitingList.length)

  if (heavyTestCount>0)
    sessionId = await requestNewSession()
  for (let i=0; i<heavyTestCount; i++) {
    const testStartTimeStamp = Date.now()
    const testID = `heavy-${i}`
    const logType = 'test-case'
    const testType = 'heavy'
    waitingList.push(await fetchData('heavy'))
    const testEndTimeStamp = Date.now()
    const logData = {
      testID,
      logType,
      testType,
      testStartTimeStamp,
      testEndTimeStamp,
    }
    console.log(JSON.stringify(logData))
  }
  await Promise.all(waitingList)
  waitingList.splice(0, waitingList.length)
}

const main = async () => {
  await responseTimeTest(100, 100, 100)
}

main()