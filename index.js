/**
 * `APP_URL` stores the endpoint of Google App Script
 */
const APP_URL = "https://script.google.com/macros/s/AKfycbwBdzSzb9o6OBd2MLcWr2URp_3D2EKcsI7o6WwLpn4I-gVNQyhYxNbhZGVDShPY29L-6Q/exec";

/**
 * `completionCode` stores the completion code for the experiment
 */
const completionCode = "C1AYQ2X4";

/**
 * `timeline` stores the steps of the experiment
 */
const timeline = [];


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

allEmailStimuli.forEach((email, index) => {
  email.originalIndex = index;
});

/**
 * Experiment Settings
 */
const params = {
  trialsPerBlock: 30,
  popupFreq: { low: 2, med: 5, high: 8 },
  trialDuration: 20_000,
  popupDuration: 20_000,
  EMAIL_TARGET_COUNT: allEmailStimuli.length,
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
    prompt: "While watching TV or YouTube, how often do you also also listen to music at the same time?",
    name: "MMM_TV_Music",
    labels: mmm_sScale,
    required: true,
  },
  {
    prompt: "While watching TV or YouTube, how often do you also send messages via phone or computer (e.g., text messages, WhatsApp, instant messaging)?",
    name: "MMM_TV_Msg",
    labels: mmm_sScale,
    required: true,
  },
  {
    prompt: "While watching TV or YouTube, how often do you also use social networking sites (e.g., Facebook, Instagram)?",
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
    prompt: "While using social networking sites, how often do you also watch TV or YouTube?",
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
    prompt: "While sending messages via phone or computer, how often do you also watch TV or YouTube?",
    name: "MMM_Msg_TV",
    labels: mmm_sScale,
    required: true,
  },
];
const mmm_sSurvey_TV = {
  type: jsPsychSurveyLikert,
  questions: mmm_sQuestions_TV,
  preamble:
    "<h3>Media Usage Habits Questionnaire</h3><p>The following questions aim to understand how frequently you use television or YouTube simultaneously with other types of media.</p>",
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
    <h2>Instruction 1 / 4: Primary Task (Customer Service)</h2>
    <p>
    You will see a customer message panel on the right side of the screen.<br/>
    We will set a response time limit of ${params.trialDuration / 1_000} seconds for each message, which will be displayed on the screen.
    </p>
    <img src="static/Exp_Instruction_rhs.png" alt="Task One" style="width: 55dvw; height: auto;">
    <p>
    Please quickly and accurately select the correct response option below based on the message content:<br/>
    ─ If it's an order or process-related question, please click "Please provide your order number."<br/>
    ─ If it's a technical issue, please click "The issue has been forwarded to the technical department."
    </p>`,

    `
    <h2>Instruction 2 / 4: Secondary Task (Email Classification)</h2>
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
    During the experiment, message prompts from Slack may pop up on the screen as a modal window.
    </p>
    <img src="static/Exp_Instruction_popup.png" alt="Task Two" style="width: 55dvw; height: auto;">
    <p>
    There is a dismiss button in the upper right corner of the prompt; clicking it will make it disappear. <br/>
    It does not disappear automatically throughout a single trial.<br/>
    </p>`,

    `
    <h2>Instruction 4 / 4: Task Completion and Reminder</h2>
    <p>
    Please do your best to complete both tasks.<br/>
    <span style="color: red; font-weight: bold;">Once you are ready, please click "Next" to start the comprehension check.</span><br/>
    <span style="color: #d32f2f; font-weight: bold; font-size: 1.1em;">⚠️ WARNING: Low accuracy rates will result in your experiment being marked as invalid and rejected. Please answer carefully.</span><br/>
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
      "The issue has been forwarded to the technical department.",
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
    correct: 0
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
  "The issue has been forwarded to the technical department.",
];

