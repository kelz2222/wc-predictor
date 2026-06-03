import { useState, useEffect } from "react";

const TEAMS = [
  {
    id:"mar", name:"Morocco", flag:"🇲🇦", nickname:"Atlas Lions",
    color:"#C1272D", group:"C", fifa_rank:14,
    coach:"Coach TBC", star_player:"Achraf Hakimi",
    target:"Go all the way",
    matches:[
      {id:1, opponent:"🇧🇷 Brazil",   date:"Jun 13", time:"15:00", venue:"MetLife Stadium, New York"},
      {id:2, opponent:"🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland", date:"Jun 18", time:"12:00", venue:"SoFi Stadium, Los Angeles"},
      {id:3, opponent:"🇭🇹 Haiti",    date:"Jun 23", time:"21:00", venue:"Rose Bowl, Los Angeles"},
    ],
    players:[
      {name:"Achraf Hakimi",  pos:"RB", club:"PSG",        rating:88},
      {name:"Yassine Bounou", pos:"GK", club:"Al-Hilal",   rating:85},
      {name:"Hakim Ziyech",  pos:"AM", club:"Galatasaray", rating:83},
      {name:"Sofyan Amrabat",pos:"MF", club:"Fiorentina",  rating:82},
    ],
    bio:"The Atlas Lions are one of Africa's most feared teams at WC 2026. Seeded in Pot 2 — the first African side ever given that honour — Morocco open against Brazil in what is already being called the match of the group stage. With Hakimi bombing forward and a disciplined defensive unit, the Lions are built to go deep.",
  },
  {
    id:"sen", name:"Senegal", flag:"🇸🇳", nickname:"Lions of Teranga",
    color:"#00853F", group:"I", fifa_rank:20,
    coach:"Pape Thiaw", star_player:"Sadio Mane",
    target:"Reach the knockout rounds",
    matches:[
      {id:1, opponent:"🇫🇷 France",        date:"Jun 14", time:"18:00", venue:"AT&T Stadium, Dallas"},
      {id:2, opponent:"🇳🇴 Norway",        date:"Jun 19", time:"15:00", venue:"Lincoln Financial, Philadelphia"},
      {id:3, opponent:"🏳 Playoff winner", date:"Jun 24", time:"18:00", venue:"Hard Rock Stadium, Miami"},
    ],
    players:[
      {name:"Sadio Mane",        pos:"LW", club:"Al-Nassr",       rating:85},
      {name:"Edouard Mendy",     pos:"GK", club:"Al-Ahli",        rating:83},
      {name:"Kalidou Koulibaly", pos:"CB", club:"Al-Hilal",       rating:84},
      {name:"Ismaila Sarr",      pos:"RW", club:"Crystal Palace", rating:81},
    ],
    bio:"Reigning African champions and one of the most complete squads at WC 2026. Senegal face France in Group I — one of the most anticipated clashes of the entire tournament. With Mane leading the line and Koulibaly marshalling the defence, the Lions of Teranga are built to go far.",
  },
  {
    id:"egy", name:"Egypt", flag:"🇪🇬", nickname:"Pharaohs",
    color:"#CE1126", group:"E", fifa_rank:35,
    coach:"Hossam Hassan", star_player:"Mohamed Salah",
    target:"Reach the knockout rounds",
    matches:[
      {id:1, opponent:"🇧🇪 Belgium",     date:"Jun 12", time:"15:00", venue:"Levis Stadium, San Francisco"},
      {id:2, opponent:"🇮🇷 Iran",        date:"Jun 17", time:"12:00", venue:"Allegiant Stadium, Las Vegas"},
      {id:3, opponent:"🇳🇿 New Zealand", date:"Jun 22", time:"15:00", venue:"Gillette Stadium, Boston"},
    ],
    players:[
      {name:"Mohamed Salah",    pos:"RW", club:"Liverpool", rating:90},
      {name:"Omar Marmoush",    pos:"ST", club:"Man City",  rating:83},
      {name:"Mohamed Elneny",   pos:"MF", club:"Besiktas",  rating:77},
      {name:"Ahmed El-Shenawy",pos:"GK", club:"Al-Ahly",   rating:78},
    ],
    bio:"Egypt arrive at WC 2026 with arguably the best player in the world in Mohamed Salah leading from the front. Group E features Belgium, Iran and New Zealand — a very winnable group. The Pharaohs have everything they need to make a real run at this tournament.",
  },
  {
    id:"gha", name:"Ghana", flag:"🇬🇭", nickname:"Black Stars",
    color:"#FCD116", group:"G", fifa_rank:60,
    coach:"Otto Addo", star_player:"Mohammed Kudus",
    target:"Reach the knockout rounds",
    matches:[
      {id:1, opponent:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", date:"Jun 13", time:"21:00", venue:"MetLife Stadium, New York"},
      {id:2, opponent:"🇭🇷 Croatia", date:"Jun 18", time:"18:00", venue:"SoFi Stadium, Los Angeles"},
      {id:3, opponent:"🇵🇦 Panama",  date:"Jun 23", time:"15:00", venue:"Rose Bowl, Los Angeles"},
    ],
    players:[
      {name:"Mohammed Kudus", pos:"AM", club:"West Ham", rating:83},
      {name:"Thomas Partey",  pos:"MF", club:"Arsenal",  rating:83},
      {name:"Jordan Ayew",    pos:"ST", club:"Leicester", rating:78},
      {name:"Abdul Samed",    pos:"MF", club:"Lens",     rating:77},
    ],
    bio:"Ghana arrive at WC 2026 with fire and a point to prove. Mohammed Kudus is one of the most exciting players in the Premier League right now and Thomas Partey brings top level Champions League experience. Group G has England and Croatia — tough but absolutely beatable for the Black Stars.",
  },
  {
    id:"alg", name:"Algeria", flag:"🇩🇿", nickname:"Desert Warriors",
    color:"#006233", group:"D", fifa_rank:52,
    coach:"Vladimir Petkovic", star_player:"Riyad Mahrez",
    target:"Shock the world",
    matches:[
      {id:1, opponent:"🇦🇷 Argentina", date:"Jun 12", time:"21:00", venue:"AT&T Stadium, Dallas"},
      {id:2, opponent:"🇦🇹 Austria",   date:"Jun 17", time:"18:00", venue:"Hard Rock Stadium, Miami"},
      {id:3, opponent:"🇯🇴 Jordan",    date:"Jun 22", time:"21:00", venue:"Lincoln Financial, Philadelphia"},
    ],
    players:[
      {name:"Riyad Mahrez",   pos:"RW", club:"Al-Ahli", rating:85},
      {name:"Islam Slimani",  pos:"ST", club:"Lyon",    rating:78},
      {name:"Youcef Atal",    pos:"RB", club:"Nice",    rating:79},
      {name:"Haris Belkebla", pos:"MF", club:"Brest",   rating:77},
    ],
    bio:"Algeria open WC 2026 against world champions Argentina and Mahrez has promised to shock the world. The Desert Warriors are dangerous underdogs with a world-class attacker and a solid defensive unit. Austria and Jordan also await in Group D making this a very realistic group to qualify from.",
  },
  {
    id:"tun", name:"Tunisia", flag:"🇹🇳", nickname:"Carthage Eagles",
    color:"#E70013", group:"F", fifa_rank:30,
    coach:"Jalel Kadri", star_player:"Wahbi Khazri",
    target:"Reach the last 16",
    matches:[
      {id:1, opponent:"🇳🇱 Netherlands", date:"Jun 12", time:"18:00", venue:"Levis Stadium, San Francisco"},
      {id:2, opponent:"🇯🇵 Japan",       date:"Jun 17", time:"21:00", venue:"Allegiant Stadium, Las Vegas"},
      {id:3, opponent:"🏳 UEFA playoff", date:"Jun 22", time:"18:00", venue:"Gillette Stadium, Boston"},
    ],
    players:[
      {name:"Wahbi Khazri",    pos:"AM", club:"Montpellier",  rating:80},
      {name:"Hannibal Mejbri", pos:"MF", club:"Birmingham",   rating:77},
      {name:"Youssef Msakni",  pos:"LW", club:"Al-Arabi",     rating:78},
      {name:"Mohamed Drager",  pos:"RB", club:"Nottm Forest", rating:76},
    ],
    bio:"Tunisia are one of Africa's most disciplined and well-organised teams at WC 2026. Group F features the Netherlands and Japan — tough opponents but the Carthage Eagles have the defensive quality and fighting spirit to compete. This could be the tournament they finally reach the knockout rounds.",
  },
  {
    id:"civ", name:"Ivory Coast", flag:"🇨🇮", nickname:"Elephants",
    color:"#F77F00", group:"B", fifa_rank:48,
    coach:"Emerse Fae", star_player:"Sebastien Haller",
    target:"Reach the knockout rounds",
    matches:[
      {id:1, opponent:"🇩🇪 Germany",  date:"Jun 12", time:"12:00", venue:"Rose Bowl, Los Angeles"},
      {id:2, opponent:"🇪🇨 Ecuador",  date:"Jun 17", time:"15:00", venue:"MetLife Stadium, New York"},
      {id:3, opponent:"🇨🇼 Curacao",  date:"Jun 22", time:"12:00", venue:"SoFi Stadium, Los Angeles"},
    ],
    players:[
      {name:"Sebastien Haller", pos:"ST", club:"Borussia Dortmund", rating:82},
      {name:"Simon Adingra",    pos:"RW", club:"Brighton",          rating:80},
      {name:"Franck Kessie",    pos:"MF", club:"Al-Ahli",           rating:81},
      {name:"Serge Aurier",     pos:"RB", club:"Villarreal",         rating:78},
    ],
    bio:"Reigning AFCON champions Ivory Coast bring confidence and quality to WC 2026. The Elephants face Germany in a blockbuster Group B opener. With Haller's physicality up front and Adingra's electric pace on the wing, Ivory Coast have a genuine chance of reaching the knockout rounds.",
  },
  {
    id:"cpv", name:"Cape Verde", flag:"🇨🇻", nickname:"Blue Sharks",
    color:"#003893", group:"H", fifa_rank:89,
    coach:"Bubista", star_player:"Gelson Fernandes",
    target:"Make history",
    matches:[
      {id:1, opponent:"🇪🇸 Spain",        date:"Jun 13", time:"18:00", venue:"Gillette Stadium, Boston"},
      {id:2, opponent:"🇺🇾 Uruguay",      date:"Jun 18", time:"21:00", venue:"Hard Rock Stadium, Miami"},
      {id:3, opponent:"🇸🇦 Saudi Arabia", date:"Jun 23", time:"18:00", venue:"Levis Stadium, San Francisco"},
    ],
    players:[
      {name:"Gelson Fernandes", pos:"MF", club:"Sporting CP",       rating:76},
      {name:"Ryan Mendes",      pos:"LW", club:"Al-Duhail",          rating:74},
      {name:"Stopira",          pos:"CB", club:"Levante",            rating:73},
      {name:"Jamiro Monteiro",  pos:"MF", club:"Philadelphia Union", rating:72},
    ],
    bio:"The greatest story of WC 2026. Cape Verde — a tiny island nation of just 600,000 people — are at their very first World Cup after an incredible qualification campaign. Every match is a historic moment for this nation. The Blue Sharks face Spain, Uruguay and Saudi Arabia. They will bite.",
  },
  {
    id:"rsa", name:"South Africa", flag:"🇿🇦", nickname:"Bafana Bafana",
    color:"#007A4D", group:"A", fifa_rank:65,
    coach:"Hugo Broos", star_player:"Percy Tau",
    target:"Reach the knockout rounds",
    matches:[
      {id:1, opponent:"🇲🇽 Mexico",      date:"Jun 11", time:"15:00", venue:"Estadio Azteca, Mexico City"},
      {id:2, opponent:"🇰🇷 South Korea", date:"Jun 18", time:"15:00", venue:"Estadio Akron, Guadalajara"},
      {id:3, opponent:"🇨🇿 Czechia",     date:"Jun 24", time:"21:00", venue:"Mercedes-Benz Stadium, Atlanta"},
    ],
    players:[
      {name:"Percy Tau",       pos:"LW", club:"Al-Ahly",  rating:79},
      {name:"Lyle Foster",     pos:"ST", club:"Burnley",  rating:77},
      {name:"Ronwen Williams", pos:"GK", club:"Mamelodi", rating:78},
      {name:"Bongani Zungu",   pos:"MF", club:"Mamelodi", rating:75},
    ],
    bio:"South Africa have the honour of kicking off the entire World Cup 2026 — opening the tournament against Mexico at the iconic Estadio Azteca on June 11. Bafana Bafana are back on the world stage under Hugo Broos who has built a resilient and united squad ready to make Africa proud.",
  },
  {
    id:"drc", name:"DR Congo", flag:"🇨🇩", nickname:"Leopards",
    color:"#007FFF", group:"K", fifa_rank:62,
    coach:"Sebastien Desabre", star_player:"Cedric Bakambu",
    target:"Make history",
    matches:[
      {id:1, opponent:"🇵🇹 Portugal",   date:"Jun 15", time:"18:00", venue:"Lincoln Financial, Philadelphia"},
      {id:2, opponent:"🇺🇿 Uzbekistan", date:"Jun 20", time:"15:00", venue:"Allegiant Stadium, Las Vegas"},
      {id:3, opponent:"🇨🇴 Colombia",   date:"Jun 25", time:"18:00", venue:"Hard Rock Stadium, Miami"},
    ],
    players:[
      {name:"Cedric Bakambu", pos:"ST", club:"Marseille", rating:79},
      {name:"Chancel Mbemba", pos:"CB", club:"Porto",     rating:78},
      {name:"Arthur Masuaku", pos:"LB", club:"Besiktas",  rating:75},
      {name:"Yannick Bolasie",pos:"RW", club:"Hearts",    rating:74},
    ],
    bio:"DR Congo are back at the World Cup for the first time in decades after a dramatic qualification through the intercontinental play-offs. The Leopards open against Cristiano Ronaldo's Portugal in Group K — a massive occasion for a nation that is passionate about football to its core. History is being made.",
  },
];

const POLLS = [
  {id:1, question:"Which African team goes furthest at WC 2026?", options:["Morocco","Senegal","Egypt","Ivory Coast"], votes:[2841,1503,1287,954]},
  {id:2, question:"Best African player at WC 2026?", options:["Mohamed Salah","Achraf Hakimi","Sadio Mane","Riyad Mahrez"], votes:[3241,2876,1843,1190]},
  {id:3, question:"Can Morocco beat Brazil in Group C?", options:["Yes — they will!","No but it will be close","It will be a draw","Brazil will win"], votes:[1834,2176,854,432]},
  {id:4, question:"Biggest surprise team of Africa at WC 2026?", options:["Cape Verde","Algeria","South Africa","DR Congo"], votes:[1987,865,743,532]},
];

const NEWS = [
  {id:1,  team:"mar", title:"Morocco drawn with Brazil in Group C — the match everyone is talking about",      time:"2h ago",  hot:true},
  {id:2,  team:"rsa", title:"South Africa open the entire World Cup vs Mexico at the Azteca on June 11",      time:"3h ago",  hot:true},
  {id:3,  team:"sen", title:"Senegal vs France in Group I — one of the most anticipated clashes of WC 2026",  time:"4h ago",  hot:true},
  {id:4,  team:"egy", title:"Salah: This World Cup is for Egypt — I will give everything",                     time:"5h ago",  hot:false},
  {id:5,  team:"cpv", title:"Cape Verde make their World Cup debut — a nation of 600,000 on the world stage", time:"6h ago",  hot:true},
  {id:6,  team:"drc", title:"DR Congo are back at the World Cup after decades away",                           time:"8h ago",  hot:true},
  {id:7,  team:"alg", title:"Mahrez: We will shock Argentina — believe in the Desert Warriors",               time:"10h ago", hot:false},
  {id:8,  team:"gha", title:"Kudus named Ghana captain — Black Stars ready to take on England",               time:"12h ago", hot:false},
  {id:9,  team:"civ", title:"Ivory Coast vs Germany — AFCON champions target the knockout rounds",            time:"14h ago", hot:false},
  {id:10, team:"tun", title:"Tunisia prepare for Netherlands — Eagles target the last 16",                    time:"1d ago",  hot:false},
];

const load = (k,def) => { try { const v=localStorage.getItem(k); return v?JSON.parse(v):def; } catch { return def; } };
const save = (k,v)   => { try { localStorage.setItem(k,JSON.stringify(v)); } catch {} };

export default function App() {
  const [tab, setTab]                   = useState("home");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamTab, setTeamTab]           = useState("overview");
  const [votes, setVotes]               = useState(()=>load("afr_votes",{}));
  const [userVotes, setUserVotes]       = useState(()=>load("afr_uservotes",{}));
  const [ratings, setRatings]           = useState(()=>load("afr_ratings",{}));
  const [favoriteTeam, setFavoriteTeam] = useState(()=>load("afr_fav",null));
  const [toast, setToast]               = useState(null);
  const [confetti, setConfetti]         = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [shareCard, setShareCard]       = useState(null);
  const [copied, setCopied]             = useState("");

  useEffect(()=>{ save("afr_votes",votes); },[votes]);
  useEffect(()=>{ save("afr_uservotes",userVotes); },[userVotes]);
  useEffect(()=>{ save("afr_ratings",ratings); },[ratings]);
  useEffect(()=>{ save("afr_fav",favoriteTeam); },[favoriteTeam]);

  const showToast = (msg,type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const copyText = (text,label) => {
    navigator.clipboard?.writeText(text);
    setCopied(label); setTimeout(()=>setCopied(""),2500);
    showToast("Copied! Paste it anywhere");
  };

  const handleVote = (pollId,optIdx) => {
    if (userVotes[pollId]!==undefined) { showToast("Already voted!","error"); return; }
    setVotes(v=>({...v,[pollId]:{...(v[pollId]||{}),[optIdx]:((v[pollId]||{})[optIdx]||0)+1}}));
    setUserVotes(u=>({...u,[pollId]:optIdx}));
    showToast("Vote cast!");
  };

  const handleRating = (teamId,playerName,stars) => {
    setRatings(r=>({...r,[`${teamId}_${playerName}`]:stars}));
    showToast(`Rated ${stars} stars!`);
  };

  const setFav = (teamId) => {
    if (favoriteTeam===teamId) { setFavoriteTeam(null); showToast("Removed from favourites"); return; }
    setFavoriteTeam(teamId);
    setConfetti(true); setTimeout(()=>setConfetti(false),2500);
    const t=TEAMS.find(t=>t.id===teamId);
    showToast(`${t?.flag} ${t?.name} is your team!`);
  };

  const openTeam  = (team) => { setSelectedTeam(team); setTeamTab("overview"); setTab("team"); };
  const goBack    = () => { setSelectedTeam(null); setTab("home"); };

  const filtered = TEAMS.filter(t=>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())||
    t.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const days   = Math.max(0,Math.ceil((new Date("2026-06-11")-new Date())/(1000*60*60*24)));
  const appUrl = window.location.href;
  const inviteMsg = `🌍⚽ Africa has a RECORD 10 teams at World Cup 2026!\n\nI am following all of them on Africa WC Hub — Morocco, Senegal, Egypt, Ghana, Algeria, Tunisia, Ivory Coast, Cape Verde, South Africa and DR Congo.\n\nReal fixtures, fan polls, player ratings 👉 ${appUrl}\n\n🇲🇦🇸🇳🇪🇬🇬🇭🇩🇿🇹🇳🇨🇮🇨🇻🇿🇦🇨🇩 Let's go Africa!`;

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#080c0a",minHeight:"100vh",color:"#fff",position:"relative",paddingBottom:"80px"}}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
      <style>{CSS}</style>
      <GlowBg/>
      <Confetti active={confetti}/>
      {toast&&<Toast toast={toast}/>}

      {shareCard&&(
        <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}
          onClick={e=>e.target===e.currentTarget&&setShareCard(null)}>
          <div style={{background:"#0f1a0f",border:`1px solid ${shareCard.color}40`,borderRadius:"20px",padding:"28px",maxWidth:"360px",width:"100%",animation:"slideIn 0.25s ease"}}>
            <div style={{textAlign:"center",marginBottom:"20px"}}>
              <div style={{fontSize:"56px",marginBottom:"8px"}}>{shareCard.flag}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:"22px",fontWeight:800}}>{shareCard.name}</div>
              <div style={{fontSize:"13px",color:"rgba(255,255,255,0.4)",marginTop:"2px"}}>{shareCard.nickname} · Group {shareCard.group}</div>
              <div style={{fontSize:"12px",color:shareCard.color,marginTop:"4px",fontWeight:700}}>WC 2026 · FIFA Rank #{shareCard.fifa_rank}</div>
            </div>
            <div style={{background:"rgba(255,255,255,0.04)",borderRadius:"12px",padding:"14px",marginBottom:"16px",fontSize:"13px",color:"rgba(255,255,255,0.6)",lineHeight:1.7}}>
              {shareCard.flag} I am backing {shareCard.name} ({shareCard.nickname}) at World Cup 2026! Group {shareCard.group}. Follow all 10 African teams at {appUrl}
            </div>
            <div style={{display:"grid",gap:"8px"}}>
              <button onClick={()=>{ const msg=encodeURIComponent(`${shareCard.flag} I am backing ${shareCard.name} at World Cup 2026! Group ${shareCard.group} — follow all 10 African teams 👉 ${appUrl} #WorldCup2026 #Africa`); window.open(`https://wa.me/?text=${msg}`,"_blank"); }}
                style={{background:"rgba(37,211,102,0.15)",border:"1px solid rgba(37,211,102,0.3)",borderRadius:"10px",padding:"12px",color:"#25d366",fontWeight:700,cursor:"pointer",fontSize:"13px"}}>
                💬 Share on WhatsApp
              </button>
              <button onClick={()=>copyText(`${shareCard.flag} I am backing ${shareCard.name} at World Cup 2026! Group ${shareCard.group} — follow all 10 African teams 👉 ${appUrl} #WorldCup2026 #Africa`,`card_${shareCard.id}`)}
                style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",padding:"12px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:"13px"}}>
                {copied===`card_${shareCard.id}`?"✅ Copied!":"📋 Copy message"}
              </button>
              <button onClick={()=>setShareCard(null)}
                style={{background:"none",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"10px",padding:"10px",color:"rgba(255,255,255,0.35)",cursor:"pointer",fontSize:"13px"}}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{position:"sticky",top:0,zIndex:50,background:"rgba(8,12,10,0.95)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"12px 16px"}}>
        <div style={{maxWidth:"680px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            {tab==="team"&&<button onClick={goBack} style={{background:"rgba(255,255,255,0.08)",border:"none",color:"#fff",width:"32px",height:"32px",borderRadius:"50%",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>←</button>}
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:"18px",fontWeight:800,letterSpacing:"1px",lineHeight:1}}>🌍 AFRICA WC HUB</div>
              <div style={{fontSize:"9px",color:"rgba(255,255,255,0.35)",letterSpacing:"2px"}}>FIFA WORLD CUP 2026 · 10 TEAMS</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <div style={{background:"rgba(220,38,38,0.15)",border:"1px solid rgba(220,38,38,0.25)",borderRadius:"20px",padding:"4px 12px",fontSize:"11px",fontWeight:700,color:"#ff6b6b"}}>{days}d TO GO</div>
            {favoriteTeam&&<div style={{fontSize:"22px"}}>{TEAMS.find(t=>t.id===favoriteTeam)?.flag}</div>}
          </div>
        </div>
      </div>

      <div style={{maxWidth:"680px",margin:"0 auto",padding:"16px"}}>

        {tab==="home"&&(
          <div>
            <div style={{background:"linear-gradient(135deg,rgba(220,38,38,0.12),rgba(0,135,81,0.12),rgba(255,215,0,0.06))",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"20px",padding:"24px",marginBottom:"20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:"-20px",right:"-20px",fontSize:"80px",opacity:0.05}}>🌍</div>
              <div style={{fontSize:"10px",letterSpacing:"3px",color:"rgba(255,255,255,0.35)",marginBottom:"8px"}}>RECORD 10 NATIONS · ONE DREAM</div>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,7vw,44px)",margin:"0 0 8px",fontWeight:800,lineHeight:1.1,background:"linear-gradient(135deg,#fff,#ffd700,#00c853)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                AFRICA RISES<br/>AT WC 2026
              </h1>
              <p style={{color:"rgba(255,255,255,0.45)",fontSize:"13px",margin:"0 0 18px"}}>Track all 10 African teams · Real fixtures · Vote · Rate players</p>
              <div style={{display:"flex",justifyContent:"center",gap:"20px"}}>
                {[["10","TEAMS"],["30","MATCHES"],["Jun 11","KICKOFF"]].map(([v,l])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",color:"#ffd700",lineHeight:1}}>{v}</div>
                    <div style={{fontSize:"9px",color:"rgba(255,255,255,0.3)",letterSpacing:"1.5px"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search teams..."
              style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",padding:"12px 16px",color:"#fff",fontSize:"14px",outline:"none",boxSizing:"border-box",marginBottom:"16px"}}/>

            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"2px",color:"rgba(255,255,255,0.3)",marginBottom:"10px"}}>ALL 10 QUALIFIED AFRICAN TEAMS</div>
            <div style={{display:"grid",gap:"10px",marginBottom:"24px"}}>
              {filtered.map((team,i)=>(
                <TeamCard key={team.id} team={team} isFav={favoriteTeam===team.id} onOpen={openTeam} onFav={setFav} onShare={setShareCard} delay={i*0.04}/>
              ))}
            </div>

            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"2px",color:"rgba(255,255,255,0.3)",marginBottom:"10px"}}>LATEST BUZZ</div>
            <div style={{display:"grid",gap:"8px"}}>
              {NEWS.filter(n=>n.hot).slice(0,5).map(n=>{
                const team=TEAMS.find(t=>t.id===n.team);
                return (
                  <div key={n.id} className="card" style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:"12px"}}>
                    <div style={{fontSize:"28px",flexShrink:0}}>{team?.flag}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"13px",fontWeight:600,lineHeight:1.3}}>{n.title}</div>
                      <div style={{fontSize:"11px",color:"rgba(255,255,255,0.3)",marginTop:"3px"}}>{team?.name} · {n.time}</div>
                    </div>
                    <div style={{fontSize:"9px",background:"rgba(220,38,38,0.2)",color:"#ff6b6b",padding:"2px 8px",borderRadius:"20px",flexShrink:0,fontWeight:700}}>HOT</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="schedule"&&(
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"20px",fontWeight:800,marginBottom:"4px"}}>MATCH SCHEDULE</div>
            <div style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",marginBottom:"20px"}}>All 10 African teams · WC 2026 confirmed fixtures</div>
            {TEAMS.map(team=>(
              <div key={team.id} style={{marginBottom:"20px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
                  <span style={{fontSize:"24px"}}>{team.flag}</span>
                  <div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"15px"}}>{team.name}</div>
                    <div style={{fontSize:"11px",color:"rgba(255,255,255,0.35)"}}>Group {team.group} · {team.nickname}</div>
                  </div>
                </div>
                {team.matches.map(m=>(
                  <div key={m.id} className="card" style={{padding:"12px 16px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"12px",borderLeft:`3px solid ${team.color}`}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"13px",fontWeight:600}}>{team.flag} {team.name} vs {m.opponent}</div>
                      <div style={{fontSize:"11px",color:"rgba(255,255,255,0.35)",marginTop:"2px"}}>📍 {m.venue}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:"12px",fontWeight:700,color:"#ffd700"}}>{m.date}</div>
                      <div style={{fontSize:"11px",color:"rgba(255,255,255,0.35)"}}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab==="polls"&&(
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"20px",fontWeight:800,marginBottom:"4px"}}>FAN POLLS</div>
            <div style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",marginBottom:"20px"}}>Your voice · Real-time results</div>
            {POLLS.map(poll=>{
              const myVote=userVotes[poll.id];
              const extra=votes[poll.id]||{};
              const totals=poll.options.map((_,i)=>(poll.votes[i]||0)+(extra[i]||0));
              const total=totals.reduce((a,b)=>a+b,0);
              return (
                <div key={poll.id} className="card" style={{padding:"20px",marginBottom:"14px"}}>
                  <div style={{fontWeight:700,fontSize:"15px",marginBottom:"16px",lineHeight:1.4}}>{poll.question}</div>
                  <div style={{display:"grid",gap:"8px"}}>
                    {poll.options.map((opt,i)=>{
                      const pct=total>0?Math.round((totals[i]/total)*100):0;
                      const isMyVote=myVote===i;
                      const hasVoted=myVote!==undefined;
                      return (
                        <button key={i} onClick={()=>handleVote(poll.id,i)}
                          style={{background:isMyVote?"rgba(0,200,80,0.15)":"rgba(255,255,255,0.04)",border:isMyVote?"1px solid rgba(0,200,80,0.5)":"1px solid rgba(255,255,255,0.08)",borderRadius:"10px",padding:"10px 14px",cursor:hasVoted?"default":"pointer",textAlign:"left",position:"relative",overflow:"hidden",transition:"all 0.2s"}}>
                          {hasVoted&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:`${pct}%`,background:isMyVote?"rgba(0,200,80,0.1)":"rgba(255,255,255,0.03)",transition:"width 0.6s ease"}}/>}
                          <div style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <span style={{fontSize:"13px",fontWeight:600,color:isMyVote?"#00c853":"#fff"}}>{opt}</span>
                            {hasVoted&&<span style={{fontSize:"12px",color:isMyVote?"#00c853":"rgba(255,255,255,0.4)",fontWeight:700}}>{pct}%</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{fontSize:"10px",color:"rgba(255,255,255,0.2)",marginTop:"10px"}}>{total.toLocaleString()} votes</div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="news"&&(
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"20px",fontWeight:800,marginBottom:"4px"}}>LATEST NEWS</div>
            <div style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",marginBottom:"20px"}}>Everything happening with Africa's 10 World Cup teams</div>
            {NEWS.map(n=>{
              const team=TEAMS.find(t=>t.id===n.team);
              return (
                <div key={n.id} className="card" style={{padding:"16px",marginBottom:"10px",display:"flex",gap:"14px",alignItems:"flex-start"}}>
                  <div style={{fontSize:"36px",flexShrink:0}}>{team?.flag}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:"6px",alignItems:"center",marginBottom:"6px",flexWrap:"wrap"}}>
                      <span style={{fontSize:"10px",background:`${team?.color}30`,color:team?.color,padding:"2px 8px",borderRadius:"20px",fontWeight:700}}>{team?.name.toUpperCase()}</span>
                      {n.hot&&<span style={{fontSize:"9px",background:"rgba(220,38,38,0.2)",color:"#ff6b6b",padding:"2px 8px",borderRadius:"20px",fontWeight:700}}>HOT</span>}
                    </div>
                    <div style={{fontSize:"14px",fontWeight:600,lineHeight:1.4,marginBottom:"6px"}}>{n.title}</div>
                    <div style={{fontSize:"11px",color:"rgba(255,255,255,0.3)"}}>{n.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="invite"&&(
          <div>
            <div style={{background:"linear-gradient(135deg,rgba(0,135,81,0.18),rgba(255,215,0,0.08),rgba(220,38,38,0.12))",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"20px",padding:"28px",marginBottom:"20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
              <div style={{fontSize:"52px",marginBottom:"12px"}}>🤝</div>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"26px",fontWeight:800,margin:"0 0 8px",background:"linear-gradient(135deg,#fff,#ffd700)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BRING YOUR CREW</h2>
              <p style={{color:"rgba(255,255,255,0.45)",fontSize:"13px",margin:"0 0 16px",lineHeight:1.6}}>Share Africa WC Hub with friends and fans. Let's cheer Africa's 10 teams together!</p>
              <div style={{display:"flex",justifyContent:"center",gap:"16px",flexWrap:"wrap"}}>
                {[["🌍","10 Teams"],["🗳️","Polls"],["📅","Fixtures"],["⭐","Ratings"]].map(([icon,label])=>(
                  <div key={label} style={{textAlign:"center"}}>
                    <div style={{fontSize:"22px"}}>{icon}</div>
                    <div style={{fontSize:"10px",color:"rgba(255,255,255,0.35)",marginTop:"2px"}}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"2px",color:"rgba(255,255,255,0.3)",marginBottom:"10px"}}>SHARE ON SOCIAL MEDIA</div>
            <div style={{display:"grid",gap:"10px",marginBottom:"20px"}}>
              <button onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(inviteMsg)}`,"_blank")}
                style={{background:"rgba(37,211,102,0.12)",border:"1px solid rgba(37,211,102,0.25)",borderRadius:"14px",padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:"14px",textAlign:"left"}}>
                <div style={{fontSize:"30px",flexShrink:0}}>💬</div>
                <div style={{flex:1}}>
                  <div style={{color:"#25d366",fontWeight:700,fontSize:"14px",fontFamily:"'Syne',sans-serif"}}>Share on WhatsApp</div>
                  <div style={{color:"rgba(255,255,255,0.4)",fontSize:"12px",marginTop:"2px"}}>Send to your football group chats</div>
                </div>
                <span style={{color:"rgba(255,255,255,0.2)"}}>→</span>
              </button>
              <button onClick={()=>{ const msg=encodeURIComponent(`Africa has a RECORD 10 teams at World Cup 2026! Track all of them on Africa WC Hub 👉 ${appUrl} #WorldCup2026 #Africa #WC2026`); window.open(`https://twitter.com/intent/tweet?text=${msg}`,"_blank"); }}
                style={{background:"rgba(29,161,242,0.1)",border:"1px solid rgba(29,161,242,0.2)",borderRadius:"14px",padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:"14px",textAlign:"left"}}>
                <div style={{fontSize:"30px",flexShrink:0}}>🐦</div>
                <div style={{flex:1}}>
                  <div style={{color:"#1da1f2",fontWeight:700,fontSize:"14px",fontFamily:"'Syne',sans-serif"}}>Post on X / Twitter</div>
                  <div style={{color:"rgba(255,255,255,0.4)",fontSize:"12px",marginTop:"2px"}}>Let your followers know</div>
                </div>
                <span style={{color:"rgba(255,255,255,0.2)"}}>→</span>
              </button>
              <button onClick={()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`,"_blank")}
                style={{background:"rgba(66,103,178,0.1)",border:"1px solid rgba(66,103,178,0.2)",borderRadius:"14px",padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:"14px",textAlign:"left"}}>
                <div style={{fontSize:"30px",flexShrink:0}}>📘</div>
                <div style={{flex:1}}>
                  <div style={{color:"#4267b2",fontWeight:700,fontSize:"14px",fontFamily:"'Syne',sans-serif"}}>Share on Facebook</div>
                  <div style={{color:"rgba(255,255,255,0.4)",fontSize:"12px",marginTop:"2px"}}>Share with friends and groups</div>
                </div>
                <span style={{color:"rgba(255,255,255,0.2)"}}>→</span>
              </button>
            </div>

            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"2px",color:"rgba(255,255,255,0.3)",marginBottom:"10px"}}>COPY LINK</div>
            <div className="card" style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px"}}>
              <div style={{flex:1,fontSize:"12px",color:"rgba(255,255,255,0.4)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{appUrl}</div>
              <button onClick={()=>copyText(appUrl,"link")}
                style={{background:"linear-gradient(135deg,#00c853,#009e3e)",border:"none",color:"#fff",padding:"8px 18px",borderRadius:"8px",cursor:"pointer",fontSize:"13px",fontWeight:700,flexShrink:0}}>
                {copied==="link"?"Done!":"COPY"}
              </button>
            </div>

            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"2px",color:"rgba(255,255,255,0.3)",marginBottom:"10px"}}>READY-TO-SEND MESSAGE</div>
            <div className="card" style={{padding:"18px",marginBottom:"20px"}}>
              <div style={{fontSize:"13px",color:"rgba(255,255,255,0.6)",lineHeight:1.8,marginBottom:"14px",background:"rgba(255,255,255,0.03)",borderRadius:"10px",padding:"14px",whiteSpace:"pre-line"}}>
                {`Africa has a RECORD 10 teams at World Cup 2026!\n\nI am following Morocco, Senegal, Egypt, Ghana, Algeria, Tunisia, Ivory Coast, Cape Verde, South Africa and DR Congo on Africa WC Hub.\n\nReal fixtures, polls, player ratings 👉 ${appUrl}\n\n🇲🇦🇸🇳🇪🇬🇬🇭🇩🇿🇹🇳🇨🇮🇨🇻🇿🇦🇨🇩 Let's go Africa!`}
              </div>
              <button onClick={()=>copyText(inviteMsg,"msg")}
                style={{width:"100%",background:"linear-gradient(135deg,#ffd700,#ff9500)",border:"none",color:"#000",padding:"13px",borderRadius:"10px",cursor:"pointer",fontSize:"14px",fontWeight:800,fontFamily:"'Syne',sans-serif",letterSpacing:"1px"}}>
                {copied==="msg"?"✅ COPIED!":"📋 COPY FULL MESSAGE"}
              </button>
            </div>

            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"2px",color:"rgba(255,255,255,0.3)",marginBottom:"10px"}}>SHARE YOUR TEAM</div>
            <div style={{fontSize:"12px",color:"rgba(255,255,255,0.35)",marginBottom:"12px"}}>Tap your team and share a personalised card</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"8px",marginBottom:"24px"}}>
              {TEAMS.map(team=>(
                <button key={team.id} onClick={()=>setShareCard(team)}
                  style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${team.color}40`,borderRadius:"12px",padding:"12px 6px",cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
                  <div style={{fontSize:"26px",marginBottom:"4px"}}>{team.flag}</div>
                  <div style={{fontSize:"9px",fontWeight:700,color:"#fff",lineHeight:1.2}}>{team.name}</div>
                </button>
              ))}
            </div>

            <div style={{textAlign:"center",padding:"16px 0"}}>
              <div style={{fontSize:"10px",color:"rgba(255,255,255,0.2)",letterSpacing:"2px",marginBottom:"10px"}}>REPRESENTING AFRICA AT WC 2026</div>
              <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap",gap:"8px",fontSize:"26px"}}>
                {TEAMS.map(t=><span key={t.id}>{t.flag}</span>)}
              </div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,0.25)",marginTop:"10px"}}>10 nations · One continent · One dream 🌍</div>
            </div>
          </div>
        )}

        {tab==="team"&&selectedTeam&&(
          <div>
            <div style={{background:`linear-gradient(135deg,${selectedTeam.color}22,transparent)`,border:`1px solid ${selectedTeam.color}40`,borderRadius:"20px",padding:"24px",marginBottom:"16px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:"-10px",right:"-10px",fontSize:"100px",opacity:0.05}}>{selectedTeam.flag}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontSize:"48px",marginBottom:"4px"}}>{selectedTeam.flag}</div>
                  <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"26px",margin:"0 0 4px",fontWeight:800}}>{selectedTeam.name}</h2>
                  <div style={{fontSize:"13px",color:"rgba(255,255,255,0.45)"}}>{selectedTeam.nickname} · Group {selectedTeam.group}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"8px",alignItems:"flex-end"}}>
                  <button onClick={()=>setFav(selectedTeam.id)}
                    style={{background:favoriteTeam===selectedTeam.id?"rgba(255,215,0,0.18)":"rgba(255,255,255,0.07)",border:favoriteTeam===selectedTeam.id?"1px solid rgba(255,215,0,0.4)":"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",padding:"8px 14px",color:favoriteTeam===selectedTeam.id?"#ffd700":"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:"13px",fontWeight:700}}>
                    {favoriteTeam===selectedTeam.id?"❤️ My Team":"🤍 Follow"}
                  </button>
                  <button onClick={()=>setShareCard(selectedTeam)}
                    style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",padding:"8px 14px",color:"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:"13px",fontWeight:700}}>
                    🔗 Share
                  </button>
                </div>
              </div>
              <div style={{display:"flex",gap:"12px",marginTop:"16px",flexWrap:"wrap"}}>
                {[
                  {label:"GROUP",   value:selectedTeam.group},
                  {label:"FIFA RANK",value:`#${selectedTeam.fifa_rank}`},
                  {label:"TARGET",  value:selectedTeam.target},
                ].map(s=>(
                  <div key={s.label} style={{textAlign:"center",background:"rgba(0,0,0,0.2)",borderRadius:"10px",padding:"8px 14px"}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:s.label==="TARGET"?"14px":"22px",color:"#ffd700",lineHeight:1}}>{s.value}</div>
                    <div style={{fontSize:"9px",color:"rgba(255,255,255,0.35)",letterSpacing:"1.5px",marginTop:"2px"}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:"12px",padding:"4px",marginBottom:"16px"}}>
              {[["overview","Overview"],["matches","Matches"],["squad","Squad"]].map(([t,l])=>(
                <button key={t} onClick={()=>setTeamTab(t)}
                  style={{flex:1,padding:"8px",background:teamTab===t?"rgba(255,255,255,0.1)":"transparent",border:"none",color:teamTab===t?"#fff":"rgba(255,255,255,0.35)",cursor:"pointer",borderRadius:"8px",fontSize:"12px",fontWeight:teamTab===t?700:400,transition:"all 0.2s"}}>
                  {l}
                </button>
              ))}
            </div>

            {teamTab==="overview"&&(
              <div>
                <div className="card" style={{padding:"18px",marginBottom:"12px"}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"1px",color:"rgba(255,255,255,0.35)",marginBottom:"10px"}}>ABOUT THIS TEAM</div>
                  <p style={{fontSize:"14px",color:"rgba(255,255,255,0.7)",lineHeight:1.7,margin:0}}>{selectedTeam.bio}</p>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
                  {[
                    {label:"Coach",       value:selectedTeam.coach},
                    {label:"Star Player", value:selectedTeam.star_player},
                    {label:"Group",       value:`Group ${selectedTeam.group}`},
                    {label:"FIFA Rank",   value:`#${selectedTeam.fifa_rank}`},
                  ].map(s=>(
                    <div key={s.label} className="card" style={{padding:"14px"}}>
                      <div style={{fontSize:"10px",color:"rgba(255,255,255,0.3)",letterSpacing:"1px",marginBottom:"4px"}}>{s.label.toUpperCase()}</div>
                      <div style={{fontSize:"13px",fontWeight:700}}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {teamTab==="matches"&&(
              <div>
                <div style={{fontSize:"12px",color:"rgba(255,255,255,0.35)",marginBottom:"12px"}}>WC 2026 Group Stage fixtures</div>
                {selectedTeam.matches.map(m=>(
                  <div key={m.id} className="card" style={{padding:"16px",marginBottom:"10px",borderLeft:`3px solid ${selectedTeam.color}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
                      <div style={{fontSize:"15px",fontWeight:700}}>{selectedTeam.flag} {selectedTeam.name}</div>
                      <div style={{fontSize:"10px",background:"rgba(255,255,255,0.07)",padding:"3px 9px",borderRadius:"20px",color:"rgba(255,255,255,0.4)"}}>GROUP {selectedTeam.group}</div>
                    </div>
                    <div style={{fontSize:"13px",color:"rgba(255,255,255,0.55)",marginBottom:"10px"}}>vs {m.opponent}</div>
                    <div style={{display:"flex",gap:"12px",fontSize:"12px",color:"rgba(255,255,255,0.35)",flexWrap:"wrap"}}>
                      <span>📅 {m.date} 2026</span>
                      <span>🕐 {m.time}</span>
                      <span>📍 {m.venue}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {teamTab==="squad"&&(
              <div>
                <div style={{fontSize:"12px",color:"rgba(255,255,255,0.35)",marginBottom:"12px"}}>Tap the stars to rate each player at WC 2026</div>
                {selectedTeam.players.map(player=>{
                  const key=`${selectedTeam.id}_${player.name}`;
                  const myRating=ratings[key]||0;
                  return (
                    <div key={player.name} className="card" style={{padding:"14px 16px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"12px"}}>
                      <div style={{width:"40px",height:"40px",borderRadius:"50%",background:`${selectedTeam.color}25`,border:`2px solid ${selectedTeam.color}50`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:"14px",color:selectedTeam.color,flexShrink:0}}>{player.rating}</div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:"14px"}}>{player.name}</div>
                        <div style={{fontSize:"11px",color:"rgba(255,255,255,0.35)"}}>{player.pos} · {player.club}</div>
                      </div>
                      <div style={{display:"flex",gap:"1px",flexShrink:0}}>
                        {[1,2,3,4,5].map(s=>(
                          <button key={s} onClick={()=>handleRating(selectedTeam.id,player.name,s)}
                            style={{background:"none",border:"none",cursor:"pointer",fontSize:"18px",padding:"2px",opacity:s<=myRating?1:0.2,transition:"opacity 0.15s"}}>⭐</button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,background:"rgba(8,12,10,0.97)",backdropFilter:"blur(16px)",borderTop:"1px solid rgba(255,255,255,0.06)",padding:"8px 0 4px"}}>
        <div style={{maxWidth:"680px",margin:"0 auto",display:"flex"}}>
          {[
            {id:"home",     icon:"🌍", label:"Teams"},
            {id:"schedule", icon:"📅", label:"Schedule"},
            {id:"polls",    icon:"🗳️", label:"Polls"},
            {id:"news",     icon:"📰", label:"News"},
            {id:"invite",   icon:"🤝", label:"Invite"},
          ].map(n=>(
            <button key={n.id} onClick={()=>{setTab(n.id);setSelectedTeam(null);}}
              style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"6px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",opacity:tab===n.id&&!selectedTeam?1:0.35,transition:"opacity 0.2s"}}>
              <div style={{fontSize:"20px"}}>{n.icon}</div>
              <div style={{fontSize:"9px",color:"#fff",fontWeight:tab===n.id&&!selectedTeam?700:400,letterSpacing:"0.5px"}}>{n.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamCard({team,isFav,onOpen,onFav,onShare,delay}) {
  return (
    <div className="card team-card" style={{padding:"16px",display:"flex",alignItems:"center",gap:"14px",cursor:"pointer",borderLeft:`3px solid ${team.color}`,animation:`slideIn 0.3s ease ${delay}s both`}}
      onClick={()=>onOpen(team)}>
      <div style={{fontSize:"38px",flexShrink:0}}>{team.flag}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"15px"}}>{team.name}</div>
          <div style={{fontSize:"9px",background:`${team.color}25`,color:team.color,padding:"2px 7px",borderRadius:"20px",fontWeight:700,flexShrink:0}}>GRP {team.group}</div>
        </div>
        <div style={{fontSize:"12px",color:"rgba(255,255,255,0.4)"}}>{team.nickname} · ⭐ {team.star_player}</div>
        <div style={{fontSize:"11px",color:"rgba(255,255,255,0.25)",marginTop:"2px"}}>🎯 {team.target}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",flexShrink:0}}>
        <button onClick={e=>{e.stopPropagation();onFav(team.id);}}
          style={{background:"none",border:"none",cursor:"pointer",fontSize:"18px",padding:"4px",opacity:isFav?1:0.25,transition:"all 0.2s",transform:isFav?"scale(1.2)":"scale(1)"}}>
          {isFav?"❤️":"🤍"}
        </button>
        <button onClick={e=>{e.stopPropagation();onShare(team);}}
          style={{background:"none",border:"none",cursor:"pointer",fontSize:"14px",padding:"4px",opacity:0.4}}>
          🔗
        </button>
      </div>
    </div>
  );
}

function GlowBg() {
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}>
      <div style={{position:"absolute",top:"-10%",left:"-10%",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,135,81,0.1) 0%,transparent 70%)"}}/>
      <div style={{position:"absolute",bottom:"-10%",right:"-10%",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,rgba(220,38,38,0.08) 0%,transparent 70%)"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,215,0,0.03) 0%,transparent 70%)"}}/>
    </div>
  );
}
function Confetti({active}) {
  if(!active)return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,pointerEvents:"none"}}>
      {Array.from({length:50}).map((_,i)=>(
        <div key={i} style={{position:"absolute",top:"-10px",left:`${Math.random()*100}%`,width:`${4+Math.random()*8}px`,height:`${4+Math.random()*8}px`,borderRadius:Math.random()>0.5?"50%":"2px",background:["#00c853","#ffd700","#ff4444","#00aaff","#ff6b6b","#ffffff"][Math.floor(Math.random()*6)],animation:`fall ${0.7+Math.random()*1.5}s ease-in forwards`,animationDelay:`${Math.random()*0.5}s`}}/>
      ))}
    </div>
  );
}
function Toast({toast}) {
  return <div style={{position:"fixed",top:"70px",left:"50%",transform:"translateX(-50%)",zIndex:2000,background:toast.type==="error"?"#ef4444":"#00c853",color:"#fff",padding:"10px 20px",borderRadius:"12px",fontWeight:700,fontSize:"13px",animation:"slideIn 0.3s ease",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",whiteSpace:"nowrap",maxWidth:"90vw"}}>{toast.msg}</div>;
}

const CSS=`
  @keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0;}}
  @keyframes slideIn{from{transform:translateY(-16px);opacity:0;}to{transform:translateY(0);opacity:1;}}
  .card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:16px;backdrop-filter:blur(8px);transition:all 0.2s;}
  .team-card:active{background:rgba(255,255,255,0.07);}
  *{box-sizing:border-box;}
  input::placeholder{color:rgba(255,255,255,0.25);}
  button{font-family:'DM Sans',sans-serif;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px;}
`;
