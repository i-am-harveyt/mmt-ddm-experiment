/**
 * `APP_URL` stores the endpoint of Google App Script
 */
const APP_URL = "http://localhost:8080";
// "https://script.google.com/macros/s/AKfycbwBdzSzb9o6OBd2MLcWr2URp_3D2EKcsI7o6WwLpn4I-gVNQyhYxNbhZGVDShPY29L-6Q/exec";

/**
 * `timeline` stores the steps of the experiment
 */
const timeline = [];

/**
 * Experiment Settings
 */
const params = {
  trialsPerBlock: 20,
  popupFreq: { low: 2, med: 5, high: 8 },
  trialDuration: 15000,
  popupDuration: 3000,
};

// --- 1. Questionnaires ---
// Short Media Multitasking Measure (MMM-S)
const mmm_sScale = ["從不", "有時", "經常", "總是"];
const mmm_sQuestions = [
  {
    prompt: "當您看電視時，您多常同時...聽音樂？",
    name: "MMM_TV_Music",
    labels: mmm_sScale,
    required: true,
  },
  {
    prompt: "當您看電視時，您多常同時...傳訊息（如 문자, WhatsApp, Line）？",
    name: "MMM_TV_Msg",
    labels: mmm_sScale,
    required: true,
  },
  {
    prompt:
      "當您看電視時，您多常同時...使用社群網站（如 Facebook, Instagram）？",
    name: "MMM_TV_SNS",
    labels: mmm_sScale,
    required: true,
  },
  // ... Add all 9 questions from Appendix 1 here
];
const mmm_sSurvey = {
  type: jsPsychSurveyLikert,
  questions: mmm_sQuestions,
  preamble:
    "<h3>媒體使用習慣問卷</h3><p>以下問題旨在了解您同時使用不同媒體的頻率。</p>",
  data: { task: "mmm_s_survey" },
};
// timeline.push(mmm_sSurvey);

// Polychronic–Monochronic Tendency Scale (PMTS)
const pmtsScale = ["非常不同意", "不同意", "普通", "同意", "非常同意"];
const pmtsQuestions = [
  {
    prompt: "我偏好同時進行兩件或更多活動。",
    name: "PMTS_1",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "我通常會同時進行兩件或更多活動。",
    name: "PMTS_2",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "同時做兩件以上的事是我運用時間最有效率的方式。",
    name: "PMTS_3",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "對於同時做一件以上的事情，我感到很自在。",
    name: "PMTS_4",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "我喜歡同時處理兩件或更多活動。",
    name: "PMTS_5",
    labels: pmtsScale,
    required: true,
  },
];
const pmtsSurvey = {
  type: jsPsychSurveyLikert,
  questions: pmtsQuestions,
  preamble: "<h3>個人處事風格問卷</h3>",
  data: { task: "pmts_survey" },
};
// timeline.push(pmtsSurvey);

// --- 2. Instructions ---
const instructions = {
  type: jsPsychInstructions,
  pages: [
    "<h2>實驗說明</h2><p>歡迎參與本次實驗。</p><p>接下來，您的任務是同時進行兩項工作。</p>",
    "<p><b>主要任務：</b>您會在畫面右側看到一系列的電子郵件，請您盡快且正確地判斷每封郵件是「工作相關」還是「非工作相關」。</p><p>請點擊郵件下方的<b>「工作相關」</b>或<b>「非工作相關」</b>按鈕進行分類。</p>",
    "<p><b>次要任務：</b>在進行郵件分類的同時，畫面左側有一個訊息欄，你可以透過這個欄位迅速的處理客戶訊息。</p><p>我們將會紀錄您處理的比率，並且為您顯示在螢幕上。</p>",
    "<p>實驗過程中，畫面可能會隨機出現一些干擾訊息。請您盡力完成您的主要任務。</p><p>準備好後請按 \"Next\" 開始。",
  ],
  show_clickable_nav: true,
  button_label_next: "Next",
  button_label_previous: "Previous",
};
timeline.push(instructions);

// --- 3. Inter-block Questionnaire
const interBlockQuestions = [
  {
    prompt: "我偏好同時進行兩件或更多活動。",
    name: "INTER_1",
    labels: pmtsScale,
    required: true,
  },
];
const interBlockSurvey = {
  type: jsPsychSurveyLikert,
  questions: interBlockQuestions,
  preamble: "<h3>個人處事風格問卷</h3>",
  data: { task: "pmts_survey" },
};

// --- 4. Secondary Task ---
const RESPONSE_BEHAVIOR = [
  "收到，我們將立刻為您查詢",
  "請提供你的訂單編號",
  "該問題已經轉交技術部門，我們會盡快回覆您",
];
/**
 * Renders only the chat history and reply area for a given contact.
 * @param {Object} event - The customer event object to display.
 */
function renderCurrentEventDisplay(event) {
  if (!event) {
    return "<p style='padding: 10px; text-align: center;'>No pending customer messages.</p>";
  }
  return `
    <div class="event-content-wrapper" data-event-id="${event.id}" style="padding: 16px; background-color: #ffffff; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
      <h4 style="margin-top: 0; margin-bottom: 8px; color: #343a40; font-size: 0.95em; font-weight: 600;">From: ${event.contactName}</h4>
      <p style="margin-bottom: 18px; color: #495057; font-size: 0.9em; line-height: 1.5;">${event.text}</p>
    </div>
  `;
}

