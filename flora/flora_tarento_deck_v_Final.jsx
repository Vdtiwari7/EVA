import { useState, useEffect, useRef } from "react";

const SAND = "#8C5E28";
const SAGE = "#3A6855";
const TERRA = "#8A3218";
const MOSS = "#4A6C46";
const TEXT = "#2A2018";
const MUTED = "#3D2D1E";
const DIMMED = "rgba(42,32,24,0.72)";
const BORDER = "rgba(42,32,24,0.22)";
const BG = "#E8DFD2";
const ease = "cubic-bezier(0.16,1,0.3,1)";

// Warehouse SVG icons (from the provided icon sheet — subtle, McKinsey-level)
const WarehouseIcon = ({ size = 32, opacity = 0.18, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity, ...style }}>
    <rect x="8" y="28" width="48" height="28" rx="2" fill={TEXT} />
    <path d="M4 30L32 10L60 30" stroke={TEXT} strokeWidth="3" strokeLinecap="round" fill="none" />
    <rect x="24" y="38" width="16" height="18" rx="1" fill={BG} opacity="0.6" />
    <rect x="10" y="36" width="10" height="8" rx="1" fill={BG} opacity="0.4" />
    <rect x="44" y="36" width="10" height="8" rx="1" fill={BG} opacity="0.4" />
  </svg>
);

const ForkliftIcon = ({ size = 28, opacity = 0.15, style = {} }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 60 54" fill="none" style={{ opacity, ...style }}>
    <rect x="2" y="14" width="22" height="26" rx="2" fill={TEXT} />
    <rect x="24" y="30" width="34" height="10" rx="1" fill={TEXT} />
    <rect x="20" y="4" width="4" height="36" rx="1" fill={TEXT} />
    <rect x="24" y="14" width="14" height="4" rx="1" fill={TEXT} />
    <circle cx="10" cy="46" r="6" fill={TEXT} />
    <circle cx="10" cy="46" r="2.5" fill={BG} opacity="0.5" />
    <circle cx="48" cy="46" r="6" fill={TEXT} />
    <circle cx="48" cy="46" r="2.5" fill={BG} opacity="0.5" />
  </svg>
);

const PalletIcon = ({ size = 28, opacity = 0.15, style = {} }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 60 45" fill="none" style={{ opacity, ...style }}>
    <rect x="2" y="28" width="56" height="8" rx="2" fill={TEXT} />
    <rect x="6" y="36" width="10" height="8" rx="1" fill={TEXT} />
    <rect x="25" y="36" width="10" height="8" rx="1" fill={TEXT} />
    <rect x="44" y="36" width="10" height="8" rx="1" fill={TEXT} />
    <rect x="4" y="10" width="16" height="16" rx="2" fill={TEXT} />
    <rect x="22" y="10" width="16" height="16" rx="2" fill={TEXT} />
    <rect x="40" y="10" width="16" height="16" rx="2" fill={TEXT} />
    <rect x="4" y="2" width="16" height="6" rx="1" fill={TEXT} opacity="0.6" />
    <rect x="22" y="2" width="16" height="6" rx="1" fill={TEXT} opacity="0.6" />
    <rect x="40" y="2" width="16" height="6" rx="1" fill={TEXT} opacity="0.6" />
  </svg>
);

const TruckIcon = ({ size = 36, opacity = 0.15, style = {} }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 70 49" fill="none" style={{ opacity, ...style }}>
    <rect x="2" y="10" width="40" height="28" rx="2" fill={TEXT} />
    <path d="M42 18H58L66 30V38H42V18Z" fill={TEXT} />
    <rect x="44" y="22" width="14" height="10" rx="1" fill={BG} opacity="0.4" />
    <circle cx="14" cy="42" r="6" fill={TEXT} />
    <circle cx="14" cy="42" r="2.5" fill={BG} opacity="0.5" />
    <circle cx="54" cy="42" r="6" fill={TEXT} />
    <circle cx="54" cy="42" r="2.5" fill={BG} opacity="0.5" />
  </svg>
);

const DockIcon = ({ size = 32, opacity = 0.15, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity, ...style }}>
    <rect x="6" y="20" width="52" height="36" rx="2" fill={TEXT} />
    <rect x="14" y="28" width="16" height="20" rx="1" fill={BG} opacity="0.5" />
    <rect x="34" y="28" width="16" height="20" rx="1" fill={BG} opacity="0.5" />
    <rect x="2" y="14" width="60" height="8" rx="1" fill={TEXT} opacity="0.7" />
    <rect x="22" y="4" width="20" height="10" rx="1" fill={TEXT} opacity="0.5" />
    <rect x="6" y="56" width="52" height="6" rx="1" fill={TEXT} opacity="0.4" />
  </svg>
);

function Grain() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.022, zIndex: 1 }}>
      <filter id="noise2"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="100%" height="100%" filter="url(#noise2)" />
    </svg>
  );
}

function Badge({ label, color, small }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", padding: small ? "4px 10px" : "5px 14px", borderRadius: 5, background: `${color}12`, border: `1px solid ${color}2A`, fontSize: small ? 9 : 10, letterSpacing: 5, fontWeight: 700, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", color }}>
      {label}
    </div>
  );
}

function IconCircle({ children, color, size = 44 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `${color}14`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {children}
    </div>
  );
}

