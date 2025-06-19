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
    "<p><b>主要任務：</b>您會在畫面左側看到一系列的電子郵件，請您盡快且正確地判斷每封郵件是「工作相關」還是「非工作相關」。</p><p>請按 <b>w 鍵</b> 代表「工作相關」，按 <b>n 鍵</b> 代表「非工作相關」。</p>",
    "<p><b>次要任務：</b>在進行郵件分類的同時，畫面左側有一個訊息欄，你可以透過這個欄位迅速的處理客戶訊息。</p><p>我們將會紀錄您處理的比率，並且為您顯示在螢幕上。</p>",
    "<p>實驗過程中，畫面可能會隨機出現一些干擾訊息。請您盡力完成您的主要任務。</p><p>準備好後請按 \"Next\" 開始。",
  ],
  show_clickable_nav: true,
  button_label_next: "Next",
  button_label_previous: "Previous",
};
timeline.push(instructions);

// --- 3. Inter-block Questionnaire
const interBlockScale = ["非常不同意", "不同意", "普通", "同意", "非常同意"];
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
function renderContactPanel() { }

const RESPONSE_BEHAVIOR = [
  "收到，我們將立刻為您查詢",
  "請提供你的訂單編號",
  "該問題已經轉交技術部門，我們會盡快回覆您",
];
/**
 * Renders only the chat history and reply area for a given contact.
 * @param {Object} history - The chat history object.
 * @param {string} contactName - The name of the contact whose chat to display.
 */
function renderChatDisplay(history, contactName) {
  const messages = history[contactName] || [];
  return `
    <div id="chat-history" style='
      flex-grow: 1;
      height: 100%;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 10px;
      overflow-y: auto;
      margin-bottom: 10px;
      max-height: 200px; /* Or adjust as needed */
    '>
      ${messages
      .map(
        (m) => `
          <p style="margin: 6px 0;">
            <strong>${m.sender === 'User' ? 'You' : m.sender}<br/></strong> ${m.text}
          </p>
          `
      )
      .join("")}
    </div>

    <!-- 回覆區塊 -->
    <div>
      <div style="display: flex; gap: 8px; margin-bottom: 5px;">
        <input
          type="text"
          id="chat-input"
          name="chat-input"
          placeholder="Select a template or type..."
          readonly
          tabindex="-1"
          onmousedown="event.preventDefault()"
          style="
          flex: 1;
          padding: 8px;
          font-size: 14px;
          border: 1px solid #bbb;
          border-radius: 4px;"
        />
        <button
          id="chat-send"
          style="
          padding: 8px 14px;
          font-size: 14px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;"
        >
          Send
        </button>
      </div>
      <!-- 模板訊息選單 -->
      <div id="chat-templates" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px;">
        ${RESPONSE_BEHAVIOR.map(
        (template) => `
          <button
            class="chat-template-btn"
            style="
              padding: 5px 10px;
              font-size: 12px;
              background-color: #e9ecef;
              border: 1px solid #ced4da;
              border-radius: 4px;
              cursor: pointer;
            "
            onclick="document.getElementById('chat-input').value = '${template}'"
          >
            ${template}
          </button>
        `
      ).join("")}
      </div>
    </div>
  `;
}

/**
 * @param {Object} history
 */
