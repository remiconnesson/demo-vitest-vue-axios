<script setup>
import AvecAxios from "@/components/AvecAxios.vue"
import AvecService from "@/components/AvecService.vue"
</script>

<template>
<p>Les deux composants sont sensé être équivalent.</p>
<hr/>
<h3>Le composant ci dessous appelle Axios directement </h3>
<AvecAxios/>
<hr/>
<h3>Le composant ci dessous appelle un Service qui appelle Axios</h3>
<AvecService/>
</template>
