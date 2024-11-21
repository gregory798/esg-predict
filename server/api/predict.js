export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event); // Lire les données de la requête POST

        console.log("Requête reçue par Nuxt API:", body);

        const response = await $fetch('http://13.50.100.79/predict', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Réponse reçue de FastAPI:", response);

        return response;
    } catch (error) {
        console.error("Erreur lors de l'appel à FastAPI:", error);
        if (error.response) {
            console.error("Détails de l'erreur de réponse:", await error.response.json());
        }

        throw createError({
            statusCode: 500,
            statusMessage: `Erreur serveur Nuxt : ${error.message}`,
        });
    }
});