function renderMessagingPanel() {
  // This function now primarily sets up the structure.
  // The actual event and counts will be filled by updateMessagingPanelDisplay.
  return `
	  <div id="messaging-panel-container" style='
		background-color: #f8f9fa; /* Softer background */
		border-right: 1px solid #e9ecef; /* Softer border */
		display: flex;
		flex-direction: column;
		padding: 15px; /* Increased padding */
		gap: 20px;
        flex: 1; /* Allow it to take space */
        min-width: 350px; /* Ensure minimum width */
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; /* Modern font stack */
	  '>
		<div id="event-display-area" style="flex-grow: 1; min-height: 200px;">
			<!-- Current event will be rendered here by updateMessagingPanelDisplay -->
    </div>
		<div id="response-options-container" style="display: flex; flex-direction: column; gap: 8px; margin-top: 15px;">
			${RESPONSE_BEHAVIOR.map(response => `
				<button 
					class="response-btn" 
					data-response="${response}"
				>
					${response}
				</button>`).join('')}
		</div>
		<div id="messaging-footer" style="padding: 12px 15px; border-top: 1px solid #dee2e6; font-size: 0.85em; color: #495057; background-color: #e9ecef; border-radius: 0 0 6px 6px;">
			<p style="margin: 5px 0;">Pending Messages: <span id="pending-count">0</span></p>
			<p style="margin: 5px 0;">Handled Messages: <span id="handled-count">0</span></p>
		</div>
	  </div>
`;
}

function updateMessagingPanelDisplay() {
  const currentPendingEvent = customerServiceEvents.find(event => event.status === 'pending');
  const pendingCount = customerServiceEvents.filter(event => event.status === 'pending').length;
  const handledCount = customerServiceEvents.filter(event => event.status === 'handled').length;

  const eventDisplayArea = document.getElementById('event-display-area');
  if (eventDisplayArea) {
    eventDisplayArea.innerHTML = renderCurrentEventDisplay(currentPendingEvent);
  }

  const pendingCountEl = document.getElementById('pending-count');
  const handledCountEl = document.getElementById('handled-count');
  if (pendingCountEl) pendingCountEl.textContent = pendingCount;
  if (handledCountEl) handledCountEl.textContent = handledCount;

  const responseButtonsContainer = document.getElementById('response-options-container');
  if (responseButtonsContainer) {
    const buttons = responseButtonsContainer.querySelectorAll('.response-btn');
    buttons.forEach(btn => btn.disabled = !currentPendingEvent);
  }
}

function handleEventResponse(eventId, responseText) {
  const eventIndex = customerServiceEvents.findIndex(e => e.id === eventId);
  if (eventIndex === -1) return;

  const event = customerServiceEvents[eventIndex];
  event.status = 'handled';
  event.chosenResponse = responseText;
  event.handledTimestamp = new Date().toISOString();

  const currentTrial = jsPsych.getCurrentTrial();
  const trialData = currentTrial ? currentTrial.data : { block: undefined, trialIndex: undefined };
  const globalTrialIndex = jsPsych.getProgress().current_trial_global_idx;

  handledEventLog.push({
    eventId: event.id,
    contactName: event.contactName,
    originalText: event.text,
    response: responseText,
    timestamp: event.handledTimestamp,
    blockType: trialData.block,        // Primary task block type
    trialIndex: trialData.trialIndex,  // Primary task trial index
    globalTrialIndex: globalTrialIndex,  // Global trial index
  });

  const eventContentWrapper = document.querySelector('#event-display-area .event-content-wrapper');
  if (eventContentWrapper && eventContentWrapper.dataset.eventId === eventId) {
    eventContentWrapper.classList.add('handled');
    setTimeout(() => {
      updateMessagingPanelDisplay(); // Re-render after fade out
    }, 500); // Must match CSS transition duration
  } else {
    updateMessagingPanelDisplay(); // Fallback if element somehow not found
  }
}


