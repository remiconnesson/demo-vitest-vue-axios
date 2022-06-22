import { useAxiosService } from "../AxiosService"

test('Retourne Meow Meow', async () => {
  const { getCatFact } = useAxiosService()

  const text = await getCatFact();

  expect(text).toBe("Meow goes Meow after Meow goes Meow.")
  console.log(text);
})
