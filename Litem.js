class LibraryItem{
  
    

//lItemRef
static JSONparse(text) {
    var rawObject = JSON.parse(text);
    var result = null;

    switch (rawObject.type) {
        case "book":
            result = new Book();
            break;
        case "CD":
            result = new CD();
            break;
        case "DVD":
            result = new DVD();
            break;
        case "Magazine":
            result = new Magazine();
            break;
    }

    Object.assign(result, rawObject);
    return result;
}
    static getLargestLitemRef(libraryItem){
        if (libraryItem.length == 0){
            return 0
        }
        
        var largest = libraryItem[0].lItemRef;

        for(const lItem of libraryItem){
            if(lItem.lItemRef > largest){
                largest = lItem.lItemRef;

            }
        }

        return largest;

    }
    JSONstringify() {
        return JSON.stringify(this);
    }
    static buildElementsFromSchema(HTMLdisplay,dataSchema){

        for(let item of dataSchema){
            let itemElement = LibraryItem.makeElement(item);
            HTMLdisplay.appendChild(itemElement);
    
        }
    }
    static makeElement(description){

        var inputPar = document.createElement("p");

        var labelElement = document.createElement("label");
        labelElement.innerText = description.prompt + ":";
        labelElement.className = "inputLabel";
        labelElement.setAttribute("for",description.id);
        inputPar.appendChild(labelElement);

        var inputElement;

        switch(description.type){

            case "input":
                inputElement= document.createElement("input");
                inputElement.className  = "inputText";
                break;

        }

        inputElement.setAttribute("id",description.id);

        inputElement.setAttribute("value","");

        inputPar.appendChild(inputElement);

        return inputPar;


    }


  

    static seletitemSchema = [
        { id: "item", prompt: "item", type: "input" },
    ]


  

    constructor(lItemRef, title, UPC,subject,contributors){
        this.lItemRef = lItemRef;
        this.title = title;
        this.UPC = UPC;
        this.subject = subject;
        this.contributors = contributors
        



       

    }

    

    getHTML(containerElementId){
        LibraryItem.buildElementsFromSchema(containerElementId,LibraryItem.LibraryItemSchema);
    
    
    
    }

    getsearchHTML(containerElementId){
        LibraryItem.buildElementsFromSchema(containerElementId,LibraryItem.seletitemSchema);
    
    
    
    }
    getnameListSchma(containerElementId,length){
        let schma =  [];

        

        for(let i =0 ; i<length*1 ; i++){
            schma.push({ id: "item" + i, prompt: "item"+i, type: "input" },)
        
       
        

    }
    LibraryItem.buildElementsFromSchema(containerElementId,schma);

}

sendToHTML() {
    // work through each of the restaurants in the object
    for (let item in this) {
        if ( item == "lItemRef" || item == "contributors"|| item =="conNames"|| item =="CNum") {
            // don't add the type or rstrntkref to the HTML
            continue;
        }
        // get the element to send to
        let itemElement = document.getElementById(item);
        // set the element to the value in this object
        itemElement.value = this[item];
    }
}







    loadFromHTML() {
        // work through each of the restaurants in the object
        for (let item in this) {
    
            if ( item == "lItemRef" || item =="contributors" || item =="conNames") {
                // don't load the type or stockref from the HTML
                continue;
            }
            // get the element to load from
            let itemElement = document.getElementById(item);
         

            // set the element to the value in this object
            this[item] = itemElement.value;
        }
    }

    getSeletitemHTML(containerElementId){
        LibraryItem.buildElementsFromSchema(containerElementId,LibraryItem.seletitemSchema);
    }

    getSeletitemHTML(containerElementId){
        LibraryItem.buildElementsFromSchema(containerElementId,LibraryItem.seletitemSchema);
    }
 


}


















class Book extends LibraryItem{
   

    constructor(lItemRef, title, UPC,subject , ISBN ,DDS_number,conNames,contributors){
        super(lItemRef, title, UPC,subject,contributors);
        this.ISBN = ISBN;
        this.DDS_number = DDS_number;
        this.conNames = conNames;
        


}

getContributors(){
    let contributors = [];
    
        for(let i = 0 ; i <this.conNames.length; i++){
        contributors.push(new ContributorWithType(this.conNames[i],"저자"))}
        this.contributors = contributors;
        }





static LibraryItemSchema = [
    
    { id: "title", prompt: "title", type: "input" },
    { id: "UPC", prompt: "UPC", type: "input" },
    { id: "subject", prompt: "subject", type: "input" },
    { id: "ISBN", prompt: "ISBN", type: "input" },
    { id: "DDS_number", prompt: "DDS_number", type: "input" },
    { id: "CNum", prompt: "CNum", type: "input" },
]




getDescription(){
    var result = "Ref" + this.lItemRef + 
    " type:  book"+
    " title:" + this.title +
    " UPC:" + this.UPC + 
    " subject:" + this.subject+
    " ISBN:" + this.ISBN + 
    " DDS_number:" + this.DDS_number ;
    
    return result;

}

getHTML(containerElementId){
    Book.buildElementsFromSchema(containerElementId,Book.LibraryItemSchema);



}


static buildElementsFromSchema(HTMLdisplay,dataSchema){

    for(let item of dataSchema){
        let itemElement = Book.makeElement(item);
        HTMLdisplay.appendChild(itemElement);

    }
}



}













