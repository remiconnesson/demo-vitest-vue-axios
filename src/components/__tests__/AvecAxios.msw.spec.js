import { mount, flushPromises } from "@vue/test-utils";
import AvecAxios from "../AvecAxios.vue";
import { rest } from "msw";
import { setupServer } from "msw/node";


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



describe("Composant qui appelle Axios directement [MSW]", () => {
  beforeAll(() => {
    mockedServer.listen()
  })

  afterAll(() => {
    mockedServer.close()
  })

  it("renders properly", () => {
    const wrapper = mount(AvecAxios);
    expect(wrapper.text()).toContain("Click Me");
    expect(wrapper.get('[data-test="clickMe"]').text()).toContain("Click Me");
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("Read Me");
  });

  it("will update after being clicked", async () => {
    const wrapper = mount(AvecAxios);
    await wrapper.get('[data-test="clickMe"]').trigger("click");
    await sleep(300);
    await flushPromises();
    expect(wrapper.get('[data-test="readMe"]').text()).toContain("Meow");
  });
});
