import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PranicDashboard() {
  const [pci, setPci] = useState(0.72);
  const [stressProb, setStressProb] = useState(0.18);
  const [events, setEvents] = useState([
    { time: new Date().toLocaleTimeString(), label: "Boot", pci: 0.72 }
  ]);

  useEffect(() => {
    const stored = localStorage.getItem('pranic_events');
    if (stored) {
      try { setEvents(JSON.parse(stored)); } catch(e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pranic_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPci((p) => {
        let n = p + (Math.random() * 0.04 - 0.02);
        return Math.min(1, Math.max(0, n));
      });
      setStressProb((s) => {
        let n = s + (Math.random() * 0.06 - 0.03);
        return Math.min(1, Math.max(0, n));
      });
      if (Math.random() < 0.08) {
        const ev = { time: new Date().toLocaleTimeString(), label: Math.random() < 0.5 ? 'Guided breath' : 'Stress spike', pci: Math.random() };
        setEvents((es) => [ev, ...es].slice(0, 50));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const perc = (pci * 100).toFixed(0);
  const stressPerc = (stressProb * 100).toFixed(0);

  return (
    <div style={{minHeight:'100vh', padding:24}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{fontSize:28}}>Pranic Field Dashboard</h1>
        <div style={{color:'#94a3b8'}}>Real-time PCI Monitoring</div>
      </header>

      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:20}}>
        <Gauge title='Pranic Coherence Index (PCI)' value={pci} color='teal' />
        <Gauge title='Stress Probability' value={stressProb} color='rose' />
      </section>

      <section style={{marginTop:18}}>
        <MiniChart pci={pci} />
      </section>

      <section style={{marginTop:18}}>
        <EventTimeline events={events} />
      </section>
    </div>
  );
}

function Gauge({ title, value }) {
  const percent = (value * 100).toFixed(0);
  return (
    <div style={{background:'var(--card)', borderRadius:12, padding:18}}>
      <h2 style={{margin:0, marginBottom:12}}>{title}</h2>
      <div style={{display:'flex', alignItems:'center', gap:16}}>
        <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity }} style={{width:120, height:120, borderRadius:60, background:'#063c34', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{width:96, height:96, borderRadius:48, background:'#0b1220', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{fontSize:24, fontWeight:700}}>{percent}%</div>
          </div>
        </motion.div>
        <div>
          <div style={{color:'#94a3b8'}}>Value</div>
          <div style={{fontSize:18, fontWeight:600}}>{percent}%</div>
        </div>
      </div>
    </div>
  );
}

function MiniChart({ pci }) {
  const points = Array.from({ length: 20 }, () => 0.5 + Math.random() * 0.4);
  points.push(pci);
  return (
    <div style={{background:'var(--card)', padding:16, borderRadius:12}}>
      <h3 style={{marginTop:0}}>PCI Trend (Last samples)</h3>
      <div style={{display:'flex', alignItems:'end', gap:4, height:96}}>
        {points.map((v,i) => (<div key={i} style={{width:6, background:'#06b6d4', height:`${v*100}%`, borderRadius:3}} />))}
      </div>
    </div>
  );
}

function EventTimeline({ events }) {
  return (
    <div style={{background:'var(--card)', padding:16, borderRadius:12}}>
      <h3 style={{marginTop:0}}>Event Timeline</h3>
      <div style={{display:'flex', flexDirection:'column', gap:8}}>
        {events.map((e,i) => (
          <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#0f1724', padding:10, borderRadius:8}}>
            <div>
              <div style={{fontWeight:600}}>{e.label}</div>
              <div style={{color:'#94a3b8', fontSize:13}}>PCI: {(e.pci*100).toFixed(0)}%</div>
            </div>
            <div style={{color:'#cbd5e1'}}>{e.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