// --- 5. Primary Task ---
// Task Settings
const trialsLow = [
  {
    Subject: "Birthday reminder",
    Body: "Don't forget our movie night this Saturday! Snacks on me.",
    Type: "Non-work-related",
    Block: 1,
    Trial: 1,
    CorrectAnswer: "n",
  },
  {
    Subject: "System update",
    Body: "We need to finalize the budget before Friday's submission deadline.",
    Type: "Work-related",
    Block: 1,
    Trial: 2,
    CorrectAnswer: "w",
  },
  {
    Subject: "Training schedule",
    Body: "I've shared the Q2 report. Let me know if any section needs editing.",
    Type: "Work-related",
    Block: 1,
    Trial: 3,
    CorrectAnswer: "w",
  },
  {
    Subject: "Onboarding process",
    Body: "The onboarding guide for new hires has been updated. Please circulate.",
    Type: "Work-related",
    Block: 1,
    Trial: 4,
    CorrectAnswer: "w",
  },
  {
    Subject: "Project deadline",
    Body: "The system upgrade will begin at 9 PM on Wednesday. Please log off early.",
    Type: "Work-related",
    Block: 1,
    Trial: 5,
    CorrectAnswer: "w",
  },
  {
    Subject: "HR policy update",
    Body: "Kindly complete your quarterly performance review by Monday.",
    Type: "Work-related",
    Block: 1,
    Trial: 6,
    CorrectAnswer: "w",
  },
  {
    Subject: "Netflix show",
    Body: "Did you see the latest episode of that Netflix drama? Wild ending!",
    Type: "Non-work-related",
    Block: 1,
    Trial: 7,
    CorrectAnswer: "n",
  },
  {
    Subject: "Birthday reminder",
    Body: "Want to grab sushi for lunch tomorrow?",
    Type: "Non-work-related",
    Block: 1,
    Trial: 8,
    CorrectAnswer: "n",
  },
  {
    Subject: "System update",
    Body: "The system upgrade will begin at 9 PM on Wednesday. Please log off early.",
    Type: "Work-related",
    Block: 1,
    Trial: 9,
    CorrectAnswer: "w",
  },
  {
    Subject: "Vacation memories",
    Body: "Check out this deal on running shoes—50% off until midnight!",
    Type: "Non-work-related",
    Block: 1,
    Trial: 10,
    CorrectAnswer: "n",
  },
  {
    Subject: "Project deadline",
    Body: "The client has requested revisions to the proposal. See comments inside.",
    Type: "Work-related",
    Block: 1,
    Trial: 11,
    CorrectAnswer: "w",
  },
  {
    Subject: "Onboarding process",
    Body: "The client has requested revisions to the proposal. See comments inside.",
    Type: "Work-related",
    Block: 1,
    Trial: 12,
    CorrectAnswer: "w",
  },
  {
    Subject: "Pet photos",
    Body: "Reminder: Mom's birthday dinner is at 7 PM tonight.",
    Type: "Non-work-related",
    Block: 1,
    Trial: 13,
    CorrectAnswer: "n",
  },
  {
    Subject: "Vacation memories",
    Body: "Don't forget our movie night this Saturday! Snacks on me.",
    Type: "Non-work-related",
    Block: 1,
    Trial: 14,
    CorrectAnswer: "n",
  },
  {
    Subject: "Lunch plan",
    Body: "Did you see the latest episode of that Netflix drama? Wild ending!",
    Type: "Non-work-related",
    Interruption: true,
    Block: 1,
    Trial: 15,
    CorrectAnswer: "n",
  },
  {
    Subject: "Gym membership",
    Body: "Check out this deal on running shoes—50% off until midnight!",
    Type: "Non-work-related",
    Block: 1,
    Trial: 16,
    CorrectAnswer: "n",
  },
  {
    Subject: "Game night",
    Body: "Here are the photos from our beach trip last weekend!",
    Type: "Non-work-related",
    Block: 1,
    Trial: 17,
    CorrectAnswer: "n",
  },
  {
    Subject: "Weekend party",
    Body: "Look at this adorable cat video I found today. So cute!",
    Type: "Non-work-related",
    Block: 1,
    Trial: 18,
    CorrectAnswer: "n",
  },
  {
    Subject: "Quarterly report",
    Body: "The client has requested revisions to the proposal. See comments inside.",
    Type: "Work-related",
    Block: 1,
    Trial: 19,
    CorrectAnswer: "w",
  },
  {
    Subject: "Concert tickets",
    Body: "I'm planning a game night this weekend. You're invited!",
    Type: "Non-work-related",
    Block: 1,
    Trial: 20,
    CorrectAnswer: "n",
  },
  {
    Subject: "Weekend party",
    Body: "Did you see the latest episode of that Netflix drama? Wild ending!",
    Type: "Non-work-related",
    Block: 1,
    Trial: 21,
    CorrectAnswer: "n",
  },
  {
    Subject: "Budget approval",
    Body: "The client has requested revisions to the proposal. See comments inside.",
    Type: "Work-related",
    Block: 1,
    Trial: 22,
    CorrectAnswer: "w",
  },
  {
    Subject: "Team meeting",
    Body: "I've shared the Q2 report. Let me know if any section needs editing.",
    Type: "Work-related",
    Block: 1,
    Trial: 23,
    CorrectAnswer: "w",
  },
  {
    Subject: "Budget approval",
    Body: "Kindly complete your quarterly performance review by Monday.",
    Type: "Work-related",
    Block: 1,
    Trial: 24,
    CorrectAnswer: "w",
  },
  {
    Subject: "Team meeting",
    Body: "Please review the attached document before tomorrow's meeting.",
    Type: "Work-related",
    Block: 1,
    Trial: 25,
    CorrectAnswer: "w",
  },
  {
    Subject: "Game night",
    Body: "Reminder: Mom's birthday dinner is at 7 PM tonight.",
    Type: "Non-work-related",
    Block: 1,
    Trial: 26,
    CorrectAnswer: "n",
  },
  {
    Subject: "Onboarding process",
    Body: "Your attendance is required for the compliance training next week.",
    Type: "Work-related",
    Block: 1,
    Trial: 27,
    CorrectAnswer: "w",
  },
  {
    Subject: "Team meeting",
    Body: "Please review the attached document before tomorrow's meeting.",
    Type: "Work-related",
    Block: 1,
    Trial: 28,
    CorrectAnswer: "w",
  },
  {
    Subject: "Concert tickets",
    Body: "Here are the photos from our beach trip last weekend!",
    Type: "Non-work-related",
    Block: 1,
    Trial: 29,
    CorrectAnswer: "n",
  },
  {
    Subject: "Vacation memories",
    Body: "Want to grab sushi for lunch tomorrow?",
    Type: "Non-work-related",
    Block: 1,
    Trial: 30,
    CorrectAnswer: "n",
  },
].slice(0, params.trialsPerBlock);
const trialsMed = [
  {
    Subject: "Online shopping deal",
    Body: "Let's sign up for that yoga class together. First class is free.",
    Type: "Non-work-related",
    Block: 2,
    Trial: 1,
    CorrectAnswer: "n",
  },
  {
    Subject: "Project deadline",
    Body: "Reminder: the team sync-up call is scheduled for 10 AM tomorrow.",
    Type: "Work-related",
    Block: 2,
    Trial: 2,
    CorrectAnswer: "w",
  },
  {
    Subject: "Team meeting",
    Body: "Reminder: the team sync-up call is scheduled for 10 AM tomorrow.",
    Type: "Work-related",
    Block: 2,
    Trial: 3,
    CorrectAnswer: "w",
  },
  {
    Subject: "Weekend party",
    Body: "Got extra tickets for the concert on Friday—interested?",
    Type: "Non-work-related",
    Block: 2,
    Trial: 4,
    CorrectAnswer: "n",
  },
  {
    Subject: "Performance review",
    Body: "Reminder: the team sync-up call is scheduled for 10 AM tomorrow.",
    Type: "Work-related",
    Block: 2,
    Trial: 5,
    CorrectAnswer: "w",
  },
  {
    Subject: "Performance review",
    Body: "Your attendance is required for the compliance training next week.",
    Type: "Work-related",
    Block: 2,
    Trial: 6,
    CorrectAnswer: "w",
  },
  {
    Subject: "System update",
    Body: "Kindly complete your quarterly performance review by Monday.",
    Type: "Work-related",
    Interruption: true,
    Block: 2,
    Trial: 7,
    CorrectAnswer: "w",
  },
  {
    Subject: "Pet photos",
    Body: "Here are the photos from our beach trip last weekend!",
    Type: "Non-work-related",
    Block: 2,
    Trial: 8,
    CorrectAnswer: "n",
  },
  {
    Subject: "Lunch plan",
    Body: "Want to grab sushi for lunch tomorrow?",
    Type: "Non-work-related",
    Block: 2,
    Trial: 9,
    CorrectAnswer: "n",
  },
  {
    Subject: "Performance review",
    Body: "The onboarding guide for new hires has been updated. Please circulate.",
    Type: "Work-related",
    Block: 2,
    Trial: 10,
    CorrectAnswer: "w",
  },
  {
    Subject: "Online shopping deal",
    Body: "Want to grab sushi for lunch tomorrow?",
    Type: "Non-work-related",
    Block: 2,
    Trial: 11,
    CorrectAnswer: "n",
  },
  {
    Subject: "Weekend party",
    Body: "Got extra tickets for the concert on Friday—interested?",
    Type: "Non-work-related",
    Block: 2,
    Trial: 12,
    CorrectAnswer: "n",
  },
  {
    Subject: "Client feedback",
    Body: "The onboarding guide for new hires has been updated. Please circulate.",
    Type: "Work-related",
    Block: 2,
    Trial: 13,
    CorrectAnswer: "w",
  },
  {
    Subject: "Lunch plan",
    Body: "Look at this adorable cat video I found today. So cute!",
    Type: "Non-work-related",
    Interruption: true,
    Block: 2,
    Trial: 14,
    CorrectAnswer: "n",
  },
  {
    Subject: "Client feedback",
    Body: "Please review the attached document before tomorrow's meeting.",
    Type: "Work-related",
    Block: 2,
    Trial: 15,
    CorrectAnswer: "w",
  },
  {
    Subject: "Budget approval",
    Body: "Kindly complete your quarterly performance review by Monday.",
    Type: "Work-related",
    Block: 2,
    Trial: 16,
    CorrectAnswer: "w",
  },
  {
    Subject: "Weekend party",
    Body: "I'm planning a game night this weekend. You're invited!",
    Type: "Non-work-related",
    Block: 2,
    Trial: 17,
    CorrectAnswer: "n",
  },
  {
    Subject: "Performance review",
    Body: "The client has requested revisions to the proposal. See comments inside.",
    Type: "Work-related",
    Block: 2,
    Trial: 18,
    CorrectAnswer: "w",
  },
  {
    Subject: "Game night",
    Body: "Want to grab sushi for lunch tomorrow?",
    Type: "Non-work-related",
    Block: 2,
    Trial: 19,
    CorrectAnswer: "n",
  },
  {
    Subject: "Netflix show",
    Body: "I'm planning a game night this weekend. You're invited!",
    Type: "Non-work-related",
    Block: 2,
    Trial: 20,
    CorrectAnswer: "n",
  },
  {
    Subject: "System update",
    Body: "Reminder: the team sync-up call is scheduled for 10 AM tomorrow.",
    Type: "Work-related",
    Interruption: true,
    Block: 2,
    Trial: 21,
    CorrectAnswer: "w",
  },
  {
    Subject: "Client feedback",
    Body: "We need to finalize the budget before Friday's submission deadline.",
    Type: "Work-related",
    Block: 2,
    Trial: 22,
    CorrectAnswer: "w",
  },
  {
    Subject: "Online shopping deal",
    Body: "Here are the photos from our beach trip last weekend!",
    Type: "Non-work-related",
    Block: 2,
    Trial: 23,
    CorrectAnswer: "n",
  },
  {
    Subject: "Pet photos",
    Body: "Don't forget our movie night this Saturday! Snacks on me.",
    Type: "Non-work-related",
    Block: 2,
    Trial: 24,
    CorrectAnswer: "n",
  },
  {
    Subject: "Netflix show",
    Body: "Let's sign up for that yoga class together. First class is free.",
    Type: "Non-work-related",
    Block: 2,
    Trial: 25,
    CorrectAnswer: "n",
  },
  {
    Subject: "Project deadline",
    Body: "We need to finalize the budget before Friday's submission deadline.",
    Type: "Work-related",
    Block: 2,
    Trial: 26,
    CorrectAnswer: "w",
  },
  {
    Subject: "Pet photos",
    Body: "Here are the photos from our beach trip last weekend!",
    Type: "Non-work-related",
    Block: 2,
    Trial: 27,
    CorrectAnswer: "n",
  },
  {
    Subject: "Onboarding process",
    Body: "The system upgrade will begin at 9 PM on Wednesday. Please log off early.",
    Type: "Work-related",
    Interruption: true,
    Block: 2,
    Trial: 28,
    CorrectAnswer: "w",
  },
  {
    Subject: "Online shopping deal",
    Body: "Got extra tickets for the concert on Friday—interested?",
    Type: "Non-work-related",
    Block: 2,
    Trial: 29,
    CorrectAnswer: "n",
  },
  {
    Subject: "Budget approval",
    Body: "I've shared the Q2 report. Let me know if any section needs editing.",
    Type: "Work-related",
    Block: 2,
    Trial: 30,
    CorrectAnswer: "w",
  },
].slice(0, params.trialsPerBlock);
const trialsHigh = [
  {
    Subject: "System update",
    Body: "The client has requested revisions to the proposal. See comments inside.",
    Type: "Work-related",
    Interruption: true,
    Block: 3,
    Trial: 1,
    CorrectAnswer: "w",
  },
  {
    Subject: "Pet photos",
    Body: "Got extra tickets for the concert on Friday—interested?",
    Type: "Non-work-related",
    Block: 3,
    Trial: 2,
    CorrectAnswer: "n",
  },
  {
    Subject: "Weekend party",
    Body: "Let's sign up for that yoga class together. First class is free.",
    Type: "Non-work-related",
    Block: 3,
    Trial: 3,
    CorrectAnswer: "n",
  },
  {
    Subject: "Game night",
    Body: "Let's sign up for that yoga class together. First class is free.",
    Type: "Non-work-related",
    Interruption: true,
    Block: 3,
    Trial: 4,
    CorrectAnswer: "n",
  },
  {
    Subject: "Online shopping deal",
    Body: "Did you see the latest episode of that Netflix drama? Wild ending!",
    Type: "Non-work-related",
    Block: 3,
    Trial: 5,
    CorrectAnswer: "n",
  },
  {
    Subject: "Project deadline",
    Body: "Reminder: the team sync-up call is scheduled for 10 AM tomorrow.",
    Type: "Work-related",
    Block: 3,
    Trial: 6,
    CorrectAnswer: "w",
  },
  {
    Subject: "Gym membership",
    Body: "Let's sign up for that yoga class together. First class is free.",
    Type: "Non-work-related",
    Block: 3,
    Trial: 7,
    CorrectAnswer: "n",
  },
  {
    Subject: "Vacation memories",
    Body: "Look at this adorable cat video I found today. So cute!",
    Type: "Non-work-related",
    Interruption: true,
    Block: 3,
    Trial: 8,
    CorrectAnswer: "n",
  },
  {
    Subject: "HR policy update",
    Body: "Your attendance is required for the compliance training next week.",
    Type: "Work-related",
    Block: 3,
    Trial: 9,
    CorrectAnswer: "w",
  },
  {
    Subject: "Training schedule",
    Body: "Your attendance is required for the compliance training next week.",
    Type: "Work-related",
    Block: 3,
    Trial: 10,
    CorrectAnswer: "w",
  },
  {
    Subject: "Quarterly report",
    Body: "Your attendance is required for the compliance training next week.",
    Type: "Work-related",
    Block: 3,
    Trial: 11,
    CorrectAnswer: "w",
  },
  {
    Subject: "Budget approval",
    Body: "Your attendance is required for the compliance training next week.",
    Type: "Work-related",
    Interruption: true,
    Block: 3,
    Trial: 12,
    CorrectAnswer: "w",
  },
  {
    Subject: "Birthday reminder",
    Body: "Look at this adorable cat video I found today. So cute!",
    Type: "Non-work-related",
    Block: 3,
    Trial: 13,
    CorrectAnswer: "n",
  },
  {
    Subject: "Pet photos",
    Body: "Check out this deal on running shoes—50% off until midnight!",
    Type: "Non-work-related",
    Block: 3,
    Trial: 14,
    CorrectAnswer: "n",
  },
  {
    Subject: "HR policy update",
    Body: "We need to finalize the budget before Friday's submission deadline.",
    Type: "Work-related",
    Block: 3,
    Trial: 15,
    CorrectAnswer: "w",
  },
  {
    Subject: "Birthday reminder",
    Body: "Don't forget our movie night this Saturday! Snacks on me.",
    Type: "Non-work-related",
    Interruption: true,
    Block: 3,
    Trial: 16,
    CorrectAnswer: "n",
  },
  {
    Subject: "Project deadline",
    Body: "The onboarding guide for new hires has been updated. Please circulate.",
    Type: "Work-related",
    Block: 3,
    Trial: 17,
    CorrectAnswer: "w",
  },
  {
    Subject: "Training schedule",
    Body: "We need to finalize the budget before Friday's submission deadline.",
    Type: "Work-related",
    Block: 3,
    Trial: 18,
    CorrectAnswer: "w",
  },
  {
    Subject: "Birthday reminder",
    Body: "I'm planning a game night this weekend. You're invited!",
    Type: "Non-work-related",
    Interruption: true,
    Block: 3,
    Trial: 19,
    CorrectAnswer: "n",
  },
  {
    Subject: "Concert tickets",
    Body: "Let's sign up for that yoga class together. First class is free.",
    Type: "Non-work-related",
    Interruption: true,
    Block: 3,
    Trial: 20,
    CorrectAnswer: "n",
  },
  {
    Subject: "Quarterly report",
    Body: "Kindly complete your quarterly performance review by Monday.",
    Type: "Work-related",
    Block: 3,
    Trial: 21,
    CorrectAnswer: "w",
  },
  {
    Subject: "Performance review",
    Body: "Reminder: the team sync-up call is scheduled for 10 AM tomorrow.",
    Type: "Work-related",
    Block: 3,
    Trial: 22,
    CorrectAnswer: "w",
  },
  {
    Subject: "Onboarding process",
    Body: "Kindly complete your quarterly performance review by Monday.",
    Type: "Work-related",
    Block: 3,
    Trial: 23,
    CorrectAnswer: "w",
  },
  {
    Subject: "Performance review",
    Body: "The onboarding guide for new hires has been updated. Please circulate.",
    Type: "Work-related",
    Interruption: true,
    Block: 3,
    Trial: 24,
    CorrectAnswer: "w",
  },
  {
    Subject: "Netflix show",
    Body: "Here are the photos from our beach trip last weekend!",
    Type: "Non-work-related",
    Block: 3,
    Trial: 25,
    CorrectAnswer: "n",
  },
  {
    Subject: "Performance review",
    Body: "Don't forget to submit your weekly status report by EOD Friday.",
    Type: "Work-related",
    Block: 3,
    Trial: 26,
    CorrectAnswer: "w",
  },
  {
    Subject: "Lunch plan",
    Body: "Let's sign up for that yoga class together. First class is free.",
    Type: "Non-work-related",
    Block: 3,
    Trial: 27,
    CorrectAnswer: "n",
  },
  {
    Subject: "Netflix show",
    Body: "Reminder: Mom's birthday dinner is at 7 PM tonight.",
    Type: "Non-work-related",
    Interruption: true,
    Block: 3,
    Trial: 28,
    CorrectAnswer: "n",
  },
  {
    Subject: "Online shopping deal",
    Body: "Reminder: Mom's birthday dinner is at 7 PM tonight.",
    Type: "Non-work-related",
    Block: 3,
    Trial: 29,
    CorrectAnswer: "n",
  },
  {
    Subject: "Budget approval",
    Body: "I've shared the Q2 report. Let me know if any section needs editing.",
    Type: "Work-related",
    Block: 3,
    Trial: 30,
    CorrectAnswer: "w",
  },
].slice(0, params.trialsPerBlock);
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

