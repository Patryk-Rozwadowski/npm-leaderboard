import Header from "./Header";
import { MOCK_HEADERS_TEXT } from "../../__mocks__/inputs";

describe("Header component", () => {
   let rootContainer: HTMLElement;
   let headers: Header;

   beforeEach(() => {
      rootContainer = document.createElement("div");
      rootContainer.classList.add("root");
   });

   it("should render header texts", () => {
      headers = new Header(rootContainer, MOCK_HEADERS_TEXT);
      expect(headers).toBeTruthy();
   });

   it("should not render header texts", () => {
      headers = new Header(rootContainer);
   });
});
