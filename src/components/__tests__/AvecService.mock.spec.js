import { mount, flushPromises } from "@vue/test-utils";
import AvecService from "../AvecService.vue";

async function sleep(durée){
  return new Promise((r) => setTimeout(r, durée));
}


describe("Composant qui Importe un Service [Mock the Composable]", () => {
  it("renders properly", () => {
    const wrapper = mount(AvecService);
    expect(wrapper.text()).toContain("Click Me");
    expect(wrapper.get('[data-test="clickMe"]').text()).toContain("Click Me");
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("Read Me");
  });

  it("will update after being clicked [SLEEP]", async () => {
    const wrapper = mount(AvecService);
    await wrapper.get('[data-test="clickMe"]').trigger("click");
    await sleep(2000);
    await flushPromises();
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("Meow");

    // à retirer, présent pour démontrer l'impact du mocking
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("MOCKED");
  });

  // alternative
  it("will update after being clicked [with MOCKS]", async () => {
    // before test
    // ATTENTION LES APPELS DE AXIOS AVEC UNE FACTORY SONT HOISTED !!!!!!
    vi.mock("@/services/AxiosService.js", () => {
      function useAxiosService() {
        return {
          getCatFact: vi
            .fn()
            .mockResolvedValue("MOCKED Meow goes Meow after Meow goes Meow."),
        };
      }
      return { useAxiosService };
    });

    // LE VRAI test
    const wrapper = mount(AvecService);
    await wrapper.get('[data-test="clickMe"]').trigger("click");
    await flushPromises();
    console.log(wrapper.get('[data-test="readMe"]').text());
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("Meow");

    // à retirer, présent pour démontrer l'impact du mocking
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("MOCKED");
  });
});
