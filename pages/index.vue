<template>
	<div>
		<n-space justify="space-between">
			<n-tag :bordered="false" type="success" size="large" round>
				<template #icon>
					<Icon name="carbon:model" :size="20" />
				</template>
				Modèle YARD VE
			</n-tag>
			<n-button @click="handlePredictClick">
				<template #icon>
					<Icon name="line-md:speedometer-loop" :size="20" />
				</template>
				Générer notation
			</n-button>
		</n-space>

		<n-tabs type="segment" animated class="mt-4">
			<n-tab-pane name="entreprise" tab="Entreprise">
				<n-card>
					<n-form>
						<n-input v-model:value="companyName" type="text" placeholder="Rentrez un nom d'entreprise" />
					</n-form>
				</n-card>
			</n-tab-pane>
			<n-tab-pane name="secteur" tab="Secteur d'activité">
				<n-card>
					<n-form>
						<n-form-item label="Choisissez un secteur">
							<n-select v-model:value="selectedSecteur" :options="secteursOptions"
								placeholder="Sélectionnez un secteur" style="width: 100%" />
						</n-form-item>
					</n-form>
				</n-card>
			</n-tab-pane>
			<n-tab-pane name="env" tab="Environnement">
				<n-card>
					<n-form>
						<n-form-item v-for="(label, key) in environnementFields" :key="key" :label="label">
							<n-input v-model:value="environnementData[key]" placeholder="Entrez une valeur" />
						</n-form-item>
					</n-form>
				</n-card>
			</n-tab-pane>
			<n-tab-pane name="social" tab="Social">
				<n-card>
					<n-form>
						<n-form-item v-for="(label, key) in socialFields" :key="key" :label="label">
							<n-input v-model:value="socialData[key]" placeholder="Entrez une valeur" />
						</n-form-item>
					</n-form>
				</n-card>
			</n-tab-pane>
			<n-tab-pane name="gouv" tab="Gouvernance">
				<n-card>
					<n-form>
						<n-form-item v-for="(label, key) in gouvFields" :key="key" :label="label">
							<n-input v-model:value="gouvData[key]" placeholder="Entrez une valeur" />
						</n-form-item>
					</n-form>
				</n-card>
			</n-tab-pane>
		</n-tabs>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	name: "BlankPage",
	title: "Modèle",
	auth: true,
	roles: "all"
});

import {
	NSpace, NPageHeader, NForm, NFormItem, NInputNumber, NButton, NResult, useMessage,
	NTabs, NTabPane, NTag, NSelect, NCard, NInput
} from 'naive-ui';

import { useRouter } from "vue-router"
const router = useRouter()

const message = useMessage()

import { usePredictionStore } from '@/stores/predictionStore';
const predictionStore = usePredictionStore();


const generateRandomValue = (field: string): string => {
	if (field.includes("pourcentage") || field.includes("intensité")) {
		// Pourcentage ou intensité
		return (Math.random() * 100).toFixed(2);
	} else if (field.includes("nombre") || field.includes("score")) {
		// Nombre ou score
		return (Math.random() * 10).toFixed(2);
	} else if (field.includes("bonus") || field.includes("salaire")) {
		// Bonus ou salaire
		return (Math.random() * 100000).toFixed(0);
	} else {
		// Valeur par défaut
		return (Math.random() * 1000).toFixed(2);
	}
};


const secteursOptions = [
	{ label: "Fabrication de boisson non-alcoolisée", value: "Fabrication de boisson non-alcoolisée" },
	{ label: "Commerçants grand public", value: "Commerçants grand public" },
	{ label: "Pharmaceutique", value: "Pharmaceutique" },
	{ label: "Banque", value: "Banque" },
	{ label: "Automobile", value: "Automobile" },
	{ label: "Luxe", value: "Luxe" },
	{ label: "Gestion d'actifs", value: "Gestion d'actifs" },
	{ label: "Aéronautique", value: "Aéronautique" },
	{ label: "Restauration", value: "Restauration" },
	{ label: "Pétrolières", value: "Pétrolières" }
];

const companyName = ref<string>("Pearson Darby Specter"); // Nom d'entreprise par défaut
const selectedSecteur = ref<string | null>("Pétrolières"); // Secteur par défaut


