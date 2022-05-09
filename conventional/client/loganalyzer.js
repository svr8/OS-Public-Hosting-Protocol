const fs = require("fs")

const getMean = numList => {
  let res = 0
  for (let i=0; i<numList.length; i++) res += numList[i]
  return res / numList.length
}
const getMax = numList => {
  let res = -1
  for (let i=0; i<numList.length; i++) res = Math.max(res, numList[i])
  return res / numList.length
}

const getMin = numList => {
  let res = 9999999999
  for (let i=0; i<numList.length; i++) res = Math.min(res, numList[i])
  return res / numList.length
}

const showAnalyticsData = (runTimeList, intervalList) => {
  const meanRuntime = getMean(runTimeList)
  const minRuntime = getMin(runTimeList)
  const maxRuntime = getMax(runTimeList)
  const testCases = runTimeList.length
  const meanInterval = getMean(intervalList)
  const minInterval = getMean(intervalList)
  const maxInterval = getMean(intervalList)
  
  console.log('Test Cases:', testCases)
  console.log('Mean Runtime:', meanRuntime, 'ms')
  console.log('Min Runtime:', minRuntime, 'ms')
  console.log('Max Runtime:', maxRuntime, 'ms')
  console.log('Mean Interval:', meanInterval, 'ms')
  console.log('Min Interval:', minInterval, 'ms')
  console.log('Max Interval:', maxInterval, 'ms')
}
const analyzeTestCases = (logList) => {
  const lightRunTimeList = []
  const mediumRunTimeList = []
  const heavyRunTimeList = []
  
  const lightTestCaseIntervalList = []
  const mediumTestCaseIntervalList = []
  const heavyTestCaseIntervalList = []
  let lightLastTestCaseEnd = -1
  let mediumLastTestCaseEnd = -1
  let heavyLastTestCaseEnd = -1

  logList.map(log => {
    const data = JSON.parse(log)
    if (data.logType != 'test-case')
      return
    
    const testRuntime = data.testEndTimeStamp - data.testStartTimeStamp
    
    lastTestCaseEnd = data.testEndTimeStamp
    if (data.testType == 'light') {
      lightRunTimeList.push(testRuntime)
      if (lightLastTestCaseEnd != -1) {
        lightTestCaseIntervalList.push(data.testStartTimeStamp - lightLastTestCaseEnd)
      }
      lightLastTestCaseEnd = data.testEndTimeStamp
    }
    
    if (data.testType == 'medium') {
      mediumRunTimeList.push(testRuntime)
      if (mediumLastTestCaseEnd != -1) {
        mediumTestCaseIntervalList.push(data.testStartTimeStamp - mediumLastTestCaseEnd)
      }
      mediumLastTestCaseEnd = data.testEndTimeStamp
    }

    if (data.testType == 'heavy') {
      heavyRunTimeList.push(testRuntime)
      if (heavyLastTestCaseEnd != -1) {
        heavyTestCaseIntervalList.push(data.testStartTimeStamp - heavyLastTestCaseEnd)
      }
      heavyLastTestCaseEnd = data.testEndTimeStamp
    }
  })

  console.log('LIGHT TESTCASES')
  console.log('---------------')
  showAnalyticsData(lightRunTimeList, lightTestCaseIntervalList)
  console.log('Payload Size:', 100, 'Bytes')
  console.log('')

  console.log('MEDIUM TESTCASES')
  console.log('---------------')
  showAnalyticsData(mediumRunTimeList, mediumTestCaseIntervalList)
  console.log('Payload Size:', 200000, 'Bytes')
  console.log('')

  console.log('HEAVY TESTCASES')
  console.log('---------------')
  showAnalyticsData(heavyRunTimeList, heavyTestCaseIntervalList)
  console.log('Payload Size:', 1000000, 'Bytes')
  console.log('')
}

const analyzePayloads = (logList) => {
  const runTimeList = []
  const payloadSizeList = []

  logList.map(log => {
    const data = JSON.parse(log)
    if (data.logType != 'fetchRemoteData')
      return
    
    const testRuntime = data.recieveTimestamp - data.sendTimeStamp
    runTimeList.push(testRuntime)
    payloadSizeList.push(data.payloadSize)
  })

  console.log('PAYLOADS')
  console.log('---------------')
  console.log('Mean Runtime:', getMean(runTimeList), 'ms')
  console.log('Mean Payload Size:', getMean(payloadSizeList), 'Bytes')
  console.log('')
}

const analyze = (logList) => {
  analyzeTestCases(logList)  
  analyzePayloads(logList)
}

const content = fs.readFileSync("./logs/default.log", {encoding: 'utf8'})

const logList = content.split('\n')
analyze(logList)
