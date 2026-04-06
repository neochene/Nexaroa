import { useState } from "react";

const t = {
  bg0:"#0D0F12", bg1:"#13161B", bg2:"#1A1E25", bg3:"#222730",
  border:"#2A2F3A", borderHover:"#3A4050",
  text1:"#F0F2F5", text2:"#8B91A0", text3:"#555C6B",
  accent:"#4F8EF7", accentBg:"#1A2540",
  green:"#34C77B", greenBg:"#0D2A1E",
  amber:"#F0A830", amberBg:"#2A1E08",
  red:"#F05252", redBg:"#2A0E0E",
  teal:"#2DD4BF", tealBg:"#0D2522",
};

const xpf = v => v.toLocaleString("fr-FR") + " XPF";
const montantNum = str => parseInt(str.replace(/\s/g,"").replace("XPF","")) || 0;

const clients = [
  { id:1, nom:"Acme SAS", contact:"Marc Dupont", email:"marc@acme.fr", tel:"06 12 34 56 78", ville:"Nouméa", ca:xpf(5_750_000), statut:"Actif" },
  { id:2, nom:"Nova Tech", contact:"Sophie Leblanc", email:"s.leblanc@novatech.fr", tel:"06 98 76 54 32", ville:"Dumbéa", ca:xpf(3_760_000), statut:"Actif" },
  { id:3, nom:"Horizon BTP", contact:"Pierre Martin", email:"p.martin@horizon.fr", tel:"07 11 22 33 44", ville:"Mont-Dore", ca:xpf(2_720_000), statut:"Inactif" },
  { id:4, nom:"Floralis", contact:"Camille Roux", email:"c.roux@floralis.fr", tel:"06 55 44 33 22", ville:"Païta", ca:xpf(2_195_000), statut:"Actif" },
  { id:5, nom:"DataVision", contact:"Lucas Bernard", email:"l.bernard@datavision.fr", tel:"07 66 77 88 99", ville:"Nouméa", ca:xpf(3_290_000), statut:"Actif" },
];

const factures = [
  { id:"FAC-2024-089", client:"Acme SAS", date:"12/03/2024", echeance:"12/04/2024", montant:xpf(811_000), statut:"Payée" },
  { id:"FAC-2024-090", client:"Nova Tech", date:"15/03/2024", echeance:"15/04/2024", montant:xpf(381_500), statut:"En attente" },
  { id:"FAC-2024-091", client:"Horizon BTP", date:"18/03/2024", echeance:"18/04/2024", montant:xpf(536_800), statut:"En retard" },
  { id:"FAC-2024-092", client:"Floralis", date:"22/03/2024", echeance:"22/04/2024", montant:xpf(250_400), statut:"Payée" },
  { id:"FAC-2024-093", client:"DataVision", date:"25/03/2024", echeance:"25/04/2024", montant:xpf(644_200), statut:"En attente" },
  { id:"FAC-2024-094", client:"Acme SAS", date:"28/03/2024", echeance:"28/04/2024", montant:xpf(858_900), statut:"Payée" },
  { id:"FAC-2024-095", client:"Nova Tech", date:"01/04/2024", echeance:"01/05/2024", montant:xpf(226_700), statut:"En attente" },
];

const paiements = [
  { id:"PAY-441", facture:"FAC-2024-089", client:"Acme SAS", date:"14/03/2024", montant:xpf(811_000), mode:"Virement", statut:"Reçu" },
  { id:"PAY-442", facture:"FAC-2024-092", client:"Floralis", date:"20/03/2024", montant:xpf(250_400), mode:"Chèque", statut:"Reçu" },
  { id:"PAY-443", facture:"FAC-2024-094", client:"Acme SAS", date:"02/04/2024", montant:xpf(858_900), mode:"Virement", statut:"Reçu" },
  { id:"PAY-444", facture:"FAC-2024-090", client:"Nova Tech", date:"—", montant:xpf(381_500), mode:"—", statut:"En attente" },
  { id:"PAY-445", facture:"FAC-2024-091", client:"Horizon BTP", date:"—", montant:xpf(536_800), mode:"—", statut:"En retard" },
  { id:"PAY-446", facture:"FAC-2024-093", client:"DataVision", date:"—", montant:xpf(644_200), mode:"—", statut:"En attente" },
];

const depenses = [
  { id:"DEP-201", categorie:"Loyer", fournisseur:"SCI du Vallon", date:"01/03/2024", montant:xpf(286_200), statut:"Validée" },
  { id:"DEP-202", categorie:"Logiciels", fournisseur:"Microsoft", date:"05/03/2024", montant:xpf(38_100), statut:"Validée" },
  { id:"DEP-203", categorie:"Transport", fournisseur:"Air Calédonie", date:"08/03/2024", montant:xpf(22_200), statut:"Validée" },
  { id:"DEP-204", categorie:"Marketing", fournisseur:"Agence Créa NC", date:"12/03/2024", montant:xpf(214_600), statut:"En attente" },
  { id:"DEP-205", categorie:"Matériel", fournisseur:"Technologie NC", date:"18/03/2024", montant:xpf(351_700), statut:"Validée" },
  { id:"DEP-206", categorie:"Téléphonie", fournisseur:"OPT Nouvelle-Calédonie", date:"22/03/2024", montant:xpf(17_600), statut:"Validée" },
  { id:"DEP-207", categorie:"Formation", fournisseur:"CFPNC", date:"28/03/2024", montant:xpf(106_100), statut:"En attente" },
];

