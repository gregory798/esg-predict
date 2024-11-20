<template>
	<div>
		<n-space justify="space-between">
			<n-tag :bordered="false" type="success" size="large" round>
				<template #icon>
					<Icon name="carbon:model" :size="20" />
				</template>
				Modèle YARD VE
			</n-tag>
			<n-button @click="blablabla">
				<template #icon>
					<Icon name="line-md:speedometer-loop" :size="20" />
				</template>
				Générer notation
			</n-button>
		</n-space>

		<n-tabs type="segment" animated class="mt-4">
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
	title: "Prédiction ONNX",
	auth: true,
	roles: "all"
});

import {
	NSpace, NPageHeader, NForm, NFormItem, NInputNumber, NButton, NResult, useMessage,
	NTabs, NTabPane, NTag, NSelect, NCard, NInput
} from 'naive-ui';

const message = useMessage()


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

const selectedSecteur = ref<string | null>(null);


// Liste des champs environnementaux
const environnementFields = {
	"emission_ges": "Émission GES",
	"intensite_ges": "Intensité des GES",
	"exposition_combustibles": "Exposition aux secteurs des combustibles fossiles",
	"utilisation_totale_energie": "Utilisation totale d'énergie",
	"utilisation_eau": "Utilisation d'eau",
	"intensite_utilisation_eau": "Intensité d'utilisation d'eau",
	"risque_deforestation": "Risque de déforestations",
	"score_prejudice_env": "Score de préjudice en environnement",
	"politique_eau": "Politique concernant l'eau",
	"initiative_reduction_emissions": "Initiative de réduction d'émissions",
	"intensite_energie_ventes": "Intensité d'énergie par ventes",
	"zones_protegees": "Espèces et zones naturelles protégées",
	"dechets_dangereux": "Déchets dangereux"
};

// Données pour chaque champ environnemental
const environnementData = ref<Record<string, string | null>>(
	Object.keys(environnementFields).reduce((acc, key) => {
		acc[key] = null;
		return acc;
	}, {} as Record<string, string | null>)
);

// Liste des champs sociaux
const socialFields = {
	"soutien_droits_humains": "Soutien et respect des droits humains",
	"pas_complaisant_humains": "Pas complaisant sur droits humains",
	"elimination_travail_force": "Élimination du travail forcé",
	"abolition_travail_enfants": "Abolition du travail des enfants",
	"elimination_discrimination": "Élimination de discrimination à l'emploi",
	"precaution_defis_env": "Approche de précaution envers défis environnementaux",
	"responsabilite_environnement": "Promet la responsabilité environnementale",
	"technologie_ecologique": "Technologie écologique",
	"anti_corruption": "Anti-corruption",
	"exposition_armes": "Exposition aux armes controversées",
	"prevention_accidents": "Polices de prévention des accidents du travail",
	"code_conduite": "Code de conduite du fournisseur",
	"transparence_info": "Transparence de l'information",
	"incidents_survenus": "Nombre d'incidents survenus",
	"processus_diligence": "Processus de diligence (droits humains)",
	"ecarts_genres": "Écarts de rémunération entre genres"
};

// Données pour chaque champ social
const socialData = ref<Record<string, string | null>>(
	Object.keys(socialFields).reduce((acc, key) => {
		acc[key] = null;
		return acc;
	}, {} as Record<string, string | null>)
);


// Liste des champs gouvernance
const gouvFields = {
	"diversite_genres_conseil": "Diversité des genres au conseil",
	"politiques_anti_corruption": "Politiques contre corruption et pot-de-vin",
	"pourcentage_administrateurs_independants": "% d'administrateurs indépendants",
	"president_independant": "Président indépendant",
	"administrateur_principal_independant": "Administrateur principal indépendant",
	"politique_ethique": "Politique en matière d'éthique",
	"politique_protection_employes": "Politique en matière de protection des employés",
	"politique_egalite_chances": "Politique en matière d'égalité des chances",
	"politique_sante_securite": "Politique en matière de santé et sécurité",
	"politique_droit_humain": "Politique en matière de droit humain",
	"politique_droits_enfants": "Politique en matière de droits des enfants",
	"politique_formation": "Politique en matière de formation",
	"politique_anti_corruption": "Politique anti-corruption",
	"pourcentage_comite_remuneration": "% d'administrateurs indépendants au comité de rémunération",
	"reprise_remuneration_dirigeants": "Disposition de reprise de rémunération des dirigeants",
	"directives_actions_dirigeants": "Société a des lignes directrices en matière d'actions des dirigeants",
	"pourcentage_comite_audit": "% d'administrateurs indépendants au comité d'audit",
	"bonus_ceo": "Bonus versé au CEO",
	"salaire_ceo": "Salaire versé au CEO"
};

// Données pour chaque champ gouvernance
const gouvData = ref<Record<string, string | null>>(
	Object.keys(gouvFields).reduce((acc, key) => {
		acc[key] = null;
		return acc;
	}, {} as Record<string, string | null>)
);


const handlePredictClick = async (e: MouseEvent) => {
	e.preventDefault()
	formRef.value?.validate(async (errors: any) => {
		if (!errors) {
			try {
				error.value = null
				prediction.value = null

				const response = await $fetch('/api/predict', {
					method: 'POST',
					body: {
						feature1: formValue.value.feature1,
						feature2: formValue.value.feature2
					}
				})

				prediction.value = response.prediction
				message.success('Prédiction réussie !')
			} catch (err) {
				console.error('Erreur lors de la requête au serveur', err)
				error.value = 'Erreur lors de la requête au serveur'
				message.error('Erreur lors de la prédiction')
			}
		} else {
			message.error('Veuillez remplir tous les champs correctement')
		}
	})
}

// Gouv - diversité des genres au conseil
// Gouv - politiques contre corruptiopn et pot de vin
// Gouv - % d'administrateurs indépendants 
// Gouv - president independant
// Gouv - admisstrateur principal  independant
// Gouv - politique en matiere d'éthique 
// Gouv - politique en matiere de protection des employés
// Gouv - politique en matiere d'égalité des chances
// Gouv - politique en matiere de santé et sécurité
// Gouv - politique en matiere de droit humain
// Gouv - polique en matiere de droits des enfants
// Gouv - politique en matiuere de formation
// Gouv - politique en matiere d'ethyque anti corrupsition 
// Gouv - % d'administrateur indépendants au Comité de rémunération 
// Gouv - disposition de reprise de rémunération des dirigeants
// Gouv - société a des lignes directrices en matiere d'actions des dirigeants 
// Gouv - % d'administrateurs indépendants au comité d'audit
// Gouv - bonus versé au CEO
// Gouv - salaire versé au CEO
</script>

<style>
.page {
	padding: 24px;
}
</style>