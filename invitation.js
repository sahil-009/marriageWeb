function createInvitation(theme, bgColor, event, names, date, venue) {
    const canvas = document.getElementById("invitationCard");
    const ctx = canvas.getContext("2d");

    const cardWidth = canvas.width;
    const cardHeight = canvas.height;

    // Clear the canvas
    ctx.clearRect(0, 0, cardWidth, cardHeight);

    // Fill the background with a gradient
    const gradient = ctx.createLinearGradient(0, 0, cardWidth, cardHeight);
    gradient.addColorStop(0, bgColor || "#FFD700");
    gradient.addColorStop(1, "#FFFFFF");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // Add decorative borders
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, cardWidth - 40, cardHeight - 40);

    // Set text properties and draw content
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000"; // Default text color
    ctx.font = "bold 45px Arial";
    ctx.fillText(`${event} Invitation`, cardWidth / 2, 100);

    // Theme block with a subtle background
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(100, 150, cardWidth - 200, 50);
    ctx.fillStyle = "#000";
    ctx.font = "bold 25px Arial";
    ctx.fillText(`Theme: ${theme}`, cardWidth / 2, 185);

    ctx.font = "30px Arial";
    ctx.fillText(`Hosted by ${names}`, cardWidth / 2, 250);
    ctx.fillText(`Date: ${date}`, cardWidth / 2, 320);
    ctx.fillText(`Venue: ${venue}`, cardWidth / 2, 390);

    // Decorative line
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 460);
    ctx.lineTo(cardWidth - 80, 460);
    ctx.stroke();

    // Footer message
    ctx.font = "italic 22px Arial";
    ctx.fillStyle = "#555";
    ctx.fillText("We look forward to celebrating with you!", cardWidth / 2, 520);

    // Decorative footer pattern
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(300, 700, 50, 0, Math.PI, false);
    ctx.stroke();

    // Show the download button
    const downloadButton = document.getElementById("downloadCard");
    downloadButton.style.display = "block";
    downloadButton.onclick = () => {
        const link = document.createElement("a");
        link.download = "invitation_card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };
}

// Event listener for the "Generate Invitation" button
document.getElementById("generateCard").addEventListener("click", () => {
    const theme = document.getElementById("theme").value || "Default Theme";
    const bgColor = document.getElementById("bgColor").value || "#FFD700";
    const event = document.getElementById("event").value || "Event";
    const names = document.getElementById("names").value || "Hosts";
    const date = document.getElementById("date").value || "Date";
    const venue = document.getElementById("venue").value || "Venue";

    createInvitation(theme, bgColor, event, names, date, venue);
});
