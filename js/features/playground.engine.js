var PG_PUZZLES = [{"id":0,"name":"AI Support Router","col":"#00f0ff","win":"🎉 AI Support Router is live! Emails triaged by Claude Haiku, routed to the right model tier, queued for human review. Team saves 5–10 hrs/week.","nodes":[{"id":"trigger","lbl":"Webhook\nTrigger","ico":"🔔","x":5,"y":42,"c":"#00f0ff","out":1,"inp":0},{"id":"set","lbl":"Set Email\nPayload","ico":"📋","x":17.86,"y":42,"c":"#9b4dff","out":1,"inp":1},{"id":"gateway","lbl":"Gateway\nHaiku AI","ico":"🤖","x":30.71,"y":42,"c":"#00f0ff","out":1,"inp":1},{"id":"router","lbl":"Cost\nRouter","ico":"⚡","x":43.57,"y":42,"c":"#f7c843","out":1,"inp":1},{"id":"haiku","lbl":"Draft\nHaiku","ico":"💬","x":56.43,"y":20,"c":"#00ff88","out":1,"inp":1},{"id":"sonnet","lbl":"Draft\nSonnet","ico":"💬","x":56.43,"y":64,"c":"#00f0ff","out":1,"inp":1},{"id":"normalize","lbl":"Normalize\n+Metrics","ico":"📊","x":69.29,"y":42,"c":"#00ff88","out":1,"inp":1},{"id":"approval","lbl":"Human\nApproval","ico":"👤","x":82.14,"y":42,"c":"#f7c843","out":1,"inp":1},{"id":"send","lbl":"Send\nEmail","ico":"✉️","x":95,"y":42,"c":"#00ff88","out":0,"inp":1}],"correct":[["trigger","set"],["set","gateway"],["gateway","router"],["router","haiku"],["router","sonnet"],["haiku","normalize"],["sonnet","normalize"],["normalize","approval"],["approval","send"]],"hints":{"trigger→gateway":"❌ Missing \"Set Email Payload\"! The AI Gateway needs clean structured data, not a raw webhook.","gateway→haiku":"❌ Skipped the Cost Router! It decides cheap vs premium model. Skip = always paying premium price.","haiku→send":"❌ Never auto-send AI drafts! Normalize → Human Approval → Send. The gate makes this production-safe.","router→normalize":"❌ The router sends to Haiku OR Sonnet first to draft the response. Then normalize."},"steps":[{"t":"Webhook Trigger","d":"Inbound email arrives via HTTPS webhook.","i":"🔔"},{"t":"Set Email Payload","d":"Sanitize and structure the raw email into clean JSON.","i":"📋"},{"t":"Gateway Haiku","d":"Cheap Haiku scores sentiment, urgency, complexity. Fractions of a cent.","i":"🤖"},{"t":"Cost Router","d":"Switch: simple→Haiku (cheap), complex→Sonnet (premium). Saves ~67% cost.","i":"⚡"},{"t":"Draft Model","d":"Chosen model drafts the response. Haiku for routine, Sonnet for complex.","i":"💬"},{"t":"Normalize","d":"Standardize response shape and compute actual token cost from API usage.","i":"📊"},{"t":"Human Approval","d":"Draft waits for human to approve before touching the customer inbox.","i":"👤"},{"t":"Send Email","d":"Approved AI-assisted response sent. Customer helped fast. Zero bad sends.","i":"✉️"}]},{"id":1,"name":"Lead Enrichment Pipeline","col":"#00ff88","win":"🎉 Lead pipeline live! Forms validated, AI-scored, hot leads hit priority queue with Slack alert in under 3 seconds. Zero leads dropped.","nodes":[{"id":"webhook","lbl":"Webhook\nIngest","ico":"📥","x":5,"y":42,"c":"#00ff88","out":1,"inp":0},{"id":"validate","lbl":"Validate\n&Normalize","ico":"✅","x":23,"y":42,"c":"#00f0ff","out":1,"inp":1},{"id":"ai_score","lbl":"AI Lead\nScorer","ico":"🤖","x":41,"y":42,"c":"#9b4dff","out":1,"inp":1},{"id":"router","lbl":"Score≥70?\nIF Node","ico":"🔀","x":59,"y":42,"c":"#f7c843","out":1,"inp":1},{"id":"priority","lbl":"Priority\nQueue ⭐","ico":"⭐","x":77,"y":20,"c":"#00ff88","out":1,"inp":1},{"id":"hitl","lbl":"HITL\nStaging","ico":"👤","x":77,"y":64,"c":"#f7c843","out":1,"inp":1},{"id":"dead","lbl":"Dead Letter\nErrors","ico":"💀","x":59,"y":80,"c":"#ff2d55","out":0,"inp":1},{"id":"slack","lbl":"Slack\nAlert","ico":"💬","x":95,"y":20,"c":"#00ff88","out":0,"inp":1},{"id":"safe200","lbl":"Safe 200\nResponse","ico":"📤","x":95,"y":64,"c":"#9b4dff","out":0,"inp":1}],"correct":[["webhook","validate"],["validate","ai_score"],["ai_score","router"],["router","priority"],["router","hitl"],["validate","dead"],["priority","slack"],["hitl","safe200"]],"hints":{"webhook→ai_score":"❌ Validate first! Raw payloads have missing fields — AI will hallucinate on garbage input.","webhook→router":"❌ Skipped both validate AND score! Router needs a risk_score number from the AI Scorer.","ai_score→slack":"❌ Route first! The IF node checks score≥70. Don't Slack-alert every lead — only hot ones.","router→dead":"❌ Router handles score routing. Dead letter catches ERR_* validation errors — different path."},"steps":[{"t":"Webhook Ingest","d":"Raw form submission arrives at the webhook endpoint.","i":"📥"},{"t":"Validate &Norm","d":"ERR_* typed errors for missing fields. Error path → dead letter.","i":"✅"},{"t":"AI Lead Scorer","d":"LLM at temperature 0: Company, Size, Intent Signals → Lead_Score 1–100.","i":"🤖"},{"t":"IF Router","d":"Score≥70 → Priority Queue+Slack. Score<70 → HITL Staging.","i":"🔀"},{"t":"Priority Queue","d":"Hot lead → Airtable record + immediate Slack alert to sales.","i":"⭐"},{"t":"Dead Letter","d":"Errors captured here. Cron retries every 15min, max 3 attempts.","i":"💀"},{"t":"Slack Alert","d":"Sales notified in under 3 seconds with company, score, intent.","i":"💬"}]},{"id":2,"name":"Client Onboarding Engine","col":"#9b4dff","win":"🎉 Onboarding pipeline live! Stripe payment triggered a Notion client portal with AI roadmap and zero duplicate records. Onboarding: 2 minutes, not 45.","nodes":[{"id":"stripe","lbl":"Stripe\nWebhook","ico":"💳","x":5,"y":40,"c":"#9b4dff","out":1,"inp":0},{"id":"filter","lbl":"Filter\npaid+>0","ico":"🔍","x":17.86,"y":40,"c":"#f7c843","out":1,"inp":1},{"id":"normalize","lbl":"Normalize\n+ID","ico":"📋","x":30.71,"y":40,"c":"#00f0ff","out":1,"inp":1},{"id":"idem","lbl":"Notion\nDedup","ico":"🔒","x":43.57,"y":40,"c":"#ff2d55","out":1,"inp":1},{"id":"ai_road","lbl":"AI Roadmap\nFlvr","ico":"🤖","x":56.43,"y":40,"c":"#9b4dff","out":1,"inp":1},{"id":"nrec","lbl":"Create\nRecord","ico":"📄","x":69.29,"y":40,"c":"#9b4dff","out":1,"inp":1},{"id":"npor","lbl":"Provision\nPortal","ico":"🚀","x":82.14,"y":40,"c":"#9b4dff","out":1,"inp":1},{"id":"paths","lbl":"Tier\nPaths ×3","ico":"🔀","x":95,"y":40,"c":"#f7c843","out":0,"inp":1},{"id":"halt","lbl":"Halt\nDuplicate","ico":"🛑","x":43.57,"y":75,"c":"#ff2d55","out":0,"inp":1}],"correct":[["stripe","filter"],["filter","normalize"],["normalize","idem"],["idem","ai_road"],["idem","halt"],["ai_road","nrec"],["nrec","npor"],["npor","paths"]],"hints":{"stripe→normalize":"❌ Filter first! payment_status=paid AND amount>0. Test webhooks waste Zapier task quota.","stripe→ai_road":"❌ Normalize first! AI needs clean data: tier, company, deal value, contract text.","normalize→ai_road":"❌ Skipped idempotency check! Must look up provisioningId in Notion BEFORE any write.","idem→npor":"❌ Create the parent Notion record FIRST, then create the portal page as a child."},"steps":[{"t":"Stripe Webhook","d":"checkout.session.completed fires when a client pays.","i":"💳"},{"t":"Payment Filter","d":"Blocks test pings, $0 sessions, failed payments.","i":"🔍"},{"t":"Normalize +ID","d":"Sanitize payload, derive tier from deal value, mint provisioningId.","i":"📋"},{"t":"Notion Dedup","d":"Look up provisioningId BEFORE any write. Found→halt. New→continue.","i":"🔒"},{"t":"AI Roadmap","d":"OpenAI primary → Claude fallback → tier-default. Client always served.","i":"🤖"},{"t":"Create Record","d":"Parent client record created in Master CRM with provisioningId as unique key.","i":"📄"},{"t":"Provision Portal","d":"Child portal page created with AI-generated roadmap and milestones.","i":"🚀"},{"t":"Tier Paths","d":"Enterprise→CSM+Slack. Growth→group kickoff. Boutique→self-serve email.","i":"🔀"}]},{"id":3,"name":"SOAR Threat Dispatcher","col":"#ff2d55","win":"🛡️ SOAR pipeline live! Threats enriched, AI-scored, routed in real time. High-risk incidents fan out to Jira + PagerDuty + Slack + Twilio, SHA-256 deduplicated. Zero alert storms.","nodes":[{"id":"webhook","lbl":"Security\nWebhook","ico":"🔔","x":5,"y":42,"c":"#ff2d55","out":1,"inp":0},{"id":"enrich","lbl":"Enrich\nIP+RFC1918","ico":"🔍","x":20,"y":42,"c":"#00f0ff","out":1,"inp":1},{"id":"ai_thr","lbl":"AI Threat\nScorer","ico":"🤖","x":35,"y":42,"c":"#9b4dff","out":1,"inp":1},{"id":"router","lbl":"Conditional\nRouter","ico":"🔀","x":50,"y":42,"c":"#f7c843","out":1,"inp":1},{"id":"review","lbl":"Review\nconf<0.7","ico":"👤","x":65,"y":16,"c":"#f7c843","out":0,"inp":1},{"id":"standard","lbl":"Standard\nJira only","ico":"🎫","x":65,"y":42,"c":"#00f0ff","out":0,"inp":1},{"id":"dispatch","lbl":"Emergency\nDispatch","ico":"🚨","x":65,"y":70,"c":"#ff2d55","out":1,"inp":1},{"id":"dedup","lbl":"SHA-256\nDedup Key","ico":"🔑","x":80,"y":70,"c":"#f7c843","out":1,"inp":1},{"id":"fanout","lbl":"4-Channel\nFan-Out","ico":"📡","x":95,"y":70,"c":"#ff2d55","out":0,"inp":1}],"correct":[["webhook","enrich"],["enrich","ai_thr"],["ai_thr","router"],["router","review"],["router","standard"],["router","dispatch"],["dispatch","dedup"],["dedup","fanout"]],"hints":{"webhook→ai_thr":"❌ Enrich first! Resolve true IP from X-Forwarded-For, classify RFC1918, truncate to 4000 chars.","enrich→router":"❌ Skipped AI scoring! Router needs risk_score + confidence to make routing decisions.","ai_thr→dispatch":"❌ Route first! Conditional Router checks confidence<0.7 (review) and score≥7.5 (emergency).","dispatch→fanout":"❌ Missing SHA-256 dedup! Without it, same incident fires multiple alerts on every retry."},"steps":[{"t":"Security Webhook","d":"Raw network security log arrives. Treat as untrusted hostile input.","i":"🔔"},{"t":"Enrich IP+RFC1918","d":"Resolve true client IP from X-Forwarded-For. Classify internal/external. Truncate at 4000 chars.","i":"🔍"},{"t":"AI Threat Scorer","d":"LLM scores enriched payload → risk_score(0–10) + confidence(0–1). Temperature 0.","i":"🤖"},{"t":"Conditional Router","d":"confidence<0.7→review. score≥7.5→emergency. Otherwise→standard (Jira only).","i":"🔀"},{"t":"Emergency Dispatch","d":"Only high-risk incidents reach here. Builds 4 channel-specific payloads.","i":"🚨"},{"t":"SHA-256 Dedup Key","d":"32-char hash over source_ip|timestamp|exception_code. Same event×10 = 1 alert.","i":"🔑"},{"t":"4-Channel Fan-Out","d":"Simultaneous: Jira P1 · PagerDuty Events v2 · Slack Block Kit · Twilio SMS<160.","i":"📡"}]}];
/* ===== ENRICHMENT: stakes, savings, plain-language tips, manual process ===== */
var PG_META = {
  0:{ stake:'A growing team drowns in ~200 support emails a day.',
      hrs:9, cost:1500,
      manual:['Read every email and guess how urgent it is','Decide who or what should answer it','Write each reply from scratch','Copy-paste, proofread, hope nothing embarrassing goes out','Repeat ~200 times a day'],
      tips:{trigger:'The starting gun: a new support email arrives and pokes the workflow awake.',
        set:'Tidies the messy raw email into clean, predictable data the AI can read.',
        gateway:'A cheap, fast AI skims the email and judges how urgent and complex it is.',
        router:'The money-saver: simple emails go to the cheap AI, hard ones to the premium AI.',
        haiku:'The budget AI writes replies for routine, everyday questions.',
        sonnet:'The premium AI handles the tricky, high-stakes replies.',
        normalize:'Cleans up the draft and quietly logs what each reply actually cost.',
        approval:'A human gives a quick thumbs-up before anything reaches a customer.',
        send:'The approved reply goes out. Customer helped fast, zero bad sends.'} },
  1:{ stake:'Hot leads sit unread for hours and go cold before anyone calls.',
      hrs:6, cost:1100,
      manual:['Watch the inbox for new form submissions','Eyeball each lead and guess if it is any good','Manually flag the promising ones','Ping a teammate on Slack… eventually','Lose a few leads in the shuffle every week'],
      tips:{webhook:'Catches a new lead the instant a form is submitted.',
        validate:'Checks the lead is real and reshapes it into clean data.',
        ai_score:'AI reads the lead and scores how likely it is to convert, 0 to 100.',
        router:'A simple gate: high scorers go to the fast lane, the rest go to staging.',
        priority:'Hot leads jump straight into the priority queue for instant follow-up.',
        hitl:'Borderline leads wait for a human to take a quick look.',
        dead:'Anything that errors out is caught here instead of vanishing.',
        slack:'Fires an instant Slack ping so a human knows a hot lead just landed.',
        safe200:'Tells the form "got it" so the submission never fails on the visitor.'} },
  2:{ stake:'Every new paying client means an hour of manual setup and copy-paste.',
      hrs:8, cost:1400,
      manual:['Notice a payment came through','Manually create a client record','Type up a custom onboarding plan','Set up their portal by hand','Accidentally onboard the same client twice sometimes'],
      tips:{stripe:'Wakes up the moment a client actually pays.',
        filter:'Only lets through real, paid, non-zero payments — ignores the noise.',
        normalize:'Standardizes the client info and stamps it with a unique ID.',
        idem:'Checks Notion so the same client never gets onboarded twice.',
        ai_road:'AI drafts a personalized onboarding roadmap for this exact client.',
        nrec:'Creates the official client record in your system.',
        npor:'Spins up the client portal automatically, no manual setup.',
        paths:'Sends each client down the right track for their plan tier.',
        halt:'Spots a duplicate and stops cleanly instead of making a mess.'} },
  3:{ stake:'Security alerts pour in 24/7 and the real threats hide in the noise.',
      hrs:12, cost:2200,
      manual:['Stare at a firehose of security alerts','Manually look up each suspicious IP','Guess which alerts are actually dangerous','File tickets one by one, half-asleep at 3am','Miss the one alert that actually mattered'],
      tips:{webhook:'Catches an incoming security alert the second it fires.',
        enrich:'Looks up the IP and filters out harmless internal traffic.',
        ai_thr:'AI scores how dangerous the threat really is, with a confidence level.',
        router:'Routes each alert by severity — review, standard, or full emergency.',
        review:'Low-confidence calls get a human second opinion before action.',
        standard:'Routine threats just get a Jira ticket — no need to wake anyone.',
        dispatch:'Real emergencies trigger the full response, immediately.',
        dedup:'A fingerprint stops the same threat from paging everyone five times.',
        fanout:'Blasts the alert to all four channels at once so nothing is missed.'} }
};

