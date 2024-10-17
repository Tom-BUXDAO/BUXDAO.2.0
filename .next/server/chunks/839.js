exports.id=839,exports.ids=[839],exports.modules={4838:e=>{e.exports={wallContent:"HomeWallContent_wallContent__i1jjs",logoContainerWrapper:"HomeWallContent_logoContainerWrapper__5A9nr",logoContainer:"HomeWallContent_logoContainer__G9sTE",welcomeText:"HomeWallContent_welcomeText__gCXkz",logoWrapper:"HomeWallContent_logoWrapper__F1IOS",logoBackground:"HomeWallContent_logoBackground__0fnXB",logoText:"HomeWallContent_logoText__pAc7C",infoIconWrapper:"HomeWallContent_infoIconWrapper__ZWTA3",infoIcon:"HomeWallContent_infoIcon__CTcEB",infoPopup:"HomeWallContent_infoPopup__iUO45",infoPopupContent:"HomeWallContent_infoPopupContent__tcPwc",infoSource:"HomeWallContent_infoSource__iZ2Rf",mainContent:"HomeWallContent_mainContent__6JWHN",socialLinks:"HomeWallContent_socialLinks__MH7BV",socialButtons:"HomeWallContent_socialButtons__tQqd4",socialButton:"HomeWallContent_socialButton__nvJfR",footer:"HomeWallContent_footer__edqRk",discordPopup:"HomeWallContent_discordPopup__RUyls",discordPopupContent:"HomeWallContent_discordPopupContent__k8Awv",discordCTA:"HomeWallContent_discordCTA__Ph_fI",twitterPopup:"HomeWallContent_twitterPopup__JZCod",twitterPopupContent:"HomeWallContent_twitterPopupContent__yLmz6",twitterLink:"HomeWallContent_twitterLink__lD3z0",twitterCTA:"HomeWallContent_twitterCTA__oeLWL"}},3446:e=>{e.exports={wallContent:"WallContent_wallContent__P69QX",title:"WallContent_title__rkTHU",content:"WallContent_content__4OEh1",footer:"WallContent_footer__vZTu6"}},6228:(e,t,o)=>{"use strict";o.a(e,async(e,n)=>{try{o.d(t,{Z:()=>s});var r=o(997);o(6689);var a=o(1594),i=o(2949),l=e([i]);i=(l.then?(await l)():l)[0];let s=({position:e,rotation:t,onCameraRotate:o})=>{let n=new i.ShaderMaterial({uniforms:{color:{value:new i.Color("#00ffff")}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        float borderWidth = 0.01;
        float cornerRadius = 0.05;
        
        vec2 uv = vUv;
        vec2 center = vec2(0.5);
        vec2 d = abs(uv - center) - 0.5 + cornerRadius;
        float distance = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - cornerRadius;
        
        float borderAlpha = 1.0 - smoothstep(0.0, borderWidth, abs(distance));
        
        float glow = exp(-distance * 5.0) * 0.5;
        vec3 finalColor = mix(color, vec3(1.0), glow);
        
        float fillAlpha = 0.1 * (1.0 - step(0.0, distance));
        
        gl_FragColor = vec4(finalColor, max(borderAlpha, fillAlpha));
      }
    `,transparent:!0,side:i.DoubleSide});return(0,r.jsxs)("group",{position:e,rotation:t,children:[(0,r.jsxs)("mesh",{position:[0,0,-.001],children:[r.jsx("planeGeometry",{args:[9.5,7.5]}),r.jsx("primitive",{object:n,attach:"material"})]}),r.jsx("group",{position:[0,0,.01],children:r.jsx(a.Z,{onCameraRotate:o})})]})};n()}catch(e){n(e)}})},1594:(e,t,o)=>{"use strict";o.d(t,{Z:()=>l});var n=o(997);o(6689);var r=o(4165),a=o(3446),i=o.n(a);let l=({onCameraRotate:e})=>n.jsx(r.Html,{transform:!0,occlude:!0,scale:.288,style:{width:"950px",height:"750px"},children:(0,n.jsxs)("div",{className:i().wallContent,children:[n.jsx("h1",{className:i().title,children:"BUX Token"}),(0,n.jsxs)("div",{className:i().content,children:[n.jsx("p",{children:"BUX is the native token of the BUX DAO ecosystem."}),n.jsx("p",{children:"It powers our community-driven initiatives and rewards active participants."}),(0,n.jsxs)("ul",{children:[n.jsx("li",{children:"Governance voting rights"}),n.jsx("li",{children:"Staking rewards"}),n.jsx("li",{children:"Access to exclusive features"})]})]}),n.jsx("div",{className:i().footer,children:n.jsx("p",{children:"Learn more about BUX tokenomics"})})]})})},8900:(e,t,o)=>{"use strict";o.a(e,async(e,n)=>{try{o.d(t,{Z:()=>s});var r=o(997);o(6689);var a=o(7986),i=o(2949),l=e([i]);i=(l.then?(await l)():l)[0];let s=({position:e,rotation:t,onCameraRotate:o})=>{let n=new i.ShaderMaterial({uniforms:{color:{value:new i.Color("#00ff00")}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        float borderWidth = 0.01;
        float cornerRadius = 0.05;
        
        vec2 uv = vUv;
        vec2 center = vec2(0.5);
        vec2 d = abs(uv - center) - 0.5 + cornerRadius;
        float distance = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - cornerRadius;
        
        float borderAlpha = 1.0 - smoothstep(0.0, borderWidth, abs(distance));
        
        float glow = exp(-distance * 5.0) * 0.5;
        vec3 finalColor = mix(color, vec3(1.0), glow);
        
        // Fill with neon green at 0.1 opacity
        float fillAlpha = 0.1 * (1.0 - step(0.0, distance));
        
        gl_FragColor = vec4(finalColor, max(borderAlpha, fillAlpha));
      }
    `,transparent:!0,side:i.DoubleSide});return(0,r.jsxs)("group",{position:e,rotation:t,children:[(0,r.jsxs)("mesh",{position:[0,0,-.001],children:[r.jsx("planeGeometry",{args:[9.5,7.5]}),r.jsx("primitive",{object:n,attach:"material"})]}),r.jsx("group",{position:[0,0,.01],children:r.jsx(a.Z,{onCameraRotate:o})})]})};n()}catch(e){n(e)}})},7986:(e,t,o)=>{"use strict";o.d(t,{Z:()=>d});var n=o(997),r=o(6689),a=o(4165),i=o(5675),l=o.n(i),s=o(4838),c=o.n(s);let d=({onCameraRotate:e})=>{let[t,o]=(0,r.useState)(!1),[i,s]=(0,r.useState)(!1),[d,h]=(0,r.useState)(!1);return(0,r.useEffect)(()=>(e(()=>{o(!1),s(!1),h(!1)}),()=>{e(null)}),[e]),(0,n.jsxs)(a.Html,{transform:!0,occlude:!0,scale:.288,style:{width:"950px",height:"750px"},children:[(0,n.jsxs)("div",{className:c().wallContent,children:[n.jsx("div",{className:c().logoContainerWrapper,children:(0,n.jsxs)("div",{className:c().logoContainer,children:[n.jsx("span",{className:c().welcomeText,children:"Welcome to"}),(0,n.jsxs)("div",{className:c().logoWrapper,children:[n.jsx("div",{className:c().logoBackground,children:n.jsx(l(),{src:"/images/logo.png",alt:"BUX DAO Logo",width:141,height:141})}),n.jsx("span",{className:c().logoText,children:"BUX\xa0\xa0\xa0\xa0\xa0\xa0DAO"})]}),n.jsx("div",{className:c().infoIconWrapper,children:n.jsx("i",{className:`fas fa-info-circle ${c().infoIcon}`,onClick:()=>o(!t)})})]})}),(0,n.jsxs)("div",{className:c().mainContent,children:[n.jsx("p",{children:"We are a community owned enterprise, providing our holding members with a variety of benefits designed to generate passive income."}),n.jsx("br",{}),n.jsx("p",{children:"Our $BUX token is backed by our community liquidity pool allowing holders to cash out the tokens they earn."})]}),n.jsx("div",{className:c().socialLinks,children:(0,n.jsxs)("div",{className:c().socialButtons,children:[n.jsx("button",{onClick:()=>s(!i),className:c().socialButton,"aria-label":"Join our Discord server",children:n.jsx("i",{className:"fab fa-discord","aria-hidden":"true"})}),n.jsx("button",{onClick:()=>h(!d),className:c().socialButton,"aria-label":"Follow us on Twitter",children:n.jsx("i",{className:"fab fa-twitter","aria-hidden":"true"})})]})}),n.jsx("div",{className:c().footer,children:n.jsx("p",{children:"Find out how you can start earning TODAY!"})})]}),t&&(0,n.jsxs)("div",{className:c().infoPopup,children:[n.jsx("p",{className:c().infoPopupContent,children:'"A decentralized autonomous organization (DAO) is a blockchain governance system developed to distribute decision-making, management, and entity ownership."'}),n.jsx("p",{className:c().infoSource,children:"- Investopedia"})]}),i&&(0,n.jsxs)("div",{className:c().discordPopup,children:[(0,n.jsxs)("div",{className:c().discordPopupContent,children:[n.jsx("p",{children:"Join our discord server to receive daily eBUX server points."}),n.jsx("p",{children:"Use them to enter raffles to win free NFTs."}),n.jsx("p",{children:"Take part in community poker league."})]}),n.jsx("a",{href:"https://discord.gg/your-discord-link",target:"_blank",rel:"noopener noreferrer",className:c().discordCTA,children:"Join Discord Server"})]}),d&&(0,n.jsxs)("div",{className:c().twitterPopup,children:[(0,n.jsxs)("div",{className:c().twitterPopupContent,children:[n.jsx("p",{children:"Follow our official page"}),n.jsx("span",{className:c().twitterLink,children:"https://x.com/buxdao"})]}),n.jsx("a",{href:"https://x.com/buxdao",target:"_blank",rel:"noopener noreferrer",className:c().twitterCTA,children:"Go to X"})]})]})}},3271:(e,t,o)=>{"use strict";o.a(e,async(e,n)=>{try{o.d(t,{Z:()=>s});var r=o(997);o(6689);var a=o(381),i=o(2949),l=e([i]);i=(l.then?(await l)():l)[0];let s=({position:e,rotation:t,onCameraRotate:o})=>{let n=new i.ShaderMaterial({uniforms:{color:{value:new i.Color("#ff00ff")}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        float borderWidth = 0.01;
        float cornerRadius = 0.05;
        
        vec2 uv = vUv;
        vec2 center = vec2(0.5);
        vec2 d = abs(uv - center) - 0.5 + cornerRadius;
        float distance = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - cornerRadius;
        
        float borderAlpha = 1.0 - smoothstep(0.0, borderWidth, abs(distance));
        
        float glow = exp(-distance * 5.0) * 0.5;
        vec3 finalColor = mix(color, vec3(1.0), glow);
        
        float fillAlpha = 0.1 * (1.0 - step(0.0, distance));
        
        gl_FragColor = vec4(finalColor, max(borderAlpha, fillAlpha));
      }
    `,transparent:!0,side:i.DoubleSide});return(0,r.jsxs)("group",{position:e,rotation:t,children:[(0,r.jsxs)("mesh",{position:[0,0,-.001],children:[r.jsx("planeGeometry",{args:[9.5,7.5]}),r.jsx("primitive",{object:n,attach:"material"})]}),r.jsx("group",{position:[0,0,.01],children:r.jsx(a.Z,{onCameraRotate:o})})]})};n()}catch(e){n(e)}})},381:(e,t,o)=>{"use strict";o.d(t,{Z:()=>l});var n=o(997);o(6689);var r=o(4165),a=o(3446),i=o.n(a);let l=({onCameraRotate:e})=>n.jsx(r.Html,{transform:!0,occlude:!0,scale:.288,style:{width:"950px",height:"750px"},children:(0,n.jsxs)("div",{className:i().wallContent,children:[n.jsx("h1",{className:i().title,children:"BUX NFTs"}),(0,n.jsxs)("div",{className:i().content,children:[n.jsx("p",{children:"Explore unique digital assets in the BUX ecosystem."}),(0,n.jsxs)("ul",{children:[n.jsx("li",{children:"Exclusive BUX DAO NFT collections"}),n.jsx("li",{children:"NFT staking for additional rewards"}),n.jsx("li",{children:"Community-driven NFT marketplace"}),n.jsx("li",{children:"Regular NFT drops and events"})]})]}),n.jsx("div",{className:i().footer,children:n.jsx("p",{children:"Discover the world of BUX NFTs"})})]})})},2038:(e,t,o)=>{"use strict";o.a(e,async(e,n)=>{try{o.d(t,{Z:()=>s});var r=o(997);o(6689);var a=o(104),i=o(2949),l=e([i]);i=(l.then?(await l)():l)[0];let s=({position:e,rotation:t,onCameraRotate:o})=>{let n=new i.ShaderMaterial({uniforms:{color:{value:new i.Color("#ff0000")}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        float borderWidth = 0.01;
        float cornerRadius = 0.05;
        
        vec2 uv = vUv;
        vec2 center = vec2(0.5);
        vec2 d = abs(uv - center) - 0.5 + cornerRadius;
        float distance = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - cornerRadius;
        
        float borderAlpha = 1.0 - smoothstep(0.0, borderWidth, abs(distance));
        
        float glow = exp(-distance * 5.0) * 0.5;
        vec3 finalColor = mix(color, vec3(1.0), glow);
        
        float fillAlpha = 0.1 * (1.0 - step(0.0, distance));
        
        gl_FragColor = vec4(finalColor, max(borderAlpha, fillAlpha));
      }
    `,transparent:!0,side:i.DoubleSide});return(0,r.jsxs)("group",{position:e,rotation:t,children:[(0,r.jsxs)("mesh",{position:[0,0,-.001],children:[r.jsx("planeGeometry",{args:[9.5,7.5]}),r.jsx("primitive",{object:n,attach:"material"})]}),r.jsx("group",{position:[0,0,.01],children:r.jsx(a.Z,{onCameraRotate:o})})]})};n()}catch(e){n(e)}})},104:(e,t,o)=>{"use strict";o.d(t,{Z:()=>l});var n=o(997);o(6689);var r=o(4165),a=o(3446),i=o.n(a);let l=({onCameraRotate:e})=>n.jsx(r.Html,{transform:!0,occlude:!0,scale:.288,style:{width:"950px",height:"750px"},children:(0,n.jsxs)("div",{className:i().wallContent,children:[n.jsx("h1",{className:i().title,children:"BUX Poker"}),(0,n.jsxs)("div",{className:i().content,children:[n.jsx("p",{children:"Experience the thrill of poker in the BUX ecosystem."}),(0,n.jsxs)("ul",{children:[n.jsx("li",{children:"Daily tournaments with BUX token prizes"}),n.jsx("li",{children:"Exclusive VIP tables for high-stakes players"}),n.jsx("li",{children:"Learn-to-play sessions for beginners"}),n.jsx("li",{children:"Monthly championship events"})]})]}),n.jsx("div",{className:i().footer,children:n.jsx("p",{children:"Join the BUX Poker community today!"})})]})})},5727:(e,t,o)=>{"use strict";o.a(e,async(e,n)=>{try{o.d(t,{Z:()=>s});var r=o(997);o(6689);var a=o(6610),i=o(2949),l=e([i]);i=(l.then?(await l)():l)[0];let s=({position:e,rotation:t,onCameraRotate:o})=>{let n=new i.ShaderMaterial({uniforms:{color:{value:new i.Color("#ff00ff")}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        float borderWidth = 0.01;
        float cornerRadius = 0.05;
        
        vec2 uv = vUv;
        vec2 center = vec2(0.5);
        vec2 d = abs(uv - center) - 0.5 + cornerRadius;
        float distance = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - cornerRadius;
        
        float borderAlpha = 1.0 - smoothstep(0.0, borderWidth, abs(distance));
        
        float glow = exp(-distance * 5.0) * 0.5;
        vec3 finalColor = mix(color, vec3(1.0), glow);
        
        float fillAlpha = 0.1 * (1.0 - step(0.0, distance));
        
        gl_FragColor = vec4(finalColor, max(borderAlpha, fillAlpha));
      }
    `,transparent:!0,side:i.DoubleSide});return(0,r.jsxs)("group",{position:e,rotation:t,children:[(0,r.jsxs)("mesh",{position:[0,0,-.001],children:[r.jsx("planeGeometry",{args:[9.5,7.5]}),r.jsx("primitive",{object:n,attach:"material"})]}),r.jsx("group",{position:[0,0,.01],children:r.jsx(a.Z,{onCameraRotate:o})})]})};n()}catch(e){n(e)}})},6610:(e,t,o)=>{"use strict";o.d(t,{Z:()=>l});var n=o(997);o(6689);var r=o(4165),a=o(3446),i=o.n(a);let l=({onCameraRotate:e})=>n.jsx(r.Html,{transform:!0,occlude:!0,scale:.288,style:{width:"950px",height:"750px"},children:(0,n.jsxs)("div",{className:i().wallContent,children:[n.jsx("h1",{className:i().title,children:"BUX Shop"}),(0,n.jsxs)("div",{className:i().content,children:[n.jsx("p",{children:"Welcome to the BUX DAO marketplace!"}),(0,n.jsxs)("ul",{children:[n.jsx("li",{children:"Exclusive BUX-themed merchandise"}),n.jsx("li",{children:"Limited edition NFT collections"}),n.jsx("li",{children:"Redeem BUX tokens for real-world items"}),n.jsx("li",{children:"Special offers for active community members"})]})]}),n.jsx("div",{className:i().footer,children:n.jsx("p",{children:"Explore our unique offerings today!"})})]})})},1294:(e,t,o)=>{"use strict";o.a(e,async(e,n)=>{try{o.d(t,{Z:()=>s});var r=o(997);o(6689);var a=o(2994),i=o(2949),l=e([i]);i=(l.then?(await l)():l)[0];let s=({position:e,rotation:t,onCameraRotate:o})=>{let n=new i.ShaderMaterial({uniforms:{color:{value:new i.Color("#00ff00")}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        float borderWidth = 0.01;
        float cornerRadius = 0.05;
        
        vec2 uv = vUv;
        vec2 center = vec2(0.5);
        vec2 d = abs(uv - center) - 0.5 + cornerRadius;
        float distance = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - cornerRadius;
        
        float borderAlpha = 1.0 - smoothstep(0.0, borderWidth, abs(distance));
        
        float glow = exp(-distance * 5.0) * 0.5;
        vec3 finalColor = mix(color, vec3(1.0), glow);
        
        float fillAlpha = 0.1 * (1.0 - step(0.0, distance));
        
        gl_FragColor = vec4(finalColor, max(borderAlpha, fillAlpha));
      }
    `,transparent:!0,side:i.DoubleSide});return(0,r.jsxs)("group",{position:e,rotation:t,children:[(0,r.jsxs)("mesh",{position:[0,0,-.001],children:[r.jsx("planeGeometry",{args:[9.5,7.5]}),r.jsx("primitive",{object:n,attach:"material"})]}),r.jsx("group",{position:[0,0,.01],children:r.jsx(a.Z,{onCameraRotate:o})})]})};n()}catch(e){n(e)}})},2994:(e,t,o)=>{"use strict";o.d(t,{Z:()=>l});var n=o(997);o(6689);var r=o(4165),a=o(3446),i=o.n(a);let l=({onCameraRotate:e})=>n.jsx(r.Html,{transform:!0,occlude:!0,scale:.288,style:{width:"950px",height:"750px"},children:(0,n.jsxs)("div",{className:i().wallContent,children:[n.jsx("h1",{className:i().title,children:"BUX Spades"}),(0,n.jsxs)("div",{className:i().content,children:[n.jsx("p",{children:"Enjoy the classic card game of Spades in the BUX ecosystem."}),(0,n.jsxs)("ul",{children:[n.jsx("li",{children:"Play with friends or join random matches"}),n.jsx("li",{children:"Compete in daily and weekly tournaments"}),n.jsx("li",{children:"Earn BUX tokens for winning games"}),n.jsx("li",{children:"Climb the leaderboard and showcase your skills"})]})]}),n.jsx("div",{className:i().footer,children:n.jsx("p",{children:"Challenge your friends to a game of Spades today!"})})]})})},7839:(e,t,o)=>{"use strict";o.a(e,async(e,n)=>{try{o.r(t),o.d(t,{default:()=>f});var r=o(997),a=o(6689),i=o(3784);o(4165);var l=o(2949),s=o(8900),c=o(6228),d=o(3271),h=o(2038),m=o(1294),v=o(5727),p=e([l,s,c,d,h,m,v]);[l,s,c,d,h,m,v]=p.then?(await p)():p;let u=({position:e,rotation:t})=>{let o=(0,a.useRef)(),n=(0,a.useRef)();return(0,a.useEffect)(()=>{let e=document.createElement("canvas");e.width=512,e.height=512;let t=e.getContext("2d");t.fillStyle="black",t.fillRect(0,0,512,512),t.strokeStyle="#00ffff",t.lineWidth=1;for(let e=0;e<=512;e+=32)t.beginPath(),t.moveTo(e,0),t.lineTo(e,512),t.stroke(),t.beginPath(),t.moveTo(0,e),t.lineTo(512,e),t.stroke();let r=new l.CanvasTexture(e);r.wrapS=l.RepeatWrapping,r.wrapT=l.RepeatWrapping,r.repeat.set(10,10),n.current=r,o.current&&(o.current.material.map=r,o.current.material.needsUpdate=!0)},[]),(0,r.jsxs)("mesh",{ref:o,position:e,rotation:t,children:[r.jsx("planeGeometry",{args:[100,100]}),r.jsx("meshBasicMaterial",{transparent:!0,opacity:.2})]})},x=({setCurrentWall:e,currentWall:t,targetRotation:o,onCameraRotate:n})=>{let{camera:r,gl:l}=(0,i.useThree)(),s=(0,a.useRef)(!1),c=(0,a.useRef)({x:0,y:0}),d=(0,a.useRef)(0),h=(0,a.useRef)(!1),m=(0,a.useRef)(o);return(0,a.useEffect)(()=>{m.current=o,h.current=!0},[o]),(0,a.useEffect)(()=>{r.position.set(0,0,0),r.lookAt(0,0,-1);let o=l.domElement,n=e=>{s.current=!0,c.current={x:e.clientX,y:e.clientY}},a=()=>{s.current=!1,h()},i=e=>{if(!s.current)return;let t={x:e.clientX-c.current.x,y:e.clientY-c.current.y};d.current-=.005*t.x,m(),c.current={x:e.clientX,y:e.clientY}},h=()=>{let o=Math.round(-d.current%(2*Math.PI)/(2*Math.PI/6)),n=["Home","BUX","NFTs","Poker","Spades","Shop"][o=(o+6)%6];n!==t&&e(n)},m=()=>{r.rotation.y=d.current};return o.addEventListener("mousedown",n),o.addEventListener("mouseup",a),o.addEventListener("mousemove",i),()=>{o.removeEventListener("mousedown",n),o.removeEventListener("mouseup",a),o.removeEventListener("mousemove",i)}},[r,l,e,t]),(0,i.useFrame)(()=>{if(h.current){let e=m.current-d.current;d.current+=Math.sign(e)*Math.min(Math.abs(e),.05),r.rotation.y=d.current,.01>Math.abs(e)&&(d.current=m.current,h.current=!1)}}),null},f=({currentWall:e,setCurrentWall:t})=>{let[o,n]=(0,a.useState)(!1),[l,p]=(0,a.useState)(0),f=(0,a.useRef)(null),j=(0,a.useCallback)(()=>{f.current&&f.current()},[]);(0,a.useEffect)(()=>n(!0),[]);let g=[{id:1,content:"Home",angle:0},{id:2,content:"BUX",angle:Math.PI/3},{id:3,content:"NFTs",angle:2*Math.PI/3},{id:4,content:"Poker",angle:Math.PI},{id:5,content:"Spades",angle:4*Math.PI/3},{id:6,content:"Shop",angle:5*Math.PI/3}];return((0,a.useEffect)(()=>{let t=g.find(t=>t.content===e);t&&(p(-t.angle),j())},[e,j]),o)?(0,r.jsxs)("div",{className:"vr-container",style:{width:"100%",height:"100%"},children:[(0,r.jsxs)(i.Canvas,{camera:{fov:75,position:[0,0,0]},children:[r.jsx(x,{setCurrentWall:t,currentWall:e,targetRotation:l,onCameraRotate:j}),r.jsx("ambientLight",{intensity:.5}),r.jsx("pointLight",{position:[0,0,0],intensity:.8}),g.map(e=>{let t=8.66*Math.sin(e.angle),o=-(8.66*Math.cos(e.angle));return"Home"===e.content?r.jsx(s.Z,{position:[t,0,o],rotation:[0,-e.angle,0],onCameraRotate:e=>{f.current=e}},e.id):"BUX"===e.content?r.jsx(c.Z,{position:[t,0,o],rotation:[0,-e.angle,0],onCameraRotate:e=>{f.current=e}},e.id):"NFTs"===e.content?r.jsx(d.Z,{position:[t,0,o],rotation:[0,-e.angle,0],onCameraRotate:e=>{f.current=e}},e.id):"Poker"===e.content?r.jsx(h.Z,{position:[t,0,o],rotation:[0,-e.angle,0],onCameraRotate:e=>{f.current=e}},e.id):"Spades"===e.content?r.jsx(m.Z,{position:[t,0,o],rotation:[0,-e.angle,0],onCameraRotate:e=>{f.current=e}},e.id):"Shop"===e.content?r.jsx(v.Z,{position:[t,0,o],rotation:[0,-e.angle,0],onCameraRotate:e=>{f.current=e}},e.id):void 0}),r.jsx(u,{position:[0,-4,0],rotation:[-Math.PI/2,0,0]}),r.jsx(u,{position:[0,4,0],rotation:[Math.PI/2,0,0]})]}),(0,r.jsxs)("div",{style:{position:"absolute",bottom:10,left:10,color:"white",backgroundColor:"rgba(0,0,0,0.5)",padding:"5px"},children:["Current Wall: ",e]})]}):null};n()}catch(e){n(e)}})}};