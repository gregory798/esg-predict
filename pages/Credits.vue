<template>
    <div>
        <n-result title="Made with 💪 by" description="Nicolas Yusufyan & Martin Darolles">
            <template #icon>
                <Icon name="emojione-monotone:flexed-biceps" :size="150" />
            </template>
        </n-result>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "Credits",
    title: "Crédits",
    auth: true,
    roles: "all"
});

import {
    NSpace, NPageHeader, NForm, NFormItem, NInputNumber, NButton, NResult, useMessage,
    NTabs, NTabPane, NTag, NSelect, NCard, NInput, NGrid, NGi, NProgress
} from 'naive-ui';

</script>

<style scoped></style>