const CATS_DEFAUT = [
  { id:1, nom:"Loyer",      couleur:t.accent,  icone:"🏢", budget:350_000 },
  { id:2, nom:"Logiciels",  couleur:t.teal,    icone:"💻", budget:60_000  },
  { id:3, nom:"Transport",  couleur:t.amber,   icone:"✈️", budget:40_000  },
  { id:4, nom:"Marketing",  couleur:"#A78BFA", icone:"📣", budget:250_000 },
  { id:5, nom:"Matériel",   couleur:t.green,   icone:"🖨️", budget:400_000 },
  { id:6, nom:"Téléphonie", couleur:"#F472B6", icone:"📱", budget:25_000  },
  { id:7, nom:"Formation",  couleur:t.amber,   icone:"🎓", budget:120_000 },
];

const navItems = [
  { id:"dashboard",     label:"Tableau de bord",  icon:<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1.5" fill="currentColor"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1.5" fill="currentColor"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1.5" fill="currentColor"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" fill="currentColor"/></svg> },
  { id:"factures",      label:"Factures",          icon:<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 1h9a1 1 0 011 1v11l-2-1-2 1-2-1-2 1-2-1V2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5h5M5 8h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { id:"creer-facture", label:"Nouvelle facture",  icon:<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 4.5v6M4.5 7.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { id:"clients",       label:"Clients",           icon:<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.2"/><path d="M1.5 13.5c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { id:"paiements",     label:"Paiements",         icon:<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 6.5h13" stroke="currentColor" strokeWidth="1.2"/><rect x="3" y="9" width="3" height="1.5" rx="0.5" fill="currentColor"/></svg> },
  { id:"depenses",      label:"Dépenses",          icon:<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1v13M4 4.5C4 3.12 5.12 2 6.5 2H8a2.5 2.5 0 010 5H7a2.5 2.5 0 000 5h1.5C9.88 12 11 10.88 11 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { id:"stats",         label:"Statistiques",      icon:<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 13l3.5-4 3 2.5 3-6 3 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

const Badge = ({ s }) => {
  const map = { "Payée":[t.green,t.greenBg], "Reçu":[t.green,t.greenBg], "Validée":[t.green,t.greenBg], "Actif":[t.teal,t.tealBg], "En attente":[t.amber,t.amberBg], "En retard":[t.red,t.redBg], "Inactif":[t.text2,t.bg3] };
  const [color, bg] = map[s] || [t.text2, t.bg3];
  return <span style={{ background:bg, color, fontSize:11, fontWeight:500, padding:"3px 10px", borderRadius:20, whiteSpace:"nowrap", letterSpacing:0.3 }}>{s}</span>;
};

const KpiCard = ({ label, value, sub, color }) => (
  <div style={{ background:t.bg2, border:`1px solid ${t.border}`, borderRadius:12, padding:"1.1rem 1.3rem", flex:1, minWidth:150 }}>
    <p style={{ fontSize:11, color:t.text2, margin:"0 0 10px", textTransform:"uppercase", letterSpacing:0.8 }}>{label}</p>
    <p style={{ fontSize:20, fontWeight:500, margin:0, color:color||t.text1 }}>{value}</p>
    {sub && <p style={{ fontSize:11, color:t.text3, margin:"6px 0 0" }}>{sub}</p>}
  </div>
);

const Divider = () => <div style={{ height:"0.5px", background:t.border }} />;

const Table = ({ cols, rows, onRow }) => (
  <div style={{ overflowX:"auto" }}>
    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12.5 }}>
      <thead><tr style={{ borderBottom:`1px solid ${t.border}` }}>
        {cols.map(c => <th key={c} style={{ textAlign:"left", padding:"9px 14px", fontWeight:500, color:t.text3, whiteSpace:"nowrap", textTransform:"uppercase", fontSize:10.5, letterSpacing:0.8 }}>{c}</th>)}
      </tr></thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} onClick={() => onRow&&onRow(row)}
            style={{ borderBottom:`1px solid ${t.border}`, cursor:onRow?"pointer":"default", transition:"background 0.12s" }}
            onMouseEnter={e => { if(onRow) e.currentTarget.style.background=t.bg3; }}
            onMouseLeave={e => e.currentTarget.style.background="transparent"}>
            {Object.values(row).map((v, j) => (
              <td key={j} style={{ padding:"11px 14px", color:t.text1, whiteSpace:"nowrap" }}>
                {typeof v==="string" && ["Payée","Reçu","Validée","Actif","En attente","En retard","Inactif"].includes(v) ? <Badge s={v}/> : v}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Panel = ({ children, style={} }) => (
  <div style={{ background:t.bg2, border:`1px solid ${t.border}`, borderRadius:12, overflow:"hidden", ...style }}>{children}</div>
);
const PanelHeader = ({ title, action }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 1.3rem" }}>
    <p style={{ fontSize:13, fontWeight:500, margin:0, color:t.text1 }}>{title}</p>
    {action}
  </div>
);
const Btn = ({ children, primary, small, onClick }) => (
  <button onClick={onClick} style={{ padding:small?"5px 14px":"7px 18px", borderRadius:8, fontSize:12, fontWeight:500, cursor:"pointer", border:"none", background:primary?t.accent:t.bg3, color:primary?"#fff":t.text2 }}>{children}</button>
);
const FilterPill = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{ fontSize:11.5, padding:"4px 14px", borderRadius:20, cursor:"pointer", fontWeight:active?500:400, background:active?t.accent:"transparent", color:active?"#fff":t.text2, border:`1px solid ${active?t.accent:t.border}` }}>{label}</button>
);

function Dashboard({ setPage }) {
  const bars = [62,75,58,83,91,78,95,88,72,85,93,102];
  const mois = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const max = 110;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <KpiCard label="Chiffre d'affaires" value="17 715 000 XPF" sub="↑ +12% ce mois" color={t.accent} />
        <KpiCard label="Factures émises" value="31" sub="7 en attente" />
        <KpiCard label="Encaissé" value="13 408 000 XPF" sub="Taux 88%" color={t.green} />
        <KpiCard label="Dépenses" value="2 230 000 XPF" sub="Ce mois-ci" color={t.amber} />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16 }}>
        <Panel>
          <PanelHeader title="Revenus mensuels 2024 (MXPF)" />
          <Divider />
          <div style={{ padding:"1.25rem 1.3rem" }}>
            <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:110 }}>
              {bars.map((v,i) => (
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                  <div style={{ width:"100%", borderRadius:"4px 4px 0 0", height:`${(v/max)*100}%`, background:i===11?t.accent:i>=9?`${t.accent}55`:t.bg3 }} />
                  <span style={{ fontSize:9.5, color:t.text3 }}>{mois[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Statuts factures" />
          <Divider />
          <div style={{ padding:"1.25rem 1.3rem" }}>
            {[["Payées","58%",t.green],["En attente","28%",t.amber],["En retard","14%",t.red]].map(([l,v,c]) => (
              <div key={l} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:6 }}>
                  <span style={{ color:t.text2 }}>{l}</span><span style={{ fontWeight:500, color:c }}>{v}</span>
                </div>
                <div style={{ height:5, background:t.bg3, borderRadius:3 }}><div style={{ width:v, height:"100%", background:c, borderRadius:3 }} /></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel>
        <PanelHeader title="Dernières factures" action={<button onClick={() => setPage("factures")} style={{ fontSize:12, background:"none", border:"none", color:t.accent, cursor:"pointer" }}>Voir tout →</button>} />
        <Divider />
        <Table cols={["Référence","Client","Date","Montant","Statut"]}
          rows={factures.slice(0,4).map(f => ({ id:f.id, client:f.client, date:f.date, montant:f.montant, statut:f.statut }))} />
      </Panel>
    </div>
  );
}

function Factures({ setPage }) {
  const [filtre, setFiltre] = useState("Tous");
  const filtres = ["Tous","Payée","En attente","En retard"];
  const filtered = filtre==="Tous" ? factures : factures.filter(f => f.statut===filtre);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <KpiCard label="Total émis" value="3 709 500 XPF" sub="7 factures" />
        <KpiCard label="Encaissé" value="1 920 300 XPF" sub="3 factures" color={t.green} />
        <KpiCard label="En attente" value="1 252 400 XPF" sub="3 factures" color={t.amber} />
        <KpiCard label="En retard" value="536 800 XPF" sub="1 facture" color={t.red} />
      </div>
      <Panel>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 1.3rem", flexWrap:"wrap", gap:8 }}>
          <div style={{ display:"flex", gap:6 }}>{filtres.map(f => <FilterPill key={f} label={f} active={filtre===f} onClick={() => setFiltre(f)} />)}</div>
          <Btn primary onClick={() => setPage("creer-facture")}>+ Nouvelle facture</Btn>
        </div>
        <Divider />
        <Table cols={["Référence","Client","Date","Échéance","Montant","Statut"]}
          rows={filtered.map(f => ({ id:f.id, client:f.client, date:f.date, ech:f.echeance, montant:f.montant, statut:f.statut }))} />
      </Panel>
    </div>
  );
}

function CreerFacture() {
  const [lignes, setLignes] = useState([{ desc:"Prestation de conseil", qte:2, pu:143300 }]);
  const [saved, setSaved] = useState(false);
  const total = lignes.reduce((s, l) => s + l.qte * l.pu, 0);
  const addLigne = () => setLignes([...lignes, { desc:"", qte:1, pu:0 }]);
  const upd = (i, k, v) => { const l=[...lignes]; l[i][k]=k==="desc"?v:Number(v); setLignes(l); };
  const inp = { width:"100%", padding:"7px 10px", borderRadius:8, border:`1px solid ${t.border}`, background:t.bg3, color:t.text1, fontSize:12.5, outline:"none", boxSizing:"border-box" };
  if (saved) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"4rem 1rem", gap:12 }}>
      <div style={{ width:56, height:56, borderRadius:"50%", background:t.greenBg, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke={t.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p style={{ fontSize:18, fontWeight:500, color:t.text1, margin:0 }}>Facture émise</p>
      <p style={{ fontSize:13, color:t.text2, margin:0 }}>FAC-2024-096 a été transmise au client</p>
      <Btn primary onClick={() => setSaved(false)}>Nouvelle facture</Btn>
    </div>
  );
  return (
    <div style={{ maxWidth:740, display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <Panel style={{ padding:"1.25rem" }}>
          <p style={{ fontSize:11, color:t.text3, margin:"0 0 10px", textTransform:"uppercase", letterSpacing:0.8 }}>Client</p>
          <select style={{ ...inp }}>{clients.map(c => <option key={c.id}>{c.nom}</option>)}</select>
        </Panel>
        <Panel style={{ padding:"1.25rem" }}>
          <p style={{ fontSize:11, color:t.text3, margin:"0 0 10px", textTransform:"uppercase", letterSpacing:0.8 }}>Dates</p>
          <div style={{ display:"flex", gap:8 }}>
            <div style={{ flex:1 }}><p style={{ fontSize:11, color:t.text2, margin:"0 0 5px" }}>Émission</p><input type="date" defaultValue="2024-04-02" style={inp} /></div>
            <div style={{ flex:1 }}><p style={{ fontSize:11, color:t.text2, margin:"0 0 5px" }}>Échéance</p><input type="date" defaultValue="2024-05-02" style={inp} /></div>
          </div>
        </Panel>
      </div>
      <Panel>
        <PanelHeader title="Lignes de facturation" action={<Btn small onClick={addLigne}>+ Ajouter</Btn>} />
        <Divider />
        <div style={{ padding:"0.75rem 0" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12.5 }}>
            <thead><tr style={{ borderBottom:`1px solid ${t.border}` }}>
              {["Description","Qté","Prix unit. (XPF)","Total (XPF)"].map(h => <th key={h} style={{ textAlign:"left", padding:"7px 14px", fontWeight:500, color:t.text3, fontSize:10.5, letterSpacing:0.6, textTransform:"uppercase" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {lignes.map((l, i) => (
                <tr key={i} style={{ borderBottom:`1px solid ${t.border}` }}>
                  <td style={{ padding:"8px 14px" }}><input value={l.desc} onChange={e=>upd(i,"desc",e.target.value)} style={{ ...inp }} /></td>
                  <td style={{ padding:"8px 14px" }}><input type="number" value={l.qte} onChange={e=>upd(i,"qte",e.target.value)} style={{ ...inp, width:60 }} /></td>
                  <td style={{ padding:"8px 14px" }}><input type="number" value={l.pu} onChange={e=>upd(i,"pu",e.target.value)} style={{ ...inp, width:110 }} /></td>
                  <td style={{ padding:"8px 14px", fontWeight:500, color:t.text1 }}>{(l.qte*l.pu).toLocaleString("fr-FR")} XPF</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Divider />
        <div style={{ padding:"1rem 1.3rem", display:"flex", justifyContent:"flex-end" }}>
          <div style={{ fontSize:12.5, textAlign:"right" }}>
            <div style={{ color:t.text2, marginBottom:8 }}>Pas de TVA applicable en Nouvelle-Calédonie</div>
            <div style={{ fontSize:16, fontWeight:500, color:t.accent }}>Total : {total.toLocaleString("fr-FR")} XPF</div>
          </div>
        </div>
      </Panel>
      <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
        <Btn>Aperçu PDF</Btn>
        <Btn primary onClick={() => setSaved(true)}>Émettre la facture</Btn>
      </div>
    </div>
  );
}

function Clients({ setPage, setSelectedClient }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <KpiCard label="Clients actifs" value="12" />
        <KpiCard label="CA total" value="17 715 000 XPF" sub="12 mois" color={t.accent} />
        <KpiCard label="Nouveaux" value="2" sub="Ce mois" color={t.teal} />
      </div>
      <Panel>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 1.3rem" }}>
          <p style={{ fontSize:13, fontWeight:500, margin:0, color:t.text1 }}>Liste des clients</p>
          <Btn primary>+ Nouveau client</Btn>
        </div>
        <Divider />
        <Table cols={["Entreprise","Contact","Email","Ville","CA annuel","Statut"]}
          rows={clients.map(c => ({ nom:c.nom, contact:c.contact, email:c.email, ville:c.ville, ca:c.ca, statut:c.statut }))}
          onRow={row => { setSelectedClient(clients.find(c => c.nom===row.nom)); setPage("fiche-client"); }} />
      </Panel>
    </div>
  );
}

function FicheClient({ client, setPage }) {
  if (!client) return <p style={{ color:t.text2 }}>Client non trouvé.</p>;
  const facsCli = factures.filter(f => f.client===client.nom);
  const initials = client.nom.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <button onClick={() => setPage("clients")} style={{ alignSelf:"flex-start", background:"none", border:"none", color:t.accent, cursor:"pointer", fontSize:12.5, padding:0 }}>← Retour aux clients</button>
      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:16, alignItems:"start" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Panel style={{ padding:"1.3rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
              <div style={{ width:46, height:46, borderRadius:"50%", background:t.accentBg, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600, fontSize:14, color:t.accent }}>{initials}</div>
              <div>
                <p style={{ fontWeight:500, fontSize:14, margin:"0 0 5px", color:t.text1 }}>{client.nom}</p>
                <Badge s={client.statut} />
              </div>
            </div>
            {[["Contact",client.contact],["Email",client.email],["Tél.",client.tel],["Ville",client.ville]].map(([l,v]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderTop:`1px solid ${t.border}`, fontSize:12.5 }}>
                <span style={{ color:t.text3 }}>{l}</span><span style={{ color:t.text1 }}>{v}</span>
              </div>
            ))}
          </Panel>
          <Panel style={{ padding:"1.3rem" }}>
            <p style={{ fontSize:11, color:t.text3, margin:"0 0 8px", textTransform:"uppercase", letterSpacing:0.8 }}>CA annuel</p>
            <p style={{ fontSize:20, fontWeight:500, margin:0, color:t.accent }}>{client.ca}</p>
          </Panel>
        </div>
        <Panel>
          <PanelHeader title="Factures associées" />
          <Divider />
          {facsCli.length > 0
            ? <Table cols={["Référence","Date","Échéance","Montant","Statut"]}
                rows={facsCli.map(f => ({ id:f.id, date:f.date, ech:f.echeance, montant:f.montant, statut:f.statut }))} />
            : <p style={{ color:t.text2, fontSize:13, padding:"1.25rem" }}>Aucune facture pour ce client.</p>}
        </Panel>
      </div>
    </div>
  );
}

function Paiements() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <KpiCard label="Encaissé ce mois" value="1 920 300 XPF" color={t.green} />
        <KpiCard label="En attente" value="1 252 400 XPF" sub="3 paiements" color={t.amber} />
        <KpiCard label="En retard" value="536 800 XPF" sub="1 paiement" color={t.red} />
      </div>
      <Panel>
        <PanelHeader title="Suivi des paiements" />
        <Divider />
        <Table cols={["Référence","Facture","Client","Date","Montant","Mode","Statut"]}
          rows={paiements.map(p => ({ id:p.id, fac:p.facture, client:p.client, date:p.date, montant:p.montant, mode:p.mode, statut:p.statut }))} />
      </Panel>
    </div>
  );
}

function GestionCategories({ cats, setCats, onClose }) {
  const [form, setForm] = useState({ nom:"", couleur:t.accent, icone:"📦", budget:"" });
  const [editId, setEditId] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const inp = { padding:"7px 10px", borderRadius:8, border:`1px solid ${t.border}`, background:t.bg3, color:t.text1, fontSize:12.5, outline:"none" };
  const COULEURS = [t.accent,"#34C77B","#F0A830","#F05252","#2DD4BF","#A78BFA","#F472B6","#FB923C"];
  const ICONES   = ["📦","🏢","💻","✈️","📣","🖨️","📱","🎓","🔧","📋","🏦","🛒","⚡","🌐"];
  const startEdit = c => { setEditId(c.id); setForm({ nom:c.nom, couleur:c.couleur, icone:c.icone, budget:String(c.budget) }); };
  const cancelEdit = () => { setEditId(null); setForm({ nom:"", couleur:t.accent, icone:"📦", budget:"" }); };
  const save = () => {
    if (!form.nom.trim()) return;
    if (editId) { setCats(cats.map(c => c.id===editId ? { ...c, ...form, budget:Number(form.budget)||0 } : c)); cancelEdit(); }
    else { setCats([...cats, { id:Date.now(), ...form, budget:Number(form.budget)||0 }]); setForm({ nom:"", couleur:t.accent, icone:"📦", budget:"" }); }
  };
  const del = id => { setCats(cats.filter(c => c.id!==id)); setConfirm(null); };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }}>
      <div style={{ background:t.bg1, border:`1px solid ${t.border}`, borderRadius:16, width:580, maxHeight:"85vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.2rem 1.5rem", borderBottom:`1px solid ${t.border}` }}>
          <p style={{ margin:0, fontWeight:500, fontSize:15, color:t.text1 }}>Gestion des catégories</p>
          <button onClick={onClose} style={{ background:"none", border:"none", color:t.text2, cursor:"pointer", fontSize:18, lineHeight:1 }}>×</button>
        </div>
        <div style={{ padding:"1.2rem 1.5rem", borderBottom:`1px solid ${t.border}`, background:t.bg2 }}>
          <p style={{ fontSize:11, color:t.text3, margin:"0 0 10px", textTransform:"uppercase", letterSpacing:0.8 }}>{editId ? "Modifier la catégorie" : "Nouvelle catégorie"}</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
            <div>
              <p style={{ fontSize:11, color:t.text2, margin:"0 0 5px" }}>Nom</p>
              <input value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})} placeholder="Ex : Fournitures" style={{ ...inp, width:"100%", boxSizing:"border-box" }} />
            </div>
            <div>
              <p style={{ fontSize:11, color:t.text2, margin:"0 0 5px" }}>Budget mensuel (XPF)</p>
              <input type="number" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} placeholder="0" style={{ ...inp, width:"100%", boxSizing:"border-box" }} />
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            <div>
              <p style={{ fontSize:11, color:t.text2, margin:"0 0 8px" }}>Icône</p>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {ICONES.map(ic => (
                  <button key={ic} onClick={() => setForm({...form,icone:ic})}
                    style={{ width:32, height:32, borderRadius:8, border:`1px solid ${form.icone===ic?form.couleur:t.border}`, background:form.icone===ic?`${form.couleur}22`:t.bg3, cursor:"pointer", fontSize:15 }}>{ic}</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize:11, color:t.text2, margin:"0 0 8px" }}>Couleur</p>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {COULEURS.map(col => (
                  <button key={col} onClick={() => setForm({...form,couleur:col})}
                    style={{ width:26, height:26, borderRadius:"50%", background:col, border:`2px solid ${form.couleur===col?"#fff":"transparent"}`, cursor:"pointer" }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <Btn primary onClick={save}>{editId ? "Enregistrer" : "+ Ajouter"}</Btn>
            {editId && <Btn onClick={cancelEdit}>Annuler</Btn>}
          </div>
        </div>
        <div style={{ overflowY:"auto", flex:1 }}>
          {cats.map(c => (
            <div key={c.id}>
              {confirm===c.id ? (
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 1.5rem", background:t.redBg }}>
                  <span style={{ fontSize:12.5, color:t.text1 }}>Supprimer <strong>{c.nom}</strong> ?</span>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => del(c.id)} style={{ fontSize:12, padding:"4px 12px", borderRadius:6, background:t.red, color:"#fff", border:"none", cursor:"pointer" }}>Confirmer</button>
                    <button onClick={() => setConfirm(null)} style={{ fontSize:12, padding:"4px 12px", borderRadius:6, background:t.bg3, color:t.text2, border:"none", cursor:"pointer" }}>Annuler</button>
                  </div>
                </div>
              ) : (
                <div style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 1.5rem", borderBottom:`1px solid ${t.border}` }}
                  onMouseEnter={e=>e.currentTarget.style.background=t.bg2}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{ width:34, height:34, borderRadius:8, background:`${c.couleur}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{c.icone}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontSize:13, fontWeight:500, color:t.text1 }}>{c.nom}</p>
                    <p style={{ margin:0, fontSize:11, color:t.text3 }}>Budget : {c.budget > 0 ? c.budget.toLocaleString("fr-FR")+" XPF" : "—"}</p>
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={() => startEdit(c)} style={{ fontSize:11.5, padding:"4px 10px", borderRadius:6, background:t.bg3, color:t.text2, border:`1px solid ${t.border}`, cursor:"pointer" }}>Modifier</button>
                    <button onClick={() => setConfirm(c.id)} style={{ fontSize:11.5, padding:"4px 10px", borderRadius:6, background:"transparent", color:t.red, border:`1px solid ${t.redBg}`, cursor:"pointer" }}>Supprimer</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Depenses() {
  const [filtre, setFiltre] = useState("Toutes");
  const [cats, setCats] = useState(CATS_DEFAUT);
  const [gestion, setGestion] = useState(false);
  const nomsCats = ["Toutes", ...cats.map(c => c.nom)];
  const filtered = filtre==="Toutes" ? depenses : depenses.filter(d => d.categorie===filtre);
  const totalValidees = depenses.filter(d=>d.statut==="Validée").reduce((s,d)=>s+montantNum(d.montant),0);
  const totalAttente  = depenses.filter(d=>d.statut==="En attente").reduce((s,d)=>s+montantNum(d.montant),0);
  const totalAll      = totalValidees + totalAttente;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      {gestion && <GestionCategories cats={cats} setCats={setCats} onClose={() => setGestion(false)} />}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <KpiCard label="Total dépenses" value={xpf(totalAll)} sub="Ce mois-ci" />
        <KpiCard label="Validées" value={xpf(totalValidees)} color={t.green} />
        <KpiCard label="En attente" value={xpf(totalAttente)} color={t.amber} />
        <KpiCard label="Catégories" value={cats.length} sub="actives" color={t.teal} />
      </div>
      <Panel>
        <PanelHeader title="Budgets par catégorie" action={
          <button onClick={() => setGestion(true)} style={{ fontSize:12, padding:"5px 14px", borderRadius:8, background:t.bg3, color:t.text2, border:`1px solid ${t.border}`, cursor:"pointer" }}>
            ⚙ Gérer les catégories
          </button>
        } />
        <Divider />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px,1fr))", gap:12, padding:"1.2rem" }}>
          {cats.map(c => {
            const depCat = depenses.filter(d=>d.categorie===c.nom).reduce((s,d)=>s+montantNum(d.montant),0);
            const pct = c.budget > 0 ? Math.min(100, Math.round((depCat/c.budget)*100)) : 0;
            const over = pct >= 90;
            return (
              <div key={c.id} style={{ background:t.bg3, borderRadius:10, padding:"0.9rem", border:`1px solid ${over?t.red:t.border}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <span style={{ fontSize:18 }}>{c.icone}</span>
                  <span style={{ fontSize:13, fontWeight:500, color:t.text1 }}>{c.nom}</span>
                </div>
                <div style={{ height:5, background:t.bg2, borderRadius:3, marginBottom:7, overflow:"hidden" }}>
                  <div style={{ width:`${pct}%`, height:"100%", background:over?t.red:c.couleur, borderRadius:3 }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11 }}>
                  <span style={{ color:over?t.red:t.text3 }}>{depCat.toLocaleString("fr-FR")} XPF</span>
                  <span style={{ color:t.text3 }}>{c.budget > 0 ? c.budget.toLocaleString("fr-FR")+" XPF" : "—"}</span>
                </div>
                {over && <p style={{ fontSize:10.5, color:t.red, margin:"5px 0 0" }}>⚠ Budget dépassé ({pct}%)</p>}
              </div>
            );
          })}
        </div>
      </Panel>
      <Panel>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 1.3rem", flexWrap:"wrap", gap:8 }}>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{nomsCats.map(c => <FilterPill key={c} label={c} active={filtre===c} onClick={() => setFiltre(c)} />)}</div>
          <Btn primary>+ Nouvelle dépense</Btn>
        </div>
        <Divider />
        <Table cols={["Référence","Catégorie","Fournisseur","Date","Montant","Statut"]}
          rows={filtered.map(d => {
            const cat = cats.find(c=>c.nom===d.categorie);
            return { id:d.id, cat:<span style={{ display:"flex", alignItems:"center", gap:6 }}><span>{cat?.icone||"📦"}</span>{d.categorie}</span>, four:d.fournisseur, date:d.date, montant:d.montant, statut:d.statut };
          })} />
      </Panel>
    </div>
  );
}

function Stats() {
  const donut = [
    { label:"Prestations", pct:52, color:t.accent },
    { label:"Conseil",     pct:28, color:t.teal },
    { label:"Formation",   pct:12, color:t.amber },
    { label:"Autre",       pct:8,  color:t.text3 },
  ];
  const trimestres = ["T1 2023","T2 2023","T3 2023","T4 2023","T1 2024"];
  const rev = [68,74,82,91,102], dep = [22,19,25,28,18];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <KpiCard label="Marge nette" value="72 %" sub="↑ +4pts vs N-1" color={t.green} />
        <KpiCard label="Taux recouvrement" value="88 %" sub="Des factures émises" color={t.accent} />
        <KpiCard label="Délai moyen paiement" value="22 j" sub="Objectif : 30 j" color={t.teal} />
        <KpiCard label="Croissance CA" value="+18 %" sub="vs année précédente" color={t.amber} />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <Panel>
          <PanelHeader title="Revenus vs Dépenses (MXPF)" />
          <Divider />
          <div style={{ padding:"1.25rem 1.3rem", display:"flex", flexDirection:"column", gap:14 }}>
            {trimestres.map((tr, i) => (
              <div key={tr}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11.5, marginBottom:6, color:t.text2 }}>
                  <span>{tr}</span><span style={{ color:t.text3 }}>{rev[i]}M · {dep[i]}M XPF</span>
                </div>
                <div style={{ height:8, background:t.bg3, borderRadius:4, overflow:"hidden", position:"relative" }}>
                  <div style={{ height:"100%", width:`${(rev[i]/110)*100}%`, background:`${t.accent}55`, position:"absolute", borderRadius:4 }} />
                  <div style={{ height:"100%", width:`${(dep[i]/110)*100}%`, background:`${t.red}55`, position:"absolute", borderRadius:4 }} />
                </div>
              </div>
            ))}
            <div style={{ display:"flex", gap:16, marginTop:4, fontSize:11, color:t.text3 }}>
              <span><span style={{ display:"inline-block", width:10, height:4, borderRadius:2, background:`${t.accent}55`, marginRight:5, verticalAlign:"middle" }} />Revenus</span>
              <span><span style={{ display:"inline-block", width:10, height:4, borderRadius:2, background:`${t.red}55`, marginRight:5, verticalAlign:"middle" }} />Dépenses</span>
            </div>
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Répartition CA par activité" />
          <Divider />
          <div style={{ padding:"1.25rem 1.3rem" }}>
            {donut.map(d => (
              <div key={d.label} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12.5, marginBottom:6 }}>
                  <span style={{ color:t.text2 }}>{d.label}</span>
                  <span style={{ fontWeight:500, color:d.color }}>{d.pct}%</span>
                </div>
                <div style={{ height:6, background:t.bg3, borderRadius:3, overflow:"hidden" }}>
                  <div style={{ width:`${d.pct}%`, height:"100%", background:d.color, borderRadius:3, opacity:0.85 }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel>
        <PanelHeader title="Top 5 clients par CA" />
        <Divider />
        <Table cols={["Client","CA annuel","Factures","Délai paiement","Taux recouvrement"]}
          rows={[
            { client:"Acme SAS",    ca:"5 750 000 XPF", fac:"8", paiement:"22 j", taux:"100%" },
            { client:"Nova Tech",   ca:"3 760 000 XPF", fac:"6", paiement:"28 j", taux:"83%" },
            { client:"DataVision",  ca:"3 290 000 XPF", fac:"5", paiement:"18 j", taux:"100%" },
            { client:"Horizon BTP", ca:"2 720 000 XPF", fac:"4", paiement:"45 j", taux:"67%" },
            { client:"Floralis",    ca:"2 195 000 XPF", fac:"3", paiement:"12 j", taux:"100%" },
          ]} />
      </Panel>
    </div>
  );
}

const titles = { dashboard:"Tableau de bord", factures:"Factures", "creer-facture":"Nouvelle facture", clients:"Clients", "fiche-client":"Fiche client", paiements:"Suivi des paiements", depenses:"Dépenses", stats:"Statistiques" };

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState(null);
  const render = () => {
    switch(page) {
      case "dashboard":     return <Dashboard setPage={setPage} />;
      case "factures":      return <Factures setPage={setPage} />;
      case "creer-facture": return <CreerFacture />;
      case "clients":       return <Clients setPage={setPage} setSelectedClient={setSelectedClient} />;
      case "fiche-client":  return <FicheClient client={selectedClient} setPage={setPage} />;
      case "paiements":     return <Paiements />;
      case "depenses":      return <Depenses />;
      case "stats":         return <Stats />;
      default:              return null;
    }
  };
  return (
    <div style={{ display:"flex", height:"100vh", background:t.bg0, fontFamily:"'Inter', system-ui, sans-serif", overflow:"hidden", color:t.text1 }}>
      <aside style={{ width:220, background:t.bg1, borderRight:`1px solid ${t.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
        <div style={{ padding:"1.4rem 1.25rem 1.1rem", borderBottom:`1px solid ${t.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:t.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8h4v4H8z" fill="#fff"/></svg>
            </div>
            <div>
              <p style={{ margin:0, fontWeight:600, fontSize:13.5, color:t.text1 }}>Nexaroa</p>
              <p style={{ margin:0, fontSize:10.5, color:t.text3 }}>Exercice 2024</p>
            </div>
          </div>
        </div>
        <nav style={{ flex:1, padding:"0.75rem 0.6rem", overflowY:"auto" }}>
          <p style={{ fontSize:10, color:t.text3, textTransform:"uppercase", letterSpacing:1, padding:"4px 10px 8px", margin:0 }}>Navigation</p>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"8px 10px", borderRadius:8,
                background:page===item.id?t.accentBg:"transparent",
                color:page===item.id?t.accent:t.text2,
                border:"none", cursor:"pointer", fontSize:12.5, textAlign:"left",
                fontWeight:page===item.id?500:400, marginBottom:2 }}
              onMouseEnter={e => { if(page!==item.id) e.currentTarget.style.background=t.bg3; }}
              onMouseLeave={e => { if(page!==item.id) e.currentTarget.style.background="transparent"; }}>
              <span style={{ opacity:page===item.id?1:0.6 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding:"0.9rem 1.1rem", borderTop:`1px solid ${t.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:t.tealBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:600, color:t.teal, flexShrink:0 }}>JD</div>
            <div>
              <p style={{ margin:0, fontSize:12, fontWeight:500, color:t.text1 }}>Julie Durand</p>
              <p style={{ margin:0, fontSize:10.5, color:t.text3 }}>Administrateur</p>
            </div>
          </div>
        </div>
      </aside>
      <main style={{ flex:1, overflow:"auto", padding:"1.75rem 2rem" }}>
        <div style={{ marginBottom:"1.5rem" }}>
          <h1 style={{ margin:0, fontSize:18, fontWeight:500, color:t.text1 }}>{titles[page]}</h1>
          <p style={{ margin:"4px 0 0", fontSize:12, color:t.text3 }}>Nexaroa · Exercice fiscal 2024</p>
        </div>
        {render()}
      </main>
    </div>
  );
}
