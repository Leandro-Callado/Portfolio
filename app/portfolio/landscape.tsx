'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const STARS=[{x:1382,y:42,r:1.5},{x:1348,y:26,r:1},{x:1312,y:55,r:2},{x:1274,y:33,r:1.5},{x:1235,y:20,r:1},{x:1198,y:48,r:1.5},{x:1158,y:30,r:2},{x:1122,y:58,r:1},{x:1085,y:36,r:1.5},{x:1045,y:62,r:1},{x:1008,y:26,r:2},{x:965,y:47,r:1.5},{x:928,y:33,r:1},{x:888,y:57,r:1.5},{x:850,y:28,r:2},{x:812,y:53,r:1},{x:776,y:37,r:1.5},{x:738,y:64,r:1},{x:698,y:30,r:2},{x:660,y:52,r:1.5},{x:620,y:26,r:1},{x:580,y:58,r:1.5},{x:538,y:40,r:2},{x:498,y:64,r:1},{x:458,y:28,r:1.5},{x:418,y:55,r:2},{x:378,y:36,r:1},{x:338,y:67,r:1.5},{x:298,y:40,r:2},{x:258,y:26,r:1},{x:218,y:60,r:1.5},{x:178,y:38,r:1},{x:138,y:64,r:2},{x:98,y:32,r:1.5},{x:58,y:55,r:1},{x:22,y:28,r:2},{x:1425,y:118,r:1},{x:1392,y:145,r:1.5},{x:1358,y:105,r:1},{x:1320,y:132,r:2},{x:1285,y:95,r:1.5},{x:1248,y:122,r:1},{x:1210,y:108,r:1.5},{x:1172,y:92,r:1},{x:1135,y:118,r:2},{x:1098,y:85,r:1.5},{x:1062,y:112,r:1},{x:1025,y:98,r:2},{x:988,y:122,r:1.5},{x:950,y:90,r:1},{x:912,y:115,r:1.5},{x:875,y:105,r:2},{x:838,y:86,r:1},{x:800,y:118,r:1.5},{x:762,y:95,r:1},{x:724,y:112,r:2},{x:686,y:82,r:1.5},{x:648,y:108,r:1},{x:610,y:94,r:2},{x:572,y:118,r:1.5},{x:532,y:86,r:1},{x:492,y:112,r:2},{x:452,y:96,r:1.5},{x:412,y:120,r:1},{x:372,y:85,r:2},{x:332,y:110,r:1.5},{x:290,y:96,r:1},{x:248,y:120,r:2},{x:205,y:98,r:1.5},{x:162,y:124,r:1},{x:120,y:88,r:2},{x:78,y:112,r:1.5},{x:36,y:95,r:1},{x:1408,y:198,r:1.5},{x:862,y:232,r:1.5},{x:825,y:210,r:1},{x:788,y:238,r:2},{x:750,y:218,r:1.5},{x:636,y:232,r:1.5},{x:598,y:218,r:1},{x:560,y:240,r:2},{x:484,y:238,r:1},{x:408,y:242,r:1.5},{x:332,y:228,r:2},{x:66,y:222,r:1.5}]
const SPARKLES=[{x:24,y:88},{x:518,y:180},{x:752,y:162},{x:888,y:278},{x:1202,y:308},{x:1388,y:178},{x:648,y:308},{x:420,y:265}]
export function LandscapeSVG() {
  const svgRef = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (!svgRef.current) return
    const ctx = gsap.context(() => {
      svgRef.current!.querySelectorAll('.dp').forEach((el) => {
        try { const len = (el as SVGGeometryElement).getTotalLength(); gsap.set(el,{strokeDasharray:len,strokeDashoffset:len}) } catch(_){}
      })
      const tl = gsap.timeline({delay:0.4})
      tl.fromTo('.star-dot',{opacity:0,scale:0,transformOrigin:'center'},{opacity:1,scale:1,duration:0.22,ease:'back.out(2)',stagger:{each:0.012,from:'random'}})
      tl.fromTo('.cloud-el',{opacity:0},{opacity:1,duration:1.4,stagger:0.18,ease:'power2.out'},'-=0.2')
      tl.to('.dp-mtn',{strokeDashoffset:0,duration:3.5,ease:'power2.inOut'},'-=0.3')
      tl.to('.fill-mtn',{fillOpacity:1,duration:2,ease:'power2.out'},'-=2')
      tl.to('.dp-castle',{strokeDashoffset:0,duration:1.8,ease:'power2.out',stagger:0.12},'-=0.8')
      tl.to('.fill-castle',{fillOpacity:1,duration:1,ease:'power2.out'},'-=0.8')
      tl.to('.dp-hill',{strokeDashoffset:0,duration:2.5,ease:'power2.inOut',stagger:0.36},'-=0.6')
      tl.to('.fill-hill',{fillOpacity:1,duration:1.8,ease:'power2.out',stagger:0.28},'-=3')
      tl.to('.dp-road',{strokeDashoffset:0,duration:2.4,ease:'power2.inOut'},'-=1.4')
      tl.to('.dp-tree',{strokeDashoffset:0,duration:1.5,ease:'power2.out',stagger:0.1},'-=1.2')
      tl.to('.fill-tree',{fillOpacity:1,duration:0.9,ease:'power2.out',stagger:0.08},'-=1.2')
      tl.fromTo('.flower-el',{opacity:0,scale:0,transformOrigin:'center'},{opacity:1,scale:1,duration:0.6,ease:'back.out(2)',stagger:0.08},'-=0.4')
      gsap.to('.star-dot',{opacity:0.12,duration:2,ease:'sine.inOut',yoyo:true,repeat:-1,stagger:{each:0.07,from:'random'},delay:2})
      gsap.to('.sparkle-el',{scale:2,opacity:0.15,duration:1.8,ease:'sine.inOut',yoyo:true,repeat:-1,stagger:{each:0.42,from:'random'},delay:1.5})
      gsap.to('.dp-road',{strokeOpacity:0.28,duration:2.5,ease:'sine.inOut',yoyo:true,repeat:-1,delay:4})
      gsap.to('.cw',{opacity:0.08,duration:2.2,ease:'sine.inOut',yoyo:true,repeat:-1,stagger:0.4,delay:3})
    }, svgRef)
    return () => ctx.revert()
  }, [])
  return (
    <svg ref={svgRef} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06001a"/>
          <stop offset="55%" stopColor="#10003a"/>
          <stop offset="100%" stopColor="#1e0050"/>
        </linearGradient>
        <filter id="fStar" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="fRoad" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="fCastle" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="1440" height="820" fill="url(#skyG)"/>
      <circle cx="1305" cy="72" r="52" fill="rgba(155,120,240,0.08)"/>
      <circle cx="1305" cy="72" r="42" fill="rgba(155,120,240,0.05)" stroke="rgba(180,150,255,0.2)" strokeWidth="1.5"/>
      <circle cx="1323" cy="62" r="38" fill="#06001a"/>
      <ellipse className="cloud-el" cx="950" cy="130" rx="165" ry="62" fill="rgba(38,8,78,0.72)" opacity="0"/>
      <ellipse className="cloud-el" cx="1100" cy="105" rx="125" ry="52" fill="rgba(48,8,92,0.65)" opacity="0"/>
      <ellipse className="cloud-el" cx="820" cy="152" rx="135" ry="48" fill="rgba(32,6,68,0.62)" opacity="0"/>
      <ellipse className="cloud-el" cx="1240" cy="138" rx="105" ry="44" fill="rgba(44,8,88,0.60)" opacity="0"/>
      <ellipse className="cloud-el" cx="670" cy="172" rx="115" ry="42" fill="rgba(28,6,62,0.50)" opacity="0"/>
      <ellipse className="cloud-el" cx="490" cy="192" rx="95" ry="36" fill="rgba(25,5,58,0.45)" opacity="0"/>
      <ellipse className="cloud-el" cx="310" cy="182" rx="82" ry="30" fill="rgba(22,4,52,0.40)" opacity="0"/>
      <ellipse className="cloud-el" cx="145" cy="198" rx="72" ry="28" fill="rgba(20,4,48,0.35)" opacity="0"/>
      {STARS.map((s,i)=>(<circle key={i} className="star-dot" cx={s.x} cy={s.y} r={s.r} fill="white" opacity="0" filter="url(#fStar)"/>))}
      {SPARKLES.map((sp,i)=>(<text key={i} className="sparkle-el" x={sp.x} y={sp.y} fill="rgba(210,190,255,0.85)" fontSize="14" textAnchor="middle" dominantBaseline="middle" style={{transformOrigin:sp.x+'px '+sp.y+'px'}}>&#10022;</text>))}
      <path className="dp dp-mtn fill-mtn" d="M 538,820 C 570,742 605,665 642,592 C 679,519 715,452 754,390 C 793,328 835,274 880,228 C 925,182 970,148 1015,125 C 1048,108 1080,100 1110,100 C 1140,100 1168,112 1192,130 C 1218,150 1240,178 1266,196 C 1292,214 1318,212 1344,192 C 1368,174 1394,150 1420,136 C 1432,129 1437,128 1440,130 L 1440,820 Z" stroke="rgba(130,80,230,0.75)" strokeWidth="1.8" fill="rgba(16,4,38,0.92)" fillOpacity="0"/>
      <path className="dp dp-mtn fill-mtn" d="M 650,820 C 680,750 718,672 756,600 C 794,528 834,464 875,406 C 916,348 960,298 1005,258 C 1038,228 1072,210 1105,208 C 1132,206 1158,218 1180,238 C 1205,260 1225,290 1252,308 C 1278,326 1305,320 1330,302 C 1356,282 1382,255 1410,242 C 1422,236 1432,235 1440,238 L 1440,820 Z" stroke="rgba(110,65,200,0.55)" strokeWidth="1.2" fill="rgba(22,6,48,0.88)" fillOpacity="0"/>
      <path className="dp dp-castle fill-castle" d="M 1048,168 L 1048,125 L 1043,125 L 1043,108 L 1051,108 L 1051,96 L 1060,88 L 1069,96 L 1069,108 L 1077,108 L 1077,94 L 1086,86 L 1095,94 L 1095,108 L 1103,108 L 1103,96 L 1112,88 L 1121,96 L 1121,108 L 1129,108 L 1129,125 L 1124,125 L 1124,168 Z" stroke="rgba(165,135,255,0.85)" strokeWidth="1.3" fill="rgba(6,1,16,0.96)" fillOpacity="0" filter="url(#fCastle)"/>
      <path className="dp dp-castle fill-castle" d="M 1078,170 L 1078,100 L 1074,100 L 1074,86 L 1082,78 L 1090,86 L 1090,100 L 1086,100 L 1086,170 Z" stroke="rgba(165,135,255,0.90)" strokeWidth="1.2" fill="rgba(6,1,16,0.98)" fillOpacity="0" filter="url(#fCastle)"/>
      <rect className="cw" x="1055" y="138" width="7" height="10" rx="3.5" fill="rgba(255,220,100,0.45)"/>
      <rect className="cw" x="1111" y="138" width="7" height="10" rx="3.5" fill="rgba(255,220,100,0.40)"/>
      <rect className="cw" x="1079" y="108" width="6" height="9" rx="3" fill="rgba(255,220,100,0.55)"/>
      <path className="dp dp-hill fill-hill" d="M 0,450 C 180,405 360,438 540,418 C 720,398 900,420 1080,406 C 1260,392 1380,414 1440,404 L 1440,820 L 0,820 Z" stroke="rgba(95,52,175,0.52)" strokeWidth="1.3" fill="rgba(20,5,46,0.86)" fillOpacity="0"/>
      <path className="dp dp-hill fill-hill" d="M 0,542 C 172,502 348,525 524,510 C 700,495 876,515 1052,500 C 1228,485 1370,508 1440,498 L 1440,820 L 0,820 Z" stroke="rgba(105,58,182,0.54)" strokeWidth="1.3" fill="rgba(24,6,54,0.88)" fillOpacity="0"/>
      <path className="dp dp-hill fill-hill" d="M 0,632 C 158,598 322,618 486,604 C 650,590 814,610 978,596 C 1142,582 1312,604 1440,592 L 1440,820 L 0,820 Z" stroke="rgba(115,64,190,0.58)" strokeWidth="1.4" fill="rgba(28,7,60,0.90)" fillOpacity="0"/>
      <path className="dp dp-hill fill-hill" d="M 0,722 C 138,704 295,715 452,707 C 609,699 766,712 923,704 C 1080,696 1248,710 1440,700 L 1440,820 L 0,820 Z" stroke="rgba(75,38,145,0.65)" strokeWidth="1.6" fill="rgba(10,2,26,0.96)" fillOpacity="0"/>
      <path d="M 658,820 C 648,778 664,737 650,695 C 636,653 654,617 665,578 C 676,539 694,510 714,480 C 734,450 758,426 784,401 C 810,376 842,353 878,328 C 914,303 952,280 994,258 C 1028,238 1065,220 1100,204 C 1120,194 1137,188 1154,184" stroke="rgba(210,190,255,0.15)" strokeWidth="18" fill="none" filter="url(#fRoad)"/>
      <path className="dp dp-road" d="M 658,820 C 648,778 664,737 650,695 C 636,653 654,617 665,578 C 676,539 694,510 714,480 C 734,450 758,426 784,401 C 810,376 842,353 878,328 C 914,303 952,280 994,258 C 1028,238 1065,220 1100,204 C 1120,194 1137,188 1154,184" stroke="rgba(195,175,255,0.72)" strokeWidth="3.5" fill="none" filter="url(#fRoad)"/>
      <path className="dp dp-tree" d="M 32,764 L 32,655 M 32,720 L 8,698 M 32,720 L 56,698 M 32,685 L 12,664 M 32,685 L 52,664" stroke="rgba(50,15,90,0.88)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path className="dp dp-tree fill-tree" d="M 6,702 Q 32,638 58,702 Z" stroke="rgba(50,15,90,0.80)" strokeWidth="1.5" fill="rgba(6,1,14,0.95)" fillOpacity="0"/>
      <path className="dp dp-tree" d="M 72,768 L 72,658 M 72,722 L 48,700 M 72,722 L 96,700 M 72,690 L 52,670 M 72,690 L 92,670" stroke="rgba(48,14,88,0.86)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path className="dp dp-tree fill-tree" d="M 46,704 Q 72,642 98,704 Z" stroke="rgba(48,14,88,0.78)" strokeWidth="1.5" fill="rgba(6,1,14,0.95)" fillOpacity="0"/>
      <path className="dp dp-tree" d="M 118,762 L 118,648 M 118,716 L 88,692 M 118,716 L 148,692 M 118,680 L 94,658 M 118,680 L 142,658" stroke="rgba(45,12,85,0.88)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path className="dp dp-tree fill-tree" d="M 86,698 Q 118,628 150,698 Z" stroke="rgba(45,12,85,0.80)" strokeWidth="1.8" fill="rgba(6,1,14,0.95)" fillOpacity="0"/>
      <path className="dp dp-tree" d="M 162,770 L 162,702 M 162,730 L 145,715 M 162,730 L 179,715" stroke="rgba(42,11,80,0.80)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path className="dp dp-tree fill-tree" d="M 140,716 Q 162,680 184,716 Z" stroke="rgba(42,11,80,0.72)" strokeWidth="1.3" fill="rgba(6,1,14,0.95)" fillOpacity="0"/>
      <circle className="flower-el" cx="1305" cy="800" r="12" fill="rgba(145,70,215,0.45)" opacity="0"/>
      <circle className="flower-el" cx="1325" cy="792" r="8" fill="rgba(155,80,225,0.40)" opacity="0"/>
      <circle className="flower-el" cx="1345" cy="805" r="14" fill="rgba(138,62,210,0.45)" opacity="0"/>
      <circle className="flower-el" cx="1368" cy="795" r="9" fill="rgba(150,75,220,0.38)" opacity="0"/>
      <circle className="flower-el" cx="1390" cy="808" r="11" fill="rgba(142,68,212,0.43)" opacity="0"/>
      <circle className="flower-el" cx="1412" cy="798" r="7" fill="rgba(158,82,228,0.38)" opacity="0"/>
      <circle className="flower-el" cx="200" cy="798" r="10" fill="rgba(55,18,95,0.5)" opacity="0"/>
      <circle className="flower-el" cx="222" cy="806" r="7" fill="rgba(50,15,88,0.45)" opacity="0"/>
    </svg>
  )
}
