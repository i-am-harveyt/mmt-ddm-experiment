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
  trialsPerBlock: 30,
  popupFreq: { low: 2, med: 5, high: 8 },
  trialDuration: 20_000,
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
    prompt: "當您看電視時，您多常同時...傳訊息（如 文字, WhatsApp, Line）？",
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
    `
    <h1>歡迎參與本實驗</h1>
    <p>
    感謝您參與本次實驗。整體流程將包含三個段落，並於開始前、中段與結束時各提供一次問卷調查。
    </p>
    <p>
    接下來，您將扮演一位客服人員，並同時執行兩項任務。這兩項任務會分別呈現在螢幕左側與右側的並排區域中。
    </p>`,

    `
    <h2>說明 1 / 4：任務一</h2>
    <p>
    您將在螢幕右側看到一個客戶訊息欄。我們將為每則訊息設置 ${params.trialDuration / 1_000} 秒的回應時限，並顯示於畫面上。
    </p>
    <p>
    請依據訊息內容快速且正確地選擇下方的回應選項：<br/>
    ─ 若為訂單或流程相關問題，請點選「請提供你的訂單編號」。<br/>
    ─ 若為技術問題，請點選「該問題已經轉交技術部門，我們會盡快回覆您」。
    </p>`,

    `
    <h2>說明 2 / 4：任務二</h2>
    <p>
    同時，螢幕左側會持續出現數封電子郵件，請您判斷其內容是否與工作相關。
    </p>
    <p>
    每封郵件下方均有兩個按鈕：<b>「工作相關」</b>與<b>「非工作相關」</b>，請據實點選以完成分類。
    </p>`,

    `
    <h2>說明 3 / 4：其他提示</h2>
    <p>
    實驗過程中，畫面上可能隨機跳出來自 email、Slack、或 Teams 的訊息提示，將以彈出視窗形式呈現。
    </p>
    <p>
    每則提示將會自動於 ${params.popupDuration / 1_000} 秒後關閉，無須額外操作。
    </p>`,

    `
    <h2>說明 4 / 4：任務完成與提醒</h2>
    <p>
    實驗將於您完成所有任務一後自動結束。若您計畫執行次要任務，請務必留意時間與節奏。
    </p>
    <p>
    請盡力完成兩項任務，準備就緒後，請點選「Next」開始實驗。
    </p>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Next",
  button_label_previous: "Previous",
};

// --- Comprehension Check ---
const comprehensionQuestions = [
  {
    prompt: "當你在客服訊息欄看到『我無法登入帳戶』時，應該選哪個回應？",
    options: [
      "請提供你的訂單編號",
      "該問題已經轉交技術部門，我們會盡快回覆您",
      "不需要回應"
    ],
    required: true,
    correct: 1
  },
  {
    prompt: "Email 任務中，遇到『公司政策更新通知』應該如何分類？",
    options: [
      "工作相關",
      "非工作相關"
    ],
    required: true,
    correct: 0
  },
  {
    prompt: "彈出訊息（popup）出現時，你需要點擊或回應嗎？",
    options: [
      "需要，否則無法繼續",
      "不需要，會自動消失"
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
  preamble: "<h3>理解檢核題</h3><p>請回答下列問題，確保你已經了解實驗規則。</p>",
  button_label: "提交",
  on_finish: function(data) {
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
  loop_function: function(data) {
    const last = data.values().slice(-1)[0];
    if (!last.comprehension_passed) {
      alert("有些題目答錯了，請再閱讀說明並重新作答。");
      return true; // 重新顯示說明+檢核
    }
    return false; // 通過，進入正式實驗
  }
};

// timeline.push(instructions);
// timeline.push(comprehensionLoop);
timeline.push(comprehensionLoop);

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

// --- 4. Task-related Functions & Data ---

// Primary Task (Customer Service) - Now tracked by jsPsych
const RESPONSE_BEHAVIOR = [
  "請提供你的訂單編號",
  "該問題已經轉交技術部門，我們會盡快回覆您",
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
  { app: "Email", sender: "Alice", message: "週末的聚會你會來嗎？" },
  { app: "Line", sender: "媽媽", message: "記得明天回家吃飯。" },
  { app: "Slack", sender: "HR", message: "請記得填寫本月的出勤紀錄。" },
  { app: "Teams", sender: "主管", message: "下午三點有會議，請準時參加。" },
  { app: "Email", sender: "Bob", message: "這週五有空一起打球嗎？" },
  { app: "Line", sender: "同學群組", message: "下週要不要一起去看電影？" },
  { app: "Slack", sender: "設計師", message: "新版本的設計稿已經上傳。" },
  { app: "Teams", sender: "專案經理", message: "請回覆客戶的最新需求。" },
];

const initialChatData = [
  // --- 正確回應: "請提供你的訂單編號" ---
  { sender: "Alice", text: "我想查詢我的訂單處理進度。", answerIndex: 0 },
  { sender: "Bob", text: "我收到的商品數量不對，怎麼辦？", answerIndex: 0 },
  { sender: "Charles", text: "請問我可以修改我的訂單內容嗎？", answerIndex: 0 },
  { sender: "David", text: "我還沒收到我的退款。", answerIndex: 0 },
  { sender: "Eve", text: "我需要申請售後服務。", answerIndex: 0 },
  { sender: "Frank", text: "我想查詢一筆帳單的詳細內容。", answerIndex: 0 },
  { sender: "Grace", text: "我上週下的單，現在寄出了嗎？", answerIndex: 0 },
  { sender: "Henry", text: "我對收到的發票金額有疑問。", answerIndex: 0 },
  { sender: "Ivy", text: "我需要取消我的訂單。", answerIndex: 0 },
  { sender: "Jack", text: "我付了款，但系統顯示訂單未付款。", answerIndex: 0 },
  { sender: "Alice", text: "我的包裹好像寄丟了，可以幫我查一下嗎？", answerIndex: 0 },
  { sender: "Bob", text: "我要如何退貨？", answerIndex: 0 },
  { sender: "Charles", text: "我需要我的發票副本。", answerIndex: 0 },
  { sender: "David", text: "我收到的產品有瑕疵。", answerIndex: 0 },
  { sender: "Eve", text: "請問我的維修進度如何？", answerIndex: 0 },
  { sender: "Frank", text: "我想確認我的合約細節。", answerIndex: 0 },
  { sender: "Grace", text: "我購買的服務尚未啟用。", answerIndex: 0 },
  { sender: "Henry", text: "我想更改我的送貨地址。", answerIndex: 0 },
  { sender: "Ivy", text: "上次的諮詢費用帳單有問題。", answerIndex: 0 },
  { sender: "Jack", text: "我對月費帳單有疑問。", answerIndex: 0 },
  { sender: "Kelly", text: "我想查詢我的會員點數餘額。", answerIndex: 0 },
  { sender: "Leo", text: "請問我的發票什麼時候會寄出？", answerIndex: 0 },
  { sender: "Mandy", text: "我需要申請換貨，該怎麼做？", answerIndex: 0 },
  { sender: "Nina", text: "我想知道我的訂單目前處於什麼狀態。", answerIndex: 0 },
  { sender: "Oscar", text: "我收到的商品有缺件，怎麼處理？", answerIndex: 0 },
  { sender: "Paul", text: "請問如何查詢過去的消費紀錄？", answerIndex: 0 },
  { sender: "Queenie", text: "我想更改發票抬頭。", answerIndex: 0 },
  { sender: "Ryan", text: "我的退款什麼時候會入帳？", answerIndex: 0 },
  { sender: "Sandy", text: "我需要申請紙本發票。", answerIndex: 0 },
  { sender: "Tom", text: "我想查詢我的會員等級。", answerIndex: 0 },
  { sender: "Una", text: "我想知道我的訂單預計什麼時候出貨。", answerIndex: 0 },
  { sender: "Vicky", text: "我需要補發收據。", answerIndex: 0 },
  { sender: "Will", text: "我想查詢我的積分兌換紀錄。", answerIndex: 0 },
  { sender: "Xavier", text: "我想取消自動續約功能。", answerIndex: 0 },
  { sender: "Yvonne", text: "我需要查詢我的保固期限。", answerIndex: 0 },
  { sender: "Zack", text: "我想更改聯絡電話。", answerIndex: 0 },
  { sender: "Amy", text: "我想查詢我的訂單配送進度。", answerIndex: 0 },
  { sender: "Ben", text: "我需要申請發票補印。", answerIndex: 0 },
  { sender: "Cathy", text: "我想查詢我的會員專屬優惠。", answerIndex: 0 },
  { sender: "Derek", text: "我想知道如何申請退貨。", answerIndex: 0 },
  { sender: "Ella", text: "我需要查詢我的訂單明細。", answerIndex: 0 },
  { sender: "Fiona", text: "我想更改收件地址。", answerIndex: 0 },
  { sender: "George", text: "我想查詢我的消費發票。", answerIndex: 0 },
  { sender: "Helen", text: "我需要查詢我的訂單付款狀態。", answerIndex: 0 },
  { sender: "Ian", text: "我想查詢我的會員卡號。", answerIndex: 0 },
  { sender: "Judy", text: "我需要申請售後維修。", answerIndex: 0 },
  { sender: "Kevin", text: "我想查詢我的訂單折扣金額。", answerIndex: 0 },
  { sender: "Linda", text: "我需要查詢我的訂單發票號碼。", answerIndex: 0 },
  { sender: "Maggie", text: "我想查詢我的訂單配送方式。", answerIndex: 0 },
  { sender: "Nick", text: "我需要查詢我的訂單取消狀態。", answerIndex: 0 },
  { sender: "Olivia", text: "我想查詢我的訂單付款方式。", answerIndex: 0 },
  { sender: "Peter", text: "我需要查詢我的訂單出貨日期。", answerIndex: 0 },
  { sender: "Queena", text: "我想查詢我的訂單物流編號。", answerIndex: 0 },
  { sender: "Rita", text: "我需要查詢我的訂單備註內容。", answerIndex: 0 },
  { sender: "Sam", text: "我想查詢我的訂單優惠券使用情況。", answerIndex: 0 },
  { sender: "Tina", text: "我需要查詢我的訂單發票抬頭。", answerIndex: 0 },
  { sender: "Ursula", text: "我想查詢我的訂單配送時間。", answerIndex: 0 },
  { sender: "Victor", text: "我需要查詢我的訂單付款紀錄。", answerIndex: 0 },
  { sender: "Wendy", text: "我想查詢我的訂單配送狀態。", answerIndex: 0 },
  { sender: "Xena", text: "我需要查詢我的訂單發票內容。", answerIndex: 0 },
  { sender: "Yale", text: "我想查詢我的訂單付款方式。", answerIndex: 0 },
  { sender: "Zoe", text: "我需要查詢我的訂單配送方式。", answerIndex: 0 },
  { sender: "Allen", text: "我想查詢我的訂單付款狀態。", answerIndex: 0 },
  { sender: "Betty", text: "我需要查詢我的訂單發票號碼。", answerIndex: 0 },
  { sender: "Carl", text: "我想查詢我的訂單配送方式。", answerIndex: 0 },
  { sender: "Doris", text: "我需要查詢我的訂單取消狀態。", answerIndex: 0 },
  { sender: "Ethan", text: "我想查詢我的訂單付款方式。", answerIndex: 0 },


  // --- 正確回應: "該問題已經轉交技術部門..." ---
  { sender: "Alice", text: "網站的密碼重設功能沒有用。", answerIndex: 1 },
  { sender: "Bob", text: "我無法登入我的帳戶。", answerIndex: 1 },
  { sender: "Charles", text: "你們的系統一直顯示錯誤訊息 'Error 503'。", answerIndex: 1 },
  { sender: "David", text: "App在結帳頁面閃退。", answerIndex: 1 },
  { sender: "Eve", text: "我無法上傳文件到你們的平台。", answerIndex: 1 },
  { sender: "Frank", text: "你們的API回傳的資料格式不正確。", answerIndex: 1 },
  { sender: "Grace", text: "系統的資料匯出功能失敗了。", answerIndex: 1 },
  { sender: "Henry", text: "我懷疑我的帳戶有安全漏洞。", answerIndex: 1 },
  { sender: "Ivy", text: "系統更新後，某些舊功能不見了。", answerIndex: 1 },
  { sender: "Jack", text: "我無法將商品加入購物車。", answerIndex: 1 },
  { sender: "Alice", text: "網站的搜尋功能找不到任何結果。", answerIndex: 1 },
  { sender: "Bob", text: "你們的付款頁面無法載入。", answerIndex: 1 },
  { sender: "Charles", text: "系統在處理我的請求時沒有回應。", answerIndex: 1 },
  { sender: "David", text: "我收到了帳戶異常活動的通知。", answerIndex: 1 },
  { sender: "Eve", text: "你們的系統與我的瀏覽器不相容。", answerIndex: 1 },
  { sender: "Frank", text: "我無法儲存我的個人資料變更。", answerIndex: 1 },
  { sender: "Grace", text: "系統顯示我的儲存空間已滿，但我沒放什麼東西。", answerIndex: 1 },
  { sender: "Henry", text: "你們的資料庫連線似乎很不穩定。", answerIndex: 1 },
  { sender: "Ivy", text: "我需要緊急技術支援，我的服務中斷了。", answerIndex: 1 },
  { sender: "Jack", text: "用戶介面的按鈕點了沒有反應。", answerIndex: 1 },
  { sender: "Kelly", text: "我的帳號被鎖住，無法登入。", answerIndex: 1 },
  { sender: "Leo", text: "系統顯示資料庫錯誤，請協助處理。", answerIndex: 1 },
  { sender: "Mandy", text: "我上傳檔案時一直出現錯誤訊息。", answerIndex: 1 },
  { sender: "Nina", text: "網站載入速度很慢，請問怎麼辦？", answerIndex: 1 },
  { sender: "Oscar", text: "App閃退無法正常使用。", answerIndex: 1 },
  { sender: "Paul", text: "我收到的驗證信無法點擊連結。", answerIndex: 1 },
  { sender: "Queenie", text: "系統更新後資料遺失。", answerIndex: 1 },
  { sender: "Ryan", text: "登入時顯示密碼錯誤，但我確定正確。", answerIndex: 1 },
  { sender: "Sandy", text: "無法重設密碼，請協助。", answerIndex: 1 },
  { sender: "Tom", text: "系統顯示服務暫時無法使用。", answerIndex: 1 },
  { sender: "Una", text: "我收到的推播通知內容有誤。", answerIndex: 1 },
  { sender: "Vicky", text: "網站圖片無法顯示。", answerIndex: 1 },
  { sender: "Will", text: "我無法下載附件檔案。", answerIndex: 1 },
  { sender: "Xavier", text: "系統自動登出，請問原因？", answerIndex: 1 },
  { sender: "Yvonne", text: "我收到的簡訊驗證碼無法使用。", answerIndex: 1 },
  { sender: "Zack", text: "App更新後無法啟動。", answerIndex: 1 },
  { sender: "Amy", text: "網站表單送出後沒有反應。", answerIndex: 1 },
  { sender: "Ben", text: "我無法修改個人資料。", answerIndex: 1 },
  { sender: "Cathy", text: "系統顯示伺服器錯誤。", answerIndex: 1 },
  { sender: "Derek", text: "我無法收到重設密碼的信件。", answerIndex: 1 },
  { sender: "Ella", text: "網站顯示 404 找不到頁面。", answerIndex: 1 },
  { sender: "Fiona", text: "我無法新增收件地址。", answerIndex: 1 },
  { sender: "George", text: "系統顯示 API 錯誤。", answerIndex: 1 },
  { sender: "Helen", text: "我無法啟用雙重驗證。", answerIndex: 1 },
  { sender: "Ian", text: "網站顯示「請稍後再試」。", answerIndex: 1 },
  { sender: "Judy", text: "我無法收到通知信。", answerIndex: 1 },
  { sender: "Kevin", text: "系統顯示「連線逾時」。", answerIndex: 1 },
  { sender: "Linda", text: "我無法儲存設定變更。", answerIndex: 1 },
  { sender: "Maggie", text: "網站顯示「權限不足」。", answerIndex: 1 },
  { sender: "Nick", text: "我無法上傳大檔案。", answerIndex: 1 },
  { sender: "Olivia", text: "App閃退後資料遺失。", answerIndex: 1 },
  { sender: "Peter", text: "網站顯示「系統維護中」。", answerIndex: 1 },
  { sender: "Queena", text: "我無法啟用新功能。", answerIndex: 1 },
  { sender: "Rita", text: "系統顯示「未知錯誤」。", answerIndex: 1 },
  { sender: "Sam", text: "我無法收到驗證簡訊。", answerIndex: 1 },
  { sender: "Tina", text: "網站顯示「請重新登入」。", answerIndex: 1 },
  { sender: "Ursula", text: "我無法啟用推播通知。", answerIndex: 1 },
  { sender: "Victor", text: "系統顯示「資料格式錯誤」。", answerIndex: 1 },
  { sender: "Wendy", text: "我無法下載發票。", answerIndex: 1 },
  { sender: "Xena", text: "網站顯示「服務異常」。", answerIndex: 1 },
  { sender: "Yale", text: "我無法啟用會員功能。", answerIndex: 1 },
  { sender: "Zoe", text: "App閃退後無法重新登入。", answerIndex: 1 },
  { sender: "Allen", text: "系統顯示「資料同步失敗」。", answerIndex: 1 },
  { sender: "Betty", text: "我無法啟用優惠券。", answerIndex: 1 },
  { sender: "Carl", text: "網站顯示「請求失敗」。", answerIndex: 1 },
  { sender: "Doris", text: "我無法收到推播通知。", answerIndex: 1 },
  { sender: "Ethan", text: "系統顯示「請稍後再試」。", answerIndex: 1 },
];

console.log(`Total messages: ${initialChatData.length}`);

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
    timestamp: event.timestamp
  };
});

// Add customer service event map to data export
const customerServiceEventReference = {
  event_map: customerServiceEventMap,
  total_events: customerServiceEvents.length
};

// --- Secondary Task (Email) Data Setup ---
const allEmailStimuli = [
  // --- Block 1 ---
  {
    Subject: "Movie night this weekend?",
    Sender: "sarah.connor@gmail.com",
    Body: "Hey!\n\nJust a friendly reminder about movie night this Saturday. I'm planning on bringing snacks, so if you could grab the drinks, that would be awesome. Let me know if you're still good to go. Can't wait!\n\nSee ya,\nSarah",
    Type: "Non-work-related",
    Block: 1, Trial: 1, CorrectAnswer: "n",
  },
  {
    Subject: "URGENT: System Maintenance Tonight",
    Sender: "it-support@metacortex.com",
    Body: "Dear Team,\n\nThis is a notification that we will be conducting a system-wide update tonight from 10 PM to 2 AM. During this time, access to network drives and other internal services may be intermittent. Please save all your work and log out before the maintenance window to avoid any data loss.\n\nThank you for your cooperation,\nIT Support",
    Type: "Work-related",
    Block: 1, Trial: 2, CorrectAnswer: "w",
  },
  {
    Subject: "Upcoming Q3 Training Schedule",
    Sender: "hr-noreply@metacortex.com",
    Body: "Hi all,\n\nThe new training schedule for Q3 is now available on the company portal. All employees are required to complete the mandatory 'Cybersecurity Awareness' course by the end of the quarter. Please review the available slots and sign up for a session that fits your schedule.\n\nBest,\nHR Department",
    Type: "Work-related",
    Block: 1, Trial: 3, CorrectAnswer: "w",
  },
  {
    Subject: "Action Required: Updated Onboarding Guide",
    Sender: "hr-noreply@metacortex.com",
    Body: "Hi Managers,\n\nThe onboarding guide for new hires has been updated to reflect our new hybrid work policies. Please ensure you are using the latest version for all new team members to provide them with the correct information. The updated guide can be found in the 'HR Resources' shared drive.\n\nThanks,\nHR",
    Type: "Work-related",
    Block: 1, Trial: 4, CorrectAnswer: "w",
  },
  {
    Subject: "Reminder: Project Phoenix Deadline",
    Sender: "project-manager@metacortex.com",
    Body: "Team,\n\nThis is a quick reminder that the final deadline for Project Phoenix is this Friday. Please make sure all your deliverables are submitted and documentation is updated by EOD. Let's finish strong!\n\nThanks,\nAlex",
    Type: "Work-related",
    Block: 1, Trial: 5, CorrectAnswer: "w",
  },
  {
    Subject: "Update to Remote Work Policy",
    Sender: "hr-noreply@metacortex.com",
    Body: "Dear Employees,\n\nPlease be advised that there has been an update to the company's remote work policy, effective next Monday. You can find the revised document on the intranet under 'Company Policies'. Please familiarize yourself with the changes.\n\nSincerely,\nHuman Resources",
    Type: "Work-related",
    Block: 1, Trial: 6, CorrectAnswer: "w",
  },
  {
    Subject: "You HAVE to see this show!",
    Sender: "emily.jones@outlook.com",
    Body: "OMG, did you see the latest episode of that Netflix drama? The ending was absolutely wild! We need to talk about it ASAP. Are you free to catch up tomorrow?\n\n- Em",
    Type: "Non-work-related",
    Block: 1, Trial: 7, CorrectAnswer: "n",
  },
  {
    Subject: "Mike's Birthday Tomorrow!",
    Sender: "john.doe@yahoo.com",
    Body: "Hey,\n\nJust wanted to remind you that it's Mike's birthday tomorrow! A few of us are chipping in for a gift. Let me know if you want to contribute. We're also grabbing cake in the breakroom around 3 PM.\n\n- John",
    Type: "Non-work-related",
    Block: 1, Trial: 8, CorrectAnswer: "n",
  },
  {
    Subject: "Flash sale on running shoes",
    Sender: "deals@greatfinds.com",
    Body: "Hi there,\n\nJust saw a flash sale on running shoes—50% off until midnight! Thought you might be interested since you mentioned needing a new pair. Here's the link: [link]\n\nCheers!",
    Type: "Non-work-related",
    Block: 1, Trial: 9, CorrectAnswer: "n",
  },
  {
    Subject: "Action Required: Complete Your Annual Security Training",
    Sender: "hr-noreply@metacortex.com",
    Body: "Hello everyone,\n\nThis is a reminder about the mandatory annual security training. Records show that you have not yet completed this requirement. Please complete it by the end of the month to maintain network access. You can access the training portal through the employee dashboard.\n\nThank you,\nHR Department",
    Type: "Work-related",
    Block: 1, Trial: 10, CorrectAnswer: "w",
  },
  {
    Subject: "FWD: Client Proposal Revisions",
    Sender: "project-manager@metacortex.com",
    Body: "Hi Team,\n\nThe client has requested revisions to the proposal we submitted last week. Please see the attached document with their comments and feedback. Let's schedule a brief meeting tomorrow to discuss our plan of action.\n\nBest,\nSarah",
    Type: "Work-related",
    Block: 1, Trial: 11, CorrectAnswer: "w",
  },
  {
    Subject: "Got to show you this pic of Whiskers",
    Sender: "crazycatlady@yahoo.com",
    Body: "I have to show you this picture of my cat, Whiskers, sleeping in a tiny cardboard box. He looks so ridiculous and cute! Hope this brightens your day!\n\n- Linda",
    Type: "Non-work-related",
    Block: 1, Trial: 12, CorrectAnswer: "n",
  },
  {
    Subject: "Lunch tomorrow?",
    Sender: "foodie_friend@outlook.com",
    Body: "Hey,\n\nAre we still on for lunch tomorrow? I was thinking we could try that new cafe downtown that everyone's talking about. Let me know what you think!\n\nTalk soon,\nYour Pal",
    Type: "Non-work-related",
    Block: 1, Trial: 13, CorrectAnswer: "n",
  },
  {
    Subject: "New Photos: Beach Trip!",
    Sender: "gamenight-squad@googlegroups.com",
    Body: "Hey everyone,\n\nI've finally uploaded the photos from our beach trip last weekend! There are some really great ones. You can check them out in the shared album here: [link].\n\n- Mark",
    Type: "Non-work-related",
    Block: 1, Trial: 14, CorrectAnswer: "n",
  },
  {
    Subject: "FWD: Quarterly Report",
    Sender: "finance-dept@metacortex.com",
    Body: "Hi,\n\nPlease find the attached Q2 financial report. Review the numbers for your department and let me know if you have any questions before our meeting on Friday.\n\nRegards,\nFinance Department",
    Type: "Work-related",
    Block: 1, Trial: 15, CorrectAnswer: "w",
  },
  {
    Subject: "Concert tickets for Friday!",
    Sender: "live.music.lover@gmail.com",
    Body: "Hey! I managed to get two tickets for that band we like on Friday night. Are you free to go? Let me know ASAP before I offer the other one to someone else!\n\n- Dave",
    Type: "Non-work-related",
    Block: 1, Trial: 16, CorrectAnswer: "n",
  },
  {
    Subject: "Can you review this draft?",
    Sender: "project-manager@metacortex.com",
    Body: "Hi,\n\nCould you please take a look at the attached document? It's the draft for the client presentation tomorrow. I'd appreciate your feedback on the content and flow.\n\nThanks,\nEmily",
    Type: "Work-related",
    Block: 1, Trial: 17, CorrectAnswer: "w",
  },
  {
    Subject: "REMINDER: Time sheets due by 5 PM today",
    Sender: "management-noreply@metacortex.com",
    Body: "Hi Team,\n\nThis is a friendly reminder to submit your time sheets for the week by 5 PM today. Please ensure all project hours are logged accurately. Your timely submission is greatly appreciated.\n\nThanks,\nManagement",
    Type: "Work-related",
    Block: 1, Trial: 18, CorrectAnswer: "w",
  },
  {
    Subject: "Found: Water bottle in conference room 3B",
    Sender: "kevin-finance@metacortex.com",
    Body: "Hi all,\n\nSomeone left a blue metal water bottle in conference room 3B after the 10am meeting. I've left it on the counter in the kitchen on the 3rd floor.\n\nCheers,\nKevin",
    Type: "Non-work-related",
    Block: 1, Trial: 19, CorrectAnswer: "n",
  },
  {
    Subject: "Draft of Q4 report attached for your review",
    Sender: "finance-dept@metacortex.com",
    Body: "Hi,\n\nAttached is the draft of the Q4 performance report. Please review it and provide any feedback or corrections by end of business on Wednesday.\n\nThanks,\n[Name]",
    Type: "Work-related",
    Block: 1, Trial: 20, CorrectAnswer: "w",
  },

  // --- Block 2 ---
  {
    Subject: "Team Lunch Next Week!",
    Sender: "social-committee@metacortex.com",
    Body: "Hi Team,\n\nTo celebrate our recent project success, we're organizing a team lunch next week! Please vote for your preferred restaurant in the poll linked below so we can make a reservation. Hope to see you all there!\n\nCheers,\nSocial Committee",
    Type: "Work-related",
    Block: 2, Trial: 1, CorrectAnswer: "w",
  },
  {
    Subject: "Reminder: Team Sync-up Tomorrow",
    Sender: "project-manager@metacortex.com",
    Body: "Hi Team,\n\nJust a quick heads-up: our weekly team sync-up call is scheduled for 10 AM tomorrow. Please come prepared with your updates and any potential blockers.\n\nThanks,\nAlex",
    Type: "Work-related",
    Block: 2, Trial: 2, CorrectAnswer: "w",
  },
  {
    Subject: "Yoga this weekend?",
    Sender: "jess@gmail.com",
    Body: "Hey!\n\nWant to join me for a yoga class? I found a studio that offers the first class for free. Could be a fun way to relax this weekend!\n\nLet me know,\nJess",
    Type: "Non-work-related",
    Block: 2, Trial: 3, CorrectAnswer: "n",
  },
  {
    Subject: "Your action is required: Performance Review",
    Sender: "hr-noreply@metacortex.com",
    Body: "Hi,\n\nThis is a reminder that your quarterly self-assessment is due by this Friday. Please log in to the Performance Portal to complete your review. Your manager will not be able to finalize their assessment until you have submitted yours.\n\nRegards,\nHuman Resources",
    Type: "Work-related",
    Block: 2, Trial: 4, CorrectAnswer: "w",
  },
  {
    Subject: "FW: Client Feedback on the Mockups",
    Sender: "client.services@metacortex.com",
    Body: "Hi Team,\n\nThe client has provided some feedback on the latest design mockups. Overall, they are very positive but have a few minor revision requests. I've attached their comments. Let's discuss tomorrow morning.\n\nRegards,\nSarah",
    Type: "Work-related",
    Block: 2, Trial: 5, CorrectAnswer: "w",
  },
  {
    Subject: "This cat video will make your day",
    Sender: "foodie_friend@outlook.com",
    Body: "You have to see this cat video I found, it's hilarious! I promise it will make your day. Here's the link.\n\nEnjoy,\nTom",
    Type: "Non-work-related",
    Block: 2, Trial: 6, CorrectAnswer: "n",
  },
  {
    Subject: "Your Amazon.com order has shipped",
    Sender: "shipment-tracking@amazon.com",
    Body: "Hello,\n\nGood news! Your order #123-4567890-1234567 has shipped and is expected to arrive by Tuesday, October 26th. You can track your package here: [Tracking Link].\n\nThank you for shopping with us,\nAmazon.com",
    Type: "Non-work-related",
    Block: 2, Trial: 7, CorrectAnswer: "n",
  },
  {
    Subject: "Meeting Follow-up: Action Items",
    Sender: "project-manager@metacortex.com",
    Body: "Hi All,\n\nThanks for the productive meeting today. As discussed, I've attached a summary of the action items and owners. Please review and let me know if I missed anything.\n\nBest,\nDavid",
    Type: "Work-related",
    Block: 2, Trial: 8, CorrectAnswer: "w",
  },
  {
    Subject: "New message from your LinkedIn connection",
    Sender: "messaging-noreply@linkedin.com",
    Body: "Hi,\n\nYou have a new message from John Smith regarding a potential job opportunity. Log in to LinkedIn to view the message and respond.\n\nThank you,\nThe LinkedIn Team",
    Type: "Non-work-related",
    Block: 2, Trial: 9, CorrectAnswer: "n",
  },
  {
    Subject: "Expense Report Reminder",
    Sender: "finance-dept@metacortex.com",
    Body: "Dear employee,\n\nThis is a reminder that all expense reports for the previous month must be submitted by the 15th. Please submit your expenses through the portal to ensure timely reimbursement.\n\nThank you,\nFinance",
    Type: "Work-related",
    Block: 2, Trial: 10, CorrectAnswer: "w",
  },
  {
    Subject: "Your flight is confirmed: NYC to SFO",
    Sender: "confirmations@kayak.com",
    Body: "Hi,\n\nYour flight booking is confirmed! Please review your itinerary below and ensure all details are correct.\n\nFlight: UA 456\nDeparture: NYC (JFK) - 8:00 AM\nArrival: SFO - 11:30 AM\n\nSafe travels,\nThe Kayak Team",
    Type: "Non-work-related",
    Block: 2, Trial: 11, CorrectAnswer: "n",
  },
  {
    Subject: "Welcome to the team, Jessica!",
    Sender: "manager-noreply@metacortex.com",
    Body: "All,\n\nPlease join me in giving a warm welcome to our new Marketing Specialist, Jessica Day, who is starting with us today! Jessica will be sitting with the marketing team on the 4th floor. Please stop by and say hello!\n\nBest,\n[Manager Name]",
    Type: "Work-related",
    Block: 2, Trial: 12, CorrectAnswer: "w",
  },
  {
    Subject: "Anyone interested in a fantasy football league?",
    Sender: "kevin-finance@metacortex.com",
    Body: "Hey football fans,\n\nI'm thinking of starting a fantasy football league this year. Looking for about 8-10 people. Let me know if you're interested and I'll send out another email with the details.\n\n- Kevin",
    Type: "Non-work-related",
    Block: 2, Trial: 13, CorrectAnswer: "n",
  },
  {
    Subject: "Your order from DoorDash is on its way",
    Sender: "noreply@doordash.com",
    Body: "Great news! Your order from The Sandwich Shop is now on its way and should arrive in approximately 15 minutes. Get ready to eat!\n\nThanks for using DoorDash.",
    Type: "Non-work-related",
    Block: 2, Trial: 14, CorrectAnswer: "n",
  },
  {
    Subject: "Action Required: Update your contact information",
    Sender: "hr-noreply@metacortex.com",
    Body: "Hi everyone,\n\nWe are updating our emergency contact list. Please take a moment to log in to the employee portal and verify that your contact information is up to date.\n\nThank you,\nHR",
    Type: "Work-related",
    Block: 2, Trial: 15, CorrectAnswer: "w",
  },
  {
    Subject: "Volunteers needed for user testing session",
    Sender: "ux-research@metacortex.com",
    Body: "Hi Team,\n\nThe UX team is looking for internal volunteers to participate in a 30-minute user testing session for our new mobile app. Your feedback will be invaluable. If you are interested, please sign up for a time slot here: [link].\n\nThanks,\nUX Research Team",
    Type: "Work-related",
    Block: 2, Trial: 16, CorrectAnswer: "w",
  },
  {
    Subject: "Your monthly bank statement is ready",
    Sender: "no-reply@chase.com",
    Body: "Dear Customer,\n\nYour monthly statement is now available to view online. Please log in to your account to see your latest statement and account activity.\n\nSincerely,\nChase Bank",
    Type: "Non-work-related",
    Block: 2, Trial: 17, CorrectAnswer: "n",
  },
  {
    Subject: "Building access update for this weekend",
    Sender: "facilities-noreply@metacortex.com",
    Body: "All Employees,\n\nPlease be advised that due to scheduled maintenance on the main entrance, building access this weekend will be restricted to the west-side entrance only. Your access cards have been updated accordingly. Normal access will resume on Monday.\n\nThank you,\nFacilities",
    Type: "Work-related",
    Block: 2, Trial: 18, CorrectAnswer: "w",
  },
  {
    Subject: "Checking in!",
    Sender: "mom@family.net",
    Body: "Hi sweetie,\n\nJust wanted to check in and see how you're doing. Are you remembering to eat your vegetables? Give me a call when you have a moment.\n\nLove,\nMom",
    Type: "Non-work-related",
    Block: 2, Trial: 19, CorrectAnswer: "n",
  },
  {
    Subject: "Please approve: Q3 Marketing Budget",
    Sender: "finance-dept@metacortex.com",
    Body: "Hi Managers,\n\nThe Q3 marketing budget proposal is now ready for your review and approval in the finance portal. Please provide your approval by EOD Friday so we can proceed with resource allocation.\n\nThanks,\nFinance",
    Type: "Work-related",
    Block: 2, Trial: 20, CorrectAnswer: "w",
  },

  // --- Block 3 ---
  {
    Subject: "Great news! Client loved the presentation",
    Sender: "client.services@metacortex.com",
    Body: "Hi there,\n\nI just got off the phone with the client. They were extremely pleased with our last presentation! They gave us the green light to proceed to the next phase. Great job, everyone! Let's keep up the excellent work.\n\nBest,\nClient Services",
    Type: "Work-related",
    Block: 3, Trial: 1, CorrectAnswer: "w",
  },
  {
    Subject: "Book recommendation?",
    Sender: "pat@gmail.com",
    Body: "Hey, do you have a recommendation for a good book to read? I just finished my last one and I'm looking for something new. I'm open to anything!\n\nThanks,\nPat",
    Type: "Non-work-related",
    Block: 3, Trial: 2, CorrectAnswer: "n",
  },
  {
    Subject: "Can we reschedule our 1:1?",
    Sender: "project-manager@metacortex.com",
    Body: "Hi,\n\nSomething urgent has come up and I need to reschedule our 1:1 meeting today. Are you free tomorrow afternoon at the same time? Let me know what works for you.\n\nSorry for the last-minute change,\nMichael",
    Type: "Work-related",
    Block: 3, Trial: 3, CorrectAnswer: "w",
  },
  {
    Subject: "Weekend BBQ at my place!",
    Sender: "party.planner.extraordinaire@yahoo.com",
    Body: "Hi!\n\nI'm hosting a BBQ at my place this Saturday, starting around 4 PM. It's going to be very casual, just some food, music, and good company. Let me know if you can make it so I have a headcount!\n\n- P",
    Type: "Non-work-related",
    Block: 3, Trial: 4, CorrectAnswer: "n",
  },
  {
    Subject: "Office Maintenance Notification",
    Sender: "facilities-noreply@metacortex.com",
    Body: "Hello,\n\nPlease be aware that the restrooms on the 3rd floor will be closed for maintenance tomorrow from 9 AM to 12 PM. Please use the facilities on the 2nd or 4th floor during this time. We apologize for any inconvenience.\n\nThank you,\nFacilities Management",
    Type: "Work-related",
    Block: 3, Trial: 5, CorrectAnswer: "w",
  },
  {
    Subject: "Your weekly screen time report",
    Sender: "noreply@apple.com",
    Body: "Hi,\n\nYour screen time was down 15% last week for an average of 3 hours, 12 minutes per day. Your most used apps were Messages, Mail, and Instagram. You can view your full report on your device.\n\n- Apple",
    Type: "Non-work-related",
    Block: 3, Trial: 6, CorrectAnswer: "n",
  },
  {
    Subject: "Where should we have the team offsite?",
    Sender: "project-manager@metacortex.com",
    Body: "Hi Team,\n\nIt's time to start planning our annual team offsite! We have budget for a two-day event. Please reply to this email with your suggestions for activities or locations. Let's make it a memorable one!\n\nBest,\nAngela",
    Type: "Work-related",
    Block: 3, Trial: 7, CorrectAnswer: "w",
  },
  {
    Subject: "Happy Hour this Friday?",
    Sender: "emily.jones@outlook.com",
    Body: "Hey!\n\nA few of us are planning to go for happy hour this Friday after work to unwind. Would you be interested in joining? We're thinking of that place near the office with the rooftop patio.\n\n- Emily",
    Type: "Non-work-related",
    Block: 3, Trial: 8, CorrectAnswer: "n",
  },
  {
    Subject: "New IT Ticketing System",
    Sender: "it-support@metacortex.com",
    Body: "Hello Team,\n\nNext Monday, we will be launching a new IT ticketing system to better track and resolve your support requests. Training sessions will be held next week, and a guide will be available on the intranet. We appreciate your cooperation during this transition.\n\nThank you,\nIT Support",
    Type: "Work-related",
    Block: 3, Trial: 9, CorrectAnswer: "w",
  },
  {
    Subject: "Your Netflix bill is due soon",
    Sender: "info@mailer.netflix.com",
    Body: "Hi,\n\nThis is a reminder that your Netflix subscription will automatically renew on October 28th, 2023. No action is required to keep enjoying your favorite shows and movies.\n\n- The Netflix Team",
    Type: "Non-work-related",
    Block: 3, Trial: 10, CorrectAnswer: "n",
  },
  {
    Subject: "Out of Office: [My Name]",
    Sender: "employee@metacortex.com",
    Body: "Hello,\n\nI will be out of the office starting Thursday and will return on Monday. I will have limited access to email. For urgent matters, please contact [Colleague's Name].\n\nThank you.",
    Type: "Work-related",
    Block: 3, Trial: 11, CorrectAnswer: "w",
  },
  {
    Subject: "Funny article I thought you'd like",
    Sender: "sam@gmail.com",
    Body: "Hey,\n\nI came across this article today and it made me laugh out loud. Thought you might get a kick out of it too. Here's the link: [link].\n\nLet me know what you think!\n- Sam",
    Type: "Non-work-related",
    Block: 3, Trial: 12, CorrectAnswer: "n",
  },
  {
    Subject: "Donuts in the kitchen!",
    Sender: "social-committee@metacortex.com",
    Body: "Happy Friday!\n\nThere are donuts in the kitchen on the 2nd floor to celebrate the end of the week. Help yourself!\n\n- The Social Committee",
    Type: "Work-related",
    Block: 3, Trial: 13, CorrectAnswer: "w",
  },
  {
    Subject: "Q4 Planning Meeting - Canceled",
    Sender: "project-manager@metacortex.com",
    Body: "Hi Team,\n\nI am canceling our Q4 planning meeting that was scheduled for this afternoon. I will send out a new invitation shortly with a revised agenda. Sorry for any inconvenience.\n\nThanks,\n[Name]",
    Type: "Work-related",
    Block: 3, Trial: 14, CorrectAnswer: "w",
  },
  {
    Subject: "Your Uber receipt",
    Sender: "uber.receipts@uber.com",
    Body: "Thanks for riding with Uber. We've sent you a receipt for your recent trip. You can view the full details here: [link].\n\nWe hope to see you again soon!",
    Type: "Non-work-related",
    Block: 3, Trial: 15, CorrectAnswer: "n",
  },
  {
    Subject: "New hire announcement: John Smith",
    Sender: "hr-noreply@metacortex.com",
    Body: "Team,\n\nPlease join me in welcoming John Smith to the engineering team! John starts on Monday and will be working on the new platform initiative. Please make him feel welcome!\n\nBest,\nHR",
    Type: "Work-related",
    Block: 3, Trial: 16, CorrectAnswer: "w",
  },
  {
    Subject: "Your library books are due soon",
    Sender: "noreply@nypl.org",
    Body: "Dear Patron,\n\nThis is a friendly reminder that the following items are due for return in 3 days: 'The Midnight Library'. You can renew them online if needed.\n\nThank you,\nNew York Public Library",
    Type: "Non-work-related",
    Block: 3, Trial: 17, CorrectAnswer: "n",
  },
  {
    Subject: "Agenda for tomorrow's all-hands meeting",
    Sender: "ceo-office@metacortex.com",
    Body: "Hi Everyone,\n\nAttached is the agenda for our quarterly all-hands meeting tomorrow. We will be discussing our Q3 results and our goals for Q4. There will be a Q&A session at the end, so please come with your questions.\n\nSee you there,\nCEO Office",
    Type: "Work-related",
    Block: 3, Trial: 18, CorrectAnswer: "w",
  },
  {
    Subject: "Update to our Terms of Service",
    Sender: "no-reply@dropbox.com",
    Body: "Hi,\n\nWe've updated our Terms of Service. These changes will take effect on November 1st. You can review the new terms by logging into your account. No action is needed from your side.\n\nThanks,\nThe Dropbox Team",
    Type: "Non-work-related",
    Block: 3, Trial: 19, CorrectAnswer: "n",
  },
  {
    Subject: "Cake in the breakroom!",
    Sender: "social-committee@metacortex.com",
    Body: "Hi everyone,\n\nTo celebrate Maria's work anniversary, there's cake in the main breakroom on the 4th floor. Come grab a slice!\n\nCheers,\nSocial Committee",
    Type: "Work-related",
    Block: 3, Trial: 20, CorrectAnswer: "w",
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

  const indices = Array.from(Array(blockEvents.length).keys());
  shuffle(indices);
  for (let i = 0; i < numInterruptions && i < indices.length; i++) {
    blockEvents[indices[i]].Interruption = Math.random() < 0.5;
  }

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

for (const config of primaryTaskBlockConfigs) {
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

  const blockTrials = currentBlockPrimaryTasks.map((cs_event, trialInBlockIndex) => {
    const popupData = POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)];
    const popupHtml = cs_event.Interruption
      ? `<div class="jspsych-popup-message" style="text-align:left;">
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
              padding: 0 0 20px 0;
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
              <div id="primary-task-countdown-timer" style="
                text-align: right; 
                font-size: 14px; 
                color: #5f6368; 
                padding: 8px 0; 
                font-weight: 500;
                background-color: #ffffff;
                border-radius: 4px;
                padding: 8px 12px;
                border: 1px solid #e8eaed;
              "></div>
              ${renderCurrentEventDisplay(cs_event)}
              <div id="messaging-footer-primary" style="
                padding: 12px 16px; 
                border-top: 1px solid #e8eaed; 
                font-size: 14px;
                color: #5f6368; 
                background-color: #ffffff; 
                border-radius: 8px; 
                margin-top: auto;
                border: 1px solid #e8eaed;
                display: flex; /* Use flexbox for layout */
                justify-content: space-around; /* Distribute items evenly */
                align-items: center; /* Center items vertically */
              ">
                <p style="margin: 0;">Pending: <span id="pending-cs-count" style="font-weight: 500;">0</span></p>
                <p style="margin: 0;">Handled: <span id="handled-cs-count" style="font-weight: 500;">0</span></p>
                <p style="margin: 0; color: #d93025;">Missed: <span id="missed-cs-count" style="font-weight: 500;">0</span></p>
              </div>
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
        customer_event_id: cs_event.id,
        customer_event_text: cs_event.text,
        customer_event_contact: cs_event.contactName,
        is_interruption: cs_event.Interruption,
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
              primary_task_cs_event_id: trialData?.customer_event_id || 'unknown_event',
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
        const pendingCount = customerServiceEvents.filter(event => event.status === 'pending').length;
        const handledCount = customerServiceEvents.filter(event => event.status === 'handled').length;
        const missedCount = customerServiceEvents.filter(event => event.status === 'missed').length;

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
      flex-wrap: wrap;
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
    @media (max-width: 900px) {
      #primary-task-panel #jspsych-html-button-response-btngroup {
        flex-direction: column;
        gap: 12px;
      }
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
  `;
  document.head.appendChild(style);
}

timeline.push(
  ...(trialBlocks.reduce((acc, block, index) => {
    acc.push(...block); // Spread the trials of the block
    if (index < trialBlocks.length - 1) { // Add interBlockSurvey between blocks
      acc.push(interBlockSurvey);
    }
    return acc;
  }, []))
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
      handledCustomerServiceEvents: JSON.stringify(handledEventLog),
      emailClassificationResponses: JSON.stringify(emailClassificationResponses),
      stimulusReferences: JSON.stringify({
        emailStimuli: emailStimulusReference,
        customerServiceEvents: customerServiceEventReference
      }),
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