const POPUP_MESSAGES = [
  // 工作相關
  "提醒：下午三點有部門會議。",
  "專案 A 的進度報告已更新，請查閱。",
  "IT部門通知：系統將於今晚 10 點進行維護。",
  "請確認您的差旅報銷單已提交。",
  "新的工作流程指南已發布，請大家熟悉。",
  // 工作無關
  "週末有空一起去看電影嗎？",
  "樓下咖啡廳今天買一送一！",
  "誰訂的午餐外賣到了？",
  "這週末天氣好像不錯，適合出遊。",
  "推薦一本好書給你！",
  // 客戶反饋 (感激)
  "非常感謝您的快速協助，問題解決了！",
  "你們的服務真是太棒了，超出我的預期！",
  // 客戶反饋 (抱怨/問題)
  "我對上次的處理結果不太滿意，可以重新檢視嗎？",
  "為什麼我的問題還沒有得到解決？已經等很久了。",
  "系統又出現錯誤了，請盡快修復！"
];


const initialChatData = {
  Alice: [
    { sender: "Alice", text: "我已經把文件上傳到共用資料夾了。" },
    { sender: "Alice", text: "請問您現在有空嗎？我想請教一個問題。" },
  ],
  Bob: [
    { sender: "Bob", text: "我需要那個報告，可以今天給我嗎？" },
    { sender: "Bob", text: "帳單什麼時候需要付款？" },
  ],
  Charles: [
    { sender: "Charles", text: "上次會議的記錄在哪裡可以找到？" },
  ],
  David: [
    { sender: "David", text: "這個功能好像有點問題，能幫我看看嗎？" },
    { sender: "David", text: "我對新的政策有些疑問。" },
  ],
  Eve: [{ sender: "Eve", text: "請問產品的詳細規格是什麼？" }],
  Frank: [
    { sender: "Frank", text: "我想要預約下週二的諮詢。" },
    { sender: "Frank", text: "謝謝你的協助！" },
  ],
  Grace: [{ sender: "Grace", text: "我的訂單狀態是什麼？" }],
  Henry: [
    { sender: "Henry", text: "可以提供一下你們的聯絡方式嗎？" },
    { sender: "Henry", text: "這個問題我之前問過了，還沒解決。" },
  ],
  Ivy: [{ sender: "Ivy", text: "我需要更改我的帳戶資訊。" }],
  Jack: [
    { sender: "Jack", text: "請問這個服務的費用是多少？" },
    { sender: "Jack", text: "我找不到相關的說明文件。" },
  ],
};

