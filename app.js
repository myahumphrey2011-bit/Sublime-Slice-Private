function switchPage(id){
    document.querySelectorAll(".page").forEach(p=>{
        p.classList.remove("active")
    })
    document.getElementById(id).classList.add("active")
}

// Sidebar buttons
document.querySelectorAll(".sidebar button").forEach(btn=>{
    btn.onclick=()=>switchPage(btn.dataset.page)
})

// Dashboard cards clickable
document.querySelectorAll(".card").forEach(card=>{
    card.onclick=()=>switchPage(card.dataset.page)
})

// Save item generic
function saveItem(key,inputId,listId){
    let text=document.getElementById(inputId).value
    if(!text)return
    let data=JSON.parse(localStorage.getItem(key)||"[]")
    data.push(text)
    localStorage.setItem(key,JSON.stringify(data))
    document.getElementById(inputId).value=""
    renderList(key,listId)
}

// Render list
function renderList(key,listId){
    let data=JSON.parse(localStorage.getItem(key)||"[]")
    let list=document.getElementById(listId)
    list.innerHTML=""
    data.forEach((item,i)=>{
        let li=document.createElement("li")
        li.textContent=item
        let del=document.createElement("button")
        del.textContent="🗑"
        del.onclick=()=>{
            data.splice(i,1)
            localStorage.setItem(key,JSON.stringify(data))
            renderList(key,listId)
        }
        li.appendChild(del)
        list.appendChild(li)
    })
}

// Individual save functions
function saveRecipe(){saveItem("recipes","recipeText","recipeList")}
function saveTest(){saveItem("tests","testEntry","testList")}
function saveSignature(){saveItem("signature","signatureIdea","signatureList")}
function saveFlavor(){saveItem("flavors","flavorInput","flavorList")}
function saveCombo(){saveItem("combos","comboInput","comboList")}
function saveIdea(){saveItem("ideas","ideaInput","ideaList")}
function savePackaging(){saveItem("packaging","packagingInput","packagingList")}
function saveContent(){saveItem("content","contentInput","contentList")}
function savePhoto(){saveItem("photo","photoInput","photoList")}
function saveDrop(){saveItem("drops","dropInput","dropList")}
function saveAnalytics(){saveItem("analytics","analyticsInput","analyticsList")}
function saveScience(){saveItem("science","scienceInput","scienceList")}
function saveLearning(){saveItem("learning","learningInput","learningList")}
function saveSystems(){saveItem("systems","systemsInput","systemsList")}

// Cost & Pricing
function calculateProfit(){
    let cost=parseFloat(document.getElementById("cost").value)
    let yieldCount=parseFloat(document.getElementById("yield").value)
    let price=parseFloat(document.getElementById("price").value)
    let costPer=cost/yieldCount
    let profit=price-costPer
    document.getElementById("profitResult").innerText=
    "Cost per cookie: $" + costPer.toFixed(2) +
    " | Profit per cookie: $" + profit.toFixed(2)
}

// Inventory
function addItem(){
    let name=document.getElementById("itemName").value
    let qty=parseInt(document.getElementById("itemQty").value)
    if(!name||isNaN(qty))return
    let items=JSON.parse(localStorage.getItem("inventory")||"[]")
    items.push({name,qty})
    localStorage.setItem("inventory",JSON.stringify(items))
    renderInventory()
}

function renderInventory(){
    let items=JSON.parse(localStorage.getItem("inventory")||"[]")
    let list=document.getElementById("inventoryList")
    list.innerHTML=""
    items.forEach((item,i)=>{
        let li=document.createElement("li")
        li.innerHTML=`
        ${item.name} : ${item.qty}
        <div class="inv-buttons">
        <button onclick="changeQty(${i},1)">+</button>
        <button onclick="changeQty(${i},-1)">-</button>
        <button onclick="resetQty(${i})">🗑</button>
        </div>`
        list.appendChild(li)
    })
}

function changeQty(i,amount){
    let items=JSON.parse(localStorage.getItem("inventory"))
    items[i].qty+=amount
    if(items[i].qty<0)items[i].qty=0
    localStorage.setItem("inventory",JSON.stringify(items))
    renderInventory()
}

function resetQty(i){
    let items=JSON.parse(localStorage.getItem("inventory"))
    items[i].qty=0
    localStorage.setItem("inventory",JSON.stringify(items))
    renderInventory()
}

// Initial render
window.onload=()=>{
    renderList("recipes","recipeList")
    renderList("tests","testList")
    renderList("signature","signatureList")
    renderList("flavors","flavorList")
    renderList("combos","comboList")
    renderList("ideas","ideaList")
    renderList("packaging","packagingList")
    renderList("content","contentList")
    renderList("photo","photoList")
    renderList("drops","dropList")
    renderList("analytics","analyticsList")
    renderList("science","scienceList")
    renderList("learning","learningList")
    renderList("systems","systemsList")
    renderInventory()
}
