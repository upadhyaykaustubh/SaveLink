let myleads = []
let oldleads =[]
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"))
const tabBtn = document.getElementById("tab-btn")

if(leadsFromLocalStorage){
    myleads = leadsFromLocalStorage
    render(myleads)
}
tabBtn.addEventListener("click", function(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
myleads.push(tabs[0].url)
localStorage.getItem("myleads", JSON.stringify(myleads) )
render(myleads)
})
})
inputbtn.addEventListener("click", function()
{
    myleads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myleads",JSON.stringify(myleads))
    render(myleads)
})
deletebtn.addEventListener("dblclick",function() {
    console.log("double clicked")
    localStorage.clear()
    myleads = []
    render(myleads)
})
function render(leads){
    let listitems = ""
    for(let i = 0; i < leads.length; i++){
       listitems += `
       <li>
        <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
        </a>
       </li>
       `
    }
    ulEl.innerHTML = listitems
    
}
