<template>
    <div>
        <div v-if="predictionStore.scoreOverall === null">
            <n-card>
                <n-result status="info" title="Veuillez prédire"
                    description="Il faut d'abord faire une prédiction pour voir les résultats.">
                    <template #footer>
                        <n-button @click="goToHome">Prédire</n-button>
                    </template>
                </n-result>
            </n-card>
        </div>
        <div v-else>
            <n-grid x-gap="12" :cols="2">
                <n-gi>
                    <n-card title="Score ESG">
                        <template #header-extra>
                            <n-tag round :bordered="false" type="success">
                                {{ predictionStore.companyName }}
                                <template #icon>
                                    <Icon name="hugeicons:corporate" :size="15" />
                                </template>
                            </n-tag>
                        </template>
                        <n-progress type="line" :percentage="formattedOverallScore" unit="" :height="24"
                            indicator-placement="inside" />
                    </n-card>
                </n-gi>
                <n-gi>
                    <n-card title="Détails">
                        <template #header-extra>
                            <n-tag round :bordered="false" type="success">
                                {{ predictionStore.sectorName }}
                                <template #icon>
                                    <Icon name="gravity-ui:person-worker" :size="15" />
                                </template>
                            </n-tag>
                        </template>
                        <n-tabs v-model:value="activeTab" type="segment" animated>
                            <n-tab-pane name="Environnement" tab="Environnement">
                                <p>Score {{ predictionStore.companyName }}</p>
                                <n-progress type="line" :percentage="formattedScoreE" unit=""
                                    indicator-placement="inside" :height="24" class="mb-4" />
                                <p>Moyenne du secteur {{ predictionStore.sectorName }}</p>
                                <n-progress type="line" :percentage="averageScores.environment" unit=""
                                    indicator-placement="inside" status="success" :height="24" class="mb-4" />
                                <p>Maximum du secteur {{ predictionStore.sectorName }}</p>
                                <n-progress type="line" :percentage="maxScores.environment" unit=""
                                    indicator-placement="inside" status="warning" :height="24" />
                            </n-tab-pane>
                            <n-tab-pane name="Social" tab="Social">
                                <p>Score {{ predictionStore.companyName }}</p>
                                <n-progress type="line" :percentage="formattedScoreS" unit=""
                                    indicator-placement="inside" :height="24" class="mb-4" />
                                <p>Moyenne du secteur {{ predictionStore.sectorName }}</p>
                                <n-progress type="line" :percentage="averageScores.social" unit=""
                                    indicator-placement="inside" status="success" :height="24" class="mb-4" />
                                <p>Maximum du secteur {{ predictionStore.sectorName }}</p>
                                <n-progress type="line" :percentage="maxScores.social" unit=""
                                    indicator-placement="inside" status="warning" :height="24" />
                            </n-tab-pane>
                            <n-tab-pane name="Gouvernance" tab="Gouvernance">
                                <p>Score {{ predictionStore.companyName }}</p>
                                <n-progress type="line" :percentage="formattedScoreG" unit=""
                                    indicator-placement="inside" :height="24" class="mb-4" />
                                <p>Moyenne du secteur {{ predictionStore.sectorName }}</p>
                                <n-progress type="line" :percentage="averageScores.governance" unit=""
                                    indicator-placement="inside" status="success" :height="24" class="mb-4" />
                                <p>Maximum du secteur {{ predictionStore.sectorName }}</p>
                                <n-progress type="line" :percentage="maxScores.governance" unit=""
                                    indicator-placement="inside" status="warning" :height="24" />
                            </n-tab-pane>
                        </n-tabs>



                    </n-card>
                </n-gi>
            </n-grid>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "Prediction",
    title: "Prédiction",
    auth: true,
    roles: "all"
});

import { usePredictionStore } from '@/stores/predictionStore';
const predictionStore = usePredictionStore();

import {
    NSpace, NPageHeader, NForm, NFormItem, NInputNumber, NButton, NResult, useMessage,
    NTabs, NTabPane, NTag, NSelect, NCard, NInput, NGrid, NGi, NProgress
} from 'naive-ui';

import Papa from "papaparse";

const message = useMessage()

// Variable pour contrôler l'onglet actif
const activeTab = ref("Environnement");

// Arrondir le score overall à 2 décimales
const formattedOverallScore = computed(() =>
    predictionStore.scoreOverall ? parseFloat(predictionStore.scoreOverall.toFixed(2)) : 0
);

const formattedScoreE = computed(() =>
    predictionStore.scoreE ? parseFloat(predictionStore.scoreE.toFixed(2)) : 0
);
const formattedScoreS = computed(() =>
    predictionStore.scoreS ? parseFloat(predictionStore.scoreS.toFixed(2)) : 0
);
const formattedScoreG = computed(() =>
    predictionStore.scoreG ? parseFloat(predictionStore.scoreG.toFixed(2)) : 0
);

const averageScores = ref({
    environment: 0,
    social: 0,
    governance: 0,
});

const maxScores = ref({
    environment: 0,
    social: 0,
    governance: 0,
});


// Charger les données depuis le fichier CSV
Papa.parse("notes.csv", {
    download: true,
    header: true,
    delimiter: ";",
    complete: (result) => {
        const data = result.data;
        const sectorName = predictionStore.sectorName;

        // Trouver les données correspondant au secteur
        const sectorData = data.find((row) => row.secteur === sectorName);

        if (sectorData) {
            averageScores.value.environment = parseFloat(sectorData["Note moyenne environnement"]);
            maxScores.value.environment = parseFloat(sectorData["Note max envionnement"]);
            averageScores.value.social = parseFloat(sectorData["Note moyenne social"]);
            maxScores.value.social = parseFloat(sectorData["Note max social"]);
            averageScores.value.governance = parseFloat(sectorData["Note moyenne gouvernance"]);
            maxScores.value.governance = parseFloat(sectorData["Note max gouvernance"]);
        }
    },
});

import { useRouter } from 'vue-router';
const router = useRouter();

const goToHome = () => {
    router.push('/');
};
</script>

<style scoped></style>