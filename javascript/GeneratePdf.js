
let button=document.querySelector(".x");


function generatePDF() {
  // Get the values of the input fields
  
  let x1=document.querySelector("#x1").value
  let x2=document.querySelector("#x2").value
  let x3=document.querySelector("#x3").value
  let x4=document.querySelector(".x5").innerText;
  // Create a new jsPDF instance
// Create a new jsPDF instance
const doc = new jsPDF();

// Define some styles
const headerStyle = {
  fontSize: 20,
  font: 'helvetica',
  fontStyle: 'bold',
  textColor: [74, 80, 87]
};
const contentStyle = {
  fontSize: 14,
  font: 'helvetica',
  textColor: [74, 80, 87]
};
const sectionTitleStyle = {
  fontSize: 16,
  font: 'helvetica',
  fontStyle: 'bold',
  textColor: [255, 255, 255],
  fillColor: [74, 80, 87],
  margin: [0, 10, 0, 10],
  padding: [5, 10, 5, 10]
};

// Add the header image
const img = new Image();
img.src = '/javascript/x4.jpg';
img.onload = function() {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  const imageData = canvas.toDataURL('image/jpeg');
  doc.addImage(imageData, 'JPEG', 10, 10, 60, 60);
  // Add the header text
  doc.setFontSize(headerStyle.fontSize);
  doc.setFont(headerStyle.font, headerStyle.fontStyle);
  doc.setTextColor(...headerStyle.textColor);
  doc.text('Invoice', 80, 35);
  
  // Add the content
  doc.setFontSize(contentStyle.fontSize);
  doc.setFont(contentStyle.font);
  doc.setTextColor(...contentStyle.textColor);
  doc.text('Invoice Number: 12345', 10, 80);
  doc.text('Date: 2023-04-25', 10, 90);
  doc.text('Amount: $100.00', 10, 100);
  
  // Add a section title
  doc.setFillColor(...sectionTitleStyle.fillColor);
  doc.rect(10, 120, 190, 30, 'F');
  doc.setFontSize(sectionTitleStyle.fontSize);
  doc.setFont(sectionTitleStyle.font, sectionTitleStyle.fontStyle);
  doc.setTextColor(...sectionTitleStyle.textColor);
  doc.text('Item Details', 15, 135);
  doc.text(x4, 15, 135);
  
  // Add a table
  const tableData = [
    ['Item', 'Description', 'Price'],
    ['Item 1', 'Description 1', '$50.00'],
    ['Item 2', 'Description 2', '$50.00']
  ];
  // doc.autoTable({
  //   startY: 150,
  //   head: [tableData[0]],
  //   body: tableData.slice(1),
  //   theme: 'striped',
  //   styles: {
  //     fontSize: contentStyle.fontSize,
  //     font: contentStyle.font
  //   }
  // });

  // Save the document
  doc.save('my-invoice.pdf');
};


}

button.addEventListener("click",generatePDF)


