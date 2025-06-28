/**
 * `APP_URL` stores the endpoint of Google App Script
 */
const APP_URL = "https://script.google.com/macros/s/AKfycbwBdzSzb9o6OBd2MLcWr2URp_3D2EKcsI7o6WwLpn4I-gVNQyhYxNbhZGVDShPY29L-6Q/exec";

/**
 * `completionCode` stores the completion code for the experiment
 */
const completionCode = "YOUR_COMPLETION_CODE_HERE";


/**
 * `timeline` stores the steps of the experiment
 */
const timeline = [];

/**
 * Experiment Settings
 */
const params = {
  trialsPerBlock: 30,
  popupFreq: { low: 2, med: 5, high: 8 },
  trialDuration: 20_000,
  popupDuration: 4_000,
};

// --- 1. Questionnaires ---
const welcome = {
  type: jsPsychInstructions,
  pages: [
    `
    <h1>Welcome to the Experiment</h1>
    <p>
    Thank you for participating in this experiment.<br/>
    Next, you'll be asked to complete a questionnaire and then proceed with the experiment itself.<br/>
    The entire process is divided into three sections, with a questionnaire at the end of each section and a final one at the very end.
    </p>
    `
  ],
  show_clickable_nav: true,
  button_label_next: "Next",
  button_label_previous: "Previous",
};
timeline.push(welcome);


// Short Media Multitasking Measure (MMM-S)
const mmm_sScale = ["Never", "Sometimes", "Often", "Very often"];
const mmm_sQuestions_TV = [
  {
    prompt: "While watching TV, how often do you also also listen to music at the same time?",
    name: "MMM_TV_Music",
    labels: mmm_sScale,
    required: true,
  },
  {
    prompt: "While watching TV, how often do you also send messages via phone or computer (e.g., text messages, WhatsApp, instant messaging)?",
    name: "MMM_TV_Msg",
    labels: mmm_sScale,
    required: true,
  },
  {
    prompt: "While watching TV, how often do you also use social networking sites (e.g., Facebook, Instagram)?",
    name: "MMM_TV_SNS",
    labels: mmm_sScale,
    required: true,
  },
];
const mmm_sQuestions_SNS = [
  {
    prompt: "While using social networking sites, how often do you also listen to music?",
    name: "MMM_SNS_Music",
    labels: mmm_sScale,
    required: true,
  },
  {
    prompt: "While using social networking sites, how often do you also send messages via phone or computer?",
    name: "MMM_SNS_Msg",
    labels: mmm_sScale,
    required: true,
  },
  {
    prompt: "While using social networking sites, how often do you also watch TV?",
    name: "MMM_SNS_TV",
    labels: mmm_sScale,
    required: true,
  },
];
const mmm_sQuestions_Msg = [
  {
    prompt: "While sending messages via phone or computer, how often do you also listen to music?",
    name: "MMM_Msg_Music",
    labels: mmm_sScale,
    required: true,
  },
  {
    prompt: "While sending messages via phone or computer, how often do you also use social networking sites?",
    name: "MMM_Msg_SNS",
    labels: mmm_sScale,
    required: true,
  },
  {
    prompt: "While sending messages via phone or computer, how often do you also watch TV?",
    name: "MMM_Msg_TV",
    labels: mmm_sScale,
    required: true,
  },
];
const mmm_sSurvey_TV = {
  type: jsPsychSurveyLikert,
  questions: mmm_sQuestions_TV,
  preamble:
    "<h3>Media Usage Habits Questionnaire</h3><p>The following questions aim to understand how frequently you use television simultaneously with other types of media.</p>",
  data: { task: "mmm_s_survey_tv" },
};
timeline.push(mmm_sSurvey_TV);

const mmm_sSurvey_SNS = {
  type: jsPsychSurveyLikert,
  questions: mmm_sQuestions_SNS,
  preamble:
    "<h3>Media Usage Habits Questionnaire</h3><p>The following questions aim to understand how frequently you use social networking sites simultaneously with other types of media.</p>",
  data: { task: "mmm_s_survey_sns" },
};
timeline.push(mmm_sSurvey_SNS);

const mmm_sSurvey_Msg = {
  type: jsPsychSurveyLikert,
  questions: mmm_sQuestions_Msg,
  preamble:
    "<h3>Media Usage Habits Questionnaire</h3><p>The following questions aim to understand how frequently you use messaging applications on your phone or computer simultaneously with other types of media.</p>",
  data: { task: "mmm_s_survey_msg" },
};
timeline.push(mmm_sSurvey_Msg);

// Polychronic–Monochronic Tendency Scale (PMTS)
const pmtsScale = ["Strongly disagree", "Disagree", "Slightly disagree", "Neutral", "Slightly agree", "Agree", "Strongly agree"];
const pmtsQuestions = [
  {
    prompt: "I prefer to do two or more activities at the same time.",
    name: "PMTS_1",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I typically do two or more activities at the same time.",
    name: "PMTS_2",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "Doing two or more activities at the same time is the most efficient way to use my time.",
    name: "PMTS_3",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I am comfortable doing more than one activity at the same time.",
    name: "PMTS_4",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I like to juggle two or more activities at the same time.",
    name: "PMTS_5",
    labels: pmtsScale,
    required: true,
  },
];
const pmtsSurvey = {
  type: jsPsychSurveyLikert,
  questions: pmtsQuestions,
  preamble: "<h3>Personal Work Style Questionnaire</h3>",
  data: { task: "pmts_survey" },
};
timeline.push(pmtsSurvey);

