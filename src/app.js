const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "disciplineQuestProfessional";
let moments = [];
let quotes = [];
let packs = [];
let state = loadState();

function loadState(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      streak: 0, longest: 0, xp: 0, days: {}, weights: [],
      cheatMonth: null, recentMoments: [], recentQuotes: []
    };
  }catch{
    return {streak:0,longest:0,xp:0,days:{},weights:[],cheatMonth:null,recentMoments:[],recentQuotes:[]};
  }
}

function save(){ 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); 
}

function localDateKey(date = new Date()){
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}

function monthKey(){ 
  return localDateKey().slice(0,7); 
}

function chooseNonRepeating(bank, historyKey, historySize){
  let options = bank.filter((_, index) => !state[historyKey].includes(index));
  if(!options.length) options = bank;
  const choice = options[Math.floor(Math.random()*options.length)];
  const index = bank.indexOf(choice);
  state[historyKey] = [index, ...state[historyKey].filter(x => x !== index)].slice(0, historySize);
  save();
  return choice;
}

function nextMoment(){ 
  return chooseNonRepeating(moments, "recentMoments", Math.min(4, Math.max(1,moments.length-1))); 
}

function nextQuote(){ 
  return chooseNonRepeating(quotes, "recentQuotes", 6); 
}

/**
 * Load JSON data files for moments, quotes, and hero packs
 */
async function loadData(){
  const [momentsResponse,quotesResponse,packsResponse] = await Promise.all([
    fetch("data/moments.json"), 
    fetch("data/quotes.json"), 
    fetch("data/packs.json")
  ]);
  moments = await momentsResponse.json();
  quotes = await quotesResponse.json();
  packs = await packsResponse.json();
}

/**
 * Display a hero moment modal with image, quote, and motivational text
 * @param {string} title - The heading for the moment
 * @param {boolean} failure - Whether this is a failure/accountability moment
 */
function showMoment(title, failure = false){
  const moment = failure ? moments[0] : nextMoment();
  $("momentImage").src = moment.image;
  $("momentTitle").textContent = title;
  $("momentQuote").textContent = failure
    ? "You slipped. Own it without excuses. One bad decision does not get to become a pattern."
    : nextQuote();
  $("momentHero").textContent = failure ? "ACCOUNTABILITY MODE" : moment.hero;
  $("momentModal").classList.remove("hidden");
  playSound(failure);
}

/**
 * Play procedural sound effects using Web Audio API
 * Success: ascending frequencies, Failure: descending frequencies
 * @param {boolean} failure - Whether to play failure sound
 */
function playSound(failure){
  try{
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const notes = failure ? [220,185,147] : [523,659,784,1047];
    notes.forEach((frequency,index)=>{
      const oscillator=context.createOscillator();
      const gain=context.createGain();
      oscillator.type="square"; 
      oscillator.frequency.value=frequency; 
      gain.gain.value=.035;
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(context.currentTime+index*.12);
      oscillator.stop(context.currentTime+index*.12+.13);
    });
  }catch{}
}

/**
 * Render all UI elements based on current game state
 */
function render(){
  const now = new Date();
  $("dateLabel").textContent = now.toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"short"});
  $("streakTop").textContent = state.streak;
  $("currentStreak").textContent = `${state.streak} day${state.streak===1?"":"s"}`;
  $("longestStreak").textContent = `${state.longest} day${state.longest===1?"":"s"}`;
  
  const level = Math.floor(state.xp/500)+1;
  const xpInLevel = state.xp%500;
  $("level").textContent = level;
  $("xp").textContent = `${xpInLevel} / 500`;
  $("xpFill").style.width = `${xpInLevel/5}%`;
  
  const cheatUsed = state.cheatMonth === monthKey();
  $("cheatStatus").textContent = cheatUsed ? "Used this month" : "Available";
  $("cheatDescription").textContent = cheatUsed ? "No more cheat days until next month." : "Use it intentionally, not impulsively.";
  $("cheatButton").disabled = cheatUsed;
  $("cheatButton").textContent = cheatUsed ? "Already Used" : "Use Cheat Day";
  
  if(state.weights.length){
    const first=state.weights[0], last=state.weights.at(-1);
    const difference=(last.weight-first.weight).toFixed(1);
    $("weightSummary").textContent=`Latest: ${last.weight.toFixed(1)} kg · Total change: ${difference>0?"+":""}${difference} kg`;
  }
  
  $("galleryCount").textContent = `${moments.length} moments`;
  $("gallery").innerHTML = moments.map(moment => `
    <article>
      <img src="${moment.image}" alt="${moment.hero}">
      <div><h3>${moment.hero}</h3><p>${moment.title}</p></div>
    </article>`).join("");
}

