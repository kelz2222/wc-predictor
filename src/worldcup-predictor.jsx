import { useState, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const MATCHES = [
  { id:1, group:"A", home:"🇧🇷 Brazil",    away:"🇦🇷 Argentina",  date:"Jun 14", time:"18:00", venue:"MetLife Stadium" },
  { id:2, group:"A", home:"🇫🇷 France",    away:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",   date:"Jun 14", time:"21:00", venue:"SoFi Stadium" },
  { id:3, group:"B", home:"🇩🇪 Germany",   away:"🇪🇸 Spain",      date:"Jun 15", time:"15:00", venue:"AT&T Stadium" },
  { id:4, group:"B", home:"🇵🇹 Portugal",  away:"🇳🇱 Netherlands",date:"Jun 15", time:"18:00", venue:"Rose Bowl" },
  { id:5, group:"C", home:"🇺🇸 USA",       away:"🇯🇵 Japan",      date:"Jun 16", time:"15:00", venue:"Levi's Stadium" },
  { id:6, group:"C", home:"🇲🇦 Morocco",   away:"🇸🇳 Senegal",    date:"Jun 16", time:"18:00", venue:"Hard Rock Stadium" },
  { id:7, group:"D", home:"🇮🇹 Italy",     away:"🇭🇷 Croatia",    date:"Jun 17", time:"15:00", venue:"Gillette Stadium" },
  { id:8, group:"D", home:"🇧🇪 Belgium",   away:"🇩🇰 Denmark",    date:"Jun 17", time:"18:00", venue:"Lincoln Financial" },
];
const RESULTS = { 1:{home:3,away:1}, 2:{home:2,away:2}, 3:{home:1,away:2} };
const AVATARS = ["🦁","🐯","🦊","🦅","🐉","🐺","🦈","🐻","🦋","🦁","🎯","⚡"];
const LEADERBOARD_DATA = [
  { name:"GoalKing99",   avatar:"🦁", points:147, streak:5, badges:["🔥","⚡","👑"], correct:18, perfect:4 },
  { name:"TikiTaka",     avatar:"🐯", points:132, streak:3, badges:["🔥","⚡"],      correct:16, perfect:3 },
  { name:"OffsideTrap",  avatar:"🦊", points:119, streak:2, badges:["🔥"],           correct:14, perfect:2 },
  { name:"PressureCook", avatar:"🦅", points:105, streak:0, badges:["⚡"],           correct:13, perfect:1 },
  { name:"NinetyPlus",   avatar:"🐉", points:98,  streak:1, badges:[],              correct:12, perfect:1 },
  { name:"DarkHorse77",  avatar:"🐺", points:87,  streak:2, badges:["🔥"],           correct:10, perfect:2 },
  { name:"PenaltyKing",  avatar:"🦈", points:74,  streak:0, badges:[],              correct:9,  perfect:0 },
  { name:"FreekickFred", avatar:"🐻", points:61,  streak:1, badges:[],              correct:8,  perfect:1 },
];
const CHALLENGES = [
  { id:1, icon:"🎯", title:"Sharpshooter",   desc:"Get 5 correct results",           pts:50,  goal:5,  key:"correct" },
  { id:2, icon:"🔥", title:"On Fire",        desc:"3 correct predictions in a row",  pts:30,  goal:3,  key:"streak" },
  { id:3, icon:"💎", title:"Perfect Prophet",desc:"Get an exact scoreline right",     pts:75,  goal:1,  key:"perfect" },
  { id:4, icon:"🐎", title:"Dark Horse",     desc:"Predict an upset correctly",       pts:100, goal:1,  key:"upset" },
  { id:5, icon:"📊", title:"Group Guru",     desc:"Predict all 6 Group A matches",    pts:120, goal:6,  key:"groupA" },
  { id:6, icon:"👑", title:"World Champion", desc:"Top the leaderboard for 3 days",   pts:500, goal:3,  key:"topDays" },
];
const PLANS = [
  { id:"free",  label:"Free",    price:0,   color:"rgba(255,255,255,0.1)",  features:["6 predictions/round","Public leaderboard","Basic badges"] },
  { id:"pro",   label:"Pro",     price:4.99,color:"rgba(0,200,80,0.15)",    features:["Unlimited predictions","Private leagues","AI match tips","Share card","Priority support"], popular:true },
  { id:"elite", label:"Elite",   price:14.99,color:"rgba(255,215,0,0.12)", features:["Everything in Pro","Prize pool entry","Analytics dashboard","Custom avatar","Early access"] },
];

// ─── STORAGE ─────────────────────────────────────────────────────────────────
const load = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]         = useState("onboard");
  const [tab, setTab]               = useState("predict");
  const [user, setUser]             = useState(() => load("wc_user", null));
  const [predictions, setPredictions] = useState(() => load("wc_preds", {}));
  const [submitted, setSubmitted]   = useState(() => load("wc_submitted", {}));
  const [inputVals, setInputVals]   = useState({});
  const [userPoints, setUserPoints] = useState(() => load("wc_points", 0));
  const [correctCount, setCorrectCount] = useState(() => load("wc_correct", 0));
  const [perfectCount, setPerfectCount] = useState(() => load("wc_perfect", 0));
  const [streak, setStreak]         = useState(() => load("wc_streak", 0));
  const [confetti, setConfetti]     = useState(false);
  const [toast, setToast]           = useState(null);
  const [shareModal, setShareModal] = useState(null);
  const [leagueModal, setLeagueModal] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [aiTip, setAiTip]           = useState({});
  const [loadingTip, setLoadingTip] = useState({});
  const [league, setLeague]         = useState(() => load("wc_league", null));
  const [leagueCode, setLeagueCode] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [plan, setPlan]             = useState(() => load("wc_plan", "free"));
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [onboardName, setOnboardName] = useState("");
  const [onboardAvatar, setOnboardAvatar] = useState("🦁");
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installBanner, setInstallBanner] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [iosBanner, setIosBanner] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
      setIsInstalled(true); return;
    }
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIos(ios);
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setInstallBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    if (ios) setTimeout(() => setIosBanner(true), 4000);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setInstallBanner(false);
      showToast("🎉 App installed! Find it on your home screen");
    }
    setInstallPrompt(null);
  };

  useEffect(() => { if (user) setScreen("main"); }, [user]);
  useEffect(() => { save("wc_preds", predictions); },   [predictions]);
  useEffect(() => { save("wc_submitted", submitted); }, [submitted]);
  useEffect(() => { save("wc_points", userPoints); },   [userPoints]);
  useEffect(() => { save("wc_correct", correctCount); },[correctCount]);
  useEffect(() => { save("wc_perfect", perfectCount); },[perfectCount]);
  useEffect(() => { save("wc_streak", streak); },       [streak]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleScoreInput = (matchId, side, val) => {
    const newVals = { ...inputVals, [`${matchId}_${side}`]: val };
    setInputVals(newVals);
    const homeVal = side === "home" ? val : (newVals[`${matchId}_home`] ?? "");
    const awayVal = side === "away" ? val : (newVals[`${matchId}_away`] ?? "");
    if (homeVal !== "" && awayVal !== "") {
      setPredictions(p => ({ ...p, [matchId]: { home: parseInt(homeVal)||0, away: parseInt(awayVal)||0 } }));
    }
  };

  const submitPrediction = (matchId) => {
    if (!predictions[matchId]) { showToast("Enter a score first!", "error"); return; }
    setSubmitted(s => ({ ...s, [matchId]: true }));
    const result = RESULTS[matchId];
    if (result) {
      const pred = predictions[matchId];
      if (pred.home === result.home && pred.away === result.away) {
        const pts = 10;
        setUserPoints(p => p + pts);
        setPerfectCount(p => p + 1);
        setCorrectCount(p => p + 1);
        setStreak(s => s + 1);
        showToast(`🎯 PERFECT SCORE! +${pts} pts`, "perfect");
        setConfetti(true); setTimeout(() => setConfetti(false), 3000);
        setShareModal({ type:"perfect", match: MATCHES.find(m=>m.id===matchId), pred, result, pts });
      } else if (
        (pred.home > pred.away && result.home > result.away) ||
        (pred.away > pred.home && result.away > result.home) ||
        (pred.home === pred.away && result.home === result.away)
      ) {
        const pts = 5;
        setUserPoints(p => p + pts);
        setCorrectCount(p => p + 1);
        setStreak(s => s + 1);
        showToast(`✅ Correct result! +${pts} pts`);
      } else {
        setStreak(0);
        showToast("❌ Wrong prediction. Keep going!", "error");
      }
    } else {
      showToast("🔒 Locked in! Good luck!", "success");
    }
  };

  const fetchAiTip = async (match) => {
    if (plan === "free") { setUpgradeModal(true); return; }
    if (aiTip[match.id] || loadingTip[match.id]) return;
    setLoadingTip(l => ({ ...l, [match.id]: true }));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 180,
          messages: [{
            role: "user",
            content: `You are a football pundit. Give a sharp 2-sentence prediction tip for: ${match.home.replace(/\p{Emoji}/u,'')} vs ${match.away.replace(/\p{Emoji}/u,'')}. Include likely scoreline, key factor. Be bold and fun. End with a confidence emoji (🔥/⚡/🎯).`
          }]
        })
      });
      const data = await res.json();
      const tip = data.content?.[0]?.text || "Expect a tight contest — both sides in form!";
      setAiTip(t => ({ ...t, [match.id]: tip }));
    } catch {
      setAiTip(t => ({ ...t, [match.id]: "Both teams are evenly matched — this one could go either way. Watch the midfield battle! ⚡" }));
    }
    setLoadingTip(l => ({ ...l, [match.id]: false }));
  };

  const createLeague = () => {
    const code = Math.random().toString(36).substring(2,8).toUpperCase();
    const l = { code, name: leagueName || "My League", members: [user.name], creator: user.name };
    setLeague(l); save("wc_league", l);
    setLeagueModal(false);
    showToast(`🏟️ League "${l.name}" created! Code: ${code}`);
  };

  const joinLeague = () => {
    const l = { code: leagueCode, name: `League ${leagueCode}`, members: [user.name, "GoalKing99", "TikiTaka"], creator: "GoalKing99" };
    setLeague(l); save("wc_league", l);
    setLeagueModal(false);
    showToast(`✅ Joined league ${leagueCode}!`);
  };

  const completeOnboard = () => {
    if (!onboardName.trim()) { showToast("Enter your name!", "error"); return; }
    const u = { name: onboardName.trim(), avatar: onboardAvatar, joined: new Date().toISOString() };
    setUser(u); save("wc_user", u); setScreen("main");
  };

  const lbData = [
    ...LEADERBOARD_DATA,
    { name: user?.name || "You", avatar: user?.avatar || "⭐", points: userPoints, streak, badges: [], correct: correctCount, perfect: perfectCount, isUser: true }
  ].sort((a,b) => b.points - a.points);

  const userRank = lbData.findIndex(p => p.isUser) + 1;

  if (screen === "onboard") return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#080c14", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", position:"relative", overflow:"hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <GlowBg />
      <style>{GLOBAL_CSS}</style>
      <div style={{ width:"100%", maxWidth:"400px", position:"relative", zIndex:10 }}>
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <div style={{ fontSize:"64px", marginBottom:"8px" }}>⚽</div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"48px", margin:"0 0 8px", letterSpacing:"3px", background:"linear-gradient(135deg,#fff 40%,#ffd700)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>WORLD CUP 2026</h1>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"14px", margin:0 }}>Predict matches · Beat friends · Win prizes</p>
        </div>
        <div className="card" style={{ padding:"28px" }}>
          <div style={{ marginBottom:"20px" }}>
            <label style={{ display:"block", fontSize:"11px", letterSpacing:"2px", color:"rgba(255,255,255,0.4)", marginBottom:"8px" }}>YOUR NAME</label>
            <input
              value={onboardName} onChange={e => setOnboardName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && completeOnboard()}
              placeholder="Enter your name..."
              style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"10px", padding:"12px 14px", color:"#fff", fontSize:"16px", outline:"none", boxSizing:"border-box" }}
            />
          </div>
          <div style={{ marginBottom:"24px" }}>
            <label style={{ display:"block", fontSize:"11px", letterSpacing:"2px", color:"rgba(255,255,255,0.4)", marginBottom:"10px" }}>PICK YOUR AVATAR</label>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"8px" }}>
              {AVATARS.map(a => (
                <button key={a} onClick={() => setOnboardAvatar(a)} style={{ background: onboardAvatar===a ? "rgba(0,200,80,0.25)" : "rgba(255,255,255,0.05)", border: onboardAvatar===a ? "2px solid #00c850" : "2px solid transparent", borderRadius:"10px", padding:"8px", fontSize:"22px", cursor:"pointer", transition:"all 0.15s" }}>{a}</button>
              ))}
            </div>
          </div>
          <button className="btn-primary" style={{ width:"100%", padding:"14px", fontSize:"17px" }} onClick={completeOnboard}>
            START PREDICTING →
          </button>
          <p style={{ textAlign:"center", fontSize:"11px", color:"rgba(255,255,255,0.25)", marginTop:"12px", marginBottom:0 }}>Free to play · No credit card needed</p>
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:"24px", marginTop:"20px" }}>
          {[["1,247","PLAYERS"],["$350","PRIZE POOL"],["48","MATCHES"]].map(([v,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", color:"#00c850" }}>{v}</div>
              <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)", letterSpacing:"2px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#080c14", minHeight:"100vh", color:"#fff", position:"relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <style>{GLOBAL_CSS}</style>
      <GlowBg />
      <Confetti active={confetti} />
      {toast && <Toast toast={toast} />}

      {installBanner && !isInstalled && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:300, background:"linear-gradient(135deg,#0d1f12,#0a1a1e)", borderTop:"1px solid rgba(0,200,80,0.3)", padding:"14px 16px", display:"flex", alignItems:"center", gap:"12px", boxShadow:"0 -8px 32px rgba(0,0,0,0.5)", animation:"slideUp 0.4s ease" }}>
          <div style={{ fontSize:"36px", flexShrink:0 }}>📲</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"17px", letterSpacing:"1px", color:"#fff" }}>INSTALL THE APP</div>
            <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)", marginTop:"1px" }}>Add to home screen — works offline, loads instantly</div>
          </div>
          <div style={{ display:"flex", gap:"8px", flexShrink:0 }}>
            <button className="btn-primary" style={{ padding:"9px 18px", fontSize:"13px", whiteSpace:"nowrap" }} onClick={handleInstall}>Install</button>
            <button onClick={() => setInstallBanner(false)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:"20px", padding:"4px 6px", lineHeight:1 }}>✕</button>
          </div>
        </div>
      )}

      {isIos && iosBanner && !isInstalled && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:300, background:"linear-gradient(135deg,#0d1420,#0a1230)", borderTop:"1px solid rgba(0,150,255,0.3)", padding:"16px", boxShadow:"0 -8px 32px rgba(0,0,0,0.5)", animation:"slideUp 0.4s ease" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px" }}>
            <div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"17px", letterSpacing:"1px" }}>📲 ADD TO HOME SCREEN</div>
              <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)", marginTop:"2px" }}>Install this app in 2 taps — no App Store needed</div>
            </div>
            <button onClick={() => setIosBanner(false)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:"20px", padding:"0 0 0 10px", lineHeight:1, flexShrink:0 }}>✕</button>
          </div>
          <div style={{ display:"flex", alignItems:"stretch" }}>
            {[
              { icon:"⬆️", text: <>Tap <b style={{color:"#00aaff"}}>Share</b> in Safari</> },
              { icon:"➕", text: <>Tap <b style={{color:"#00aaff"}}>"Add to Home Screen"</b></> },
              { icon:"✅", text: <>Tap <b style={{color:"#00c850"}}>"Add"</b> — done!</> },
            ].map((s, i) => (
              <div key={i} style={{ flex:1, background:"rgba(255,255,255,0.05)", borderRadius: i===0?"10px 0 0 10px":i===2?"0 10px 10px 0":"0", border:"1px solid rgba(255,255,255,0.07)", borderLeft: i>0?"none":undefined, padding:"10px 8px", textAlign:"center" }}>
                <div style={{ fontSize:"20px", marginBottom:"4px" }}>{s.icon}</div>
                <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.5)", lineHeight:1.4 }}>{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ position:"relative", zIndex:10, background:"rgba(8,12,20,0.8)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"12px 16px" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:"2px", lineHeight:1 }}>⚽ WC PREDICTOR</div>
            <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.35)", letterSpacing:"1px" }}>FIFA WORLD CUP 2026</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            {!isInstalled && !installBanner && installPrompt && (
              <button onClick={handleInstall} style={{ background:"rgba(0,200,80,0.12)", border:"1px solid rgba(0,200,80,0.25)", color:"#00c850", padding:"6px 12px", borderRadius:"8px", cursor:"pointer", fontSize:"11px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"1px" }}>📲 INSTALL</button>
            )}
            {!isInstalled && isIos && !iosBanner && (
              <button onClick={() => setIosBanner(true)} style={{ background:"rgba(0,150,255,0.12)", border:"1px solid rgba(0,150,255,0.25)", color:"#00aaff", padding:"6px 12px", borderRadius:"8px", cursor:"pointer", fontSize:"11px", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"1px" }}>📲 INSTALL</button>
            )}
            {isInstalled && (
              <div style={{ fontSize:"11px", background:"rgba(0,200,80,0.1)", border:"1px solid rgba(0,200,80,0.2)", color:"#00c850", padding:"5px 10px", borderRadius:"8px" }}>✅ Installed</div>
            )}
            {plan === "free" && (
              <button className="btn-gold" style={{ padding:"6px 14px", fontSize:"12px" }} onClick={() => setUpgradeModal(true)}>⚡ GO PRO</button>
            )}
            <div style={{ display:"flex", alignItems:"center", gap:"8px", background:"rgba(0,200,80,0.12)", border:"1px solid rgba(0,200,80,0.2)", borderRadius:"10px", padding:"6px 12px" }}>
              <span style={{ fontSize:"20px" }}>{user?.avatar}</span>
              <div>
                <div style={{ fontSize:"12px", fontWeight:600 }}>{user?.name}</div>
                <div style={{ fontSize:"10px", color:"#00c850" }}>{userPoints} pts · #{userRank}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position:"relative", zIndex:10, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", padding:"12px 16px", display:"flex", gap:"20px", overflowX:"auto" }}>
          {[
            { label:"POINTS",  value:userPoints,   color:"#00c850", icon:"⭐" },
            { label:"CORRECT", value:correctCount, color:"#00aaff", icon:"✅" },
            { label:"PERFECT", value:perfectCount, color:"#ffd700", icon:"🎯" },
            { label:"STREAK",  value:streak,       color:"#ff6400", icon:"🔥" },
            { label:"RANK",    value:`#${userRank}`,color:"#ff69b4", icon:"🏆" },
          ].map(s => (
            <div key={s.label} style={{ textAlign:"center", minWidth:"56px" }}>
              <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)", letterSpacing:"1.5px", marginBottom:"2px" }}>{s.icon} {s.label}</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", color:s.color, lineHeight:1 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:"sticky", top:0, zIndex:20, background:"rgba(8,12,20,0.95)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", overflowX:"auto" }}>
          {[["predict","⚽ PREDICT"],["leaderboard","🏆 BOARD"],["leagues","🏟️ LEAGUES"],["rewards","🎁 REWARDS"],["upgrade","💎 PRO"]].map(([t,label]) => (
            <button key={t} className={`tab-btn ${tab===t?"active":""}`} onClick={() => setTab(t)}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ position:"relative", zIndex:10, maxWidth:"680px", margin:"0 auto", padding:"16px 16px 80px" }}>

        {tab === "predict" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
              <div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1px" }}>GROUP STAGE</div>
                <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>🎯 Exact score = 10pts · ✅ Correct result = 5pts</div>
              </div>
              <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)", textAlign:"right" }}>
                <div style={{ color:"#00c850", fontWeight:700 }}>{Object.keys(submitted).length}/{MATCHES.length}</div>
                <div>locked in</div>
              </div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"4px", height:"4px", marginBottom:"20px", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${(Object.keys(submitted).length/MATCHES.length)*100}%`, background:"linear-gradient(90deg,#00c850,#00ff88)", transition:"width 0.5s ease", borderRadius:"4px" }} />
            </div>
            {MATCHES.map(m => (
              <MatchCard key={m.id} match={m} prediction={predictions[m.id]} submitted={submitted[m.id]}
                result={RESULTS[m.id]} inputVals={inputVals} aiTip={aiTip[m.id]} loadingTip={loadingTip[m.id]}
                onScoreInput={handleScoreInput} onSubmit={submitPrediction} onAiTip={fetchAiTip} plan={plan} />
            ))}
          </div>
        )}

        {tab === "leaderboard" && (
          <div>
            <div style={{ marginBottom:"16px" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1px" }}>GLOBAL RANKINGS</div>
              <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>Updated in real-time · Top 3 win prizes</div>
            </div>
            <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-end", gap:"10px", marginBottom:"24px", padding:"20px 0" }}>
              {[lbData[1], lbData[0], lbData[2]].map((p, i) => {
                const heights = [90,110,75];
                const medals = ["🥈","🥇","🥉"];
                const colors = ["#c0c0c0","#ffd700","#cd7f32"];
                return p ? (
                  <div key={p.name} style={{ textAlign:"center", flex:1 }}>
                    <div style={{ fontSize:"28px", marginBottom:"4px" }}>{p.avatar}</div>
                    <div style={{ background: p.isUser ? "rgba(0,200,80,0.2)" : "rgba(255,255,255,0.06)", border:`2px solid ${colors[i]}40`, borderRadius:"12px 12px 0 0", height:`${heights[i]}px`, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"8px" }}>
                      <div style={{ fontSize:"20px" }}>{medals[i]}</div>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", letterSpacing:"1px", color:colors[i] }}>{p.points}</div>
                    </div>
                    <div style={{ fontSize:"11px", fontWeight:600, color: p.isUser ? "#00c850" : "#fff", marginTop:"6px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                  </div>
                ) : <div key={i} style={{ flex:1 }} />;
              })}
            </div>
            {lbData.map((p, i) => (
              <div key={p.name} className="card" style={{ padding:"14px 16px", marginBottom:"8px", display:"flex", alignItems:"center", gap:"12px", border: p.isUser ? "1px solid rgba(0,200,80,0.35)" : undefined, background: p.isUser ? "rgba(0,200,80,0.05)" : undefined, animation:`slideIn 0.25s ease ${i*0.04}s both` }}>
                <div style={{ minWidth:"28px", textAlign:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", color:i<3?["#ffd700","#c0c0c0","#cd7f32"][i]:"rgba(255,255,255,0.3)" }}>
                  {i<3 ? ["🥇","🥈","🥉"][i] : `#${i+1}`}
                </div>
                <div style={{ fontSize:"26px" }}>{p.avatar}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:600, fontSize:"14px", color: p.isUser?"#00c850":"#fff", display:"flex", alignItems:"center", gap:"6px" }}>
                    {p.name}{p.isUser?" (You)":""}
                    {p.streak>1 && <span style={{ fontSize:"11px", background:"rgba(255,100,0,0.2)", color:"#ff6400", padding:"2px 7px", borderRadius:"20px" }}>🔥{p.streak}</span>}
                  </div>
                  <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.35)", marginTop:"2px" }}>✅ {p.correct} correct · 🎯 {p.perfect} perfect</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"24px", color:i===0?"#ffd700":"#fff" }}>{p.points}</div>
                  <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)", letterSpacing:"1px" }}>PTS</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "leagues" && (
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1px", marginBottom:"4px" }}>PRIVATE LEAGUES</div>
            <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", marginBottom:"20px" }}>Compete with your crew · Share the code · Crown a champion</div>
            {!league ? (
              <div style={{ display:"grid", gap:"12px" }}>
                <div className="card" style={{ padding:"24px" }}>
                  <div style={{ fontSize:"32px", marginBottom:"8px" }}>🏟️</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1px", marginBottom:"6px" }}>CREATE A LEAGUE</div>
                  <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.45)", marginBottom:"16px" }}>Set it up, share the code with friends, track who's the real genius</div>
                  <input value={leagueName} onChange={e=>setLeagueName(e.target.value)} placeholder="League name (e.g. Work Mates 2026)" style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"10px", padding:"11px 14px", color:"#fff", fontSize:"14px", outline:"none", boxSizing:"border-box", marginBottom:"12px" }} />
                  <button className="btn-primary" style={{ width:"100%", padding:"12px" }} onClick={createLeague}>CREATE LEAGUE</button>
                </div>
                <div style={{ textAlign:"center", fontSize:"12px", color:"rgba(255,255,255,0.3)" }}>— OR —</div>
                <div className="card" style={{ padding:"24px" }}>
                  <div style={{ fontSize:"32px", marginBottom:"8px" }}>🔗</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1px", marginBottom:"6px" }}>JOIN A LEAGUE</div>
                  <input value={leagueCode} onChange={e=>setLeagueCode(e.target.value.toUpperCase())} placeholder="Enter 6-digit code" style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"10px", padding:"11px 14px", color:"#fff", fontSize:"16px", outline:"none", boxSizing:"border-box", letterSpacing:"4px", marginBottom:"12px" }} />
                  <button className="btn-outline" style={{ width:"100%", padding:"12px" }} onClick={joinLeague}>JOIN LEAGUE</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="card" style={{ padding:"20px", marginBottom:"16px", background:"linear-gradient(135deg,rgba(0,200,80,0.1),rgba(0,100,255,0.05))", border:"1px solid rgba(0,200,80,0.25)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"24px", letterSpacing:"1px" }}>{league.name}</div>
                      <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)", marginTop:"2px" }}>{league.members.length} members · Created by {league.creator}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.35)", marginBottom:"4px" }}>INVITE CODE</div>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:"4px", color:"#ffd700", background:"rgba(255,215,0,0.1)", padding:"6px 14px", borderRadius:"8px" }}>{league.code}</div>
                    </div>
                  </div>
                  <button onClick={() => { navigator.clipboard?.writeText(league.code); showToast("Code copied! 📋"); }} style={{ marginTop:"14px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", padding:"8px 16px", borderRadius:"8px", cursor:"pointer", fontSize:"13px" }}>
                    📋 Copy invite code
                  </button>
                </div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", letterSpacing:"1px", marginBottom:"10px", color:"rgba(255,255,255,0.5)" }}>MEMBERS</div>
                {league.members.map((m,i) => (
                  <div key={m} className="card" style={{ padding:"14px 16px", marginBottom:"8px", display:"flex", alignItems:"center", gap:"12px" }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.3)", minWidth:"24px" }}>#{i+1}</div>
                    <div style={{ fontSize:"22px" }}>{AVATARS[i % AVATARS.length]}</div>
                    <div style={{ flex:1, fontWeight:600, fontSize:"14px", color: m===user?.name?"#00c850":"#fff" }}>{m}{m===user?.name?" (You)":""}</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", color:"#fff" }}>{m===user?.name?userPoints:[147,132,98][i]??45} pts</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "rewards" && (
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1px", marginBottom:"4px" }}>CHALLENGES & REWARDS</div>
            <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", marginBottom:"20px" }}>Complete challenges to earn bonus points and unlock badges</div>
            {CHALLENGES.map((r,i) => {
              const progress = r.key==="correct"?correctCount:r.key==="perfect"?perfectCount:r.key==="streak"?streak:0;
              const pct = Math.min(100, (progress/r.goal)*100);
              const done = pct >= 100;
              return (
                <div key={r.id} className="card" style={{ padding:"18px 20px", marginBottom:"10px", border:done?"1px solid rgba(0,200,80,0.4)":undefined, animation:`slideIn 0.25s ease ${i*0.06}s both` }}>
                  <div style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
                    <div style={{ fontSize:"32px", filter:done?"none":"grayscale(0.4)", flexShrink:0 }}>{r.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"18px", letterSpacing:"1px" }}>{r.title}</div>
                        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", color:"#ffd700" }}>+{r.pts}</div>
                      </div>
                      <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)", margin:"3px 0 10px" }}>{r.desc}</div>
                      <div style={{ background:"rgba(255,255,255,0.07)", borderRadius:"4px", height:"5px", overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${pct}%`, background:done?"linear-gradient(90deg,#00c850,#00ff88)":"linear-gradient(90deg,#0088ff,#00c8ff)", borderRadius:"4px", transition:"width 0.8s ease" }} />
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", marginTop:"5px" }}>
                        <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)" }}>{Math.min(progress,r.goal)}/{r.goal}</div>
                        {done && <div style={{ fontSize:"10px", color:"#00c850", fontWeight:700 }}>✅ UNLOCKED</div>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop:"20px", background:"linear-gradient(135deg,rgba(255,215,0,0.1),rgba(255,140,0,0.07))", border:"1px solid rgba(255,215,0,0.25)", borderRadius:"16px", padding:"24px", textAlign:"center" }}>
              <div style={{ fontSize:"36px", marginBottom:"6px" }}>🏆</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"26px", letterSpacing:"2px", color:"#ffd700" }}>PRIZE POOL</div>
              <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)", margin:"6px 0 16px" }}>Top 3 players at tournament end win real cash</div>
              <div style={{ display:"flex", justifyContent:"center", gap:"20px", marginBottom:"20px" }}>
                {[["🥇","$200","1st"],["🥈","$100","2nd"],["🥉","$50","3rd"]].map(([icon,prize,label]) => (
                  <div key={label}>
                    <div style={{ fontSize:"22px" }}>{icon}</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", color:"#ffd700" }}>{prize}</div>
                    <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.35)" }}>{label}</div>
                  </div>
                ))}
              </div>
              <button className="btn-gold" style={{ padding:"11px 28px", fontSize:"14px" }} onClick={() => { navigator.clipboard?.writeText("https://wcpredict.app"); showToast("Link copied! Share it 🚀"); }}>
                🔗 SHARE & GROW THE POOL
              </button>
            </div>
          </div>
        )}

        {tab === "upgrade" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:"24px" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"28px", letterSpacing:"2px" }}>UPGRADE YOUR GAME</div>
              <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.45)" }}>Unlock AI tips, private leagues & prize pool entry</div>
            </div>
            {PLANS.map(p => (
              <div key={p.id} className="card" style={{ padding:"20px", marginBottom:"12px", border: plan===p.id ? "1px solid #00c850" : p.popular ? "1px solid rgba(255,215,0,0.3)" : undefined, background: p.popular ? "rgba(255,215,0,0.04)" : undefined, position:"relative" }}>
                {p.popular && <div style={{ position:"absolute", top:"-10px", left:"50%", transform:"translateX(-50%)", background:"linear-gradient(90deg,#ffd700,#ffaa00)", color:"#000", fontSize:"10px", fontWeight:700, padding:"3px 12px", borderRadius:"20px", letterSpacing:"1px" }}>MOST POPULAR</div>}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px" }}>
                  <div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:"1px" }}>{p.label}</div>
                    <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>{p.price===0?"Free forever":`$${p.price}/month`}</div>
                  </div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"28px", color: p.id==="elite"?"#ffd700":p.id==="pro"?"#00c850":"rgba(255,255,255,0.5)" }}>
                    {p.price===0?"FREE":`$${p.price}`}
                  </div>
                </div>
                <div style={{ display:"grid", gap:"6px", marginBottom:"16px" }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"13px", color:"rgba(255,255,255,0.7)" }}>
                      <span style={{ color:"#00c850", fontSize:"12px" }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                {plan === p.id ? (
                  <div style={{ textAlign:"center", fontSize:"13px", color:"#00c850", fontWeight:600 }}>✅ Current plan</div>
                ) : (
                  <button className={p.id==="elite"?"btn-gold":"btn-primary"} style={{ width:"100%", padding:"11px" }}
                    onClick={() => { setPlan(p.id); save("wc_plan",p.id); showToast(`🎉 Upgraded to ${p.label}!`); }}>
                    {p.price===0?"DOWNGRADE":"UPGRADE NOW"}
                  </button>
                )}
              </div>
            ))}
            <div style={{ textAlign:"center", fontSize:"11px", color:"rgba(255,255,255,0.25)", marginTop:"12px" }}>
              Secure payment · Cancel anytime · 7-day refund guarantee
            </div>
            <div style={{ marginTop:"28px", borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"24px" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"1px", marginBottom:"4px" }}>📲 INSTALL THE APP</div>
              <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", marginBottom:"16px" }}>Works offline · Loads instantly · No App Store needed</div>
              {isInstalled ? (
                <div className="card" style={{ padding:"20px", textAlign:"center", border:"1px solid rgba(0,200,80,0.3)", background:"rgba(0,200,80,0.06)" }}>
                  <div style={{ fontSize:"36px", marginBottom:"8px" }}>✅</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"18px", color:"#00c850" }}>APP INSTALLED</div>
                  <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)", marginTop:"4px" }}>You're all set! Open from your home screen anytime</div>
                </div>
              ) : installPrompt ? (
                <div className="card" style={{ padding:"20px" }}>
                  <button className="btn-primary" style={{ width:"100%", padding:"13px", fontSize:"16px" }} onClick={handleInstall}>📲 INSTALL NOW — IT'S FREE</button>
                </div>
              ) : isIos ? (
                <div className="card" style={{ padding:"20px" }}>
                  <div style={{ fontWeight:600, fontSize:"15px", marginBottom:"12px" }}>Install on iPhone / iPad</div>
                  {[
                    { n:"1", icon:"⬆️", t:"Tap the Share button", s:"in Safari's bottom toolbar" },
                    { n:"2", icon:"➕", t:'Tap "Add to Home Screen"', s:"scroll down to find it" },
                    { n:"3", icon:"✅", t:'Tap "Add"', s:"open from your home screen" },
                  ].map(s => (
                    <div key={s.n} style={{ display:"flex", gap:"12px", alignItems:"center", marginBottom:"10px" }}>
                      <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"rgba(0,150,255,0.2)", border:"1px solid rgba(0,150,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue',sans-serif", fontSize:"14px", color:"#00aaff", flexShrink:0 }}>{s.n}</div>
                      <div style={{ fontSize:"22px", flexShrink:0 }}>{s.icon}</div>
                      <div>
                        <div style={{ fontSize:"13px", fontWeight:600 }}>{s.t}</div>
                        <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)" }}>{s.s}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card" style={{ padding:"20px", textAlign:"center" }}>
                  <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.4)" }}>Open in Chrome or Safari on your phone to install</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {shareModal && (
        <Modal onClose={() => setShareModal(null)}>
          <div style={{ textAlign:"center", padding:"8px" }}>
            <div style={{ fontSize:"48px", marginBottom:"8px" }}>🎯</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"28px", letterSpacing:"2px", color:"#ffd700" }}>PERFECT SCORE!</div>
            <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.5)", margin:"8px 0 20px" }}>{shareModal.match?.home} vs {shareModal.match?.away}</div>
            <div style={{ background:"rgba(0,200,80,0.1)", border:"1px solid rgba(0,200,80,0.3)", borderRadius:"12px", padding:"16px", marginBottom:"20px" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"36px", letterSpacing:"4px" }}>{shareModal.pred?.home} — {shareModal.pred?.away}</div>
              <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", marginTop:"4px" }}>Your prediction · Exact match ⚡</div>
            </div>
            <div style={{ display:"grid", gap:"10px" }}>
              <button className="btn-primary" style={{ padding:"12px" }} onClick={() => { navigator.clipboard?.writeText(`⚽ I just predicted the perfect score! ${shareModal.match?.home} ${shareModal.pred?.home}-${shareModal.pred?.away} ${shareModal.match?.away} 🎯 Play at wcpredict.app`); showToast("Share text copied! 📋"); }}>
                📋 Copy share text
              </button>
              <button className="btn-outline" style={{ padding:"11px" }} onClick={() => setShareModal(null)}>Close</button>
            </div>
          </div>
        </Modal>
      )}

      {upgradeModal && (
        <Modal onClose={() => setUpgradeModal(false)}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"40px", marginBottom:"8px" }}>⚡</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"26px", letterSpacing:"2px", marginBottom:"8px" }}>PRO FEATURE</div>
            <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.5)", marginBottom:"20px" }}>AI match tips are a Pro & Elite feature. Upgrade to unlock expert predictions powered by Claude AI.</div>
            <button className="btn-gold" style={{ width:"100%", padding:"13px", marginBottom:"10px" }} onClick={() => { setUpgradeModal(false); setTab("upgrade"); }}>VIEW PLANS →</button>
            <button className="btn-outline" style={{ width:"100%", padding:"11px" }} onClick={() => setUpgradeModal(false)}>Maybe later</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function MatchCard({ match, prediction, submitted, result, inputVals, aiTip, loadingTip, onScoreInput, onSubmit, onAiTip, plan }) {
  const perfect = submitted && result && prediction && prediction.home===result.home && prediction.away===result.away;
  const correct = submitted && result && prediction && !perfect && (
    (prediction.home>prediction.away&&result.home>result.away)||
    (prediction.away>prediction.home&&result.away>result.home)||
    (prediction.home===prediction.away&&result.home===result.away)
  );
  const wrong = submitted && result && !perfect && !correct;

  return (
    <div className="card" style={{ padding:"18px", marginBottom:"12px", border: perfect?"1px solid rgba(0,200,80,0.5)":correct?"1px solid rgba(0,168,255,0.3)":wrong?"1px solid rgba(255,60,60,0.2)":undefined, transition:"all 0.3s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
        <span style={{ fontSize:"10px", background:"rgba(0,200,80,0.12)", color:"#00c850", padding:"3px 9px", borderRadius:"20px", letterSpacing:"1px" }}>GROUP {match.group}</span>
        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)" }}>📍 {match.venue}</span>
          <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)" }}>🕐 {match.time}</span>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
        <div style={{ flex:1, textAlign:"right", fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", letterSpacing:"0.5px", lineHeight:1.2 }}>{match.home}</div>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", flexShrink:0 }}>
          <input type="number" min="0" max="20" className="score-input" placeholder="0" disabled={submitted}
            value={inputVals[`${match.id}_home`]??""} onChange={e=>onScoreInput(match.id,"home",e.target.value)} />
          <span style={{ color:"rgba(255,255,255,0.25)", fontFamily:"'Bebas Neue',sans-serif", fontSize:"18px" }}>:</span>
          <input type="number" min="0" max="20" className="score-input" placeholder="0" disabled={submitted}
            value={inputVals[`${match.id}_away`]??""} onChange={e=>onScoreInput(match.id,"away",e.target.value)} />
        </div>
        <div style={{ flex:1, fontFamily:"'Bebas Neue',sans-serif", fontSize:"16px", letterSpacing:"0.5px", lineHeight:1.2 }}>{match.away}</div>
      </div>
      {submitted && result && (
        <div style={{ textAlign:"center", fontSize:"12px", color:"rgba(255,255,255,0.35)", marginBottom:"10px" }}>
          Final: <b style={{ color:"#fff" }}>{result.home}–{result.away}</b>
          {perfect && <span style={{ marginLeft:"8px", color:"#ffd700", fontWeight:700 }}>🎯 PERFECT +10pts</span>}
          {correct && <span style={{ marginLeft:"8px", color:"#00c850", fontWeight:700 }}>✅ CORRECT +5pts</span>}
          {wrong && <span style={{ marginLeft:"8px", color:"#ff4444" }}>❌ Wrong</span>}
        </div>
      )}
      {aiTip && (
        <div style={{ background:"rgba(0,120,255,0.1)", border:"1px solid rgba(0,120,255,0.2)", borderRadius:"10px", padding:"10px 12px", marginBottom:"10px", fontSize:"12px", color:"rgba(255,255,255,0.7)", fontStyle:"italic", lineHeight:1.5 }}>
          <span style={{ color:"#00aaff", fontStyle:"normal", fontWeight:700, fontSize:"10px", letterSpacing:"1px" }}>⚡ AI TIP  </span>
          {aiTip}
        </div>
      )}
      <div style={{ display:"flex", gap:"8px" }}>
        {!submitted ? (
          <>
            <button className="btn-primary" style={{ flex:1, padding:"10px", fontSize:"13px" }} onClick={() => onSubmit(match.id)}>🔒 LOCK IN</button>
            <button onClick={() => onAiTip(match)} style={{ padding:"10px 14px", background:"rgba(0,120,255,0.15)", border:"1px solid rgba(0,120,255,0.25)", borderRadius:"10px", color:"#00aaff", fontSize:"12px", cursor:"pointer", display:"flex", alignItems:"center", gap:"6px", flexShrink:0 }}>
              {loadingTip ? <span style={{ animation:"spin 0.8s linear infinite", display:"inline-block" }}>⟳</span> : "⚡"} AI TIP
              {plan==="free" && <span style={{ fontSize:"9px", background:"rgba(255,215,0,0.2)", color:"#ffd700", padding:"1px 5px", borderRadius:"4px" }}>PRO</span>}
            </button>
          </>
        ) : (
          <div style={{ flex:1, textAlign:"center", fontSize:"11px", color:"rgba(255,255,255,0.25)" }}>🔒 Prediction locked</div>
        )}
      </div>
    </div>
  );
}

function GlowBg() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}>
      <div style={{ position:"absolute", top:"-15%", left:"-10%", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(0,200,80,0.1) 0%,transparent 70%)" }} />
      <div style={{ position:"absolute", bottom:"-10%", right:"-10%", width:"450px", height:"450px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,200,0,0.08) 0%,transparent 70%)" }} />
      <div style={{ position:"absolute", top:"40%", right:"20%", width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle,rgba(0,100,255,0.06) 0%,transparent 70%)" }} />
    </div>
  );
}

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, pointerEvents:"none" }}>
      {Array.from({length:60}).map((_,i) => (
        <div key={i} style={{ position:"absolute", top:"-10px", left:`${Math.random()*100}%`, width:`${4+Math.random()*8}px`, height:`${4+Math.random()*8}px`, borderRadius:Math.random()>0.5?"50%":"2px", background:["#00c850","#ffd700","#ff4444","#00aaff","#ff69b4","#ffffff"][Math.floor(Math.random()*6)], animation:`fall ${0.7+Math.random()*1.8}s ease-in forwards`, animationDelay:`${Math.random()*0.6}s` }} />
      ))}
    </div>
  );
}

function Toast({ toast }) {
  const colors = { success:"#00c850", error:"#ff4444", perfect:"#ffd700" };
  return (
    <div style={{ position:"fixed", top:"16px", left:"50%", transform:"translateX(-50%)", zIndex:2000, background:colors[toast.type]||colors.success, color: toast.type==="perfect"?"#000":"#fff", padding:"11px 22px", borderRadius:"12px", fontWeight:700, fontSize:"14px", animation:"slideIn 0.3s ease", boxShadow:"0 8px 32px rgba(0,0,0,0.4)", whiteSpace:"nowrap", maxWidth:"90vw" }}>
      {toast.msg}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:500, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ background:"#0f1520", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", padding:"28px", maxWidth:"380px", width:"100%", animation:"slideIn 0.25s ease" }}>
        {children}
      </div>
    </div>
  );
}

const GLOBAL_CSS = `
  @keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity:0; } }
  @keyframes slideIn { from { transform:translateY(-20px); opacity:0; } to { transform:translateY(0); opacity:1; } }
  @keyframes slideUp { from { transform:translateY(100%); opacity:0; } to { transform:translateY(0); opacity:1; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  .card { background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.07); border-radius:16px; backdrop-filter:blur(10px); }
  .btn-primary { background:linear-gradient(135deg,#00c850,#009e3e); border:none; color:#fff; cursor:pointer; border-radius:10px; font-family:'Bebas Neue',sans-serif; letter-spacing:1.5px; font-size:15px; transition:all 0.2s; }
  .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,200,80,0.35); }
  .btn-gold { background:linear-gradient(135deg,#ffd700,#ff9500); border:none; color:#000; cursor:pointer; border-radius:10px; font-family:'Bebas Neue',sans-serif; letter-spacing:1.5px; font-size:15px; font-weight:700; transition:all 0.2s; }
  .btn-gold:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(255,200,0,0.35); }
  .btn-outline { background:transparent; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.6); cursor:pointer; border-radius:10px; font-family:'Bebas Neue',sans-serif; letter-spacing:1.5px; font-size:15px; transition:all 0.2s; }
  .btn-outline:hover { border-color:rgba(255,255,255,0.35); color:#fff; }
  .tab-btn { background:none; border:none; color:rgba(255,255,255,0.35); cursor:pointer; font-family:'Bebas Neue',sans-serif; letter-spacing:1.5px; font-size:13px; padding:13px 14px; position:relative; transition:all 0.2s; white-space:nowrap; flex-shrink:0; }
  .tab-btn.active { color:#00c850; }
  .tab-btn.active::after { content:''; position:absolute; bottom:0; left:15%; right:15%; height:2px; background:#00c850; border-radius:2px; }
  .score-input { width:42px; height:42px; background:rgba(255,255,255,0.07); border:2px solid rgba(255,255,255,0.12); border-radius:10px; color:#fff; font-size:20px; font-family:'Bebas Neue',sans-serif; text-align:center; outline:none; transition:border-color 0.2s; -moz-appearance:textfield; }
  .score-input::-webkit-outer-spin-button, .score-input::-webkit-inner-spin-button { -webkit-appearance:none; }
  .score-input:focus { border-color:#00c850; }
  .score-input:disabled { opacity:0.5; }
  * { box-sizing:border-box; }
  ::-webkit-scrollbar { width:4px; height:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }
`;
