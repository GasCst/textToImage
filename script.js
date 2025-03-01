document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const saveApiKeyBtn = document.getElementById("saveApiKey");

    // Salva l'API key nel localStorage
    saveApiKeyBtn.addEventListener("click", () => {
        const apiKey = document.getElementById("apiKeyInput").value;
        if (!apiKey) {
            alert("Inserisci una API Key valida!");
            return;
        }
        localStorage.setItem("apiKey", apiKey);
        alert("API Key salvata con successo!");
    });

    // Genera l'immagine
    generateBtn.addEventListener("click", async () => {
        const prompt = document.getElementById("promptInput").value;
        const apiKey = localStorage.getItem("apiKey");

        if (!prompt) {
            alert("Inserisci un testo per generare un'immagine!");
            return;
        }

        if (!apiKey) {
            alert("Nessuna API Key trovata. Inseriscila prima di generare!");
            return;
        }

        document.getElementById("status").innerText = "Generazione in corso...";

        try {
            const response = await fetch("https://api-infer.huggingface.co/models/runwayml/stable-diffusion-v1-5", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: prompt })
            });

            if (!response.ok) {
                throw new Error("Errore nella generazione dell'immagine!");
            }

            const data = await response.blob();
            const imgUrl = URL.createObjectURL(data);
            const generatedImage = document.getElementById("generatedImage");

            generatedImage.src = imgUrl;
            generatedImage.style.display = "block";
            document.getElementById("status").innerText = "Immagine generata con successo!";
        } catch (error) {
            document.getElementById("status").innerText = "Errore nella generazione dell'immagine!";
            console.error("Errore:", error);
        }
    });
});