class CD extends LibraryItem{
    constructor(lItemRef, title, UPC,subject ,conNames,contributors ){
        super(lItemRef, title, UPC,subject,contributors);
        this.conNames = conNames;
        


 
      



}
static   LibraryItemSchema = [
    { id: "title", prompt: "title", type: "input" },
    { id: "UPC", prompt: "UPC", type: "input" },
    { id: "subject", prompt: "subject", type: "input" },
    { id: "CNum", prompt: "CNum", type: "input" },
    
]
static   SearchItemSchema =[
    { id: "search", prompt: "search", type: "input" },
]

getContributors(){
    let contributors = [];
        for(let i = 0 ; i <this.conNames.length; i++){
        contributors.push(new ContributorWithType(this.conNames[i],"작곡가"))}
        this.contributors = contributors;
        }



getDescription(){
    var result = "Ref" + this.lItemRef + 
    " type:  CD"+
    " title:" + this.title +
    " UPC:" + this.UPC + 
    " subject:" + this.subject ;
    
    
    return result;

}
getHTML(containerElementId){
    CD.buildElementsFromSchema(containerElementId,CD.LibraryItemSchema);



}



static buildElementsFromSchema(HTMLdisplay,dataSchema){

    for(let item of dataSchema){
        let itemElement = CD.makeElement(item);
        HTMLdisplay.appendChild(itemElement);

    }
}
}














class DVD extends LibraryItem{
    constructor(lItemRef, title, UPC,subject , genre,conNames,contributors){
        super(lItemRef, title, UPC,subject,contributors);
        this.genre = genre;
        this.conNames = conNames;


     
}
static LibraryItemSchema = [
    { id: "title", prompt: "title", type: "input" },
    { id: "UPC", prompt: "UPC", type: "input" },
    { id: "subject", prompt: "subject", type: "input" },
    { id: "genre", prompt: "genre", type: "input" },
    { id: "CNum", prompt: "CNum", type: "input" },
    

 
]

getContributors(){
    let contributors = [];
        for(let i = 0 ; i <this.conNames.length; i++){
            if(i == 0){
        contributors.push(new ContributorWithType(this.conNames[i],"감독"))}else{
            contributors.push(new ContributorWithType(this.conNames[i],"배우"))
        }
        

        this.contributors = contributors;

        }
    }
getDescription(){
    var result = "Ref" + this.lItemRef + 
    " type:  DVD"+
    " title:" + this.title +
    " UPC:" + this.UPC + 
    " subject:" + this.subject+
    " genre:" + this.genre ;
    
    return result;
    
}
getHTML(containerElementId){
    DVD.buildElementsFromSchema(containerElementId,DVD.LibraryItemSchema);



}
static buildElementsFromSchema(HTMLdisplay,dataSchema){

    for(let item of dataSchema){
        let itemElement = DVD.makeElement(item);
        HTMLdisplay.appendChild(itemElement);

    }
}
}


class Magazine extends LibraryItem{
    constructor(lItemRef, title, UPC,subject , volume,issue,conNames,contributors){
        super(lItemRef, title, UPC,subject,contributors);
        this.volume = volume;
        this.issue = issue;
        
        this.conNames = conNames;
       

      


}
static LibraryItemSchema = [
    { id: "title", prompt: "title", type: "input" },
    { id: "UPC", prompt: "UPC", type: "input" },
    { id: "subject", prompt: "subject", type: "input" },
    { id: "volume", prompt: "volume", type: "input" },
    { id: "issue", prompt: "issue", type: "input" },
    { id: "CNum", prompt: "CNum", type: "input" },

 
]

getContributors(){
    let contributors = [];
        for(let i = 0 ; i <this.conNames.length; i++){
        contributors.push(new ContributorWithType(this.conNames[i],"저자"))}
        this.contributors = contributors;
        }


getDescription(){
    var result = "Ref" + this.lItemRef + 
    " type:  Magazine"+
    " title:" + this.title +
    " UPC:" + this.UPC + 
    " subject:" + this.subject+
    " volume:" + this.volume+
    " issue:" + this.issue ;
    
    return result;

}
getHTML(containerElementId){
    Magazine.buildElementsFromSchema(containerElementId,Magazine.LibraryItemSchema);



}
static buildElementsFromSchema(HTMLdisplay,dataSchema){

    for(let item of dataSchema){
        let itemElement = Magazine.makeElement(item);
        HTMLdisplay.appendChild(itemElement);

    }
}
}









class ContributorWithType{
    
    constructor(name,type){
        this.contributor = new contributor(name);
        this.type = type;
        
    

    }





    describe_contributor(){
    var result = this.contributor.name +"(" + this.type + ")    ";

    
    
    return result;

}
        
    }






class contributor{
    constructor(name){
        this.name = name;

    }
}