let all=document.querySelector(".all");
let table_items = document.querySelector('#table-items');
let btnAddRow = document.querySelector('#addRow')
let btnDeleteRow = document.querySelectorAll('#deleteRow');
let item = document.querySelectorAll('#item');
let unitCost = document.querySelectorAll('#unitCost');
let lineTotal = document.querySelectorAll('#lineTotal');
let quantity = document.querySelectorAll('#quantity');
let download = document.querySelector('#download');
let invoice = document.querySelector('.invoice');
let cashier_name= document.querySelector('#cashier-name');
let cashier_email= document.querySelector('#cashier-email');
let cashier_address= document.querySelector('#cashier-address');
let client_name= document.querySelector('#client-name');
let client_email= document.querySelector('#client-email');
let client_address= document.querySelector('#client-address');
let inputSubtotal = document.querySelector('#subtotal');
let inputTax = document.querySelector("#tax");
let inputDiscount = document.querySelector('#discount');
let inputTotal = document.querySelector("#total"); 
let PreviewPDF = document.querySelector("#Preview")
inputTax.value =0;
inputDiscount.value =0;



/************************************************************************* */
function addRow() {
  // Clone the last row of the table
  const lastRow = table_items.rows[table_items.rows.length - 1];
  const newRow = lastRow.cloneNode(true);
  // Clear the input values in the new row
  const inputs = newRow.querySelectorAll('input');
  inputs.forEach(input => input.value = '');
  // Insert the new row into the table
  table_items.appendChild(newRow);
}
btnAddRow.addEventListener("click", addRow);

/********************    Delete row    *********************************** */

function deleteRow(e) {
  btnDeleteRow = document.querySelectorAll('#deleteRow')
  btnDeleteRow.forEach(element => {
    element.addEventListener("click", deleteRow);
  })
   if(e !=undefined){
 // Get the row to be deleted
  const row = e.target.closest('tr');
// Check if the row is not the first row
if (table_items.rows.length > 2) {
   // in this case we select the table itself so we can delete the tr child from it
    row.parentNode.removeChild(row);
}
   }
}
setInterval(deleteRow, 200);

/**************************Calcul line Total    ****************************** */
  function calcLineTotal(e){
    unitCost = document.querySelectorAll('#unitCost');
    unitCost.forEach(element => {
      element.addEventListener("keyup", calcLineTotal);
 })
 /******/ 
    quantity = document.querySelectorAll('#quantity');
    quantity.forEach(element => {
      element.addEventListener("keyup", calcLineTotal);
})
 /******/
          if( e != undefined){
            let parendelement = e.target.parentNode.parentNode;
          if( e.target.getAttribute('id')!="inputQuantity"){
            parendelement.querySelector('#lineTotal').childNodes[0].value = (e.target.value * parendelement.querySelector('#quantity').childNodes[0].value);
            
          }else{
            parendelement.querySelector('#lineTotal').childNodes[0].value = (e.target.value * parendelement.querySelector('#unitCost').childNodes[0].value);
          }
          }
          
   }
   setInterval(calcLineTotal, 600);
  


/***************** */
             /****CALCULE TAX & DISCOUNT ***** */
             
function calcule_Tax_Discount(){
     let subtotalvalue = 0;
      let inputLineTotal = document.querySelectorAll('#inputLineTotal');  
                inputLineTotal.forEach(element=>{
                  subtotalvalue = subtotalvalue +  +element.value ;
                })
                inputSubtotal.value=subtotalvalue; 
      inputTotal.value = subtotalvalue + (subtotalvalue*(+inputTax.value / 100)) - ( subtotalvalue*(+inputDiscount.value / 100) );
   
                
             }

  setInterval(calcule_Tax_Discount , 200); 
/***************** */
let button=document.querySelector(".x");