function renderCurrentEventDisplay(event) {
  if (!event) {
    return "<p style='padding: 10px; text-align: center;'>No pending customer messages.</p>";
  }
  return `
    <div class="event-content-wrapper" data-event-id="${event.id}">
      <h4 style="margin-top: 100px; margin-bottom: 8px; color: #343a40; font-size: 0.95em; font-weight: 600;">From: ${event.contactName}</h4>
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
  // --- Reminders & Standard Tasks ---
  { app: "Slack", sender: "HR", message: "Please remember to fill in this month's attendance record." },
  { app: "Slack", sender: "Manager", message: "There's a meeting at 3 PM today, please be on time." },
  { app: "Slack", sender: "Team Lead", message: "Remember to submit your weekly report by end of day." },
  { app: "Slack", sender: "HR Dept", message: "Reminder: Annual performance review forms are due next week." },
  { app: "Slack", sender: "Product Team", message: "Feedback on the new feature requested by Friday." },

  // --- Status Updates & Announcements ---
  { app: "Slack", sender: "Designer", message: "The new version of the design draft has been uploaded." },
  { app: "Slack", sender: "Marketing Team", message: "New marketing campaign strategy review meeting scheduled for Monday." },
  { app: "Slack", sender: "Engineering", message: "Bug report #123 has been resolved." },
  { app: "Slack", sender: "Sales", message: "Q3 sales target updated. Please review." },
  { app: "Slack", sender: "IT Support", message: "System maintenance scheduled for tonight at 10 PM." },
  { app: "Slack", sender: "Company Announce", message: "Important: New WFH policy update." }
];

const initialChatData = [
  // --- Block 1 (Items 1-30) ---
  {
    sender: "Alice",
    text: "I'd like to check on my order's processing status.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Bob",
    text: "The website's password reset function isn't working at all.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Charles",
    text: "The app crashed right after I paid, can you please confirm if my order went through?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "David",
    text: "I need to know the shipping status for order #C-98765, but the tracking page won't load.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Eve",
    text: "I need to apply for after-sales service for a recent purchase.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Frank",
    text: "Your API is consistently returning a 500 server error.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Grace",
    text: "The tracking page is showing a 'network error'. Can you please tell me the current location of my package?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Henry",
    text: "I see my correct order history, but I also received a notification of unusual account activity. Should I be concerned?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Ivy",
    text: "How do I process a return for an item I bought?",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Jack",
    text: "I can't add any more items to my shopping cart.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Kelly",
    text: "Your app's self-service diagnostics tool says my device is fine, but it's clearly broken. I need to start a repair request.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Leo",
    text: "I can't log in to my account to check my refund status. Can you fix the login issue?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Mandy",
    text: "I need to change my shipping address for an upcoming delivery.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Nina",
    text: "The system becomes unresponsive every time I try to process my return request. Is the return system down?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Oscar",
    text: "I was charged twice for my last order. Please help me process a refund for the extra charge.",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Paul",
    text: "The link in the account verification email you sent is not clickable.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Queenie",
    text: "I need a copy of my invoice for tax purposes.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Ryan",
    text: "The website keeps saying 'password incorrect', but I'm certain I'm typing it correctly. Can you reset it for me?",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Sandy",
    text: "Your website timed out while I was trying to change my delivery address. Can you confirm if the change was saved?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Tom",
    text: "I need to check my order history, but the page shows 'Service Temporarily Unavailable'. Is the server down?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Una",
    text: "When is my order expected to ship?",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Vicky",
    text: "The images on your website are not displaying correctly.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Will",
    text: "I'm trying to redeem my member points, but the page keeps crashing. Can you just manually apply the points to my account?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Xavier",
    text: "I was about to confirm a very important order, but the system keeps logging me out every few minutes. Can you check if there's an issue with my account's session stability?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Yvonne",
    text: "I need to check the warranty period for a recent purchase.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Zack",
    text: "The app won't launch after I updated it this morning.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Amy",
    text: "I got a 'database error' when I tried to cancel my subscription. Can you ensure it's cancelled so I'm not charged again?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Ben",
    text: "The form doesn't respond after I submit it. I'm trying to report that my last order, #D-11223, was missing an item.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Cathy",
    text: "I'd like to check my member-exclusive offers.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Derek",
    text: "I'm not receiving the password reset email needed to access my account and view my past invoices.",
    answerIndex: 1,
    difficulty: "complex",
  },

  // --- Block 2 (Items 31-60) ---
  {
    sender: "Ella",
    text: "Can I modify the contents of my existing order?",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Fiona",
    text: "Your system is showing a persistent 'Error 503: Service Unavailable' message.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "George",
    text: "After your system update, I can no longer find my transaction records. Can you help me retrieve my last one?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Helen",
    text: "I need to check my invoice for order #G-22334, but the app crashes every time I open that section. Can you report this bug?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Ian",
    text: "I have not received my refund yet for a returned item.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Judy",
    text: "I can't upload the photos required for my warranty claim. The upload button is not working.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Kevin",
    text: "The checkout page showed a 'payment failed' error, but my bank says the charge went through. Can you check my order status?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Linda",
    text: "I was trying to export my purchase history for my accountant, but the data export function failed.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Maggie",
    text: "I need to apply for an exchange. What's the procedure?",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Nick",
    text: "I think there's a security issue; my order history looks wrong but I can't change my password either.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Olivia",
    text: "I'm trying to track my return, but the status page is showing a 404 error. Can you just tell me the status?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Peter",
    text: "Some of my saved addresses disappeared after your system maintenance. Is this a known issue?",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Queena",
    text: "The product I received is defective, what should I do?",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Rita",
    text: "Your payment gateway seems to be down, I can't finalize my purchase.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Sam",
    text: "The checkout page crashed, but it looks like my promotional coupon was used. Can you check if the coupon is still valid?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Tina",
    text: "My entire order history is missing after your system update. Please investigate this data loss.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Ursula",
    text: "Can you tell me my current member points balance?",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Victor",
    text: "My account was locked after I tried to pay. I have several items in my cart I need to buy.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Wendy",
    text: "My browser is giving a security certificate warning for your site, but I need to check my invoice. Is it safe?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Xena",
    text: "The push notification I received about my delivery had the wrong address. Can you check the system's notification logic?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Yale",
    text: "When will my invoice for last week's purchase be sent out?",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Zoe",
    text: "I am unable to download any attachment files from my account page.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Allen",
    text: "My member discount isn't being applied at checkout, it keeps showing the full price. Can you fix my cart?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Betty",
    text: "The system logged me out for inactivity, but I was in the middle of confirming my order details.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Carl",
    text: "I need to request a paper invoice for my records.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Doris",
    text: "The app won't open since the update. I need to access my saved shopping list.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Ethan",
    text: "I'm getting an 'insufficient permissions' error when I try to access my own billing history. Can you fix my account permissions?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Fiona",
    text: "I can't save changes to my personal info. I need to update my address for an upcoming delivery.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Grace",
    text: "Please tell me the payment status of my most recent order.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Henry",
    text: "I am getting a 'connection timed out' message when trying to access my account details. Is the server overloaded?",
    answerIndex: 1,
    difficulty: "simple",
  },

  // --- Block 3 (Items 61-90) ---
  {
    sender: "Ian",
    text: "The quantity of items I received is incorrect for my last order.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Judy",
    text: "I'm locked out of my account and can't log in.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Kevin",
    text: "Your website is very slow. It took my payment but the order confirmation page is still loading. Can you check if the order was created?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Linda",
    text: "The checkout page crashes. I have an important order #E-54321 I need to complete.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Maggie",
    text: "I'd like to inquire about the details of a specific bill.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Nick",
    text: "The search function isn't working, so I can't find the product I want to order. Is this a known bug?",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Olivia",
    text: "Has my order from last Tuesday been shipped yet?",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Peter",
    text: "Your site isn't compatible with my browser, I can't even see my shopping cart to make a purchase.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Queenie",
    text: "I have a question about my last invoice amount.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Rita",
    text: "I can't save my new address in my profile. I need this fixed before my next scheduled delivery.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Sam",
    text: "I've paid, but the system still shows the order as 'awaiting payment'.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Tina",
    text: "The system says my cloud storage for invoices is full, but I only have a few saved. Can you check for a quota bug?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Ursula",
    text: "The app crashed and then showed a 'sync failed' message. Can you please verify my order details are still correct?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Victor",
    text: "I need urgent tech support. My subscription-based service access has been interrupted.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Wendy",
    text: "I need to change the official title on an invoice I already received.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Xena",
    text: "The user interface buttons are frozen. I was trying to confirm my return request and now I'm stuck.",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Yale",
    text: "The page to check my repair status is giving a '500 server error'. Can you give me an update on the repair?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Zoe",
    text: "I'm unable to enable two-factor authentication on my account.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Aaron",
    text: "The software license I purchased hasn't been activated yet.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Brianna",
    text: "The website just says 'Please try again later' when I attempt to log in.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Chris",
    text: "My credit card was charged, but the app crashed before confirming my subscription renewal. Is my subscription active for next year?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Diana",
    text: "The SMS code for my payment verification isn't working. Is there an issue with your verification service?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Edward",
    text: "Please check the discount amount on my last order.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Felicia",
    text: "The website shows 'Insufficient permissions' when I click the 'My Orders' link.",
    answerIndex: 1,
    difficulty: "simple",
  },
  {
    sender: "Gary",
    text: "I'm getting a '403 Forbidden' error when I try to download my invoice. Can you please help me get a copy?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Hannah",
    text: "My order #F-67890 seems to have vanished from my history after the app crashed. Can you investigate?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Ivan",
    text: "I need to check my order's invoice number.",
    answerIndex: 0,
    difficulty: "simple",
  },
  {
    sender: "Jenna",
    text: "The system reports a 'Data format error' when I try to update my payment information. What should I do?",
    answerIndex: 1,
    difficulty: "complex",
  },
  {
    sender: "Karl",
    text: "A system error occurred during checkout, but my card was charged. I don't have an order number, can you find my purchase?",
    answerIndex: 0,
    difficulty: "complex",
  },
  {
    sender: "Laura",
    text: "I'm not receiving any notification emails from your system about my orders being shipped.",
    answerIndex: 1,
    difficulty: "simple",
  },
];

const customerServiceEvents = [];
let eventIdCounter = 0;
for (const message of initialChatData) {
  customerServiceEvents.push({
    id: `evt${++eventIdCounter}`,
    contactName: message.sender,
    text: message.text,
    status: 'pending', // 'pending', 'handled'
    timestamp: Date.now() + eventIdCounter, // Add sequential value to maintain order
    chosenResponse: null,
    correctAnswerIndex: message.answerIndex,
  });
}
// customerServiceEvents are now in sequential order from initialChatData, so no sort is needed.

const handledEventLog = []; // Log for primary task (customer service)
const emailClassificationResponses = []; // Log for secondary task (email classification)
let globalEmailClassificationCount = 0; // Global counter for email classifications across all trials

// Email countdown settings
let emailCountdown = params.EMAIL_TARGET_COUNT; // Countdown from target to 0

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
    globalEmailIndex = 0; // Loop back
  }
  return allEmailStimuli[globalEmailIndex];
}

// New function to advance to next email (only called after user clicks classification button)
function advanceToNextEmail() {
  globalEmailIndex++;
  if (globalEmailIndex >= allEmailStimuli.length) {
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
// shuffle(baseCsEventsForBlocks); // No longer needed, we want sequential events

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

  // With 90 events for 3x30 trial blocks, we no longer need the recycling logic.
  blockSpecificCsEvents = baseCsEventsForBlocks.slice(csEventCursor, csEventCursor + numEventsForBlock);
  csEventCursor += numEventsForBlock;

  const currentBlockPrimaryTasks = createPrimaryTaskSet(blockSpecificCsEvents, params.trialsPerBlock, config.interruptCount, config.label);

  // 新增：標記 blockIndex/blockLabel
  currentBlockPrimaryTasks.forEach(event => {
    event.blockIndex = blockIndex;
    event.blockLabel = config.label;
  });

  const blockTrials = currentBlockPrimaryTasks.map((cs_event, trialInBlockIndex) => {
    const popupData = POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)];
    const popupHtml = cs_event.Interruption
      ? `<div class="jspsych-popup-message">
           <div class="popup-header">
             <span class="popup-app-name">${popupData.app}</span>
             <button class="jspsych-popup-close">&times;</button>
           </div>
           <div class="popup-content">
             <div class="popup-sender">${popupData.sender}</div>
             <div class="popup-message">${popupData.message}</div>
           </div>
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
                  Emails Remaining: ${emailCountdown}
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
              <div style="padding: 16px; background-color: #ffffff; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);height:100%; display: flex; flex-direction: column; justify-content: space-between;">
              ${renderCurrentEventDisplay(cs_event)}
                <div id="primary-task-buttons" style="margin-top: 18px; display: flex; flex-direction: column; align-items: flex-end; gap: 10px;"></div>
              </div>

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
              return originalEmail;
            } else {
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
            countdownTimer.innerHTML = `Emails Remaining: ${emailCountdown}`;
          }
        };

        // Initialize email counter display with current global count
        updateEmailCounter();

        // Function to load next email - completely independent of primary task
        const loadNextEmail = (withDelay = true) => {
          const nextEmail = getNextEmailForSecondaryTask();

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
            } else {
              console.warn('Could not find subject element');
            }

            // Update email body
            if (emailBody) {
              emailBody.innerHTML = nextEmail.Body.replace(/\n/g, "<br>");
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
          button.addEventListener('click', function handler(e) {
            e.preventDefault(); // Prevent default button behavior
            e.stopPropagation(); // Stop event bubbling to prevent jsPsych interference

            const classificationChoice = e.target.dataset.classification;
            const rt = Date.now() - emailClassificationStartTime;

            // Get current email from DOM if not set
            if (!emailStimulus) {
              emailStimulus = getCurrentEmailFromDOM();
            }

            // Decrement countdown (instead of incrementing)
            emailCountdown = Math.max(0, emailCountdown - 1);
            globalEmailClassificationCount++; // Keep this for data logging

            // Update counter display
            updateEmailCounter();

            // Add visual feedback
            e.target.style.backgroundColor = '#34a853'; // Gmail green for success
            e.target.style.color = 'white';
            e.target.textContent = classificationChoice === 'w' ? '✓ Work-related' : '✓ Non-work-related';

            emailClassificationResponses.push({
              email_stimulus_index: emailStimulus?.originalIndex ?? -1, // Use the stable, original index
              block_index: blockIndex,
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
                block_index: data.block_index,
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
      }
    };
  });
  trialBlocks.push(blockTrials);
}