function MetricCard({ value, label, name, color, delay, active }) {
  return (
    <div style={{ flex: 1, background: `${color}0C`, border: `1px solid ${color}20`, borderRadius: 10, padding: "16px 14px", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(14px)", transition: `opacity 0.6s ${ease} ${delay}s, transform 0.6s ${ease} ${delay}s` }}>
      <div style={{ fontSize: 32, fontFamily: "'DM Serif Display', Georgia, serif", color, marginBottom: 2 }}>{value}</div>
      {name && <div style={{ fontSize: 12.5, fontWeight: 600, color, opacity: 0.9, fontFamily: "'Inter', sans-serif", marginBottom: 3 }}>{name}</div>}
      <div style={{ fontSize: 15.5, color: MUTED, fontFamily: "'Inter', sans-serif", lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCENE 1: Title
// ─────────────────────────────────────────────
function TitleScene({ active }) {
  return (
    <div style={{ display: "flex", height: "calc(100% - 44px)", position: "relative", overflow: "hidden" }}>

      {/* Left: text */}
      <div style={{ flex: "0 0 50%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 44px 80px 80px" }}>
        <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(18px)", transition: `opacity 0.7s ${ease}, transform 0.7s ${ease}`, marginBottom: 16 }}>
          <Badge label="TARENTO × FLORA" color={SAND} />
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 54, fontWeight: 400, color: TEXT, lineHeight: 1.1, margin: "0 0 22px", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(22px)", transition: `opacity 0.85s ${ease} 0.12s, transform 0.85s ${ease} 0.12s` }}>
          SAP Warehouse<br />Optimisation and<br /><em style={{ color: SAND }}>AI Enablement</em>
        </h1>
        <div style={{ width: 44, height: 2, background: SAND, opacity: active ? 0.45 : 0, transition: `opacity 0.7s ${ease} 0.4s` }} />
      </div>

      {/* Right: warehouse photo */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 24px 88px", overflow: "hidden" }}>
        <img
          src={`${import.meta.env.BASE_URL}warehouse.png`}
          alt="Warehouse operations"
          style={{
            width: "100%", height: "100%", objectFit: "contain",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0) scale(1)" : "translateY(14px) scale(0.97)",
            transition: `opacity 0.9s ${ease} 0.2s, transform 0.9s ${ease} 0.2s`,
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Bottom logo bar — sits above the global nav strip */}
      <div style={{ position: "absolute", bottom: 44, left: 0, right: 0, height: 44, borderTop: `1px solid ${BORDER}`, background: `${BG}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", opacity: active ? 1 : 0, transition: `opacity 0.9s ${ease} 0.5s`, zIndex: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: DIMMED }}>PREPARED FOR</span>
          <img src={`${import.meta.env.BASE_URL}flora-logo.png`} alt="Flora Food Group" style={{ height: 30, objectFit: "contain", filter: "brightness(0) opacity(0.55)" }} />
        </div>
        <div style={{ width: 1, height: 24, background: BORDER }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: DIMMED }}>PRESENTED BY</span>
          <img src={`${import.meta.env.BASE_URL}tarento-logo.svg`} alt="Tarento" style={{ height: 38, objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCENE 2: Mirror — What Flora Said / What We Built
// ─────────────────────────────────────────────
function MirrorScene({ active }) {
  const left = [
    { num: "01", text: "Innovative use cases and implementations in warehouse management" },
    { num: "02", text: "Inbound, outbound and stock management best practices" },
    { num: "03", text: "Automation and process optimisation examples" },
    { num: "04", text: "Lessons learned from implementation and transformation projects" },
    { num: "05", text: "Voice-enabled RF for factory floor operations" },
    { num: "06", text: "PP-WM and MES integration as a live operational need" },
  ];
  const right = [
    { text: "4 CPG use cases + automation innovations built around factory WM realities", color: SAND },
    { text: "Inbound dock accuracy workflows, outbound despatch intelligence grounded in client engagements", color: SAGE },
    { text: "Scheduling engine, RF pick-to-pack-to-stage, slotting and HU automation with outcome metrics", color: MOSS },
    { text: "7 field-tested lessons including master data first, change management as contractual, and exception-first design", color: SAND },
    { text: "Voice layer on SAP BTP, tied directly to EWM transaction logic, built for F&B factory conditions", color: SAGE },
    { text: "PP-WM integration as the centrepiece use case, not a footnote, with event-driven staging logic", color: TERRA },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "calc(100% - 44px)", padding: "40px 64px" }}>
      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`, marginBottom: 10 }}>
        <Badge label="WE HEARD YOU" color={SAND} />
      </div>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 34, fontWeight: 400, color: TEXT, margin: "0 0 22px", opacity: active ? 1 : 0, transition: `opacity 0.65s ${ease} 0.1s` }}>
        From your <em style={{ color: SAND }}>brief</em> to our <em style={{ color: SAGE }}>response.</em>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Left col header */}
        <div style={{ opacity: active ? 1 : 0, transition: `opacity 0.5s ${ease} 0.15s` }}>
          <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", color: TERRA, marginBottom: 8 }}>FLORA'S ASKS</div>
        </div>
        <div style={{ opacity: active ? 1 : 0, transition: `opacity 0.5s ${ease} 0.15s` }}>
          <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", color: SAGE, marginBottom: 8 }}>WHAT WE BUILT AROUND IT</div>
        </div>

        {left.map((item, i) => (
          <>
            <div key={`l${i}`} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: `${TERRA}07`, border: `1px solid ${TERRA}14`, borderRadius: 8, padding: "10px 12px", opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-12px)", transition: `opacity 0.5s ${ease} ${0.22 + i * 0.08}s, transform 0.5s ${ease} ${0.22 + i * 0.08}s` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TERRA, opacity: 0.6, minWidth: 18, marginTop: 1 }}>{item.num}</div>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, fontWeight: 500, color: TEXT, lineHeight: 1.45 }}>{item.text}</div>
              </div>
            </div>
            <div key={`r${i}`} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: `${right[i].color}09`, border: `1px solid ${right[i].color}18`, borderLeft: `3px solid ${right[i].color}70`, borderRadius: "0 8px 8px 0", padding: "9px 12px", opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(12px)", transition: `opacity 0.5s ${ease} ${0.22 + i * 0.08}s, transform 0.5s ${ease} ${0.22 + i * 0.08}s` }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: MUTED, lineHeight: 1.55 }}>{right[i].text}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCENE 3: Factory Floor Reality
// ─────────────────────────────────────────────
function RealityScene({ active }) {
  const pains = [
    { Icon: () => <DockIcon size={22} opacity={1} style={{ filter: `opacity(0.8)` }} />, color: TERRA, title: "PP-WM staging friction", text: "Production orders release, change, and get expedited throughout the shift. WM has no event trigger from PP. Transfer orders are created manually — or not at all — until someone escalates." },
    { Icon: () => <ForkliftIcon size={22} opacity={1} style={{ filter: "opacity(0.8)" }} />, color: TERRA, title: "Inbound dock pressure", text: "Docks handle raw materials, packaging, and indirect goods under production schedule pressure. A GR error at inbound doesn't surface until a line stops — two hours later." },
    { Icon: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="5" rx="1" fill={TEXT} opacity="0.8" /><rect x="14" y="3" width="7" height="5" rx="1" fill={TEXT} opacity="0.4" /><rect x="3" y="10" width="18" height="3" rx="1" fill={TEXT} opacity="0.6" /><rect x="3" y="16" width="18" height="5" rx="1" fill={TEXT} opacity="0.3" /></svg>, color: TERRA, title: "RF confirmation gaps", text: "Standard RF transactions require screen reading, keyboard input, full attention. In F&B factory conditions — gloves, cold storage, noise — operatives confirm quantities without verifying. The system accepts it." },
    { Icon: () => <TruckIcon size={26} opacity={1} style={{ filter: "opacity(0.8)" }} />, color: TERRA, title: "Missed despatch windows", text: "WM has no wave management. Outbound transfer orders are created on demand, not against truck departure windows. Supervisors use retrospective reports. By the time a miss is visible, the truck has left." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "48px 68px", position: "relative" }}>
      {/* subtle warehouse watermark top right */}
      <div style={{ position: "absolute", top: 20, right: 40, opacity: active ? 1 : 0, transition: `opacity 1.2s ${ease} 0.8s` }}>
        <WarehouseIcon size={110} opacity={0.05} />
      </div>

      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`, marginBottom: 8 }}>
        <Badge label="FLORA'S FACTORY FLOOR" color={TERRA} />
      </div>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 38, fontWeight: 400, color: TEXT, margin: "0 0 26px", lineHeight: 1.2, opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.65s ${ease} 0.1s` }}>
        Four frictions.<br /><em style={{ color: TERRA }}>Every single shift.</em>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {pains.map((p, i) => (
          <div key={i} style={{ background: `${p.color}08`, border: `1px solid ${p.color}18`, borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(14px)", transition: `opacity 0.55s ${ease} ${0.18 + i * 0.12}s, transform 0.55s ${ease} ${0.18 + i * 0.12}s` }}>
            <IconCircle color={p.color} size={40}>
              <p.Icon />
            </IconCircle>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 16, color: TEXT, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: MUTED, lineHeight: 1.55 }}>{p.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCENE 4–7: Proof points
// ─────────────────────────────────────────────
const proofScenes = [
  {
    label: "PP-WM INTEGRATION",
    color: SAND,
    region: "North America",
    industry: "CPG",
    WIcon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={SAND} strokeWidth="1.5" /><path d="M12 7v5l3 3" stroke={SAND} strokeWidth="1.5" strokeLinecap="round" /></svg>,
    header: "When production and warehouse aren't on the same clock",
    voice: "In multiple S/4HANA factory WM engagements, the highest-friction point was always the same: production changed the plan, and the warehouse found out by walking over and asking. The WM integration layer we built addresses exactly this.",
    challenge: "WM creates transfer orders manually or via batch with no real-time event trigger from PP order release. When schedules change intra-day, WM cannot re-prioritise staging tasks. With MES systems at production sites, the integration gap becomes even sharper.",
    built: "Enhanced IDOC/BAPI integration layer creating event-driven staging tasks on PP order release — proven delivery in S/4HANA factory environments. An agentic AI overlay for proactive staging alerts is in active PoC development, extending this integration without requiring migration.",
    outcomes: [{ value: "30–40%", label: "Staging delay reduction" }, { value: "2–3 FTE", label: "Coordination saved per site" }, { value: "15–25%", label: "Reduction in work-in-progress inventory buffer" }],
    warehouseEl: <PalletIcon size={80} opacity={0.055} style={{ position: "absolute", bottom: 30, right: 50 }} />,
  },
  {
    label: "INBOUND ACCURACY",
    color: MOSS,
    region: "APAC",
    industry: "CPG",
    WIcon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke={MOSS} strokeWidth="1.5" /><path d="M8 12l3 3 5-5" stroke={MOSS} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    header: "A wrong quantity at goods receipt is a production stoppage two hours later",
    voice: "What we consistently found in factory WM environments is that GR errors are invisible at the dock. They only surface later — when a production line is already waiting for material that was putaway in the wrong bin.",
    challenge: "Factory docks handle raw materials and packaging under production time pressure. GR quantity discrepancies, incorrect putaway, and quality hold delays propagate directly into production. WM putaway strategies are static with no native dock appointment or inbound slot management.",
    built: "Structured mobile GR workflows with embedded validation: quantity tolerances, mandatory batch fields, quality hold triggers — proven delivery. An agentic AI layer to monitor inbound deliveries against production schedule urgency and alert dock supervisors proactively is in active PoC development.",
    outcomes: [{ value: "35–50%", label: "GR discrepancy reduction" }, { value: "40%", label: "Faster putaway cycle" }, { value: "20–30%", label: "Less quality hold duration" }],
    warehouseEl: <DockIcon size={90} opacity={0.05} style={{ position: "absolute", bottom: 20, right: 50 }} />,
  },
  {
    label: "OUTBOUND DESPATCH",
    color: TERRA,
    region: "APAC",
    industry: "Food and Beverage",
    WIcon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 17h3m12 0h3M6 17v-5l6-8 6 8v5M6 17h12" stroke={TERRA} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    header: "Reactive despatching is a margin problem, not just an ops problem",
    voice: "In a delivered engagement, we built a scheduling engine that monitored packing area utilisation and controlled task release in real time. The planning team said it gave them back two to three hours every shift. The agentic despatch logic builds on this same pattern.",
    challenge: "WM has no native wave management. Outbound transfer orders are created when goods are ready, not against truck departure windows. Supervisors use retrospective reports, not live status. Missed slots absorb as expedited freight costs and retail service level breaches.",
    built: "Outbound planning overlay aggregating open deliveries against truck departure windows — delivered capability. Agentic re-prioritisation that pushes urgent tasks to the operative queue when a critical delivery falls behind is in active PoC development, extending the delivered outbound logic.",
    outcomes: [{ value: "15–25%", label: "On-time despatch uplift" }, { value: "10–18%", label: "Less vehicle underutilisation" }, { value: "30–40%", label: "Supervisor time saved" }],
    warehouseEl: <TruckIcon size={100} opacity={0.05} style={{ position: "absolute", bottom: 20, right: 40 }} />,
  },
  {
    label: "VOICE-RF",
    color: SAGE,
    region: "EMEA",
    industry: "Food and Beverage",
    WIcon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="9" y="2" width="6" height="12" rx="3" stroke={SAGE} strokeWidth="1.5" /><path d="M5 10a7 7 0 0014 0" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" /><line x1="12" y1="17" x2="12" y2="22" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" /></svg>,
    header: "Gloves on. Cold storage. RF was not designed for this.",
    voice: "We are in active PoC development on this architecture. The design question that shaped it was practical: can an operative confirm a transaction with gloves on, in a cold store, with noise around them? We have not deployed this with a live customer yet, but the architecture is validated and the feasibility path is clear.",
    challenge: "Standard RF requires screen reading and keyboard input. In F&B factory conditions, gloves reduce accuracy, cold storage makes screens unreliable, and noise makes visual interaction difficult. Operatives confirm quantities without verifying because the transaction accepts any input.",
    built: "Conversational AI voice layer on SAP BTP, tied directly to EWM transaction logic. Operative speaks a command, system validates against the open transfer order, transaction completes with no screen interaction. PoC architecture validated — not yet a live customer deployment. Requires S/4HANA with EWM active; feasibility check is a prerequisite.",
    outcomes: [{ value: "20–30%", name: "Productivity gain", label: "Target range based on PoC design" }, { value: "45–60%", name: "RF error reduction", label: "Target range based on PoC design" }, { value: "—", label: "Timeline subject to feasibility assessment" }],
    warehouseEl: <ForkliftIcon size={90} opacity={0.05} style={{ position: "absolute", bottom: 20, right: 40 }} />,
  },
];

function ProofScene({ active, scene }) {
  const { label, color, WIcon, header, voice, challenge, built, outcomes, warehouseEl, region, industry } = scene;
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "calc(100% - 44px)", padding: "42px 68px", position: "relative", overflow: "hidden" }}>
      {/* warehouse element as subtle bg */}
      <div style={{ opacity: active ? 1 : 0, transition: `opacity 1.4s ${ease} 0.7s` }}>{warehouseEl}</div>

      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`, marginBottom: 10, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <IconCircle color={color} size={40}><WIcon /></IconCircle>
        <Badge label={label} color={color} />
        {/* Region / industry badges */}
        {[region, industry].map((tag, i) => (
          <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: 3, textTransform: "uppercase", color: TEXT, background: `${color}1F`, border: `1px solid ${color}45`, borderRadius: 4, padding: "4px 10px", opacity: 1 }}>{tag}</span>
        ))}
      </div>

      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, fontWeight: 400, color: TEXT, margin: "0 0 10px", lineHeight: 1.3, maxWidth: 760, opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.65s ${ease} 0.1s` }}>
        {header}
      </h2>

      {/* Autobiographical voice sentence */}
      <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 16, fontStyle: "italic", color: MUTED, margin: "0 0 16px", lineHeight: 1.55, maxWidth: 720, opacity: active ? 1 : 0, transition: `opacity 0.65s ${ease} 0.18s` }}>
        {voice}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          { title: "THE CHALLENGE", text: challenge, col: TERRA },
          { title: "WHAT WAS BUILT", text: built, col: color },
        ].map((block, i) => (
          <div key={i} style={{ background: `${block.col}12`, border: `1px solid ${block.col}35`, borderRadius: 9, padding: "12px 14px", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.58s ${ease} ${0.22 + i * 0.1}s, transform 0.58s ${ease} ${0.22 + i * 0.1}s` }}>
            <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", color: block.col, marginBottom: 7, fontWeight: 700 }}>{block.title}</div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: MUTED, lineHeight: 1.65, margin: 0 }}>{block.text}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {outcomes.map((o, i) => <MetricCard key={i} value={o.value} label={o.label} name={o.name} color={color} delay={0.4 + i * 0.11} active={active} />)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCENE 8: Approach
// ─────────────────────────────────────────────
function ApproachScene({ active }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "calc(100% - 44px)", padding: "48px 68px", position: "relative", overflow: "hidden" }}>
      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`, marginBottom: 10 }}>
        <Badge label="OUR APPROACH" color={SAND} />
      </div>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 40, fontWeight: 400, color: TEXT, margin: "0 0 30px", lineHeight: 1.2, opacity: active ? 1 : 0, transition: `opacity 0.65s ${ease} 0.1s` }}>
        A methodology,<br /><em style={{ color: SAND }}>not a migration.</em>
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { num: "01", color: SAND, title: "Assess", text: "Map the current WM environment against factory-floor operational reality. The gaps surface in the same four places across every factory WM engagement: staging handoff, inbound accuracy, RF execution, and outbound coordination." },
          { num: "02", color: SAGE, title: "Start within WM", text: "Phase 1 is entirely within the existing WM landscape. No migration, no disruption, no new licence. Measurable wins in 0 to 6 months. Every improvement is additive from this point." },
          { num: "03", color: MOSS, title: "Phase by zone", text: "Validate improvements in one process area or factory zone before scaling across sites. This isolates risk, builds operator confidence, and creates a replicable playbook for the remaining 14 factories." },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: `${s.color}08`, border: `1px solid ${s.color}18`, borderRadius: 9, padding: "14px 18px", opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-14px)", transition: `opacity 0.58s ${ease} ${0.2 + i * 0.14}s, transform 0.58s ${ease} ${0.2 + i * 0.14}s` }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: s.color, opacity: 0.7, minWidth: 24, marginTop: 2 }}>{s.num}</div>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 17, color: s.color, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.55 }}>{s.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCENE 9: What good looks like
// ─────────────────────────────────────────────
function GoodLooksScene({ active }) {
  const items = [
    { Icon: () => <PalletIcon size={18} opacity={1} />, color: SAND, text: "Production staging triggers on PP order release. No phone calls, no manual transfer order creation, no escalation to find where materials are." },
    { Icon: () => <DockIcon size={18} opacity={1} />, color: MOSS, text: "Dock supervisors get a four-hour early warning when a delayed inbound delivery is on the critical path for a production order." },
    { Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="9" y="2" width="6" height="12" rx="3" stroke={SAGE} strokeWidth="1.5" /><path d="M5 10a7 7 0 0014 0" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" /><line x1="12" y1="17" x2="12" y2="22" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" /></svg>, color: SAGE, text: "Factory floor operatives confirm transfers by voice. No screen, no gloves off, no confirmation bias. Validates against the open order before accepting." },
    { Icon: () => <TruckIcon size={20} opacity={1} />, color: TERRA, text: "Outbound runs against a despatch plan tied to truck departure windows. Supervisors intervene only when the system cannot resolve." },
  ];
  const phases = [
    { label: "WM NOW", horizon: "0–6 months", color: SAND, items: ["PP-WM integration", "Inbound accuracy workflows", "Outbound despatch intelligence"] },
    { label: "AI LAYER", horizon: "3–9 months", color: SAGE, items: ["Voice-RF on factory floor", "Agentic production monitoring", "AI-driven task re-prioritisation"] },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "calc(100% - 44px)", padding: "40px 68px" }}>
      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`, marginBottom: 8 }}>
        <Badge label="WHAT GOOD LOOKS LIKE" color={SAGE} />
      </div>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 34, fontWeight: 400, color: TEXT, margin: "0 0 20px", opacity: active ? 1 : 0, transition: `opacity 0.65s ${ease} 0.1s` }}>
        Same WM. <em style={{ color: SAGE }}>Different results.</em>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: `${item.color}12`, border: `1px solid ${item.color}35`, borderRadius: 8, padding: "9px 11px", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(10px)", transition: `opacity 0.52s ${ease} ${0.18 + i * 0.1}s, transform 0.52s ${ease} ${0.18 + i * 0.1}s` }}>
            <IconCircle color={item.color} size={30}><item.Icon /></IconCircle>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.45, margin: 0 }}>{item.text}</p>
          </div>
        ))}
      </div>
      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Timeline spine */}
        <div style={{ position: "absolute", top: 7, left: "14%", right: "14%", height: 1, background: BORDER }} />
        <div style={{ display: "flex", gap: 0 }}>
          {phases.map((p, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(10px)", transition: `opacity 0.55s ${ease} ${0.52 + i * 0.14}s, transform 0.55s ${ease} ${0.52 + i * 0.14}s` }}>
              {/* Node on timeline */}
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: p.color, marginBottom: 10, zIndex: 1, boxShadow: `0 0 0 4px ${p.color}22, 0 0 0 1px ${p.color}55` }} />
              <Badge label={p.label} color={p.color} small />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, color: MUTED, marginTop: 5, marginBottom: 8, letterSpacing: 1 }}>{p.horizon}</div>
              <div style={{ width: "90%", background: `${p.color}0A`, border: `1px solid ${p.color}18`, borderRadius: 7, padding: "9px 12px" }}>
                {p.items.map((it, j) => (
                  <div key={j} style={{ display: "flex", gap: 6, marginBottom: j < p.items.length - 1 ? 5 : 0 }}>
                    <div style={{ width: 3, height: 3, borderRadius: "50%", background: p.color, marginTop: 4, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.35 }}>{it}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCENE 10: Blixt Ask — two-column layout (reference: Blixt session screenshot)
// ─────────────────────────────────────────────
function AskScene({ active }) {
  return (
    <div style={{ display: "flex", height: "calc(100% - 44px)", position: "relative", overflow: "hidden" }}>
      {/* Left column — dark warm panel */}
      <div style={{ flex: "0 0 55%", background: BG, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 56px", position: "relative", overflow: "hidden", borderRight: `1px solid ${BORDER}` }}>
        {/* subtle warehouse bg */}
        <div style={{ position: "absolute", bottom: 20, right: 20, opacity: active ? 0.06 : 0, transition: `opacity 1.4s ${ease} 0.8s` }}>
          <WarehouseIcon size={180} opacity={1} />
        </div>

        <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`, marginBottom: 18 }}>
          <Badge label="WHERE WE START" color={SAGE} />
        </div>

        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 44, fontWeight: 400, color: TEXT, lineHeight: 1.15, margin: "0 0 20px", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.75s ${ease} 0.12s, transform 0.75s ${ease} 0.12s` }}>
          {"Let's run a "}
          <em style={{ color: `${SAGE}`, fontStyle: "italic" }}>BLIXT</em>
          {" session"}
        </h2>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: MUTED, margin: "0 0 28px", lineHeight: 1.6, maxWidth: 400, opacity: active ? 1 : 0, transition: `opacity 0.65s ${ease} 0.25s` }}>
          A focused 2-hour working session. We come in, we listen, and we leave with a shared picture of where to start.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { num: "01", text: "Understand Flora\'s current WM setup and where it sits on the maturity curve" },
            { num: "02", text: "Map priorities to the use cases and patterns we have walked through today" },
            { num: "03", text: "Identify the one point where improvement has the highest impact for Flora specifically" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-12px)", transition: `opacity 0.52s ${ease} ${0.35 + i * 0.12}s, transform 0.52s ${ease} ${0.35 + i * 0.12}s` }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", border: `1px solid ${SAGE}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: SAGE }}>{item.num}</span>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.55, marginTop: 4 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right column — linen panel */}
      <div style={{ flex: 1, background: `${BG}`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "60px 40px", borderLeft: `1px solid ${BORDER}` }}>
        <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.7s ${ease} 0.4s, transform 0.7s ${ease} 0.4s`, textAlign: "center", width: "100%" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: DIMMED, marginBottom: 16 }}>THE SESSION</div>
          <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 72, color: SAND, lineHeight: 1, marginBottom: 8 }}>2 hrs</div>
          <div style={{ width: 40, height: 1, background: SAND, opacity: 0.4, margin: "16px auto" }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.6, margin: "0 0 32px", maxWidth: 260, marginLeft: "auto", marginRight: "auto" }}>
            Your setup. Your priorities. Your highest-impact WM improvement opportunity.
          </p>

          <div style={{ background: `${SAND}0C`, border: `1px solid ${SAND}22`, borderRadius: 10, padding: "14px 18px", opacity: active ? 1 : 0, transition: `opacity 0.7s ${ease} 0.7s` }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: MUTED, margin: 0, lineHeight: 1.55, fontStyle: "italic" }}>
              Not a scoping exercise but a working session that ends with something actionable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// APPENDIX SCENES
// ─────────────────────────────────────────────
function AppendixWrapper({ active, badge, heading, accentColor, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "calc(100% - 44px)", padding: "40px 64px" }}>
      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(10px)", transition: `opacity 0.55s ${ease}, transform 0.55s ${ease}`, marginBottom: 8 }}>
        <Badge label={badge} color={accentColor} small />
      </div>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 30, fontWeight: 400, color: TEXT, margin: "0 0 22px", lineHeight: 1.25, opacity: active ? 1 : 0, transition: `opacity 0.6s ${ease} 0.1s` }}>
        {heading}
      </h2>
      {children}
    </div>
  );
}

function AppendixOverview({ active }) {
  const items = [
    { color: SAND, label: "PP INTEGRATION", text: "Event-driven staging tasks on PP order release. Dynamic re-sequencing when production plans change mid-shift. Zero manual handoff." },
    { color: SAGE, label: "TASK MANAGEMENT", text: "Warehouse orders with activity interleaving and real-time re-prioritisation. Labour Management attributing costs to production order cost centres." },
    { color: MOSS, label: "VOICE AND RF", text: "Structured dialogue model designed within EWM's warehouse task architecture. Cleaner BTP integration, lower long-term maintenance overhead." },
    { color: TERRA, label: "AI READINESS", text: "SAP Joule integration, agentic exception management, AI-native capabilities in S/4HANA 2025+. WM receives none of these." },
  ];
  return (
    <AppendixWrapper active={active} badge="WHEN THE TIME IS RIGHT" accentColor={SAND} heading={<>EWM as the <em style={{ color: SAND }}>natural next step.</em></>}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: `${item.color}12`, border: `1px solid ${item.color}35`, borderRadius: 9, padding: "13px 15px", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(11px)", transition: `opacity 0.52s ${ease} ${0.18 + i * 0.11}s, transform 0.52s ${ease} ${0.18 + i * 0.11}s` }}>
            <Badge label={item.label} color={item.color} small />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: MUTED, lineHeight: 1.55, margin: "8px 0 0" }}>{item.text}</p>
          </div>
        ))}
      </div>
    </AppendixWrapper>
  );
}

function AppendixPP({ active }) {
  return (
    <AppendixWrapper active={active} badge="PP INTEGRATION" accentColor={SAND} heading={<>Production and warehouse <em style={{ color: SAND }}>on the same clock.</em></>}>
      <div style={{ display: "flex", gap: 12 }}>
        {[
          { label: "WM TODAY", color: TERRA, items: ["Transfer orders created manually after production release", "Coordination via phone and supervisor escalation", "No event-driven trigger from PP order release", "When production plans change intra-day, WM cannot re-prioritise staging"] },
          { label: "EWM DELIVERS", color: SAGE, items: ["Warehouse orders triggered automatically on PP order events", "Dynamic re-sequencing when production plans change mid-shift", "Zero manual handoff, real-time staging visibility", "Labour Management links warehouse activity to production cost centres"] },
        ].map((col, i) => (
          <div key={i} style={{ flex: 1, background: `${col.color}07`, border: `1px solid ${col.color}18`, borderRadius: 9, padding: "14px 16px", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.6s ${ease} ${0.18 + i * 0.14}s, transform 0.6s ${ease} ${0.18 + i * 0.14}s` }}>
            <Badge label={col.label} color={col.color} small />
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 7 }}>
              {col.items.map((it, j) => (
                <div key={j} style={{ display: "flex", gap: 7 }}>
                  <div style={{ width: 3, height: 3, borderRadius: "50%", background: col.color, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: MUTED, lineHeight: 1.5 }}>{it}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppendixWrapper>
  );
}

function AppendixTask({ active }) {
  return (
    <AppendixWrapper active={active} badge="TASK MANAGEMENT" accentColor={SAGE} heading={<>From sequential tasks to <em style={{ color: SAGE }}>intelligent orchestration.</em></>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {[
          { color: TERRA, label: "WM TODAY", text: "Transfer orders are executed in a fixed sequence. Supervisors re-prioritise manually when priorities change. No native Labour Management — factory cost attribution requires custom development and workarounds." },
          { color: SAGE, label: "EWM DELIVERS", text: "Warehouse orders with activity interleaving and dynamic re-sequencing based on real-time operational signals. Labour Management attributes warehouse activity by task, operator, and zone directly to production order cost centres." },
          { color: SAND, label: "WHAT THIS UNLOCKS FOR FLORA", text: "Supervisors stop firefighting exceptions. Operatives consistently work the highest-priority task. Labour costs become traceable and reportable across all factory sites." },
        ].map((item, i) => (
          <div key={i} style={{ background: `${item.color}07`, border: `1px solid ${item.color}16`, borderRadius: 9, padding: "12px 16px", opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-12px)", transition: `opacity 0.55s ${ease} ${0.18 + i * 0.13}s, transform 0.55s ${ease} ${0.18 + i * 0.13}s` }}>
            <Badge label={item.label} color={item.color} small />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.6, margin: "8px 0 0" }}>{item.text}</p>
          </div>
        ))}
      </div>
    </AppendixWrapper>
  );
}

function AppendixVoice({ active }) {
  return (
    <AppendixWrapper active={active} badge="VOICE AND RF" accentColor={MOSS} heading={<>Voice-RF on WM works. <em style={{ color: MOSS }}>On EWM, it is native.</em></>}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 11 }}>
        {[
          { color: TERRA, label: "WM TODAY", text: "Voice layer built via BTP integration. Works well in F&B factory conditions. 3 to 4 months to deploy. Requires custom middleware that runs alongside WM." },
          { color: SAGE, label: "EWM DELIVERS", text: "Warehouse task model maps naturally to a structured voice dialogue: start task, prompt, confirmation. Cleaner BTP integration path. Lower long-term maintenance." },
          { color: SAND, label: "THE INVESTMENT LOGIC", text: "The voice-RF work done in Phase 2 validates the use case and builds operator adoption. It is not wasted when EWM arrives — it accelerates the migration." },
        ].map((item, i) => (
          <div key={i} style={{ background: `${item.color}07`, border: `1px solid ${item.color}16`, borderRadius: 9, padding: "13px 14px", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(11px)", transition: `opacity 0.55s ${ease} ${0.18 + i * 0.13}s, transform 0.55s ${ease} ${0.18 + i * 0.13}s` }}>
            <Badge label={item.label} color={item.color} small />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: MUTED, lineHeight: 1.6, margin: "8px 0 0" }}>{item.text}</p>
          </div>
        ))}
      </div>
    </AppendixWrapper>
  );
}

