const data = {
  wifi: {
    title: "Wi-Fi not connecting",
    steps: [
      "Confirm the Wi-Fi is turned ON and Airplane Mode is OFF.",
      "Check if the issue affects one device or multiple devices.",
      "Restart the device and the router/modem (power cycle for 30 seconds).",
      "Forget the Wi-Fi network and reconnect using the correct password.",
      "Run the network troubleshooter and check IP address (DHCP).",
      "If still failing, try a different network or Ethernet to isolate ISP vs device."
    ],
    resolution: "Issue isolated. Most common fix: power cycle router + forget/reconnect network. If multiple devices fail, likely router/ISP; if one device fails, likely device settings/driver."
  },

  slow: {
    title: "Computer running slow",
    steps: [
      "Ask when the slowdown started and what changed (updates, new apps).",
      "Check Task Manager for high CPU/RAM/Disk usage.",
      "Disable unnecessary startup programs and restart.",
      "Free disk space (temp files) and check for low storage.",
      "Run malware scan and confirm OS updates.",
      "If still slow, check overheating or failing drive symptoms."
    ],
    resolution: "Issue isolated. Common fix: reduce startup apps, free storage, remove heavy background processes. If disk usage stays at 100%, consider drive health check."
  },

  login: {
    title: "Can’t log in",
    steps: [
      "Confirm the correct username/email and check Caps Lock/keyboard layout.",
      "Try password reset and confirm the reset email is received.",
      "Check account lockout or MFA issues (phone/email access).",
      "Try logging in from another browser/device to isolate browser issues.",
      "Clear cache/cookies or use private/incognito mode.",
      "If domain/work account, verify network/VPN and contact admin if locked."
    ],
    resolution: "Issue isolated. Common fix: reset password + verify MFA method. If login works on another device, clear cache/cookies or update browser."
  },

  printer: {
    title: "Printer not printing",
    steps: [
      "Check printer power, paper, and any error lights/messages.",
      "Confirm correct printer is selected and not paused/offline.",
      "Restart printer and computer; reseat cables or reconnect Wi-Fi.",
      "Clear the print queue and try a test print.",
      "Reinstall/update printer driver.",
      "If network printer, verify same network and ping printer IP."
    ],
    resolution: "Issue isolated. Common fix: clear print queue + restart printer. If offline on network, reconnect to Wi-Fi or verify printer IP/network."
  }
};

const issueSelect = document.getElementById("issue");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const simCard = document.getElementById("simCard");
const issueTitle = document.getElementById("issueTitle");
const stepCount = document.getElementById("stepCount");
const stepText = document.getElementById("stepText");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const resultBox = document.getElementById("resultBox");
const resolutionText = document.getElementById("resolutionText");

let currentIssueKey = "wifi";
let currentStepIndex = 0;

function renderStep() {
  const issue = data[currentIssueKey];
  issueTitle.textContent = issue.title;

  stepCount.textContent = `Step ${currentStepIndex + 1} of ${issue.steps.length}`;
  stepText.textContent = issue.steps[currentStepIndex];

  backBtn.disabled = currentStepIndex === 0;

  const atLastStep = currentStepIndex === issue.steps.length - 1;
  nextBtn.textContent = atLastStep ? "Finish" : "Next";
}

function showResult() {
  const issue = data[currentIssueKey];
  resolutionText.textContent = issue.resolution;
  resultBox.hidden = false;
  nextBtn.disabled = true;
  backBtn.disabled = true;
}

function startSim() {
  currentIssueKey = issueSelect.value;
  currentStepIndex = 0;
  simCard.hidden = false;
  resultBox.hidden = true;

  nextBtn.disabled = false;
  resetBtn.disabled = false;

  renderStep();
}

function resetSim() {
  simCard.hidden = true;
  resultBox.hidden = true;
  nextBtn.disabled = false;
  backBtn.disabled = true;
  resetBtn.disabled = true;
}

startBtn.addEventListener("click", startSim);

resetBtn.addEventListener("click", resetSim);

backBtn.addEventListener("click", () => {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderStep();
  }
});

nextBtn.addEventListener("click", () => {
  const issue = data[currentIssueKey];
  const atLastStep = currentStepIndex === issue.steps.length - 1;

  if (atLastStep) {
    showResult();
  } else {
    currentStepIndex++;
    renderStep();
  }
});