/**
 * Update the live clock and time-based quest messages
 * Runs every second to reflect Sydney timezone
 */
function updateClock(){
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-AU",{
    timeZone:"Australia/Sydney",weekday:"short",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false
  }).formatToParts(new Date()).map(part=>[part.type,part.value]));
  
  const hour=Number(parts.hour), minute=Number(parts.minute);
  $("liveClock").textContent=`${parts.hour}:${parts.minute}:${parts.second}`;
  
  let message="Day quest active — protect today's mission.";
  if(parts.weekday==="Fri" && hour===18 && minute>=45) message="Friday weigh-in time.";
  else if(hour>=18) message="Kitchen closed. No more food until tomorrow.";
  else if(hour>=16) message="OMAD check-in time.";
  else if(hour>=7) message="Today's quest is underway.";
  else message="Your 7:00 am readiness check is approaching.";
  
  $("timeMessage").textContent=message;
  $("modeHeading").textContent=message;
}

// ============================================
// EVENT LISTENERS
// ============================================

$("continueButton").addEventListener("click",()=>{
  $("titleScreen").classList.add("hidden");
  $("app").classList.remove("hidden");
});

$("readyButton").addEventListener("click",()=>showMoment("Ready for the day!"));
$("helpButton").addEventListener("click",()=>showMoment("You can do it!"));

$("successButton").addEventListener("click",()=>{
  const key=localDateKey();
  if(state.days[key]!=="success"){
    state.streak+=1; 
    state.longest=Math.max(state.longest,state.streak); 
    state.xp+=150;
  }
  state.days[key]="success"; 
  save(); 
  render(); 
  showMoment("Victory!");
});

$("failureButton").addEventListener("click",()=>{
  state.days[localDateKey()]="failure"; 
  state.streak=0; 
  save(); 
  render(); 
  showMoment("Face It. Reset. Continue.",true);
});

$("cheatButton").addEventListener("click",()=>{
  if(confirm("Use your one cheat day for this month?")){
    state.cheatMonth=monthKey(); 
    save(); 
    render(); 
    showMoment("Cheat Day Activated");
  }
});

$("weightForm").addEventListener("submit",(event)=>{
  event.preventDefault();
  const weight=Number($("weightInput").value);
  if(!Number.isFinite(weight)) return;
  state.weights.push({date:new Date().toLocaleDateString(),weight});
  $("weightInput").value=""; 
  save(); 
  render();
});

$("closeModal").addEventListener("click",()=>$("momentModal").classList.add("hidden"));
$("continueModal").addEventListener("click",()=>$("momentModal").classList.add("hidden"));

$("notificationsButton").addEventListener("click",async()=>{
  if(!("Notification" in window)){ 
    alert("Notifications are not supported by this browser."); 
    return; 
  }
  const permission=await Notification.requestPermission();
  $("notificationsButton").textContent=permission==="granted"?"Alerts Enabled":"Alerts Blocked";
});

// ============================================
// INITIALIZATION
// ============================================

/**
 * Boot the application:
 * 1. Load JSON data
 * 2. Render initial UI
 * 3. Start live clock updates
 * 4. Register service worker for PWA support
 */
async function boot(){
  await loadData();
  render();
  updateClock();
  setInterval(updateClock,1000);
  if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
}

boot();