/* ===== SANDBOX toolkit — open-ended, no right answer ===== */
var SANDBOX_NODES=[
  {id:'trigger', lbl:'Trigger',     ico:'\ud83d\udd14', x:8, y:30, c:'#00f0ff', out:1,inp:0, tip:'Kicks the whole thing off when something happens.'},
  {id:'webhook', lbl:'Webhook',     ico:'\ud83c\udf10', x:28,y:30, c:'#00f0ff', out:1,inp:0, tip:'Catches data from another app the instant it arrives.'},
  {id:'schedule',lbl:'Schedule',    ico:'\u23f0', x:48,y:30, c:'#00f0ff', out:1,inp:0, tip:'Runs on a timer \u2014 hourly, daily, whenever you like.'},
  {id:'ai',      lbl:'AI Step',     ico:'\ud83e\udd16', x:68,y:30, c:'#9b4dff', out:1,inp:1, tip:'Claude reads, decides, scores, drafts, or classifies.'},
  {id:'router',  lbl:'IF / Router', ico:'\ud83d\udd00', x:88,y:30, c:'#f7c843', out:1,inp:1, tip:'Splits the flow down different paths based on a rule.'},
  {id:'filter',  lbl:'Filter',      ico:'\ud83d\udd0e', x:8, y:72, c:'#00ff88', out:1,inp:1, tip:'Lets only the items you care about continue.'},
  {id:'transform',lbl:'Transform',  ico:'\ud83e\uddec', x:28,y:72, c:'#00f0ff', out:1,inp:1, tip:'Reshapes or cleans the data into the format you need.'},
  {id:'approval',lbl:'Human OK',    ico:'\ud83d\udc64', x:48,y:72, c:'#f7c843', out:1,inp:1, tip:'Pauses for a person to approve before acting.'},
  {id:'email',   lbl:'Send Email',  ico:'\u2709\ufe0f', x:68,y:72, c:'#00ff88', out:1,inp:1, tip:'Sends an email out automatically.'},
  {id:'slack',   lbl:'Slack',       ico:'\ud83d\udcac', x:88,y:72, c:'#00ff88', out:1,inp:1, tip:'Pings a Slack channel so a human gets notified.'}
];

