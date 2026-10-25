"use client";
import {FormEvent, useEffect, useMemo, useState} from "react";
import seed from "@/data/demo_submissions.json";
import {eligibility, rankSubmissions, sponsorScore, type Submission} from "@/lib/league";

const initial = seed as Submission[];
export default function Home() {
  const [hydrated,setHydrated]=useState(false);
  const [region,setRegion]=useState("All");
  const [items,setItems]=useState(initial);
  const [notice,setNotice]=useState("");
  const [loading,setLoading]=useState(false);
  useEffect(()=>setHydrated(true),[]);
  const ranked=useMemo(()=>rankSubmissions(region==="All"?items:items.filter(x=>x.region===region)),[items,region]);
  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); setNotice(""); const formElement=e.currentTarget; const form=new FormData(formElement);
    const school=String(form.get("school")||"").trim(); const url=String(form.get("url")||"").trim();
    if(school.length<3 || !/^https:\/\//.test(url)){setNotice("Add a school name and a secure video link.");return;}
    setLoading(true);
    window.setTimeout(()=>{
      setItems(v=>[...v,{id:`demo-${v.length+1}`,school,region:String(form.get("region")),captain:"Demo captain",challenge:"30-touch relay",views:0,completion:0,facultyVerified:Boolean(form.get("faculty")),consentComplete:Boolean(form.get("consent")),status:"hold"}]);
      setLoading(false); setNotice("Demo submission added to the review queue."); formElement.reset();
    },350);
  }
  function verify(id:string){setItems(v=>v.map(x=>x.id===id?{...x,facultyVerified:true,consentComplete:true,status:"ready"}:x));setNotice("Demo verification complete. Ranking recalculated.");}
  return <main data-hydrated={hydrated}>
    <header className="hero">
      <nav><span className="brand">LOOP<span>LEAGUE</span></span><span className="demo">SIMULATED SEASON DESK</span></nav>
      <div className="heroGrid"><div><p className="eyebrow">SPONSOR OPS / SEASON 01</p><h1>Turn school energy into a league brands can trust.</h1><p className="lede">Collect weekly clips, clear consent, verify faculty sponsors, and publish one sponsor-ready regional ranking.</p></div><div className="stat"><b>20</b><span>target schools</span><b>8 weeks</b><span>managed season</span></div></div>
    </header>
    <section className="metrics" aria-label="Season summary"><div><b>{items.length}</b><span>submissions</span></div><div><b>{items.filter(x=>x.status==="ready").length}</b><span>sponsor-ready</span></div><div><b>{items.reduce((n,x)=>n+x.views,0).toLocaleString()}</b><span>demo views</span></div><div><b>1</b><span>active brand brief</span></div></section>
    <div className="workspace">
      <section className="panel board"><div className="panelHead"><div><p className="eyebrow">VERIFIED LEADERBOARD</p><h2>North + East regional pulse</h2></div><div className="filters" aria-label="Filter region">{["All","North","East"].map(r=><button type="button" aria-pressed={region===r} className={region===r?"active":""} onClick={()=>setRegion(r)} key={r}>{r}</button>)}</div></div>
        {ranked.length===0?<p className="empty">No submissions in this region.</p>:<ol>{ranked.map((s,i)=><li key={s.id}><span className="rank">{String(i+1).padStart(2,"0")}</span><div className="school"><b>{s.school}</b><span>{s.challenge} · {s.views.toLocaleString()} views</span></div><span className={`pill ${s.status}`}>{eligibility(s)}</span><b className="score">{sponsorScore(s)}</b>{s.status==="hold"&&<button type="button" className="verify" onClick={()=>verify(s.id)}>Verify demo</button>}</li>)}</ol>}
      </section>
      <aside className="panel submit"><p className="eyebrow">INTAKE</p><h2>Add weekly proof</h2><p>Fixture-only demo. No video is uploaded or stored.</p><form onSubmit={submit} noValidate><label>School<input name="school" placeholder="e.g. Westfield High" /></label><label>Region<select name="region"><option>North</option><option>East</option></select></label><label>Video link<input name="url" placeholder="https://…" inputMode="url" /></label><label className="check"><input type="checkbox" name="faculty" /> Faculty sponsor confirmed</label><label className="check"><input type="checkbox" name="consent" /> Guardian consent complete</label><button className="primary" disabled={loading}>{loading?"Checking…":"Add to review queue"}</button></form><p className="notice" role="status">{notice}</p></aside>
    </div>
    <footer><span>Demo data is fictional. Scores are deterministic, not AI-generated.</span><a href="https://www.ideabrowser.com/hub/ideas/today">Source idea ↗</a></footer>
  </main>
}
