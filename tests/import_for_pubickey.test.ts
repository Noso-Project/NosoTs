import { AddressHandler } from "../src/handlers/adress_handler";

describe("Get Hash for public key", () => {
  it("Checking the received hash", () => {
    expect(AddressHandler.getAddressFromPublicKey("BAB9mGTAI+O4MPXpColx7sJKUyfO6NpqOk76c/EsVnDjk3l7BWgw1qTD3b+77h/F5X1JfVUKhbEcWOkIpzDF34c=")).toEqual("N41ghDq2131GHhrCTe3aRWQ4Xo61aAn");
  });
});