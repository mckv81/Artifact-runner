import { useState, useEffect, useCallback } from "react";

const T = {
  bg: '#07070F', s1: '#0C0C1E', s2: '#131328', s3: '#1A1A35',
  b1: '#1E1E3A', b2: '#2A2A48',
  v: '#8B5CF6', c: '#06B6D4', p: '#EC4899', g: '#F59E0B',
  ok: '#10B981', er: '#EF4444',
  t1: '#E2E2F0', t2: '#6E6E9A', t3: '#3A3A5C',
  cin: '"Cinzel",serif', int: '"Inter",sans-serif', mono: '"JetBrains Mono","Fira Code",monospace',
};

function useStorage(key, init) {
  const [val, setVal] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    window.storage.get(key)
      .then(r => setVal(r ? JSON.parse(r.value) : init))
      .catch(() => setVal(init))
      .finally(() => setReady(true));
  }, [key]);
  const set = useCallback(async v => {
    setVal(v);
    try { await window.storage.set(key, JSON.stringify(v)); } catch {}
  }, [key]);
  return [val, set, ready];
}

const SEED = {
  collections: [
    { id:'c1', name:'Mushroom Spirits', code:'MUSH', desc:'Ethereal fungal entities from the forest floor. Bioluminescent, ancient, wise.', paletteId:'p1', styleId:'s1', motifs:'mushrooms, mycelium, bioluminescence, moss, forest floor', forbidden:'geometric, urban, industrial', guidelines:'Soft organic forms, dreamy atmosphere, watercolor textures', aspectRatio:'1:1', template:'ethereal {motif} spirit, bioluminescent glow, mystical forest, {palette}, {style}, highly detailed', active:true, colors:['#1A3A1A','#2D6A2D','#8B4513','#DDA0DD'] },
    { id:'c2', name:'Celestial Mechanics', code:'CLEM', desc:'Sacred geometry meets star maps. Astronomical instruments and cosmic order.', paletteId:'p2', styleId:'s2', motifs:'stars, planets, orrery, constellations, celestial maps', forbidden:'organic shapes, animals, flowers', guidelines:'Sharp line art, technical precision, gold leaf details', aspectRatio:'1:1', template:'celestial {motif}, sacred geometry, astronomical, {palette}, {style}, engraved illustration', active:true, colors:['#0A0A2E','#1A1A5E','#FFD700','#C0C0FF'] },
  ],
  palettes: [
    { id:'p1', name:'Neon Forest', hexes:['#0D2B0D','#1A5C1A','#4CAF50','#7FFF00','#DDA0DD','#9B59B6'], mood:'Alive, electric, verdant — forest after rain with bioluminescent mushrooms', notes:'Dark greens as base, electric accents for glow. Primary for Mushroom Spirits.' },
    { id:'p2', name:'Midnight Gold', hexes:['#0A0A2E','#1A1A5E','#2E2E8E','#4040BE','#FFD700','#FFF0A0'], mood:'Celestial, regal, mathematical — deep space with golden starlight', notes:'Deep navy base, gold for line work. Primary for Celestial Mechanics.' },
    { id:'p3', name:'Desert Sun', hexes:['#3D1F0D','#8B4513','#D2691E','#DAA520','#FFE4B5','#FFF8DC'], mood:'Ancient, warm, dry — sun-baked earth and golden hour light', notes:'Warm earth tones throughout, no cool colors.' },
    { id:'p4', name:'Violet Ritual', hexes:['#1A0033','#4B0082','#7B2FBE','#9B59B6','#DA70D6','#F8F0FF'], mood:'Mystical, deep, ceremonial — twilight ceremony in a sacred grove', notes:'Universal accent palette. Works across all collections.' },
  ],
  styles: [
    { id:'s1', name:'Organic Dream', lineWeight:'Variable 0.5–3pt, pressure-sensitive', texture:'Watercolor paper grain, soft bleeds, visible brushwork', renderMode:'Painterly — no hard digital edges', shading:'Layered washes, wet-on-wet bleeding', refs:'Arthur Rackham, Nori Kageyama, Stephanie Law' },
    { id:'s2', name:'Precision Engraving', lineWeight:'Fine uniform 0.25–1pt, crosshatched', texture:'Aged parchment, fine grain, gold foil accents', renderMode:'Technical illustration, engraved print aesthetic', shading:'Crosshatching, stippling, parallel lines', refs:'Antique celestial atlases, Albrecht Dürer' },
    { id:'s3', name:'Neon Ukiyo-e', lineWeight:'Bold flat 2–5pt, woodblock aesthetic', texture:'Flat color planes, rice paper grain', renderMode:'Flat graphic, high contrast, bold outlines', shading:'Flat color with minimal gradient', refs:'Hiroshige, Hokusai, Nobrow Press' },
  ],
  designs: [
    { id:'d1', name:'Forest Elder', dcode:'MUSH-001', collId:'c1', palId:'p1', styId:'s1', promptBase:'ancient mushroom elder spirit, wise eyes, mossy crown', finalPrompt:'ancient mushroom elder spirit, wise eyes, mossy crown, bioluminescent glow, dark greens and electric accents, watercolor grain, painterly, highly detailed, 1:1', ratio:'1:1', size:'2048×2048', channel:'Redbubble', batch:'BATCH-001', status:'ready', tags:['mushroom','spirit','elder','hero'], notes:'First hero piece for Mushroom Spirits.', links:[] },
    { id:'d2', name:'Mycelium Network', dcode:'MUSH-002', collId:'c1', palId:'p1', styId:'s1', promptBase:'underground mycelium network glowing, root connections, forest cross-section', finalPrompt:'underground mycelium network glowing, root connections, forest floor cross-section, bioluminescent threads, watercolor style, highly detailed', ratio:'16:9', size:'2048×1152', channel:'Etsy', batch:'BATCH-001', status:'draft', tags:['mycelium','network','panoramic'], notes:'Panoramic. Great for desktop prints.', links:[] },
    { id:'d3', name:'Star Orrery', dcode:'CLEM-001', collId:'c2', palId:'p2', styId:'s2', promptBase:'antique brass orrery, solar system model, celestial mechanics', finalPrompt:'antique brass orrery, solar system model, sacred geometry overlay, midnight blue background, gold line work, precision engraving, highly detailed', ratio:'1:1', size:'2048×2048', channel:'Etsy', batch:'BATCH-002', status:'exported', tags:['orrery','celestial','brass','gold'], notes:'Ready for Etsy upload.', links:[] },
  ],
  uploads: [],
};

const EXPORT_PRESETS = [
  { id:'zaz', name:'Zazzle Apparel', platform:'Zazzle', ratio:'1:1', px:'14400×14400', dpi:300, type:'PNG', alpha:true },
  { id:'rbs', name:'Redbubble Sticker', platform:'Redbubble', ratio:'Free', px:'2400×2400', dpi:300, type:'PNG', alpha:true },
  { id:'etp', name:'Etsy Printable 8×10', platform:'Etsy', ratio:'4:5', px:'2400×3000', dpi:300, type:'JPG', alpha:false },
  { id:'pin', name:'Pinterest Pin', platform:'Pinterest', ratio:'2:3', px:'1000×1500', dpi:72, type:'JPG', alpha:false },
  { id:'igs', name:'Instagram Square', platform:'Instagram', ratio:'1:1', px:'1080×1080', dpi:72, type:'JPG', alpha:false },
  { id:'igr', name:'Instagram Reel Cover', platform:'Instagram', ratio:'9:16', px:'1080×1920', dpi:72, type:'JPG', alpha:false },
  { id:'pst', name:'Large Poster 24×36', platform:'General', ratio:'2:3', px:'7200×10800', dpi:300, type:'PNG', alpha:false },
  { id:'pfl', name:'Printful T-Shirt', platform:'Printful', ratio:'12:15', px:'4500×5400', dpi:300, type:'PNG', alpha:true },
];

const inp = { width:'100%', background:T.bg, border:`1px solid ${T.b1}`, borderRadius:6, color:T.t1, fontSize:13, padding:'8px 12px', outline:'none', boxSizing:'border-box', fontFamily:T.int };
const lbl = { fontSize:11, color:T.t2, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:T.int, display:'block', marginBottom:4 };