/******************************************************* ****************/
let checkINPUTS=()=>{
  if(cashier_name.value == '' || cashier_address.value =='' || cashier_email.value=='' || client_name =='' || client_address.value == '' || client_email.value == '' ){
     return true;
  }
  else{
    return false
  }
     
}
/************************** */
  let generatePDF=(request)=> {
  // Get the values of the input fields;
  let verificationINPUTS=checkINPUTS();
  if(verificationINPUTS == false){
  let itemArray=[];
  let inputItem = document.querySelectorAll('#inputItem');
  inputItem.forEach(element =>{
         itemArray.push(element.value);
     });
     console.log(itemArray);
  let InputUnitCost = document.querySelectorAll('#inpuUnitCost');
  let unitCostArray=[];
  InputUnitCost.forEach(element =>{
    unitCostArray.push(element.value);
     });
     console.log(unitCostArray);
  let inputlineTotal = document.querySelectorAll('#inputLineTotal');
  let lineTotalArray=[];
  inputlineTotal.forEach(element =>{
    lineTotalArray.push(element.value);
     });
     console.log(lineTotalArray);
  let inputQuantity = document.querySelectorAll('#inputQuantity');
  let quantityArray=[];
  inputQuantity.forEach(element =>{
    quantityArray.push(element.value);
     });
     console.log(quantityArray);

     /********/
     var data = [];
     itemArray.forEach((element,index) =>{
          data.push( [element , unitCostArray[index] , quantityArray[index] , lineTotalArray[index]])
     })
     data.unshift(["Item","Unit cost","Quantity","Line total"]);
/******* */

   // Create a new jsPDF instance
   var doc = new jsPDF();
   let pageWidth = doc.internal.pageSize.width;
   // Add a title to the document
   doc.setFontSize(14);
   doc.setFont('cambria')
   doc.text(`Creation date:  ${creationDate.textContent}`,pageWidth/2 -35 , 10);
    doc.text(`Invoice N°${invoiceNUMBERINPUT.value}`, 85, 50);
   doc.text(`From: ${cashier_name.value}`, 10, 20);
   doc.text(`Email: ${cashier_email.value}`, 10, 30);
   doc.text(`Address: ${cashier_address.value}`, 10, 40);
   doc.text(`To: ${client_name.value} `, 130, 20);
   doc.text(`Email: ${client_email.value}`, 130, 30);
   doc.text(`Address: ${client_address.value}`, 130, 40);

   doc.line(10, 57, pageWidth - 10, 57);
   doc.autoTable({
    head: [data[0]],
    body: data.slice(1),
    margin: { top: 60  }
  });
  var tableHeight = doc.autoTable.previous.finalY;
  // Add the subsequent content at an adjusted y-coordinate
  doc.text(`Total(no fees): ${inputSubtotal.value}DH`, 140, tableHeight + 20);
  doc.text(`Taxes         : ${inputTax.value}%`, 140, tableHeight + 30);
  doc.text(`Discount      : ${inputDiscount.value}%`, 140, tableHeight + 40);
  doc.text(`Total         : ${inputTotal.value} DH`, 140, tableHeight + 50);

      if(request=='ok'){
        let output = doc.output();
        let url = "data:application/pdf;base64," + btoa(output)
        let iframe = `<iframe width="100%" height="100%" src="${url}"></iframe>`
        let x = window.open()
        x.document.open()
        x.document.write(iframe)
        x.document.close()
        document.location.href = url
      }
      else{
        let num=invoiceNUMBERINPUT.value
        doc.save(`invoice : ${num}`)
      }
      }
  else{
    document.querySelector(".warning").style.display="flex";
    document.querySelector('.close').addEventListener("click",()=>{
        document.querySelector(".warning").style.display="none";
    })
    document.querySelector(".warning").style.backdropfilter= "blur(10px)";

  }
};

download.addEventListener("click",generatePDF)
PreviewPDF.addEventListener("click",()=>generatePDF("ok"))
/************************* */


/***************************** display date && invoice number ***************************/
let invoiceNUMBER=document.querySelector(".invoiceNUMBER")
let invoiceNUMBERINPUT=document.querySelector("#inv-nbr");
invoiceNUMBERINPUT.addEventListener("keyup",()=>{
  invoiceNUMBER.textContent=invoiceNUMBERINPUT.value;
  
})
window.addEventListener('load',()=>{
  let creationDate=document.querySelector("#creationDate");
  let date=new Date();
  //+1 cuz of the 0 based index of months in the object
  let currentDATE=`${date.getDate()} / ${date.getMonth() +1} / ${date.getFullYear()}`;
  creationDate.textContent=currentDATE;
})
/**************************** */