function AppendixAI({ active }) {
  return (
    <AppendixWrapper active={active} badge="AI READINESS" accentColor={TERRA} heading={<>EWM is where <em style={{ color: TERRA }}>SAP's AI investment is going.</em></>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {[
          { color: SAND, label: "SAP JOULE", text: "Natural language warehouse operations. Exception handling via conversational AI. Operative asks a question; the system responds with actionable guidance within the context of a live warehouse order." },
          { color: SAGE, label: "AGENTIC EXCEPTION MANAGEMENT", text: "System resolves common warehouse exceptions without human intervention: short picks, damaged HUs, split pallets. Supervisors receive exception notifications, not decision requests." },
          { color: TERRA, label: "THE GAP THAT WIDENS EVERY RELEASE", text: "WM will not receive these capabilities. SAP's new warehouse management AI features are EWM-only. The longer migration is deferred, the wider the operational capability gap becomes." },
        ].map((item, i) => (
          <div key={i} style={{ background: `${item.color}07`, border: `1px solid ${item.color}16`, borderRadius: 9, padding: "12px 16px", opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-12px)", transition: `opacity 0.55s ${ease} ${0.18 + i * 0.13}s, transform 0.55s ${ease} ${0.18 + i * 0.13}s` }}>
            <Badge label={item.label} color={item.color} small />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.6, margin: "8px 0 0" }}>{item.text}</p>
          </div>
        ))}
      </div>
    </AppendixWrapper>
  );
}

