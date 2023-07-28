import assert from "assert";
import BillWithSettings from "../settings-bill.js";

describe("the bill with settings factory function: setting values", function () {
  it("should be a able to set the call cost", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(1.85);
    assert.equal(1.85, settingsBill.getCallCost());

    let settingsBill2 = BillWithSettings();
    settingsBill2.setCallCost(2.75);
    assert.equal(2.75, settingsBill2.getCallCost());
  });
  it("should be a able to set the sms cost", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setSmsCost(0.800001);
    assert.equal(0.800001, settingsBill.getSmsCost());

    let settingsBill2 = BillWithSettings();
    settingsBill2.setSmsCost(1.75);
    assert.equal(1.75, settingsBill2.getSmsCost());
  });

  it("should be a able to set the sms and cost", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(3);
    settingsBill.setSmsCost(12);

    assert.equal(12, settingsBill.getSmsCost());

    assert.equal(3, settingsBill.getCallCost());

    let settingsBill2 = BillWithSettings();

    settingsBill2.setCallCost(8);
    settingsBill2.setSmsCost(12.5);

    assert.equal(12.5, settingsBill2.getSmsCost());

    assert.equal(8, settingsBill2.getCallCost());
  });
  it("should be a able to set the warning level", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setWarningLevel(30);
    assert.equal(30, settingsBill.getWarningLevel());

    let settingsBill2 = BillWithSettings();
    settingsBill2.setWarningLevel(40);
    assert.equal(40, settingsBill2.getWarningLevel());
  });

  it("should be a able to set the warning level and call cost", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(3);
    settingsBill.setWarningLevel(12);

    assert.equal(12, settingsBill.getWarningLevel());

    assert.equal(3, settingsBill.getCallCost());

    let settingsBill2 = BillWithSettings();

    settingsBill2.setCallCost(8);
    settingsBill2.setWarningLevel(12.5);

    assert.equal(12.5, settingsBill2.getWarningLevel());

    assert.equal(8, settingsBill2.getCallCost());
  });
  it("should be a able to set the critical level", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCriticalLevel(50);
    assert.equal(50, settingsBill.getCriticalLevel());

    let settingsBill2 = BillWithSettings();
    settingsBill2.setCriticalLevel(60);
    assert.equal(60, settingsBill2.getCriticalLevel());
  });
  it("should be a able to set the warning level and critical level", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCriticalLevel(80);
    settingsBill.setWarningLevel(40);

    assert.equal(40, settingsBill.getWarningLevel());

    assert.equal(80, settingsBill.getCriticalLevel());

    let settingsBill2 = BillWithSettings();

    settingsBill2.setCriticalLevel(90);
    settingsBill2.setWarningLevel(30);

    assert.equal(30, settingsBill2.getWarningLevel());

    assert.equal(90, settingsBill2.getCriticalLevel());
  });
});

describe("use values", function () {
  it("should be a able to use the call cost and sms cost set for 3 calls and 3 sms", function () {
    let settingsBill = BillWithSettings();
    settingsBill.setCriticalLevel(10);

    settingsBill.setCallCost(4);
    settingsBill.setSmsCost(3);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.sendSms();

    assert.equal(12, settingsBill.getTotalCost());
    assert.equal(12, settingsBill.getTotalCallCost());
    assert.equal(0, settingsBill.getTotalSmsCost());
  });
  it("should be a able to use the call cost set and sms set for 2 calls and 2 sms' at R2 and R4 respectively each", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCriticalLevel(10);
    settingsBill.setCallCost(2);
    settingsBill.setSmsCost(4);

    settingsBill.makeCall();
    settingsBill.makeCall();

    settingsBill.sendSms();
    settingsBill.sendSms();

    assert.equal(12, settingsBill.getTotalCost());
    assert.equal(4, settingsBill.getTotalCallCost());
    assert.equal(8, settingsBill.getTotalSmsCost());
  });
});

describe("warning and critical level", function () {
  it("it should return a class name of warning if warning level is reached and critical if critical level is reached ; should also test the updated classnames when the warning and critical levels are updated", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.85);
    settingsBill.setWarningLevel(5);

    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal("warning", settingsBill.totalClassName());

    settingsBill.setWarningLevel(8);
    settingsBill.setCriticalLevel(15);
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal(9.45, settingsBill.getTotalCost());
    assert.equal("warning", settingsBill.totalClassName());

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal(16.2, settingsBill.getTotalCost());
    assert.equal("critical", settingsBill.totalClassName());
  });

  it("it should return a class name of critical if critical level is reached  ", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.5);
    settingsBill.setSmsCost(10);
    settingsBill.setWarningLevel(5);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    // settingsBill.sendSms();
    // settingsBill.sendSms();

    assert.equal("critical", settingsBill.totalClassName());
  });

  it("it should stop the total call cost from increasing when the critical level is reached  ", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.5);
    settingsBill.setSmsCost(10);
    settingsBill.setWarningLevel(5);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal("critical", settingsBill.totalClassName());
    assert.equal(10, settingsBill.getTotalCallCost());
  });

  it("it should allow the total to increase after reaching the critical level and upping the critical level", function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.5);
    settingsBill.setSmsCost(10);
    settingsBill.setWarningLevel(8);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal("critical", settingsBill.totalClassName());
    assert.equal(10, settingsBill.getTotalCallCost());

    settingsBill.setCriticalLevel(20);
    assert.equal("warning", settingsBill.totalClassName());
    settingsBill.makeCall();
    settingsBill.makeCall();
    assert.equal(15, settingsBill.getTotalCallCost());
  });
});
