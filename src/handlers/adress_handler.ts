import { NosoCore } from "../noso_crypto";
import { KeysPair } from "../models/keys-pair";
import { AddressObject } from "../models/address_object";
export class AddressHandler {
  /**
   * Imports an AddressObject using a key pair string.
   * @param keys A space-separated string containing a public key and a private key.
   * @param keyPair An optional parameter of type KeyPair to provide a custom KeyPair for verification.
   * @returns An AddressObject if the key pair is valid; otherwise, returns null.
   */
  static importAddressForKeysPair(
    keys: string,
    keyPair?: KeysPair
  ): AddressObject | null {
    const valueKeys = keyPair ?? new KeysPair("", "").fromString(keys);

    if (!valueKeys.isValid()) {
      return null;
    }

    /*    const verification = new NosoSigner().verifyKeysPair(new KeyPair(
      valueKeys.publicKey,
      valueKeys.privateKey
    ));
   
    if (!verification) {
      return null;
    }
 */
    return new AddressObject({
      hash: new NosoCore().getAddressFromPublicKey(valueKeys.publicKey),
      publicKey: valueKeys.publicKey,
      privateKey: valueKeys.privateKey,
    });
  }

  /**
   * Generates a new address using NosoCore's key pair generation.
   * @returns An AddressObject representing the newly created address.
   */
  static createNewAddress(): AddressObject {
    const keyPair = new NosoCore().generateKeyPair();
    return new AddressObject({
      hash: new NosoCore().getAddressFromPublicKey(keyPair.publicKey),
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
    });
  }

  /**
   * Derives an address from a public key.
   * @param publicKey The public key for which the address needs to be derived.
   * @returns A string representing the derived address.
   */
  static getAddressFromPublicKey(publicKey: string): string {
    return new NosoCore().getAddressFromPublicKey(publicKey);
  }
}
