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
              <button onC