// Liste des champs environnementaux
const environnementFields = {
	"Envir - emission GES": "Émission GES",
	"Envir - intensité des GES": "Intensité des GES",
	"Envir - exposition aux secteurs des combustibles fossiles": "Exposition aux combustibles fossiles",
	"Envir - utilisation totale d'énergie": "Utilisation totale d'énergie",
	"Envir - utilisation d'eau": "Utilisation d'eau",
	"Envir - intensité d'utilisation d'eau": "Intensité d'utilisation d'eau",
	"Envir - risque de déforestations": "Risque de déforestations",
	"Envir - score de préjudice en environnement": "Score de préjudice environnemental",
	"Envir - politique concernant l'eau": "Politique sur l'eau",
	"Envir - initiative de réduction d'emissions": "Initiative de réduction d'émissions",
	"Envir - intensité d'energie par ventes": "Intensité d'énergie par ventes",
	"Envir - especes et zones naturelles protégées": "Espèces/zones naturelles protégées",
	"Envir - dechets dangereux": "Déchets dangereux"
};

const environnementData = ref<Record<string, string | null>>({
	"Envir - emission GES": "10038.5",
	"Envir - intensité des GES": "208373.3",
	"Envir - exposition aux secteurs des combustibles fossiles": "9",
	"Envir - utilisation totale d'énergie": "1748",
	"Envir - utilisation d'eau": "134",
	"Envir - intensité d'utilisation d'eau": "478",
	"Envir - risque de déforestations": "1",
	"Envir - score de préjudice en environnement": "13",
	"Envir - politique concernant l'eau": "1",
	"Envir - initiative de réduction d'emissions": "1",
	"Envir - intensité d'energie par ventes": "284",
	"Envir - especes et zones naturelles protégées": "1",
	"Envir - dechets dangereux": "2"
});

// Liste des champs sociaux
const socialFields = {
	"Social - soutien et respect des droits humains": "Soutien aux droits humains",
	"Social - pas complaisant sur droits humains": "Non complaisant sur les droits humains",
	"Social - elimination du travail forcé": "Élimination du travail forcé",
	"Social - abolution du travail des droits des enfants": "Abolition du travail des enfants",
	"Social - elimination de discrimination à l'emploi": "Élimination de la discrimination à l'emploi",
	"Social - approche de précaution envers défis environnementaux": "Approche de précaution",
	"Social - promeut la résponsabilité environnement": "Responsabilité environnementale",
	"Social - technologie écologique": "Technologie écologique",
	"Social - anti corruption": "Anti-corruption",
	"Social - exposition aux armes controversées": "Exposition aux armes controversées",
	"Social - polices de prevention des accidents du travail": "Prévention des accidents du travail",
	"Social - code de conduite du fournisseur": "Code de conduite du fournisseur",
	"Social - transparence de l'information": "Transparence de l'information",
	"Social - nombres d'incidents survenus": "Incidents survenus",
	"Social - processus de diligence (droits humains)": "Diligence sur les droits humains",
	"Social - ecarts de remunaration entre genres": "Écarts de rémunération entre genres"
};

// Données pour chaque champ social
const socialData = ref<Record<string, string | null>>({
	"Social - soutien et respect des droits humains": "1",
	"Social - pas complaisant sur droits humains": "1",
	"Social - elimination du travail forcé": "1",
	"Social - abolution du travail des droits des enfants": "1",
	"Social - elimination de discrimination à l'emploi": "1",
	"Social - approche de précaution envers défis environnementaux": "1",
	"Social - promeut la résponsabilité environnement": "1",
	"Social - technologie écologique": "1",
	"Social - anti corruption": "1",
	"Social - exposition aux armes controversées": "1",
	"Social - polices de prevention des accidents du travail": "1",
	"Social - code de conduite du fournisseur": "1",
	"Social - transparence de l'information": "17",
	"Social - nombres d'incidents survenus": "1",
	"Social - processus de diligence (droits humains)": "1",
	"Social - ecarts de remunaration entre genres": "2"
});


