// stores/predictionStore.ts
import { defineStore } from 'pinia';

export const usePredictionStore = defineStore('prediction', {
    state: () => ({
        scoreE: null as number | null,
        scoreS: null as number | null,
        scoreG: null as number | null,
        scoreOverall: null as number | null,
        companyName: "Tesla" as string, // Nom d'entreprise par défaut
        sectorName: null as string | null, // Secteur
    }),
    actions: {
        setPredictionData(data: { Score_E: number; Score_S: number; Score_G: number; Score_Overall: number }) {
            this.scoreE = data.Score_E;
            this.scoreS = data.Score_S;
            this.scoreG = data.Score_G;
            this.scoreOverall = data.Score_Overall;
        },
        setCompanyInfo(companyName: string, sectorName: string) {
            this.companyName = companyName;
            this.sectorName = sectorName;
        },
        reset() {
            this.scoreE = null;
            this.scoreS = null;
            this.scoreG = null;
            this.scoreOverall = null;
            this.companyName = "Tesla"; // Réinitialiser à "Tesla"
            this.sectorName = null;
        }
    },
});