function Badge({ label, color = T.v }) {
  return <span style={{ display:'inline-block', padding:'2px 8px', borderRadius:4, fontSize:11, background:color+'25', color, border:`1px solid ${color}40`, fontFamily:T.int, whiteSpace:'nowrap' }}>{label}</span>;
}

function StatusBadge({ status }) {
  const map = { draft:T.t2, ready:T.ok, exported:T.g, live:T.c, archived:T.t3 };
  return <Badge label={status} color={map[status]||T.t2} />;
}

function Btn({ children, onClick, variant='primary', sm, disabled }) {
  const vs = {
    primary:{ background:T.v, color:'#fff', border:'none' },
    ghost:{ background:'transparent', color:T.t2, border:`1px solid ${T.b1}` },
    cyan:{ background:T.c+'20', color:T.c, border:`1px solid ${T.c}40` },
    danger:{ background:T.er+'20', color:T.er, border:`1px solid ${T.er}40` },
    success:{ background:T.ok+'20', color:T.ok, border:`1px solid ${T.ok}40` },
    pink:{ background:T.p+'20', color:T.p, border:`1px solid ${T.p}40` },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...vs[variant], padding:sm?'4px 10px':'7px 14px', borderRadius:6, cursor:disabled?'default':'pointer', fontSize:sm?11:13, fontWeight:500, display:'inline-flex', alignItems:'center', gap:6, opacity:disabled?0.5:1, fontFamily:T.int, whiteSpace:'nowrap', lineHeight:1.4 }}>
      {children}
    </button>
  );
}

function Field({ label, children, span2 }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4, gridColumn:span2?'span 2':'span 1' }}>
      {label && <label style={lbl}>{label}</label>}
      {children}
    </div>
  );
}

function Inp({ value, onChange, placeholder, mono }) {
  return <input value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{ ...inp, fontFamily:mono?T.mono:T.int }} />;
}

function Sel({ value, onChange, options, placeholder }) {
  return (
    <select value={value||''} onChange={e=>onChange(e.target.value)} style={{ ...inp, cursor:'pointer' }}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => typeof o==='string'
        ? <option key={o} value={o}>{o}</option>
        : <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function Textarea({ value, onChange, placeholder, rows=3 }) {
  return <textarea value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...inp, resize:'vertical', fontFamily:T.mono, lineHeight:1.5 }} />;
}

function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(0,0,0,0.88)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ background:T.s1, border:`1px solid ${T.b2}`, borderRadius:12, width:'100%', maxWidth:wide?760:560, maxHeight:'90vh', overflow:'auto', boxShadow:`0 0 60px ${T.v}18` }}>
        <div style={{ padding:'15px 20px', borderBottom:`1px solid ${T.b1}`, display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:T.s1, zIndex:1 }}>
          <span style={{ fontFamily:T.cin, fontSize:15, color:T.t1 }}>{title}</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:T.t2, cursor:'pointer', fontSize:20, lineHeight:1, padding:'0 4px' }}>×</button>
        </div>
        <div style={{ padding:20 }}>{children}</div>
      </div>
    </div>
  );
}