const customerServiceEvents = [];
let eventIdCounter = 0;
for (const contactName in initialChatData) {
  if (initialChatData.hasOwnProperty(contactName)) {
    initialChatData[contactName].forEach(message => {
      if (message.sender === contactName) { // Assuming messages from contact are events
        customerServiceEvents.push({
          id: `evt${++eventIdCounter}`,
          contactName: contactName,
          text: message.text,
          status: 'pending', // 'pending', 'handled'
          timestamp: new Date(Date.now() - Math.random() * 100000).toISOString(), // Add some jitter for ordering
          chosenResponse: null,
        });
      }
    });
  }
}
customerServiceEvents.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Ensure chronological order

const handledEventLog = []; // Replaces chatMessageLog

function renderEmailTask(trial) {
  return `
		<div style='
			flex: 2; /* Takes up more space than the chat panel */
			padding: 25px;
			display: flex;
			flex-direction: column;
			background-color: #f9f9f9; /* Light grey background for the panel */
			position: relative; /* To position the countdown timer */
            font-family: Arial, Helvetica, sans-serif; /* Common email font */
            color: #333; /* Default text color */
        '
		>
			<div id="countdown-timer" style="
        position: absolute; top: 15px; right: 20px;
        font-size: 1.1em; color: #555; background-color: #f0f0f0;
        padding: 5px 10px; border-radius: 5px;"></div>

            <div class="email-header" style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0;">
                <div style="margin-bottom: 8px;">
                    <span style="font-weight: bold; color: #666; min-width: 70px; display: inline-block;">From:</span>
                    <span style="color: #2a2a2a;">sender@example.com</span>
                </div>
                <div style="margin-bottom: 8px;">
                    <span style="font-weight: bold; color: #666; min-width: 70px; display: inline-block;">Subject:</span>
                    <span style="color: #2a2a2a; font-weight: bold; font-size: 1.1em;">${trial.Subject}</span>
                </div>
                <div>
                    <span style="font-weight: bold; color: #666; min-width: 70px; display: inline-block;">Date:</span>
                    <span style="color: #444; font-size: 0.9em;">${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            <div class="email-body-container" style="flex-grow: 1; background-color: #ffffff; border: 1px solid #dcdcdc; border-radius: 4px; padding: 20px; overflow-y: auto; margin-bottom: 20px; min-height: 200px;">
    			<p style='font-size: 1em; line-height: 1.6; margin: 0;'>${trial.Body.replace(/\n/g, "<br>")}</p>
            </div>

			<!-- Buttons will be added by jsPsychHtmlButtonResponse plugin -->
		</div>
	`;
}
function buildStimulus(trial, popup) {
  return `
	<div style='
		position: relative;
		width: 80dvw; height: 80dvh;
		display: flex;
		border: 1px solid #ccc;
		font-family: sans-serif;
		box-shadow: 0 0 10px rgba(0,0,0,0.1);
	'>
		<!-- Popup -->
		${popup}

		<!-- Chat Panel -->
		${renderMessagingPanel()}

		<!-- Email Task Panel -->
		${renderEmailTask(trial)}
	</div>
	`;
}
const trialBlocks = createPrimaryTasks().map((block) => {
  return block.map((trial) => {
    const popup = trial.Interruption
      ? `<div class="jspsych-popup-message">
        <p><strong>${POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)]}</strong></p>
		    </div>`
      : "";
    return {
      type: jsPsychHtmlButtonResponse, // Changed plugin type
      stimulus: buildStimulus(trial, popup),
      button_html: ['<button class="jspsych-btn">%choice%</button>', '<button class="jspsych-btn">%choice%</button>'], // Provide button HTML as an array
      choices: ["Work-related", "Non-work-related"], // Button labels
      trial_duration: params.trialDuration,
      data: {
        block: trial.Block,
        trialIndex: trial.Trial,
        timestamp: (new Date()).toISOString(),
      },
      on_load: function () {
        // Initialize chat panel listeners and view
        updateMessagingPanelDisplay(); // Initial render of the messaging panel content

        // Event delegation for response buttons
        const messagingPanelContainer = document.getElementById('messaging-panel-container');
        if (messagingPanelContainer && !messagingPanelContainer.dataset.listenerAttached) {
          messagingPanelContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('response-btn')) {
              const responseText = event.target.dataset.response;
              // Get eventId from the currently displayed event content
              const eventContentWrapper = document.querySelector('#event-display-area .event-content-wrapper');

              if (eventContentWrapper && eventContentWrapper.dataset.eventId) {
                const eventId = eventContentWrapper.dataset.eventId;
                handleEventResponse(eventId, responseText);
                event.target.blur(); // << 從按鈕移除焦點
              } else {
                console.warn("Response button clicked, but no event content found or eventId is missing.");
              }
            }
          });
          messagingPanelContainer.dataset.listenerAttached = 'true'; // Mark that listener is attached
        }


        // Countdown timer logic
        const timerElement = document.getElementById('countdown-timer');
        let timeLeft = Math.floor(params.trialDuration / 1000);

        if (timerElement) {
          timerElement.innerText = `Time: ${timeLeft}s`;
        }

        // Store intervalId on the trial object to clear it in on_finish
        this.countdownIntervalId = setInterval(() => {
          timeLeft--;
          if (timerElement) {
            timerElement.textContent = `Time: ${Math.max(0, timeLeft)}s`;
          }
          if (timeLeft <= 0) {
            clearInterval(this.countdownIntervalId);
          }
        }, 1000);
      },
      on_finish: function (data) {
        // Clear the interval when the trial finishes
        if (this.countdownIntervalId) {
          clearInterval(this.countdownIntervalId);
        }
        // 'trial' here is from the closure of the .map(trial => ...)
        // data.response will be the index of the button clicked if choices are strings.
        // Or, if jsPsychHtmlButtonResponse stores the string label, this is simpler.
        // Let's assume data.response is the string label of the button.
        let response_key = '';
        if (data.response === "Work-related") { // jsPsychHtmlButtonResponse returns index, so map to label
          response_key = 'w';
        } else if (data.response === "Non-work-related") {
          response_key = 'n';
        }
        data.correct = response_key === trial.CorrectAnswer;
      }
    };
  });
});
function createPrimaryTasks() {
  const arr = [trialsLow, trialsMed, trialsHigh];
  shuffle(arr);
  return arr;
}

function addCustomStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .event-content-wrapper {
      transition: opacity 0.5s ease-out, transform 0.5s ease-out, max-height 0.5s ease-out;
      overflow: hidden;
      max-height: 500px; /* Initial max-height for transition, ensure it's enough for content */
    }
    .event-content-wrapper.handled {
      opacity: 0;
      transform: scale(0.95) translateY(-20px);
      max-height: 0 !important; /* Ensure it collapses */
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-bottom: 0 !important;
      border-width: 0 !important;
    }
    .response-btn {
      padding: 10px 15px;
      font-size: 0.875em; /* 14px */
      background-color: #3498db; /* A pleasant blue */
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      text-align: left;
      transition: background-color 0.2s ease, box-shadow 0.2s ease;
      font-weight: 500;
      display: block; /* Make them full width within their container */
      width: 100%;
      box-sizing: border-box; /* Ensures padding doesn't add to width */
    }
    .response-btn:hover {
      background-color: #2980b9; /* Darker blue on hover */
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .response-btn:active {
      background-color: #2471a3; /* Even darker blue on active/click */
    }
    .jspsych-popup-message {
      position: fixed;
      bottom: 25px;
      right: 25px;
      background-color: #ffffff; /* Clean white background */
      color: #333; /* Darker text for readability */
      border: 1px solid #dee2e6; /* Softer border */
      border-radius: 6px; /* Rounded corners */
      padding: 12px 18px; /* Comfortable padding */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
      z-index: 10000; /* Ensure it's on top */
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-size: 0.9em;
    }

  `;
  document.head.appendChild(style);
}

timeline.push(
  ...[
    trialBlocks[0],
    interBlockSurvey,
    trialBlocks[1],
    interBlockSurvey,
    trialBlocks[2],
  ],
);

addCustomStyles(); // Add the CSS for animations

const jsPsych = initJsPsych({
  show_progress_bar: true,
  on_finish: () => {
    const experimentResult = jsPsych.data.get().json();
    const data = JSON.parse(experimentResult);

    // Map button response index to actual choice string for saving
    data.forEach(trialData => {
      if (trialData.choices && Number.isInteger(trialData.response) && trialData.choices[trialData.response]) {
        trialData.response_label = trialData.choices[trialData.response];
      }
    });

    const dataToSave = {
      experimentData: JSON.stringify(
        data.map((e) => {
          delete e.stimulus;
          delete e.plugin_version;
          return e;
        }),
      ),
      handledEvents: JSON.stringify(handledEventLog), // Save handled events log
    };
    document.body.innerHTML = JSON.stringify(dataToSave);
    const prolificId = jsPsych.data.getURLVariable("PROLIFIC_PID") || "unknown";

    fetch(APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        prolific_id: prolificId,
        data: dataToSave,
      }),
    }).then((response) => {
      // window.location.href = "about:blank";
      // "https://app.prolific.com/submissions/complete?cc=你的完成碼";
    });
  },
});
jsPsych.run(timeline);
