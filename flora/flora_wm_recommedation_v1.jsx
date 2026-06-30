import { useState, useEffect, useCallback } from "react";
import { Clock, Factory, Warehouse, Network, MapPin, AlertTriangle, CheckCircle, Layers, Eye, Cpu, PackageOpen, Globe, Search, TrendingUp, ArrowRight, ExternalLink } from "lucide-react";

const P = {
  bg: "#E8DFD2",
  sand: "#8C5E28",
  sage: "#3A6855",
  terra: "#8A3218",
  moss: "#4A6C46",
  text: "#2A2018",
  muted: "rgba(42,32,24,0.5)",
  dimmed: "rgba(42,32,24,0.22)",
  border: "rgba(42,32,24,0.11)",
};

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

function useStagger(active, count, base = 0.08, step = 0.11) {
  return Array.from({ length: count }, (_, i) => ({
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.6s ${ease} ${base + i * step}s, transform 0.6s ${ease} ${base + i * step}s`,
  }));
}

const Tag = ({ children, color = P.sand }) => (
  <span style={{
    fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 5,
    fontWeight: 500, textTransform: "uppercase", color,
    background: `${color}12`, border: `1px solid ${color}35`,
    padding: "5px 14px", borderRadius: 20, display: "inline-block",
  }}>{children}</span>
);

const H = ({ children, size = 48, style = {} }) => (
  <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: size, lineHeight: 1.12, color: P.text, ...style }}>{children}</div>
);

const Em = ({ children, color = P.sand }) => (
  <em style={{ fontStyle: "italic", color }}>{children}</em>
);

const Body = ({ children, style = {} }) => (
  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.72, color: "#1A1008", fontWeight: 300, ...style }}>{children}</div>
);

const Label = ({ children, color = P.muted }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 5, fontWeight: 500, textTransform: "uppercase", color, marginBottom: 10 }}>{children}</div>
);

const Rule = ({ color = P.sand }) => (
  <div style={{ height: 1, background: color, opacity: 0.18, margin: "16px 0" }} />
);

const IC = ({ icon: Icon, color, size = 38 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: `${color}12`, border: `1px solid ${color}28`,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  }}>
    <Icon size={Math.round(size * 0.42)} color={color} strokeWidth={1.5} />
  </div>
);

const Pill = ({ children, color }) => (
  <span style={{
    fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3,
    fontWeight: 500, textTransform: "uppercase", color,
    background: `${color}11`, border: `1px solid ${color}30`,
    padding: "5px 12px", borderRadius: 20, display: "inline-block", whiteSpace: "nowrap",
  }}>{children}</span>
);

const Card = ({ children, color, bg, style = {} }) => (
  <div style={{
    background: bg || `${color}08`,
    borderRadius: 12, border: `1px solid ${P.border}`,
    borderTop: color ? `2px solid ${color}` : undefined,
    padding: "24px 26px",
    ...style,
  }}>{children}</div>
);

// Citation footnote component
const Cite = ({ children, url = "#" }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" style={{
    display: "flex", alignItems: "flex-start", gap: 6,
    marginTop: 8, padding: "6px 10px",
    background: "rgba(42,32,24,0.04)", borderRadius: 6,
    border: "1px solid rgba(42,32,24,0.09)",
    textDecoration: "none", cursor: "pointer",
    transition: "background 0.2s",
  }}
  onMouseEnter={e => e.currentTarget.style.background = "rgba(42,32,24,0.08)"}
  onMouseLeave={e => e.currentTarget.style.background = "rgba(42,32,24,0.04)"}
  >
    <ExternalLink size={10} color={P.sand} style={{ marginTop: 2, flexShrink: 0 }} />
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: P.sand, lineHeight: 1.5 }}>{children}</div>
  </a>
);

// ── Title ─────────────────────────────────────────────────────────────────────
function TitleScene({ active }) {
  const t = (d) => ({
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.8s ${ease} ${d}s, transform 0.8s ${ease} ${d}s`,
  });
  return (
    <div style={{ height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "64px 80px 120px", textAlign: "center", position: "relative" }}>
      <div style={t(0.05)}><Tag>Tarento × Flora</Tag></div>
      <H size={66} style={{ marginTop: 30, maxWidth: 880, ...t(0.16) }}>
        SAP Warehouse Migration<br /><Em>options &amp; recommendation</Em>
      </H>
      <div style={{ width: 48, height: 2, background: P.sand, opacity: active ? 0.45 : 0, transition: `opacity 0.7s ${ease} 0.45s`, margin: "30px 0" }} />
      <Body style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 620, color: P.muted, ...t(0.3) }}>
        A phased path to S/4HANA-native warehouse management<br />SRM, LGM, and EWM Embedded Basic evaluated against Flora's factory, DC, and 3PL estate.
      </Body>

      {/* Bottom logo bar */}
      <div style={{ position: "absolute", bottom: 56, left: 80, right: 80, height: 48, borderTop: `1px solid ${P.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18, opacity: active ? 1 : 0, transition: `opacity 0.9s ${ease} 0.55s` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: P.dimmed }}>Prepared for</span>
          <img src={`${import.meta.env.BASE_URL}flora-logo.png`} alt="Flora Food Group" style={{ height: 28, objectFit: "contain", filter: "brightness(0) opacity(0.55)" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: P.dimmed }}>Presented by</span>
          <img src={`${import.meta.env.BASE_URL}tarento-logo.svg`} alt="Tarento" style={{ height: 34, objectFit: "contain", mixBlendMode: "multiply" }} />
        </div>
      </div>
    </div>
  );
}

// ── Scene 1 ──────────────────────────────────────────────────────────────────
function Scene1({ active }) {
  const s = useStagger(active, 3);
  const pairs = [
    [Clock,       "SAP WM end-of-support is a known pressure point by 2030",                           CheckCircle,  "A phased migration path that meets the 2030 deadline without over-engineering"],
    [Search,      "Evaluate the potential of Stock Room Management (SRM) within S/4HANA",              AlertTriangle,"An honest SRM evaluation — what it gives within S/4HANA and where it stops"],
    [Layers,      "Interest in options beyond WM for the wider estate",                                Globe,        "LGM and EWM Embedded Basic mapped to Flora's actual estate"],
    [Eye,         "Request to see Tarento delivery in warehouse, supply chain, and inventory contexts", PackageOpen,  "The Pandora IIS story and its relevance to Flora's 3PL visibility gap"],
  ];
  return (
    <div style={{ padding: "52px 68px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={s[0]}><Tag>Where We Left Off</Tag></div>
      <div style={{ ...s[1], marginTop: 48 }}>
        <H size={46}>What you said. <Em>What we heard.</Em></H>
      </div>
      <div style={{ ...s[2], marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card color={P.sand}>
          <Label color={P.sand}>What Flora shared</Label>
          {pairs.map(([Icon, text], i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: i > 0 ? 18 : 0 }}>
              <IC icon={Icon} color={P.sand} size={34} />
              <Body style={{ paddingTop: 5 }}>{text}</Body>
            </div>
          ))}
        </Card>
        <Card color={P.sage}>
          <Label color={P.sage}>What we are bringing back</Label>
          {pairs.map(([, , Icon, text], i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: i > 0 ? 18 : 0 }}>
              <IC icon={Icon} color={P.sage} size={34} />
              <Body style={{ paddingTop: 5 }}>{text}</Body>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ── Scene 2 — Pandora ────────────────────────────────────────────────────────
function Scene2({ active }) {
  const s = useStagger(active, 3);
  const stats = [["20M","records / cycle"],["2 hr","regional SLA"],["7","DCs linked"],["41","markets"]];
  return (
    <div style={{ padding: "52px 68px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={{ ...s[0], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Tag color={P.moss}>Tarento in Action</Tag>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={`${import.meta.env.BASE_URL}pandora.png`} alt="Pandora" style={{ height: 28, objectFit: "contain", mixBlendMode: "multiply" }} />
          <Pill color={P.moss}>Jewellery Retail</Pill>
          <Pill color={P.moss}>Denmark / Global</Pill>
        </div>
      </div>
      <div style={{ ...s[1], marginTop: 48 }}>
        <H size={42}>Inventory visibility across a <Em color={P.moss}>fragmented global operation</Em></H>
      </div>
      <div style={{ ...s[2], marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <Card color={P.sand}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
            <IC icon={AlertTriangle} color={P.sand} />
            <Label color={P.sand} style={{ marginBottom: 0 }}>The problem</Label>
          </div>
          <Body>2,900+ stores, 7 DCs, and 3 third-party providers across 41 markets — each managing inventory independently with local processes.</Body>
          <Rule color={P.sand} />
          <Body>No single view of what was available, where, and in what state. Reconciliation was manual and unable to support omni-channel fulfillment.</Body>
        </Card>
        <Card color={P.sage}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
            <IC icon={Cpu} color={P.sage} />
            <Label color={P.sage} style={{ marginBottom: 0 }}>What Tarento built</Label>
          </div>
          <Body style={{ marginBottom: 16 }}>A global Inventory Information Services platform — single source of truth ingesting data from multiple ERPs, WMS, POS, and TMS systems in near real-time.</Body>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {stats.map(([n, l]) => (
              <div key={n} style={{ textAlign: "center", padding: "10px 8px", background: "rgba(58,104,85,0.1)", borderRadius: 8 }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: P.sage, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: P.muted, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card color={P.moss}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
            <IC icon={TrendingUp} color={P.moss} />
            <Label color={P.moss} style={{ marginBottom: 0 }}>Why it matters for Flora</Label>
          </div>
          <Body style={{ marginBottom: 14 }}>Flora has 46 physical DCs managed by third-party providers with no single visibility layer. The IIS problem at Pandora and Flora's 3PL gap are structurally the same problem.</Body>
          <div style={{ padding: "12px 14px", background: "rgba(74,108,70,0.1)", borderRadius: 8, border: "1px solid rgba(74,108,70,0.18)" }}>
            <Body style={{ fontSize: 12, fontStyle: "italic", color: P.moss, lineHeight: 1.6 }}>At Flora it sits inside an SAP landscape, opening up additional native options alongside a custom approach.</Body>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Scene 3 — SRM ────────────────────────────────────────────────────────────
function Scene3({ active }) {
  const s = useStagger(active, 4);
  const pros = [
    "Core inbound, outbound, and stock management capability within S/4HANA in a Fiori interface",
    "Included in existing S/4HANA license — no additional cost",
    "Addresses the 2030 compliance deadline on paper",
  ];
  const cons = [
    "SAP has officially stated no further enhancements will be made to SRM — the roadmap ends here",
    "Cannot carry PP-WM integration that Flora's 18 factory floors depend on",
    "Adopting SRM within S/4HANA now creates a second migration in 5 to 7 years",
  ];
  return (
    <div style={{ padding: "52px 68px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={s[0]}><Tag color={P.terra}>Option Evaluated</Tag></div>
      <div style={{ ...s[1], marginTop: 48 }}>
        <H size={44}>Stock Room Management — <Em color={P.terra}>a stopgap, not a solution</Em></H>
      </div>
      <div style={{ ...s[2], marginTop: 38, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card color={P.moss}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
            <IC icon={CheckCircle} color={P.moss} />
            <Label color={P.moss} style={{ marginBottom: 0 }}>What SRM offers within S/4HANA</Label>
          </div>
          {pros.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: i > 0 ? 16 : 0 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: P.moss, flexShrink: 0, marginTop: 7 }} />
              <Body>{t}</Body>
            </div>
          ))}
        </Card>
        <Card color={P.terra}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
            <IC icon={AlertTriangle} color={P.terra} />
            <Label color={P.terra} style={{ marginBottom: 0 }}>Where it falls short for Flora</Label>
          </div>
          {cons.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: i > 0 ? 16 : 0 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: P.terra, flexShrink: 0, marginTop: 7 }} />
              <Body>{t}</Body>
            </div>
          ))}
          <Cite url="https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/sap-srm-on-premise-transition-context-timelines-successors-and-what-to-do/ba-p/14348507">SAP SRM On-Premise Transition — Context, timelines, successors, and what to do. SAP confirms no further enhancements to SRM. SAP Community, 2024.</Cite>
        </Card>
      </div>
      <div style={{ ...s[3], marginTop: 14 }}>
        <div style={{ background: `${P.terra}08`, borderRadius: 10, border: `1px solid ${P.terra}22`, padding: "13px 20px", display: "flex", alignItems: "center", gap: 16 }}>
          <IC icon={AlertTriangle} color={P.terra} size={32} />
          <Body style={{ fontSize: 13 }}><strong style={{ color: P.terra, fontWeight: 500 }}>Verdict:</strong> A valid capability within S/4HANA for the simplest sites. Not the right path for 18 factories with production dependencies.</Body>
        </div>
      </div>
    </div>
  );
}

// ── Scene 4 — LGM ────────────────────────────────────────────────────────────
function Scene4({ active }) {
  const s = useStagger(active, 3);
  const fits = [
    [MapPin,    "11 virtual / satellite DCs",   "Low complexity, no production integration dependency."],
    [Globe,     "46 physical 3PL DCs",          "LGM's Business Network creates visibility without replacing the 3PL."],
    [Warehouse, "4 WM-managed DCs",             "Credible future path once PP integration lands — expected Q4 2026."],
  ];
  return (
    <div style={{ padding: "52px 68px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={s[0]}><Tag color={P.sage}>Option Evaluated</Tag></div>
      <div style={{ ...s[1], marginTop: 48 }}>
        <H size={44}>SAP LGM — <Em color={P.sage}>promising, but not yet ready</Em></H>
      </div>
      <div style={{ ...s[2], marginTop: 38, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Label color={P.sage}>Where LGM fits in Flora's landscape</Label>
          {fits.map(([Icon, label, body]) => (
            <Card key={label} color={P.sage} style={{ padding: "16px 20px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                <IC icon={Icon} color={P.sage} size={32} />
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: P.sage }}>{label}</div>
              </div>
              <Body style={{ fontSize: 13 }}>{body}</Body>
            </Card>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Label color={P.terra}>Where LGM does not fit today</Label>
          <Card color={P.terra}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
              <IC icon={Factory} color={P.terra} />
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: P.terra }}>18 WM-managed factories</div>
            </div>
            <Body>LGM currently has no PP-WM integration. Production staging, factory-floor execution, and goods movements tied to production orders all depend on that connection. This is a disqualifying gap for factory contexts right now.</Body>
            <Rule color={P.terra} />
            <div style={{ padding: "10px 14px", background: "rgba(138,50,24,0.06)", borderRadius: 8, border: "1px solid rgba(138,50,24,0.15)", marginBottom: 8 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 4, color: P.terra, textTransform: "uppercase", marginBottom: 4 }}>Maturity note</div>
              <Body style={{ fontSize: 12 }}>LGM became generally available in February 2026. It is new to the market with limited production-scale implementations to date.</Body>
            </div>
            <Cite url="https://pages.community.sap.com/topics/logistics-management">SAP Logistics Management (LGM) — General Availability February 2026. PP integration roadmap item targeting Q4 2026. SAP Community, 2026.</Cite>
          </Card>
        </div>
      </div>
      <div style={{ ...s[2], marginTop: 14 }}>
        <div style={{ background: "rgba(58,104,85,0.07)", borderRadius: 10, border: `1px solid rgba(58,104,85,0.22)`, padding: "13px 22px", display: "flex", alignItems: "center", gap: 16 }}>
          <IC icon={AlertTriangle} color={P.sage} size={32} />
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 4, color: P.sage, textTransform: "uppercase", marginBottom: 4 }}>Open prerequisite</div>
            <Body style={{ fontSize: 13 }}>LGM requires S/4HANA Cloud Private Edition 2022 minimum plus SAP BTP. Flora's current version needs confirmation before LGM can be validated for any site.</Body>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Scene 5 — EWM ────────────────────────────────────────────────────────────
function Scene5({ active }) {
  const s = useStagger(active, 3);
  const bullets = [
    "Full PP-WM integration — non-negotiable for factory contexts",
    "Inbound, outbound, and stock management well beyond current WM",
    "Task management, RF execution, and exception handling built in",
    "No re-migration risk in the next decade",
  ];
  const metrics = [
    [Clock,   "2030", "Deadline met",          "SAP WM end-of-support resolved without over-engineering"],
    [Factory, "PP",   "Integration preserved", "Factory-floor execution and production staging unchanged"],
    [Layers,  "18×",  "Standardized",          "One architecture across the entire factory estate"],
  ];
  return (
    <div style={{ padding: "52px 68px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={s[0]}><Tag color={P.sand}>Option Evaluated</Tag></div>
      <div style={{ ...s[1], marginTop: 48 }}>
        <H size={44}>EWM Embedded Basic — <Em>the best pick right now</Em></H>
      </div>
      <div style={{ ...s[2], marginTop: 38, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card color={P.sand}>
          <Label color={P.sand}>What it carries that matters here</Label>
          <Body style={{ marginBottom: 14 }}>Built directly into S/4HANA. Included in the license Flora already holds. No separate deployment required.</Body>
          <Cite url="https://community.sap.com/t5/supply-chain-management-blog-posts-by-sap/sap-s-4hana-warehousing-options/ba-p/13524414">SAP S/4HANA warehousing options — EWM Embedded Basic included in S/4HANA license at no additional cost. SAP Community, 2023.</Cite>
          <Rule color={P.sand} />
          {bullets.map((t, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: 8 }} />}
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: P.sand, flexShrink: 0, marginTop: 7 }} />
                <Body>{t}</Body>
              </div>
            </div>
          ))}
        </Card>
        <Card style={{ background: `${P.sand}05`, border: `1px solid ${P.border}`, borderTop: `2px solid ${P.sand}` }}>
          <Label color={P.sand}>Why it fits Flora's 18 factories</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {metrics.map(([Icon, n, label, body]) => (
              <div key={n} style={{ display: "flex", gap: 18, alignItems: "center", padding: "14px 16px", background: `${P.sand}08`, borderRadius: 10, border: `1px solid ${P.border}` }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34, color: P.sand, minWidth: 54, lineHeight: 1 }}>{n}</div>
                <div style={{ borderLeft: `1px solid ${P.border}`, paddingLeft: 16 }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: P.sand, marginBottom: 4 }}>{label}</div>
                  <Body style={{ fontSize: 13 }}>{body}</Body>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Scene 6 — Landscape + what fits ──────────────────────────────────────────
function Scene6({ active }) {
  const s = useStagger(active, 3);
  const blocks = [
    { n: "18", label: "Factories on WM",      icon: Factory,   color: P.sand,
      body: "19 active factories total. 18 on SAP WM. 1 (Pratau, Germany) already on EWM Advanced.",
      tag: "EWM Embedded Basic", fit: "PP integration preserved. 2030 deadline met. Pratau stays as-is." },
    { n: "4",  label: "WM-Managed DCs",        icon: Warehouse, color: P.sage,
      body: "Turkey, Kenya, Sri Lanka, US. Distribution contexts, not factory floor.",
      tag: "EWM Basic / LGM",    fit: "LGM pending Q4 PP roadmap. EWM Basic as fallback." },
    { n: "11", label: "Satellite DCs",          icon: MapPin,    color: P.moss,
      body: "Virtual and satellite sites. No production integration dependency.",
      tag: "LGM",                fit: "Cloud-native fit. Low complexity." },
    { n: "46", label: "Physical IM / 3PL DCs", icon: Network,   color: P.terra,
      body: "3PL-managed. No WM layer to replace by 2030.",
      tag: "LGM Visibility",     fit: "Not a migration. Network visibility as a growth conversation." },
  ];
  return (
    <div style={{ padding: "52px 68px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={s[0]}><Tag color={P.muted}>Flora's Estate</Tag></div>
      <div style={{ ...s[1], marginTop: 48 }}>
        <H size={44}>What Flora has — <Em color={P.sage}>and what fits</Em></H>
      </div>
      <div style={{ ...s[2], marginTop: 48, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {blocks.map(({ n, label, icon, color, body, tag, fit }) => (
          <div key={n} style={{
            background: `${color}08`, borderRadius: 12,
            border: `1px solid ${P.border}`, borderTop: `2px solid ${color}`,
            padding: "20px 20px 24px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, color, lineHeight: 1 }}>{n}</div>
              <IC icon={icon} color={color} size={36} />
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 4, color, textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
            <Body style={{ fontSize: 13 }}>{body}</Body>
            <div style={{ height: 1, background: color, opacity: 0.18, margin: "16px 0" }} />
            <Pill color={color}>{tag}</Pill>
            <Body style={{ fontSize: 12, marginTop: 9 }}>{fit}</Body>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Scene 7 — Recommendation ─────────────────────────────────────────────────
function Scene7({ active }) {
  const s = useStagger(active, 3);
  const rows = [
    { phase: "Start here",    sub: "2–3 factories",  color: P.sand, icon: Factory,
      title: "Pilot EWM Embedded Basic on 2 to 3 factories first",
      body:  "Do not migrate all 18 at once. Start with a manageable cohort, validate the approach, and build internal confidence before rolling out across the estate." },
    { phase: "On migrated sites", sub: "AI layer",   color: P.sage, icon: Cpu,
      title: "Bring AI in on the migrated EWM setup, not on current WM",
      body:  "Once the first factories are on EWM Basic, explore AI capabilities on that foundation. Voice-RF, agentic monitoring — built on a stable base Flora can reuse." },
    { phase: "Next horizon",  sub: "DC strategy",    color: P.moss, icon: Globe,
      title: "EWM Basic for the 4 WM DCs. LGM for satellites and 3PL visibility.",
      body:  "Distribution centers don't need factory-level depth. EWM Basic covers the WM DCs cleanly. The 11 satellite sites and 46 3PL DCs are LGM's natural fit — as a network layer, not a migration." },
  ];
  return (
    <div style={{ padding: "52px 68px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={s[0]}><Tag color={P.sand}>Our Recommendation</Tag></div>
      <div style={{ ...s[1], marginTop: 48 }}>
        <H size={44}>A <Em>phased approach</Em> for Flora's warehouse estate</H>
      </div>
      <div style={{ ...s[2], marginTop: 38, display: "flex", flexDirection: "column", gap: 14 }}>
        {rows.map(({ phase, sub, color, icon, title, body }) => (
          <div key={phase} style={{
            display: "grid", gridTemplateColumns: "160px 1fr",
            borderRadius: 12, overflow: "hidden", border: `1px solid ${P.border}`,
          }}>
            <div style={{
              background: `${color}10`, padding: "0 16px",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", textAlign: "center", gap: 8,
              borderRight: `1px solid ${P.border}`,
            }}>
              <IC icon={icon} color={color} size={38} />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3, color, textTransform: "uppercase" }}>{phase}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color, opacity: 0.65, marginTop: 2 }}>{sub}</div>
              </div>
            </div>
            <div style={{ background: `${color}06`, padding: "18px 24px" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: P.text, marginBottom: 6 }}>{title}</div>
              <Body style={{ fontSize: 13 }}>{body}</Body>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Scene 8 — Blixt ──────────────────────────────────────────────────────────
function Scene8({ active }) {
  const s = useStagger(active, 4, 0.1, 0.14);
  const agenda = [
    [Factory,   "Factory floor",       "How WM runs today across 18 sites — transactions, integrations, friction points"],
    [Warehouse, "DC process profiles", "Enough depth on the 4 WM DCs to finalize the LGM vs EWM Basic call"],
    [Search,    "Flora's pain points", "What the operations team would bring if this were their meeting to run"],
  ];
  return (
    <div style={{ padding: "52px 68px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={s[0]}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px 6px 8px", borderRadius: 30, background: "rgba(42,32,24,0.06)", border: "1px solid rgba(42,32,24,0.18)" }}>
              <IC icon={ArrowRight} color={P.text} size={28} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 4, fontWeight: 500, textTransform: "uppercase", color: P.text }}>What We Would Like to Do Next</div>
            </div>
          </div>
          <div style={{ ...s[1], marginTop: 24 }}>
            <H size={48}>Before we finalize — <Em>a working session</Em></H>
          </div>
          <div style={{ ...s[2], marginTop: 20 }}>
            <Body style={{ fontSize: 14, lineHeight: 1.8 }}>We want to ground the recommendation in how Flora's operations actually run today — not assumptions. The session is open-ended. Flora leads, we listen.</Body>
          </div>
        </div>
        <div style={s[3]}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px 6px 8px", borderRadius: 30, background: `${P.sand}10`, border: `1px solid ${P.sand}28`, marginBottom: 14 }}>
            <IC icon={Search} color={P.sand} size={28} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 4, fontWeight: 500, textTransform: "uppercase", color: P.sand }}>What we want to cover</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              [Factory,   "Current state walkthrough",  "Zone-by-zone walk through inbound, production staging, outbound, and RF tools as they run today. Flora leads."],
              [Warehouse, "WM feature footprint",       "Which WM capabilities are actively in use vs. dormant. This determines migration complexity across the 18 factories."],
              [Search,    "Flora's open pain points",   "What the operations team would bring if this were their meeting to run — unresolved friction, workarounds, priorities."],
              [Globe,     "S/4HANA version and estate", "Confirm the current S/4HANA version and integration landscape. Required before finalizing any architecture recommendation."],
            ].map(([Icon, title, body]) => (
              <div key={title} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "13px 16px", borderRadius: 10, background: `${P.sand}07`, border: `1px solid ${P.border}` }}>
                <IC icon={Icon} color={P.sand} size={32} />
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: P.text, marginBottom: 3 }}>{title}</div>
                  <Body style={{ fontSize: 12 }}>{body}</Body>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────
const scenes = [TitleScene, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8];
const TOTAL = scenes.length;

export default function FloraDeck() {
  const [current, setCurrent] = useState(0);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [scale, setScale] = useState(1);

  const DESIGN_W = 1920;
  const DESIGN_H = 1080;
  // Slide content authored at 1440×810; upscaled to fill the 1920×1080 poster canvas
  const CONTENT_SCALE = DESIGN_W / 1440;

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  // Fluid: lock the deck to a fixed canvas and scale-to-fit the viewport (letterboxed)
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / DESIGN_W, vh / DESIGN_H);
      setScale(s);
      setTx(Math.round((vw - DESIGN_W * s) / 2));
      setTy(Math.round((vh - DESIGN_H * s) / 2));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const navigate = useCallback((dir) => {
    setCurrent(c => Math.max(0, Math.min(TOTAL - 1, c + dir)));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  return (
    <div style={{ position: "fixed", inset: 0, background: P.bg, overflow: "hidden" }}>
      {/* 1920×1080 poster canvas, centered & scaled to fit the viewport */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: DESIGN_W, height: DESIGN_H,
        transformOrigin: "top left",
        transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
        background: P.bg, overflow: "hidden",
      }}>
        {/* Inner content scaler: 1440×810 design space → 1920×1080 */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 1440, height: 810,
          transformOrigin: "top left",
          transform: `scale(${CONTENT_SCALE})`,
          overflow: "hidden",
        }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.02, zIndex: 99 }}>
            <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
          {scenes.map((SceneComp, i) => (
            <div key={i} style={{ position: "absolute", inset: 0, opacity: i === current ? 1 : 0, pointerEvents: i === current ? "all" : "none", transition: `opacity 0.6s ${ease}` }}>
              <SceneComp active={i === current} />
            </div>
          ))}
          <div onClick={() => navigate(-1)} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "11%", cursor: "w-resize", zIndex: 50 }} />
          <div onClick={() => navigate(1)} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "11%", cursor: "e-resize", zIndex: 50 }} />
          <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, alignItems: "center", zIndex: 50 }}>
            {Array.from({ length: TOTAL }, (_, i) => (
              <div key={i} onClick={() => setCurrent(i)} style={{ height: 3, width: i === current ? 26 : 7, borderRadius: 2, background: i === current ? P.sand : `${P.sand}45`, transition: `width 0.4s ${ease}`, cursor: "pointer" }} />
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 14, right: 38, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: P.dimmed, letterSpacing: 2, zIndex: 50 }}>
            {String(current + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}
