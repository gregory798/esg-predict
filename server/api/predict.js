import { InferenceSession, Tensor } from 'onnxruntime-node';

export default defineEventHandler(async (event) => {
    const body = await readBody(event); // Récupère les données POST
    const { feature1, feature2 } = body;

    // console.log(typeof feature1, typeof feature2)
    // number number

    try {
        // Vérifie que les données sont des nombres
        if (typeof feature1 !== 'number' || typeof feature2 !== 'number') {
            throw new Error('Les entrées doivent être des nombres.');
        }

        // Charger le modèle ONNX
        const session = await InferenceSession.create('./server/models/model.onnx');

        // Préparer les données d'entrée pour le modèle
        const inputTensor = new Tensor('float32', Float32Array.from([feature1, feature2]), [1, 2]);

        // Vérifier les noms des entrées
        const feeds = { input: inputTensor }; // 'input' doit correspondre au nom de l'entrée du modèle
        const results = await session.run(feeds);

        // Vérifier le nom de la sortie
        const prediction = results.output.data[0]; // 'output' doit correspondre au nom de la sortie du modèle

        return { prediction };
    } catch (error) {
        console.error('Erreur lors de la prédiction :', error);
        return { error: 'Erreur lors de la prédiction' };
    }
});