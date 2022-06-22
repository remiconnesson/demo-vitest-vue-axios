import axios from "axios";

async function getCatFact(){
  const url = "https://cat-fact.herokuapp.com/facts/6161eac7b5401f0017b61bff"
  const results = await axios.get(url)
  return results.data.text
}

export function useAxiosService(){
  return {
    getCatFact
  }
}


