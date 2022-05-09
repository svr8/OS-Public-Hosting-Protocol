const { SERVER_URL } = require('./config')
const { fetchRemoteData, unwrapPromiseArray } = require('./util')

const fetchData = async (payloadType) => {
  const promiseList = [
    fetchRemoteData(`${SERVER_URL}/data?payloadType=${payloadType}`, {}),
  ]
  await Promise.all(promiseList)
  const res = await unwrapPromiseArray(promiseList)
  return res[0].data
}

const responseTimeTest = async (lightTestCount, mediumTestCount, heavyTestCount) => {
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

  for (let i=0; i<heavyTestCount; i++) {
    const testStartTimeStamp = Date.now()
    const testID = `heavy-${i}`
    const logType = 'test-case'
    waitingList.push(await fetchData('heavy'))
    const testEndTimeStamp = Date.now()
    const testType = 'heavy'
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