function addCustomStyles() {
  const style = document.createElement('style');
  style.textContent = `
    *{
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
    }
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
    
    /* Windows-style Notification */
    .jspsych-popup-message {
      position: fixed;
      height: 200px;
      width: 400px;
      bottom: 25px;
      right: 25px;
      background: #1e1e1e; /* A very dark grey, almost black */
      color: #ffffff;
      border-radius: 8px; /* Windows 11 uses rounded corners */
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      z-index: 10000;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      
      /* Animation properties - keeping original logic as requested */
      transition: bottom 0.3s ease-out, opacity 0.3s ease-out;
      bottom: -120px; /* Start a bit lower to ensure it's off-screen */
      opacity: 0;
    }

    .jspsych-popup-message.show {
      bottom: 25px;
      opacity: 1;
    }

    .jspsych-popup-message .popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .jspsych-popup-message .popup-app-name {
      font-size: 13px;
      font-weight: 600;
      color: #f0f0f0;
    }

    .jspsych-popup-message .jspsych-popup-close {
      background: transparent;
      border: none;
      color: #a0a0a0;
      font-size: 18px;
      font-weight: normal;
      cursor: pointer;
      padding: 2px 6px;
      line-height: 1;
      border-radius: 4px;
      transition: background-color 0.2s, color 0.2s;
    }

    .jspsych-popup-message .jspsych-popup-close:hover {
      background-color: rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }

    .jspsych-popup-message .popup-content {
      padding: 12px;
      text-align: left;
    }

    .jspsych-popup-message .popup-sender {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .jspsych-popup-message .popup-message {
      font-size: 14px;
      line-height: 1.4;
      color: #e0e0e0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
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
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      gap: 18px;
      margin: 28px 0 0 0;
      flex-wrap: nowrap;
    }
    #primary-task-panel .jspsych-btn.response-btn-primary {
      flex: 1 1 120px;
      min-width: 120px;
      max-width: 340px;
      font-size: 1em;
      padding: 10px 10px;
      border-radius: 10px;
      color: gray;
      border: 1px solid #cfcccc;
      font-weight: 500;
      transition: background 0.18s, box-shadow 0.18s;
      box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
      word-break: break-word;
      white-space: normal;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #primary-task-panel .jspsych-btn.response-btn-primary:hover {
      background: lightgray;
    }
    #primary-task-panel .jspsych-btn.response-btn-primary:active {
      background: gray;
    }

    .jspsych-display-element {
      max-width: 1440px;
      width: 96vw;
      max-height: 100vh;
      min-height: 92vh;
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
      margin-bottom: 30px !important;
    }
    #primary-task-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
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
      <img src="static/example.png" alt="Experiment Interface Example" style="width: 50dvw; height: auto; margin: 20px 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <p>Click "Next" when you are ready.</p>
    </div>
    `
  ],
  show_clickable_nav: true,
  button_label_next: "Next",
  data: { task: "block_start_screen" }
};

