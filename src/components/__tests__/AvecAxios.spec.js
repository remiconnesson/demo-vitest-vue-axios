import { mount, flushPromises } from "@vue/test-utils";
import AvecAxios from "../AvecAxios.vue";
 
async function sleep(durée){
  return new Promise((r) => setTimeout(r, durée));
}

describe("Composant qui appelle Axios directement", () => {
  it("renders properly", () => {
    const wrapper = mount(AvecAxios);
    expect(wrapper.text()).toContain("Click Me");
    expect(wrapper.get('[data-test="clickMe"]').text()).toContain("Click Me");
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("Read Me");
  });

  it("will update after being clicked", async () => {
    const wrapper = mount(AvecAxios);
    await wrapper.get('[data-test="clickMe"]').trigger("click");
    await sleep(2000); 
    await flushPromises();
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("Meow");
  });
});
