<script setup>
import { ref } from "vue"
import axios from "axios"

const catFact = ref('Read Me');

async function clicked(){
  const url = "https://cat-fact.herokuapp.com/facts/6161eac7b5401f0017b61bff"
  const results = await axios.get(url)
  catFact.value = results.data.text
}

</script>

<template>
  <h1>Hey</h1>
  <button data-test="clickMe" @click="clicked">Click Me</button>
  <p data-test="readMe">{{catFact}}</p>
</template>