// --- 2. Instructions ---
const instructions = {
  type: jsPsychInstructions,
  pages: [
    `
    <h1>Welcome to the Experiment</h1>
    <p>
    Thank you for participating in this experiment.<br/>
    The entire process will consist of three sections, with a questionnaire provided at the beginning, middle, and end.
    </p>
    <p>
    Next, you will act as a customer service representative and perform two tasks simultaneously.<br/>
    These two tasks will be presented in side-by-side areas on the left and right sides of the screen.
    </p>`,

    `
    <h2>Instruction 1 / 4: Primary Task</h2>
    <p>
    You will see a customer message panel on the right side of the screen.<br/>
    We will set a response time limit of ${params.trialDuration / 1_000} seconds for each message, which will be displayed on the screen.
    </p>
    <img src="static/Exp_Instruction_rhs.png" alt="Task One" style="width: 55dvw; height: auto;">
    <p>
    Please quickly and accurately select the correct response option below based on the message content:<br/>
    ─ If it's an order or process-related question, please click "Please provide your order number."<br/>
    ─ If it's a technical issue, please click "The issue has been forwarded to the technical department, and we will get back to you as soon as possible."
    </p>`,

    `
    <h2>Instruction 2 / 4: Secondary Task</h2>
    <p>
    At the same time, several emails will continuously appear on the left side of the screen.<br/>
    Please determine whether their content is work-related.
    </p>
    <img src="static/Exp_Instruction_lhs.png" alt="Task Two" style="width: 55dvw; height: auto;">
    <p>
    Below each email, there are two buttons: <b>"Work-Related"</b> and <b>"Not Work-Related"</b>. Please click honestly to complete the classification.
    </p>`,

    `
    <h2>Instruction 3 / 4: Other Tips</h2>
    <p>
    During the experiment, message prompts from email, Slack, or Teams may randomly pop up on the screen as a modal window.
    </p>
    <img src="static/Exp_Instruction_popup.png" alt="Task Two" style="width: 55dvw; height: auto;">
    <p>
    There is a dismiss button in the upper right corner of the prompt; clicking it will make it disappear. <br/>
    If not dismissed beforehand, each prompt will automatically close after ${params.popupDuration / 1_000} seconds.<br/>
    </p>`,

    `
    <h2>Instruction 4 / 4: Task Completion and Reminder</h2>
    <p>
    The experiment will automatically end once you complete all of Task One.<br/>
    If you plan to perform the secondary task, please be mindful of your time and pace.
    </p>
    <p>
    Please do your best to complete both tasks.<br/>
    Once you are ready, please click "Next" to start the comprehension check.<br/>
    <b>If you do not pass the comprehension check, please re-read the instructions and answer again.</b>
    </p>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Next",
  button_label_previous: "Previous",
};

// --- Comprehension Check ---
const comprehensionQuestions = [
  {
    prompt: "When you see 'I can't log in to my account' in the customer message panel, which response should you choose?",
    options: [
      "Please provide your order number.",
      "The issue has been forwarded to the technical department, and we will get back to you as soon as possible.",
      "No response needed."
    ],
    required: true,
    correct: 1
  },
  {
    prompt: "In the Email task, how should you categorize 'Company Policy Update Notification'?",
    options: [
      "Work-Related",
      "Not Work-Related"
    ],
    required: true,
    correct: 0
  },
  {
    prompt: "When a pop-up message appears, do you need to click or respond to it?",
    options: [
      "Yes, otherwise you can't continue.",
      "No, it will disappear automatically."
    ],
    required: true,
    correct: 1
  }
];
const comprehensionCheck = {
  type: jsPsychSurveyMultiChoice,
  questions: comprehensionQuestions.map(q => ({
    prompt: q.prompt,
    options: q.options,
    required: q.required
  })),
  preamble: "<h3>Comprehension Check</h3><p>Please answer the following questions to ensure you understand the experiment rules.</p>",
  button_label: "Submit",
  on_finish: function (data) {
    let responses = data.response;
    const correctAnswers = comprehensionQuestions.map(q => q.correct);
    const userAnswers = Object.values(responses).map((ans, i) =>
      comprehensionQuestions[i].options.indexOf(ans)
    );
    console.log(correctAnswers, userAnswers);
    const allCorrect = userAnswers.every((ans, i) => ans === correctAnswers[i]);
    data.comprehension_passed = allCorrect;
  }
};

// 包裝 instructions + comprehensionCheck
const comprehensionWithInstructions = {
  timeline: [instructions, comprehensionCheck]
};

const comprehensionLoop = {
  timeline: [comprehensionWithInstructions],
  loop_function: function (data) {
    const last = data.values().slice(-1)[0];
    if (!last.comprehension_passed) {
      alert("Some questions were answered incorrectly. Please read the instructions again and answer again.");
      return true; // 重新顯示說明+檢核
    }
    return false; // 通過，進入正式實驗
  }
};

timeline.push(comprehensionLoop);

// --- 3. Inter-block Questionnaire
const interBlockQuestions = [
  {
    prompt: "I think completing this task makes me feel more competent.",
    name: "INTER_AV_1",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I think this task gives me a sense of achievement.",
    name: "INTER_AV_2",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I feel that succeeding in this task confirms my ability.",
    name: "INTER_AV_3",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "This task gives me confidence in my skills.",
    name: "INTER_AV_4",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I think this task is interesting.",
    name: "INTER_IV_1",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I enjoy working on this task.",
    name: "INTER_IV_2",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I find this task fun.",
    name: "INTER_IV_3",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I think completing this task is helpful for my future work performance.",
    name: "INTER_UV_1",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I believe this task is useful for improving my professional skills.",
    name: "INTER_UV_2",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "This task is valuable for achieving my long-term career goals.",
    name: "INTER_UV_3",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I feel uneasy when performing this task.",
    name: "INTER_AN_1",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I feel anxious about completing this task.",
    name: "INTER_AN_2",
    labels: pmtsScale,
    required: true,
  },
  {
    prompt: "I feel uncomfortable working on this task.",
    name: "INTER_AN_3",
    labels: pmtsScale,
    required: true,
  },
];
const interBlockSurvey = {
  type: jsPsychSurveyLikert,
  questions: interBlockQuestions,
  preamble: "<h3>Subjective Value Questionnaire</h3><p>Please answer according to your perception of the primary task.</p>",
  data: { task: "inter_survey", timestamp: Date.now() },
};

// --- 4. Task-related Functions & Data ---

// Primary Task (Customer Service) - Now tracked by jsPsych
const RESPONSE_BEHAVIOR = [
  "Please provide your order number.",
  "The issue has been forwarded to the technical department, and we will get back to you as soon as possible.",
];

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

// Secondary Task (Email Classification) - Now only logging
function renderEmailTask(emailTrial) {
  return `
		<div style='
			flex: 1; /* Takes up half of the screen */
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
                font-size: 14px; /* Increased font size */
                color: #5f6368;
                background-color: #f1f3f4;
                padding: 6px 10px; /* Adjusted padding */
                border-radius: 4px;
            ">
                Emails: 0
            </div>
            
            <div class="email-header" style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0;">
                <div style="margin-bottom: 8px;">
                    <span style="font-weight: bold; color: #666; min-width: 70px; display: inline-block;">From:</span>
                    <span style="color: #2a2a2a;">${emailTrial.Sender}</span>
                </div>
                <div style="margin-bottom: 8px;">
                    <span style="font-weight: bold; color: #666; min-width: 70px; display: inline-block;">Subject:</span>
                    <span style="color: #2a2a2a; font-weight: bold; font-size: 1.1em;">${emailTrial.Subject}</span>
                </div>
                <div>
                    <span style="font-weight: bold; color: #666; min-width: 70px; display: inline-block;">Date:</span>
                    <span style="color: #444; font-size: 0.9em;">${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            <div class="email-body-container" style="flex-grow: 1; background-color: #ffffff; border: 1px solid #dcdcdc; border-radius: 4px; padding: 20px; overflow-y: auto; margin-bottom: 20px; min-height: 200px;">
    			<p style='font-size: 1em; line-height: 1.6; margin: 0;'>${emailTrial.Body.replace(/\n/g, "<br>")}</p>
            </div>

			<div class="email-classification-buttons" style="display: flex; gap: 10px; margin-top: 10px;">
				<button type="button" class="jspsych-btn email-classify-btn" data-classification="w" style="flex: 1;">Work-related</button>
				<button type="button" class="jspsych-btn email-classify-btn" data-classification="n" style="flex: 1;">Non-work-related</button>
			</div>
		</div>
	`;
}

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
  { app: "Email", sender: "Alice", message: "Are you coming to the weekend gathering?" },
  { app: "Line", sender: "Mom", message: "Remember to come home for dinner tomorrow." },
  { app: "Slack", sender: "HR", message: "Please remember to fill in this month's attendance record." },
  { app: "Teams", sender: "Manager", message: "There's a meeting at 3 PM today, please be on time." },
  { app: "Email", sender: "Bob", message: "Are you free to play ball this Friday?" },
  { app: "Line", sender: "Class Group", message: "Want to go see a movie together next week?" },
  { app: "Slack", sender: "Designer", message: "The new version of the design draft has been uploaded." },
  { app: "Teams", sender: "Project Manager", message: "Please respond to the client's latest requirements." },

  // --- Additional entries ---
  { app: "Email", sender: "Marketing Team", message: "New marketing campaign strategy review meeting scheduled for Monday." },
  { app: "Line", sender: "Dad", message: "Your package arrived safely." },
  { app: "Slack", sender: "Engineering", message: "Bug report #123 has been resolved." },
  { app: "Teams", sender: "Sales", message: "Q3 sales target updated. Please review." },
  { app: "Email", sender: "Newsletter", message: "Your weekly tech news digest is here!" },
  { app: "Line", sender: "Best Friend", message: "How was your day? Call me later!" },
  { app: "Slack", sender: "IT Support", message: "System maintenance scheduled for tonight at 10 PM." },
  { app: "Teams", sender: "Team Lead", message: "Remember to submit your weekly report by end of day." },
  { app: "Email", sender: "Bank", message: "Your monthly statement is now available." },
  { app: "Line", sender: "Sister", message: "Happy Birthday! Sending you a little something." },
  { app: "Slack", sender: "Product Team", message: "Feedback on the new feature requested by Friday." },
  { app: "Teams", sender: "Company Announce", message: "Important: New WFH policy update." },
  { app: "Email", sender: "Online Store", message: "Your order #45678 has shipped!" },
  { app: "Line", sender: "Neighbor", message: "Could you water my plants while I'm away?" },
  { app: "Slack", sender: "DevOps", message: "Server performance alert: High CPU usage detected." },
  { app: "Teams", sender: "HR Dept", message: "Reminder: Annual performance review forms are due next week." },
];

const initialChatData = [
  // --- Correct Response: "Please provide your order number." ---
  { sender: "Alice", text: "I'd like to check my order's processing status.", answerIndex: 0 },
  { sender: "Bob", text: "The quantity of items I received is incorrect, what should I do?", answerIndex: 0 },
  { sender: "Charles", text: "Can I modify the contents of my order?", answerIndex: 0 },
  { sender: "David", text: "I haven't received my refund yet.", answerIndex: 0 },
  { sender: "Eve", text: "I need to apply for after-sales service.", answerIndex: 0 },
  { sender: "Frank", text: "I'd like to inquire about the details of a bill.", answerIndex: 0 },
  { sender: "Grace", text: "Has my order from last week been shipped yet?", answerIndex: 0 },
  { sender: "Henry", text: "I have a question about the invoice amount I received.", answerIndex: 0 },
  { sender: "Ivy", text: "I need to cancel my order.", answerIndex: 0 },
  { sender: "Jack", text: "I've paid, but the system shows the order as unpaid.", answerIndex: 0 },
  { sender: "Alice", text: "My package seems to be lost, can you help me check?", answerIndex: 0 },
  { sender: "Bob", text: "How do I return an item?", answerIndex: 0 },
  { sender: "Charles", text: "I need a copy of my invoice.", answerIndex: 0 },
  { sender: "David", text: "The product I received is defective.", answerIndex: 0 },
  { sender: "Eve", text: "What's the progress of my repair?", answerIndex: 0 },
  { sender: "Frank", text: "I want to confirm my contract details.", answerIndex: 0 },
  { sender: "Grace", text: "The service I purchased hasn't been activated yet.", answerIndex: 0 },
  { sender: "Henry", text: "I want to change my shipping address.", answerIndex: 0 },
  { sender: "Ivy", text: "There's a problem with the bill for my last consultation.", answerIndex: 0 },
  { sender: "Jack", text: "I have a question about my monthly bill.", answerIndex: 0 },
  { sender: "Kelly", text: "I'd like to check my member points balance.", answerIndex: 0 },
  { sender: "Leo", text: "When will my invoice be sent out?", answerIndex: 0 },
  { sender: "Mandy", text: "I need to apply for an exchange, how do I do that?", answerIndex: 0 },
  { sender: "Nina", text: "I want to know the current status of my order.", answerIndex: 0 },
  { sender: "Oscar", text: "My received item is missing parts, how should I deal with it?", answerIndex: 0 },
  { sender: "Paul", text: "How can I check my past transaction records?", answerIndex: 0 },
  { sender: "Queenie", text: "I want to change the invoice title.", answerIndex: 0 },
  { sender: "Ryan", text: "When will my refund be credited?", answerIndex: 0 },
  { sender: "Sandy", text: "I need to apply for a paper invoice.", answerIndex: 0 },
  { sender: "Tom", text: "I'd like to check my membership level.", answerIndex: 0 },
  { sender: "Una", text: "I want to know when my order is expected to ship.", answerIndex: 0 },
  { sender: "Vicky", text: "I need a replacement receipt.", answerIndex: 0 },
  { sender: "Will", text: "I'd like to check my points redemption history.", answerIndex: 0 },
  { sender: "Xavier", text: "I want to cancel the auto-renewal feature.", answerIndex: 0 },
  { sender: "Yvonne", text: "I need to check my warranty period.", answerIndex: 0 },
  { sender: "Zack", text: "I want to change my contact number.", answerIndex: 0 },
  { sender: "Amy", text: "I'd like to check my order delivery progress.", answerIndex: 0 },
  { sender: "Ben", text: "I need to apply for an invoice reprint.", answerIndex: 0 },
  { sender: "Cathy", text: "I'd like to check my member exclusive offers.", answerIndex: 0 },
  { sender: "Derek", text: "I want to know how to apply for a return.", answerIndex: 0 },
  { sender: "Ella", text: "I need to check my order details.", answerIndex: 0 },
  { sender: "Fiona", text: "I want to change the recipient address.", answerIndex: 0 },
  { sender: "George", text: "I'd like to check my consumption invoice.", answerIndex: 0 },
  { sender: "Helen", text: "I need to check my order payment status.", answerIndex: 0 },
  { sender: "Ian", text: "I'd like to check my membership card number.", answerIndex: 0 },
  { sender: "Judy", text: "I need to apply for after-sales repair.", answerIndex: 0 },
  { sender: "Kevin", text: "I'd like to check my order discount amount.", answerIndex: 0 },
  { sender: "Linda", text: "I need to check my order invoice number.", answerIndex: 0 },
  { sender: "Maggie", text: "I'd like to check my order delivery method.", answerIndex: 0 },
  { sender: "Nick", text: "I need to check my order cancellation status.", answerIndex: 0 },
  { sender: "Olivia", text: "I'd like to check my order payment method.", answerIndex: 0 },
  { sender: "Peter", text: "I need to check my order shipment date.", answerIndex: 0 },
  { sender: "Queena", text: "I'd like to check my order tracking number.", answerIndex: 0 },
  { sender: "Rita", text: "I need to check my order notes.", answerIndex: 0 },
  { sender: "Sam", text: "I'd like to check my order coupon usage.", answerIndex: 0 },
  { sender: "Tina", text: "I need to check my order invoice title.", answerIndex: 0 },
  { sender: "Ursula", text: "I'd like to check my order delivery time.", answerIndex: 0 },
  { sender: "Victor", text: "I need to check my order payment history.", answerIndex: 0 },
  { sender: "Wendy", text: "I'd like to check my order delivery status.", answerIndex: 0 },
  { sender: "Xena", text: "I need to check my order invoice content.", answerIndex: 0 },
  { sender: "Yale", text: "I'd like to check my order payment method.", answerIndex: 0 },
  { sender: "Zoe", text: "I need to check my order delivery method.", answerIndex: 0 },
  { sender: "Allen", text: "I'd like to check my order payment status.", answerIndex: 0 },
  { sender: "Betty", text: "I need to check my order invoice number.", answerIndex: 0 },
  { sender: "Carl", text: "I'd like to check my order delivery method.", answerIndex: 0 },
  { sender: "Doris", text: "I need to check my order cancellation status.", answerIndex: 0 },
  { sender: "Ethan", text: "I'd like to check my order payment method.", answerIndex: 0 },


  // --- Correct Response: "The issue has been forwarded to the technical department..." ---
  { sender: "Alice", text: "The website's password reset function isn't working.", answerIndex: 1 },
  { sender: "Bob", text: "I can't log into my account.", answerIndex: 1 },
  { sender: "Charles", text: "Your system keeps showing an error message 'Error 503'.", answerIndex: 1 },
  { sender: "David", text: "The app crashes on the checkout page.", answerIndex: 1 },
  { sender: "Eve", text: "I can't upload documents to your platform.", answerIndex: 1 },
  { sender: "Frank", text: "Your API is returning incorrect data format.", answerIndex: 1 },
  { sender: "Grace", text: "The system's data export function failed.", answerIndex: 1 },
  { sender: "Henry", text: "I suspect there's a security vulnerability in my account.", answerIndex: 1 },
  { sender: "Ivy", text: "After the system update, some old features are gone.", answerIndex: 1 },
  { sender: "Jack", text: "I can't add items to my shopping cart.", answerIndex: 1 },
  { sender: "Alice", text: "The website's search function isn't finding any results.", answerIndex: 1 },
  { sender: "Bob", text: "Your payment page isn't loading.", answerIndex: 1 },
  { sender: "Charles", text: "The system is unresponsive when processing my request.", answerIndex: 1 },
  { sender: "David", text: "I received a notification of unusual account activity.", answerIndex: 1 },
  { sender: "Eve", text: "Your system is incompatible with my browser.", answerIndex: 1 },
  { sender: "Frank", text: "I can't save my personal information changes.", answerIndex: 1 },
  { sender: "Grace", text: "The system shows my storage space is full, but I haven't put much in it.", answerIndex: 1 },
  { sender: "Henry", text: "Your database connection seems very unstable.", answerIndex: 1 },
  { sender: "Ivy", text: "I need urgent technical support, my service is interrupted.", answerIndex: 1 },
  { sender: "Jack", text: "The buttons on the user interface are not responding when clicked.", answerIndex: 1 },
  { sender: "Kelly", text: "My account is locked and I can't log in.", answerIndex: 1 },
  { sender: "Leo", text: "The system shows a database error, please help resolve it.", answerIndex: 1 },
  { sender: "Mandy", text: "I keep getting error messages when uploading files.", answerIndex: 1 },
  { sender: "Nina", text: "The website loads very slowly, what should I do?", answerIndex: 1 },
  { sender: "Oscar", text: "The app crashes and cannot be used normally.", answerIndex: 1 },
  { sender: "Paul", text: "The link in the verification email I received is not clickable.", answerIndex: 1 },
  { sender: "Queenie", text: "Data was lost after the system update.", answerIndex: 1 },
  { sender: "Ryan", text: "It shows password incorrect when logging in, but I'm sure it's right.", answerIndex: 1 },
  { sender: "Sandy", text: "Cannot reset password, please assist.", answerIndex: 1 },
  { sender: "Tom", text: "The system shows service temporarily unavailable.", answerIndex: 1 },
  { sender: "Una", text: "The content of the push notification I received is incorrect.", answerIndex: 1 },
  { sender: "Vicky", text: "Website images are not displaying.", answerIndex: 1 },
  { sender: "Will", text: "I cannot download attachment files.", answerIndex: 1 },
  { sender: "Xavier", text: "The system automatically logs out, what's the reason?", answerIndex: 1 },
  { sender: "Yvonne", text: "The SMS verification code I received is not working.", answerIndex: 1 },
  { sender: "Zack", text: "The app won't launch after the update.", answerIndex: 1 },
  { sender: "Amy", text: "The website form doesn't respond after submission.", answerIndex: 1 },
  { sender: "Ben", text: "I can't modify my personal information.", answerIndex: 1 },
  { sender: "Cathy", text: "The system shows a server error.", answerIndex: 1 },
  { sender: "Derek", text: "I'm not receiving password reset emails.", answerIndex: 1 },
  { sender: "Ella", text: "The website shows 404 page not found.", answerIndex: 1 },
  { sender: "Fiona", text: "I can't add a new shipping address.", answerIndex: 1 },
  { sender: "George", text: "The system shows an API error.", answerIndex: 1 },
  { sender: "Helen", text: "I can't enable two-factor authentication.", answerIndex: 1 },
  { sender: "Ian", text: "The website says 'Please try again later'.", answerIndex: 1 },
  { sender: "Judy", text: "I'm not receiving notification emails.", answerIndex: 1 },
  { sender: "Kevin", text: "The system shows 'Connection timed out'.", answerIndex: 1 },
  { sender: "Linda", text: "I can't save my settings changes.", answerIndex: 1 },
  { sender: "Maggie", text: "The website shows 'Insufficient permissions'.", answerIndex: 1 },
  { sender: "Nick", text: "I can't upload large files.", answerIndex: 1 },
  { sender: "Olivia", text: "Data was lost after the app crashed.", answerIndex: 1 },
  { sender: "Peter", text: "The website shows 'System under maintenance'.", answerIndex: 1 },
  { sender: "Queena", text: "I can't enable new features.", answerIndex: 1 },
  { sender: "Rita", text: "The system shows 'Unknown error'.", answerIndex: 1 },
  { sender: "Sam", text: "I'm not receiving verification SMS messages.", answerIndex: 1 },
  { sender: "Tina", text: "The website says 'Please log in again'.", answerIndex: 1 },
  { sender: "Ursula", text: "I can't enable push notifications.", answerIndex: 1 },
  { sender: "Victor", text: "The system shows 'Data format error'.", answerIndex: 1 },
  { sender: "Wendy", text: "I can't download invoices.", answerIndex: 1 },
  { sender: "Xena", text: "The website shows 'Service abnormal'.", answerIndex: 1 },
  { sender: "Yale", text: "I can't enable member features.", answerIndex: 1 },
  { sender: "Zoe", text: "After the app crashes, I can't log in again.", answerIndex: 1 },
  { sender: "Allen", text: "The system shows 'Data synchronization failed'.", answerIndex: 1 },
  { sender: "Betty", text: "I can't enable coupons.", answerIndex: 1 },
  { sender: "Carl", text: "The website shows 'Request failed'.", answerIndex: 1 },
  { sender: "Doris", text: "I'm not receiving push notifications.", answerIndex: 1 },
  { sender: "Ethan", text: "The system shows 'Please try again later'.", answerIndex: 1 },
];

const customerServiceEvents = [];
let eventIdCounter = 0;
for (const message of initialChatData) {
  customerServiceEvents.push({
    id: `evt${++eventIdCounter}`,
    contactName: message.sender,
    text: message.text,
    status: 'pending', // 'pending', 'handled'
    timestamp: Date.now() - Math.random() * 100000, // Add some jitter for ordering
    chosenResponse: null,
    correctAnswerIndex: message.answerIndex,
  });
}
customerServiceEvents.sort((a, b) => a.timestamp - b.timestamp); // Ensure chronological order

const handledEventLog = []; // Log for primary task (customer service)
const emailClassificationResponses = []; // Log for secondary task (email classification)
let globalEmailClassificationCount = 0; // Global counter for email classifications across all trials

// Create customer service event lookup map for efficient storage
const customerServiceEventMap = {};
customerServiceEvents.forEach((event, index) => {
  customerServiceEventMap[event.id] = {
    contactName: event.contactName,
    text: event.text,
    timestamp: event.timestamp,
    correctAnswerIndex: event.correctAnswerIndex,
  };
});

// Add customer service event map to data export
const customerServiceEventReference = {
  event_map: customerServiceEventMap,
  total_events: customerServiceEvents.length
};

// --- Secondary Task (Email) Data Setup ---
const allEmailStimuli = [
  {
    Subject: "Movie night this weekend?",
    Sender: "sarah.connor@gmail.com",
    Body: "Hey!\n\nJust a friendly reminder about movie night this Saturday. I'm planning on bringing snacks, so if you could grab the drinks, that would be awesome. Let me know if you're still good to go. Can't wait!\n\nSee ya,\nSarah",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "URGENT: System Maintenance Tonight",
    Sender: "it-support@metacortex.com",
    Body: "Dear Team,\n\nThis is a notification that we will be conducting a system-wide update tonight from 10 PM to 2 AM. During this time, access to network drives and other internal services may be intermittent. Please save all your work and log out before the maintenance window to avoid any data loss.\n\nThank you for your cooperation,\nIT Support",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Upcoming Q3 Training Schedule",
    Sender: "hr-noreply@metacortex.com",
    Body: "Hi all,\n\nThe new training schedule for Q3 is now available on the company portal. All employees are required to complete the mandatory 'Cybersecurity Awareness' course by the end of the quarter. Please review the available slots and sign up for a session that fits your schedule.\n\nBest,\nHR Department",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Action Required: Updated Onboarding Guide",
    Sender: "hr-noreply@metacortex.com",
    Body: "Hi Managers,\n\nThe onboarding guide for new hires has been updated to reflect our new hybrid work policies. Please ensure you are using the latest version for all new team members to provide them with the correct information. The updated guide can be found in the 'HR Resources' shared drive.\n\nThanks,\nHR",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Reminder: Project Phoenix Deadline",
    Sender: "project-manager@metacortex.com",
    Body: "Team,\n\nThis is a quick reminder that the final deadline for Project Phoenix is this Friday. Please make sure all your deliverables are submitted and documentation is updated by EOD. Let's finish strong!\n\nThanks,\nAlex",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Update to Remote Work Policy",
    Sender: "hr-noreply@metacortex.com",
    Body: "Dear Employees,\n\nPlease be advised that there has been an update to the company's remote work policy, effective next Monday. You can find the revised document on the intranet under 'Company Policies'. Please familiarize yourself with the changes.\n\nSincerely,\nHuman Resources",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "You HAVE to see this show!",
    Sender: "emily.jones@outlook.com",
    Body: "OMG, did you see the latest episode of that Netflix drama? The ending was absolutely wild! We need to talk about it ASAP. Are you free to catch up tomorrow?\n\n- Em",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Mike's Birthday Tomorrow!",
    Sender: "john.doe@yahoo.com",
    Body: "Hey,\n\nJust wanted to remind you that it's Mike's birthday tomorrow! A few of us are chipping in for a gift. Let me know if you want to contribute. We're also grabbing cake in the breakroom around 3 PM.\n\n- John",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Flash sale on running shoes",
    Sender: "deals@greatfinds.com",
    Body: "Hi there,\n\nJust saw a flash sale on running shoes—50% off until midnight! Thought you might be interested since you mentioned needing a new pair. Here's the link: [link]\n\nCheers!",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Action Required: Complete Your Annual Security Training",
    Sender: "hr-noreply@metacortex.com",
    Body: "Hello everyone,\n\nThis is a reminder about the mandatory annual security training. Records show that you have not yet completed this requirement. Please complete it by the end of the month to maintain network access. You can access the training portal through the employee dashboard.\n\nThank you,\nHR Department",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "FWD: Client Proposal Revisions",
    Sender: "project-manager@metacortex.com",
    Body: "Hi Team,\n\nThe client has requested revisions to the proposal we submitted last week. Please see the attached document with their comments and feedback. Let's schedule a brief meeting tomorrow to discuss our plan of action.\n\nBest,\nSarah",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Got to show you this pic of Whiskers",
    Sender: "crazycatlady@yahoo.com",
    Body: "I have to show you this picture of my cat, Whiskers, sleeping in a tiny cardboard box. He looks so ridiculous and cute! Hope this brightens your day!\n\n- Linda",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Lunch tomorrow?",
    Sender: "foodie_friend@outlook.com",
    Body: "Hey,\n\nAre we still on for lunch tomorrow? I was thinking we could try that new cafe downtown that everyone's talking about. Let me know what you think!\n\nTalk soon,\nYour Pal",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "New Photos: Beach Trip!",
    Sender: "gamenight-squad@googlegroups.com",
    Body: "Hey everyone,\n\nI've finally uploaded the photos from our beach trip last weekend! There are some really great ones. You can check them out in the shared album here: [link].\n\n- Mark",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "FWD: Quarterly Report",
    Sender: "finance-dept@metacortex.com",
    Body: "Hi,\n\nPlease find the attached Q2 financial report. Review the numbers for your department and let me know if you have any questions before our meeting on Friday.\n\nRegards,\nFinance Department",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Concert tickets for Friday!",
    Sender: "live.music.lover@gmail.com",
    Body: "Hey! I managed to get two tickets for that band we like on Friday night. Are you free to go? Let me know ASAP before I offer the other one to someone else!\n\n- Dave",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Can you review this draft?",
    Sender: "project-manager@metacortex.com",
    Body: "Hi,\n\nCould you please take a look at the attached document? It's the draft for the client presentation tomorrow. I'd appreciate your feedback on the content and flow.\n\nThanks,\nEmily",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "REMINDER: Time sheets due by 5 PM today",
    Sender: "management-noreply@metacortex.com",
    Body: "Hi Team,\n\nThis is a friendly reminder to submit your time sheets for the week by 5 PM today. Please ensure all project hours are logged accurately. Your timely submission is greatly appreciated.\n\nThanks,\nManagement",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Found: Water bottle in conference room 3B",
    Sender: "kevin-finance@metacortex.com",
    Body: "Hi all,\n\nSomeone left a blue metal water bottle in conference room 3B after the 10am meeting. I've left it on the counter in the kitchen on the 3rd floor.\n\nCheers,\nKevin",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Draft of Q4 report attached for your review",
    Sender: "finance-dept@metacortex.com",
    Body: "Hi,\n\nAttached is the draft of the Q4 performance report. Please review it and provide any feedback or corrections by end of business on Wednesday.\n\nThanks,\n[Name]",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Team Lunch Next Week!",
    Sender: "social-committee@metacortex.com",
    Body: "Hi Team,\n\nTo celebrate our recent project success, we're organizing a team lunch next week! Please vote for your preferred restaurant in the poll linked below so we can make a reservation. Hope to see you all there!\n\nCheers,\nSocial Committee",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Reminder: Team Sync-up Tomorrow",
    Sender: "project-manager@metacortex.com",
    Body: "Hi Team,\n\nJust a quick heads-up: our weekly team sync-up call is scheduled for 10 AM tomorrow. Please come prepared with your updates and any potential blockers.\n\nThanks,\nAlex",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Yoga this weekend?",
    Sender: "jess@gmail.com",
    Body: "Hey!\n\nWant to join me for a yoga class? I found a studio that offers the first class for free. Could be a fun way to relax this weekend!\n\nLet me know,\nJess",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Your action is required: Performance Review",
    Sender: "hr-noreply@metacortex.com",
    Body: "Hi,\n\nThis is a reminder that your quarterly self-assessment is due by this Friday. Please log in to the Performance Portal to complete your review. Your manager will not be able to finalize their assessment until you have submitted yours.\n\nRegards,\nHuman Resources",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "FW: Client Feedback on the Mockups",
    Sender: "client.services@metacortex.com",
    Body: "Hi Team,\n\nThe client has provided some feedback on the latest design mockups. Overall, they are very positive but have a few minor revision requests. I've attached their comments. Let's discuss tomorrow morning.\n\nRegards,\nSarah",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "This cat video will make your day",
    Sender: "foodie_friend@outlook.com",
    Body: "You have to see this cat video I found, it's hilarious! I promise it will make your day. Here's the link.\n\nEnjoy,\nTom",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Your Amazon.com order has shipped",
    Sender: "shipment-tracking@amazon.com",
    Body: "Hello,\n\nGood news! Your order #123-4567890-1234567 has shipped and is expected to arrive by Tuesday, October 26th. You can track your package here: [Tracking Link].\n\nThank you for shopping with us,\nAmazon.com",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Meeting Follow-up: Action Items",
    Sender: "project-manager@metacortex.com",
    Body: "Hi All,\n\nThanks for the productive meeting today. As discussed, I've attached a summary of the action items and owners. Please review and let me know if I missed anything.\n\nBest,\nDavid",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "New message from your LinkedIn connection",
    Sender: "messaging-noreply@linkedin.com",
    Body: "Hi,\n\nYou have a new message from John Smith regarding a potential job opportunity. Log in to LinkedIn to view the message and respond.\n\nThank you,\nThe LinkedIn Team",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Expense Report Reminder",
    Sender: "finance-dept@metacortex.com",
    Body: "Dear employee,\n\nThis is a reminder that all expense reports for the previous month must be submitted by the 15th. Please submit your expenses through the portal to ensure timely reimbursement.\n\nThank you,\nFinance",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Your flight is confirmed: NYC to SFO",
    Sender: "confirmations@kayak.com",
    Body: "Hi,\n\nYour flight booking is confirmed! Please review your itinerary below and ensure all details are correct.\n\nFlight: UA 456\nDeparture: NYC (JFK) - 8:00 AM\nArrival: SFO - 11:30 AM\n\nSafe travels,\nThe Kayak Team",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Welcome to the team, Jessica!",
    Sender: "manager-noreply@metacortex.com",
    Body: "All,\n\nPlease join me in giving a warm welcome to our new Marketing Specialist, Jessica Day, who is starting with us today! Jessica will be sitting with the marketing team on the 4th floor. Please stop by and say hello!\n\nBest,\n[Manager Name]",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Anyone interested in a fantasy football league?",
    Sender: "kevin-finance@metacortex.com",
    Body: "Hey football fans,\n\nI'm thinking of starting a fantasy football league this year. Looking for about 8-10 people. Let me know if you're interested and I'll send out another email with the details.\n\n- Kevin",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Your order from DoorDash is on its way",
    Sender: "noreply@doordash.com",
    Body: "Great news! Your order from The Sandwich Shop is now on its way and should arrive in approximately 15 minutes. Get ready to eat!\n\nThanks for using DoorDash.",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Action Required: Update your contact information",
    Sender: "hr-noreply@metacortex.com",
    Body: "Hi everyone,\n\nWe are updating our emergency contact list. Please take a moment to log in to the employee portal and verify that your contact information is up to date.\n\nThank you,\nHR",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Volunteers needed for user testing session",
    Sender: "ux-research@metacortex.com",
    Body: "Hi Team,\n\nThe UX team is looking for internal volunteers to participate in a 30-minute user testing session for our new mobile app. Your feedback will be invaluable. If you are interested, please sign up for a time slot here: [link].\n\nThanks,\nUX Research Team",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Your monthly bank statement is ready",
    Sender: "no-reply@chase.com",
    Body: "Dear Customer,\n\nYour monthly statement is now available to view online. Please log in to your account to see your latest statement and account activity.\n\nSincerely,\nChase Bank",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Building access update for this weekend",
    Sender: "facilities-noreply@metacortex.com",
    Body: "All Employees,\n\nPlease be advised that due to scheduled maintenance on the main entrance, building access this weekend will be restricted to the west-side entrance only. Your access cards have been updated accordingly. Normal access will resume on Monday.\n\nThank you,\nFacilities",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Checking in!",
    Sender: "mom@family.net",
    Body: "Hi sweetie,\n\nJust wanted to check in and see how you're doing. Are you remembering to eat your vegetables? Give me a call when you have a moment.\n\nLove,\nMom",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Please approve: Q3 Marketing Budget",
    Sender: "finance-dept@metacortex.com",
    Body: "Hi Managers,\n\nThe Q3 marketing budget proposal is now ready for your review and approval in the finance portal. Please provide your approval by EOD Friday so we can proceed with resource allocation.\n\nThanks,\nFinance",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Great news! Client loved the presentation",
    Sender: "client.services@metacortex.com",
    Body: "Hi there,\n\nI just got off the phone with the client. They were extremely pleased with our last presentation! They gave us the green light to proceed to the next phase. Great job, everyone! Let's keep up the excellent work.\n\nBest,\nClient Services",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Book recommendation?",
    Sender: "pat@gmail.com",
    Body: "Hey, do you have a recommendation for a good book to read? I just finished my last one and I'm looking for something new. I'm open to anything!\n\nThanks,\nPat",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Can we reschedule our 1:1?",
    Sender: "project-manager@metacortex.com",
    Body: "Hi,\n\nSomething urgent has come up and I need to reschedule our 1:1 meeting today. Are you free tomorrow afternoon at the same time? Let me know what works for you.\n\nSorry for the last-minute change,\nMichael",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Weekend BBQ at my place!",
    Sender: "party.planner.extraordinaire@yahoo.com",
    Body: "Hi!\n\nI'm hosting a BBQ at my place this Saturday, starting around 4 PM. It's going to be very casual, just some food, music, and good company. Let me know if you can make it so I have a headcount!\n\n- P",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Office Maintenance Notification",
    Sender: "facilities-noreply@metacortex.com",
    Body: "Hello,\n\nPlease be aware that the restrooms on the 3rd floor will be closed for maintenance tomorrow from 9 AM to 12 PM. Please use the facilities on the 2nd or 4th floor during this time. We apologize for any inconvenience.\n\nThank you,\nFacilities Management",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Your weekly screen time report",
    Sender: "noreply@apple.com",
    Body: "Hi,\n\nYour screen time was down 15% last week for an average of 3 hours, 12 minutes per day. Your most used apps were Messages, Mail, and Instagram. You can view your full report on your device.\n\n- Apple",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Where should we have the team offsite?",
    Sender: "project-manager@metacortex.com",
    Body: "Hi Team,\n\nIt's time to start planning our annual team offsite! We have budget for a two-day event. Please reply to this email with your suggestions for activities or locations. Let's make it a memorable one!\n\nBest,\nAngela",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Happy Hour this Friday?",
    Sender: "emily.jones@outlook.com",
    Body: "Hey!\n\nA few of us are planning to go for happy hour this Friday after work to unwind. Would you be interested in joining? We're thinking of that place near the office with the rooftop patio.\n\n- Emily",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "New IT Ticketing System",
    Sender: "it-support@metacortex.com",
    Body: "Hello Team,\n\nNext Monday, we will be launching a new IT ticketing system to better track and resolve your support requests. Training sessions will be held next week, and a guide will be available on the intranet. We appreciate your cooperation during this transition.\n\nThank you,\nIT Support",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Your Netflix bill is due soon",
    Sender: "info@mailer.netflix.com",
    Body: "Hi,\n\nThis is a reminder that your Netflix subscription will automatically renew on October 28th, 2023. No action is required to keep enjoying your favorite shows and movies.\n\n- The Netflix Team",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Out of Office: [My Name]",
    Sender: "employee@metacortex.com",
    Body: "Hello,\n\nI will be out of the office starting Thursday and will return on Monday. I will have limited access to email. For urgent matters, please contact [Colleague's Name].\n\nThank you.",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Funny article I thought you'd like",
    Sender: "sam@gmail.com",
    Body: "Hey,\n\nI came across this article today and it made me laugh out loud. Thought you might get a kick out of it too. Here's the link: [link].\n\nLet me know what you think!\n- Sam",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Donuts in the kitchen!",
    Sender: "social-committee@metacortex.com",
    Body: "Happy Friday!\n\nThere are donuts in the kitchen on the 2nd floor to celebrate the end of the week. Help yourself!\n\n- The Social Committee",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Q4 Planning Meeting - Canceled",
    Sender: "project-manager@metacortex.com",
    Body: "Hi Team,\n\nI am canceling our Q4 planning meeting that was scheduled for this afternoon. I will send out a new invitation shortly with a revised agenda. Sorry for any inconvenience.\n\nThanks,\n[Name]",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Your Uber receipt",
    Sender: "uber.receipts@uber.com",
    Body: "Thanks for riding with Uber. We've sent you a receipt for your recent trip. You can view the full details here: [link].\n\nWe hope to see you again soon!",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "New hire announcement: John Smith",
    Sender: "hr-noreply@metacortex.com",
    Body: "Team,\n\nPlease join me in welcoming John Smith to the engineering team! John starts on Monday and will be working on the new platform initiative. Please make him feel welcome!\n\nBest,\nHR",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Your library books are due soon",
    Sender: "noreply@nypl.org",
    Body: "Dear Patron,\n\nThis is a friendly reminder that the following items are due for return in 3 days: 'The Midnight Library'. You can renew them online if needed.\n\nThank you,\nNew York Public Library",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Agenda for tomorrow's all-hands meeting",
    Sender: "ceo-office@metacortex.com",
    Body: "Hi Everyone,\n\nAttached is the agenda for our quarterly all-hands meeting tomorrow. We will be discussing our Q3 results and our goals for Q4. There will be a Q&A session at the end, so please come with your questions.\n\nSee you there,\nCEO Office",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
  {
    Subject: "Update to our Terms of Service",
    Sender: "no-reply@dropbox.com",
    Body: "Hi,\n\nWe've updated our Terms of Service. These changes will take effect on November 1st. You can review the new terms by logging into your account. No action is needed from your side.\n\nThanks,\nThe Dropbox Team",
    Type: "Non-work-related",
    CorrectAnswer: "n",
  },
  {
    Subject: "Cake in the breakroom!",
    Sender: "social-committee@metacortex.com",
    Body: "Hi everyone,\n\nTo celebrate Maria's work anniversary, there's cake in the main breakroom on the 4th floor. Come grab a slice!\n\nCheers,\nSocial Committee",
    Type: "Work-related",
    CorrectAnswer: "w",
  },
];

// Create email stimulus lookup map for efficient storage
const emailStimulusMap = {};
allEmailStimuli.forEach((email, index) => {
  emailStimulusMap[index] = {
    Subject: email.Subject,
    Body: email.Body,
    Type: email.Type,
    CorrectAnswer: email.CorrectAnswer
  };
});

// Add email stimulus map to data export
const emailStimulusReference = {
  stimulus_map: emailStimulusMap,
  total_stimuli: allEmailStimuli.length
};

shuffle(allEmailStimuli);
let globalEmailIndex = 0;

function getNextEmailForSecondaryTask() {
  if (!allEmailStimuli || allEmailStimuli.length === 0) {
    const errorMessage = "FATAL: allEmailStimuli is empty. Cannot get next email. Check if trials.js is loaded correctly and if the slicing logic in index.js is working.";
    console.error(errorMessage);
    // Throw an error to stop the experiment, which is better than letting it fail mysteriously.
    throw new Error(errorMessage);
  }
  if (globalEmailIndex >= allEmailStimuli.length) {
    console.log("Resetting globalEmailIndex, looping through secondary task stimuli.");
    globalEmailIndex = 0; // Loop back
  }
  return allEmailStimuli[globalEmailIndex];
}

// New function to advance to next email (only called after user clicks classification button)
function advanceToNextEmail() {
  globalEmailIndex++;
  if (globalEmailIndex >= allEmailStimuli.length) {
    console.log("Resetting globalEmailIndex, looping through secondary task stimuli.");
    globalEmailIndex = 0; // Loop back
  }
}

// --- Create Primary Task Blocks (Customer Service) - Now tracked by jsPsych ---
function createPrimaryTaskSet(sourceEvents, numTrials, numInterruptions, blockLabel) {
  const blockEvents = JSON.parse(JSON.stringify(sourceEvents.slice(0, numTrials))); // Deep copy and slice
  if (blockEvents.length < numTrials) {
    console.warn(`Not enough unique customer service events for a full block (${blockLabel}). Needed ${numTrials}, got ${blockEvents.length}. May repeat events or be shorter.`);
    // Potentially add logic to repeat events if numTrials > blockEvents.length
  }

  // Initialize all events to not be interruptions
  blockEvents.forEach(event => event.Interruption = false);

  // Insert interruptions at regular intervals
  if (numInterruptions > 0) {
    const interval = Math.floor(numTrials / numInterruptions);
    for (let i = 1; i <= numInterruptions; i++) {
      const interruptionIndex = i * interval - 1;
      if (interruptionIndex >= 0 && interruptionIndex < blockEvents.length) {
        blockEvents[interruptionIndex].Interruption = true;
      }
    }
  }

  return blockEvents.slice(0, numTrials); // Ensure correct length
}

const baseCsEventsForBlocks = [...customerServiceEvents]; // Use a copy
shuffle(baseCsEventsForBlocks);

// Create three blocks of primary tasks with different interruption frequencies
const primaryTaskBlockConfigs = [
  { label: "low_interruption", interruptCount: params.popupFreq.low },
  { label: "med_interruption", interruptCount: params.popupFreq.med },
  { label: "high_interruption", interruptCount: params.popupFreq.high },
];
shuffle(primaryTaskBlockConfigs); // Shuffle the order of interruption conditions

const trialBlocks = [];
let csEventCursor = 0;

for (const [blockIndex, config] of primaryTaskBlockConfigs.entries()) {
  const numEventsForBlock = params.trialsPerBlock;
  let blockSpecificCsEvents;

  if (csEventCursor + numEventsForBlock <= baseCsEventsForBlocks.length) {
    blockSpecificCsEvents = baseCsEventsForBlocks.slice(csEventCursor, csEventCursor + numEventsForBlock);
    csEventCursor += numEventsForBlock;
  } else {
    // Handle case where not enough unique events are left, recycle or warn
    console.warn(`Recycling CS events for block ${config.label}`);
    const remaining = baseCsEventsForBlocks.length - csEventCursor;
    blockSpecificCsEvents = baseCsEventsForBlocks.slice(csEventCursor);
    shuffle(baseCsEventsForBlocks); // Shuffle before recycling
    blockSpecificCsEvents.push(...baseCsEventsForBlocks.slice(0, numEventsForBlock - remaining));
    csEventCursor = numEventsForBlock - remaining;
  }

  const currentBlockPrimaryTasks = createPrimaryTaskSet(blockSpecificCsEvents, params.trialsPerBlock, config.interruptCount, config.label);

  // 新增：標記 blockIndex/blockLabel
  currentBlockPrimaryTasks.forEach(event => {
    event.blockIndex = blockIndex;
    event.blockLabel = config.label;
  });

  const blockTrials = currentBlockPrimaryTasks.map((cs_event, trialInBlockIndex) => {
    const popupData = POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)];
    const popupHtml = cs_event.Interruption
      ? `<div class="jspsych-popup-message" style="text-align:left;">
          <button class="jspsych-popup-close" style="position:absolute; top:6px; right:8px; background:transparent; border:none; font-size:18px; color:#888; cursor:pointer;">&times;</button>
          <div style="font-weight:bold; font-size:1.05em;">${popupData.app}</div>
          <div style="color:#1a73e8; font-weight:500;">${popupData.sender}</div>
          <div style="margin-top:2px;">${popupData.message}</div>
        </div>`
      : "";

    return {
      type: jsPsychHtmlButtonResponse,
      stimulus: function () {
        // By using `emailForThisTrial` from the parent scope, we avoid calling jsPsych.getCurrentTrial(),
        // which can be undefined when the stimulus function is evaluated.
        return `
          <div style='position: relative; width: 96vw; height: 92vh; display: flex; border: 1px solid #ccc; font-family: sans-serif; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin: 0 auto; background: #f5f6fa; gap: 1vw;'>
            ${popupHtml}
            <div id="email-panel" style='
              flex: 1; /* Changed from flex: 2 to flex: 1 for 50% width */
              display: flex;
              flex-direction: column;
              background-color: #ffffff; /* Gmail white background */
              position: relative;
              font-family: "Google Sans", "Roboto", Arial, sans-serif; /* Gmail font */
              color: #202124; /* Gmail text color */
              border-right: 1px solid #e8eaed; /* Gmail border */
            '>
              <!-- 狀態欄 -->
              <div class="panel-titlebar" style="display: flex; align-items: center; justify-content: space-between; background: #e3e6ea; border-bottom: 1px solid #cfd2d6; height: 32px; padding: 0 12px;">
                <div style="font-weight: 500; color: #444; font-size: 14px; letter-spacing: 0.5px;">Email(Secondary Task)</div>
                <div style="display: flex; gap: 6px; align-items: center;">
                  <button class="panel-btn-min" title="Minimize" style="width:18px;height:18px;border:none;background:transparent;cursor:pointer;font-size:15px;line-height:1;">&#8213;</button>
                  <button class="panel-btn-full" title="Full screen" style="width:18px;height:18px;border:none;background:transparent;cursor:pointer;font-size:13px;line-height:1;">&#9723;</button>
                  <button class="panel-btn-close" title="Close" style="width:18px;height:18px;border:none;background:transparent;cursor:pointer;font-size:15px;line-height:1;color:#d93025;">&#10005;</button>
                </div>
              </div>
              <!-- Gmail-style header -->
              <div style="
                background-color: #f8f9fa;
                border-bottom: 1px solid #e8eaed;
                padding: 12px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              ">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="
                    width: 20px;
                    height: 20px;
                    background-color: #1a73e8;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 12px;
                    font-weight: bold;
                  ">G</div>
                  <span style="font-weight: 500; color: #202124; font-size: 14px;">Gmail</span>
                </div>
                <div id="countdown-timer" style="
                  font-size: 14px; /* Increased font size */
                  color: #5f6368;
                  background-color: #f1f3f4;
                  padding: 6px 10px; /* Adjusted padding */
                  border-radius: 4px;
                ">
                  Emails: ${globalEmailClassificationCount}
                </div>
              </div>
              
              <!-- Email content area -->
              <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; overflow: hidden;">
                <!-- Email header -->
                <div class="email-header" style="
                  margin-bottom: 20px; 
                  padding: 16px; 
                  background-color: #f8f9fa;
                  border-radius: 8px;
                  border: 1px solid #e8eaed;
                ">
                  <div style="margin-bottom: 12px; display: flex; align-items: center;">
                    <div id="email-sender-avatar" style="
                      width: 32px;
                      height: 32px;
                      background-color: #1a73e8;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: white;
                      font-weight: bold;
                      margin-right: 12px;
                    ">S</div>
                    <div style="flex: 1;">
                      <div style="font-weight: 500; color: #202124; margin-bottom: 4px;">
                        <span id="email-sender" style="color: #1a73e8;">sender@example.com</span>
                      </div>
                      <div style="font-size: 12px; color: #5f6368;">
                        ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div style="margin-bottom: 8px;">
                    <span id="email-subject" style="color: #202124; font-weight: 500; font-size: 16px; text-align: left; display: block;">Loading...</span>
                  </div>
                </div>

                <!-- Email body -->
                <div class="email-body-container" style="
                  flex: 1; 
                  background-color: #ffffff; 
                  border: 1px solid #e8eaed; 
                  border-radius: 8px; 
                  padding: 20px; 
                  overflow-y: auto; 
                  margin-bottom: 20px;
                  line-height: 1.6;
                ">
                  <p id="email-body" style='font-size: 14px; margin: 0; color: #202124; text-align: left;'>Loading email...</p>
                </div>

                <!-- Gmail-style action buttons -->
                <div class="email-classification-buttons" style="
                  display: flex; 
                  gap: 12px; 
                  padding: 16px 0;
                  border-top: 1px solid #e8eaed;
                ">
                  <button type="button" class="jspsych-btn email-classify-btn" data-classification="w" style="
                    flex: 1;
                    background-color: #1a73e8;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 12px 16px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s;
                  ">Work-related</button>
                  <button type="button" class="jspsych-btn email-classify-btn" data-classification="n" style="
                    flex: 1;
                    background-color: #1a73e8;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 12px 16px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s;
                  ">Non-work-related</button>
                </div>
              </div>
            </div>
            <div id="primary-task-panel" style='
              flex: 1; 
              padding: 0;
              display: flex; 
              flex-direction: column; 
              gap: 15px; 
              background-color: #f8f9fa; 
              border-left: 1px solid #e8eaed;
            '>
              <!-- 狀態欄 -->
              <div class="panel-titlebar" style="display: flex; align-items: center; justify-content: space-between; background: #e3e6ea; border-bottom: 1px solid #cfd2d6; height: 32px; padding: 0 12px;">
                <div style="font-weight: 500; color: #444; font-size: 14px; letter-spacing: 0.5px;">Customer Service(Primary Task)</div>
                <div style="display: flex; gap: 6px; align-items: center;">
                  <button class="panel-btn-min" title="Minimize" style="width:18px;height:18px;border:none;background:transparent;cursor:pointer;font-size:15px;line-height:1;">&#8213;</button>
                  <button class="panel-btn-full" title="Full screen" style="width:18px;height:18px;border:none;background:transparent;cursor:pointer;font-size:13px;line-height:1;">&#9723;</button>
                  <button class="panel-btn-close" title="Close" style="width:18px;height:18px;border:none;background:transparent;cursor:pointer;font-size:15px;line-height:1;color:#d93025;">&#10005;</button>
                </div>
              </div>
              <div style="
                display: flex;
                justify-content: space-between;
                font-size: 14px; 
                color: #5f6368; 
                padding: 8px 0; 
                font-weight: 500;
                background-color: #ffffff;
                border-radius: 4px;
                padding: 8px 12px;
                border: 1px solid #e8eaed;
              ">
                <p style="margin: 0;">Pending: <span id="pending-cs-count" style="font-weight: 500;">0</span></p>
                <p style="margin: 0;">Handled: <span id="handled-cs-count" style="font-weight: 500;">0</span></p>
                <p style="margin: 0; color: #d93025;">Missed: <span id="missed-cs-count" style="font-weight: 500;">0</span></p>

                <div id="primary-task-countdown-timer"></div>
              </div>
              ${renderCurrentEventDisplay(cs_event)}
              <div id="primary-task-buttons" style="margin-top: 18px; display: flex; gap: 10px;"></div>
            </div>
          </div>
        `;
      },
      button_html: [
        '<button class="jspsych-btn response-btn-primary" style="font-size: 0.9em; padding: 10px 12px; margin: 2px !important;">%choice%</button>',
        '<button class="jspsych-btn response-btn-primary" style="font-size: 0.9em; padding: 10px 12px; margin: 2px !important;">%choice%</button>',
      ],
      choices: RESPONSE_BEHAVIOR, // Customer service responses
      trial_duration: params.trialDuration, // Duration for primary (customer service) task
      data: {
        task_type: 'customer_service_primary',
        block_condition_label: config.label,
        trial_in_block: trialInBlockIndex,
        block_index: blockIndex,
        customer_event_id: cs_event.id,
        customer_event_text: cs_event.text,
        customer_event_contact: cs_event.contactName,
        is_interruption: cs_event.Interruption,
        correct_answer_index: cs_event.correctAnswerIndex,
        // Remove secondary_task_stimulus binding - emails are independent now
        timestamp: Date.now(),
      },
      on_load: function () {
        const trialData = this.data;
        // Get the current email from the DOM instead of pre-assigned email
        let emailStimulus = null; // Will be set when we find the current email in DOM

        // Track timers separately for primary and secondary tasks
        this.primaryTaskTimers = [];
        this.secondaryTaskTimers = [];

        // --- Popup ---
        const popupElement = document.querySelector('.jspsych-popup-message');
        if (popupElement) {
          const popupTimer = setTimeout(() => popupElement.classList.add('show'), 100);
          this.primaryTaskTimers.push(popupTimer);

          const hideTimer = setTimeout(() => {
            if (popupElement) popupElement.classList.remove('show');
          }, params.popupDuration);
          this.primaryTaskTimers.push(hideTimer);

          // 新增：打叉按鈕事件
          const closeBtn = popupElement.querySelector('.jspsych-popup-close');
          if (closeBtn) {
            closeBtn.addEventListener('click', () => {
              popupElement.style.display = 'none';
            });
          }
        }

        // --- Secondary Task (Email Classification) Listeners ---
        const emailButtons = document.querySelectorAll('.email-classify-btn');
        console.log(`Found ${emailButtons.length} email classification buttons`);
        let emailClassificationStartTime = Date.now(); // Make it mutable

        // Function to get current email from DOM
        const getCurrentEmailFromDOM = () => {
          const subjectElement = document.getElementById('email-subject');
          const bodyElement = document.getElementById('email-body');

          if (subjectElement && bodyElement) {
            const currentSubject = subjectElement.textContent;
            const currentBody = bodyElement.innerHTML.replace(/<br>/g, '\n');

            // Find the corresponding email in the original data
            const originalEmail = allEmailStimuli.find(email =>
              email.Subject === currentSubject && email.Body === currentBody
            );

            if (originalEmail) {
              console.log(`Found email in original data: ${originalEmail.Subject}`);
              return originalEmail;
            } else {
              console.warn(`Email not found in original data: ${currentSubject}`);
              // Fallback if not found in original data
              return {
                Subject: currentSubject,
                Body: currentBody,
                Type: "Unknown",
                CorrectAnswer: "w"
              };
            }
          }
          return null;
        };

        // Function to update email classification counter
        const updateEmailCounter = () => {
          const countdownTimer = document.getElementById('countdown-timer');
          if (countdownTimer) {
            countdownTimer.innerHTML = `Emails: ${globalEmailClassificationCount}`;
          }
        };

        // Initialize email counter display with current global count
        updateEmailCounter();

        // Function to load next email - completely independent of primary task
        const loadNextEmail = (withDelay = true) => {
          const nextEmail = getNextEmailForSecondaryTask();
          console.log(`Loading next email: ${nextEmail.Subject}`);

          // Show loading indicator only if there's a delay
          const emailBody = document.getElementById('email-body');
          if (emailBody && withDelay) {
            emailBody.innerHTML = '<em>Loading next email...</em>';
          }

          // Function to actually update the email content
          const updateEmailContent = () => {
            // Update sender email address
            const senderElement = document.getElementById('email-sender');
            if (senderElement) {
              senderElement.textContent = nextEmail.Sender; // Use new Sender property
            }

            // Update sender avatar initial
            const senderAvatar = document.getElementById('email-sender-avatar');
            if (senderAvatar && nextEmail.Sender) {
              senderAvatar.textContent = nextEmail.Sender.charAt(0).toUpperCase();
            }

            // Update subject
            const subjectElement = document.getElementById('email-subject');
            if (subjectElement) {
              subjectElement.textContent = `Subject: ${nextEmail.Subject}`;
              console.log(`Updated subject to: ${nextEmail.Subject}`);
            } else {
              console.warn('Could not find subject element');
            }

            // Update email body
            if (emailBody) {
              emailBody.innerHTML = nextEmail.Body.replace(/\n/g, "<br>");
              console.log(`Updated email body to: ${nextEmail.Body.substring(0, 50)}...`);
            } else {
              console.warn('Could not find email body element');
            }

            // Reset buttons
            emailButtons.forEach(btn => {
              btn.disabled = false;
              btn.style.opacity = '1';
              btn.style.backgroundColor = '#1a73e8';
              btn.style.color = 'white';
              btn.textContent = btn.dataset.classification === 'w' ? 'Work-related' : 'Non-work-related';
            });

            // Update email stimulus reference
            emailStimulus = nextEmail;

            // Reset classification start time
            emailClassificationStartTime = Date.now();

            console.log(`Next email loaded: ${nextEmail.Subject}`);
          };

          if (withDelay) {
            // Update email content after a brief delay for visual feedback
            const loadTimer = setTimeout(updateEmailContent, 200); // 200ms delay for loading indicator
            // Track this timer as secondary task timer
            this.secondaryTaskTimers.push(loadTimer);
          } else {
            // Update email content immediately without delay
            updateEmailContent();
          }
        };

        // Initialize the first email without delay
        const initTimer = setTimeout(() => {
          loadNextEmail(false); // No delay for initial load
        }, 0);
        this.secondaryTaskTimers.push(initTimer);

        emailButtons.forEach((button, index) => {
          console.log(`Setting up listener for button ${index}:`, button.textContent, button.dataset.classification);
          button.addEventListener('click', function handler(e) {
            e.preventDefault(); // Prevent default button behavior
            e.stopPropagation(); // Stop event bubbling to prevent jsPsych interference

            const classificationChoice = e.target.dataset.classification;
            const rt = Date.now() - emailClassificationStartTime;

            // Get current email from DOM if not set
            if (!emailStimulus) {
              emailStimulus = getCurrentEmailFromDOM();
            }

            console.log(`Email classification clicked: ${classificationChoice} for email: ${emailStimulus?.Subject || 'Unknown'}`);

            // Increment classification count
            globalEmailClassificationCount++;

            // Update counter display
            updateEmailCounter();

            // Add visual feedback
            e.target.style.backgroundColor = '#34a853'; // Gmail green for success
            e.target.style.color = 'white';
            e.target.textContent = classificationChoice === 'w' ? '✓ Work-related' : '✓ Non-work-related';

            emailClassificationResponses.push({
              email_stimulus_index: globalEmailIndex - 1, // Index of the email stimulus (before advancing)
              correct_answer_char: emailStimulus?.CorrectAnswer || 'w',
              user_choice_char: classificationChoice,
              correct: classificationChoice === (emailStimulus?.CorrectAnswer || 'w') ? 1 : 0, // Boolean as number
              rt: Math.round(rt), // Round RT to nearest millisecond
              email_classification_count: globalEmailClassificationCount, // Track which email this is in the trial
              timestamp: Date.now(),
            });

            // Disable email buttons temporarily
            emailButtons.forEach(btn => {
              btn.disabled = true;
              btn.style.opacity = '0.6';
            });

            console.log("Email classified:", classificationChoice, "for", emailStimulus?.Subject || 'Unknown');

            // Advance to next email index AFTER user has made a classification
            advanceToNextEmail();

            // Load next email immediately after classification with delay
            const nextEmailTimer = setTimeout(() => {
              loadNextEmail(true); // With delay after user classification
            }, 300); // Reduced delay to 300ms for faster response

            // Track this timer as secondary task timer
            this.secondaryTaskTimers.push(nextEmailTimer);

          }.bind(this)); // Bind 'this' to access secondaryTaskTimers
        });

        // --- Primary Task (Customer Service) UI Updates ---
        // 取得目前 block 的所有 event id
        let blockEventIds = [];
        for (const block of trialBlocks) {
          if (block.some(trial => trial.data.customer_event_id === cs_event.id)) {
            blockEventIds = block.map(trial => trial.data.customer_event_id);
            break;
          }
        }
        // 統計這個 block 的 pending/handled/missed
        const pendingCount = blockEventIds.filter(id => {
          const event = customerServiceEvents.find(e => e.id === id);
          return event && event.status === 'pending';
        }).length;
        const handledCount = blockEventIds.filter(id => {
          const event = customerServiceEvents.find(e => e.id === id);
          return event && event.status === 'handled';
        }).length;
        const missedCount = blockEventIds.filter(id => {
          const event = customerServiceEvents.find(e => e.id === id);
          return event && event.status === 'missed';
        }).length;

        const pendingCountEl = document.getElementById('pending-cs-count');
        const handledCountEl = document.getElementById('handled-cs-count');
        const missedCountEl = document.getElementById('missed-cs-count');

        if (pendingCountEl) pendingCountEl.textContent = pendingCount;
        if (handledCountEl) handledCountEl.textContent = handledCount;
        if (missedCountEl) missedCountEl.textContent = missedCount;

        const currentPrimaryCsEvent = customerServiceEvents.find(e => e.id === cs_event.id && e.status === 'pending');
        const primaryRespButtons = document.querySelectorAll('.response-btn-primary');
        primaryRespButtons.forEach(btn => btn.disabled = !currentPrimaryCsEvent);

        // Countdown timer for primary task
        const timerElement = document.getElementById('countdown-timer');
        const primaryTimerElement = document.getElementById('primary-task-countdown-timer');
        let timeLeft = Math.floor(params.trialDuration / 1000);
        if (primaryTimerElement) primaryTimerElement.innerText = `Time: ${timeLeft}s`;

        this.countdownIntervalId = setInterval(() => {
          timeLeft--;
          if (primaryTimerElement) primaryTimerElement.textContent = `Time: ${Math.max(0, timeLeft)}s`;
          if (timeLeft <= 0) {
            clearInterval(this.countdownIntervalId);
          }
        }, 1000);

        // 將按鈕群組移動到 primary-task-panel 內
        const btnGroup = document.getElementById('jspsych-html-button-response-btngroup');
        const target = document.getElementById('primary-task-buttons');
        if (btnGroup && target) {
          target.appendChild(btnGroup);
        }
      },
      on_finish: function (data) {
        // Clear only primary task timers when the trial finishes
        // Leave secondary task timers running independently
        if (this.primaryTaskTimers) {
          this.primaryTaskTimers.forEach(timerId => {
            clearTimeout(timerId);
          });
          this.primaryTaskTimers = [];
        }

        // Clear the interval when the trial finishes
        if (this.countdownIntervalId) clearInterval(this.countdownIntervalId);

        const chosenResponseText = data.response !== null ? RESPONSE_BEHAVIOR[data.response] : "no_response";
        const customerEventId = data.customer_event_id;

        const eventIndex = customerServiceEvents.findIndex(e => e.id === customerEventId);
        if (eventIndex !== -1) {
          if (customerServiceEvents[eventIndex].status === 'pending') {
            if (data.response !== null) { // User responded
              customerServiceEvents[eventIndex].status = 'handled';
              customerServiceEvents[eventIndex].chosenResponse = chosenResponseText;
              customerServiceEvents[eventIndex].handledTimestamp = Date.now();
              customerServiceEvents[eventIndex].rt = data.rt;

              // Log to handledEventLog
              handledEventLog.push({
                eventId: customerServiceEvents[eventIndex].id,
                response: chosenResponseText,
                rt: Math.round(data.rt),
                timestamp: customerServiceEvents[eventIndex].handledTimestamp,
                block_condition_label: data.block_condition_label,
                trial_in_block: data.trial_in_block,
                globalTrialIndex: jsPsych.getProgress().current_trial_global,
              });
            } else { // Timeout - user missed the event
              customerServiceEvents[eventIndex].status = 'missed';
            }
          }
        } else {
          console.warn("Could not find customer event to update in on_finish:", customerEventId);
        }

        if (data.response !== null) {
          data.correct = data.response === data.correct_answer_index;
        } else {
          data.correct = false; // No response is incorrect
        }

        data.primary_task_response_text = chosenResponseText;
        data.primary_task_rt = data.rt;
      }
    };
  });
  trialBlocks.push(blockTrials);
}

console.log(`Created ${trialBlocks.length} trial blocks`);
trialBlocks.forEach((block, index) => {
  console.log(`Block ${index + 1}: ${block.length} trials`);
});

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
    .response-btn-primary { /* Styles for primary task buttons if needed */
        /* Add specific styles if they differ from generic .jspsych-btn or .response-btn */
        width: calc(100% - 10px); /* Example: full width with some margin */
    }
    
    /* Email classification button styles */
    .email-classify-btn {
      padding: 12px 20px;
      font-size: 14px;
      background-color: #1a73e8;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;
      font-weight: 500;
      flex: 1;
      margin: 0 5px;
      box-sizing: border-box;
    }
    .email-classify-btn:hover {
      background-color: #1557b0;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(26, 115, 232, 0.3);
    }
    .email-classify-btn:active {
      background-color: #0d47a1;
      transform: translateY(0);
    }
    .email-classify-btn:disabled {
      background-color: #e8eaed;
      color: #5f6368;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
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
      text-align: left;
    }

    .jspsych-popup-message {
      /* Existing styles... */
      transition: bottom 0.3s ease-out, opacity 0.3s ease-out; /* Add transition */
      bottom: -100px; /* Start position below screen */
      opacity: 0; /* Start invisible */
    }

    .jspsych-popup-message.show {
      bottom: 25px; /* Ending position */
      opacity: 1; /* Ending opacity */
    }

    .panel-titlebar {
      user-select: none;
      background: #e3e6ea;
      border-bottom: 1px solid #cfd2d6;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
    }
    .panel-titlebar button {
      width: 18px;
      height: 18px;
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 15px;
      line-height: 1;
      margin-left: 2px;
      margin-right: 2px;
      padding: 0;
      transition: background 0.15s;
    }
    .panel-titlebar button.panel-btn-close {
      color: #d93025;
    }
    .panel-titlebar button:hover {
      background: #d0d3d8;
    }
    /* Primary task panel button group 美化 */
    #primary-task-panel #jspsych-html-button-response-btngroup {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 18px;
      margin: 28px 0 0 0;
      flex-wrap: nowrap;
    }
    #primary-task-panel .jspsych-btn.response-btn-primary {
      flex: 1 1 120px;
      min-width: 120px;
      max-width: 340px;
      font-size: 1em;
      padding: 14px 10px;
      border-radius: 6px;
      background: #1976d2;
      color: #fff;
      border: none;
      font-weight: 500;
      transition: background 0.18s, box-shadow 0.18s;
      box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
      word-break: break-word;
      white-space: normal;
      text-align: center;
    }
    #primary-task-panel .jspsych-btn.response-btn-primary:hover {
      background: #125ea2;
    }
    #primary-task-panel .jspsych-btn.response-btn-primary:active {
      background: #0d3c6e;
    }

    .jspsych-display-element {
      max-width: 100vw;
      max-height: 100vh;
      min-height: 92vh;
      min-width: 96vw;
      padding: 0;
      margin: 0 auto;
      background: #f5f6fa;
    }
    #messaging-footer-primary {
      margin-bottom: 0 !important;
      padding-bottom: 4px;
    }
    #primary-task-buttons {
      margin-top: 0px !important;
      padding-bottom: 20px !important;
    }
    #primary-task-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    #primary-task-buttons {
      margin-top: auto !important;
    }
  `;
  document.head.appendChild(style);
}

const blockStartScreen = {
  type: jsPsychInstructions,
  pages: [
    `
    <div style="font-size: 22px; line-height: 1.6;">
      <p>The next section is about to begin.</p>
      <p>Please place your hands on the keyboard or mouse and prepare to start.</p>
      <p>Click "Next" when you are ready.</p>
    </div>
    `
  ],
  show_clickable_nav: true,
  button_label_next: "Next",
  data: { task: "block_start_screen" }
};

timeline.push(
  ...(trialBlocks.reduce((acc, block, index) => {
    acc.push(blockStartScreen); // Add start screen before the block
    acc.push(...block); // Spread the trials of the block
    if (index < trialBlocks.length - 1) { // Add interBlockSurvey between blocks
      acc.push(interBlockSurvey);
    }
    return acc;
  }, []))
);
timeline.push(interBlockSurvey);

addCustomStyles(); // Add the CSS for animations

// --- Demographic Survey (Control Variables) ---
const demographicSurvey = {
  type: jsPsychSurveyMultiChoice,
  preamble: "<h3>Demographic Information</h3><p>Please answer the following questions:</p>",
  questions: [
    {
      prompt: "What is your biological gender?",
      name: "gender",
      options: ["Male", "Female", "Other", "Prefer not to say"],
      required: true
    },
    {
      prompt: "What is your age group?",
      name: "age_group",
      options: [
        "15-19", "20-24", "25-29", "30-34", "35-39",
        "40-44", "45-49", "50-54", "55-59", "60-64", "65 or above"
      ],
      required: true
    },
    {
      prompt: "Which region are you currently living in?",
      name: "region",
      options: [
        "North America", "South America", "Europe", "Asia", "Africa", "Oceania", "Other"
      ],
      required: true
    },
    {
      prompt: "What is your current occupation?",
      name: "occupation",
      options: [
        "Student", "Academic/Researcher", "Office Worker", "Self-employed", "Unemployed", "Retired", "Other"
      ],
      required: true
    }
  ],
  data: { task: "demographic_survey" }
};

timeline.push(demographicSurvey);

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
      experimentData:
        data.map((e) => {
          delete e.stimulus;
          delete e.plugin_version;
          return e;
        }),
      handledCustomerServiceEvents: handledEventLog,
      emailClassificationResponses: emailClassificationResponses,
      stimulusReferences: {
        emailStimuli: emailStimulusReference,
        customerServiceEvents: customerServiceEventReference
      },
    };
    const prolificId = jsPsych.data.getURLVariable("PROLIFIC_PID") || "unknown";

    fetch(APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        prolific_id: prolificId,
        data: dataToSave,
      }),
    }).finally(() => {
      // Show Prolific completion code and link
      const prolificUrl = `https://app.prolific.com/submissions/complete?cc=${completionCode}`;
      document.body.innerHTML = `
        <div style="max-width: 500px; margin: 80px auto; padding: 32px; background: #fff; border-radius: 10px; box-shadow: 0 2px 16px rgba(0,0,0,0.08); text-align: center; font-family: sans-serif;">
          <h2>Thank you for participating!</h2>
          <p style="font-size: 1.1em; margin: 24px 0 12px 0;">Your Prolific completion code is:</p>
          <div style="font-size: 1.5em; font-weight: bold; color: #1976d2; margin-bottom: 24px;">${completionCode}</div>
          <a href="${prolificUrl}" style="display: inline-block; padding: 12px 28px; background: #1976d2; color: #fff; border-radius: 6px; font-size: 1.1em; text-decoration: none; font-weight: 500;">Click here to return to Prolific</a>
        </div>
      `;
    });
  },
});
jsPsych.run(timeline);
