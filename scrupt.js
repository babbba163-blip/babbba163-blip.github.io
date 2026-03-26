let answers = {};
let resultKey = "";

// 切換區段
function show(sectionId){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

// 下一步按鈕（必填檢查）
function next(q, val, nextSection){
  if(!val){ alert("請先選擇答案"); return; }
  answers[q] = val;
  show(nextSection);
}

// 簡答必填
function nextText(q, inputId, nextSection){
  const val = document.getElementById(inputId).value.trim();
  if(val===""){ alert("請先填寫"); return; }
  answers[q] = val;
  show(nextSection);
}

// 建彩色按鈕（每題按鈕統一顏色）
function createButtons(sectionId, options, color){
  const container = document.getElementById(sectionId);
  container.innerHTML = ""; // 清空
  options.forEach(opt=>{
    const btn = document.createElement("button");
    btn.textContent = opt.value;
    btn.style.backgroundColor = color;
    btn.onclick = ()=>next(opt.q, opt.value, opt.next);
    container.appendChild(btn);
  });
}

// 分支範例
function branchC(val){
  answers["Q1-3"]=val;
  if(val==="C1") show("section2");
  if(val==="C2") show("section3");
}

function branchF(val){
  answers["Q4-1"]=val;
  if(val==="F1") show("section5");
  if(val==="F2") show("section6");
}

// 決定推薦 key
function selectResult(val){
  resultKey = val;
}

// 提交到 Apps Script 並顯示推薦
function submitAll(){
  fetch("👉你的AppsScript網址", {
    method:"POST",
    body:JSON.stringify({answers, resultKey})
  })
  .then(res=>res.json())
  .then(data=>{
    let html = "<h3>推薦內容</h3>";
    data.forEach(item=>{
      html+= `<div><h4>${item.name}</h4><p>${item.desc}</p><a href="${item.link}" target="_blank">查看</a></div>`;
    });
    html+= `<p>若需要更多資訊請電洽 asd 05 123 4567</p>`;
    document.getElementById("result").innerHTML = html;
    show("section13");
  });
}
