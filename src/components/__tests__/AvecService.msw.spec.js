import { mount, flushPromises } from "@vue/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import AvecService from "../AvecService.vue"

async function sleep(durée){
  return new Promise((r) => setTimeout(r, durée));
}


const mockedServer = setupServer(
  rest.get(
    "https://cat-fact.herokuapp.com/facts/6161eac7b5401f0017b61bff",
    (req, res, ctx) => {
      return res(
        ctx.json({
          text: "MSW MOCKED Meow goes Meow after Meow goes Meow.",
        })
      );
    }
  )
);

describe("Composant qui Importe un Service [MSW]", () => {
  it("renders properly", () => {
    const wrapper = mount(AvecService);
    expect(wrapper.text()).toContain("Click Me");
    expect(wrapper.get('[data-test="clickMe"]').text()).toContain("Click Me");
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("Read Me");
  });

  it("will update after being clicked [with SLEEP]", async () => {
    const wrapper = mount(AvecService);
    await wrapper.get('[data-test="clickMe"]').trigger("click");
    await sleep(2000);
    await flushPromises();
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("Meow");

    // à retirer, présent pour démontrer l'impact du mocking
    expect(wrapper.get('[data-test="readMe"]').text()).not.toContain("MOCKED");
    expect(wrapper.get('[data-test="readMe"]').text()).not.toContain("MSW MOCKED");
  });

  // alternative
  it("will update after being clicked [with MSW]", async () => {
    // before test
    mockedServer.listen()

    // LE VRAI test
    const wrapper = mount(AvecService);
    await wrapper.get('[data-test="clickMe"]').trigger("click");
    await sleep(300);
    await flushPromises();
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("Meow");

    // à retirer, présent pour démontrer l'impact du mocking

    expect(wrapper.get('[data-test="readMe"]').text()).toContain("MSW MOCKED");

    // après le test
    mockedServer.close()
  });
});
