var mainPage;
var dataStore;
var storeName;
var activeLitem;
var conNames = [];
var consNum ;
const STORE_LOAD_OK = 0;
const STORE_EMPTY = 1;
const STORE_INVALID = 2;
const BOOK = 0;
const CDD = 1;
const DVDD = 2;
const MAGAZINE = 3;

function saveDataStore(){
    var dataArray = [];
    for (item of dataStore) {
        dataArray[dataArray.length] = item.JSONstringify();
    }

    var dataJson = JSON.stringify(dataArray);

    localStorage.setItem(storeName,dataJson);

}

function loadDataStore(){

    var dataArrayJSON = localStorage.getItem(storeName);

    if(dataArrayJSON == null){
        dataStore = [];
        return STORE_EMPTY;

    }

    dataStore = [];

    try {
        var dataArray = JSON.parse(dataArrayJSON);

        for (dataLine of dataArray) {
            dataStore[dataStore.length] = LibraryItem.JSONparse(dataLine);
        }
    }
    catch {
        // if the parse fails make an empty restaurant
        dataStore = [];
        return STORE_INVALID;
    }

    return STORE_LOAD_OK;
}








function clearPage(){
    while(mainPage.children.length > 0)
    mainPage.removeChild(mainPage.children[0])
}



function openPage(title){
    clearPage();
    let titlePar = document.createElement("p");
    titlePar.innerText = title;
    titlePar.className = "pageTitle";
    mainPage.appendChild(titlePar);

}


function showMenu(schema){
    for (const buttonDesc of schema){
        let buttonPar = document.createElement("p");
        buttonPar.className = "menuPar";

        let descriptionPar = document.createElement("p");
        descriptionPar.innerText = buttonDesc.desc;
        descriptionPar.className = "menuButtonCaption";
        buttonPar.appendChild(descriptionPar);

        let button = document.createElement("button");
        button.innerText = buttonDesc.label;
        button.className = "menuButton";
        button.setAttribute("onclick", buttonDesc.func);
        buttonPar.appendChild(button);

        mainPage.appendChild(buttonPar);

    }
}











function doShowMainMenu(){
    openPage("Main Menu");

    showMenu(
        [{ desc: "Show Library items", label: "Show", func: "doshowLibraryitems()" },
        { desc: "Search Library items", label: "Search", func: "dosearchLibraryitems()" },
        { desc: "Register Library item", label: "Register", func: "doRegisterLitem()" },
        { desc: "Unregister Library item", label: "Unregister", func: "doUnregisterItem()" },
        { desc: "Modify Library item", label: "Modify", func: "doModifyLibraryitem()"},
        ]);
}












