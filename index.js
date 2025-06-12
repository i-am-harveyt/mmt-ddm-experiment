/**
 * `timeline` stores the steps of the experiment
 */
const timeline = [];

/**
 * Experiment Settings
 */
const params = {
  trialsPerBlock: 10,
  popupFreq: { low: 2, med: 5, high: 8 },
  trialDuration: 10_000,
  popupDuration: 3_000,
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
    "<h2>實驗說明</h2><p>歡迎參與本次實驗。</p><p>接下來，您的任務是同時進行兩項工作。</p><p><b>主要任務：</b>您會在畫面左側看到一系列的電子郵件，請您盡快且正確地判斷每封郵件是「工作相關」還是「非工作相關」。</p><p>請按 <b>w 鍵</b> 代表「工作相關」，按 <b>n 鍵</b> 代表「非工作相關」。</p>",
    "<b>次要任務：</b>在進行郵件分類的同時，畫面右側會播放一部影片。請您盡量觀看並理解影片內容，實驗結束後會有相關問題。</p><p>您可以隨時點擊影片下方的「<b>暫停/播放</b>」按鈕來控制影片。這個操作完全由您自己決定。</p>",
    "實驗過程中，畫面可能會隨機出現一些干擾訊息。請您盡力完成您的主要任務。</p><p>準備好後，請按「繼續」開始。",
  ],
  show_clickable_nav: true,
  button_label_next: "繼續",
  button_label_previous: "返回",
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
  {
    prompt: "我通常會同時進行兩件或更多活動。",
    name: "INTER_2",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "同時做兩件以上的事是我運用時間最有效率的方式。",
    name: "INTER_3",
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
const interBlockSurvey = {
  type: jsPsychSurveyLikert,
  questions: interBlockQuestions,
  preamble: "<h3>個人處事風格問卷</h3>",
  data: { task: "pmts_survey" },
};

// --- 4. Primary Task ---
// Task Settings
const trialsLow = [
  {
    Subject: "Birthday reminder",
    Body: "Don’t forget our movie night this Saturday! Snacks on me.",
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
    Body: "Reminder: Mom’s birthday dinner is at 7 PM tonight.",
    Type: "Non-work-related",
    Block: 1,
    Trial: 13,
    CorrectAnswer: "n",
  },
  {
    Subject: "Vacation memories",
    Body: "Don’t forget our movie night this Saturday! Snacks on me.",
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
    Body: "Reminder: Mom’s birthday dinner is at 7 PM tonight.",
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
].slice(0, 10);
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
    Body: "Don’t forget our movie night this Saturday! Snacks on me.",
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
].slice(0, 10);
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
    Body: "Don’t forget our movie night this Saturday! Snacks on me.",
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
    Body: "Reminder: Mom’s birthday dinner is at 7 PM tonight.",
    Type: "Non-work-related",
    Interruption: true,
    Block: 3,
    Trial: 28,
    CorrectAnswer: "n",
  },
  {
    Subject: "Online shopping deal",
    Body: "Reminder: Mom’s birthday dinner is at 7 PM tonight.",
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
].slice(0, 10);
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
  "Limited Offer! Get 50% off now!",
  "Your subscription is expiring!",
  "Unlock premium features today!",
  "Flash Sale: 70% OFF!",
  "Security alert: Update now!",
];
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
      stimulus: `
		<div style='position:relative;'>
			${popup}
			<div style='background:white; padding:20px;'>
				<h2>${trial.Subject}</h2>
				<p>${trial.Body}</p>
				<p><strong>Press 'w' for Work-related, 'n' for Non-work</strong></p>
			</div>
		</div>`,
      choices: ["w", "n"],
      data: {
        block: trial.Block,
        trialIndex: trial.Trial,
      },
      on_finish: (data) => {
        data.correct = data.response === trial.CorrectAnswer;
      },
      trial_duration: params.trialDuration,
    };
  });
});
function createPrimaryTasks() {
  const arr = [trialsLow, trialsMed, trialsHigh];
  shuffle(arr);
  return arr;
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
  show_progress_bar: true,
  on_finish: () => {
    document.body.innerText = JSON.stringify({
      experimentData: jsPsych.data.get().json(),
      videoEvents: videoEvents,
    });
  },
});
jsPsych.run(timeline);
