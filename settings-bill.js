export default function BillWithSettings() {
  var theCallCost = 0;
  var theSmsCost = 0;
  var WarningLevel = 0;
  var CriticalLevel = 0;
  var callCostTotal = 0;
  var SmsCostTotal = 0;

  function setCallCost(callCost) {
    theCallCost = callCost;
  }
  function getCallCost() {
    return theCallCost;
  }

  function setSmsCost(smsCost) {
    theSmsCost = smsCost;
  }
  function getSmsCost() {
    return theSmsCost;
  }
  function setWarningLevel(WarnLevel) {
    WarningLevel = WarnLevel;
  }
  function getWarningLevel() {
    return WarningLevel;
  }
  function setCriticalLevel(CriticLevel) {
    CriticalLevel = CriticLevel;
  }
  function getCriticalLevel() {
    return CriticalLevel;
  }
  function makeCall() {
    if (!hasReachedCriticalLevel()) {
      callCostTotal += theCallCost;
    }
  }
  function sendSms() {
    if (!hasReachedCriticalLevel()) {
      SmsCostTotal += theSmsCost;
    }
  }
  function getTotalCallCost() {
    return callCostTotal;
  }
  function getTotalSmsCost() {
    return SmsCostTotal;
  }
  function getTotalCost() {
    return callCostTotal + SmsCostTotal;
  }
  function hasReachedCriticalLevel() {
    return getTotalCost() >= getCriticalLevel();
  }
  function totalClassName() {
    if (hasReachedCriticalLevel()) {
      return "critical";
    }
    if (getTotalCost() >= getWarningLevel()) {
      return "warning";
    }
  }

  return {
    setCallCost,
    getCallCost,
    setSmsCost,
    getSmsCost,
    setWarningLevel,
    getWarningLevel,
    setCriticalLevel,
    getCriticalLevel,
    makeCall,
    sendSms,
    getTotalCost,
    getTotalCallCost,
    getTotalSmsCost,
    hasReachedCriticalLevel,
    totalClassName,
  };
}
