document.addEventListener("DOMContentLoaded", () => {
   const video = document.getElementById('qr-video');
   const resultParagraph = document.getElementById('result');
   const startScanButton = document.getElementById('start-scan');

   let html5QrCode;

   function onScanSuccess(decodedText, decodedResult) {
       // Handle the scanned QR code data here
       resultParagraph.innerText = `Result: ${decodedText}`;
       html5QrCode.stop().then(() => {
           // QR code scanning stopped
       }).catch(err => {
           console.log("Error stopping the scan: ", err);
       });
   }

   function onScanError(errorMessage) {
       // Handle errors here
       console.warn(`QR code scan error: ${errorMessage}`);
   }

   startScanButton.addEventListener('click', () => {
       if (html5QrCode) {
           html5QrCode.stop().then(() => {
               // QR code scanning stopped
           }).catch(err => {
               console.log("Error stopping the scan: ", err);
           });
       }

       html5QrCode = new Html5Qrcode("qr-video");
       html5QrCode.start(
           { facingMode: "environment" },
           { fps: 10, qrbox: 250 },
           onScanSuccess,
           onScanError
       ).catch(err => {
           console.log("Error starting the scan: ", err);
       });
   });
});
