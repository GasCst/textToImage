document.getElementById("generateBtn").addEventListener("click", async () => {
    const prompt = document.getElementById("promptInput").value;
    if (!prompt) {
        alert("Inserisci un testo per generare un'immagine!");
        return;
    }

    // Recupera la chiave API dal backend o dal localStorage
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
        alert("Nessuna chiave API trovata. Inseriscila prima di generare!");
        return;
    }

    const response = await fetch("https://api-infer.huggingface.co/models/runwayml/stable-diffusion-v1-5", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) {
        alert("Errore nella generazione dell'immagine!");
        return;
    }

    const data = await response.blob();
    const imgUrl = URL.createObjectURL(data);
    document.getElementById("outputImage").src = imgUrl;
});