///////////////////////////////////////아이템 수정
function doModifyLibraryitem(){
    createList("Modify LibraryItem item", dataStore);
    activeLitem = new LibraryItem();
    activeLitem.getsearchHTML(mainPage);

    showMenu(
        [{ desc: "selec by title", label: "select", func: "doModify()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);



    
}

function doModify(){
    let selectName = document.getElementById("item").value;
    dataStore.forEach((item) => {
        if(item.title == selectName){
            doUpdateItem(item.lItemRef);
        }
    });
}
function doUpdateItem(lItemRef) {

    var lref = findRestaurant(lItemRef);

    if (lref == null) {
        return false;
    }

    activeLitem = lref;

    openPage("Update "  + lItemRef);

    lref.getHTML(mainPage);

    lref.sendToHTML();

    showMenu(
        [{ desc: "Save updates", label: "Save", func: "doSaveUpdate()" },
        { desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);

    return true;
}


function doSaveUpdate(){
    activeLitem.loadFromHTML();
    alert(activeLitem.type + " " + activeLitem.stockRef + " updated");
    saveDataStore();
    doShowMainMenu();

}












function findRestaurant(lItemRef) {
    for (let item of dataStore) {
        if (item.lItemRef == lItemRef) {
            return item;
        }
    }
    return null;
}







/////////////////////////////////////////아이템 검색
function dosearchLibraryitems(){
    
    openPage("search item ");
    activeLitem = new LibraryItem();
    activeLitem.getsearchHTML(mainPage);
    showMenu(
        [{ desc: "search by title", label: "search", func: "dosearchitems()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);




    
}

function dosearchitems(){
    let searchTitle =document.getElementById("item").value;
    let searchList = [];


    for(let i = 0 ; i<dataStore.length; i++){
        if(dataStore[i].title == searchTitle){
            searchList.push(dataStore[i]);
            
        }
       
    }
     createList("LibraryItem List", searchList);
     


showMenu(
        [{ desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);



}

function UnregisterItem(){

    let searchName = document.getElementById("item").value;
    let active = false;

    for(let i = 0 ; i < dataStore.length ;i++){
        if(dataStore[i].title == searchName){
            dataStore.splice(i,1);
            alert("아이템 삭제 완료");
            active = true;
            doShowMainMenu();
           return;
        }
        
    }
    if(active == false){
        alert("목록에 없는 item title 입니다.")
    }
}











//////////////////////////////////////////아이템삭제
function doUnregisterItem(){
   
    openPage("Unregister Item ");
    activeLitem = new LibraryItem();
    activeLitem.getsearchHTML(mainPage);
    showMenu(
        [{ desc: "search by title", label: "search", func: "UnregisterItem()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
    
}




/////////////////////////아이템 전체
function doshowLibraryitems(){
    createList("LibraryItem List", dataStore);
    
    
    showMenu(
        [{ desc: "main menu", label: "exit", func: "doShowMainMenu()" }]);

}




function addLibraryItem(LitemClass){
    activeLitem = new LitemClass();

    openPage("Register ");


    activeLitem.getHTML(mainPage);


    showMenu(
        [{ desc: "Save Library Item", label: "Save", func: "doSaveAdd()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
}

function createListElement(item){
    let resultPar = document.createElement("p");

    let openButton = document.createElement("button");
    openButton.innerText = "Update";
    openButton.className = "itemButton";
    let editFunctionCall = "doUpdateItem('" + item.lItemRef + "')";
    openButton.setAttribute("onclick", editFunctionCall);
    resultPar.appendChild(openButton);

    let detailsElement = document.createElement("p");
    detailsElement.innerText = item.getDescription();
    detailsElement.className = "itemList";
    resultPar.appendChild(detailsElement);

    return resultPar;
}

function createConELement(item){
    let resultPar = document.createElement("p");

    let detailsElement = document.createElement("p");  
    detailsElement.innerText+= "contributors  : "
    for(let i = 0 ; i < conNames.length; i++){
        detailsElement.innerText += item.contributors[i].describe_contributor();
    }
    detailsElement.className = "itemList";
    resultPar.appendChild(detailsElement);
    
    


    return resultPar;
     
}




function createList(heading, items){
    openPage(heading);
    for(let item of items){
        let itemPar1 =createListElement(item)
        let itemPar = createConELement(item);
        mainPage.appendChild(itemPar1);
        mainPage.appendChild(itemPar);

    }
    
    

}

/////////////////////////////////////////////////아이템 등록
function doRegisterLitem(){
    openPage("select item ");
    activeLitem = new LibraryItem();


  

    showMenu(
        [
        { desc: "SELECT book", label: "book", func: "selectItem(1)" },
        { desc: "SELECT CD", label: "CD", func: "selectItem(2)" },
        { desc: "SELECT DVD", label: "DVD", func: "selectItem(3)" },
        { desc: "SELECT Magazine", label: "Magazine", func: "selectItem(4)" },
    
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);

    

}



function selectItem(itemtype){
    switch(itemtype){
        case 1:
            activeLitem = new Book();
            break;

        case 2:
            activeLitem = new CD();
            break;

        case 3 :
            activeLitem = new DVD();
            break;

        case 4:
            activeLitem = new Magazine();
            break;

    }

    openPage("regist item ");
    activeLitem.getHTML(mainPage);
    showMenu(
        [{ desc: "Save Library Item", label: "Save", func: "getConsNames()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);


}


function getConsNames(){
    conNames = [];
    consNum = document.getElementById("CNum").value;
    

        activeLitem.getnameListSchma(mainPage,consNum);
        
  
    showMenu(
        [{ desc: "push name", label: "push", func: "pushname()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
    

   
}
function pushname(){
    for(let i = 0 ; i <consNum ; i++){
        let name = document.getElementById("item" + i).value;

        conNames.push(name);

    }
    
    doSaveAdd();
}








function doSaveAdd(){  
    activeLitem.conNames = conNames;
    activeLitem.getContributors();

    activeLitem.loadFromHTML();
    
    activeLitem.lItemRef = LibraryItem.getLargestLitemRef(dataStore) +1;
    
    dataStore[dataStore.length] = activeLitem;
    alert(activeLitem.lItemRef + " added");
    saveDataStore();
    doShowMainMenu();

    
}













function doStartLibrary(mainPageId  ,storeNameToUse){

    mainPage = document.getElementById(mainPageId);
    storeName = storeNameToUse;

    var loadResult = loadDataStore();


    switch (loadResult) {
        case STORE_LOAD_OK:
            break;
        case STORE_EMPTY:
            alert("Empty Library Item created");
            saveDataStore();
            break;
        case STORE_INVALID:
            alert("Store invalid. Empty Library Item created");
            saveDataStore();
            break;
    }














    doShowMainMenu();



}