/* ===== AUTOMATION PLAYGROUND v6 — sandbox + score + juice (isolated) ===== */
/* ===== LOGIC LAB: data-flow puzzle core ===== */
var LOGIC_LEVELS=[
 { name:'Hot Leads', brief:'Output the NAMES of leads scoring 70+, highest score first.',
   input:[{n:'Ava',s:82},{n:'Ben',s:40},{n:'Cy',s:95},{n:'Dee',s:67},{n:'Eli',s:71}],
   par:4,
   nodes:[
    {id:'src',lbl:'Leads In',ico:'\ud83d\udce5',x:7,y:50,c:'#00f0ff',out:1,inp:0,op:'source'},
    {id:'f70',lbl:'Filter\ns \u2265 70',ico:'\ud83d\udd0e',x:30,y:28,c:'#00ff88',out:1,inp:1,op:'filter_ge',field:'s',p:70},
    {id:'flo',lbl:'Filter\ns < 50',ico:'\ud83d\udeab',x:30,y:74,c:'#9b4dff',out:1,inp:1,op:'filter_lt',field:'s',p:50},
    {id:'srt',lbl:'Sort\nscore \u2193',ico:'\u2b07\ufe0f',x:54,y:28,c:'#f7c843',out:1,inp:1,op:'sort_desc',field:'s'},
    {id:'plk',lbl:'Pluck\nname',ico:'\ud83c\udff7\ufe0f',x:77,y:50,c:'#00f0ff',out:1,inp:1,op:'pluck',field:'n'},
    {id:'out',lbl:'Output',ico:'\ud83c\udfaf',x:96,y:50,c:'#00ff88',out:0,inp:1,op:'sink',target:['Cy','Ava','Eli']}
   ]},
 { name:'Triage', brief:'Route each ticket: urgent\u2192Human, normal\u2192AI, spam\u2192Trash.',
   input:[{id:'T1',k:'urgent'},{id:'T2',k:'spam'},{id:'T3',k:'normal'},{id:'T4',k:'urgent'},{id:'T5',k:'normal'}],
   par:6,
   nodes:[
    {id:'src',lbl:'Tickets In',ico:'\ud83d\udce5',x:8,y:50,c:'#00f0ff',out:1,inp:0,op:'source'},
    {id:'cu',lbl:'Class.\nurgent',ico:'\ud83d\udd25',x:34,y:22,c:'#ff2d55',out:1,inp:1,op:'classify',field:'k',cat:'urgent',idField:'id'},
    {id:'cn',lbl:'Class.\nnormal',ico:'\ud83d\udcec',x:34,y:50,c:'#00f0ff',out:1,inp:1,op:'classify',field:'k',cat:'normal',idField:'id'},
    {id:'cs',lbl:'Class.\nspam',ico:'\ud83d\uddd1\ufe0f',x:34,y:78,c:'#9b4dff',out:1,inp:1,op:'classify',field:'k',cat:'spam',idField:'id'},
    {id:'hum',lbl:'Human',ico:'\ud83d\udc64',x:72,y:22,c:'#f7c843',out:0,inp:1,op:'sink',target:['T1','T4']},
    {id:'ai',lbl:'AI Reply',ico:'\ud83e\udd16',x:72,y:50,c:'#00ff88',out:0,inp:1,op:'sink',target:['T3','T5']},
    {id:'trash',lbl:'Trash',ico:'\ud83d\uddd1\ufe0f',x:72,y:78,c:'#6b7494',out:0,inp:1,op:'sink',target:['T2']}
   ]},
 { name:'Top 3', brief:'Unique leads, top 3 by score, as names. Watch the duplicates!',
   input:[{n:'Ava',s:82},{n:'Ava',s:82},{n:'Cy',s:95},{n:'Dee',s:67},{n:'Eli',s:71},{n:'Cy',s:95}],
   par:5,
   nodes:[
    {id:'src',lbl:'Leads In',ico:'\ud83d\udce5',x:7,y:50,c:'#00f0ff',out:1,inp:0,op:'source'},
    {id:'ded',lbl:'Dedup\nby name',ico:'\ud83e\uddf9',x:27,y:28,c:'#00ff88',out:1,inp:1,op:'dedup',field:'n'},
    {id:'srt',lbl:'Sort\nscore \u2193',ico:'\u2b07\ufe0f',x:48,y:28,c:'#f7c843',out:1,inp:1,op:'sort_desc',field:'s'},
    {id:'tk3',lbl:'Take\ntop 3',ico:'\u2702\ufe0f',x:69,y:28,c:'#00f0ff',out:1,inp:1,op:'take',p:3},
    {id:'tk2',lbl:'Take\ntop 2',ico:'\u2702\ufe0f',x:48,y:74,c:'#9b4dff',out:1,inp:1,op:'take',p:2},
    {id:'plk',lbl:'Pluck\nname',ico:'\ud83c\udff7\ufe0f',x:88,y:50,c:'#00f0ff',out:1,inp:1,op:'pluck',field:'n'},
    {id:'out',lbl:'Output',ico:'\ud83c\udfaf',x:96,y:78,c:'#00ff88',out:0,inp:1,op:'sink',target:['Cy','Ava','Eli']}
   ]},
 { name:'Priority EU', brief:'Names of EU leads scoring 80+, highest first, top 2.',
   input:[{n:'Ava',s:88,r:'EU'},{n:'Ben',s:91,r:'US'},{n:'Cy',s:84,r:'EU'},{n:'Dee',s:79,r:'EU'},{n:'Eli',s:95,r:'EU'},{n:'Fin',s:82,r:'US'}],
   par:6,
   nodes:[
    {id:'src',lbl:'Leads In',ico:'\ud83d\udce5',x:7,y:50,c:'#00f0ff',out:1,inp:0,op:'source'},
    {id:'feu',lbl:'Filter\nregion=EU',ico:'\ud83c\udf0d',x:26,y:24,c:'#00ff88',out:1,inp:1,op:'filter_eq',field:'r',val:'EU'},
    {id:'f80',lbl:'Filter\ns \u2265 80',ico:'\ud83d\udd0e',x:46,y:24,c:'#00ff88',out:1,inp:1,op:'filter_ge',field:'s',p:80},
    {id:'srt',lbl:'Sort\nscore \u2193',ico:'\u2b07\ufe0f',x:66,y:24,c:'#f7c843',out:1,inp:1,op:'sort_desc',field:'s'},
    {id:'tk2',lbl:'Take\ntop 2',ico:'\u2702\ufe0f',x:86,y:24,c:'#00f0ff',out:1,inp:1,op:'take',p:2},
    {id:'fus',lbl:'Filter\nregion=US',ico:'\ud83d\uddfd',x:26,y:76,c:'#9b4dff',out:1,inp:1,op:'filter_eq',field:'r',val:'US'},
    {id:'tk3',lbl:'Take\ntop 3',ico:'\u2702\ufe0f',x:46,y:76,c:'#9b4dff',out:1,inp:1,op:'take',p:3},
    {id:'plk',lbl:'Pluck\nname',ico:'\ud83c\udff7\ufe0f',x:66,y:76,c:'#00f0ff',out:1,inp:1,op:'pluck',field:'n'},
    {id:'out',lbl:'Output',ico:'\ud83c\udfaf',x:96,y:76,c:'#00ff88',out:0,inp:1,op:'sink',target:['Eli','Ava']}
   ]},
 { name:'EU Leaderboard', brief:'Unique EU leads, top 2 by score, as names. Mind the duplicates AND the region.',
   input:[{n:'Ava',s:88,r:'EU'},{n:'Ava',s:88,r:'EU'},{n:'Cy',s:84,r:'EU'},{n:'Ben',s:99,r:'US'},{n:'Eli',s:95,r:'EU'},{n:'Eli',s:95,r:'EU'},{n:'Dee',s:70,r:'EU'}],
   par:6,
   nodes:[
    {id:'src',lbl:'Leads In',ico:'\ud83d\udce5',x:7,y:50,c:'#00f0ff',out:1,inp:0,op:'source'},
    {id:'feu',lbl:'Filter\nregion=EU',ico:'\ud83c\udf0d',x:26,y:24,c:'#00ff88',out:1,inp:1,op:'filter_eq',field:'r',val:'EU'},
    {id:'ded',lbl:'Dedup\nby name',ico:'\ud83e\uddf9',x:46,y:24,c:'#00ff88',out:1,inp:1,op:'dedup',field:'n'},
    {id:'srt',lbl:'Sort\nscore \u2193',ico:'\u2b07\ufe0f',x:66,y:24,c:'#f7c843',out:1,inp:1,op:'sort_desc',field:'s'},
    {id:'tk2',lbl:'Take\ntop 2',ico:'\u2702\ufe0f',x:86,y:24,c:'#00f0ff',out:1,inp:1,op:'take',p:2},
    {id:'sra',lbl:'Sort\nscore \u2191',ico:'\u2b06\ufe0f',x:26,y:76,c:'#9b4dff',out:1,inp:1,op:'sort_asc',field:'s'},
    {id:'tk3',lbl:'Take\ntop 3',ico:'\u2702\ufe0f',x:46,y:76,c:'#9b4dff',out:1,inp:1,op:'take',p:3},
    {id:'plk',lbl:'Pluck\nname',ico:'\ud83c\udff7\ufe0f',x:66,y:76,c:'#00f0ff',out:1,inp:1,op:'pluck',field:'n'},
    {id:'out',lbl:'Output',ico:'\ud83c\udfaf',x:96,y:76,c:'#00ff88',out:0,inp:1,op:'sink',target:['Eli','Ava']}
   ]}
];

function applyOp(node,val){
  var a=(val||[]).slice();
  switch(node.op){
    case 'filter_ge': return a.filter(function(x){return x[node.field]>=node.p;});
    case 'filter_lt': return a.filter(function(x){return x[node.field]<node.p;});
    case 'filter_eq': return a.filter(function(x){return x[node.field]===node.val;});
    case 'sort_desc': return a.sort(function(x,y){return y[node.field]-x[node.field];});
    case 'sort_asc':  return a.sort(function(x,y){return x[node.field]-y[node.field];});
    case 'take':      return a.slice(0,node.p);
    case 'dedup':     {var seen={},o=[];a.forEach(function(x){if(!seen[x[node.field]]){seen[x[node.field]]=1;o.push(x);}});return o;}
    case 'pluck':     return a.map(function(x){return x[node.field];});
    case 'classify':  return a.filter(function(x){return x[node.field]===node.cat;}).map(function(x){return x[node.idField];});
    case 'sink':      return a;
    default:          return a;
  }
}

function simulate(level,conns){
  var byId={};level.nodes.forEach(function(n){byId[n.id]=n;});
  var inEdge={};conns.forEach(function(c){ (inEdge[c.to]=inEdge[c.to]||[]).push(c.from); });
  var memo={},err=null;
  function val(id,stack){
    if(memo[id]!==undefined)return memo[id];
    var n=byId[id];
    if(n.op==='source'){return memo[id]=JSON.parse(JSON.stringify(level.input));}
    var ins=inEdge[id]||[];
    if(ins.length===0){return memo[id]=undefined;}
    if(ins.length>1){err=n.lbl.replace(/\n/g,' ')+' has too many inputs (1 allowed).';return memo[id]=undefined;}
    if(stack[ins[0]]){err='Loop detected.';return memo[id]=undefined;}
    var s2=Object.create(stack);s2[id]=1;
    var inv=val(ins[0],s2);
    if(inv===undefined)return memo[id]=undefined;
    return memo[id]=applyOp(n,inv);
  }
  var sinks=level.nodes.filter(function(n){return n.op==='sink';});
  var results=sinks.map(function(sk){
    var got=val(sk.id,{});
    var ok=got!==undefined && JSON.stringify(got)===JSON.stringify(sk.target);
    return {id:sk.id,lbl:sk.lbl.replace(/\n/g,' '),got:got,want:sk.target,ok:ok};
  });
  return {memo:memo, ok: !err && results.every(function(r){return r.ok;}), results:results, error:err};
}