// Liste des champs gouvernance
const gouvFields = {
	"Gouv - diversité des genres au conseil": "Diversité des genres au conseil",
	"Gouv - politiques contre corruptiopn et pot de vin": "Politiques anti-corruption",
	"Gouv - % d'administrateurs indépendants": "Administrateurs indépendants",
	"Gouv - president independant": "Président indépendant",
	"Gouv - admisstrateur principal  independant": "Administrateur principal indépendant",
	"Gouv - politique en matiere d'éthique": "Politique d'éthique",
	"Gouv - politique en matiere de protection des employés": "Protection des employés",
	"Gouv - politique en matiere d'égalité des chances": "Égalité des chances",
	"Gouv - politique en matiere de santé et sécurité": "Santé et sécurité",
	"Gouv - politique en matiere de droit humain": "Droits humains",
	"Gouv - polique en matiere de droits des enfants": "Droits des enfants",
	"Gouv - politique en matiuere de formation": "Formation",
	"Gouv - politique en matiere d'ethyque anti corrupsition": "Éthique anti-corruption",
	"Gouv - % d'administrateur indépendants au Comité de rémunération": "Indépendants au comité de rémunération",
	"Gouv - disposition de reprise de rémunération des dirigeants": "Reprise de rémunération des dirigeants",
	"Gouv - société a des lignes directrices en matiere d'actions des dirigeants": "Directives pour actions des dirigeants",
	"Gouv - % d'administrateurs indépendants au comité d'audit": "Indépendants au comité d'audit",
	"Gouv - bonus versé au CEO": "Bonus versé au CEO",
	"Gouv - salaire versé au CEO": "Salaire versé au CEO"
};
// Données pour chaque champ gouvernance
const gouvData = ref<Record<string, string | null>>({
	"Gouv - diversité des genres au conseil": "55",
	"Gouv - politiques contre corruptiopn et pot de vin": "1",
	"Gouv - % d'administrateurs indépendants": "100",
	"Gouv - president independant": "1",
	"Gouv - admisstrateur principal  independant": "1",
	"Gouv - politique en matiere d'éthique": "1",
	"Gouv - politique en matiere de protection des employés": "1",
	"Gouv - politique en matiere d'égalité des chances": "1",
	"Gouv - politique en matiere de santé et sécurité": "1",
	"Gouv - politique en matiere de droit humain": "1",
	"Gouv - polique en matiere de droits des enfants": "1",
	"Gouv - politique en matiuere de formation": "1",
	"Gouv - politique en matiere d'ethyque anti corrupsition": "1",
	"Gouv - % d'administrateur indépendants au Comité de rémunération": "100",
	"Gouv - disposition de reprise de rémunération des dirigeants": "1",
	"Gouv - société a des lignes directrices en matiere d'actions des dirigeants": "1",
	"Gouv - % d'administrateurs indépendants au comité d'audit": "100",
	"Gouv - bonus versé au CEO": "1500000",
	"Gouv - salaire versé au CEO": "1000000"
});

const handlePredictClick = async (e: MouseEvent) => {
	e.preventDefault();
	try {
		const payload = {
			secteur: selectedSecteur.value,
			...environnementData.value,
			...socialData.value,
			...gouvData.value,
		};

		// Faire l'appel à l'API
		const response = await $fetch('/api/predict', {
			method: 'POST',
			body: payload,
		});

		// Vérifier la réponse et afficher un message approprié
		if (response && response.Score_E !== undefined) {
			predictionStore.setPredictionData(response);
			predictionStore.setCompanyInfo(companyName.value, selectedSecteur.value || ""); // 
			message.success(`Prédiction réussie pour ${companyName.value} !`);
			router.push('/prediction');
		} else {
			// Réponse invalide
			console.error("Réponse inattendue du serveur :", response);
			message.error('Erreur : Les scores ne sont pas disponibles dans la réponse.');
		}
	} catch (err) {
		// Gérer les erreurs
		if (err.response) {
			try {
				// Lire le corps de la réponse une seule fois
				const errorDetails = await err.response.json();
				console.error("Erreur API:", errorDetails);
				message.error(`Erreur lors de la prédiction : ${errorDetails.message || "Erreur inconnue du serveur."}`);
			} catch (readError) {
				console.error("Erreur lors de la lecture de la réponse :", readError);
				message.error("Erreur : veuillez vérifier les champs.");
			}
		} else {
			console.error("Erreur de réseau ou de serveur :", err);
			message.error("Erreur de connexion ou de serveur.");
		}
	}
};

</script>

<style>
.page {
	padding: 24px;
}
</style>