function PH({ title, subtitle, action }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
      <div>
        <h1 style={{ fontFamily:T.cin, fontSize:22, color:T.t1, margin:0, letterSpacing:'0.05em' }}>{title}</h1>
        {subtitle && <p style={{ fontSize:13, color:T.t2, margin:'4px 0 0', fontFamily:T.int }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Empty({ icon, title, sub, cta }) {
  return (
    <div style={{ textAlign:'center', padding:'60px 20px' }}>
      <div style={{ fontSize:36, marginBottom:10, opacity:0.4, color:T.t2 }}>{icon}</div>
      <div style={{ fontFamily:T.cin, fontSize:15, color:T.t2, marginBottom:4 }}>{title}</div>
      <div style={{ fontSize:12, color:T.t3, marginBottom:14, fontFamily:T.int }}>{sub}</div>
      {cta}
    </div>
  );
}

function Hr() { return <div style={{ height:1, background:T.b1, margin:'14px 0' }} />; }

const NAV = [
  { id:'dashboard', icon:'⬡', label:'Dashboard' },
  { id:'collections', icon:'◈', label:'Collections' },
  { id:'designs', icon:'◫', label:'Designs' },
  { id:'palettes', icon:'◉', label:'Palettes' },
  { id:'styles', icon:'◌', label:'Styles' },
  { id:'prompt', icon:'✦', label:'Prompt Lab' },
  { id:'export', icon:'⬢', label:'Export Engine' },
  { id:'uploads', icon:'↑', label:'Uploads' },
];

function Sidebar({ active, onNav }) {
  return (
    <div style={{ width:208, minWidth:208, background:T.s1, borderRight:`1px solid ${T.b1}`, display:'flex', flexDirection:'column', height:'100vh', position:'sticky', top:0, flexShrink:0 }}>
      <div style={{ padding:'18px 16px 14px', borderBottom:`1px solid ${T.b1}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:30, height:30, borderRadius:'50%', background:`conic-gradient(${T.v},${T.c},${T.p},${T.v})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, flexShrink:0 }}>✦</div>
          <div>
            <div style={{ fontFamily:T.cin, fontSize:10, color:T.t1, letterSpacing:'0.18em', lineHeight:1.4 }}>WANDERING STAR</div>
            <div style={{ fontFamily:T.cin, fontSize:8, color:T.v, letterSpacing:'0.28em' }}>STUDIO</div>
          </div>
        </div>
      </div>
      <nav style={{ flex:1, padding:'10px 8px', display:'flex', flexDirection:'column', gap:1, overflowY:'auto' }}>
        {NAV.map(item => {
          const on = active===item.id;
          return (
            <button key={item.id} onClick={()=>onNav(item.id)} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', borderRadius:7, background:on?T.v+'22':'transparent', border:on?`1px solid ${T.v}45`:'1px solid transparent', color:on?T.v:T.t2, cursor:'pointer', fontSize:13, fontWeight:on?500:400, textAlign:'left', width:'100%', fontFamily:T.int, transition:'all 0.12s' }}>
              <span style={{ fontSize:14, width:18, textAlign:'center', flexShrink:0 }}>{item.icon}</span>
              <span style={{ flex:1 }}>{item.label}</span>
              {on && <div style={{ width:4, height:4, borderRadius:'50%', background:T.v, flexShrink:0 }} />}
            </button>
          );
        })}
      </nav>
      <div style={{ padding:'10px 16px', borderTop:`1px solid ${T.b1}` }}>
        <div style={{ fontSize:9, color:T.t3, fontFamily:T.mono, letterSpacing:'0.1em' }}>V1.0 · PERSONAL EDITION</div>
        <div style={{ fontSize:9, color:T.t3, marginTop:2, fontFamily:T.int }}>V2 multi-user architecture ready</div>
      </div>
    </div>
  );
}

function Dashboard({ collections, designs, palettes, onNav }) {
  const cols = collections||[], des = designs||[];
  const stats = [
    { label:'Active Collections', val:cols.filter(c=>c.active).length, color:T.v },
    { label:'Total Designs', val:des.length, color:T.c },
    { label:'Ready to Export', val:des.filter(d=>d.status==='ready').length, color:T.ok },
    { label:'Live / Published', val:des.filter(d=>d.status==='live'||d.status==='exported').length, color:T.g },
  ];
  const PLATFORMS = ['Printful','Printify','Zazzle','Spring','Redbubble','Etsy','Pinterest','Instagram'];
  return (
    <div style={{ padding:28, maxWidth:1100 }}>
      <PH title="Mission Control" subtitle="Your AI creative operating system · Wandering Star Studio" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:22 }}>
        {stats.map(st => (
          <div key={st.label} style={{ background:T.s1, border:`1px solid ${T.b1}`, borderTop:`2px solid ${st.color}`, borderRadius:10, padding:'15px 18px' }}>
            <div style={{ fontSize:28, fontFamily:T.cin, color:st.color, lineHeight:1 }}>{st.val}</div>
            <div style={{ fontSize:12, color:T.t2, marginTop:4, fontFamily:T.int }}>{st.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:14 }}>
        <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <span style={{ fontFamily:T.cin, fontSize:12, color:T.t1, letterSpacing:'0.08em' }}>Collections</span>
            <button onClick={()=>onNav('collections')} style={{ background:'none', border:'none', color:T.v, cursor:'pointer', fontSize:12, fontFamily:T.int }}>View all →</button>
          </div>
          {cols.length===0 ? <div style={{ fontSize:12, color:T.t3, fontFamily:T.int }}>No collections yet.</div>
            : cols.slice(0,5).map(col => (
              <div key={col.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', borderRadius:6, background:T.s2, marginBottom:5 }}>
                <div style={{ display:'flex', gap:3 }}>{(col.colors||[]).slice(0,4).map((c,i)=><div key={i} style={{ width:10,height:10,borderRadius:2,background:c }} />)}</div>
                <span style={{ flex:1, fontSize:13, color:T.t1, fontFamily:T.int }}>{col.name}</span>
                <Badge label={col.code} color={T.v} />
                {!col.active && <Badge label="off" color={T.t3} />}
              </div>
            ))}
        </div>
        <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <span style={{ fontFamily:T.cin, fontSize:12, color:T.t1, letterSpacing:'0.08em' }}>Recent Designs</span>
            <button onClick={()=>onNav('designs')} style={{ background:'none', border:'none', color:T.v, cursor:'pointer', fontSize:12, fontFamily:T.int }}>View all →</button>
          </div>
          {des.length===0 ? <div style={{ fontSize:12, color:T.t3, fontFamily:T.int }}>No designs yet.</div>
            : des.slice(0,5).map(d => (
              <div key={d.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', borderRadius:6, background:T.s2, marginBottom:5 }}>
                <div style={{ width:24, height:24, borderRadius:4, background:`linear-gradient(135deg,${T.v}30,${T.c}30)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:T.v, flexShrink:0 }}>◫</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, color:T.t1, fontFamily:T.int, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{d.name}</div>
                  <div style={{ fontSize:10, color:T.t2, fontFamily:T.mono }}>{d.dcode}</div>
                </div>
                <StatusBadge status={d.status} />
              </div>
            ))}
        </div>
      </div>
      <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:16 }}>
        <div style={{ fontFamily:T.cin, fontSize:12, color:T.t1, marginBottom:10, letterSpacing:'0.08em' }}>Publishing Platforms</div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {PLATFORMS.map(p => <div key={p} style={{ padding:'5px 13px', borderRadius:20, border:`1px solid ${T.b2}`, background:T.s2, fontSize:12, color:T.t2, fontFamily:T.int }}>{p}</div>)}
        </div>
        <div style={{ fontSize:11, color:T.t3, marginTop:8, fontFamily:T.int }}>Track live listing URLs in the Upload Tracker</div>
      </div>
    </div>
  );
}

function Collections({ collections, palettes, styles, setCollections }) {
  const [modal, setModal] = useState(false);
  const [eid, setEid] = useState(null);
  const [form, setForm] = useState({});
  const cols = collections||[];
  const f = (k,v) => setForm(p=>({...p,[k]:v}));

  function openNew() {
    setEid(null);
    setForm({ name:'', code:'', desc:'', paletteId:'', styleId:'', motifs:'', forbidden:'', guidelines:'', aspectRatio:'1:1', template:'', active:true, colors:['#8B5CF6','#06B6D4','#EC4899','#F59E0B'] });
    setModal(true);
  }
  function openEdit(col) { setEid(col.id); setForm({...col}); setModal(true); }
  function save() {
    const col = { ...form, id:eid||'c'+Date.now() };
    setCollections(eid ? cols.map(c=>c.id===eid?col:c) : [...cols, col]);
    setModal(false);
  }
  function del(id) { if (window.confirm('Delete this collection?')) setCollections(cols.filter(c=>c.id!==id)); }
  function toggle(id) { setCollections(cols.map(c=>c.id===id?{...c,active:!c.active}:c)); }

  return (
    <div style={{ padding:28 }}>
      <PH title="Collections" subtitle={`${cols.length} collections · ${cols.filter(c=>c.active).length} active`} action={<Btn onClick={openNew}>+ New Collection</Btn>} />
      {cols.length===0
        ? <Empty icon="◈" title="No collections yet" sub="Collections are the creative DNA of your studio." cta={<Btn onClick={openNew}>Create Collection</Btn>} />
        : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:16 }}>
            {cols.map(col => <CollCard key={col.id} col={col} palettes={palettes} onEdit={()=>openEdit(col)} onToggle={()=>toggle(col.id)} onDel={()=>del(col.id)} />)}
          </div>}
      <Modal open={modal} onClose={()=>setModal(false)} title={eid?'Edit Collection':'New Collection'} wide>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Field label="Collection Name"><Inp value={form.name} onChange={v=>f('name',v)} placeholder="e.g. Mushroom Spirits" /></Field>
          <Field label="Short Code (max 6)"><Inp value={form.code} onChange={v=>f('code',v.toUpperCase().slice(0,6))} placeholder="MUSH" /></Field>
          <Field label="Description" span2><Textarea value={form.desc} onChange={v=>f('desc',v)} rows={2} placeholder="What is this collection about?" /></Field>
          <Field label="Linked Palette">
            <Sel value={form.paletteId} onChange={v=>f('paletteId',v)} placeholder="— Select palette —" options={(palettes||[]).map(p=>({value:p.id,label:p.name}))} />
          </Field>
          <Field label="Default Aspect Ratio">
            <Sel value={form.aspectRatio} onChange={v=>f('aspectRatio',v)} options={['1:1','4:5','2:3','16:9','9:16','4:3','8:10','24:36']} />
          </Field>
          <Field label="Allowed Motifs (comma separated)" span2><Inp value={form.motifs} onChange={v=>f('motifs',v)} placeholder="mushrooms, forest floor, mycelium..." /></Field>
          <Field label="Forbidden Motifs" span2><Inp value={form.forbidden} onChange={v=>f('forbidden',v)} placeholder="geometric, urban, industrial..." /></Field>
          <Field label="Style Guidelines" span2><Textarea value={form.guidelines} onChange={v=>f('guidelines',v)} rows={2} placeholder="Visual style notes for this collection..." /></Field>
          <Field label="Prompt Template" span2><Textarea value={form.template} onChange={v=>f('template',v)} rows={3} placeholder="Use {motif}, {palette}, {style} as dynamic tokens..." /></Field>
          <Field label="Cover Colors (HEX, comma separated)" span2>
            <Inp value={(form.colors||[]).join(', ')} onChange={v=>f('colors',v.split(',').map(c=>c.trim()).filter(Boolean))} placeholder="#8B5CF6, #06B6D4, #EC4899, #F59E0B" />
            <div style={{ display:'flex', height:24, borderRadius:4, overflow:'hidden', marginTop:4 }}>
              {(form.colors||[]).map((c,i)=><div key={i} style={{ flex:1, background:c }} />)}
            </div>
          </Field>
          <div style={{ gridColumn:'span 2', display:'flex', alignItems:'center', gap:10 }}>
            <input type="checkbox" id="actv" checked={!!form.active} onChange={e=>f('active',e.target.checked)} style={{ accentColor:T.v }} />
            <label htmlFor="actv" style={{ fontSize:13, color:T.t1, fontFamily:T.int }}>Active Collection</label>
          </div>
          <div style={{ gridColumn:'span 2', display:'flex', justifyContent:'flex-end', gap:8 }}>
            <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
            <Btn onClick={save}>{eid?'Save Changes':'Create Collection'}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function CollCard({ col, palettes, onEdit, onToggle, onDel }) {
  const [hov, setHov] = useState(false);
  const pal = (palettes||[]).find(p=>p.id===col.paletteId);
  const grad = col.colors?.length ? `linear-gradient(135deg,${col.colors[0]},${col.colors[1]||col.colors[0]})` : `linear-gradient(135deg,${T.v}40,${T.c}20)`;
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ background:T.s1, border:`1px solid ${hov?T.v+'55':T.b1}`, borderRadius:12, overflow:'hidden', transition:'all 0.18s', boxShadow:hov?`0 4px 24px ${T.v}18`:'none' }}>
      <div style={{ height:70, background:grad, position:'relative', display:'flex', alignItems:'flex-end', padding:'0 12px 8px' }}>
        <div style={{ display:'flex', gap:4 }}>
          {(col.colors||[]).map((c,i)=><div key={i} style={{ width:17,height:17,borderRadius:3,background:c,border:'2px solid rgba(255,255,255,0.22)' }} />)}
        </div>
        <div style={{ position:'absolute', top:8, right:12, background:'rgba(0,0,0,0.58)', borderRadius:4, padding:'2px 7px', fontSize:10, color:T.t2, fontFamily:T.mono }}>{col.code}</div>
        {!col.active && <div style={{ position:'absolute', top:8, left:12, background:'rgba(0,0,0,0.65)', borderRadius:4, padding:'2px 7px', fontSize:10, color:T.t3, fontFamily:T.int }}>INACTIVE</div>}
      </div>
      <div style={{ padding:'12px 13px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:5 }}>
          <h3 style={{ fontFamily:T.cin, fontSize:14, color:T.t1, margin:0, lineHeight:1.2 }}>{col.name}</h3>
          <div style={{ display:'flex', gap:1, flexShrink:0, marginLeft:6 }}>
            <button onClick={onEdit} title="Edit" style={{ background:'none', border:'none', color:T.t2, cursor:'pointer', fontSize:14, padding:'2px 5px' }}>✎</button>
            <button onClick={onToggle} title="Toggle" style={{ background:'none', border:'none', color:col.active?T.ok:T.t3, cursor:'pointer', fontSize:14, padding:'2px 5px' }}>◉</button>
            <button onClick={onDel} title="Delete" style={{ background:'none', border:'none', color:T.er+'75', cursor:'pointer', fontSize:14, padding:'2px 5px' }}>✕</button>
          </div>
        </div>
        <p style={{ fontSize:12, color:T.t2, margin:'0 0 8px', fontFamily:T.int, lineHeight:1.4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{col.desc}</p>
        <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:9 }}>
          {(typeof col.motifs==='string'?col.motifs.split(','):col.motifs||[]).slice(0,4).map(m=><Badge key={m} label={m.trim()} color={T.c} />)}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:8, borderTop:`1px solid ${T.b1}` }}>
          <span style={{ fontSize:11, color:T.t3, fontFamily:T.int }}>{col.aspectRatio}</span>
          {pal && <Badge label={pal.name} color={T.g} />}
        </div>
      </div>
    </div>
  );
}

function Designs({ designs, collections, palettes, styles, setDesigns }) {
  const [modal, setModal] = useState(false);
  const [eid, setEid] = useState(null);
  const [form, setForm] = useState({});
  const [detail, setDetail] = useState(null);
  const [filt, setFilt] = useState('all');
  const des = designs||[];
  const f = (k,v) => setForm(p=>({...p,[k]:v}));
  const filtered = filt==='all' ? des : des.filter(d=>d.status===filt);

  function openNew() {
    setEid(null);
    setForm({ name:'', dcode:'', collId:'', palId:'', styId:'', promptBase:'', finalPrompt:'', ratio:'1:1', size:'2048×2048', channel:'', batch:'', status:'draft', tags:'', notes:'', links:[] });
    setModal(true);
  }
  function openEdit(d) { setEid(d.id); setForm({...d, tags:Array.isArray(d.tags)?d.tags.join(', '):d.tags}); setModal(true); }
  function save() {
    const d = { ...form, id:eid||'d'+Date.now(), tags:typeof form.tags==='string'?form.tags.split(',').map(t=>t.trim()).filter(Boolean):form.tags||[] };
    setDesigns(eid ? des.map(x=>x.id===eid?d:x) : [...des, d]);
    setModal(false);
  }
  function del(id) { if (window.confirm('Delete this design?')) { setDesigns(des.filter(d=>d.id!==id)); if (detail?.id===id) setDetail(null); } }
  function setStatus(id, status) {
    setDesigns(des.map(d=>d.id===id?{...d,status}:d));
    if (detail?.id===id) setDetail(p=>({...p,status}));
  }
  function assemble() {
    const col = (collections||[]).find(c=>c.id===form.collId);
    const pal = (palettes||[]).find(p=>p.id===form.palId);
    const sty = (styles||[]).find(s=>s.id===form.styId);
    const parts = [form.promptBase].filter(Boolean);
    if (col?.guidelines) parts.push(col.guidelines);
    if (pal) parts.push(pal.hexes?.slice(0,3).join(' ')||pal.name);
    if (sty) parts.push(sty.renderMode||sty.name);
    if (sty?.texture) parts.push(sty.texture);
    parts.push(`${form.ratio||'1:1'} aspect ratio`, 'highly detailed, masterpiece quality');
    f('finalPrompt', parts.join(', '));
  }

  return (
    <div style={{ padding:28 }}>
      <PH title="Designs" subtitle={`${des.length} designs`} action={<Btn onClick={openNew}>+ New Design</Btn>} />
      <div style={{ display:'flex', gap:6, marginBottom:18, flexWrap:'wrap' }}>
        {['all','draft','ready','exported','live','archived'].map(st => (
          <button key={st} onClick={()=>setFilt(st)} style={{ padding:'4px 13px', borderRadius:20, border:`1px solid ${filt===st?T.v:T.b1}`, background:filt===st?T.v+'22':'transparent', color:filt===st?T.v:T.t2, cursor:'pointer', fontSize:12, fontFamily:T.int }}>{st}</button>
        ))}
      </div>
      {filtered.length===0
        ? <Empty icon="◫" title="No designs here" sub="Designs hold your art concepts, prompts, and export-ready pieces." cta={<Btn onClick={openNew}>Create Design</Btn>} />
        : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:12 }}>
            {filtered.map(d => <DesignCard key={d.id} d={d} collections={collections} onClick={()=>setDetail(d)} onEdit={()=>openEdit(d)} onDel={()=>del(d.id)} />)}
          </div>}
      {detail && <DesignDetail d={detail} collections={collections} palettes={palettes} styles={styles} onClose={()=>setDetail(null)} onEdit={()=>{openEdit(detail);setDetail(null);}} onDel={()=>del(detail.id)} onStatusChange={st=>setStatus(detail.id,st)} />}
      <Modal open={modal} onClose={()=>setModal(false)} title={eid?'Edit Design':'New Design'} wide>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Field label="Design Name"><Inp value={form.name} onChange={v=>f('name',v)} placeholder="e.g. Forest Elder" /></Field>
          <Field label="Design Code"><Inp value={form.dcode} onChange={v=>f('dcode',v.toUpperCase())} placeholder="MUSH-001" /></Field>
          <Field label="Collection">
            <Sel value={form.collId} onChange={v=>f('collId',v)} placeholder="— Select collection —" options={(collections||[]).map(c=>({value:c.id,label:c.name}))} />
          </Field>
          <Field label="Status">
            <Sel value={form.status} onChange={v=>f('status',v)} options={['draft','ready','exported','live','archived']} />
          </Field>
          <Field label="Palette">
            <Sel value={form.palId} onChange={v=>f('palId',v)} placeholder="— Select palette —" options={(palettes||[]).map(p=>({value:p.id,label:p.name}))} />
          </Field>
          <Field label="Style">
            <Sel value={form.styId} onChange={v=>f('styId',v)} placeholder="— Select style —" options={(styles||[]).map(s=>({value:s.id,label:s.name}))} />
          </Field>
          <Field label="Prompt Base (your core concept)" span2><Textarea value={form.promptBase} onChange={v=>f('promptBase',v)} rows={2} placeholder="ancient mushroom elder spirit, wise eyes, mossy crown..." /></Field>
          <div style={{ gridColumn:'span 2' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
              <label style={lbl}>Final Assembled Prompt</label>
              <Btn sm variant="cyan" onClick={assemble}>⚡ Auto-Assemble</Btn>
            </div>
            <Textarea value={form.finalPrompt} onChange={v=>f('finalPrompt',v)} rows={4} placeholder="Final prompt will auto-assemble here..." />
          </div>
          <Field label="Aspect Ratio">
            <Sel value={form.ratio} onChange={v=>f('ratio',v)} options={['1:1','4:5','2:3','16:9','9:16','4:3','8:10','24:36']} />
          </Field>
          <Field label="Size Pixels"><Inp value={form.size} onChange={v=>f('size',v)} placeholder="2048×2048" /></Field>
          <Field label="Channel Target"><Inp value={form.channel} onChange={v=>f('channel',v)} placeholder="e.g. Redbubble, Etsy..." /></Field>
          <Field label="Export Batch"><Inp value={form.batch} onChange={v=>f('batch',v)} placeholder="e.g. BATCH-001" /></Field>
          <Field label="Tags (comma separated)" span2><Inp value={form.tags} onChange={v=>f('tags',v)} placeholder="mushroom, spirit, forest, hero..." /></Field>
          <Field label="Notes" span2><Textarea value={form.notes} onChange={v=>f('notes',v)} rows={2} placeholder="Any notes about this design..." /></Field>
          <div style={{ gridColumn:'span 2', display:'flex', justifyContent:'flex-end', gap:8 }}>
            <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
            <Btn onClick={save}>{eid?'Save Changes':'Create Design'}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function DesignCard({ d, collections, onClick, onEdit, onDel }) {
  const [hov, setHov] = useState(false);
  const col = (collections||[]).find(c=>c.id===d.collId);
  const c1 = col?.colors?.[0]||T.v, c2 = col?.colors?.[1]||T.c;
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ background:T.s1, border:`1px solid ${hov?T.v+'50':T.b1}`, borderRadius:10, overflow:'hidden', transition:'all 0.15s', cursor:'pointer' }}>
      <div onClick={onClick} style={{ height:100, background:`linear-gradient(135deg,${c1}70,${c2}40)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, color:c1, position:'relative' }}>
        ◫
        <div style={{ position:'absolute', bottom:6, right:8 }}><StatusBadge status={d.status} /></div>
        {d.batch && <div style={{ position:'absolute', top:6, left:8, fontSize:9, color:'rgba(255,255,255,0.6)', fontFamily:T.mono }}>{d.batch}</div>}
      </div>
      <div style={{ padding:'10px 11px' }}>
        <div style={{ fontSize:13, color:T.t1, fontFamily:T.int, fontWeight:500, marginBottom:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{d.name}</div>
        <div style={{ fontSize:10, color:T.t2, fontFamily:T.mono, marginBottom:7 }}>{d.dcode}</div>
        <div style={{ display:'flex', gap:3, flexWrap:'wrap', marginBottom:8 }}>
          {(Array.isArray(d.tags)?d.tags:[]).slice(0,3).map(tag=><Badge key={tag} label={tag} color={T.c} />)}
        </div>
        <div style={{ display:'flex', gap:4 }}>
          <button onClick={e=>{e.stopPropagation();onEdit();}} style={{ flex:1, background:T.s2, border:`1px solid ${T.b1}`, borderRadius:4, color:T.t2, cursor:'pointer', fontSize:11, padding:'4px 0', fontFamily:T.int }}>Edit</button>
          <button onClick={e=>{e.stopPropagation();onDel();}} style={{ background:T.s2, border:`1px solid ${T.b1}`, borderRadius:4, color:T.er+'80', cursor:'pointer', fontSize:11, padding:'4px 8px' }}>✕</button>
        </div>
      </div>
    </div>
  );
}

function DesignDetail({ d, collections, palettes, styles, onClose, onEdit, onDel, onStatusChange }) {
  const [copied, setCopied] = useState(false);
  const col = (collections||[]).find(c=>c.id===d.collId);
  const pal = (palettes||[]).find(p=>p.id===d.palId);
  const sty = (styles||[]).find(s=>s.id===d.styId);
  const c1 = col?.colors?.[0]||T.v, c2 = col?.colors?.[1]||T.c;

  function copyPrompt() {
    navigator.clipboard?.writeText(d.finalPrompt||d.promptBase||'');
    setCopied(true); setTimeout(()=>setCopied(false),2000);
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.72)', display:'flex', justifyContent:'flex-end' }}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ width:400, background:T.s1, borderLeft:`1px solid ${T.b2}`, height:'100vh', overflow:'auto', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'14px 18px', borderBottom:`1px solid ${T.b1}`, display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:T.s1, zIndex:1 }}>
          <span style={{ fontFamily:T.cin, fontSize:14, color:T.t1 }}>{d.name}</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:T.t2, cursor:'pointer', fontSize:20, lineHeight:1 }}>×</button>
        </div>
        <div style={{ height:120, background:`linear-gradient(135deg,${c1}60,${c2}30)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:40, color:c1 }}>◫</div>
        <div style={{ padding:18, flex:1 }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
            <StatusBadge status={d.status} />
            <Badge label={d.dcode} color={T.v} />
            <Badge label={d.ratio} color={T.c} />
            {d.channel && <Badge label={d.channel} color={T.g} />}
            {d.batch && <Badge label={d.batch} color={T.p} />}
          </div>
          {d.notes && <p style={{ fontSize:12, color:T.t2, fontFamily:T.int, margin:'0 0 14px', lineHeight:1.5 }}>{d.notes}</p>}
          <Hr />
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:10, color:T.t3, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6, fontFamily:T.int }}>Linked</div>
            {col && <div style={{ fontSize:12, color:T.t1, fontFamily:T.int, marginBottom:3, display:'flex', alignItems:'center', gap:6 }}><span style={{ color:T.v }}>◈</span> {col.name}</div>}
            {pal && <div style={{ fontSize:12, color:T.t1, fontFamily:T.int, marginBottom:3, display:'flex', alignItems:'center', gap:6 }}><span style={{ color:T.g }}>◉</span> {pal.name}</div>}
            {sty && <div style={{ fontSize:12, color:T.t1, fontFamily:T.int, display:'flex', alignItems:'center', gap:6 }}><span style={{ color:T.c }}>◌</span> {sty.name}</div>}
          </div>
          <Hr />
          <div style={{ marginBottom:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
              <div style={{ fontSize:10, color:T.t3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:T.int }}>Final Prompt</div>
              <button onClick={copyPrompt} style={{ background:'none', border:'none', color:copied?T.ok:T.v, cursor:'pointer', fontSize:11, fontFamily:T.int }}>{copied?'✓ Copied':'Copy'}</button>
            </div>
            <div style={{ background:T.s2, border:`1px solid ${T.b1}`, borderRadius:6, padding:10, fontSize:11, color:T.t1, fontFamily:T.mono, lineHeight:1.6, wordBreak:'break-word' }}>{d.finalPrompt||d.promptBase||'—'}</div>
          </div>
          <Hr />
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:10, color:T.t3, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6, fontFamily:T.int }}>Change Status</div>
            <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
              {['draft','ready','exported','live','archived'].map(st => (
                <button key={st} onClick={()=>onStatusChange(st)} style={{ padding:'4px 10px', borderRadius:4, border:`1px solid ${d.status===st?T.v:T.b1}`, background:d.status===st?T.v+'22':'transparent', color:d.status===st?T.v:T.t2, cursor:'pointer', fontSize:11, fontFamily:T.int }}>{st}</button>
              ))}
            </div>
          </div>
          {Array.isArray(d.tags) && d.tags.length>0 && (
            <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:12 }}>
              {d.tags.map(tag=><Badge key={tag} label={tag} color={T.c} />)}
            </div>
          )}
          <Hr />
          <div style={{ display:'flex', gap:8 }}>
            <Btn onClick={onEdit}>Edit</Btn>
            <Btn variant="danger" onClick={onDel}>Delete</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function Palettes({ palettes, setPalettes }) {
  const [modal, setModal] = useState(false);
  const [eid, setEid] = useState(null);
  const [form, setForm] = useState({});
  const pals = palettes||[];
  const f = (k,v) => setForm(p=>({...p,[k]:v}));

  function openNew() { setEid(null); setForm({ name:'', hexes:['#1A0033','#7B2FBE','#06B6D4','#EC4899','#F59E0B','#F8F0FF'], mood:'', notes:'' }); setModal(true); }
  function openEdit(p) { setEid(p.id); setForm({...p}); setModal(true); }
  function save() {
    const p = { ...form, id:eid||'p'+Date.now(), hexes:typeof form.hexes==='string'?form.hexes.split(',').map(h=>h.trim()).filter(Boolean):form.hexes };
    setPalettes(eid ? pals.map(x=>x.id===eid?p:x) : [...pals, p]);
    setModal(false);
  }
  function del(id) { if (window.confirm('Delete this palette?')) setPalettes(pals.filter(p=>p.id!==id)); }

  const previewHexes = f2 => typeof f2==='string' ? f2.split(',').map(h=>h.trim()).filter(Boolean) : (f2||[]);

  return (
    <div style={{ padding:28 }}>
      <PH title="Palette Library" subtitle={`${pals.length} palettes`} action={<Btn onClick={openNew}>+ New Palette</Btn>} />
      {pals.length===0
        ? <Empty icon="◉" title="No palettes yet" sub="Palettes define the color DNA of your creative system." cta={<Btn onClick={openNew}>Create Palette</Btn>} />
        : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
            {pals.map(p => (
              <div key={p.id} style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, overflow:'hidden' }}>
                <div style={{ display:'flex', height:50 }}>
                  {(Array.isArray(p.hexes)?p.hexes:[]).map((h,i)=><div key={i} style={{ flex:1, background:h }} title={h} />)}
                </div>
                <div style={{ padding:'11px 13px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                    <span style={{ fontFamily:T.cin, fontSize:13, color:T.t1 }}>{p.name}</span>
                    <div style={{ display:'flex', gap:3 }}>
                      <button onClick={()=>openEdit(p)} style={{ background:'none', border:'none', color:T.t2, cursor:'pointer', fontSize:13, padding:'1px 4px' }}>✎</button>
                      <button onClick={()=>del(p.id)} style={{ background:'none', border:'none', color:T.er+'70', cursor:'pointer', fontSize:13, padding:'1px 4px' }}>✕</button>
                    </div>
                  </div>
                  <p style={{ fontSize:11, color:T.t2, margin:'0 0 7px', fontFamily:T.int, fontStyle:'italic', lineHeight:1.4 }}>{p.mood}</p>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                    {(Array.isArray(p.hexes)?p.hexes:[]).map((h,i)=><span key={i} style={{ fontSize:9, color:T.t3, fontFamily:T.mono }}>{h}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>}
      <Modal open={modal} onClose={()=>setModal(false)} title={eid?'Edit Palette':'New Palette'}>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <Field label="Palette Name"><Inp value={form.name} onChange={v=>f('name',v)} placeholder="e.g. Neon Forest" /></Field>
          <Field label="HEX Values (comma separated)">
            <Inp value={Array.isArray(form.hexes)?form.hexes.join(', '):form.hexes||''} onChange={v=>f('hexes',v)} placeholder="#0D2B0D, #1A5C1A, #4CAF50, #7FFF00..." />
          </Field>
          <div style={{ display:'flex', height:30, borderRadius:6, overflow:'hidden', border:`1px solid ${T.b1}` }}>
            {previewHexes(form.hexes).map((h,i)=><div key={i} style={{ flex:1, background:h }} />)}
          </div>
          <Field label="Mood / Feeling"><Inp value={form.mood} onChange={v=>f('mood',v)} placeholder="Alive, electric, verdant..." /></Field>
          <Field label="Usage Notes"><Textarea value={form.notes} onChange={v=>f('notes',v)} rows={2} placeholder="When and how to use this palette..." /></Field>
          <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
            <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
            <Btn onClick={save}>{eid?'Save Changes':'Create Palette'}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Styles({ styles, setStyles }) {
  const [modal, setModal] = useState(false);
  const [eid, setEid] = useState(null);
  const [form, setForm] = useState({});
  const stys = styles||[];
  const f = (k,v) => setForm(p=>({...p,[k]:v}));

  function openNew() { setEid(null); setForm({ name:'', lineWeight:'', texture:'', renderMode:'', shading:'', refs:'' }); setModal(true); }
  function openEdit(s) { setEid(s.id); setForm({...s}); setModal(true); }
  function save() {
    const st = { ...form, id:eid||'s'+Date.now() };
    setStyles(eid ? stys.map(x=>x.id===eid?st:x) : [...stys, st]);
    setModal(false);
  }
  function del(id) { if (window.confirm('Delete this style?')) setStyles(stys.filter(s=>s.id!==id)); }

  return (
    <div style={{ padding:28 }}>
      <PH title="Style Library" subtitle={`${stys.length} styles`} action={<Btn onClick={openNew}>+ New Style</Btn>} />
      {stys.length===0
        ? <Empty icon="◌" title="No styles yet" sub="Styles capture your visual language — line weight, texture, rendering mode." cta={<Btn onClick={openNew}>Create Style</Btn>} />
        : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14 }}>
            {stys.map(st => (
              <div key={st.id} style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:16 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                  <div>
                    <h3 style={{ fontFamily:T.cin, fontSize:13, color:T.t1, margin:'0 0 2px' }}>{st.name}</h3>
                    <div style={{ fontSize:11, color:T.v, fontFamily:T.int }}>{st.renderMode}</div>
                  </div>
                  <div style={{ display:'flex', gap:3, flexShrink:0, marginLeft:6 }}>
                    <button onClick={()=>openEdit(st)} style={{ background:'none', border:'none', color:T.t2, cursor:'pointer', fontSize:13 }}>✎</button>
                    <button onClick={()=>del(st.id)} style={{ background:'none', border:'none', color:T.er+'70', cursor:'pointer', fontSize:13 }}>✕</button>
                  </div>
                </div>
                {[['Line Weight',st.lineWeight],['Texture',st.texture],['Shading',st.shading]].filter(([,v])=>v).map(([l,v])=>(
                  <div key={l} style={{ marginBottom:4 }}>
                    <span style={{ fontSize:10, color:T.t3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:T.int }}>{l}: </span>
                    <span style={{ fontSize:11, color:T.t2, fontFamily:T.int }}>{v}</span>
                  </div>
                ))}
                {st.refs && <div style={{ marginTop:8, paddingTop:8, borderTop:`1px solid ${T.b1}`, fontSize:10, color:T.t3, fontFamily:T.int }}>Refs: {st.refs}</div>}
              </div>
            ))}
          </div>}
      <Modal open={modal} onClose={()=>setModal(false)} title={eid?'Edit Style':'New Style'}>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <Field label="Style Name"><Inp value={form.name} onChange={v=>f('name',v)} placeholder="e.g. Organic Dream" /></Field>
          <Field label="Render Mode"><Inp value={form.renderMode} onChange={v=>f('renderMode',v)} placeholder="e.g. Painterly — no hard digital edges" /></Field>
          <Field label="Line Weight"><Inp value={form.lineWeight} onChange={v=>f('lineWeight',v)} placeholder="e.g. Variable 0.5–3pt, pressure-sensitive" /></Field>
          <Field label="Texture"><Inp value={form.texture} onChange={v=>f('texture',v)} placeholder="e.g. Watercolor paper grain, soft bleeds" /></Field>
          <Field label="Shading Style"><Inp value={form.shading} onChange={v=>f('shading',v)} placeholder="e.g. Layered washes, wet-on-wet bleeding" /></Field>
          <Field label="Reference Artists"><Inp value={form.refs} onChange={v=>f('refs',v)} placeholder="e.g. Arthur Rackham, Stephanie Law" /></Field>
          <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
            <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
            <Btn onClick={save}>{eid?'Save Changes':'Create Style'}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function PromptLab({ collections, palettes, styles, designs, setDesigns }) {
  const [collId, setCollId] = useState('');
  const [palId, setPalId] = useState('');
  const [styId, setStyId] = useState('');
  const [motif, setMotif] = useState('');
  const [mood, setMood] = useState('');
  const [extras, setExtras] = useState('');
  const [ratio, setRatio] = useState('1:1');
  const [channel, setChannel] = useState('');
  const [result, setResult] = useState('');
  const [saved, setSaved] = useState(false);
  const col = (collections||[]).find(c=>c.id===collId);
  const pal = (palettes||[]).find(p=>p.id===palId);
  const sty = (styles||[]).find(s=>s.id===styId);

  useEffect(() => {
    if (col) { setPalId(col.paletteId||''); setStyId(col.styleId||''); setRatio(col.aspectRatio||'1:1'); }
  }, [collId]);

  function assemble() {
    const parts = [];
    if (motif) parts.push(motif);
    if (mood) parts.push(`${mood} mood`);
    if (col?.guidelines) parts.push(col.guidelines);
    if (pal) parts.push((pal.hexes||[]).slice(0,3).join(' ')||pal.name+' color palette');
    if (sty) { parts.push(sty.renderMode||sty.name); if (sty.texture) parts.push(sty.texture); }
    if (extras) parts.push(extras);
    parts.push(`${ratio} aspect ratio`, 'highly detailed', 'masterpiece quality');
    if (channel) parts.push(`optimized for ${channel}`);
    setResult(parts.filter(Boolean).join(', '));
    setSaved(false);
  }

  function saveToDesign() {
    if (!result) return;
    const collCode = col?.code||'GEN';
    const num = String((designs||[]).filter(d=>d.dcode?.startsWith(collCode)).length+1).padStart(3,'0');
    const nd = { id:'d'+Date.now(), name:motif.slice(0,35)||'Untitled', dcode:`${collCode}-${num}`, collId, palId, styId, promptBase:motif, finalPrompt:result, ratio, size:'2048×2048', channel:channel||'', batch:'', status:'draft', tags:[], notes:'Created from Prompt Lab', links:[] };
    setDesigns([...(designs||[]), nd]);
    setSaved(true);
  }

  const blocks = [
    col && { label:'Collection', val:`${col.name} · ${col.guidelines||''}`, color:T.v },
    pal && { label:'Palette', val:`${pal.name} · ${(pal.hexes||[]).slice(0,4).join(' ')}`, color:T.g },
    sty && { label:'Style', val:`${sty.name} · ${sty.renderMode}`, color:T.c },
    motif && { label:'Core Motif', val:motif, color:T.p },
    mood && { label:'Mood', val:mood, color:T.ok },
    extras && { label:'Extra Details', val:extras, color:T.t2 },
    { label:'Technical', val:`${ratio} · highly detailed · masterpiece quality${channel?` · for ${channel}`:''}`, color:T.t3 },
  ].filter(Boolean);

  return (
    <div style={{ padding:28, maxWidth:960 }}>
      <PH title="Prompt Lab" subtitle="Dynamically assemble generation prompts from your creative DNA" />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:16 }}>
            <div style={{ fontFamily:T.cin, fontSize:11, color:T.v, letterSpacing:'0.15em', marginBottom:12 }}>ASSEMBLE FROM</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <Field label="Collection (auto-fills palette + style)">
                <Sel value={collId} onChange={setCollId} placeholder="— Select collection —" options={(collections||[]).map(c=>({value:c.id,label:c.name}))} />
              </Field>
              <Field label="Palette">
                <Sel value={palId} onChange={setPalId} placeholder="— Select palette —" options={(palettes||[]).map(p=>({value:p.id,label:p.name}))} />
              </Field>
              <Field label="Style">
                <Sel value={styId} onChange={setStyId} placeholder="— Select style —" options={(styles||[]).map(s=>({value:s.id,label:s.name}))} />
              </Field>
            </div>
          </div>
          <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:16 }}>
            <div style={{ fontFamily:T.cin, fontSize:11, color:T.p, letterSpacing:'0.15em', marginBottom:12 }}>YOUR CONCEPT</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <Field label="Core Subject / Motif"><Textarea value={motif} onChange={setMotif} rows={2} placeholder="ancient mushroom elder spirit, wise eyes, mossy crown..." /></Field>
              <Field label="Mood / Atmosphere"><Inp value={mood} onChange={setMood} placeholder="e.g. dreamy, ancient, electric, serene..." /></Field>
              <Field label="Extra Details"><Textarea value={extras} onChange={setExtras} rows={2} placeholder="any additional descriptors, special requirements..." /></Field>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <Field label="Aspect Ratio">
                  <Sel value={ratio} onChange={setRatio} options={['1:1','4:5','2:3','16:9','9:16','4:3','8:10']} />
                </Field>
                <Field label="Target Platform"><Inp value={channel} onChange={setChannel} placeholder="Redbubble, Etsy..." /></Field>
              </div>
            </div>
          </div>
          <Btn onClick={assemble}>⚡ Assemble Prompt</Btn>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:16 }}>
            <div style={{ fontFamily:T.cin, fontSize:11, color:T.c, letterSpacing:'0.15em', marginBottom:10 }}>PROMPT BLOCKS</div>
            {blocks.length===0
              ? <div style={{ fontSize:12, color:T.t3, fontFamily:T.int }}>Select options above, then click Assemble</div>
              : blocks.map((b,i)=>(
                  <div key={i} style={{ borderLeft:`3px solid ${b.color}`, paddingLeft:10, marginBottom:8, paddingTop:2, paddingBottom:2 }}>
                    <div style={{ fontSize:9, color:b.color, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:T.int }}>{b.label}</div>
                    <div style={{ fontSize:11, color:T.t2, fontFamily:T.int, lineHeight:1.4 }}>{b.val}</div>
                  </div>
                ))}
          </div>
          <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:16, flex:1, display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <div style={{ fontFamily:T.cin, fontSize:11, color:T.g, letterSpacing:'0.15em' }}>FINAL PROMPT</div>
              {result && <Btn sm variant="ghost" onClick={()=>{navigator.clipboard?.writeText(result);}}>Copy</Btn>}
            </div>
            {result
              ? <div style={{ background:T.s2, border:`1px solid ${T.b1}`, borderRadius:6, padding:12, fontSize:11, color:T.t1, fontFamily:T.mono, lineHeight:1.65, wordBreak:'break-word', flex:1 }}>{result}</div>
              : <div style={{ fontSize:12, color:T.t3, fontFamily:T.int }}>Your assembled prompt will appear here</div>}
            {result && (
              <div style={{ marginTop:12 }}>
                <Btn onClick={saveToDesign} disabled={saved} variant={saved?'success':'primary'}>
                  {saved?'✓ Saved to Designs':'+ Save as Design'}
                </Btn>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportEngine({ designs }) {
  const des = designs||[];
  const batches = [...new Set(des.map(d=>d.batch).filter(Boolean))];
  const PLATFORM_COLORS = { Zazzle:T.v, Redbubble:T.p, Etsy:T.g, Pinterest:T.er, Instagram:T.p, General:T.c, Printful:T.ok, Printify:T.c };
  return (
    <div style={{ padding:28 }}>
      <PH title="Export Engine" subtitle="Platform specs and batch export tracking" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:24 }}>
        {[{ label:'Ready to Export', val:des.filter(d=>d.status==='ready').length, color:T.ok },
          { label:'Export Batches', val:batches.length, color:T.v },
          { label:'Exported / Live', val:des.filter(d=>d.status==='exported'||d.status==='live').length, color:T.g }
        ].map(st=>(
          <div key={st.label} style={{ background:T.s1, border:`1px solid ${T.b1}`, borderTop:`2px solid ${st.color}`, borderRadius:10, padding:'15px 18px' }}>
            <div style={{ fontSize:28, fontFamily:T.cin, color:st.color, lineHeight:1 }}>{st.val}</div>
            <div style={{ fontSize:12, color:T.t2, marginTop:4, fontFamily:T.int }}>{st.label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily:T.cin, fontSize:13, color:T.t1, marginBottom:14, letterSpacing:'0.05em' }}>Platform Export Presets</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:10, marginBottom:28 }}>
        {EXPORT_PRESETS.map(ep => {
          const col = PLATFORM_COLORS[ep.platform]||T.v;
          return (
            <div key={ep.id} style={{ background:T.s1, border:`1px solid ${T.b1}`, borderLeft:`3px solid ${col}`, borderRadius:8, padding:13 }}>
              <div style={{ fontFamily:T.cin, fontSize:11, color:col, marginBottom:7, letterSpacing:'0.05em' }}>{ep.name}</div>
              {[['Pixels',ep.px],['Ratio',ep.ratio],['DPI',String(ep.dpi)],['Format',ep.type+(ep.alpha?' + Alpha':'')]].map(([l,v])=>(
                <div key={l} style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                  <span style={{ fontSize:11, color:T.t3, fontFamily:T.int }}>{l}</span>
                  <span style={{ fontSize:11, color:T.t1, fontFamily:T.mono }}>{v}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {batches.length>0 && (
        <>
          <div style={{ fontFamily:T.cin, fontSize:13, color:T.t1, marginBottom:14, letterSpacing:'0.05em' }}>Export Batches</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {batches.map(batch => {
              const bdes = des.filter(d=>d.batch===batch);
              return (
                <div key={batch} style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:16 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                    <Badge label={batch} color={T.v} />
                    <span style={{ fontSize:12, color:T.t2, fontFamily:T.int }}>{bdes.length} designs</span>
                  </div>
                  <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                    {bdes.map(d=>(
                      <div key={d.id} style={{ display:'flex', alignItems:'center', gap:6, background:T.s2, borderRadius:6, padding:'5px 10px' }}>
                        <span style={{ fontSize:12, color:T.t1, fontFamily:T.int }}>{d.name}</span>
                        <StatusBadge status={d.status} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function UploadTracker({ designs, uploads, setUploads }) {
  const des = designs||[], ups = uploads||[];
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const f = (k,v) => setForm(p=>({...p,[k]:v}));
  const PLATS = ['Printful','Printify','Zazzle','Spring','Redbubble','Etsy','Pinterest','Instagram'];
  const statC = { pending:T.t2, uploading:T.v, live:T.ok, failed:T.er };

  function openNew() { setForm({ designId:'', platform:'', status:'pending', url:'', batch:'', notes:'' }); setModal(true); }
  function save() { setUploads([...ups, { ...form, id:'u'+Date.now(), createdAt:new Date().toISOString() }]); setModal(false); }
  function markLive(id, url) { setUploads(ups.map(u=>u.id===id?{...u,status:'live',url:url||u.url}:u)); }
  function del(id) { setUploads(ups.filter(u=>u.id!==id)); }

  return (
    <div style={{ padding:28 }}>
      <PH title="Upload Tracker" subtitle={`${ups.length} upload records across all platforms`} action={<Btn onClick={openNew}>+ Track Upload</Btn>} />
      <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderLeft:`3px solid ${T.g}`, borderRadius:8, padding:12, marginBottom:20, fontSize:12, color:T.t2, fontFamily:T.int, lineHeight:1.5 }}>
        <span style={{ color:T.g }}>Platform note: </span>Zazzle, Redbubble, Spring, Printful, and Printify require manual uploads via their websites. Track your progress and listing URLs here as you go.
      </div>
      {ups.length===0
        ? <Empty icon="↑" title="No uploads tracked" sub="Start tracking where your designs are published across platforms." cta={<Btn onClick={openNew}>Track First Upload</Btn>} />
        : (
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {ups.map(u => {
              const design = des.find(d=>d.id===u.designId);
              const sc = statC[u.status]||T.t2;
              return (
                <div key={u.id} style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:8, padding:14, display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:38, height:38, borderRadius:6, background:sc+'20', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, color:sc, flexShrink:0 }}>↑</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, color:T.t1, fontFamily:T.int, fontWeight:500 }}>{design?.name||'Unknown Design'}</div>
                    <div style={{ fontSize:11, color:T.t2, fontFamily:T.int }}>{u.platform}{u.batch?` · ${u.batch}`:''}</div>
                    {u.url && <div style={{ fontSize:10, color:T.v, fontFamily:T.mono, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{u.url}</div>}
                  </div>
                  <div style={{ display:'flex', gap:6, alignItems:'center', flexShrink:0 }}>
                    <Badge label={u.status} color={sc} />
                    {u.status!=='live' && <Btn sm variant="success" onClick={()=>markLive(u.id,'')}>Mark Live</Btn>}
                    <button onClick={()=>del(u.id)} style={{ background:'none', border:'none', color:T.er+'70', cursor:'pointer', fontSize:14 }}>✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      <Modal open={modal} onClose={()=>setModal(false)} title="Track Upload">
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <Field label="Design">
            <Sel value={form.designId} onChange={v=>f('designId',v)} placeholder="— Select design —" options={des.map(d=>({value:d.id,label:`${d.name} (${d.dcode})`}))} />
          </Field>
          <Field label="Platform">
            <Sel value={form.platform} onChange={v=>f('platform',v)} placeholder="— Select platform —" options={PLATS} />
          </Field>
          <Field label="Status">
            <Sel value={form.status} onChange={v=>f('status',v)} options={['pending','uploading','live','failed']} />
          </Field>
          <Field label="Listing URL (when live)"><Inp value={form.url} onChange={v=>f('url',v)} placeholder="https://..." /></Field>
          <Field label="Export Batch"><Inp value={form.batch} onChange={v=>f('batch',v)} placeholder="e.g. BATCH-001" /></Field>
          <Field label="Notes"><Textarea value={form.notes} onChange={v=>f('notes',v)} rows={2} /></Field>
          <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
            <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
            <Btn onClick={save}>Save Upload Record</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function WanderingStarStudio() {
  const [nav, setNav] = useState('dashboard');
  const [cols, setCols, colOk] = useStorage('wss:v1:collections', SEED.collections);
  const [des, setDes, desOk] = useStorage('wss:v1:designs', SEED.designs);
  const [pals, setPals, palOk] = useStorage('wss:v1:palettes', SEED.palettes);
  const [stys, setStys, styOk] = useStorage('wss:v1:styles', SEED.styles);
  const [ups, setUps, upOk] = useStorage('wss:v1:uploads', SEED.uploads);

  useEffect(() => {
    document.body.style.cssText = `margin:0;padding:0;background:${T.bg};overflow:hidden;`;
    const lk = document.createElement('link');
    lk.rel = 'stylesheet';
    lk.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@400;500&display=swap';
    document.head.appendChild(lk);
    return () => { try { document.head.removeChild(lk); } catch {} };
  }, []);

  if (!colOk||!desOk||!palOk||!styOk||!upOk) {
    return (
      <div style={{ height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:T.bg, gap:12 }}>
        <div style={{ fontSize:38, color:T.v }}>✦</div>
        <div style={{ fontFamily:'"Cinzel",serif', fontSize:13, color:T.v, letterSpacing:'0.3em' }}>WANDERING STAR STUDIO</div>
        <div style={{ fontSize:12, color:T.t3, fontFamily:'"Inter",sans-serif' }}>Loading your creative universe…</div>
      </div>
    );
  }

  const data = { collections:cols, designs:des, palettes:pals, styles:stys, uploads:ups };
  const setters = { setCollections:setCols, setDesigns:setDes, setPalettes:setPals, setStyles:setStys, setUploads:setUps };

  return (
    <div style={{ display:'flex', height:'100vh', background:T.bg, overflow:'hidden', backgroundImage:`radial-gradient(${T.v}07 1px,transparent 1px)`, backgroundSize:'28px 28px' }}>
      <Sidebar active={nav} onNav={setNav} />
      <div style={{ flex:1, overflow:'auto', height:'100vh' }}>
        {nav==='dashboard'   && <Dashboard    {...data} onNav={setNav} />}
        {nav==='collections' && <Collections  {...data} {...setters}  />}
        {nav==='designs'     && <Designs      {...data} {...setters}  />}
        {nav==='palettes'    && <Palettes     {...data} {...setters}  />}
        {nav==='styles'      && <Styles       {...data} {...setters}  />}
        {nav==='prompt'      && <PromptLab    {...data} {...setters}  />}
        {nav==='export'      && <ExportEngine {...data}               />}
        {nav==='uploads'     && <UploadTracker {...data} {...setters} />}
      </div>
    </div>
  );
}