// Block progress display page
const blockProgressScreen = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    // Get current block data from the last trial
    const lastTrial = jsPsych.data.get().last(1).values()[0];
    const currentBlockIndex = lastTrial.block_index;

    // Calculate customer service progress for this block
    // Use block_index to accurately count events for this specific block
    const blockCustomerServiceEvents = handledEventLog.filter(event =>
      event.block_index === currentBlockIndex
    );

    const completedCustomerService = blockCustomerServiceEvents.length;
    const totalCustomerServiceTime = blockCustomerServiceEvents.reduce((total, event) => total + (event.rt || 0), 0);
    const avgCustomerServiceTime = completedCustomerService > 0 ? Math.round(totalCustomerServiceTime / completedCustomerService) : 0;

    // Calculate email classification progress for this block
    // Filter by the accurate block_index
    const blockEmailClassifications = emailClassificationResponses.filter(response =>
      response.block_index === currentBlockIndex
    );

    const completedEmails = blockEmailClassifications.length;
    const correctEmails = blockEmailClassifications.filter(response => response.correct === 1).length;
    const emailAccuracy = completedEmails > 0 ? Math.round((correctEmails / completedEmails) * 100) : 0;

    return `
      <div style="
        max-width: 800px;
        margin: 50px auto;
        padding: 40px;
        background: #f5f6fa;
        border-radius: 20px;
        color: #333;
        font-family: sans-serif;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border: 1px solid #e8eaed;
      ">
        <h1 style="margin: 0 0 30px 0; font-size: 32px; font-weight: 500; color: #202124;">Block ${currentBlockIndex + 1} Complete!</h1>
        
        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin: 40px 0;
        ">
          <!-- Email Classification Progress -->
          <div style="
            background: #ffffff;
            padding: 30px;
            border-radius: 15px;
            border: 1px solid #e8eaed;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          ">
            <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #1976d2;">Email Classification Task</h2>
            <div style="font-size: 48px; font-weight: bold; margin: 20px 0; color: #60a5fa;">
              ${completedEmails}
            </div>
            <p style="margin: 10px 0; font-size: 18px; color: #5f6368;">Emails Classified</p>
            <div style="font-size: 36px; font-weight: bold; margin: 20px 0; color: #fbbf24;">
              ${emailAccuracy}%
            </div>
            <p style="margin: 10px 0; font-size: 16px; color: #5f6368;">Accuracy Rate</p>
            <p style="margin: 10px 0; font-size: 14px; color: #80868b;">
              ${correctEmails} correct out of ${completedEmails} total
            </p>
          </div>

          <!-- Customer Service Progress -->
          <div style="
            background: #ffffff;
            padding: 30px;
            border-radius: 15px;
            border: 1px solid #e8eaed;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          ">
            <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #1976d2;">Customer Service Task</h2>
            <div style="font-size: 48px; font-weight: bold; margin: 20px 0; color: #4ade80;">
              ${completedCustomerService}/${params.trialsPerBlock}
            </div>
            <p style="margin: 10px 0; font-size: 18px; color: #5f6368;">Messages Handled</p>
            <div style="
              background: #f1f3f4;
              height: 8px;
              border-radius: 4px;
              margin: 20px 0;
              overflow: hidden;
            ">
              <div style="
                background: #4ade80;
                height: 100%;
                width: ${(completedCustomerService / params.trialsPerBlock) * 100}%;
                transition: width 0.5s ease;
              "></div>
            </div>
            <p style="margin: 10px 0; font-size: 16px; color: #5f6368;">
              Average Response Time: <strong style="color: #202124;">${avgCustomerServiceTime}ms</strong>
            </p>
          </div>
        </div>
        
        <div style="
          background: #ffffff;
          padding: 20px;
          border-radius: 10px;
          margin-top: 30px;
          border: 1px solid #e8eaed;
        ">
          <p style="margin: 0; font-size: 18px; color: #5f6368;">
            Great job! You've completed Block ${currentBlockIndex + 1} of ${trialBlocks.length}.
          </p>
        </div>
      </div>
    `;
  },
  choices: ["Continue"],
  button_html: [
    '<button class="jspsych-btn response-btn-primary" style="font-size: 0.9em; padding: 10px 12px; margin: 2px !important;">%choice%</button>',
  ],
  data: { task: "block_progress_screen" }
};