function renderMessagingPanel(history, currentContactName) {
  return `
	  <div id="messaging-panel-container" style='
		background-color: #f7f7f7;
		border-right: 1px solid #ddd;
		display: flex;
		padding: 10px;
		gap: 20px;
	  '>
		<div
			id="contacts"
			style="
			padding: 15px;
			background-color: #ffffff;
			border-radius: 8px;
			box-shadow: 0 2px 4px rgba(0,0,0,0.1);
			display: flex;
			flex-direction: column;
			gap: 12px;
			"
		>
			${Object.keys(history).map((k) => {
    return `
					<div
						id="contact-${k}"
						style="
						justify-content: center;
						text-align: center;
						border: 2px solid #e0e0e0;
						border-radius: 50%;
						width: 40px;
						height: 40px;
						padding: 2px;
						background-color: #f8f9fa;
						transition: all 0.2s ease;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
						"
						onclick="switchChatView('${k}')"
						onmouseover="this.style.backgroundColor= (currentContact === '${k}' ? '#d0eaff' : '#e9ecef');"
						onmouseout="updateContactHighlights();"
					>
						${k.toUpperCase()[0]}
					</div>
					`;
  }).join("")}
		</div>
		<!-- Chat display area (history and reply box) -->
		<div id="chat-display-area" style="flex: 1; display: flex; flex-direction: column; padding: 10px; min-width: 300px;">
			${renderChatDisplay(history, currentContactName)}
		</div>
	  </div>
`;
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
const POPUP_MESSAGES = [];

let chatHistory = {
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
  Eve: [
    { sender: "Eve", text: "請問產品的詳細規格是什麼？" },
  ],
  Frank: [
    { sender: "Frank", text: "我想要預約下週二的諮詢。" },
    { sender: "Frank", text: "謝謝你的協助！" },
  ],
  Grace: [
    { sender: "Grace", text: "我的訂單狀態是什麼？" },
  ],
  Henry: [
    { sender: "Henry", text: "可以提供一下你們的聯絡方式嗎？" },
    { sender: "Henry", text: "這個問題我之前問過了，還沒解決。" },
  ],
  Ivy: [
    { sender: "Ivy", text: "我需要更改我的帳戶資訊。" },
  ],
  Jack: [
    { sender: "Jack", text: "請問這個服務的費用是多少？" },
    { sender: "Jack", text: "我找不到相關的說明文件。" },
  ],
};
// Initialize currentContact to the first contact in chatHistory or a default
let currentContact = Object.keys(chatHistory)[0] || "Alice";
function renderEmailTask(trial) {
  return `
		<div style='
			flex: 2;
			padding: 40px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			position: relative; /* To position the countdown timer */'
		>
			<div id="countdown-timer" style="
        position: absolute; top: 15px; right: 20px;
        font-size: 1.1em; color: #555; background-color: #f0f0f0;
        padding: 5px 10px; border-radius: 5px;"></div>
			<h2 style='margin: 0 0 20px;'>${trial.Subject}</h2>
			<p style='font-size: 16px; margin-bottom: 30px;'>${trial.Body}</p>
			<p style='font-weight: bold;'>Press 'w' for Work-related, 'n' for Non-work</p>
		</div>
	`;
}
function buildStimulus(trial, history, currentContactName, popup) {
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
		${renderMessagingPanel(history, currentContactName)}

		<!-- Email Task Panel -->
		${renderEmailTask(trial)}
	</div>
	`;
}
const trialBlocks = createPrimaryTasks().map((block) => {
  return block.map((trial) => {
    const popup = trial.Interruption
      ? `
		<div
			style="
				position:fixed;
				bottom:20px;
				right:20px;
				background:#ffe08a;
				border:2px solid black;
				padding:10px;
				z-index:9999;"
		>
			<p><strong>
			${POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)]}
			</strong></p>
		</div>`
      : "";
    return {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: buildStimulus(trial, chatHistory, currentContact, popup),
      choices: ["w", "n"],
      trial_duration: params.trialDuration,
      data: {
        block: trial.Block,
        trialIndex: trial.Trial,
        timestamp: (new Date()).toISOString(),
      },
      on_load: function () {
        // Initialize chat panel listeners and view
        addChatInputListeners();
        updateContactHighlights();
        scrollToChatBottom();

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
        data.correct = data.response === trial.CorrectAnswer;
      }
    };
  });
});
function createPrimaryTasks() {
  const arr = [trialsLow, trialsMed, trialsHigh];
  shuffle(arr);
  return arr;
}

/**
 * `chatMessageLog` stores the log of chat messages sent by the participant.
 */
const chatMessageLog = [];

function scrollToChatBottom() {
  const chatHistoryDiv = document.getElementById('chat-history');
  if (chatHistoryDiv) {
    chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight;
  }
}

function handleSendMessage() {
  const chatInput = document.getElementById('chat-input');
  const messageText = chatInput.value.trim();

  if (messageText && currentContact && chatHistory[currentContact]) {
    chatHistory[currentContact].push({ sender: 'User', text: messageText });

    const chatDisplayArea = document.getElementById("chat-display-area");
    if (chatDisplayArea) {
      chatDisplayArea.innerHTML = renderChatDisplay(chatHistory, currentContact);
      addChatInputListeners(); // Re-attach listeners
      scrollToChatBottom();
    }
    chatInput.value = ''; // Clear input

    const currentTrial = jsPsych.getCurrentTrial();
    const trialData = currentTrial ? currentTrial.data : { block: undefined, trialIndex: undefined };
    const globalTrialIndex = jsPsych.getProgress().current_trial_global_idx;

    chatMessageLog.push({
      blockType: trialData.block,        // 主要任務的區塊類型
      trialIndex: trialData.trialIndex,  // 主要任務的試驗編號
      globalTrialIndex: globalTrialIndex,  // 全域試驗索引，用於精確映射
      repliedContact: currentContact,    // 回覆的聯絡人
      replyContent: messageText,         // 回覆的內容
      replyTimeStamp: (new Date()).toISOString(), // 回覆的時間戳
    });
  }
}
function addChatInputListeners() {
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', (event) => {
      event.stopPropagation(); // Prevent jsPsych from capturing keydown
    });
    // onmousedown is handled inline
  }

  const sendButton = document.getElementById('chat-send');
  if (sendButton) {
    sendButton.removeEventListener('click', handleSendMessage); // Remove old listener if any
    sendButton.addEventListener('click', handleSendMessage);
  }
}

function updateContactHighlights() {
  Object.keys(chatHistory).forEach(contactKey => {
    const contactDiv = document.getElementById(`contact-${contactKey}`);
    if (contactDiv) {
      if (contactKey === currentContact) {
        contactDiv.style.borderColor = '#007bff';
        contactDiv.style.backgroundColor = '#e9ecef'; // Active background
      } else {
        contactDiv.style.borderColor = '#e0e0e0';
        contactDiv.style.backgroundColor = '#f8f9fa'; // Default background
      }
    }
  });
}

function switchChatView(contactName) {
  currentContact = contactName;
  const chatDisplayArea = document.getElementById("chat-display-area");
  if (chatDisplayArea) {
    chatDisplayArea.innerHTML = renderChatDisplay(chatHistory, currentContact);
    addChatInputListeners();
  }
  updateContactHighlights();
  scrollToChatBottom();
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

const jsPsych = initJsPsych({
  default_iti: 1000,
  show_progress_bar: true,
  on_finish: () => {
    const experimentResult = jsPsych.data.get().json();
    const data = JSON.parse(experimentResult);

    const dataToSave = {
      experimentData: JSON.stringify(
        data.map((e) => {
          delete e.stimulus;
          delete e.plugin_version;
          return e;
        }),
      ),
      chatLog: JSON.stringify(chatMessageLog), // 新增聊天日誌
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