function AppendixRoadmap({ active }) {
  const phases = [
    { label: "WM NOW", horizon: "0–6 months", color: SAND, items: ["PP-WM integration", "Mobile GR workflows", "Outbound despatch dashboard"] },
    { label: "AI LAYER", horizon: "3–9 months", color: SAGE, items: ["Voice-RF on factory floor", "Agentic staging alerts", "AI-driven outbound re-prioritisation"] },
    { label: "EWM DESTINATION", horizon: "Future State", color: MOSS, items: ["PSA-based PP integration", "Dynamic putaway, wave management", "SAP Joule and agentic exception handling"] },
  ];
  return (
    <AppendixWrapper active={active} badge="THREE-LAYER ROADMAP" accentColor={MOSS} heading={<>A path Flora <em style={{ color: MOSS }}>controls.</em></>}>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        {phases.map((p, i) => (
          <div key={i} style={{ flex: 1, background: `${p.color}0C`, border: `1px solid ${p.color}20`, borderRadius: 9, padding: "13px 14px", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.55s ${ease} ${0.18 + i * 0.14}s, transform 0.55s ${ease} ${0.18 + i * 0.14}s` }}>
            <Badge label={p.label} color={p.color} small />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: MUTED, marginTop: 5, marginBottom: 9 }}>{p.horizon}</div>
            {p.items.map((it, j) => (
              <div key={j} style={{ display: "flex", gap: 6, marginBottom: 5 }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: p.color, marginTop: 5, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: MUTED, lineHeight: 1.4 }}>{it}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background: `${TERRA}08`, border: `1px solid ${TERRA}20`, borderRadius: 9, padding: "11px 15px", opacity: active ? 1 : 0, transition: `opacity 0.65s ${ease} 0.65s` }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: MUTED, margin: 0, lineHeight: 1.55 }}>
          <span style={{ color: TERRA, fontWeight: 500 }}>SAP EoL note:</span> Mainstream WM maintenance ends 2027. Plan deliberately rather than be forced into it reactively.
        </p>
      </div>
    </AppendixWrapper>
  );
}

// ─────────────────────────────────────────────
// THANK YOU SCENE
// ─────────────────────────────────────────────
function ThankYouScene({ active }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100% - 44px)", position: "relative", overflow: "hidden" }}>
      {/* Main content centered */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "60px 80px", textAlign: "center" }}>
        {/* Subtle warehouse icon trio */}
        <div style={{ position: "absolute", left: 60, bottom: 80, opacity: active ? 1 : 0, transition: `opacity 1.4s ${ease} 0.9s` }}>
          <ForkliftIcon size={80} opacity={0.045} />
        </div>
        <div style={{ position: "absolute", right: 60, top: 80, opacity: active ? 1 : 0, transition: `opacity 1.4s ${ease} 1s` }}>
          <WarehouseIcon size={100} opacity={0.04} />
        </div>

        <div style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.7s ${ease}, transform 0.7s ${ease}`, marginBottom: 20 }}>
          <Badge label="TARENTO × FLORA" color={SAND} />
        </div>

        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 64, fontWeight: 400, color: TEXT, lineHeight: 1.1, margin: "0 0 20px", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.85s ${ease} 0.12s, transform 0.85s ${ease} 0.12s` }}>
          Thank you,<br /><em style={{ color: SAND }}>Flora.</em>
        </h1>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: MUTED, lineHeight: 1.6, maxWidth: 460, margin: "0 0 36px", opacity: active ? 1 : 0, transition: `opacity 0.7s ${ease} 0.3s` }}>
          We look forward to understanding your factory floor reality better and building something that genuinely works for your teams.
        </p>

        <div style={{ display: "flex", gap: 10, opacity: active ? 1 : 0, transition: `opacity 0.7s ${ease} 0.48s` }}>
          {["15 FACTORIES", "WM TODAY", "AI LAYER NEXT", "EWM WHEN READY"].map((t, i) => (
            <div key={i} style={{ background: `${SAND}0C`, border: `1px solid ${SAND}20`, borderRadius: 6, padding: "8px 22px", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3, color: MUTED, whiteSpace: "nowrap" }}>{t}</div>
          ))}
        </div>

        {/* Appendix nudge */}
        <div style={{ marginTop: 28, opacity: active ? 1 : 0, transition: `opacity 0.7s ${ease} 0.7s` }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3, color: DIMMED, textTransform: "uppercase" }}>Additional detail on EWM roadmap and capabilities available in the appendix</span>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────
// SCENE REGISTRY
// ─────────────────────────────────────────────
const MAIN_COUNT = 11;
const sceneList = [
  { id: 0, render: (a) => <TitleScene active={a} />, label: "Title" },
  { id: 1, render: (a) => <MirrorScene active={a} />, label: "We Heard You" },
  { id: 2, render: (a) => <RealityScene active={a} />, label: "Factory Floor" },
  ...proofScenes.map((ps, i) => ({ id: 3 + i, render: (a) => <ProofScene active={a} scene={ps} />, label: ps.label })),
  { id: 7, render: (a) => <ApproachScene active={a} />, label: "Approach" },
  { id: 8, render: (a) => <GoodLooksScene active={a} />, label: "What Good Looks Like" },
  { id: 9, render: (a) => <AskScene active={a} />, label: "Blixt" },
  { id: 10, render: (a) => <ThankYouScene active={a} />, label: "Thank You" },
  // Appendix
  { id: 11, render: (a) => <AppendixOverview active={a} />, label: "App: Overview", appendix: true },
  { id: 12, render: (a) => <AppendixPP active={a} />, label: "App: PP", appendix: true },
  { id: 13, render: (a) => <AppendixTask active={a} />, label: "App: Task", appendix: true },
  { id: 14, render: (a) => <AppendixVoice active={a} />, label: "App: Voice", appendix: true },
  { id: 15, render: (a) => <AppendixAI active={a} />, label: "App: AI", appendix: true },
  { id: 16, render: (a) => <AppendixRoadmap active={a} />, label: "App: Roadmap", appendix: true },
];
const total = sceneList.length;

// ─────────────────────────────────────────────
// MAIN DECK
// ─────────────────────────────────────────────
export default function Deck() {
  const [current, setCurrent] = useState(0);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [scale, setScale] = useState(1);

  const DESIGN_W = 1920;
  const DESIGN_H = 1080;
  // All slide content was authored at 1440×810; this ratio upscales it to fill 1920×1080
  const CONTENT_SCALE = DESIGN_W / 1440; // 1.3333…

  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const isExport = params.has("export");
  const isDebug  = params.has("debug");

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s  = Math.min(vw / DESIGN_W, vh / DESIGN_H);
      setScale(s);
      setTx(Math.round((vw - DESIGN_W * s) / 2));
      setTy(Math.round((vh - DESIGN_H * s) / 2));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = document.createElement("link");
    el.rel = "stylesheet";
    el.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;700&display=swap";
    document.head.appendChild(el);
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setCurrent(c => Math.min(c + 1, total - 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") setCurrent(c => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const isAppendix = current >= MAIN_COUNT;

  return (
    // Viewport shell — fills browser window, no scroll
    <div style={{ position: "fixed", inset: 0, background: isExport ? BG : BG, overflow: "hidden" }}>

      {/* ── 1920×1080 poster canvas, centered & scaled to fit viewport ── */}
      <div
        id="posterCanvas"
        style={{
          position: "absolute",
          left: 0, top: 0,
          width: DESIGN_W,
          height: DESIGN_H,
          transformOrigin: "top left",
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          background: BG,
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
          outline: isDebug ? "2px solid rgba(255,60,60,0.9)" : "none",
        }}
      >
        {/* ── Inner content scaler: 1440×810 design space → 1920×1080 ── */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 1440, height: 810,
          transformOrigin: "top left",
          transform: `scale(${CONTENT_SCALE})`,
          overflow: "hidden",
        }}>
          <Grain />

          {/* Appendix label */}
          {isAppendix && (
            <div style={{ position: "absolute", top: 16, left: 64, zIndex: 10 }}>
              <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", color: DIMMED }}>APPENDIX</div>
            </div>
          )}

          {/* Slides */}
          {sceneList.map((s, i) => (
            <div key={`scene-${i}`} style={{ position: "absolute", inset: 0, opacity: current === i ? 1 : 0, pointerEvents: current === i ? "auto" : "none", transition: `opacity 0.5s ${ease}` }}>
              {s.render(current === i)}
            </div>
          ))}

          {/* Click zones */}
          <div onClick={() => setCurrent(c => Math.max(c - 1, 0))} style={{ position: "absolute", left: 0, top: 0, width: "12%", height: "100%", cursor: "w-resize", zIndex: 5 }} />
          <div onClick={() => setCurrent(c => Math.min(c + 1, total - 1))} style={{ position: "absolute", right: 0, top: 0, width: "12%", height: "100%", cursor: "e-resize", zIndex: 5 }} />

          {/* Nav strip */}
          {!isExport && (
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 44, background: BG, borderTop: `1px solid ${BORDER}`, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", left: 26, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: DIMMED }}>
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {sceneList.map((s, i) => (
                  <div key={i} onClick={() => setCurrent(i)} style={{ height: 3, width: current === i ? 26 : s.appendix ? 5 : 7, borderRadius: 3, background: current === i ? SAND : s.appendix ? `${SAND}35` : DIMMED, transition: `width 0.32s ${ease}, background 0.32s`, cursor: "pointer" }} />
                ))}
              </div>
            </div>
          )}

          {/* Top accent line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${SAND}50, ${SAGE}30, transparent)`, zIndex: 2 }} />
        </div>

        {/* Debug info overlay — only with ?debug=1 */}
        {isDebug && (
          <div style={{ position: "absolute", bottom: 8, right: 12, fontFamily: "monospace", fontSize: 11, color: "rgba(255,60,60,0.9)", zIndex: 100, pointerEvents: "none", lineHeight: 1.6 }}>
            canvas {DESIGN_W}×{DESIGN_H} · scale {scale.toFixed(3)} · tx {tx} ty {ty}
          </div>
        )}
      </div>
    </div>
  );
}
