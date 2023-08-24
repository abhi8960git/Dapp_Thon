const uploadButton = document.getElementById("uploadButton");
const uploadResponse = document.getElementById("uploadResponse");

uploadButton.addEventListener("click", async () => {
  const filePath = document.getElementById("filePath").value;
  const bucketName = document.getElementById("bucketName").value;
  const spheronToken = document.getElementById("spheronToken").value;
  const walletPrivateKey = document.getElementById("walletPrivateKey").value;

  try {
    const response = await fetch('backend-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filePath,
        bucketName,
        spheronToken,
        walletPrivateKey,
      }),
    });

    const responseData = await response.json();
    uploadResponse.innerHTML = "<pre>" + JSON.stringify(responseData, null, 2) + "</pre>";
  } catch (error) {
    console.error("Error uploading file:", error);
    uploadResponse.innerHTML = "<p>Error uploading file. Please check the console for details.</p>";
  }
});
