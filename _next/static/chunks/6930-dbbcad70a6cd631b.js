"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6930],{66930:(e,t,a)=>{a.r(t),a.d(t,{BirthdayWishLive:()=>_});var i=a(73365),s=a(1521);let r=["It's your special day.","I made a little surprise just for you.","Ready to open it?"],n=["Turn on the lights","Set the mood","Decorate the room","Release the balloons","Cut the cake"];function l(e,t){let a=e.split("\n").map(e=>e.trim()).filter(Boolean);return a.length>0?a:[...t]}function o(e,t,a){return Array.from({length:a},(a,i)=>e[i]??t[i]??"")}let d={recipientName:"Birthday Star",noteLabel:"A little note for you",introMessages:r.join("\n"),introMediaUrl:"https://cdn.cutiepage.in/template-seeds/bday-wish1/intro.gif",introMediaAlt:"Birthday intro animation",yesLabel:"Yes!",noLabel:"No",finalMessage:"Have a look at it",preparingLabel:"Setting everything up...",surpriseHeadline:"Happy Birthday",surpriseSubheadline:"A tiny celebration page made with lots of love.",actionLabels:n.join("\n"),musicUrl:"https://cdn.cutiepage.in/template-seeds/bday-wish1/music.mp3",topStickerUrl:"https://cdn.cutiepage.in/template-seeds/bday-wish1/right.png",bottomStickerUrl:"https://cdn.cutiepage.in/template-seeds/bday-wish1/left.png",cardSectionHeading:"Flip these birthday wishes",cardSectionSubheading:"Each card hides a little message.",cardOneMessage:"May your day be filled with laughter, love, and small moments that feel unforgettable.",cardOneImageUrl:"https://cdn.cutiepage.in/template-seeds/bday-wish1/pic1.gif",cardTwoMessage:"I hope this year brings calm, confidence, good surprises, and people who cheer for you loudly.",cardTwoImageUrl:"https://cdn.cutiepage.in/template-seeds/bday-wish1/pic2.gif",cardThreeMessage:"You deserve joy that feels easy, memories that stay warm, and a year that treats you gently.",cardThreeImageUrl:"https://cdn.cutiepage.in/template-seeds/bday-wish1/pic3.gif",wishMediaOneUrl:"https://cdn.cutiepage.in/template-seeds/bday-wish1/celebrate.gif",wishMediaTwoUrl:"https://cdn.cutiepage.in/template-seeds/bday-wish1/celebrate2.gif",letterDate:"With lots of love",letterGreeting:"Dear Birthday Star,",letterBody:`Happy Birthday to someone who makes life feel softer, brighter, and a little more fun.

I hope this year gives you more peace, more confidence, and more moments that remind you how loved you are.

