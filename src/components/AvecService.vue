<script setup>
// importer le service qui utilise Axios
import { useAxiosService } from "@/services/AxiosService";
const { getCatFact } = useAxiosService();

// cette ref doit recevoir le resultat de l'appel à Axios
import { ref } from "vue"
const catFact = ref('Read Me');


async function clicked(){
  const text = await getCatFact() // ceci appelle axios sous le capot
  catFact.value = text
}

</script>

<template>
  <h1>Hey</h1>
  <button data-test="clickMe" @click="clicked">Click Me</button>
  <p data-test="readMe">{{catFact}}</p>
</template>