/* ===== AUTOMATION PLAYGROUND v8 ===== */
(function(){
  "use strict";
  function $(id){return document.getElementById(id);}
  var RM=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var ST={pi:0,pz:null,conns:[],src:null,busy:false,mode:'challenge',view:'auto',sandbox:false,
          done:{},t0:0,tHandle:null,idle:null,attempt:{wrong:0,hint:false,demo:false},combo:0,lastTime:'',logic:false,li:0,flowVals:null,justDragged:false,sbxNodes:[]};
  var nodesEl,svg,canvas,tabsEl,tipEl;
  var SBX=PG_PUZZLES.length, LOGIC_IDX=PG_PUZZLES.length+1;

  function meta(){return PG_META[ST.pi]||{};}
  function msg(t,h){var m=$('ap-msg-el');if(m){m.className='ap-msg '+t;m.innerHTML=h;}}

  /* persistence (localStorage, graceful fallback) */
  function DB(){try{var k='__jt';localStorage.setItem(k,'1');localStorage.removeItem(k);return localStorage;}catch(e){return sessionStorage;}}
  function scores(){try{return JSON.parse(DB().getItem('jemScores')||'{}');}catch(e){return {};}}
  var ORD={S:5,A:4,B:3,C:2,WATCHED:1};
  function saveScore(i,rank,ms){var s=scores(),cur=s[i];
    if(!cur||ORD[rank]>ORD[cur.rank]||(rank===cur.rank&&ms&&(!cur.ms||ms<cur.ms))){s[i]={rank:rank,ms:ms||0};try{DB().setItem('jemScores',JSON.stringify(s));}catch(e){}}
    return s[i];}
  function rankFor(a,ms){if(a.demo)return 'WATCHED';var fast=ms&&ms<45000;
    if(a.wrong===0&&!a.hint&&fast)return 'S';
    if(a.wrong===0&&!a.hint)return 'A';
    if(a.wrong<=1&&!a.hint)return 'A';
    if(a.wrong<=3)return 'B';return 'C';}

  function buildTabs(){
    var ic=['\ud83c\udfa7','\ud83c\udfaf','\ud83d\ude80','\ud83d\udee1\ufe0f'];
    tabsEl.innerHTML='';
    PG_PUZZLES.forEach(function(p,i){
      var b=document.createElement('button');
      b.className='ap-tab';b.type='button';b.setAttribute('role','tab');
      b.innerHTML=(ic[i]||'')+' '+p.name+'<span class="ap-check" id="ap-chk-'+i+'">\u2713</span>';
      b.addEventListener('click',function(){if(!ST.busy)load(i);});
      tabsEl.appendChild(b);
    });
    var sb=document.createElement('button');
    sb.className='ap-tab ap-tab-sbx';sb.type='button';sb.setAttribute('role','tab');
    sb.innerHTML='\ud83e\uddea Sandbox';
    sb.addEventListener('click',function(){if(!ST.busy)load(SBX);});
    tabsEl.appendChild(sb);
    var lt=document.createElement('button');lt.className='ap-tab ap-tab-logic';lt.type='button';lt.setAttribute('role','tab');lt.innerHTML='\ud83e\udde9 Logic Lab';lt.addEventListener('click',function(){if(!ST.busy)load(LOGIC_IDX);});tabsEl.appendChild(lt);
    // reflect saved best ranks
    var sc=scores();PG_PUZZLES.forEach(function(_,i){if(sc[i]){var c=$('ap-chk-'+i);if(c)c.classList.add('on');}});
  }

  function showControls(show){
    $('ap-mode').style.display=show?'':'none';
    $('ap-view').style.display=show?'':'none';
    $('ap-hint-btn').style.display=show?'':'none';
    $('ap-demo-btn').style.display=show?'':'none';
  }

  function load(i){
    if(i===LOGIC_IDX)return loadLogic(0);
    if(i===SBX)return loadSandbox();
    ST.sandbox=false;ST.logic=false;var lb0=$('ap-levels');if(lb0)lb0.style.display='none';var pl0=$('ap-palette');if(pl0)pl0.style.display='none';ST.pi=i;ST.pz=PG_PUZZLES[i];ST.conns=[];ST.src=null;
    ST.attempt={wrong:0,hint:false,demo:false};ST.combo=0;
    stopTimer();$('ap-timer').textContent='0:00';
    setActiveTab(i);showControls(true);$('ap-status').style.display='';
    $('ap-need').textContent=ST.pz.correct.length;$('ap-need').parentNode.style.visibility='';
    var m=meta();
    $('ap-stake').innerHTML='\ud83d\udcbc '+(m.stake||'')+' <span class="ap-stk-save">Automating it saves ~'+(m.hrs||0)+' hrs/week.</span>';
    $('ap-manual').innerHTML='<div class="ap-man-h">\ud83d\udc64 Without automation, a human does this \u2014 every single time:</div>'+
      '<ol class="ap-man-list">'+(m.manual||[]).map(function(x){return '<li>'+x+'</li>';}).join('')+'</ol>'+
      '<div class="ap-man-foot">\u26a1 The pipeline does all of it in seconds \u2014 saving ~<b>'+(m.hrs||0)+' hrs/week</b> (~$'+(m.cost||0)+'/mo).</div>';
    $('ap-steps-el').innerHTML=ST.pz.steps.map(function(s,k){
      return '<div class="ap-step" id="apst-'+k+'"><div class="ap-n">'+s.i+' Step '+(k+1)+'</div><div class="ap-t">'+s.t+'</div><div class="ap-d">'+s.d+'</div></div>';
    }).join('');
    setView('auto');render();recompute();
    var sc=scores()[i];
    msg('neutral','Tap a cyan \u25b6 output, then a purple \u25c0 input. Hover a node to learn what it does.'+(sc?(' <span style="opacity:.7">Best: '+sc.rank+(sc.ms?(' \u00b7 '+fmt(sc.ms)):'')+'</span>'):''));
    armIdle();
  }

  function loadSandbox(){
    ST.sandbox=true;ST.logic=false;var lb1=$('ap-levels');if(lb1)lb1.style.display='none';ST.pi=SBX;ST.conns=[];ST.src=null;
    ST.sbxNodes=[];ST.pz={name:'Sandbox',nodes:ST.sbxNodes,correct:[],steps:[]};
    stopTimer();$('ap-timer').textContent='0:00';
    setActiveTab(SBX);showControls(false);$('ap-status').style.display='';buildPalette();$('ap-palette').style.display='flex';
    $('ap-stake').innerHTML='\ud83e\uddea <b style="color:#c9a3ff">Sandbox builder</b> \u2014 tap or drag nodes from the palette onto the canvas, wire your own automation, then Run. With an API key set, Claude reads your build and rates it.';
    $('ap-manual').hidden=true;
    $('ap-need').parentNode.style.visibility='hidden';
    $('ap-steps-el').innerHTML='<div class="ap-step lit" style="opacity:1"><div class="ap-n">\u2728 OPEN-ENDED</div><div class="ap-t">No right answer</div><div class="ap-d">Add nodes from the palette, drag to arrange, \u2715 to delete, wire triggers \u2192 logic \u2192 actions however you like. Run to have Claude critique your build.</div></div>';
    setView('auto');render();recompute();
    msg('tip','\ud83e\uddea Tap or drag a node from the palette above to begin. Build a \ud83d\udd14 trigger \u2192 \ud83e\udd16 AI \u2192 \u2709\ufe0f action, or go wild. Then \u25b6 Run.');
    armIdle();
  }

  function setActiveTab(i){Array.prototype.forEach.call(tabsEl.children,function(b,j){b.setAttribute('aria-selected',j===i?'true':'false');});}

  function buildNode(n){
      var d=document.createElement('div');
      d.className='ap-node';d.id='apn-'+n.id;d.tabIndex=0;
      d.style.left=n.x+'%';d.style.top=n.y+'%';d.style.setProperty('--apnc',n.c);
      d.innerHTML='<span class="ap-ico">'+n.ico+'</span><span class="ap-lbl">'+n.lbl.replace(/\n/g,'<br>')+'</span>';
      d.addEventListener('pointerenter',function(e){if(e.pointerType!=='touch')showTip(n.id,d);});
      d.addEventListener('pointerleave',function(){hideTip();});
      d.addEventListener('focus',function(){showTip(n.id,d);});
      d.addEventListener('blur',function(){hideTip();});
      d.addEventListener('pointerdown',function(e){if(e.target.closest('.ap-port'))return;startNodeDrag(d,e);});
      d.addEventListener('click',function(e){if(ST.justDragged)return;if(!e.target.closest('.ap-port')){if(tipEl.dataset.for===n.id)hideTip();else showTip(n.id,d);}});
      if(n.out){
        var o=document.createElement('div');
        o.className='ap-port out';o.id='apo-'+n.id;o.tabIndex=0;o.setAttribute('role','button');
        o.setAttribute('aria-label','Output of '+n.lbl);
        o.innerHTML='<span class="ap-dot">\u25b6</span>';
        o.addEventListener('pointerdown',function(e){if(!ST.busy)beginDrag(n.id,e);});
        o.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&!ST.busy){e.preventDefault();armOutput(n.id);}});
        d.appendChild(o);
      }
      if(n.inp){
        var ip=document.createElement('div');
        ip.className='ap-port in';ip.id='api-'+n.id;ip.dataset.in=n.id;ip.tabIndex=0;ip.setAttribute('role','button');
        ip.setAttribute('aria-label','Input of '+n.lbl);
        ip.innerHTML='<span class="ap-dot"></span>';
        ip.addEventListener('click',function(){if(ST.src&&!ST.busy)connect(ST.src,n.id);});
        ip.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&ST.src&&!ST.busy){e.preventDefault();connect(ST.src,n.id);}});
        d.appendChild(ip);
      }
      if(ST.sandbox)addDelBtn(d,n.id);
      nodesEl.appendChild(d);
      return d;
  }
  function render(){nodesEl.innerHTML='';ST.pz.nodes.forEach(buildNode);draw();}

  function tipText(id){
    if(ST.logic){var ln=(ST.pz.nodes||[]).filter(function(x){return x.id===id;})[0];var t=ln?opDesc(ln):'';if(ST.flowVals&&ST.flowVals[id]!==undefined)t+='<br><span style="color:#7CFFC4">\u2192 '+fmtArr(ST.flowVals[id])+'</span>';return t;}
    if(ST.sandbox){var n=(ST.pz.nodes||[]).filter(function(x){return x.id===id;})[0];return n?n.tip:'';}
    return (meta().tips||{})[id]||'';
  }
  function showTip(id,nodeDiv){
    var txt=tipText(id);if(!txt){hideTip();return;}
    tipEl.innerHTML=txt;tipEl.dataset.for=id;tipEl.style.display='block';
    var cr=canvas.getBoundingClientRect(),nr=nodeDiv.getBoundingClientRect();
    tipEl.style.left=Math.max(80,Math.min(cr.width-80,nr.left-cr.left+nr.width/2))+'px';
    tipEl.style.top=(nr.top-cr.top-10)+'px';
  }
  function hideTip(){tipEl.style.display='none';tipEl.dataset.for='';}

  function clearArm(){document.querySelectorAll('#page-playground .ap-port').forEach(function(p){p.classList.remove('armed','target','hint');});}
  function armOutput(id){
    clrIdle();
    if(ST.src===id){ST.src=null;}else{ST.src=id;}
    clearArm();
    if(ST.src){
      var po=$('apo-'+ST.src);if(po)po.classList.add('armed');
      document.querySelectorAll('#page-playground .ap-port.in').forEach(function(p){p.classList.add('target');});
      msg('tip','Output armed \u2014 tap a purple \u25c0 input. (Tap the same output again to cancel.)');
    }else{msg('neutral','Tap a cyan \u25b6 output to start.');}
  }

  function startNodeDrag(d,e){
    if(ST.busy)return;e.preventDefault();hideTip();
    d.classList.add('dragging');
    var sx=e.clientX,sy=e.clientY,moved=false;
    var nr=d.getBoundingClientRect(),offX=e.clientX-(nr.left+nr.width/2),offY=e.clientY-(nr.top+nr.height/2);
    function mv(ev){
      if(!moved&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>4)moved=true;
      if(!moved)return;
      var cr=canvas.getBoundingClientRect();
      var px=((ev.clientX-offX)-cr.left)/cr.width*100, py=((ev.clientY-offY)-cr.top)/cr.height*100;
      px=Math.max(4,Math.min(96,px));py=Math.max(9,Math.min(92,py));
      d.style.left=px+'%';d.style.top=py+'%';draw();
    }
    function up(){
      window.removeEventListener('pointermove',mv);window.removeEventListener('pointerup',up);
      d.classList.remove('dragging');
      if(moved){ST.justDragged=true;setTimeout(function(){ST.justDragged=false;},60);draw();}
    }
    window.addEventListener('pointermove',mv);window.addEventListener('pointerup',up);
  }
  function beginDrag(id,e){
    e.preventDefault();clrIdle();hideTip();
    var sx=e.clientX,sy=e.clientY,moved=false;
    function mv(ev){if(Math.hypot(ev.clientX-sx,ev.clientY-sy)>6)moved=true;
      if(moved){var r=canvas.getBoundingClientRect();var f=portPos(id,'out');draw({x1:f.x,y1:f.y,x2:ev.clientX-r.left,y2:ev.clientY-r.top});}}
    function up(ev){
      window.removeEventListener('pointermove',mv);window.removeEventListener('pointerup',up);
      if(!moved){armOutput(id);return;}
      draw();
      var el=document.elementFromPoint(ev.clientX,ev.clientY);
      var inp=el&&el.closest?el.closest('.ap-port.in'):null;
      if(inp&&inp.dataset.in&&inp.dataset.in!==id){connect(id,inp.dataset.in);}
      else{msg('neutral','Released on empty space. Tap a cyan output, then a purple input.');}
    }
    window.addEventListener('pointermove',mv);window.addEventListener('pointerup',up);
  }

  function popNodes(a,b){if(RM)return;[a,b].forEach(function(id){var el=$('apn-'+id);if(el){el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop');setTimeout(function(){el.classList.remove('pop');},380);}});}
  function shakeNode(id){if(RM)return;var el=$('apn-'+id);if(el){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');setTimeout(function(){el.classList.remove('shake');},420);}}

  function connect(from,to){
    clrIdle();ST.src=null;clearArm();
    if(ST.conns.some(function(c){return c.from===from&&c.to===to;})){msg('neutral','Those two are already wired.');return;}
    if(ST.logic){ST.conns=ST.conns.filter(function(c){return c.to!==to;});ST.conns.push({from:from,to:to,ok:true});ST.flowVals=null;popNodes(from,to);snap();recompute();msg('ok','\ud83d\udd17 '+lblOf(from)+' \u2192 '+lblOf(to)+'  ('+ST.conns.length+' wired)');return;}
    if(ST.sandbox){ST.conns.push({from:from,to:to,ok:true});popNodes(from,to);snap();recompute();
      msg('ok','\ud83d\udd17 '+from.toUpperCase()+' \u2192 '+to.toUpperCase()+'  ('+ST.conns.length+' wired)');return;}
    startTimer();
    var ok=ST.pz.correct.some(function(e){return e[0]===from&&e[1]===to;});
    if(!ok)ST.attempt.wrong++;
    if(!ok && ST.mode==='guided'){
      ST.combo=0;shakeNode(to);
      var hk=ST.pz.hints&&ST.pz.hints[from+'\u2192'+to];
      msg('err',(hk||'\u274c Not part of this pipeline.')+' <span style="opacity:.8">(Guided blocked it \u2014 try \ud83d\udca1 Hint.)</span>');
      return;
    }
    ST.conns.push({from:from,to:to,ok:ok});
    if(ok){ST.combo++;popNodes(from,to);snap(ST.combo);if(ST.combo>=3)comboFlash(to,ST.combo);if(ST.combo>=5)checkBadges({combo:ST.combo});}else{ST.combo=0;shakeNode(to);}
    recompute();
    var c=ST.conns.filter(function(x){return x.ok;}).length,w=ST.conns.filter(function(x){return !x.ok;}).length;
    if(ok){
      if(c>=ST.pz.correct.length&&w===0){msg('ok','\u25b0\u25b0\u25b0 PIPELINE READY \u2014 hit \u25b6 Run automation!');}
      else if(c>=ST.pz.correct.length&&w>0){msg('err','All correct wires placed \u2014 remove the '+w+' red wire'+(w>1?'s':'')+' (tap it) to run.');}
      else{msg('ok','\u2705 '+from.toUpperCase()+' \u2192 '+to.toUpperCase()+'  ('+c+'/'+ST.pz.correct.length+')');}
    }else{
      var hint=(ST.pz.hints&&ST.pz.hints[from+'\u2192'+to])||'\u274c That link isn\u2019t part of this pipeline.';
      msg('err',hint+' <span style="opacity:.85">Tap the red wire to remove it.</span>');
    }
  }

  function removeWire(idx){if(idx<0||idx>=ST.conns.length)return;var c=ST.conns.splice(idx,1)[0];recompute();msg('neutral','Removed '+c.from.toUpperCase()+' \u2192 '+c.to.toUpperCase()+'.');}

  function recompute(){
    if(ST.logic){document.querySelectorAll('#page-playground .ap-node').forEach(function(n){var id=n.id.slice(4);n.classList.toggle('lit',ST.conns.some(function(c){return c.from===id||c.to===id;}));});$('ap-have').textContent=ST.conns.length;$('ap-barfill').style.width=Math.min(100,ST.conns.length*14)+'%';var wcl=$('ap-wrong');if(wcl)wcl.style.display='none';$('ap-run-btn').disabled=ST.conns.length<1;draw();return;}
    if(ST.sandbox){
      document.querySelectorAll('#page-playground .ap-node').forEach(function(n){n.classList.toggle('lit',ST.conns.some(function(c){return c.from===n.id.slice(4)||c.to===n.id.slice(4);}));});
      $('ap-have').textContent=ST.conns.length;
      $('ap-barfill').style.width=Math.min(100,ST.conns.length*12)+'%';
      var wc=$('ap-wrong');if(wc)wc.style.display='none';
      $('ap-run-btn').disabled=ST.conns.length<1;draw();return;
    }
    var correct=ST.conns.filter(function(c){return c.ok;}).length,wrong=ST.conns.filter(function(c){return !c.ok;}).length;
    $('ap-have').textContent=correct;$('ap-barfill').style.width=(100*correct/ST.pz.correct.length)+'%';
    document.querySelectorAll('#page-playground .ap-port').forEach(function(p){p.classList.remove('done','bad');});
    document.querySelectorAll('#page-playground .ap-node').forEach(function(n){n.classList.remove('lit');});
    ST.conns.forEach(function(c){var po=$('apo-'+c.from),pi=$('api-'+c.to);
      if(c.ok){if(po)po.classList.add('done');if(pi)pi.classList.add('done');var a=$('apn-'+c.from),b=$('apn-'+c.to);if(a)a.classList.add('lit');if(b)b.classList.add('lit');}
      else{if(po)po.classList.add('bad');if(pi)pi.classList.add('bad');}});
    ST.pz.steps.forEach(function(s,i){var el=$('apst-'+i);if(el)el.className='ap-step';});
    ST.conns.filter(function(c){return c.ok;}).forEach(function(c){lightStep(c.from,c.to);});
    $('ap-run-btn').disabled=!(correct>=ST.pz.correct.length&&wrong===0);
    var wc=$('ap-wrong');if(wc){wc.textContent=wrong?('\u2022 '+wrong+' wrong'):'';wc.style.display=wrong?'inline':'none';}
    draw();
  }

  function lightStep(from,to){(ST.pz.steps||[]).forEach(function(s,i){var kw=(s.t+' '+s.d).toLowerCase();
    if(kw.indexOf(from.replace(/_/g,' '))>-1||kw.indexOf(to.replace(/_/g,' '))>-1){var el=$('apst-'+i);if(el&&!el.classList.contains('fire'))el.classList.add('lit');}});}

  function portPos(id,side){var el=$((side==='out'?'apo-':'api-')+id);var r=canvas.getBoundingClientRect();
    if(!el){var nn=$('apn-'+id).getBoundingClientRect();return{x:nn.left-r.left+(side==='out'?nn.width:0),y:nn.top-r.top+nn.height/2};}
    var pr=el.getBoundingClientRect();return{x:pr.left-r.left+pr.width/2,y:pr.top-r.top+pr.height/2};}
  function wirePath(a,b){var dx=Math.abs(b.x-a.x)*0.5;return 'M'+a.x+','+a.y+' C'+(a.x+dx)+','+a.y+' '+(b.x-dx)+','+b.y+' '+b.x+','+b.y;}

  function draw(temp){
    if(!canvas)return;var r=canvas.getBoundingClientRect();svg.setAttribute('viewBox','0 0 '+r.width+' '+r.height);
    var out=[];
    ST.conns.forEach(function(c,i){
      var a=portPos(c.from,'out'),b=portPos(c.to,'in');
      var col=(ST.sandbox||ST.logic)?'#00f0ff':(c.ok?'#00ff88':'#ff2d55');
      var fl=(ST.sandbox||ST.logic)?'#7fe9ff':(c.ok?'#7CFFC4':'#ff7a99');
      var d=wirePath(a,b);
      out.push('<path class="ap-hit" data-wire="'+i+'" d="'+d+'"/>');
      out.push('<path d="'+d+'" stroke="'+col+'" stroke-width="2.5" fill="none" opacity="'+(c.ok?1:0.9)+'"/>');
      out.push('<path class="ap-flow" d="'+d+'" stroke="'+fl+'" stroke-width="2.5" fill="none"/>');
      var ang=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
      out.push('<polygon points="-7,-4 0,0 -7,4" fill="'+col+'" transform="translate('+b.x+','+b.y+') rotate('+ang+')"/>');
    });
    if(temp)out.push('<path d="'+wirePath({x:temp.x1,y:temp.y1},{x:temp.x2,y:temp.y2})+'" stroke="rgba(0,240,255,.85)" stroke-width="1.8" fill="none" stroke-dasharray="6,4"/>');
    svg.innerHTML=out.join('');
  }

  function hint(){if(ST.busy||ST.sandbox)return;clrIdle();ST.attempt.hint=true;
    var miss=ST.pz.correct.filter(function(e){return !ST.conns.some(function(c){return c.from===e[0]&&c.to===e[1];});})[0];
    if(!miss){msg('ok','All correct wires are in \u2014 remove any red ones and Run.');return;}
    clearArm();var po=$('apo-'+miss[0]),pi=$('api-'+miss[1]);if(po)po.classList.add('hint');if(pi)pi.classList.add('hint');
    var a=$('apn-'+miss[0]),b=$('apn-'+miss[1]);
    msg('tip','\ud83d\udca1 Connect <b>'+(a?a.querySelector('.ap-lbl').innerText:miss[0])+'</b> \u2192 <b>'+(b?b.querySelector('.ap-lbl').innerText:miss[1])+'</b>');
    setTimeout(function(){if(po)po.classList.remove('hint');if(pi)pi.classList.remove('hint');},2600);}

  function demo(){if(ST.busy||ST.sandbox)return;ST.busy=true;ST.attempt.demo=true;clearArm();hideTip();ST.conns=[];recompute();
    setBtns(true);msg('tip','\u25b6 Watch the pipeline build itself\u2026');startTimer();
    var seq=ST.pz.correct.slice(),k=0;
    (function step(){if(k>=seq.length){ST.busy=false;setBtns(false);setTimeout(run,400);return;}
      ST.conns.push({from:seq[k][0],to:seq[k][1],ok:true});popNodes(seq[k][0],seq[k][1]);snap();recompute();k++;setTimeout(step,500);})();}
  function setBtns(dis){['ap-hint-btn','ap-demo-btn','ap-reset-btn'].forEach(function(id){var b=$(id);if(b)b.disabled=dis;});}

  function startTimer(){if(ST.t0||ST.sandbox)return;ST.t0=Date.now();ST.tHandle=setInterval(function(){$('ap-timer').textContent=fmt(Date.now()-ST.t0);},250);}
  function stopTimer(){if(ST.tHandle){clearInterval(ST.tHandle);ST.tHandle=null;}var el=ST.t0?(Date.now()-ST.t0):0;ST.t0=0;return el;}
  function fmt(ms){var s=Math.floor(ms/1000);return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2);}

  function armIdle(){clrIdle();ST.idle=setTimeout(function(){if(ST.conns.length===0&&!ST.busy&&!ST.sandbox&&!ST.logic)msg('tip','Short on time? Tap \u25b6 <b>Watch it build</b> to see this automation run itself.');},15000);}
  function clrIdle(){if(ST.idle){clearTimeout(ST.idle);ST.idle=null;}}

  function muted(){return sessionStorage.getItem('jemMuted')!=='0';}
  function setSoundBtn(){var b=$('ap-sound');if(b){b.textContent=muted()?'\ud83d\udd07':'\ud83d\udd0a';b.setAttribute('aria-label',muted()?'Sound off':'Sound on');}}
  function tone(freqs,dur,vol){if(muted()||RM)return;try{var Ac=window.AudioContext||window.webkitAudioContext;if(!Ac)return;var ac=new Ac();
    freqs.forEach(function(f,i){var o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=f;o.connect(g);g.connect(ac.destination);
      var t=ac.currentTime+i*0.08;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol||0.14,t+0.01);g.gain.exponentialRampToValueAtTime(0.001,t+dur);o.start(t);o.stop(t+dur+0.02);});}catch(e){}}
  function snap(combo){var f=880*(1+Math.min((combo||1)-1,8)*0.06);tone([f],0.08,0.07);}
  function chime(){tone([523.25,659.25,783.99,1046.5],0.5,0.16);}

  function confetti(){if(RM)return;var box=$('ap-confetti');if(!box)return;box.innerHTML='';var cols=['#00f0ff','#9b4dff','#f7c843','#00ff88','#ff2d55'];
    for(var i=0;i<34;i++){var d=document.createElement('i');d.style.left=Math.random()*100+'%';d.style.background=cols[i%cols.length];d.style.animationDelay=(Math.random()*0.3)+'s';d.style.transform='rotate('+(Math.random()*360)+'deg)';box.appendChild(d);}
    setTimeout(function(){box.innerHTML='';},1600);}

  function run(){
    if(ST.logic)return runLogic();
    if(ST.sandbox)return runSandbox();
    var correct=ST.conns.filter(function(c){return c.ok;}).length,wrong=ST.conns.filter(function(c){return !c.ok;}).length;
    if(correct<ST.pz.correct.length){msg('err','Wire every connection first \u2014 try \ud83d\udca1 Hint or \u25b6 Watch.');return;}
    if(wrong>0){msg('err','Remove the red wire(s) before running.');return;}
    var elapsed=stopTimer();clrIdle();ST.lastTime=elapsed?fmt(elapsed):'';
    ST.pz.steps.forEach(function(s,i){var el=$('apst-'+i);if(el)el.className='ap-step fire';});
    ST.done[ST.pi]=true;var chk=$('ap-chk-'+ST.pi);if(chk)chk.classList.add('on');
    var rank=rankFor(ST.attempt,elapsed),best=saveScore(ST.pi,rank,elapsed);
    var rb=$('ap-ov-rank');rb.textContent=rank;rb.className='ap-rank r-'+rank;
    var m=meta();
    $('ap-ov-savings').innerHTML='\u23f1 Saves ~<b>'+(m.hrs||0)+' hrs/week</b> \u00b7 ~$'+(m.cost||0)+'/mo'+
      (elapsed?(' &nbsp;\u00b7&nbsp; '+fmt(elapsed)):'')+
      ' &nbsp;\u00b7&nbsp; Best: <b>'+best.rank+(best.ms?(' '+fmt(best.ms)):'')+'</b>';
    chime();confetti();
    checkBadges({rank:rank,hint:ST.attempt.hint,demo:ST.attempt.demo,ms:elapsed,first:true});
    var allDone=PG_PUZZLES.every(function(_,i){return ST.done[i];});
    if(allDone)checkBadges({allDone:true});
    var nb=$('ap-ov-next');nb.textContent=allDone?'\ud83c\udfc6 See your impact':'\u25b6 Next puzzle';nb.dataset.all=allDone?'1':'';nb.dataset.logic='';
    showOverlay('\u25b0\u25b0\u25b0 '+ST.pz.name+' \u2014 ONLINE','\u2699\ufe0f HOW IT WORKS\n\n'+explainWorkflow()+'\n\n\u2014\n'+ST.pz.win);
    liveBlueprint();
  }

  function liveBlueprint(){
    var key=(sessionStorage.getItem('jemApiKey')||window.API_KEY||'').trim();if(!key)return;
    var prompt='Generate a concrete automation blueprint for "'+ST.pz.name+'", nodes in order: '+
      ST.pz.nodes.map(function(n){return n.lbl.replace(/\n/g,' ');}).join(' \u2192 ')+
      '. Format: THE AUTOMATION, Tools, Trigger, Flow (numbered), Time saved, Complexity, one gotcha. Specific, no waffle.';
    apiCall(prompt,function(t){$('ap-ov-title').textContent='\u2705 '+ST.pz.name+' \u2014 live blueprint';$('ap-ov-body').textContent=t;});
  }

  function runSandbox(){
    if(ST.conns.length<1){msg('err','Wire at least one connection first.');return;}
    var edges=ST.conns.map(function(c){var f=(ST.pz.nodes||[]).filter(function(n){return n.id===c.from;})[0],t=(ST.pz.nodes||[]).filter(function(n){return n.id===c.to;})[0];return (f?f.lbl:c.from)+' \u2192 '+(t?t.lbl:c.to);});
    chime();confetti();checkBadges({sandbox:true});
    var rb=$('ap-ov-rank');rb.textContent='';rb.className='ap-rank';
    $('ap-ov-savings').innerHTML='\ud83e\uddea Your invention \u00b7 '+ST.conns.length+' connections';
    var nb=$('ap-ov-next');nb.textContent='\u25b6 Keep building';nb.dataset.all='';nb.dataset.logic='';
    var key=(sessionStorage.getItem('jemApiKey')||window.API_KEY||'').trim();
    showOverlay('\ud83e\uddea Sandbox analyzed',key?'Asking Claude to read your automation\u2026':('You wired:\n\n\u2022 '+edges.join('\n\u2022 ')+'\n\n\ud83d\udca1 Add an Anthropic API key in the banner and Run again \u2014 Claude will name your automation, rate it, and suggest one improvement.'));
    if(!key)return;
    var prompt='A user invented an automation by wiring these steps: '+edges.join('; ')+
      '. In under 140 words: (1) give it a punchy name, (2) describe in plain English what it would do, (3) rate it X/10, (4) suggest one concrete improvement. Be encouraging but honest.';
    apiCall(prompt,function(t){$('ap-ov-body').textContent=t;});
  }

  function apiCall(prompt,cb){
    var key=(sessionStorage.getItem('jemApiKey')||window.API_KEY||'').trim();if(!key)return;
    fetch((window.AI_ENDPOINT||'/api/claude'),{method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,messages:[{role:'user',content:prompt}]})})
      .then(function(r){return r.json();}).then(function(d){var t=(d.content&&d.content[0]&&d.content[0].text)?d.content[0].text:'';if(t)cb(t);})
      .catch(function(){});
  }

  function showOverlay(title,body){$('ap-ov-title').textContent=title;$('ap-ov-body').textContent=body;$('ap-overlay-el').classList.add('show');}

  function summary(){var hrs=0,cost=0,rows='';
    PG_PUZZLES.forEach(function(p,i){if(ST.done[i]){var m=PG_META[i]||{};hrs+=(m.hrs||0);cost+=(m.cost||0);var sc=scores()[i];
      rows+='<div class="ap-sum-row"><span>'+p.name+'</span><span>'+(sc?sc.rank+' \u00b7 ':'')+'~'+(m.hrs||0)+' hrs/wk</span></div>';}});
    $('ap-summary-body').innerHTML='<div class="ap-sum-big">~'+hrs+' hrs/week</div><div class="ap-sum-sub">\u2248 $'+cost+'/month in saved labour, across the four workflows you just built.</div>'+rows+
      '<div class="ap-sum-foot">These are the kinds of automations I build with n8n, Zapier and the Claude API. Let\u2019s talk.</div>';
    $('ap-overlay-el').classList.remove('show');$('ap-summary-el').classList.add('show');}

  function share(){var m=meta();var txt='I just built James Earl Medrano\u2019s "'+ST.pz.name+'" automation'+(ST.lastTime?(' in '+ST.lastTime):'')+
      ' \u2014 saves a team ~'+(m.hrs||0)+' hrs/week. Try the playground: jamesmedrano.netlify.app';
    var btn=$('ap-ov-share');function ok(){if(btn){var o=btn.textContent;btn.textContent='\u2713 Copied!';setTimeout(function(){btn.textContent=o;},1600);}}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok,function(){fb(txt);ok();});}else{fb(txt);ok();}}
  function fb(t){try{var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);}catch(e){}}

  function setMode(mode){if(ST.sandbox||ST.logic)return;ST.mode=mode;
    Array.prototype.forEach.call($('ap-mode').children,function(b){b.classList.toggle('on',b.dataset.mode===mode);});
    if(mode==='guided'){ST.conns=ST.conns.filter(function(c){return c.ok;});recompute();msg('neutral','\ud83c\udf93 Guided: wrong wires are blocked, so you can\u2019t get stuck.');}
    else{msg('neutral','\u26a1 Challenge: wrong wires turn red \u2014 tap them to delete.');}}
  function setView(view){ST.view=view;hideTip();
    Array.prototype.forEach.call($('ap-view').children,function(b){b.classList.toggle('on',b.dataset.view===view);});
    var auto=view==='auto'||ST.sandbox||ST.logic;
    $('ap-board-wrap').style.display=auto?'':'none';$('ap-status').style.display=auto?'':'none';
    $('ap-manual').hidden=auto||ST.sandbox;if(auto)setTimeout(draw,30);}

  /* ===== achievements / badges ===== */
  var BADGES=[
    {id:'first',ic:'\ud83d\udd0c',name:'Pipeline Initiate',desc:'Complete any automation.'},
    {id:'flawless',ic:'\u2b50',name:'Flawless',desc:'Earn an S rank.'},
    {id:'nohands',ic:'\u270b',name:'No Hands',desc:'Win with no Hint and no Watch.'},
    {id:'speed',ic:'\u26a1',name:'Speed Demon',desc:'Solve a puzzle under 30s.'},
    {id:'combo',ic:'\ud83d\udd25',name:'Combo x5',desc:'Chain 5 correct wires in a row.'},
    {id:'allfour',ic:'\ud83c\udfc6',name:'Full Stack',desc:'Complete all 4 workflows.'},
    {id:'ace',ic:'\ud83c\udf96\ufe0f',name:'Ace Operator',desc:'All 4 at rank A or better.'},
    {id:'inventor',ic:'\ud83e\uddea',name:'Inventor',desc:'Run your own Sandbox build.'},
    {id:'logician',ic:'\ud83e\udde9',name:'Logician',desc:'Solve a Logic Lab level.'}
  ];
  function badgesGot(){try{return JSON.parse(DB().getItem('jemBadges')||'{}');}catch(e){return {};}}
  function unlock(id){var g=badgesGot();if(g[id])return;g[id]=1;try{DB().setItem('jemBadges',JSON.stringify(g));}catch(e){}var bd=BADGES.filter(function(b){return b.id===id;})[0];if(bd)toast(bd);renderBadges();}
  function checkBadges(ctx){ctx=ctx||{};
    if(ctx.first)unlock('first');
    if(ctx.rank==='S')unlock('flawless');
    if(ctx.first&&!ctx.hint&&!ctx.demo)unlock('nohands');
    if(ctx.ms&&ctx.ms<30000)unlock('speed');
    if(ctx.combo&&ctx.combo>=5)unlock('combo');
    if(ctx.sandbox)unlock('inventor');
    if(ctx.logic)unlock('logician');
    if(ctx.allDone){unlock('allfour');var sc=scores();if(PG_PUZZLES.every(function(_,i){return sc[i]&&ORD[sc[i].rank]>=ORD.A;}))unlock('ace');}
  }
  function renderBadges(){var box=$('ap-badges');if(!box)return;var g=badgesGot();
    box.innerHTML='<div class="ap-badges-h">\ud83c\udfc5 Badges \u00b7 '+Object.keys(g).length+'/'+BADGES.length+'</div><div class="ap-badge-row">'+
      BADGES.map(function(b){var on=!!g[b.id];return '<div class="ap-badge'+(on?' on':'')+'" title="'+b.name+' \u2014 '+b.desc+'"><span class="ap-badge-ic">'+b.ic+'</span><span class="ap-badge-nm">'+(on?b.name:'\u2014 locked \u2014')+'</span></div>';}).join('')+'</div>';
  }
  function toast(b){var t=$('ap-toast');if(!t)return;var d=document.createElement('div');d.className='ap-toast-item';
    d.innerHTML='<span class="ap-toast-ic">'+b.ic+'</span><span><b>Badge unlocked</b><br>'+b.name+'</span>';
    t.appendChild(d);setTimeout(function(){d.classList.add('show');},20);
    setTimeout(function(){d.classList.remove('show');setTimeout(function(){if(d.parentNode)d.parentNode.removeChild(d);},420);},3200);}
  function comboFlash(id,n){if(RM)return;var el=$('apn-'+id);if(!el||!nodesEl)return;var f=document.createElement('div');f.className='ap-combo-flash';f.textContent='\ud83d\udd25 x'+n;
    f.style.left=el.style.left;f.style.top=el.style.top;nodesEl.appendChild(f);setTimeout(function(){if(f.parentNode)f.parentNode.removeChild(f);},820);}

  /* ===== Logic Lab ===== */
  function lblOf(id){var n=(ST.pz&&ST.pz.nodes||[]).filter(function(x){return x.id===id;})[0];return n?n.lbl.replace(/\n/g,' '):id;}
  function fmtArr(a){if(a===undefined||a===null)return '\u2014';if(!a.length)return '[ ]';return '['+a.map(function(x){return (x&&typeof x==='object')?('{'+Object.keys(x).map(function(k){return k+':'+x[k];}).join(',')+'}'):x;}).join(', ')+']';}
  function opDesc(n){switch(n.op){
    case 'source':return 'Emits the input data.';
    case 'filter_ge':return 'Keeps items where '+n.field+' \u2265 '+n.p+'.';
    case 'filter_lt':return 'Keeps items where '+n.field+' < '+n.p+'.';
    case 'sort_desc':return 'Sorts by '+n.field+', highest first.';
    case 'sort_asc':return 'Sorts by '+n.field+', lowest first.';
    case 'take':return 'Keeps only the first '+n.p+' items.';
    case 'dedup':return 'Removes duplicate '+n.field+'s (keeps first).';
    case 'pluck':return 'Replaces each item with its '+n.field+'.';
    case 'classify':return 'Keeps "'+n.cat+'" items, outputs their '+n.idField+'.';
    case 'sink':return 'Collects the result \u2014 must equal the target.';
    default:return '';}}
  function logicBest(li){try{return JSON.parse(DB().getItem('jemLogic')||'{}')[li];}catch(e){return null;}}
  function saveLogicBest(li,rank,wires){var s;try{s=JSON.parse(DB().getItem('jemLogic')||'{}');}catch(e){s={};}var cur=s[li];if(!cur||ORD[rank]>ORD[cur.rank]||(rank===cur.rank&&wires<cur.wires)){s[li]={rank:rank,wires:wires};try{DB().setItem('jemLogic',JSON.stringify(s));}catch(e){}}return s[li];}
  function buildLevels(active){var box=$('ap-levels');if(!box)return;box.style.display='';box.innerHTML='';
    LOGIC_LEVELS.forEach(function(lv,i){var b=document.createElement('button');b.className='ap-lvl'+(i===active?' on':'');b.type='button';b.textContent='Lv '+(i+1)+' \u00b7 '+lv.name;b.addEventListener('click',function(){if(!ST.busy)loadLogic(i);});box.appendChild(b);});}
  function loadLogic(li){
    ST.logic=true;ST.sandbox=false;ST.li=li;ST.conns=[];ST.src=null;ST.flowVals=null;
    stopTimer();$('ap-timer').textContent='0:00';clrIdle();
    setActiveTab(LOGIC_IDX);showControls(false);$('ap-status').style.display='';var plL=$('ap-palette');if(plL)plL.style.display='none';
    $('ap-need').parentNode.style.visibility='hidden';$('ap-manual').hidden=true;
    var lv=LOGIC_LEVELS[li];ST.pz={name:lv.name,nodes:lv.nodes,correct:[],steps:[]};
    buildLevels(li);
    var bst=logicBest(li);
    $('ap-stake').innerHTML='\ud83e\udde9 <b>Logic Lab \u00b7 Level '+(li+1)+'</b> \u2014 '+lv.brief+' <span class="ap-stk-save">Par '+lv.par+' wires.</span>'+(bst?(' <span style="opacity:.7">Best: '+bst.rank+' \u00b7 '+bst.wires+'w</span>'):'');
    var tgt=lv.nodes.filter(function(n){return n.op==='sink';}).map(function(n){return '<b>'+n.lbl.replace(/\n/g,' ')+'</b> = '+fmtArr(n.target);}).join('<br>');
    $('ap-steps-el').innerHTML=
      '<div class="ap-step lit" style="opacity:1"><div class="ap-n">\ud83d\udce5 INPUT ('+lv.input.length+' items)</div><div class="ap-d" style="word-break:break-word">'+fmtArr(lv.input)+'</div></div>'+
      '<div class="ap-step lit" style="opacity:1"><div class="ap-n">\ud83c\udfaf TARGET OUTPUT</div><div class="ap-d">'+tgt+'</div></div>'+
      '<div class="ap-step" style="opacity:1;border-color:rgba(247,200,67,.4)"><div class="ap-n">\ud83c\udfc6 PAR '+lv.par+'</div><div class="ap-d">Match the target with as few wires as possible. Hover a node to see its data after Run.</div></div>';
    setView('auto');render();recompute();
    msg('tip','\ud83e\udde9 Wire the nodes so each Output equals its target. Many routes work \u2014 fewest wires = best rank. Hover a node to learn what it does.');
  }
  function runLogic(){
    if(ST.conns.length<1){msg('err','Wire at least one connection first.');return;}
    var lv=LOGIC_LEVELS[ST.li],res=simulate(lv,ST.conns);ST.flowVals=res.memo;recompute();
    if(res.error){msg('err','\u26a0\ufe0f '+res.error);return;}
    if(!res.ok){var bad=res.results.filter(function(r){return !r.ok;})[0];
      if(bad){var sk=lv.nodes.filter(function(n){return n.lbl.replace(/\n/g,' ')===bad.lbl;})[0];if(sk)shakeNode(sk.id);
        msg('err','\u274c '+bad.lbl+' got '+fmtArr(bad.got)+' \u2014 needs '+fmtArr(bad.want)+'. Re-route it. (Hover nodes to see their data.)');}
      else msg('err','Output doesn\u2019t match yet \u2014 check your wiring.');
      return;}
    var wires=ST.conns.length,par=lv.par,rank=wires<=par?'S':(wires<=par+1?'A':'B');
    var best=saveLogicBest(ST.li,rank,wires);
    var rb=$('ap-ov-rank');rb.textContent=rank;rb.className='ap-rank r-'+rank;
    $('ap-ov-savings').innerHTML='\ud83c\udfaf Output matched \u00b7 <b>'+wires+'</b> wires (par '+par+') \u00b7 Best: <b>'+best.rank+' \u00b7 '+best.wires+'w</b>';
    chime();confetti();checkBadges({logic:true});
    var nb=$('ap-ov-next');nb.textContent=(ST.li+1<LOGIC_LEVELS.length)?'\u25b6 Next level':'\u21ba Replay level';nb.dataset.logic='1';nb.dataset.all='';
    showOverlay('\u2705 '+lv.name+' \u2014 SOLVED','\u2699\ufe0f HOW YOUR PIPELINE WORKS \u2014 the data at each stage:\n\n'+explainLogic()+'\n\nSeveral routes work; the fewest-wire solution earns rank S.');
  }

  /* ===== "how it works" explainers ===== */
  function explainWorkflow(){return ST.pz.nodes.map(function(n,i){var tip=(meta().tips||{})[n.id]||'';return (i+1)+'. '+n.lbl.replace(/\n/g,' ')+(tip?(' \u2014 '+tip):'');}).join('\n');}
  function byIdLv(id){return (ST.pz&&ST.pz.nodes||[]).filter(function(x){return x.id===id;})[0];}
  function pathToSink(sinkId){var inE={};ST.conns.forEach(function(c){inE[c.to]=c.from;});var chain=[],cur=sinkId,g=0;while(cur!==undefined&&g++<25){chain.unshift(cur);cur=inE[cur];}return chain;}
  function explainLogic(){var lv=LOGIC_LEVELS[ST.li];var sinks=lv.nodes.filter(function(n){return n.op==='sink';});
    return sinks.map(function(sk){var chain=pathToSink(sk.id);
      return chain.map(function(id){var n=byIdLv(id);var v=ST.flowVals?ST.flowVals[id]:undefined;return (n?n.lbl.replace(/\n/g,' '):id)+(v!==undefined?(': '+fmtArr(v)):'');}).join('  \u2192  ');}).join('\n\n');}

  /* ===== first-run guided tour ===== */
  var TI=0;
  var STEPS=[
    {title:'Welcome \ud83d\udc4b',body:'This is the Automation Playground \u2014 five ways to play with the automations I build. Take the 30-second tour?'},
    {sel:'#ap-tabs',title:'Five modes',body:'Four real workflows I\u2019ve built, a free-build Sandbox, and a Logic Lab puzzle. Switch tabs anytime.'},
    {sel:'.ap-port.out',title:'Cyan \u25b6 = output',body:'Every node pushes data out of its cyan port. Tap one to start a wire.'},
    {sel:'.ap-port.in',title:'Purple \u25c0 = input',body:'\u2026then tap a purple input on the next node to connect them. Or just drag between the two.'},
    {sel:'#ap-mode',title:'Pick your difficulty',body:'Guided blocks wrong wires so you can\u2019t get stuck. Challenge lets them go red so you learn by fixing them.'},
    {sel:'#ap-view',title:'See the value',body:'Flip to \u201cThe manual way\u201d to see the tedious human work this automation replaces.'},
    {sel:'#ap-hint-btn',title:'Never stuck',body:'Hint points to the next correct wire. \u201cWatch it build\u201d wires the whole thing and runs it for you.'},
    {sel:'#ap-run-btn',title:'Run it',body:'Wire it all up, then Run \u2014 you\u2019ll get a plain-English explanation of how the automation works.'},
    {sel:'.ap-tab-logic',title:'Logic Lab \ud83e\udde9',body:'When you want a real brain-teaser: route data through filters so the output matches a target.'},
    {title:'You\u2019re set \ud83d\ude80',body:'Have fun exploring. Tap the \u201c?\u201d button next to the speaker anytime to replay this tour.'}
  ];
  function tourSeen(){try{return DB().getItem('jemTour')==='1';}catch(e){return false;}}
  function markTour(){try{DB().setItem('jemTour','1');}catch(e){}}
  function buildTour(){
    if($('ap-tour'))return;
    var t=document.createElement('div');t.className='ap-tour';t.id='ap-tour';
    t.innerHTML='<div class="ap-tour-spot" id="ap-tour-spot"></div><div class="ap-tour-card" id="ap-tour-card"><h4></h4><p></p><div class="ap-tour-nav"><button class="ap-tour-skip" id="ap-tour-skip">Skip</button><span class="sp" id="ap-tour-count"></span><button class="ap-btn ap-ghost" id="ap-tour-back">Back</button><button class="ap-btn ap-run" id="ap-tour-next">Next</button></div></div>';
    document.getElementById('page-playground').appendChild(t);
    $('ap-tour-skip').addEventListener('click',endTour);
    $('ap-tour-back').addEventListener('click',function(){if(TI>0)tourStep(TI-1);});
    $('ap-tour-next').addEventListener('click',function(){if(TI<STEPS.length-1)tourStep(TI+1);else endTour();});
    window.addEventListener('resize',function(){var el=$('ap-tour');if(el&&el.style.display!=='none')tourStep(TI);});
  }
  function tourStep(i){
    TI=i;var st=STEPS[i],tour=$('ap-tour'),spot=$('ap-tour-spot'),card=$('ap-tour-card');
    var tgt=st.sel?document.querySelector('#page-playground '+st.sel):null;
    if(tgt){try{tgt.scrollIntoView({block:'nearest',inline:'center'});}catch(e){}}
    var r=tgt?tgt.getBoundingClientRect():null;
    if(r&&r.width>0){
      tour.style.background='transparent';spot.style.display='block';
      var pad=8;spot.style.left=(r.left-pad)+'px';spot.style.top=(r.top-pad)+'px';spot.style.width=(r.width+pad*2)+'px';spot.style.height=(r.height+pad*2)+'px';
      var cw=300,ch=160,below=r.bottom+12,top=(below+ch<window.innerHeight)?below:Math.max(10,r.top-ch-12);
      var left=Math.min(Math.max(10,r.left+r.width/2-cw/2),window.innerWidth-cw-10);
      card.style.transform='none';card.style.left=left+'px';card.style.top=top+'px';
    }else{
      spot.style.display='none';tour.style.background='rgba(3,5,12,.82)';
      card.style.left='50%';card.style.top='50%';card.style.transform='translate(-50%,-50%)';
    }
    card.querySelector('h4').textContent=st.title;card.querySelector('p').textContent=st.body;
    $('ap-tour-count').textContent=(i+1)+' / '+STEPS.length;
    $('ap-tour-back').style.visibility=i>0?'visible':'hidden';
    $('ap-tour-next').textContent=(i===STEPS.length-1)?'Done':'Next';
  }
  function startTour(force){if(!force&&tourSeen())return;if(ST.sandbox||ST.logic)load(0);buildTour();$('ap-tour').style.display='block';tourStep(0);}
  function endTour(){var t=$('ap-tour');if(t)t.style.display='none';markTour();}

  /* ===== Sandbox builder: palette + add/delete ===== */
  var sbxSeq=0;
  function buildPalette(){
    var box=$('ap-palette');if(!box)return;box.innerHTML='';
    SANDBOX_NODES.forEach(function(tpl){
      var b=document.createElement('button');b.type='button';b.className='ap-pal';b.style.setProperty('--pc',tpl.c);
      b.innerHTML='<span class="ap-pal-ic">'+tpl.ico+'</span>'+tpl.lbl.replace(/\n/g,' ');
      b.addEventListener('pointerdown',function(e){startPaletteDrag(tpl,e);});
      box.appendChild(b);
    });
  }
  function startPaletteDrag(tpl,e){
    e.preventDefault();var sx=e.clientX,sy=e.clientY,moved=false;
    function mv(ev){if(!moved&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>5)moved=true;}
    function up(ev){
      window.removeEventListener('pointermove',mv);window.removeEventListener('pointerup',up);
      var cr=canvas.getBoundingClientRect();
      var inB=ev.clientX>=cr.left&&ev.clientX<=cr.right&&ev.clientY>=cr.top&&ev.clientY<=cr.bottom;
      if(moved&&inB){addSandboxNode(tpl,Math.max(6,Math.min(94,(ev.clientX-cr.left)/cr.width*100)),Math.max(12,Math.min(88,(ev.clientY-cr.top)/cr.height*100)));}
      else{var i=ST.sbxNodes.length;addSandboxNode(tpl,10+(i%6)*14,26+(i%2)*16+(Math.floor(i/6)%2)*34);}
    }
    window.addEventListener('pointermove',mv);window.addEventListener('pointerup',up);
  }
  function addSandboxNode(tpl,x,y){
    if(!ST.sandbox)return;sbxSeq++;
    var inst={id:tpl.id+'_'+sbxSeq,lbl:tpl.lbl,ico:tpl.ico,c:tpl.c,x:x,y:y,out:tpl.out,inp:tpl.inp,tip:tpl.tip};
    ST.sbxNodes.push(inst);ST.pz.nodes=ST.sbxNodes;
    buildNode(inst);draw();recompute();hideTip();
    msg('ok','Added '+tpl.lbl.replace(/\n/g,' ')+'. Drag to move \u00b7 \u2715 to delete \u00b7 wire it up.');
  }
  function delNode(id){
    ST.sbxNodes=ST.sbxNodes.filter(function(n){return n.id!==id;});ST.pz.nodes=ST.sbxNodes;
    ST.conns=ST.conns.filter(function(c){return c.from!==id&&c.to!==id;});
    var el=$('apn-'+id);if(el&&el.parentNode)el.parentNode.removeChild(el);
    hideTip();recompute();msg('neutral','Removed node.');
  }
  function addDelBtn(d,id){
    var x=document.createElement('div');x.className='ap-del';x.innerHTML='\u2715';x.title='Delete node';
    x.addEventListener('pointerdown',function(e){e.stopPropagation();});
    x.addEventListener('click',function(e){e.stopPropagation();delNode(id);});
    d.appendChild(x);
  }

  /* ===== hire CTA ===== */
  var CTA_HREF='#contact'; /* EDIT: set to your Calendly link e.g. 'https://calendly.com/you/intro' */
  function gotoContact(e){
    if(e)e.preventDefault();
    $('ap-overlay-el').classList.remove('show');var su=$('ap-summary-el');if(su)su.classList.remove('show');
    if(/^https?:/i.test(CTA_HREF)){try{window.open(CTA_HREF,'_blank');}catch(_){}return;}
    var nav=document.querySelector('a[href="'+CTA_HREF+'"], [data-tab="contact"]');
    if(nav&&nav.click){try{nav.click();}catch(_){}}
    try{location.hash=CTA_HREF;}catch(_){}
    var sec=document.querySelector(CTA_HREF);if(sec&&sec.scrollIntoView)setTimeout(function(){try{sec.scrollIntoView({behavior:'smooth'});}catch(_){}}, 90);
  }

  function init(){
    nodesEl=$('ap-nodes-el');svg=$('ap-svg');canvas=$('ap-canvas-el');tabsEl=$('ap-tabs');tipEl=$('ap-tip');
    if(!nodesEl||!canvas||!tabsEl)return;
    buildTabs();setSoundBtn();renderBadges();
    $('ap-run-btn').addEventListener('click',run);
    $('ap-hint-btn').addEventListener('click',hint);
    $('ap-demo-btn').addEventListener('click',demo);
    $('ap-reset-btn').addEventListener('click',function(){if(!ST.busy)load(ST.pi);});
    $('ap-ov-share').addEventListener('click',share);
    $('ap-ov-next').addEventListener('click',function(){$('ap-overlay-el').classList.remove('show');if(this.dataset.logic==='1'){loadLogic((ST.li+1)%LOGIC_LEVELS.length);return;}if(this.dataset.all==='1')summary();else if(ST.sandbox){/*stay*/}else load((ST.pi+1)%PG_PUZZLES.length);});
    $('ap-summary-close').addEventListener('click',function(){$('ap-summary-el').classList.remove('show');});
    var cta1=$('ap-ov-cta');if(cta1)cta1.addEventListener('click',gotoContact);
    var cta2=$('ap-summary-cta');if(cta2)cta2.addEventListener('click',gotoContact);
    $('ap-sound').addEventListener('click',function(){sessionStorage.setItem('jemMuted',muted()?'0':'1');setSoundBtn();});
    var hb=$('ap-help');if(hb)hb.addEventListener('click',function(){startTour(true);});
    Array.prototype.forEach.call($('ap-mode').children,function(b){b.addEventListener('click',function(){if(!ST.busy)setMode(b.dataset.mode);});});
    Array.prototype.forEach.call($('ap-view').children,function(b){b.addEventListener('click',function(){setView(b.dataset.view);});});
    svg.addEventListener('click',function(e){var hh=e.target.closest&&e.target.closest('[data-wire]');if(hh&&!ST.busy)removeWire(+hh.getAttribute('data-wire'));});
    document.addEventListener('click',function(e){if(ST.src&&e.target.closest&&!e.target.closest('.ap-port'))armOutput(ST.src);});
    load(0);
    if(nodesEl.offsetParent!==null)setTimeout(function(){startTour(false);},650);
    var _sw=window.switchTab;window.switchTab=function(t){if(_sw)_sw(t);if(t==='playground'){if(!ST.pz)load(0);setTimeout(draw,60);setTimeout(function(){startTour(false);},650);}};
    window.addEventListener('resize',function(){if(ST.view==='auto'||ST.sandbox)draw();});
  }
  if(document.getElementById('ap-nodes-el'))init();else document.addEventListener('DOMContentLoaded',init);
})();