You deserve good people, beautiful memories, and the kind of happiness that stays.`,letterClosing:"With all my love,",letterSignature:"Always cheering for you"};function c(e=d){let t=o(l(e.introMessages,r),r,3),a=o(l(e.actionLabels,n),n,5),i=[e.wishMediaOneUrl.trim()||d.wishMediaOneUrl,e.wishMediaTwoUrl.trim()||d.wishMediaTwoUrl];return{birthdayGreeting:{messages:t,noteLabel:e.noteLabel,messageDelayMs:3300,introWindowTitle:`${e.recipientName.toLowerCase().replace(/\s+/g,"-")}.intro`,nextWindowTitle:`${e.recipientName.toLowerCase().replace(/\s+/g,"-")}.next`,preparingLabel:e.preparingLabel,introMedia:{src:e.introMediaUrl,alt:e.introMediaAlt||`${e.recipientName} intro image`},yesLabel:e.yesLabel,noLabel:e.noLabel,finalMessage:e.finalMessage},surprise:{buttonLabels:a,bannerHeadline:e.surpriseHeadline,bannerSubheadline:e.surpriseSubheadline,musicUrl:e.musicUrl.trim(),musicCorner:{topImage:e.topStickerUrl.trim(),bottomImage:e.bottomStickerUrl.trim(),topAlt:`${e.recipientName} celebration detail`,bottomAlt:`${e.recipientName} celebration memory`},palettes:{lights:["#FF4D6D","#FFB347","#FF7F50","#4CC9F0","#B388EB","#F28482","#84A59D","#FFAFCC","#90BE6D","#F9C74F","#F3722C"],balloons:[{top:"#f8d8e2",bottom:"#f4b8c8",knot:"#d995ab"},{top:"#f7e0d1",bottom:"#f2c3aa",knot:"#dca188"},{top:"#f8d4d8",bottom:"#f2aeb8",knot:"#d58f9b"},{top:"#f7dfdf",bottom:"#f0bcc3",knot:"#d49ba3"}]}},cards:{heading:e.cardSectionHeading,subheading:e.cardSectionSubheading,tapLabel:"Tap me",tapToFlipBackLabel:"Tap to flip back",sealLabel:"Wish",cardMessages:[e.cardOneMessage,e.cardTwoMessage,e.cardThreeMessage],items:[{id:1,message:e.cardOneMessage,image:e.cardOneImageUrl,tintClass:"bg-rose-100/20",alt:`${e.recipientName} wish one`},{id:2,message:e.cardTwoMessage,image:e.cardTwoImageUrl,tintClass:"bg-rose-100/20",alt:`${e.recipientName} wish two`},{id:3,message:e.cardThreeMessage,image:e.cardThreeImageUrl,tintClass:"bg-rose-100/20",alt:`${e.recipientName} wish three`}],progress:{start:"Start flipping the wishes",complete:"All wishes discovered",discovered:(e,t)=>`${e} of ${t} wishes discovered`},popup:{icon:"\uD83C\uDF89",title:"All Wishes Discovered!",message:"Now open your final birthday message.",openFinal:"Open Final Message",stay:"Stay here"}},cakeCutting:{heading:"Cake Time",subheading:"Cut the cake and make a wish",cuttingPrompt:"Drag across the cake to cut it",instructions:"Swipe through the highlighted area to complete the cut.",progressText:"Cut Progress",encouragementText:"Almost there",dragHint:"Drag here",congratulations:"Cake Cut!",celebrationMessage:"Now make your birthday wish",makeWishTitle:"Make A Wish",wishPrompt:"Close your eyes and make a wish",wishInstructions:"When you're ready, tap the button below.",wishButton:"I Made My Wish",wishMedia:{sources:i,switchIntervalMs:2200,alt:`${e.recipientName} wish scene`,fallbackSymbol:"Wish Time"},sparkleSymbols:["✦","✧","•"],confettiColors:["#f7b6c9","#f6c0cf","#f5cad8","#f3d4df","#f1becd","#f5d8c8"]},message:{date:e.letterDate,greeting:e.letterGreeting,windowFileName:`${e.recipientName.toLowerCase().replace(/\s+/g,"-")}-letter.txt`,closeLabel:"close",restartLabel:"restart",body:e.letterBody,closing:e.letterClosing,signature:e.letterSignature}}}[{id:"intro",label:"Intro",blockType:"hero",description:"Opening note, intro media, and the first messages.",fields:[{id:"recipientName",label:"Recipient name",type:"text",required:!0},{id:"noteLabel",label:"Intro label",type:"text",required:!0},{id:"introMessages",label:"Intro messages",type:"textarea",required:!0,helperText:"Use one line per message."},{id:"introMediaUrl",label:"Intro image",type:"image",required:!0,helperText:"Upload the opening image or GIF for the intro scene."},{id:"introMediaAlt",label:"Intro image alt text",type:"text"},{id:"yesLabel",label:"Primary button label",type:"text"},{id:"noLabel",label:"Secondary button label",type:"text"},{id:"finalMessage",label:"Transition message",type:"text",required:!0},{id:"preparingLabel",label:"Preparing label",type:"text"}]},{id:"celebration",label:"Celebration",blockType:"details",description:"Main celebration scene, stickers, and optional background music.",fields:[{id:"surpriseHeadline",label:"Celebration headline",type:"text",required:!0},{id:"surpriseSubheadline",label:"Celebration subheadline",type:"textarea"},{id:"actionLabels",label:"Action button labels",type:"textarea",helperText:"Use five lines in order: lights, music, decorate, balloons, cake."},{id:"musicUrl",label:"Background music MP3",type:"audio",helperText:"Upload an MP3 file for the celebration scene."},{id:"topStickerUrl",label:"Top sticker image",type:"image",helperText:"Upload a decorative image for the top corner."},{id:"bottomStickerUrl",label:"Bottom sticker image",type:"image",helperText:"Upload a decorative image for the bottom corner."}]},{id:"wishes",label:"Wish Cards",blockType:"gallery",description:"Three flippable memory cards with images and messages.",fields:[{id:"cardSectionHeading",label:"Cards heading",type:"text",required:!0},{id:"cardSectionSubheading",label:"Cards subheading",type:"text"},{id:"cardOneMessage",label:"Card one message",type:"textarea",required:!0},{id:"cardOneImageUrl",label:"Card one image",type:"image",required:!0},{id:"cardTwoMessage",label:"Card two message",type:"textarea",required:!0},{id:"cardTwoImageUrl",label:"Card two image",type:"image",required:!0},{id:"cardThreeMessage",label:"Card three message",type:"textarea",required:!0},{id:"cardThreeImageUrl",label:"Card three image",type:"image",required:!0}]},{id:"final-letter",label:"Final Letter",blockType:"cta",description:"Wish scene media and the final personal message.",fields:[{id:"wishMediaOneUrl",label:"Wish scene image one",type:"image",helperText:"Upload the first image shown after the cake scene."},{id:"wishMediaTwoUrl",label:"Wish scene image two",type:"image",helperText:"Upload the second image shown after the cake scene."},{id:"letterDate",label:"Letter date line",type:"text"},{id:"letterGreeting",label:"Greeting",type:"text",required:!0},{id:"letterBody",label:"Letter body",type:"textarea",required:!0},{id:"letterClosing",label:"Closing line",type:"text"},{id:"letterSignature",label:"Signature",type:"text",required:!0}]}].map(e=>({...e,fields:e.fields.map(e=>({...e,defaultValue:d[e.id]}))}));let p=new Set(Object.keys(d));var m=a(13750),x=a(17754),h=a(28551);let u=()=>(0,i.jsxs)("div",{className:"pointer-events-none absolute inset-0 overflow-hidden",children:[(0,i.jsx)("div",{className:"bw-wash bw-wash--rose"}),(0,i.jsx)("div",{className:"bw-wash bw-wash--amber"}),(0,i.jsx)("div",{className:"bw-wash bw-wash--blush"}),(0,i.jsx)("div",{className:"bw-grain"}),(0,i.jsx)("style",{children:`
        .bw-wash {
          position: absolute;
          border-radius: 9999px;
          filter: blur(72px);
          will-change: transform;
        }

        .bw-wash--rose {
          left: -14%;
          top: 4%;
          width: 30rem;
          height: 30rem;
          background: rgba(244, 158, 184, 0.3);
          animation: bw-drift-a 26s ease-in-out infinite;
        }

        .bw-wash--amber {
          right: -12%;
          top: 26%;
          width: 26rem;
          height: 26rem;
          background: rgba(240, 187, 122, 0.24);
          animation: bw-drift-b 32s ease-in-out infinite;
        }

        .bw-wash--blush {
          bottom: -12%;
          left: 26%;
          width: 32rem;
          height: 32rem;
          background: rgba(255, 214, 228, 0.34);
          animation: bw-drift-c 38s ease-in-out infinite;
        }

        @keyframes bw-drift-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(4%, 6%, 0) scale(1.1); }
        }

        @keyframes bw-drift-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.05); }
          50%      { transform: translate3d(-5%, 8%, 0) scale(0.95); }
        }

        @keyframes bw-drift-c {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(-4%, -6%, 0) scale(1.08); }
        }

        /* Fine paper grain — keeps the large flat washes from banding. */
        .bw-grain {
          position: absolute;
          inset: 0;
          opacity: 0.4;
          mix-blend-mode: multiply;
          background-image:
            radial-gradient(circle at 15% 22%, rgba(190, 140, 155, 0.05) 0.5px, transparent 1px),
            radial-gradient(circle at 68% 54%, rgba(190, 140, 155, 0.05) 0.5px, transparent 1px),
            radial-gradient(circle at 42% 86%, rgba(190, 140, 155, 0.04) 0.5px, transparent 1px);
          background-size: 120px 120px, 170px 170px, 210px 210px;
        }

        @media (prefers-reduced-motion: reduce) {
          .bw-wash { animation: none; }
        }
      `})]}),b=c(d),f=(0,s.createContext)(b);function g({children:e,config:t}){return(0,i.jsx)(f.Provider,{value:t??b,children:e})}function w(){return(0,s.useContext)(f)}let y=["#ff8fb0","#ffc86b","#8fd4b8","#8fc4ec","#b8a8f0"],j=({className:e=""})=>(0,i.jsxs)("svg",{viewBox:"0 0 48 56",className:e,fill:"none","aria-hidden":"true",children:[(0,i.jsx)("ellipse",{cx:"16",cy:"16",rx:"10.5",ry:"12.5",fill:"#ffc2d6"}),(0,i.jsx)("ellipse",{cx:"13",cy:"12",rx:"3",ry:"4",fill:"rgba(255,255,255,.55)"}),(0,i.jsx)("ellipse",{cx:"32",cy:"22",rx:"9",ry:"10.5",fill:"#a8d8f0"}),(0,i.jsx)("ellipse",{cx:"29.5",cy:"18.5",rx:"2.5",ry:"3.4",fill:"rgba(255,255,255,.55)"}),(0,i.jsx)("path",{d:"M16 29c1.5 8-3 12-1 18M32 33c-1 7 3 10 1.5 15",stroke:"#e3b7cd",strokeWidth:"1.5",strokeLinecap:"round"})]}),v=({className:e=""})=>(0,i.jsxs)("svg",{viewBox:"0 0 56 48",className:e,fill:"none","aria-hidden":"true",children:[(0,i.jsx)("rect",{x:"4",y:"10",width:"7",height:"3",rx:"1.5",fill:"#ffd08a",transform:"rotate(-24 4 10)"}),(0,i.jsx)("rect",{x:"22",y:"4",width:"7",height:"3",rx:"1.5",fill:"#ff9fc0",transform:"rotate(32 22 4)"}),(0,i.jsx)("rect",{x:"40",y:"14",width:"7",height:"3",rx:"1.5",fill:"#9fd8c4",transform:"rotate(-14 40 14)"}),(0,i.jsx)("rect",{x:"14",y:"30",width:"7",height:"3",rx:"1.5",fill:"#b8a8f0",transform:"rotate(46 14 30)"}),(0,i.jsx)("rect",{x:"36",y:"34",width:"7",height:"3",rx:"1.5",fill:"#ffd08a",transform:"rotate(-38 36 34)"}),(0,i.jsx)("circle",{cx:"30",cy:"21",r:"2.3",fill:"#ff9fc0"}),(0,i.jsx)("circle",{cx:"9",cy:"24",r:"1.9",fill:"#a8d8f0"}),(0,i.jsx)("circle",{cx:"49",cy:"29",r:"1.9",fill:"#b8a8f0"})]}),k=({title:e,children:t})=>(0,i.jsxs)("div",{className:"bw-intro-card mx-auto w-full max-w-2xl",children:[(0,i.jsxs)("div",{className:"flex items-center justify-center gap-2 border-b border-[var(--bw-hairline-soft)] px-5 py-3.5 sm:px-6",children:[(0,i.jsx)("span",{className:"bw-intro-mark","aria-hidden":"true",children:"✦"}),(0,i.jsx)("p",{className:"bw-intro-title truncate",children:e}),(0,i.jsx)("span",{className:"bw-intro-mark","aria-hidden":"true",children:"✦"})]}),(0,i.jsxs)("div",{className:"relative px-6 py-7 sm:px-10 sm:py-8",children:[(0,i.jsx)("div",{className:"pointer-events-none absolute -left-12 -top-6 h-32 w-32 rounded-full bg-[#ffc2d6]/40 blur-3xl"}),(0,i.jsx)("div",{className:"pointer-events-none absolute -right-10 top-1/3 h-28 w-28 rounded-full bg-[#ffd08a]/35 blur-3xl"}),(0,i.jsx)("div",{className:"pointer-events-none absolute -bottom-8 left-1/3 h-28 w-28 rounded-full bg-[#a8d8f0]/30 blur-3xl"}),(0,i.jsx)(j,{className:"bw-intro-doodle bw-intro-doodle--tl"}),(0,i.jsx)(v,{className:"bw-intro-doodle bw-intro-doodle--br"}),(0,i.jsx)("div",{className:"relative",children:t})]})]}),N=()=>{let e=w(),t=e.birthdayGreeting.messages,[a,r]=(0,s.useState)(0),[n,l]=(0,s.useState)(!1),[o,d]=(0,s.useState)(!1),c=(0,h.Zp)(),[p,b]=(0,s.useState)([]);(0,s.useEffect)(()=>{b(Array.from({length:14},()=>({initialX:100*Math.random(),targetX:100*Math.random(),duration:10*Math.random()+13,delay:8*Math.random(),size:5+9*Math.random()})))},[]),(0,s.useEffect)(()=>{if(a<t.length){let i=setTimeout(()=>{a===t.length-1?l(!0):r(e=>e+1)},e.birthdayGreeting.messageDelayMs);return()=>clearTimeout(i)}},[a]);let f=()=>{l(!1),d(!0),setTimeout(()=>{c("/surprise")},3e3)};return(0,i.jsxs)("div",{className:"relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6",children:[(0,i.jsx)(u,{}),(0,i.jsx)("div",{className:"pointer-events-none absolute inset-0",children:p.map((e,t)=>(0,i.jsx)("span",{className:"bw-mote",style:{width:`${e.size}px`,height:`${e.size}px`,left:`${e.initialX}vw`,animationDuration:`${e.duration}s`,animationDelay:`${e.delay}s`,"--bw-mote-drift":`${e.targetX-e.initialX}vw`,background:t%3==0?"radial-gradient(circle at 34% 30%, rgba(255,255,255,0.9), rgba(240,187,122,0.5))":"radial-gradient(circle at 34% 30%, rgba(255,255,255,0.9), rgba(244,158,184,0.5))"}},t))}),(0,i.jsx)("div",{className:"relative w-full max-w-2xl",children:(0,i.jsx)(m.N,{mode:"wait",children:o?(0,i.jsx)(x.P.div,{initial:{opacity:0,scale:.94},animate:{opacity:1,scale:1},transition:{type:"spring",stiffness:130,damping:18},className:"text-center",children:(0,i.jsxs)(k,{title:e.birthdayGreeting.nextWindowTitle,children:[(0,i.jsx)(x.P.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{delay:.15,duration:.6,ease:[.22,1,.36,1]},className:"warm-heading mb-4 font-['Fraunces',serif] text-[2rem] font-semibold leading-tight sm:text-[2.75rem]",children:e.birthdayGreeting.finalMessage}),(0,i.jsx)("div",{className:"bw-rule mb-4","aria-hidden":"true",children:(0,i.jsx)(x.P.span,{className:"block h-1.5 w-1.5 rounded-full bg-[var(--bw-rose)]",animate:{scale:[1,1.5,1],opacity:[.5,1,.5]},transition:{duration:1.6,repeat:1/0,ease:"easeInOut"}})}),(0,i.jsx)("p",{className:"text-sm tracking-wide text-[var(--bw-ink-soft)]",children:e.birthdayGreeting.preparingLabel}),(0,i.jsx)("div",{className:"mx-auto mt-6 w-40",children:(0,i.jsx)("div",{className:"bw-meter",children:(0,i.jsx)(x.P.div,{className:"h-full rounded-full bg-gradient-to-r from-[var(--bw-amber)] to-[var(--bw-rose)]",initial:{width:"0%"},animate:{width:"100%"},transition:{duration:2.9,ease:"linear"}})})})]})},"final"):(0,i.jsx)(x.P.div,{initial:{opacity:0,y:24,scale:.98},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:-20,scale:.98},transition:{type:"spring",stiffness:120,damping:20,mass:.9},className:"text-center",children:(0,i.jsxs)(k,{title:e.birthdayGreeting.introWindowTitle,children:[(0,i.jsx)("img",{src:e.birthdayGreeting.introMedia.src,alt:e.birthdayGreeting.introMedia.alt,className:"bw-intro-media mx-auto mb-3 block h-auto max-h-28 w-auto max-w-[10rem] object-contain"}),(0,i.jsxs)("p",{className:"bw-intro-note mb-2.5",children:[(0,i.jsx)("span",{"aria-hidden":"true",children:"✿"}),e.birthdayGreeting.noteLabel,(0,i.jsx)("span",{"aria-hidden":"true",children:"✿"})]}),(0,i.jsx)("div",{className:"flex min-h-[5.5rem] items-center justify-center sm:min-h-[6.5rem]",children:(0,i.jsx)(m.N,{mode:"wait",children:(0,i.jsx)(x.P.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0,y:-12},transition:{duration:.42,ease:[.22,1,.36,1]},className:"bw-intro-headline mx-auto max-w-xl font-['Fraunces',serif] text-[1.6rem] font-semibold leading-[1.2] sm:text-[2.15rem]",children:t[a]},a)})}),(0,i.jsx)("div",{className:"mb-5 mt-4 flex items-center justify-center gap-1.5",children:t.map((e,t)=>(0,i.jsx)(x.P.span,{className:"block h-[5px] rounded-full",animate:{width:t===a?22:6,backgroundColor:t<=a?y[t%y.length]:"rgba(214,158,174,0.25)"},transition:{duration:.4,ease:[.22,1,.36,1]}},t))}),(0,i.jsx)(m.N,{children:n&&(0,i.jsxs)(x.P.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{type:"spring",stiffness:180,damping:22},className:"flex flex-wrap items-center justify-center gap-3",children:[(0,i.jsx)("button",{onClick:f,className:"bw-btn bw-btn--primary",children:e.birthdayGreeting.yesLabel}),(0,i.jsx)("button",{onClick:f,className:"bw-btn bw-btn--ghost",children:e.birthdayGreeting.noLabel})]})})]})},"message")})})]})},M=(0,s.createContext)(null),C=({children:e})=>{let t=(0,s.useRef)(null),[a,r]=(0,s.useState)(!1),n=w().surprise.musicUrl;(0,s.useEffect)(()=>{if(!n){t.current=null,r(!1);return}let e=new Audio(n);e.loop=!0,e.preload="auto";let a=()=>r(!0),i=()=>r(!1);return e.addEventListener("play",a),e.addEventListener("pause",i),t.current=e,()=>{e.pause(),e.removeEventListener("play",a),e.removeEventListener("pause",i),t.current===e&&(t.current=null)}},[n]);let l=()=>{t.current?.play().catch(()=>{})},o=()=>{t.current?.pause()};return(0,i.jsx)(M.Provider,{value:{play:l,pause:o,toggle:()=>{t.current&&(t.current.paused?l():o())},playing:a},children:e})},S=()=>(0,i.jsxs)("div",{className:"cake-wrap",children:[(0,i.jsxs)("div",{className:"cake",children:[(0,i.jsx)("div",{className:"plate"}),(0,i.jsx)("div",{className:"layer layer-bottom"}),(0,i.jsx)("div",{className:"layer layer-middle"}),(0,i.jsx)("div",{className:"layer layer-top"}),(0,i.jsx)("div",{className:"icing"}),(0,i.jsx)("div",{className:"drip drip1"}),(0,i.jsx)("div",{className:"drip drip2"}),(0,i.jsx)("div",{className:"drip drip3"}),(0,i.jsx)("div",{className:"sprinkles",children:[{left:"26%",top:"16px",rotate:-22,color:"#ffd166"},{left:"38%",top:"11px",rotate:34,color:"#8ecae6"},{left:"52%",top:"9px",rotate:-8,color:"#f4978e"},{left:"64%",top:"13px",rotate:48,color:"#b8e0d2"},{left:"74%",top:"19px",rotate:-36,color:"#ffd166"},{left:"32%",top:"25px",rotate:12,color:"#c8b6ff"},{left:"58%",top:"27px",rotate:-44,color:"#f4978e"},{left:"46%",top:"21px",rotate:26,color:"#8ecae6"}].map((e,t)=>(0,i.jsx)("span",{className:"sprinkle",style:{left:e.left,top:e.top,backgroundColor:e.color,transform:`rotate(${e.rotate}deg)`}},t))}),(0,i.jsxs)("div",{className:"candle",children:[(0,i.jsx)("div",{className:"wick"}),(0,i.jsx)("div",{className:"flame-glow"}),(0,i.jsx)("div",{className:"flame"})]})]}),(0,i.jsx)("style",{children:`
        .cake-wrap {
          width: min(250px, 74vw);
          height: min(210px, 58vw);
          position: relative;
        }

        .cake {
          position: absolute;
          width: min(250px, 74vw);
          height: min(200px, 56vw);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .cake > * {
          position: absolute;
        }

        .plate {
          width: min(276px, 82vw);
          height: min(110px, 32vw);
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(180deg, #fdf7f4 0%, #efe3dd 100%);
          border-radius: 50%;
          box-shadow:
            0 2px 0 #e6d8d2,
            0 5px 0 #dccdc6,
            0 14px 30px rgba(120, 62, 82, 0.18);
        }

        /* Thin rim highlight so the plate reads as ceramic, not a flat oval. */
        .plate::before {
          content: '';
          position: absolute;
          inset: 8px 14px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.7);
        }

        .layer {
          left: 50%;
          transform: translateX(-50%);
          width: min(250px, 74vw);
          height: min(100px, 28vw);
          border-radius: 50%;
          background: #eb8aa6;
          box-shadow:
            0 2px 0 #e58299,
            0 4px 0 #de798f,
            0 8px 0 #d67186,
            0 12px 0 #ce697d,
            0 16px 0 #c66174,
            0 20px 0 #be596b,
            0 24px 0 #b65162,
            0 28px 0 #ae4959,
            0 30px 0 #a64151;
        }

        .layer-top {
          top: 0;
        }

        .layer-middle {
          top: 33px;
        }

        .layer-bottom {
          top: 66px;
        }

        .icing {
          top: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: min(240px, 71vw);
          height: min(90px, 25vw);
          border-radius: 50%;
          background: linear-gradient(180deg, #fffdfc 0%, #ffeef2 100%);
          box-shadow: inset 0 -10px 16px rgba(255, 170, 190, 0.4);
        }

        .icing::before {
          content: '';
          position: absolute;
          top: 4px;
          right: 5px;
          bottom: 6px;
          left: 5px;
          border-radius: 50%;
          background: #fffaf9;
          box-shadow:
            inset 0 4px 10px rgba(255, 255, 255, 0.9),
            0 0 10px rgba(255, 240, 243, 0.85);
          z-index: 1;
        }

        .drip {
          display: block;
          background: linear-gradient(180deg, #fffaf9 0%, #ffeef2 100%);
          width: 50px;
          height: 60px;
          border-bottom-left-radius: 25px;
          border-bottom-right-radius: 25px;
          box-shadow: inset 0 -8px 10px rgba(255, 170, 190, 0.38);
        }

        .drip1 {
          top: 53px;
          left: 8px;
          transform: skewY(15deg);
          width: 40px;
          height: 48px;
        }

        .drip2 {
          top: 69px;
          right: 12px;
          transform: skewY(-15deg);
        }

        .drip3 {
          top: 54px;
          left: 86px;
          width: 80px;
          border-bottom-left-radius: 40px;
          border-bottom-right-radius: 40px;
        }

        /* Sprinkles sit above the icing highlight (z-index 1). */
        .sprinkles {
          top: 0;
          left: 0;
          width: 100%;
          height: 60px;
          z-index: 2;
          pointer-events: none;
        }

        .sprinkle {
          position: absolute;
          width: 7px;
          height: 2.5px;
          border-radius: 2px;
          opacity: 0.85;
        }

        .candle {
          width: 16px;
          height: 52px;
          left: 50%;
          top: -22px;
          margin-left: -8px;
          z-index: 10;
          border-radius: 8px / 4px;
          /* Candy stripe rather than a flat cylinder. */
          background:
            repeating-linear-gradient(
              -32deg,
              #ffffff 0 5px,
              #ffd6e2 5px 10px
            );
          box-shadow:
            inset -3px 0 5px rgba(190, 120, 145, 0.28),
            inset 3px 0 4px rgba(255, 255, 255, 0.65),
            0 2px 5px rgba(120, 62, 82, 0.2);
        }

        .candle::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 16px;
          height: 8px;
          border-radius: 50%;
          background: #fff6f9;
          box-shadow: inset 0 -2px 3px rgba(190, 120, 145, 0.25);
        }

        .wick {
          position: absolute;
          top: -7px;
          left: 50%;
          width: 2px;
          height: 8px;
          margin-left: -1px;
          border-radius: 1px;
          background: #6b4a3a;
        }

        /* Soft warm pool of light around the flame. */
        .flame-glow {
          position: absolute;
          top: -52px;
          left: 50%;
          width: 74px;
          height: 74px;
          margin-left: -37px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 186, 92, 0.42) 0%,
            rgba(255, 186, 92, 0.16) 40%,
            transparent 70%
          );
          animation: glow-pulse 2.4s ease-in-out infinite;
          pointer-events: none;
        }

        .flame {
          position: absolute;
          top: -36px;
          left: 50%;
          width: 15px;
          height: 36px;
          margin-left: -7.5px;
          border-radius: 10px 10px 10px 10px / 25px 25px 10px 10px;
          background: radial-gradient(circle at 50% 72%, #fff6d0 0%, #ffca55 42%, #ff8f1c 78%);
          transform-origin: 50% 90%;
          box-shadow:
            0 0 12px rgba(255, 167, 38, 0.5),
            0 0 24px rgba(255, 167, 38, 0.34),
            0 0 44px rgba(255, 167, 38, 0.22);
          animation: flicker 1s ease-in-out alternate infinite;
        }

        @keyframes flicker {
          0%   { transform: skewX(5deg) scaleY(1); }
          25%  { transform: skewX(-5deg) scaleY(1.05); }
          50%  { transform: skewX(8deg) scaleY(0.96); }
          75%  { transform: skewX(-8deg) scaleY(1.04); }
          100% { transform: skewX(5deg) scaleY(1); }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.12); }
        }

        @media (prefers-reduced-motion: reduce) {
          .flame,
          .flame-glow {
            animation: none;
          }
        }
      `})]}),z=({onNext:e})=>{let t=w(),[a,r]=(0,s.useState)("cutting"),[n,l]=(0,s.useState)(0),[o,d]=(0,s.useState)(!1),[c,p]=(0,s.useState)([]),[h,b]=(0,s.useState)([]),[f,g]=(0,s.useState)(!1),[y,j]=(0,s.useState)(!1),[v,k]=(0,s.useState)([]),[N,M]=(0,s.useState)(0),[C,z]=(0,s.useState)(!1),L=(0,s.useRef)(null),$=(0,s.useRef)(!1),T=(0,s.useRef)(new Set),P=(e,t)=>e>=.32*t-22&&e<=.6*t+22,W=(e,t)=>{let a=Math.floor(Math.max(0,Math.min(e,t-1))/t*20);T.current.add(a);let i=T.current.size/20;l(Math.min(i,1)),i>=.58&&I()},B=(e,a)=>{let i=L.current?.getBoundingClientRect();if(!i)return;let s={id:Date.now()+Math.random(),x:e/i.width*100,y:a/i.height*100,message:t.cakeCutting.sparkleSymbols[Math.floor(Math.random()*t.cakeCutting.sparkleSymbols.length)]};p(e=>[...e.slice(-8),s])},F=(e,a,i)=>Array.from({length:e}).map((e,s)=>({id:Date.now()+s,x:100*Math.random(),y:-10,color:t.cakeCutting.confettiColors[Math.floor(Math.random()*t.cakeCutting.confettiColors.length)],size:a+Math.random()*i,duration:2.4+2*Math.random(),delay:.5*Math.random(),round:s%3==0})),I=()=>{$.current||($.current=!0,j(!1),d(!0),p([]),b(F(28,5,6)),setTimeout(()=>{b([]),r("wish")},2e3))},U=()=>{y&&n<.58?setTimeout(()=>{j(!1),k([]),l(0),T.current.clear()},1e3):j(!1)};(0,s.useEffect)(()=>{let e=setInterval(()=>{p(e=>e.slice(-10))},2e3);return()=>clearInterval(e)},[]),(0,s.useEffect)(()=>{if("wish"!==a||C)return;let e=window.setInterval(()=>{M(e=>(e+1)%t.cakeCutting.wishMedia.sources.length)},t.cakeCutting.wishMedia.switchIntervalMs);return()=>window.clearInterval(e)},[a,C]);let A=Math.round(100*n);return(0,i.jsxs)("div",{className:"font-display relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 md:px-8",children:[(0,i.jsx)(u,{}),(0,i.jsx)("div",{className:"pointer-events-none fixed inset-0 z-50",children:h.map(e=>(0,i.jsx)("div",{className:"absolute animate-confetti-fall",style:{left:`${e.x}%`,top:`${e.y}px`,animationDuration:`${e.duration}s`,animationDelay:`${e.delay}s`},children:(0,i.jsx)("div",{className:"confetti-piece",style:{backgroundColor:e.color,width:`${e.size}px`,height:`${e.round?e.size:1.6*e.size}px`,borderRadius:e.round?"50%":"2px"}})},e.id))}),(0,i.jsx)("div",{className:"pointer-events-none fixed inset-0 z-40",children:c.map(e=>(0,i.jsx)("div",{className:"animate-sparkle-pop absolute text-xl text-[var(--bw-amber)]",style:{left:`${e.x}%`,top:`${e.y}%`,transform:"translate(-50%, -50%)"},children:e.message},e.id))}),(0,i.jsxs)("div",{className:"relative z-10 w-full max-w-3xl",children:[(0,i.jsxs)(x.P.div,{className:"mb-7 text-center",initial:{opacity:0,y:-16},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.22,1,.36,1]},children:[(0,i.jsx)("h2",{className:"warm-heading font-['Fraunces',serif] text-[1.75rem] font-semibold leading-tight sm:text-[2.25rem]",children:t.cakeCutting.heading}),(0,i.jsx)("p",{className:"mt-2 text-sm text-[var(--bw-ink-soft)]",children:t.cakeCutting.subheading})]}),(0,i.jsx)(x.P.div,{className:"romantic-shell relative z-20 p-6 sm:p-8",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.7,ease:[.22,1,.36,1]},children:(0,i.jsxs)(m.N,{mode:"wait",children:["cutting"===a&&(0,i.jsxs)(x.P.div,{className:"space-y-5",initial:{opacity:0,y:16},animate:{opacity:1,y:0},exit:{opacity:0,y:-16,scale:.98},transition:{duration:.5,ease:[.22,1,.36,1]},children:[(0,i.jsxs)("div",{className:"text-center",children:[(0,i.jsx)("p",{className:"bw-eyebrow mb-2",children:t.cakeCutting.dragHint}),(0,i.jsx)("p",{className:"text-base font-semibold text-[var(--bw-ink)] sm:text-lg",children:t.cakeCutting.cuttingPrompt}),(0,i.jsx)("p",{className:"mt-1.5 text-sm text-[var(--bw-ink-soft)]",children:t.cakeCutting.instructions})]}),(0,i.jsx)("div",{className:"flex justify-center",children:(0,i.jsxs)("div",{ref:L,className:"touch-none relative select-none bg-transparent",style:{width:"min(320px, 86vw)",height:"min(260px, 68vw)",cursor:y?"grabbing":"grab"},onMouseDown:e=>{if("cutting"!==a||o)return;let t=L.current?.getBoundingClientRect();if(!t)return;let i=e.clientX-t.left,s=e.clientY-t.top;P(s,t.height)&&(j(!0),k([{x:i,y:s}]),l(0),T.current.clear(),W(i,t.width),B(i,s))},onMouseMove:e=>{if(!y||"cutting"!==a||o)return;let t=L.current?.getBoundingClientRect();if(!t)return;let i=e.clientX-t.left,s=e.clientY-t.top;P(s,t.height)&&(k(e=>{let a=[...e,{x:i,y:s}];return W(i,t.width),a}),B(i,s))},onMouseUp:U,onMouseLeave:U,onTouchStart:e=>{if(e.preventDefault(),"cutting"!==a||o)return;let t=L.current?.getBoundingClientRect();if(!t||!e.touches[0])return;let i=e.touches[0].clientX-t.left,s=e.touches[0].clientY-t.top;P(s,t.height)&&(j(!0),k([{x:i,y:s}]),l(0),T.current.clear(),W(i,t.width),B(i,s))},onTouchMove:e=>{if(e.preventDefault(),!y||"cutting"!==a||o||!e.touches[0])return;let t=L.current?.getBoundingClientRect();if(!t)return;let i=e.touches[0].clientX-t.left,s=e.touches[0].clientY-t.top;P(s,t.height)&&(k(e=>{let a=[...e,{x:i,y:s}];return W(i,t.width),a}),B(i,s))},onTouchEnd:e=>{e.preventDefault(),y&&n<.58?setTimeout(()=>{j(!1),k([]),l(0),T.current.clear()},1e3):j(!1)},children:[(0,i.jsx)(x.P.div,{className:"pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",animate:o?{scale:1,rotate:0}:{y:[0,-4,0]},transition:o?{duration:.4}:{duration:4,repeat:1/0,ease:"easeInOut"},children:(0,i.jsx)(S,{})}),!o&&(0,i.jsxs)("div",{className:"cut-zone pointer-events-none absolute",style:{top:"32%",left:"8%",width:"84%",height:"27.999999999999996%",opacity:y?1:.75},children:[(0,i.jsx)("span",{className:"cut-zone-line"}),!y&&(0,i.jsx)("span",{className:"cut-zone-hand","aria-hidden":"true",children:"✧"})]}),v.length>1&&(0,i.jsxs)("svg",{className:"pointer-events-none absolute left-0 top-0 z-10 h-full w-full",children:[(0,i.jsx)("path",{d:`M ${v.map(e=>`${e.x},${e.y}`).join(" L ")}`,stroke:"url(#bw-cut-gradient)",strokeWidth:"5",strokeLinecap:"round",strokeLinejoin:"round",fill:"none",style:{filter:"drop-shadow(0 0 8px rgba(222, 111, 145, 0.7))"}}),(0,i.jsx)("defs",{children:(0,i.jsxs)("linearGradient",{id:"bw-cut-gradient",x1:"0",y1:"0",x2:"1",y2:"0",children:[(0,i.jsx)("stop",{offset:"0%",stopColor:"#eaa14f"}),(0,i.jsx)("stop",{offset:"100%",stopColor:"#de6f91"})]})})]}),(0,i.jsx)(m.N,{children:o&&(0,i.jsx)(x.P.div,{className:"absolute inset-0 z-30 grid place-items-center rounded-2xl bg-white/55 backdrop-blur-sm",initial:{opacity:0},animate:{opacity:1},transition:{duration:.35},children:(0,i.jsxs)(x.P.div,{className:"text-center",initial:{scale:.8,y:10},animate:{scale:1,y:0},transition:{type:"spring",stiffness:200,damping:15},children:[(0,i.jsx)("p",{className:"warm-heading font-['Fraunces',serif] text-xl font-semibold",children:t.cakeCutting.congratulations}),(0,i.jsx)("p",{className:"mt-1 text-sm text-[var(--bw-ink-soft)]",children:t.cakeCutting.celebrationMessage})]})})})]})}),(0,i.jsxs)("div",{className:"mx-auto w-full max-w-xs text-center",children:[(0,i.jsxs)("div",{className:"mb-2 flex items-center justify-between text-[11px] font-semibold",children:[(0,i.jsx)("span",{className:"text-[var(--bw-ink-faint)]",children:t.cakeCutting.progressText}),(0,i.jsxs)(x.P.span,{className:"text-[var(--bw-rose-deep)]",animate:{scale:y?[1,1.12,1]:1},transition:{duration:.4},children:[A,"%",n>.5?` \xb7 ${t.cakeCutting.encouragementText}`:""]})]}),(0,i.jsx)("div",{className:"bw-meter",children:(0,i.jsx)("div",{className:"bw-meter-fill",style:{width:`${A}%`}})})]})]},"cutting"),"wish"===a&&(0,i.jsxs)(x.P.div,{className:"space-y-5 text-center",initial:{opacity:0,y:20,scale:.97},animate:{opacity:1,y:0,scale:1},transition:{type:"spring",stiffness:120,damping:18},children:[(0,i.jsx)("div",{className:"flex justify-center",children:(0,i.jsxs)(x.P.div,{className:"relative h-48 w-64 overflow-hidden rounded-[20px] border border-[var(--bw-hairline)] bg-white/80 shadow-[var(--bw-e3)]",initial:{scale:.9,rotate:-1.5},animate:{scale:1,rotate:0},transition:{type:"spring",stiffness:160,damping:16},children:[C?(0,i.jsx)("div",{className:"flex h-full w-full items-center justify-center bg-[var(--bw-rose-soft)] font-['Fraunces',serif] text-xl font-semibold text-[var(--bw-rose-deep)]",children:t.cakeCutting.wishMedia.fallbackSymbol}):(0,i.jsx)(m.N,{mode:"wait",children:(0,i.jsx)(x.P.img,{src:t.cakeCutting.wishMedia.sources[N],alt:t.cakeCutting.wishMedia.alt,initial:{opacity:0,scale:1.04},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.98},transition:{duration:.6,ease:[.22,1,.36,1]},className:"absolute inset-0 h-full w-full object-contain",onError:()=>z(!0)},t.cakeCutting.wishMedia.sources[N])}),(0,i.jsx)("div",{className:"pointer-events-none absolute inset-0 rounded-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"})]})}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:"bw-eyebrow mb-2",children:t.cakeCutting.makeWishTitle}),(0,i.jsx)("h3",{className:"warm-heading font-['Fraunces',serif] text-2xl font-semibold leading-snug sm:text-[1.75rem]",children:t.cakeCutting.wishPrompt}),(0,i.jsx)("div",{className:"bw-rule my-3.5","aria-hidden":"true",children:(0,i.jsx)(x.P.span,{className:"block h-1.5 w-1.5 rounded-full bg-[var(--bw-rose)]",animate:{scale:[1,1.5,1],opacity:[.5,1,.5]},transition:{duration:1.8,repeat:1/0,ease:"easeInOut"}})}),(0,i.jsx)("p",{className:"text-sm text-[var(--bw-ink-soft)]",children:t.cakeCutting.wishInstructions})]}),(0,i.jsx)("button",{onClick:()=>{g(!0),b(F(40,6,8)),setTimeout(()=>{e()},2e3),setTimeout(()=>{b([]),p([])},4e3)},disabled:f,className:`bw-btn ${f?"bw-btn--disabled":"bw-btn--primary"} px-8`,children:t.cakeCutting.wishButton})]},"wish")]})})]}),(0,i.jsx)("style",{children:`
        @keyframes sparkle-pop {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          45%  { opacity: 1; transform: translate(-50%, -50%) scale(1.25); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.7) translateY(-44px); }
        }

        @keyframes confetti-fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(540deg); opacity: 0; }
        }

        .animate-sparkle-pop { animation: sparkle-pop 2.2s ease forwards; }
        .animate-confetti-fall { animation: confetti-fall linear forwards; }

        .confetti-piece {
          transform: rotate(45deg);
        }

        /* Cut guide channel */
        .cut-zone {
          border-radius: 999px;
          background: linear-gradient(
            180deg,
            rgba(255, 231, 238, 0.35),
            rgba(255, 231, 238, 0.1)
          );
          border: 1.5px dashed rgba(222, 111, 145, 0.5);
          transition: opacity 260ms ease;
          display: grid;
          place-items: center;
        }

        .cut-zone-line {
          display: block;
          width: 88%;
          height: 2px;
          border-radius: 2px;
          background: repeating-linear-gradient(
            90deg,
            rgba(222, 111, 145, 0.55) 0 8px,
            transparent 8px 16px
          );
          animation: cut-zone-march 1.4s linear infinite;
        }

        @keyframes cut-zone-march {
          to { background-position: 16px 0; }
        }

        /* Small drifting cue that suggests the swipe direction. */
        .cut-zone-hand {
          position: absolute;
          font-size: 15px;
          color: rgba(222, 111, 145, 0.9);
          animation: cut-zone-swipe 2.6s ease-in-out infinite;
        }

        @keyframes cut-zone-swipe {
          0%, 100% { transform: translateX(-38%); opacity: 0.25; }
          50%      { transform: translateX(38%);  opacity: 1; }
        }

        .touch-none {
          touch-action: none;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .cut-zone-line,
          .cut-zone-hand {
            animation: none;
          }
        }
      `})]})},L=({className:e=""})=>(0,i.jsxs)("svg",{viewBox:"0 0 64 64",className:e,fill:"none","aria-hidden":"true",children:[(0,i.jsx)("path",{d:"M40.5 6a26 26 0 1 0 17.2 45.6A28 28 0 0 1 40.5 6Z",fill:"url(#bw-moon-fill)",stroke:"rgba(255,240,200,0.55)",strokeWidth:"1.2"}),(0,i.jsx)("circle",{cx:"26",cy:"24",r:"3.4",fill:"rgba(214,190,130,0.28)"}),(0,i.jsx)("circle",{cx:"20",cy:"38",r:"2.2",fill:"rgba(214,190,130,0.22)"}),(0,i.jsx)("circle",{cx:"31",cy:"42",r:"1.6",fill:"rgba(214,190,130,0.2)"}),(0,i.jsx)("path",{d:"M22 31.5c1.1 1.2 2.9 1.2 4 0M31 31.5c1.1 1.2 2.9 1.2 4 0",stroke:"rgba(120,92,40,0.6)",strokeWidth:"1.5",strokeLinecap:"round"}),(0,i.jsx)("ellipse",{cx:"21",cy:"35.4",rx:"2.4",ry:"1.5",fill:"rgba(244,158,184,0.4)"}),(0,i.jsx)("ellipse",{cx:"35.6",cy:"35.4",rx:"2.4",ry:"1.5",fill:"rgba(244,158,184,0.4)"}),(0,i.jsx)("defs",{children:(0,i.jsxs)("linearGradient",{id:"bw-moon-fill",x1:"10",y1:"6",x2:"52",y2:"58",children:[(0,i.jsx)("stop",{offset:"0%",stopColor:"#fff6d8"}),(0,i.jsx)("stop",{offset:"100%",stopColor:"#f6dfa0"})]})})]}),$=({className:e=""})=>(0,i.jsx)("svg",{viewBox:"0 0 24 24",className:e,fill:"none","aria-hidden":"true",children:(0,i.jsx)("path",{d:"M12 1.5c.6 5.6 4.4 9.4 10 10-5.6.6-9.4 4.4-10 10-.6-5.6-4.4-9.4-10-10 5.6-.6 9.4-4.4 10-10Z",fill:"currentColor"})}),T=({className:e=""})=>(0,i.jsx)("svg",{viewBox:"0 0 24 24",className:e,fill:"none","aria-hidden":"true",children:(0,i.jsx)("path",{d:"m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z",fill:"currentColor"})}),P=({className:e=""})=>(0,i.jsx)("svg",{viewBox:"0 0 64 32",className:e,fill:"none","aria-hidden":"true",children:(0,i.jsx)("path",{d:"M14 27a9 9 0 0 1-.6-18 12.5 12.5 0 0 1 23.4-2.6A8.5 8.5 0 0 1 50 13.4 7 7 0 0 1 49 27H14Z",fill:"currentColor"})}),W=({className:e=""})=>(0,i.jsxs)("svg",{viewBox:"0 0 48 48",className:e,fill:"none","aria-hidden":"true",children:[(0,i.jsx)("rect",{x:"7",y:"20",width:"34",height:"22",rx:"2.5",fill:"#5b4a7d",stroke:"#8574ad",strokeWidth:"1.4"}),(0,i.jsx)("rect",{x:"4.5",y:"13.5",width:"39",height:"8",rx:"2.2",fill:"#6b578f",stroke:"#8574ad",strokeWidth:"1.4"}),(0,i.jsx)("path",{d:"M24 13.5V42",stroke:"#f0a8c0",strokeWidth:"3.2"}),(0,i.jsx)("path",{d:"M4.5 17.5h39",stroke:"#f0a8c0",strokeWidth:"3.2",opacity:".85"}),(0,i.jsx)("path",{d:"M24 13.5S20.6 6.8 17 8c-2.6.9-2.4 5 .8 5.5 2.2.4 6.2 0 6.2 0Zm0 0S27.4 6.8 31 8c2.6.9 2.4 5-.8 5.5-2.2.4-6.2 0-6.2 0Z",fill:"#f0a8c0",stroke:"#ffc9dc",strokeWidth:"1.2",strokeLinejoin:"round"}),(0,i.jsx)("circle",{cx:"24",cy:"13",r:"2.1",fill:"#ffc9dc"})]}),B=({className:e=""})=>(0,i.jsxs)("svg",{viewBox:"0 0 40 48",className:e,fill:"none","aria-hidden":"true",children:[(0,i.jsx)("path",{d:"M20 4 34 40H6L20 4Z",fill:"#4f4076",stroke:"#8574ad",strokeWidth:"1.4",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M13.4 22.5c4.5 1.8 8.7 1.8 13.2 0M10.2 31.5c6.4 2.3 13.2 2.3 19.6 0",stroke:"#f0a8c0",strokeWidth:"1.8",strokeLinecap:"round"}),(0,i.jsx)("ellipse",{cx:"20",cy:"40.6",rx:"14.6",ry:"2.6",fill:"#6b578f"}),(0,i.jsx)("circle",{cx:"20",cy:"4",r:"3.4",fill:"#ffd79a"})]}),F=({className:e=""})=>(0,i.jsxs)("svg",{viewBox:"0 0 72 40",className:e,fill:"none","aria-hidden":"true",children:[(0,i.jsx)("path",{d:"M10 38c-4-9 1-21 12-24 12-3.4 24 1.2 28 9 3 5.8 1.4 12-2 15H10Z",fill:"#4a3d6b",stroke:"#7a68a3",strokeWidth:"1.3"}),(0,i.jsx)("path",{d:"M48 38c7 0 12-3.4 12-8.4 0-3.6-3-5.6-5.6-4.4-2.2 1-2.4 4 0 4.6",stroke:"#7a68a3",strokeWidth:"2.4",strokeLinecap:"round",fill:"none"}),(0,i.jsx)("circle",{cx:"22",cy:"24",r:"10.5",fill:"#54467a",stroke:"#7a68a3",strokeWidth:"1.3"}),(0,i.jsx)("path",{d:"M13.5 17.5 12 9.5l7 4.4ZM30.5 17.5 32 9.5l-7 4.4Z",fill:"#54467a",stroke:"#7a68a3",strokeWidth:"1.3",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M16.4 23.5c1 1.1 2.6 1.1 3.6 0M24.4 23.5c1 1.1 2.6 1.1 3.6 0",stroke:"#c9b8e7",strokeWidth:"1.4",strokeLinecap:"round"}),(0,i.jsx)("path",{d:"M22 26.6a1.4 1.4 0 0 0 1.3-.9",stroke:"#f0a8c0",strokeWidth:"1.2",strokeLinecap:"round"}),(0,i.jsx)("ellipse",{cx:"15.2",cy:"27",rx:"2.2",ry:"1.3",fill:"rgba(244,158,184,0.34)"}),(0,i.jsx)("ellipse",{cx:"28.8",cy:"27",rx:"2.2",ry:"1.3",fill:"rgba(244,158,184,0.34)"})]}),I=({className:e=""})=>(0,i.jsxs)("svg",{viewBox:"0 0 320 40",className:e,fill:"none",preserveAspectRatio:"none","aria-hidden":"true",children:[(0,i.jsx)("path",{d:"M0 6q80 22 160 16T320 4",stroke:"rgba(160,140,200,0.5)",strokeWidth:"1.6",fill:"none"}),[{x:28,y:12,c:"#6b578f"},{x:72,y:17,c:"#7d5f96"},{x:116,y:20,c:"#5b4a7d"},{x:160,y:21,c:"#7d5f96"},{x:204,y:20,c:"#5b4a7d"},{x:248,y:16,c:"#6b578f"},{x:292,y:10,c:"#7d5f96"}].map((e,t)=>(0,i.jsx)("path",{d:`M${e.x-9} ${e.y}h18l-9 15Z`,fill:e.c,stroke:"rgba(190,168,220,0.4)",strokeWidth:"1",strokeLinejoin:"round"},t))]}),U=()=>(0,i.jsxs)("div",{className:"bw-night-decor pointer-events-none absolute inset-0 overflow-hidden",children:[(0,i.jsx)("div",{className:"bw-nd-moon",children:(0,i.jsx)(L,{className:"h-full w-full"})}),(0,i.jsx)("div",{className:"bw-nd-cloud bw-nd-cloud--a",children:(0,i.jsx)(P,{className:"h-full w-full"})}),(0,i.jsx)("div",{className:"bw-nd-cloud bw-nd-cloud--b",children:(0,i.jsx)(P,{className:"h-full w-full"})}),(0,i.jsx)("div",{className:"bw-nd-bunting",children:(0,i.jsx)(I,{className:"h-full w-full"})}),(0,i.jsx)("span",{className:"bw-nd-twinkle bw-nd-twinkle--1",children:(0,i.jsx)($,{className:"h-full w-full"})}),(0,i.jsx)("span",{className:"bw-nd-twinkle bw-nd-twinkle--2",children:(0,i.jsx)(T,{className:"h-full w-full"})}),(0,i.jsx)("span",{className:"bw-nd-twinkle bw-nd-twinkle--3",children:(0,i.jsx)($,{className:"h-full w-full"})}),(0,i.jsx)("span",{className:"bw-nd-twinkle bw-nd-twinkle--4",children:(0,i.jsx)(T,{className:"h-full w-full"})}),(0,i.jsx)("span",{className:"bw-nd-twinkle bw-nd-twinkle--5",children:(0,i.jsx)($,{className:"h-full w-full"})}),(0,i.jsx)("div",{className:"bw-nd-gift",children:(0,i.jsx)(W,{className:"h-full w-full"})}),(0,i.jsx)("div",{className:"bw-nd-hat",children:(0,i.jsx)(B,{className:"h-full w-full"})}),(0,i.jsxs)("div",{className:"bw-nd-cat",children:[(0,i.jsx)(F,{className:"h-full w-full"}),(0,i.jsx)("span",{className:"bw-nd-z bw-nd-z--1",children:"z"}),(0,i.jsx)("span",{className:"bw-nd-z bw-nd-z--2",children:"z"}),(0,i.jsx)("span",{className:"bw-nd-z bw-nd-z--3",children:"z"})]}),(0,i.jsx)("style",{children:`
      /* ── Moon ── */
      .bw-nd-moon {
        position: absolute;
        top: 6%;
        right: 7%;
        width: clamp(56px, 9vw, 92px);
        aspect-ratio: 1;
        filter: drop-shadow(0 0 22px rgba(255, 226, 150, 0.32));
        animation: bw-nd-float 9s ease-in-out infinite;
      }

      /* ── Clouds ── */
      .bw-nd-cloud {
        position: absolute;
        color: rgba(120, 104, 158, 0.3);
        aspect-ratio: 2 / 1;
      }

      .bw-nd-cloud--a {
        top: 15%;
        left: -18%;
        width: clamp(120px, 20vw, 200px);
        animation: bw-nd-drift-r 46s linear infinite;
      }

      .bw-nd-cloud--b {
        top: 30%;
        left: -30%;
        width: clamp(80px, 13vw, 140px);
        opacity: 0.7;
        animation: bw-nd-drift-r 62s linear infinite;
        animation-delay: -22s;
      }

      @keyframes bw-nd-drift-r {
        from { transform: translateX(0); }
        to   { transform: translateX(160vw); }
      }

      /* ── Bunting ── */
      .bw-nd-bunting {
        position: absolute;
        top: 0;
        left: -2%;
        width: 104%;
        height: clamp(30px, 6vw, 46px);
        transform-origin: 50% 0;
        animation: bw-nd-sway 7s ease-in-out infinite;
      }

      @keyframes bw-nd-sway {
        0%, 100% { transform: rotate(-0.5deg); }
        50%      { transform: rotate(0.5deg); }
      }

      /* ── Twinkles ── */
      .bw-nd-twinkle {
        position: absolute;
        display: block;
        color: rgba(255, 244, 214, 0.9);
        opacity: 0;
        animation: bw-nd-twinkle 3.6s ease-in-out infinite;
        filter: drop-shadow(0 0 5px rgba(255, 236, 180, 0.7));
      }

      .bw-nd-twinkle--1 { top: 13%; left: 14%; width: 18px; height: 18px; animation-delay: 0s; }
      .bw-nd-twinkle--2 { top: 26%; left: 78%; width: 13px; height: 13px; animation-delay: .7s; color: rgba(214,190,255,.9); }
      .bw-nd-twinkle--3 { top: 44%; left: 8%;  width: 14px; height: 14px; animation-delay: 1.5s; }
      .bw-nd-twinkle--4 { top: 9%;  left: 46%; width: 11px; height: 11px; animation-delay: 2.2s; color: rgba(255,200,224,.85); }
      .bw-nd-twinkle--5 { top: 36%; left: 62%; width: 15px; height: 15px; animation-delay: 2.9s; }

      @keyframes bw-nd-twinkle {
        0%, 100% { opacity: 0;   transform: scale(0.6) rotate(0deg); }
        50%      { opacity: 0.95; transform: scale(1) rotate(45deg); }
      }

      /* ── Floor props ── */
      .bw-nd-gift {
        position: absolute;
        bottom: 15%;
        left: 9%;
        width: clamp(46px, 7vw, 70px);
        aspect-ratio: 1;
        animation: bw-nd-float 6.5s ease-in-out infinite;
      }

      .bw-nd-hat {
        position: absolute;
        bottom: 16%;
        right: 13%;
        width: clamp(30px, 4.6vw, 46px);
        aspect-ratio: 40 / 48;
        animation: bw-nd-float 7.6s ease-in-out infinite;
        animation-delay: -2s;
      }

      .bw-nd-cat {
        position: absolute;
        bottom: 14%;
        right: 24%;
        width: clamp(66px, 10vw, 104px);
        aspect-ratio: 72 / 40;
      }

      @keyframes bw-nd-float {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-6px); }
      }

      /* ── Sleepy z's ── */
      .bw-nd-z {
        position: absolute;
        top: -6px;
        left: 26%;
        font-family: 'Fraunces', serif;
        font-style: italic;
        font-weight: 600;
        color: rgba(201, 184, 231, 0.85);
        opacity: 0;
        animation: bw-nd-zzz 4.2s ease-in-out infinite;
      }

      .bw-nd-z--1 { font-size: 11px; animation-delay: 0s; }
      .bw-nd-z--2 { font-size: 14px; animation-delay: 1.4s; }
      .bw-nd-z--3 { font-size: 17px; animation-delay: 2.8s; }

      @keyframes bw-nd-zzz {
        0%   { opacity: 0; transform: translate(0, 0) rotate(-6deg); }
        30%  { opacity: 0.9; }
        100% { opacity: 0; transform: translate(16px, -30px) rotate(12deg); }
      }

      /* Keep the floor props clear of the button stack on short screens. */
      @media (max-height: 680px) {
        .bw-nd-gift, .bw-nd-hat, .bw-nd-cat { display: none; }
      }

      @media (prefers-reduced-motion: reduce) {
        .bw-nd-moon,
        .bw-nd-cloud,
        .bw-nd-bunting,
        .bw-nd-gift,
        .bw-nd-hat,
        .bw-nd-z {
          animation: none;
        }
        .bw-nd-twinkle { animation: none; opacity: 0.8; }
        .bw-nd-z { opacity: 0.55; }
      }
    `})]}),A=()=>{let e=w(),[t,a]=(0,s.useState)(0),[r,n]=(0,s.useState)(!1),[l,o]=(0,s.useState)(null),[d,c]=(0,s.useState)(!1),[p,u]=(0,s.useState)(!1),{play:b}=(()=>{let e=(0,s.useContext)(M);if(!e)throw Error("useAudio must be used within AudioProvider");return e})(),f=(0,h.Zp)();(0,s.useEffect)(()=>{let e=()=>c(window.innerWidth<640);return e(),u(!0),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]);let g=d?8:11,y=d?10:16,j=e.surprise.buttonLabels,v=e.surprise.palettes.lights,k=e.surprise.palettes.balloons,N=(0,s.useMemo)(()=>p?Array.from({length:54},(e,t)=>({id:t,top:`${86*Math.random()}%`,left:`${100*Math.random()}%`,size:t%9==0?2.4:1.3,opacity:.55*Math.random()+.25,twinkle:2.2+3.4*Math.random(),delay:4*Math.random()})):[],[p]),C=(0,s.useMemo)(()=>Array.from({length:g},(e,t)=>({id:t,left:`${6+88/(g-1)*t}%`,color:v[t%v.length],delay:.08*t,sway:t%2==0?-3.5:3.5,drop:(d?32:44)+t%3*(d?6:8),bulbWidth:d?21:27,bulbHeight:d?30:40})),[d,g,v]),S=(0,s.useMemo)(()=>p?Array.from({length:y},(e,t)=>{let a=k[t%k.length];return{id:t,left:5+90*Math.random(),drift:(28*Math.random()+10)*(Math.random()>.5?1:-1),duration:9+4*Math.random(),delay:.2*t,scale:d?.75+.18*Math.random():.92+.22*Math.random(),...a}}):[],[y,k,d,p]);return t>=5?(0,i.jsx)(z,{onNext:()=>f("/message")}):(0,i.jsxs)("div",{className:"relative min-h-screen overflow-hidden px-4 py-8 sm:px-6",children:[(0,i.jsx)("div",{className:"absolute inset-0 transition-opacity duration-[1400ms] ease-out",style:{opacity:+!r,background:"radial-gradient(ellipse 120% 80% at 50% -10%, #2a2142 0%, #1a1430 42%, #120d20 100%)"}}),(0,i.jsx)("div",{className:"absolute inset-0 transition-opacity duration-[1400ms] ease-out",style:{opacity:+!!r,background:"radial-gradient(ellipse 120% 90% at 50% 0%, #fffdfb 0%, #fff6f1 40%, #ffeef4 100%)"}}),(0,i.jsx)(m.N,{children:!r&&(0,i.jsxs)(x.P.div,{className:"pointer-events-none absolute inset-0",initial:{opacity:1},exit:{opacity:0},transition:{duration:1.1,ease:"easeOut"},children:[(0,i.jsx)("div",{className:"absolute -right-16 -top-16 h-80 w-80 rounded-full blur-3xl",style:{background:"rgba(150, 160, 220, 0.16)"}}),(0,i.jsx)(U,{}),N.map(e=>(0,i.jsx)(x.P.span,{className:"absolute rounded-full bg-white",style:{top:e.top,left:e.left,width:`${e.size}px`,height:`${e.size}px`,boxShadow:"0 0 4px rgba(255,255,255,0.8)"},animate:{opacity:[.35*e.opacity,e.opacity,.35*e.opacity]},transition:{duration:e.twinkle,repeat:1/0,delay:e.delay,ease:"easeInOut"}},e.id)),(0,i.jsx)("div",{className:"absolute inset-0",style:{background:"radial-gradient(ellipse 70% 55% at 50% 45%, transparent 30%, rgba(6, 4, 14, 0.62) 100%)"}})]},"night")}),(0,i.jsx)(m.N,{children:!r&&(0,i.jsxs)(x.P.div,{className:"pointer-events-none absolute inset-x-0 top-[26%] z-10 px-6 text-center",initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0,y:-12},transition:{duration:.8,delay:.25,ease:[.22,1,.36,1]},children:[(0,i.jsx)("p",{className:"text-[11px] font-bold uppercase tracking-[0.32em]",style:{color:"rgba(180, 166, 198, 0.75)"},children:"shhh"}),(0,i.jsx)(x.P.p,{className:"mx-auto mt-3 max-w-md font-['Fraunces',serif] text-2xl font-semibold leading-snug sm:text-3xl",style:{color:"var(--bw-night-ink, #efe6f5)"},animate:{opacity:[.72,1,.72]},transition:{duration:3.4,repeat:1/0,ease:"easeInOut"},children:"The room is dark."})]},"dark-copy")}),r&&(0,i.jsx)("div",{className:"absolute left-0 right-0 top-0 z-20 mx-auto w-full max-w-5xl px-3 sm:px-8",children:(0,i.jsxs)("div",{className:"relative h-44 sm:h-52",children:[(0,i.jsx)("svg",{className:"absolute inset-x-0 top-0 h-14 w-full sm:h-16",viewBox:"0 0 100 20",preserveAspectRatio:"none","aria-hidden":"true",children:(0,i.jsx)("path",{d:"M0,3 Q12,18 25,8 T50,10 T75,7 T100,6",stroke:"rgba(120, 92, 104, 0.5)",strokeWidth:"1.2",fill:"none"})}),C.map((e,t)=>{let a=l===e.id;return(0,i.jsxs)(x.P.button,{type:"button",className:"absolute top-0 h-40 w-10 -translate-x-1/2 cursor-pointer bg-transparent sm:h-48 sm:w-12",style:{left:e.left},"aria-label":`Interactive bulb ${e.id+1}`,onMouseEnter:()=>o(e.id),onMouseLeave:()=>o(null),onFocus:()=>o(e.id),onBlur:()=>o(null),onClick:()=>o(t=>t===e.id?null:e.id),initial:{opacity:0,y:-18},animate:{opacity:1,y:0,rotate:[0,e.sway,0,-e.sway/1.4,0]},transition:{opacity:{duration:.35,delay:.055*t},y:{type:"spring",stiffness:200,damping:14,delay:.055*t},rotate:{duration:4.8,repeat:1/0,delay:e.delay+.5,ease:"easeInOut"}},children:[(0,i.jsx)("span",{className:"absolute left-1/2 top-0 w-[1.5px] -translate-x-1/2 rounded-full",style:{height:`${e.drop}px`,background:"rgba(120, 92, 104, 0.55)"}}),(0,i.jsx)("span",{className:"absolute left-1/2 -translate-x-1/2 rounded-[4px]",style:{top:`${e.drop-3}px`,width:"9px",height:"5px",background:"linear-gradient(180deg, #d8ccd0, #a99098)"}}),(0,i.jsx)("span",{className:"absolute left-1/2 -translate-x-1/2 rounded-[5px]",style:{top:`${e.drop+1}px`,width:"14px",height:"9px",background:"linear-gradient(180deg, #c4b2b8, #8e747d)"}}),(0,i.jsx)("span",{className:"absolute left-1/2 -translate-x-1/2 rounded-t-[4px]",style:{top:`${e.drop+8}px`,width:"10px",height:"4px",background:"#7a626b"}}),(0,i.jsx)(x.P.span,{className:"absolute left-1/2 -translate-x-1/2 rounded-full",style:{top:`${e.drop+6}px`,width:`${e.bulbWidth+54}px`,height:`${e.bulbHeight+54}px`,backgroundColor:e.color,filter:"blur(26px)"},animate:{opacity:a?[.34,.6,.34]:[.16,.28,.16],scale:a?[1,1.22,1]:[1,1.08,1]},transition:{duration:a?1:2.6,repeat:1/0,delay:e.delay,ease:"easeInOut"}}),(0,i.jsx)(x.P.span,{className:"absolute left-1/2 -translate-x-1/2 rounded-full blur-lg",style:{top:`${e.drop+13}px`,width:`${e.bulbWidth+26}px`,height:`${e.bulbHeight+26}px`,backgroundColor:e.color},animate:{scale:a?[1,1.28,1]:[1,1.1,1],opacity:a?[.45,.8,.45]:[.24,.42,.24]},transition:{duration:a?.9:2.2,repeat:1/0,delay:e.delay,ease:"easeInOut"}}),(0,i.jsx)(x.P.span,{className:"absolute left-1/2 -translate-x-1/2",style:{top:`${e.drop+13}px`,width:`${e.bulbWidth}px`,height:`${e.bulbHeight}px`,borderRadius:"50% 50% 48% 48% / 38% 38% 62% 62%",border:"1px solid rgba(255,255,255,0.5)",background:`radial-gradient(circle at 32% 24%, rgba(255,255,255,0.95), rgba(255,255,255,0.15) 42%), linear-gradient(180deg, ${e.color}f0, ${e.color}c8)`,boxShadow:a?`0 0 26px 5px ${e.color}99, 0 0 10px ${e.color}, inset 0 -5px 8px rgba(0,0,0,0.16)`:`0 0 12px 2px ${e.color}5e, 0 0 5px ${e.color}90, inset 0 -4px 7px rgba(0,0,0,0.18)`},animate:{opacity:a?[.94,1,.94]:[.82,.95,.82],scale:a?[1,1.09,1]:[1,1.02,1]},transition:{duration:a?.85:1.6,repeat:1/0,delay:e.delay,ease:"easeInOut"}}),(0,i.jsx)("span",{className:"absolute left-1/2 rounded-full bg-white/85",style:{top:`${e.drop+20}px`,width:"5px",height:"5px",transform:"translateX(-80%)",filter:"blur(0.5px)"}}),(0,i.jsx)(x.P.span,{className:"absolute left-1/2 rounded-full",style:{border:"1px solid rgba(255,255,255,0.55)",top:`${e.drop+17}px`,left:"50%",width:`${e.bulbWidth+12}px`,height:`${e.bulbHeight+12}px`,transform:"translateX(-50%)"},animate:{scale:a?[.85,1.45,.85]:[.85,1.06,.85],opacity:a?[0,.45,0]:[0,.14,0]},transition:{duration:a?.95:2.4,repeat:1/0,delay:e.delay,ease:"easeOut"}})]},e.id)})]})}),(0,i.jsxs)(m.N,{children:[t>=2&&e.surprise.musicCorner.topImage?(0,i.jsx)(x.P.img,{src:e.surprise.musicCorner.topImage,alt:e.surprise.musicCorner.topAlt,initial:{opacity:0,scale:.8,y:-12,rotate:6},animate:{opacity:.95,scale:1,y:0,rotate:0},exit:{opacity:0,scale:.9},transition:{type:"spring",stiffness:170,damping:16},className:"pointer-events-none absolute right-1 top-12 z-10 h-auto w-auto max-h-32 max-w-[8.5rem] object-contain drop-shadow-[0_10px_22px_rgba(120,62,82,0.18)] sm:right-3 sm:max-h-44 sm:max-w-[11rem]"},"music-gif-top"):null,t>=2&&e.surprise.musicCorner.bottomImage?(0,i.jsx)(x.P.img,{src:e.surprise.musicCorner.bottomImage,alt:e.surprise.musicCorner.bottomAlt,initial:{opacity:0,scale:.8,y:12,rotate:-6},animate:{opacity:.95,scale:1,y:0,rotate:0},exit:{opacity:0,scale:.9},transition:{type:"spring",stiffness:170,damping:16,delay:.1},className:"pointer-events-none absolute bottom-20 left-1 z-10 h-auto w-auto max-h-32 max-w-[8.5rem] object-contain drop-shadow-[0_10px_22px_rgba(120,62,82,0.18)] sm:bottom-16 sm:left-3 sm:max-h-44 sm:max-w-[11rem]"},"music-gif-bottom"):null]}),(0,i.jsx)(m.N,{children:t>=3&&(0,i.jsx)(x.P.div,{initial:{y:-40,opacity:0,scale:.96},animate:{y:0,opacity:1,scale:1},transition:{type:"spring",stiffness:120,damping:18,mass:.9},className:"relative z-10 mt-32 flex justify-center px-4 text-center sm:mt-28",children:(0,i.jsxs)("div",{className:"romantic-shell max-w-lg px-7 py-6 sm:px-9 sm:py-7",children:[(0,i.jsx)("p",{className:"bw-eyebrow",children:"celebration mode"}),(0,i.jsx)("h1",{className:"warm-heading mt-2.5 font-['Fraunces',serif] text-[2rem] font-semibold leading-[1.1] sm:text-[3rem]",children:e.surprise.bannerHeadline}),e.surprise.bannerSubheadline?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"bw-rule my-4","aria-hidden":"true",children:(0,i.jsx)("span",{className:"block h-1 w-1 rounded-full bg-[var(--bw-rose)]"})}),(0,i.jsx)("p",{className:"mx-auto max-w-sm text-sm leading-relaxed text-[var(--bw-ink-soft)] sm:text-[0.95rem]",children:e.surprise.bannerSubheadline})]}):null]})},"banner")}),t>=4&&(0,i.jsx)("div",{className:"pointer-events-none absolute inset-0",children:S.map(e=>(0,i.jsx)(x.P.div,{className:"absolute",initial:{bottom:"-18vh",left:`${e.left}%`},animate:{bottom:"120vh",x:[0,e.drift,-(.35*e.drift),.6*e.drift,0],rotate:[-2,4,-3,2,-1]},transition:{duration:e.duration,repeat:1/0,delay:e.delay,ease:"linear"},children:(0,i.jsxs)("div",{className:"relative",style:{transform:`scale(${e.scale})`},children:[(0,i.jsx)("div",{className:"h-16 w-12 rounded-[52%_52%_48%_48%/62%_62%_38%_38%]",style:{background:`radial-gradient(circle at 30% 22%, rgba(255,255,255,0.85), rgba(255,255,255,0.1) 36%), linear-gradient(180deg, ${e.top}, ${e.bottom})`,boxShadow:`0 10px 22px ${e.bottom}55, inset -4px -6px 12px rgba(0,0,0,0.06)`}}),(0,i.jsx)("div",{className:"absolute right-[7px] top-6 h-5 w-1.5 rounded-full bg-white/35"}),(0,i.jsx)("div",{className:"absolute left-1/2 top-[56px] h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px]",style:{backgroundColor:e.knot}}),(0,i.jsx)("svg",{className:"absolute left-1/2 top-[64px] -translate-x-1/2",width:"16",height:"74",viewBox:"0 0 16 74","aria-hidden":"true",children:(0,i.jsx)("path",{d:"M8 0 C3 16 12 28 7 44 C3 57 10 66 8 74",stroke:"rgba(150, 120, 132, 0.6)",strokeWidth:"1.1",fill:"none"})})]})},e.id))}),(0,i.jsxs)("div",{className:"absolute inset-x-0 top-[62%] z-30 flex flex-col items-center gap-4 px-4 sm:top-[66%]",children:[(0,i.jsx)(x.P.button,{onClick:()=>{if(0===t)n(!0);else if(1===t)try{b()}catch{}a(e=>e+1)},className:`bw-btn w-full max-w-xs py-3.5 text-sm md:text-base ${r?"bw-btn--primary":"bw-btn--night"}`,whileHover:{scale:1.03},whileTap:{scale:.97},style:{transformOrigin:"center"},children:(0,i.jsx)(m.N,{mode:"wait",children:(0,i.jsx)(x.P.span,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},transition:{duration:.24,ease:[.22,1,.36,1]},children:j[t]},t)})}),(0,i.jsx)("div",{className:"flex items-center gap-1.5",children:j.map((e,a)=>(0,i.jsx)(x.P.span,{className:"block h-1 rounded-full",animate:{width:a===t?18:6,backgroundColor:a<t||a===t?r?"rgba(222,111,145,0.9)":"rgba(212,190,240,0.85)":r?"rgba(222,111,145,0.22)":"rgba(180,166,198,0.28)"},transition:{duration:.4,ease:[.22,1,.36,1]}},a))})]})]})},O=[({className:e=""})=>(0,i.jsxs)("svg",{viewBox:"0 0 24 24",className:e,fill:"none","aria-hidden":"true",children:[(0,i.jsx)("path",{d:"M3.5 11h17v8.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V11Z",fill:"currentColor",opacity:".18"}),(0,i.jsx)("path",{d:"M2.5 7.5h19V11h-19V7.5Z",fill:"currentColor",opacity:".32"}),(0,i.jsx)("path",{d:"M12 7.5V21M2.5 7.5h19V11h-19V7.5ZM3.5 11h17v8.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V11Z",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M12 7.5S9.8 3 7.6 3.6C6 4 5.9 6.3 7.4 7.1c1.2.6 4.6.4 4.6.4Zm0 0S14.2 3 16.4 3.6C18 4 18.1 6.3 16.6 7.1c-1.2.6-4.6.4-4.6.4Z",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"})]}),({className:e=""})=>(0,i.jsxs)("svg",{viewBox:"0 0 24 24",className:e,fill:"none","aria-hidden":"true",children:[(0,i.jsx)("path",{d:"M5.5 12h13l-1.4 7.6a1.6 1.6 0 0 1-1.6 1.4H8.5a1.6 1.6 0 0 1-1.6-1.4L5.5 12Z",fill:"currentColor",opacity:".18",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M6.2 12a3.1 3.1 0 0 1 .5-6.1 3.7 3.7 0 0 1 7-1.2 3.2 3.2 0 0 1 4.3 3.2 3.1 3.1 0 0 1-.2 4.1",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M12 2.4v1.8",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"})]}),({className:e=""})=>(0,i.jsxs)("svg",{viewBox:"0 0 24 24",className:e,fill:"none","aria-hidden":"true",children:[(0,i.jsx)("path",{d:"M12 2.8c3.2 0 5.6 2.6 5.6 6 0 3.9-3.4 7.3-5.6 7.3S6.4 12.7 6.4 8.8c0-3.4 2.4-6 5.6-6Z",fill:"currentColor",opacity:".18",stroke:"currentColor",strokeWidth:"1.4"}),(0,i.jsx)("path",{d:"m11 16.1.9 1.6h.2l.9-1.6",stroke:"currentColor",strokeWidth:"1.4",strokeLinejoin:"round"}),(0,i.jsx)("path",{d:"M12 17.7c0 2 1.8 1.8 1.8 3.5",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"})]})],D=({index:e})=>{let t=O[e%O.length];return(0,i.jsx)("span",{className:"bw-sticker","aria-hidden":"true",children:(0,i.jsx)(t,{className:"h-4 w-4"})})},H=({card:e,index:t,isFlipped:a,onFlip:s,labels:r})=>(0,i.jsx)("button",{type:"button",className:`bw-flip ${a?"is-flipped":""}`,style:{animationDelay:`${90*t}ms`},onClick:s,"aria-label":`Flip card ${e.id}`,"aria-pressed":a,children:(0,i.jsxs)("span",{className:"bw-flip-inner",children:[(0,i.jsxs)("span",{className:"bw-flip-face bw-flip-front",children:[(0,i.jsxs)("span",{className:"bw-photo",children:[(0,i.jsx)("img",{src:e.image,alt:e.alt,loading:"lazy",decoding:"async"}),(0,i.jsx)("span",{className:`bw-photo-tint ${e.tintClass}`})]}),(0,i.jsx)(D,{index:t}),(0,i.jsx)("span",{className:"bw-flip-foot",children:(0,i.jsxs)("span",{className:"bw-tap",children:[r.tap,(0,i.jsx)("svg",{viewBox:"0 0 24 24",className:"h-3 w-3",fill:"none","aria-hidden":"true",children:(0,i.jsx)("path",{d:"M6 12h12m0 0-4.5-4.5M18 12l-4.5 4.5",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})})]})})]}),(0,i.jsxs)("span",{className:"bw-flip-face bw-flip-back",children:[(0,i.jsxs)("span",{className:"bw-back-top",children:[(0,i.jsx)("span",{className:"bw-back-no",children:String(e.id).padStart(2,"0")}),(0,i.jsx)("span",{className:"bw-back-rule"}),(0,i.jsx)("svg",{viewBox:"0 0 24 24",className:"h-3 w-3 text-[var(--bw-rose)]",fill:"currentColor","aria-hidden":"true",children:(0,i.jsx)("path",{d:"M12 21s-8-5.2-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.6C20 15.8 12 21 12 21z"})})]}),(0,i.jsx)("span",{className:"bw-back-body mac-scroll",children:e.message}),(0,i.jsx)("span",{className:"bw-back-foot",children:r.flipBack})]})]})}),E=({onNext:e})=>{let t=w(),[a,r]=(0,s.useState)([]),[n,l]=(0,s.useState)(!1),o=t.cards.items.map(e=>({...e})),d=a.length===o.length;(0,s.useEffect)(()=>{if(d&&a.length>0){let e=window.setTimeout(()=>l(!0),800);return()=>window.clearTimeout(e)}},[d,a.length]);let c=()=>l(!1),p=0===a.length?t.cards.progress.start:d?t.cards.progress.complete:t.cards.progress.discovered(a.length,o.length);return(0,i.jsxs)("div",{className:"font-display relative flex min-h-screen w-full flex-col items-center justify-center px-3 py-10 sm:px-4 md:px-6",children:[(0,i.jsx)(u,{}),(0,i.jsxs)("div",{className:"relative z-10 w-full max-w-4xl",children:[(0,i.jsxs)("div",{className:"mb-6 text-center",children:[(0,i.jsx)("h2",{className:"warm-heading font-['Fraunces',serif] text-[1.6rem] font-semibold leading-tight sm:text-[2.1rem]",children:t.cards.heading}),t.cards.subheading?(0,i.jsx)("p",{className:"mt-1.5 text-sm text-[var(--bw-ink-soft)]",children:t.cards.subheading}):null]}),(0,i.jsx)("div",{className:"bw-card-grid",children:o.map((e,s)=>(0,i.jsx)(H,{card:e,index:s,isFlipped:a.includes(e.id),onFlip:()=>{var t;return t=e.id,void r(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t])},labels:{tap:t.cards.tapLabel,flipBack:t.cards.tapToFlipBackLabel,seal:t.cards.sealLabel}},e.id))}),(0,i.jsxs)("div",{className:"mx-auto mt-6 max-w-xs rounded-full border border-[var(--bw-hairline)] bg-white/70 px-5 py-2.5 text-center",children:[(0,i.jsx)("p",{className:"text-[12.5px] font-semibold text-[var(--bw-ink-soft)]",children:p}),(0,i.jsx)("div",{className:"mx-auto mt-2 w-full max-w-[13rem]",children:(0,i.jsx)("div",{className:"bw-meter",children:(0,i.jsx)("div",{className:"bw-meter-fill",style:{width:`${a.length/o.length*100}%`}})})})]})]}),(0,i.jsx)(m.N,{children:n&&(0,i.jsxs)(x.P.div,{className:"fixed inset-0 left-0 top-0 z-50 grid place-items-center p-4",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.25},children:[(0,i.jsx)("div",{className:"absolute inset-0 bg-[#2b1d1f]/45 backdrop-blur-md",onClick:c,"aria-hidden":"true"}),(0,i.jsxs)(x.P.div,{role:"dialog","aria-modal":"true",className:"romantic-shell relative w-full max-w-sm p-7 text-center sm:p-8",initial:{opacity:0,y:22,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:14,scale:.97},transition:{type:"spring",stiffness:160,damping:20},children:[(0,i.jsx)("span",{className:"mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--bw-rose-soft)] to-[var(--bw-amber-soft)] text-[1.5rem]",children:t.cards.popup.icon}),(0,i.jsx)("h3",{className:"warm-heading font-['Fraunces',serif] text-xl font-semibold leading-snug sm:text-2xl",children:t.cards.popup.title}),(0,i.jsx)("div",{className:"bw-rule my-3.5","aria-hidden":"true",children:(0,i.jsx)("span",{className:"block h-1 w-1 rounded-full bg-[var(--bw-rose)]"})}),(0,i.jsx)("p",{className:"text-sm leading-relaxed text-[var(--bw-ink-soft)]",children:t.cards.popup.message}),(0,i.jsxs)("div",{className:"mt-6 space-y-2.5",children:[(0,i.jsx)("button",{onClick:()=>{c(),e()},className:"bw-btn bw-btn--primary w-full",children:t.cards.popup.openFinal}),(0,i.jsx)("button",{onClick:c,className:"w-full py-1.5 text-xs font-semibold text-[var(--bw-ink-faint)] transition-colors hover:text-[var(--bw-rose-deep)]",children:t.cards.popup.stay})]})]})]})})]})},X=()=>{let e=w(),[t,a]=(0,s.useState)(!1),r=e.message.body.split("\n\n"),n=(0,h.Zp)();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(E,{onNext:()=>a(!0)}),(0,i.jsx)(m.N,{children:t&&(0,i.jsxs)(x.P.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},className:"fixed inset-0 z-[70] flex items-center justify-center px-4 py-6",children:[(0,i.jsx)("div",{className:"absolute inset-0 bg-[#2b1d1f]/45 backdrop-blur-md",onClick:()=>a(!1),"aria-hidden":"true"}),(0,i.jsxs)(x.P.div,{role:"dialog","aria-modal":"true",initial:{opacity:0,y:30,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:20,scale:.96},transition:{type:"spring",stiffness:130,damping:19},className:"romantic-shell relative mx-auto w-full max-w-2xl",children:[(0,i.jsxs)("div",{className:"flex items-center justify-between gap-3 border-b border-[var(--bw-hairline-soft)] px-5 py-3.5",children:[(0,i.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,i.jsx)("span",{className:"h-2 w-2 rounded-full bg-[#f0a8ba]"}),(0,i.jsx)("span",{className:"h-2 w-2 rounded-full bg-[#f2c894]"}),(0,i.jsx)("span",{className:"h-2 w-2 rounded-full bg-[#b9d6c4]"})]}),(0,i.jsx)("p",{className:"bw-eyebrow truncate text-[10px]",children:e.message.windowFileName}),(0,i.jsx)("button",{onClick:()=>a(!1),className:"rounded-full border border-[var(--bw-hairline)] bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--bw-ink-faint)] transition-colors hover:border-[var(--bw-rose)] hover:text-[var(--bw-rose-deep)]",children:e.message.closeLabel})]}),(0,i.jsxs)("div",{className:"relative px-6 pb-6 pt-7 sm:px-10 sm:pb-8",children:[(0,i.jsx)("div",{className:"pointer-events-none absolute inset-0 opacity-[0.5]",style:{backgroundImage:"repeating-linear-gradient(180deg, transparent 0, transparent 33px, rgba(214,158,174,0.14) 33px, rgba(214,158,174,0.14) 34px)"}}),(0,i.jsxs)("div",{className:"mac-scroll relative max-h-[54vh] overflow-y-auto pr-2",children:[(0,i.jsx)(x.P.p,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.15,duration:.5},className:"mb-7 text-right text-[13px] italic text-[var(--bw-ink-faint)]",children:e.message.date}),(0,i.jsx)(x.P.h1,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.22,duration:.55,ease:[.22,1,.36,1]},className:"warm-heading mb-5 font-['Fraunces',serif] text-[1.6rem] font-semibold leading-tight sm:text-[2rem]",children:e.message.greeting}),(0,i.jsx)("div",{className:"space-y-4 text-[15px] leading-[1.85] text-[var(--bw-ink)] sm:text-base",children:r.map((e,t)=>(0,i.jsx)(x.P.p,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.3+.09*t,duration:.55,ease:[.22,1,.36,1]},className:"first-letter:float-left first-letter:mr-1 first-letter:font-['Fraunces',serif] first-letter:text-[1.35em] first-letter:font-semibold first-letter:leading-[1.1] first-letter:text-[var(--bw-rose)]",children:e},t))}),(0,i.jsxs)(x.P.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.34+.09*r.length,duration:.55,ease:[.22,1,.36,1]},className:"mt-8",children:[(0,i.jsx)("p",{className:"text-[15px] italic text-[var(--bw-ink-soft)] sm:text-base",children:e.message.closing}),(0,i.jsx)("p",{className:"bw-serif-italic mt-2 text-[1.65rem] text-[var(--bw-rose-deep)] sm:text-[2rem]",children:e.message.signature})]})]}),(0,i.jsxs)("div",{className:"relative mt-6 flex items-center justify-between gap-3 border-t border-[var(--bw-hairline-soft)] pt-4",children:[(0,i.jsx)("span",{className:"text-[var(--bw-rose)] opacity-60","aria-hidden":"true",children:(0,i.jsx)("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:(0,i.jsx)("path",{d:"M12 21s-8-5.2-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.6C20 15.8 12 21 12 21z"})})}),(0,i.jsx)("button",{onClick:()=>n("/"),className:"bw-btn bw-btn--ghost px-5 py-2 text-xs",children:e.message.restartLabel})]})]})]})]})})]})},Z=()=>{let e=(0,h.zy)();return(0,i.jsx)(m.N,{mode:"wait",children:(0,i.jsx)(x.P.div,{initial:{opacity:0,filter:"blur(8px)"},animate:{opacity:1,filter:"blur(0px)"},exit:{opacity:0,filter:"blur(8px)"},transition:{duration:.5,ease:[.22,1,.36,1]},children:(0,i.jsxs)(h.BV,{location:e,children:[(0,i.jsx)(h.qh,{path:"/",element:(0,i.jsx)(N,{})}),(0,i.jsx)(h.qh,{path:"/surprise",element:(0,i.jsx)(A,{})}),(0,i.jsx)(h.qh,{path:"/message",element:(0,i.jsx)(X,{})})]})},e.pathname)})};function q({config:e,router:t="browser"}){let a="memory"===t?h.fS:h.Kd;return(0,i.jsx)(g,{config:e,children:(0,i.jsx)(C,{children:(0,i.jsx)(a,{children:(0,i.jsx)(Z,{})})})})}function _({snapshot:e}){let t=(0,s.useMemo)(()=>c(function(e){let t=new Map;for(let a of e)for(let[e,i]of Object.entries(a.values))"string"==typeof i&&p.has(e)&&t.set(e,i);return{...d,...Object.fromEntries(t)}}(e.sections)),[e]);return(0,i.jsx)("div",{className:"bday-wish-root",children:(0,i.jsx)(q,{config:t,router:"memory"})})}}}]);