timeline.push(
  ...(trialBlocks.reduce((acc, block, index) => {
    acc.push(blockStartScreen); // Add start screen before the block
    acc.push(...block); // Spread the trials of the block
    acc.push(blockProgressScreen); // Add progress screen after the block
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

const qualitativeSurvey = {
  type: jsPsychSurveyText,
  preamble: "<h3>Qualitative Survey</h3><p>Please answer the following questions:</p>",
  questions: [
    { prompt: "What is your strategy of media multitasking?", name: "media_multitasking_strategy", rows: 3, required: true },
    { prompt: `Did you notice yourself starting to ignore the email classification task at any point?`, name: "email_classification_ignore", rows: 3, required: true },
    { prompt: `Can you describe what was going through your mind when you decided it wasn't worth the effort?`, name: "email_classification_ignore_reason", rows: 3, required: true },
    { prompt: `How did the pop-up messages influence your willingness to do the email task?`, name: "email_classification_pop_up_influence", rows: 3, required: true },
    { prompt: `How did the pop-up messages influence your willingness to do the customer service task?`, name: "customer_service_pop_up_influence", rows: 3, required: true },
    { prompt: `Was there a point where you felt the pop-ups were too disruptive to justify switching your attention?`, name: "pop_up_disruptive", rows: 3, required: true },
    { prompt: `What do you think about the experiment?`, name: "experiment_feedback", rows: 3, required: true },
  ],
  data: { task: "qualitative_survey" }
};

timeline.push(qualitativeSurvey);

const jsPsych = initJsPsych({
  show_progress_bar: true,
  on_finish: () => {
    // Show loading page immediately
    document.body.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
        color: white;
        z-index: 10000;
      ">
        <div style="
          text-align: center;
          max-width: 400px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        ">
          <div style="
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          "></div>
          <h2 style="margin: 0 0 10px 0; font-size: 24px;">Processing Your Data</h2>
          <p style="margin: 0; font-size: 16px; opacity: 0.9;">Please wait while we save your responses...</p>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;

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
      emailClassificationResponses: emailClassificationResponses,
    };

    fetch(APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        prolific_id: prolific_id,
        study_id: study_id,
        session_id: session_id,
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
/**
 * `prolificId` stores the prolific id for the experiment
 */
const prolific_id = jsPsych.data.getURLVariable("PROLIFIC_PID") || "unknown";

/**
 * `study_id` stores the study id for the experiment
 */
const study_id = jsPsych.data.getURLVariable('STUDY_ID');

/**
 * `session_id` stores the session id for the experiment
 */
const session_id = jsPsych.data.getURLVariable('SESSION_ID');

console.log(prolific_id, study_id, session_id);

jsPsych.run(timeline);
