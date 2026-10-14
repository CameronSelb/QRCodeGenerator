let qrCodeInstance = null;

function generateQR() {
  const url = document.getElementById("urlInput").value.trim();
  const qrContainer = document.getElementById("qrcode");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!url) {
    alert("Please enter a valid link!");
    return;
  }

  qrContainer.innerHTML = "";
  downloadBtn.style.display = "none";

  qrCodeInstance = new QRCode(qrContainer, {
    text: url,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Use a tiny timeout to ensure the library has finished creating the img element inside the DOM
  setTimeout(() => {
    const qrImg = qrContainer.querySelector("img");
    if (qrImg && qrImg.src) {
      downloadBtn.style.display = "block";
      downloadBtn.style.margin = "15px auto 0 auto";
    }
  }, 100);
}

// Function to handle downloading the generated image
function downloadQR() {
  const qrContainer = document.getElementById("qrcode");
  const qrImg = qrContainer.querySelector("img");

  if (!qrImg || !qrImg.src) {
    alert("No QR code found to download!");
    return;
  }

  // Create a temporary hidden link element
  const downloadLink = document.createElement("a");
  downloadLink.href = qrImg.src;
  downloadLink.download = "qrcode.png"; // Default name for the saved file

  // Trigger the download programmatically
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
