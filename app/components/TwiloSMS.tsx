const sendMessage = async () => {
    const response = await fetch("/api/auth/twilio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "+2348152743651", // Replace with the recipient's number
        message: "Hello from Saydle using Twilio!",
      }),
    });
  
    const data = await response.json();
    console.log(data);
  };
  