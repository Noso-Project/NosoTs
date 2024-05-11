import { NosoSigner } from "../src/noso_signer";
import { NosoConst } from "../src/const";
describe("Checking the message signature", () => {
  it("Signature verification", () => {
    let success =
      "MEUCIDO0X1h8pPBsFkiz7Oh2xl2y8QES9TbMzIPcIoTI46MRAiEAjYp0Mt0+VA65j+5gKJYlHj+uwStk5TMsmNJRfRgFamg=";
    expect(
      new NosoSigner().signMessage(
        "VERIFICATION",
        "QA0bGlJlO/VCtvR/evSu1nTcjI+EXUNELemUW4g89uc="
      )
    ).toEqual(success);
  });
});
